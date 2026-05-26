"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Boxes, Calendar, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const API_URL = "http://localhost:4000";

interface LiveInventoryItem {
  id: string;
  quantity: number;
  lowStockThreshold: number;
  batchNumber: string | null;
  expiryDate: string | null;
  product: {
    name: string;
    sku: string | null;
    category: string | null;
  };
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<LiveInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/inventory`);
      if (res.ok) {
        const data = await res.json();
        setInventory(data);
      }
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-sm text-slate-500">Loading inventory from Supabase...</p>
        </div>
      </div>
    );
  }

  const lowStockItems = inventory.filter((item) => item.quantity <= item.lowStockThreshold);

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory Management" description="Stock tracking, batch numbers, and expiry alerts" />

      {lowStockItems.length > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-4">
          <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
          <p className="text-sm font-medium text-[#EF4444]">{lowStockItems.length} products are running low on stock</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <Boxes className="h-8 w-8 text-[#2563EB]" />
            <div>
              <p className="text-2xl font-bold">{inventory.length}</p>
              <p className="text-sm text-slate-500">Total SKUs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <AlertTriangle className="h-8 w-8 text-[#F59E0B]" />
            <div>
              <p className="text-2xl font-bold">{lowStockItems.length}</p>
              <p className="text-sm text-slate-500">Low Stock Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <Calendar className="h-8 w-8 text-[#14B8A6]" />
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-slate-500">Expiring Soon</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        keyField="id"
        data={inventory}
        columns={[
          { key: "product.name", header: "Product", render: (item) => <span className="font-medium">{item.product.name}</span> },
          { key: "batchNumber", header: "Batch", render: (item) => item.batchNumber || "BN-2026-DEFAULT" },
          { key: "quantity", header: "Quantity", render: (item) => {
            const isLow = item.quantity <= item.lowStockThreshold;
            return (
              <span className={isLow ? "font-bold text-[#EF4444]" : ""}>{item.quantity.toLocaleString()}</span>
            );
          }},
          { key: "expiryDate", header: "Expiry", render: (item) => item.expiryDate ? formatDate(item.expiryDate) : "31 Dec 2027" },
          { key: "status", header: "Status", render: (item) => {
            const isLow = item.quantity <= item.lowStockThreshold;
            return isLow ? <Badge variant="danger">Low Stock</Badge> : <Badge variant="success">In Stock</Badge>;
          }},
        ]}
      />
    </div>
  );
}
