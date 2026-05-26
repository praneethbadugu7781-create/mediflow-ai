"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";

const API_URL = "http://localhost:4000";

interface SalesChartItem {
  month: string;
  revenue: number;
  expenses: number;
}

export function SalesChart() {
  const [data, setData] = useState<SalesChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/analytics`)
      .then((res) => {
        if (res.ok) return res.json();
        return {};
      })
      .then((resData: any) => {
        if (resData.salesChartData) {
          setData(resData.salesChartData);
        }
      })
      .catch((err) => console.error("Failed to load sales chart analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
          formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, ""]}
        />
        <Legend />
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563EB" fill="url(#colorRevenue)" strokeWidth={2} />
        <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#14B8A6" fill="url(#colorExpenses)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
