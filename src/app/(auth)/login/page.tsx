"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight, Building2, Calculator, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { BRAND } from "@/lib/constants";

const demoAccounts = [
  { email: "owner@mediflow.ai", role: "Owner", icon: Building2 },
  { email: "accountant@mediflow.ai", role: "Accountant", icon: Calculator },
  { email: "delivery@mediflow.ai", role: "Delivery", icon: Truck },
];

export default function LoginPage() {
  const [email, setEmail] = useState("owner@mediflow.ai");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const success = await login(email, password);
    setLoading(false);
    if (success) router.push("/dashboard");
    else setError("Invalid credentials. Use demo123 for demo accounts.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid w-full max-w-5xl gap-8 lg:grid-cols-2"
      >
        <div className="hidden flex-col justify-center lg:flex">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] shadow-xl">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0F172A]">
            Welcome to {BRAND.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Transform your medical distribution business with AI-powered automation, smart expense tracking, and enterprise-grade analytics.
          </p>
          <div className="mt-8 grid gap-3">
            {["AI Bill Scanner & OCR", "Real-time Inventory Alerts", "GST-ready Invoicing", "Hospital CRM"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-white/80">
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-[#2563EB] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                </div>
              </div>
              {error && <p className="text-sm text-[#EF4444]">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">Quick demo login</p>
              <div className="grid gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => { setEmail(acc.email); setPassword("demo123"); }}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left text-sm transition-colors hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5"
                  >
                    <acc.icon className="h-4 w-4 text-[#2563EB]" />
                    <div>
                      <p className="font-medium">{acc.role}</p>
                      <p className="text-xs text-slate-500">{acc.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-[#2563EB] hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
