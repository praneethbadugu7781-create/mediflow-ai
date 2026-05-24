"use client";

import { Plus, Truck, Clock, CheckCircle, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockDeliveries } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const statusConfig = {
  PENDING: { icon: Clock, variant: "warning" as const, label: "Pending" },
  DELIVERED: { icon: CheckCircle, variant: "success" as const, label: "Delivered" },
  RETURNED: { icon: RotateCcw, variant: "danger" as const, label: "Returned" },
};

export default function DeliveriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Delivery Tracking" description="Track product deliveries and status timelines" action={<Button><Plus className="h-4 w-4" /> New Delivery</Button>} />

      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(statusConfig).map(([status, cfg]) => {
          const count = mockDeliveries.filter((d) => d.status === status).length;
          return (
            <Card key={status}>
              <CardContent className="flex items-center gap-4 pt-6">
                <cfg.icon className="h-8 w-8 text-[#2563EB]" />
                <div><p className="text-2xl font-bold">{count}</p><p className="text-sm text-slate-500">{cfg.label}</p></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        {mockDeliveries.map((d) => {
          const cfg = statusConfig[d.status];
          return (
            <Card key={d.id}>
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10">
                  <Truck className="h-6 w-6 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{d.hospitalName}</p>
                  <p className="text-sm text-slate-500">{d.items} items · {d.scheduledAt && formatDate(d.scheduledAt)}</p>
                </div>
                <Badge variant={cfg.variant}>{cfg.label}</Badge>
                <div className="hidden w-48 sm:block">
                  <div className="flex items-center gap-2">
                    {["Order", "Transit", "Delivered"].map((step, i) => (
                      <div key={step} className={`h-2 flex-1 rounded-full ${d.status === "DELIVERED" || (d.status === "PENDING" && i < 2) ? "bg-[#2563EB]" : "bg-slate-200"}`} />
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-slate-400">Delivery timeline</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
