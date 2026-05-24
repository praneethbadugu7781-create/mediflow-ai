"use client";

import { Bell, Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockNotifications } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const typeColors = {
  payment: "warning",
  stock: "danger",
  delivery: "default",
  reminder: "accent",
} as const;

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Payment reminders, stock alerts, and delivery updates"
        action={<Button variant="outline"><Check className="h-4 w-4" /> Mark all read</Button>}
      />

      <div className="space-y-3">
        {mockNotifications.map((n) => (
          <Card key={n.id} className={!n.isRead ? "border-[#2563EB]/20 bg-[#2563EB]/5" : ""}>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <Bell className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{n.title}</p>
                  {!n.isRead && <span className="h-2 w-2 rounded-full bg-[#2563EB]" />}
                  <Badge variant={typeColors[n.type]}>{n.type}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{n.message}</p>
                <p className="mt-2 text-xs text-slate-400">{formatDate(n.createdAt)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
