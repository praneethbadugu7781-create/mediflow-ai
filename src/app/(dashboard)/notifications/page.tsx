"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, Check, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const API_URL = "http://localhost:4000";

const typeColors = {
  payment: "warning" as const,
  stock: "danger" as const,
  delivery: "default" as const,
  reminder: "accent" as const,
};

interface LiveNotification {
  id: string;
  title: string;
  message: string;
  type: "payment" | "stock" | "delivery" | "reminder";
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/notifications`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-sm text-slate-500">Loading notifications from Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Payment reminders, stock alerts, and delivery updates"
        action={<Button variant="outline"><Check className="h-4 w-4" /> Mark all read</Button>}
      />

      <div className="space-y-3">
        {notifications.map((n) => {
          const badgeVar = typeColors[n.type] || "default";
          return (
            <Card key={n.id} className={!n.isRead ? "border-[#2563EB]/20 bg-[#2563EB]/5" : ""}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Bell className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{n.title}</p>
                    {!n.isRead && <span className="h-2 w-2 rounded-full bg-[#2563EB]" />}
                    <Badge variant={badgeVar}>{n.type}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{n.message}</p>
                  <p className="mt-2 text-xs text-slate-400">{formatDate(n.createdAt)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {notifications.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-8">No notifications found</p>
        )}
      </div>
    </div>
  );
}
