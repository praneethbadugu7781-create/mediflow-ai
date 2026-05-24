import vision from "@google-cloud/vision";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const client = new vision.ImageAnnotatorClient();
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function parseMoney(value: string | undefined) {
  if (!value) return 0;
  return Number.parseFloat(value.replace(/,/g, "")) || 0;
}

function findMoney(text: string, labels: string[]) {
  for (const label of labels) {
    const match = text.match(
      new RegExp(`${label}\\s*[:=-]?\\s*(?:inr|rs\\.?|₹)?\\s*([\\d,]+(?:\\.\\d{1,2})?)`, "i")
    );
    if (match) return parseMoney(match[1]);
  }
  return 0;
}

function extractGst(text: string) {
  const explicitGst = findMoney(text, ["total\\s+gst", "gst\\s+amount", "tax\\s+amount"]);
  if (explicitGst) return explicitGst;

  return ["cgst", "sgst", "igst"].reduce((total, label) => total + findMoney(text, [label]), 0);
}

function extractDate(text: string) {
  const match = text.match(
    /\b(0?[1-9]|[12]\d|3[01])[-/.](0?[1-9]|1[0-2])[-/.]((?:19|20)?\d{2})\b/
  );
  if (!match) return new Date().toISOString().split("T")[0];

  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function extractVendor(text: string) {
  const ignored = /invoice|receipt|tax|gst|date|bill|cash memo|original|duplicate/i;
  return (
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.length > 2 && /[a-z]/i.test(line) && !ignored.test(line)) ??
    "Unknown Vendor"
  );
}

function inferCategory(text: string) {
  const normalized = text.toLowerCase();
  if (/petrol|diesel|fuel|indian oil|bharat petroleum|hpcl/.test(normalized)) return "PETROL";
  if (/hotel|residency|lodging|room/.test(normalized)) return "HOTEL";
  if (/toll|nhai|fastag/.test(normalized)) return "TOLL";
  if (/food|restaurant|cafe|meal|swiggy|zomato/.test(normalized)) return "FOOD";
  if (/courier|parcel|delivery|dtdc|bluedart/.test(normalized)) return "COURIER";
  if (/taxi|cab|uber|ola|travel|ticket/.test(normalized)) return "TRAVEL";
  return "MISCELLANEOUS";
}

function visionErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (message.includes("requires billing to be enabled")) {
    return "Google Vision billing is not enabled for this project. Enable billing, then try again.";
  }
  if (message.includes("has not been used") || message.includes("is disabled")) {
    return "Google Cloud Vision API is not enabled for this project. Enable it, then try again.";
  }
  return "Google Vision scan failed. Check the credential and Vision API setup.";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload a JPG or PNG bill image." }, { status: 400 });
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: "Bill image must be smaller than 10 MB." }, { status: 400 });
    }

    const image = Buffer.from(await file.arrayBuffer());
    const [result] = await client.documentTextDetection(image);
    const text = result.fullTextAnnotation?.text?.trim();

    if (!text) {
      return NextResponse.json({ error: "No readable text was detected in this image." }, { status: 422 });
    }

    const amount = findMoney(text, ["grand\\s+total", "net\\s+(?:amount|payable)", "amount\\s+payable", "total"]);
    const blocks = result.fullTextAnnotation?.pages?.flatMap((page) => page.blocks ?? []) ?? [];
    const scores = blocks.map((block) => block.confidence ?? 0).filter((score) => score > 0);
    const confidence = scores.length
      ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 100)
      : 90;

    return NextResponse.json({
      amount,
      gst: extractGst(text),
      date: extractDate(text),
      vendor: extractVendor(text),
      category: inferCategory(text),
      confidence,
      source: "google-cloud-vision",
      fileName: file.name,
    });
  } catch (error) {
    console.error("Google Vision bill scan failed", error);
    return NextResponse.json(
      { error: visionErrorMessage(error) },
      { status: 502 }
    );
  }
}
