"use client";

import { Plus, Download, Share2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { generateQuotationPDF } from "@/lib/pdf";
import { formatCurrency, formatDate } from "@/lib/utils";

const quotations = [
  { id: "1", quoteNo: "QT-1842", hospital: "Apollo Multispeciality", total: 245000, validUntil: "2026-06-24" },
  { id: "2", quoteNo: "QT-1841", hospital: "Manipal Hospital", total: 178000, validUntil: "2026-06-20" },
];

export default function QuotationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Quotation Generation" description="Create and share professional quotations" action={<Button><Plus className="h-4 w-4" /> New Quotation</Button>} />
      <DataTable
        keyField="id"
        data={quotations}
        columns={[
          { key: "quoteNo", header: "Quote #", render: (q) => <span className="font-mono font-medium">{q.quoteNo}</span> },
          { key: "hospital", header: "Hospital" },
          { key: "total", header: "Amount", render: (q) => formatCurrency(q.total) },
          { key: "validUntil", header: "Valid Until", render: (q) => formatDate(q.validUntil) },
          { key: "actions", header: "Actions", render: (q) => (
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => generateQuotationPDF({
                quoteNo: q.quoteNo, hospitalName: q.hospital,
                items: [{ name: "Medical Kit", qty: 5, rate: 40000, gst: 18 }],
                subtotal: 200000, gstAmount: 36000, total: q.total, validUntil: q.validUntil,
              })}><Download className="h-4 w-4" /> PDF</Button>
              <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /> Share</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
