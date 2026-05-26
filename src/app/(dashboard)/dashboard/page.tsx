"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IndianRupee,
  TrendingUp,
  Clock,
  Receipt,
  Truck,
  FileText,
  ScanLine,
  Building2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SalesChart } from "@/components/charts/sales-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { PaymentDonutChart } from "@/components/charts/payment-donut-chart";
import { formatCurrency } from "@/lib/utils";
import type { Hospital, Notification } from "@/lib/types";
import { useAuth } from "@/contexts/auth-context";
import { ROLE_PERMISSIONS } from "@/lib/constants";

const API_URL = "http://localhost:4000";

const quickActions = [
  { href: "/expenses", label: "Add Expense", icon: Receipt, color: "bg-[#2563EB]" },
  { href: "/bill-scanner", label: "AI Scan Bill", icon: ScanLine, color: "bg-[#14B8A6]" },
  { href: "/invoices", label: "New Invoice", icon: FileText, color: "bg-[#0F172A]" },
  { href: "/hospitals", label: "Add Hospital", icon: Building2, color: "bg-[#8B5CF6]" },
];

interface LiveStats {
  totalRevenue: number;
  monthlyProfit: number;
  pendingPayments: number;
  todayExpenses: number;
  productDeliveries: number;
  revenueChange: number;
  profitChange: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [activities, setActivities] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsRes, hospitalsRes, notificationsRes] = await Promise.all([
        fetch(`${API_URL}/api/dashboard/stats`),
        fetch(`${API_URL}/api/hospitals`),
        fetch(`${API_URL}/api/notifications`),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (hospitalsRes.ok) {
        const hospitalsData = await hospitalsRes.json();
        setHospitals(hospitalsData);
      }
      if (notificationsRes.ok) {
        const notificationsData = await notificationsRes.json();
        setActivities(notificationsData);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-sm text-slate-500">Loading dashboard stats from Supabase...</p>
        </div>
      </div>
    );
  }

  const liveStats = stats || {
    totalRevenue: 0,
    monthlyProfit: 0,
    pendingPayments: 0,
    todayExpenses: 0,
    productDeliveries: 0,
    revenueChange: 0,
    profitChange: 0,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#0F172A] lg:text-3xl">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here&apos;s your business overview.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Revenue" value={liveStats.totalRevenue} change={liveStats.revenueChange} icon={IndianRupee} accent="blue" />
        <StatCard title="Monthly Profit" value={liveStats.monthlyProfit} change={liveStats.profitChange} icon={TrendingUp} accent="green" />
        <StatCard title="Pending Payments" value={liveStats.pendingPayments} icon={Clock} accent="amber" />
        <StatCard title="Today Expenses" value={liveStats.todayExpenses} icon={Receipt} accent="red" />
        <StatCard title="Deliveries Today" value={liveStats.productDeliveries} icon={Truck} format="number" accent="teal" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions
          .filter((action) => {
            if (!user) return false;
            const permissions = ROLE_PERMISSIONS[user.role] || [];
            if (permissions.includes("*")) return true;
            const segment = action.href.replace(/^\//, "");
            return permissions.includes(segment);
          })
          .map((action, i) => (
            <motion.div key={action.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={action.href}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-[#0F172A]">{action.label}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </div>
              </Link>
            </motion.div>
          ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Expenses</CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Current payment distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentDonutChart />
            <div className="mt-4 space-y-2">
              {[
                { label: "Paid", color: "#22C55E", pct: 65 },
                { label: "Pending", color: "#F59E0B", pct: 25 },
                { label: "Overdue", color: "#EF4444", pct: 10 },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </div>
                  <span className="font-medium">{s.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Expense Analytics</CardTitle>
            <CardDescription>By category this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpensePieChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Hospitals</CardTitle>
              <CardDescription>By revenue</CardDescription>
            </div>
            <Link href="/hospitals">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {hospitals.slice(0, 5).map((h, i) => (
              <div key={h.id} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/10 text-sm font-bold text-[#2563EB]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">{h.name}</p>
                  <p className="text-xs text-slate-500">{h.contactPerson || "No contact"}</p>
                </div>
                <span className="text-sm font-semibold text-[#0F172A]">{formatCurrency(h.totalRevenue)}</span>
              </div>
            ))}
            {hospitals.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No hospitals registered yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex gap-3 rounded-xl p-2 hover:bg-slate-50">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#14B8A6]" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{act.title}</p>
                  <p className="text-xs text-slate-500">{act.message}</p>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No recent activities</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
