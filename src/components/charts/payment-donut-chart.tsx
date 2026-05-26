"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Loader2 } from "lucide-react";

const API_URL = "http://localhost:4000";

interface PaymentStatusItem {
  name: string;
  value: number;
  color: string;
}

export function PaymentDonutChart() {
  const [data, setData] = useState<PaymentStatusItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/analytics`)
      .then((res) => {
        if (res.ok) return res.json();
        return {};
      })
      .then((resData) => {
        if (resData.paymentStatusData) {
          setData(resData.paymentStatusData);
        }
      })
      .catch((err) => console.error("Failed to load payment donut analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[220px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, ""]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
