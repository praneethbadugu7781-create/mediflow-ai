"use client";

import { Plus, Download, Printer, Share2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { generateInvoicePDF } from "@/lib/pdf";
import { formatCurrency, formatDate } from "@/lib/utils";

const invoices = [
  { id: "1", invoiceNo: "INV-2847", hospital: "Apollo Multispeciality", total: 125000, gst: 22500, status: "UNPAID", date: "2026-05-24" },
  { id: "2", invoiceNo: "INV-2846", hospital: "Fortis Healthcare", total: 89000, gst: 16020, status: "PAID", date: "2026-05-22" },
  { id: "3", invoiceNo: "INV-2845", hospital: "Max Super Specialty", total: 156000, gst: 28080, status: "OVERDUE", date: "2026-05-15" },
];

export default function InvoicesPage() {
  const handleDownload = (inv: typeof invoices[0]) => {
    generateInvoicePDF({
      invoiceNo: inv.invoiceNo,
      hospitalName: inv.hospital,
      hospitalAddress: "India",
      gstNumber: "36AABCA1234A1Z5",
      items: [{ name: "Medical Supplies", qty: 10, rate: 10000, gst: 18 }],
      subtotal: inv.total - inv.gst,
      gstAmount: inv.gst,
      total: inv.total,
      date: inv.date,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Invoice Generation" description="Create GST-compliant invoices with PDF export" action={<Button><Plus className="h-4 w-4" /> New Invoice</Button>} />

      <DataTable
        keyField="id"
        data={invoices}
        columns={[
          { key: "invoiceNo", header: "Invoice #", render: (i) => <span className="font-mono font-medium">{i.invoiceNo}</span> },
          { key: "hospital", header: "Hospital" },
          { key: "date", header: "Date", render: (i) => formatDate(i.date) },
          { key: "total", header: "Total", render: (i) => formatCurrency(i.total) },
          { key: "status", header: "Status", render: (i) => (
            <Badge variant={i.status === "PAID" ? "success" : i.status === "OVERDUE" ? "danger" : "warning"}>{i.status}</Badge>
          )},
          { key: "actions", header: "Actions", render: (i) => (
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => handleDownload(i)}><Download className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
