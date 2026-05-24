"use client";

import { Plus, Package } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Product Management" description="Manage medical products, categories, and pricing" action={<Button><Plus className="h-4 w-4" /> Add Product</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        {["PPE", "Consumables", "Equipment"].map((cat) => (
          <div key={cat} className="flex items-center gap-3 rounded-2xl border bg-white/70 p-4">
            <Package className="h-8 w-8 text-[#2563EB]" />
            <div><p className="font-semibold">{cat}</p><p className="text-sm text-slate-500">{mockProducts.filter((p) => p.category === cat).length} products</p></div>
          </div>
        ))}
      </div>
      <DataTable
        keyField="id"
        data={mockProducts}
        columns={[
          { key: "name", header: "Product", render: (p) => <span className="font-medium">{p.name}</span> },
          { key: "sku", header: "SKU" },
          { key: "category", header: "Category", render: (p) => <Badge variant="secondary">{p.category}</Badge> },
          { key: "unitPrice", header: "Price", render: (p) => formatCurrency(p.unitPrice) },
          { key: "gstRate", header: "GST", render: (p) => `${p.gstRate}%` },
          { key: "stock", header: "Stock", render: (p) => (
            <span className={(p.stock ?? 0) < 20 ? "font-semibold text-[#EF4444]" : ""}>{p.stock?.toLocaleString()}</span>
          )},
        ]}
      />
    </div>
  );
}
