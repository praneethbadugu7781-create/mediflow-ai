"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Building2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockHospitals } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function HospitalsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockHospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.contactPerson?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hospital & Client Management"
        description="Manage hospital relationships, contacts, and payment history"
        action={<Button><Plus className="h-4 w-4" /> Add Hospital</Button>}
      />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input placeholder="Search hospitals..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, 4).map((h) => (
          <Link key={h.id} href={`/hospitals/${h.id}`}>
            <div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <Building2 className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h3 className="font-semibold">{h.name}</h3>
              <p className="text-sm text-slate-500">{h.contactPerson}</p>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-slate-500">Pending</span>
                <span className={h.pendingAmount > 0 ? "font-semibold text-[#F59E0B]" : "text-[#22C55E]"}>
                  {formatCurrency(h.pendingAmount)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <DataTable
        keyField="id"
        data={filtered}
        onRowClick={(h) => window.location.href = `/hospitals/${h.id}`}
        columns={[
          { key: "name", header: "Hospital", render: (h) => <span className="font-medium">{h.name}</span> },
          { key: "contactPerson", header: "Contact" },
          { key: "phone", header: "Phone" },
          { key: "gstNumber", header: "GST" },
          { key: "pendingAmount", header: "Pending", render: (h) => (
            h.pendingAmount > 0 ? <Badge variant="warning">{formatCurrency(h.pendingAmount)}</Badge> : <Badge variant="success">Clear</Badge>
          )},
          { key: "totalRevenue", header: "Revenue", render: (h) => formatCurrency(h.totalRevenue) },
        ]}
      />
    </div>
  );
}
