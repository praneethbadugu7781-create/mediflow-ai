"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Package, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const API_URL = "http://localhost:4000";

interface LiveProduct {
  id: string;
  name: string;
  sku: string | null;
  category: string | null;
  unitPrice: number;
  gstRate: number;
  inventory?: {
    quantity: number;
  } | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<LiveProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-sm text-slate-500">Loading products from Supabase...</p>
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(products.map((p) => p.category || "Consumables")));

  return (
    <div className="space-y-6">
      <PageHeader title="Product Management" description="Manage medical products, categories, and pricing" action={<Button><Plus className="h-4 w-4" /> Add Product</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        {categories.slice(0, 3).map((cat) => (
          <div key={cat} className="flex items-center gap-3 rounded-2xl border bg-white/70 p-4">
            <Package className="h-8 w-8 text-[#2563EB]" />
            <div>
              <p className="font-semibold">{cat}</p>
              <p className="text-sm text-slate-500">{products.filter((p) => p.category === cat).length} products</p>
            </div>
          </div>
        ))}
      </div>
      <DataTable
        keyField="id"
        data={products}
        columns={[
          { key: "name", header: "Product", render: (p) => <span className="font-medium">{p.name}</span> },
          { key: "sku", header: "SKU", render: (p) => p.sku || "N/A" },
          { key: "category", header: "Category", render: (p) => <Badge variant="secondary">{p.category || "Consumables"}</Badge> },
          { key: "unitPrice", header: "Price", render: (p) => formatCurrency(p.unitPrice) },
          { key: "gstRate", header: "GST", render: (p) => `${p.gstRate}%` },
          { key: "stock", header: "Stock", render: (p) => {
            const stockVal = p.inventory?.quantity ?? 0;
            return (
              <span className={stockVal < 20 ? "font-semibold text-[#EF4444]" : ""}>{stockVal.toLocaleString()}</span>
            );
          }},
        ]}
      />
    </div>
  );
}
