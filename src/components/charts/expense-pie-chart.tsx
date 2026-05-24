"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { expenseByCategory } from "@/lib/mock-data";

export function ExpensePieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={expenseByCategory}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
          nameKey="name"
        >
          {expenseByCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
