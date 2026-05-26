"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { useAuth } from "@/contexts/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { ROLE_PERMISSIONS } from "@/lib/constants";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC] p-6">
        <Skeleton className="hidden h-screen w-64 lg:block" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-16 w-full" />
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userRole = user.role || "";
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  const segments = pathname.split("/").filter(Boolean);
  const baseSegment = segments[0] || "";
  const isAuthorized =
    permissions.includes("*") ||
    baseSegment === "" ||
    baseSegment === "dashboard" ||
    baseSegment === "notifications" ||
    permissions.includes(baseSegment);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main key={pathname} className="flex-1 overflow-auto p-4 lg:p-6">
          {isAuthorized ? (
            children
          ) : (
            <div className="flex h-[70vh] flex-col items-center justify-center text-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EF4444]/10 text-[#EF4444]">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Your account role ({userRole.replace("_", " ")}) does not have permission to access this page.
              </p>
              <Button className="mt-6" onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
