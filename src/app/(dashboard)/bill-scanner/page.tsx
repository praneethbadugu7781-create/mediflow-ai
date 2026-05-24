"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Upload, Sparkles, Check, Loader2, ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EXPENSE_CATEGORIES } from "@/lib/constants";
import type { BillScanResult } from "@/lib/types";

export default function BillScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<BillScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setScanning(true);
    setResult(null);
    setScanError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/ocr/scan", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Bill scan failed.");
      }
      setResult(data);
    } catch (error) {
      setScanError(error instanceof Error ? error.message : "Bill scan failed.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Bill Scanner"
        description="Upload receipts and let AI extract expense details automatically"
        action={<Badge variant="ai"><Sparkles className="mr-1 h-3 w-3" /> Powered by AI OCR</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="ai-glow overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ScanLine className="h-5 w-5 text-[#14B8A6]" /> Upload Bill</CardTitle>
            <CardDescription>Supports JPG and PNG receipt images</CardDescription>
          </CardHeader>
          <CardContent>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
            <div
              onClick={() => fileRef.current?.click()}
              className="relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2563EB]/30 bg-gradient-to-br from-[#2563EB]/5 to-[#14B8A6]/5 p-8 transition-colors hover:border-[#2563EB]/50"
            >
              {preview ? (
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Bill preview" className="mx-auto max-h-64 rounded-xl object-contain" />
                  {scanning && (
                    <div className="scan-animation absolute inset-0 rounded-xl bg-[#14B8A6]/10" />
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6]">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-medium">Drop bill image here or click to upload</p>
                  <p className="mt-1 text-sm text-slate-500">AI will extract amount, GST, date & vendor</p>
                </>
              )}
            </div>
            <Button className="mt-4 w-full" onClick={() => fileRef.current?.click()} disabled={scanning}>
              {scanning ? <><Loader2 className="h-4 w-4 animate-spin" /> Scanning with AI...</> : <><ImageIcon className="h-4 w-4" /> Select Bill Image</>}
            </Button>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {scanning && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card>
                <CardContent className="flex min-h-[320px] flex-col items-center justify-center py-12">
                  <div className="relative mb-6">
                    <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#2563EB]/20 border-t-[#2563EB]" />
                    <Sparkles className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-[#14B8A6]" />
                  </div>
                  <p className="text-lg font-semibold">AI is analyzing your bill...</p>
                  <p className="mt-2 text-sm text-slate-500">Extracting amount, GST, vendor & category</p>
                  <div className="mt-6 flex gap-2">
                    {["Amount", "GST", "Date", "Vendor"].map((s, i) => (
                      <motion.span key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.3 }}
                        className="rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB]">{s}</motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {scanError && !scanning && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardContent className="flex min-h-[180px] flex-col items-center justify-center gap-3 py-10 text-center">
                  <p className="text-lg font-semibold text-[#EF4444]">Scan failed</p>
                  <p className="max-w-sm text-sm text-slate-500">{scanError}</p>
                  <Button variant="outline" onClick={() => fileRef.current?.click()}>Try another image</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {result && !scanning && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2"><Check className="h-5 w-5 text-[#22C55E]" /> Extracted Data</CardTitle>
                    <Badge variant="success">{result.confidence}% confidence</Badge>
                  </div>
                  <CardDescription>Review and edit before saving</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2"><Label>Amount (₹)</Label><Input type="number" defaultValue={result.amount} /></div>
                    <div className="space-y-2"><Label>GST (₹)</Label><Input type="number" defaultValue={result.gst} /></div>
                    <div className="space-y-2"><Label>Date</Label><Input type="date" defaultValue={result.date} /></div>
                    <div className="space-y-2"><Label>Category</Label>
                      <Select defaultValue={result.category}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{EXPENSE_CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2"><Label>Vendor Name</Label><Input defaultValue={result.vendor} /></div>
                  <Button className="w-full">Save to Expenses</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
