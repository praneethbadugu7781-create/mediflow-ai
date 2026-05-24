"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: LucideIcon;
  format?: "currency" | "number" | "text";
  accent?: "blue" | "teal" | "green" | "amber" | "red";
}

const accentStyles = {
  blue: "from-[#2563EB] to-[#3b82f6]",
  teal: "from-[#14B8A6] to-[#2dd4bf]",
  green: "from-[#22C55E] to-[#4ade80]",
  amber: "from-[#F59E0B] to-[#fbbf24]",
  red: "from-[#EF4444] to-[#f87171]",
};

export function StatCard({ title, value, change, icon: Icon, format = "currency", accent = "blue" }: StatCardProps) {
  const displayValue =
    format === "currency" && typeof value === "number"
      ? formatCurrency(value)
      : format === "number" && typeof value === "number"
        ? value.toLocaleString("en-IN")
        : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-shadow hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A]">{displayValue}</p>
          {change !== undefined && (
            <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", change >= 0 ? "text-[#22C55E]" : "text-[#EF4444]")}>
              {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(change)}% vs last month
            </div>
          )}
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg", accentStyles[accent])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl", accentStyles[accent])} />
    </motion.div>
  );
}
