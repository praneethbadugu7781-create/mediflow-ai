"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  ScanLine,
  Building2,
  Package,
  Truck,
  Boxes,
  FileText,
  FileCheck,
  CreditCard,
  BarChart3,
  Calculator,
  Bell,
  Settings,
  ChevronLeft,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, BRAND, ROLE_PERMISSIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Wallet,
  ScanLine,
  Building2,
  Package,
  Truck,
  Boxes,
  FileText,
  FileCheck,
  CreditCard,
  BarChart3,
  Calculator,
  Bell,
  Settings,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] shadow-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{BRAND.name}</p>
            <p className="truncate text-[10px] text-slate-400">{BRAND.tagline}</p>
          </motion.div>
        )}
        <button
          type="button"
          onClick={onMobileClose}
          className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-white/10 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.filter((item) => {
          if (!user) return false;
          const permissions = ROLE_PERMISSIONS[user.role] || [];
          if (permissions.includes("*")) return true;
          const segment = item.href.replace(/^\//, "");
          if (segment === "notifications" || segment === "") return true;
          return permissions.includes(segment);
        }).map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-white")} />
              {!collapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {"badge" in item && item.badge && (
                    <Badge variant="ai" className="ml-auto text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && user && (
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="truncate text-sm font-medium text-white">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.role.replace("_", " ")}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onToggle}
        className="hidden border-t border-white/10 p-3 text-slate-400 hover:text-white lg:flex lg:items-center lg:justify-center"
      >
        <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
      </button>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0F172A]/60 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-[#0F172A] transition-all duration-300 lg:static lg:z-auto",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {content}
      </aside>
    </>
  );
}
