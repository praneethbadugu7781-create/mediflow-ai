import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BRAND } from "./constants";

interface InvoiceLine {
  name: string;
  qty: number;
  rate: number;
  gst: number;
}

export function generateInvoicePDF(data: {
  invoiceNo: string;
  hospitalName: string;
  hospitalAddress?: string;
  gstNumber?: string;
  items: InvoiceLine[];
  subtotal: number;
  gstAmount: number;
  total: number;
  date: string;
}) {
  const doc = new jsPDF();
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text(BRAND.name, 14, 20);
  doc.setFontSize(10);
  doc.text("Medical Distribution Invoice", 14, 28);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(`Invoice: ${data.invoiceNo}`, 14, 50);
  doc.text(`Date: ${data.date}`, 14, 56);
  doc.text(`Bill To: ${data.hospitalName}`, 14, 66);
  if (data.hospitalAddress) doc.text(data.hospitalAddress, 14, 72);
  if (data.gstNumber) doc.text(`GST: ${data.gstNumber}`, 14, 78);

  autoTable(doc, {
    startY: 88,
    head: [["Product", "Qty", "Rate", "GST%", "Amount"]],
    body: data.items.map((i) => [
      i.name,
      i.qty,
      `₹${i.rate}`,
      `${i.gst}%`,
      `₹${(i.qty * i.rate * (1 + i.gst / 100)).toFixed(0)}`,
    ]),
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235] },
  });

  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  doc.text(`Subtotal: ₹${data.subtotal.toLocaleString("en-IN")}`, 140, finalY);
  doc.text(`GST: ₹${data.gstAmount.toLocaleString("en-IN")}`, 140, finalY + 6);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: ₹${data.total.toLocaleString("en-IN")}`, 140, finalY + 14);

  doc.save(`${data.invoiceNo}.pdf`);
}

export function generateQuotationPDF(data: {
  quoteNo: string;
  hospitalName: string;
  items: InvoiceLine[];
  subtotal: number;
  gstAmount: number;
  total: number;
  validUntil: string;
}) {
  const doc = new jsPDF();
  doc.setFillColor(20, 184, 166);
  doc.rect(0, 0, 210, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("QUOTATION", 14, 18);
  doc.setFontSize(10);
  doc.text(`${BRAND.name}`, 14, 26);

  doc.setTextColor(15, 23, 42);
  doc.text(`Quote: ${data.quoteNo}`, 14, 48);
  doc.text(`To: ${data.hospitalName}`, 14, 54);
  doc.text(`Valid Until: ${data.validUntil}`, 14, 60);

  autoTable(doc, {
    startY: 70,
    head: [["Product", "Qty", "Rate", "GST%", "Total"]],
    body: data.items.map((i) => [
      i.name,
      i.qty,
      `₹${i.rate}`,
      `${i.gst}%`,
      `₹${(i.qty * i.rate).toLocaleString("en-IN")}`,
    ]),
    headStyles: { fillColor: [20, 184, 166] },
  });

  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  doc.text(`Grand Total: ₹${data.total.toLocaleString("en-IN")}`, 130, finalY + 6);
  doc.save(`${data.quoteNo}.pdf`);
}
