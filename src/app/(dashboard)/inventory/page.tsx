"use client";

import { AlertTriangle, Boxes, Calendar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockProducts } from "@/lib/mock-data";

const inventoryData = mockProducts.map((p) => ({
  ...p,
  batchNumber: `BATCH-${p.sku}-2026`,
  expiryDate: "2027-06-30",
  lowStock: (p.stock ?? 0) < 20,
}));

export default function InventoryPage() {
  const lowStock = inventoryData.filter((p) => p.lowStock);

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory Management" description="Stock tracking, batch numbers, and expiry alerts" />

      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-4">
          <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
          <p className="text-sm font-medium text-[#EF4444]">{lowStock.length} products are running low on stock</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="flex items-center gap-4 pt-6"><Boxes className="h-8 w-8 text-[#2563EB]" /><div><p className="text-2xl font-bold">{inventoryData.length}</p><p className="text-sm text-slate-500">Total SKUs</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 pt-6"><AlertTriangle className="h-8 w-8 text-[#F59E0B]" /><div><p className="text-2xl font-bold">{lowStock.length}</p><p className="text-sm text-slate-500">Low Stock Alerts</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 pt-6"><Calendar className="h-8 w-8 text-[#14B8A6]" /><div><p className="text-2xl font-bold">2</p><p className="text-sm text-slate-500">Expiring Soon</p></div></CardContent></Card>
      </div>

      <DataTable
        keyField="id"
        data={inventoryData}
        columns={[
          { key: "name", header: "Product", render: (p) => <span className="font-medium">{p.name}</span> },
          { key: "batchNumber", header: "Batch" },
          { key: "stock", header: "Quantity", render: (p) => (
            <span className={p.lowStock ? "font-bold text-[#EF4444]" : ""}>{p.stock}</span>
          )},
          { key: "expiryDate", header: "Expiry" },
          { key: "lowStock", header: "Status", render: (p) => (
            p.lowStock ? <Badge variant="danger">Low Stock</Badge> : <Badge variant="success">In Stock</Badge>
          )},
        ]}
      />
    </div>
  );
}
