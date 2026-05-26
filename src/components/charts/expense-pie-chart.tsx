"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Loader2 } from "lucide-react";

const API_URL = "http://localhost:4000";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export function ExpensePieChart() {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/analytics`)
      .then((res) => {
        if (res.ok) return res.json();
        return {};
      })
      .then((resData) => {
        if (resData.expenseByCategory) {
          setData(resData.expenseByCategory);
        }
      })
      .catch((err) => console.error("Failed to load pie chart analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[280px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-slate-400">
        No expenses tracked yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
