"use client";

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
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SalesChart } from "@/components/charts/sales-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { PaymentDonutChart } from "@/components/charts/payment-donut-chart";
import {
  dashboardStats,
  topHospitals,
  recentActivities,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const quickActions = [
  { href: "/expenses", label: "Add Expense", icon: Receipt, color: "bg-[#2563EB]" },
  { href: "/bill-scanner", label: "AI Scan Bill", icon: ScanLine, color: "bg-[#14B8A6]" },
  { href: "/invoices", label: "New Invoice", icon: FileText, color: "bg-[#0F172A]" },
  { href: "/hospitals", label: "Add Hospital", icon: Building2, color: "bg-[#8B5CF6]" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#0F172A] lg:text-3xl">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here&apos;s your business overview.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Revenue" value={dashboardStats.totalRevenue} change={dashboardStats.revenueChange} icon={IndianRupee} accent="blue" />
        <StatCard title="Monthly Profit" value={dashboardStats.monthlyProfit} change={dashboardStats.profitChange} icon={TrendingUp} accent="green" />
        <StatCard title="Pending Payments" value={dashboardStats.pendingPayments} icon={Clock} accent="amber" />
        <StatCard title="Today Expenses" value={dashboardStats.todayExpenses} icon={Receipt} accent="red" />
        <StatCard title="Deliveries Today" value={dashboardStats.productDeliveries} icon={Truck} format="number" accent="teal" />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {quickActions.map((action, i) => (
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
            {topHospitals.map((h, i) => (
              <div key={h.name} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/10 text-sm font-bold text-[#2563EB]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">{h.name}</p>
                  <p className="text-xs text-slate-500">{h.orders} orders</p>
                </div>
                <span className="text-sm font-semibold text-[#0F172A]">{formatCurrency(h.revenue)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex gap-3 rounded-xl p-2 hover:bg-slate-50">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#14B8A6]" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-slate-500">{a.hospital !== "-" ? a.hospital : ""} · {a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
