"use client";

import { Download, FileSpreadsheet, Calculator } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function GSTPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="GST & Accounting" description="GST-ready exports, Tally reports, and tax summaries" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Output GST</CardTitle><CardDescription>Collected on sales</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold text-[#2563EB]">{formatCurrency(512550)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Input GST</CardTitle><CardDescription>Paid on purchases</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold text-[#14B8A6]">{formatCurrency(22860)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Net GST Payable</CardTitle><CardDescription>This period</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold text-[#0F172A]">{formatCurrency(489690)}</p></CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "GSTR-1 Export", desc: "Outward supplies report", icon: FileSpreadsheet },
          { title: "GSTR-3B Summary", desc: "Monthly return summary", icon: Calculator },
          { title: "Tally XML Export", desc: "Import to Tally ERP", icon: Download },
          { title: "Purchase Register", desc: "Input tax credit details", icon: FileSpreadsheet },
        ].map((item) => (
          <Card key={item.title} className="transition-all hover:shadow-md">
            <CardContent className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10">
                  <item.icon className="h-6 w-6 text-[#2563EB]" />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
              <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
