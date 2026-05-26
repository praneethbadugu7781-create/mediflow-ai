"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, Calendar, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SalesChart } from "@/components/charts/sales-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import type { Hospital } from "@/lib/types";

const API_URL = "http://localhost:4000";

interface LiveStats {
  totalRevenue: number;
  monthlyProfit: number;
  pendingPayments: number;
  todayExpenses: number;
  productDeliveries: number;
  revenueChange: number;
  profitChange: number;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReportsData = useCallback(async () => {
    try {
      const [statsRes, hospitalsRes] = await Promise.all([
        fetch(`${API_URL}/api/dashboard/stats`),
        fetch(`${API_URL}/api/hospitals`),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (hospitalsRes.ok) {
        const hospitalsData = await hospitalsRes.json();
        setHospitals(hospitalsData);
      }
    } catch (err) {
      console.error("Failed to load reports data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-sm text-slate-500">Loading reports from database...</p>
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

  const calculatedExpenses = Math.max(0, liveStats.totalRevenue - liveStats.monthlyProfit);
  const topHospitalName = hospitals[0]?.name || "None Registered";

  const reportTypes = [
    { title: "Revenue Report", value: formatCurrency(liveStats.totalRevenue), change: `+${liveStats.revenueChange}% vs last month`, color: "text-[#22C55E]" },
    { title: "Expense Report", value: formatCurrency(calculatedExpenses), change: "Tracked category costs", color: "text-[#EF4444]" },
    { title: "Profit / Loss", value: formatCurrency(liveStats.monthlyProfit), change: `+${liveStats.profitChange}% margins`, color: "text-[#2563EB]" },
    { title: "Hospital Performance", value: `${hospitals.length} hospitals`, change: `Top: ${topHospitalName}`, color: "text-[#8B5CF6]" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive business intelligence and downloadable reports"
        action={
          <div className="flex gap-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-36"><Calendar className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><Download className="h-4 w-4" /> Download</Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((r) => (
          <Card key={r.title}>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">{r.title}</p>
              <p className="mt-1 text-xl font-bold">{r.value}</p>
              <p className={`mt-1 text-xs font-medium ${r.color}`}>{r.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Revenue Analytics</CardTitle><CardDescription>Monthly revenue trends</CardDescription></CardHeader>
          <CardContent><SalesChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Expense Breakdown</CardTitle><CardDescription>Category-wise expenses</CardDescription></CardHeader>
          <CardContent><ExpensePieChart /></CardContent>
        </Card>
      </div>
    </div>
  );
}
