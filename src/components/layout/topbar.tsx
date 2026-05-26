"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, Menu, LogOut, Plus, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/notifications")
      .then((res) => {
        if (res.ok) return res.json();
        return [];
      })
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Failed to load notifications in topbar:", err));
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200/60 bg-white/70 px-4 backdrop-blur-xl lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input placeholder="Search hospitals, products, invoices..." className="pl-10" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link href="/bill-scanner" className="hidden sm:block">
          <Button variant="accent" size="sm">
            <ScanLine className="h-4 w-4" />
            AI Scan
          </Button>
        </Link>
        <Link href="/expenses" className="hidden sm:block">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <div className="mb-2 flex items-center justify-between px-2 py-1">
                <span className="text-sm font-semibold">Notifications</span>
                <Link href="/notifications" className="text-xs text-[#2563EB]" onClick={() => setShowNotifications(false)}>
                  View all
                </Link>
              </div>
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="rounded-xl p-3 hover:bg-slate-50">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
          <div className="text-right">
            <p className="text-sm font-medium text-[#0F172A]">{user?.name}</p>
            <Badge variant="secondary" className="text-[10px]">
              {user?.role?.replace("_", " ")}
            </Badge>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#14B8A6] text-sm font-bold text-white">
            {user?.name?.charAt(0) || "U"}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
