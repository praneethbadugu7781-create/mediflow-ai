"use client";

import { AlertCircle, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentDonutChart } from "@/components/charts/payment-donut-chart";
import { formatCurrency, formatDate } from "@/lib/utils";

const payments = [
  { id: "1", hospital: "Max Super Specialty", amount: 62000, status: "OVERDUE", dueDate: "2026-05-09" },
  { id: "2", hospital: "Apollo Multispeciality", amount: 45000, status: "UNPAID", dueDate: "2026-05-30" },
  { id: "3", hospital: "Fortis Healthcare", amount: 28000, status: "UNPAID", dueDate: "2026-06-05" },
  { id: "4", hospital: "Manipal Hospital", amount: 95000, status: "PAID", dueDate: "2026-05-20" },
];

export default function PaymentsPage() {
  const overdue = payments.filter((p) => p.status === "OVERDUE");
  const pendingTotal = payments.filter((p) => p.status !== "PAID").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Payment Tracking" description="Monitor pending, paid, and overdue payments" />

      {overdue.length > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border-2 border-[#EF4444]/30 bg-[#EF4444]/5 p-4">
          <AlertCircle className="h-6 w-6 text-[#EF4444]" />
          <div>
            <p className="font-semibold text-[#EF4444]">{overdue.length} Overdue Payment(s)</p>
            <p className="text-sm text-slate-600">Immediate follow-up required</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><CreditCard className="mb-2 h-6 w-6 text-[#2563EB]" /><p className="text-sm text-slate-500">Pending Total</p><p className="text-2xl font-bold">{formatCurrency(pendingTotal)}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardContent className="pt-4"><PaymentDonutChart /></CardContent></Card>
      </div>

      <DataTable
        keyField="id"
        data={payments}
        columns={[
          { key: "hospital", header: "Hospital", render: (p) => <span className="font-medium">{p.hospital}</span> },
          { key: "amount", header: "Amount", render: (p) => formatCurrency(p.amount) },
          { key: "dueDate", header: "Due Date", render: (p) => formatDate(p.dueDate) },
          { key: "status", header: "Status", render: (p) => (
            <Badge variant={p.status === "PAID" ? "success" : p.status === "OVERDUE" ? "danger" : "warning"}>{p.status}</Badge>
          )},
        ]}
      />
    </div>
  );
}
