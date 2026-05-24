"use client";

import { Building, Palette, Shield, Users, Upload } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function SettingsSwitch() {
  return (
    <button
      type="button"
      role="switch"
      className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-slate-200 transition-colors data-[state=checked]:bg-[#2563EB]"
      aria-checked="false"
    >
      <span className="pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition-transform" />
    </button>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Company profile, users, security, and preferences" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" /> Company Profile</CardTitle>
            <CardDescription>Business details for invoices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                <Upload className="h-6 w-6 text-slate-400" />
              </div>
              <Button variant="outline" size="sm">Upload Logo</Button>
            </div>
            <div className="space-y-2"><Label>Company Name</Label><Input defaultValue="MediFlow Distributors Pvt Ltd" /></div>
            <div className="space-y-2"><Label>GST Number</Label><Input defaultValue="36AABCM1234E1Z5" /></div>
            <div className="space-y-2"><Label>Address</Label><Input defaultValue="Hyderabad, Telangana" /></div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Rajesh Verma", role: "Owner", email: "owner@mediflow.ai" },
              { name: "Priya Sharma", role: "Accountant", email: "accountant@mediflow.ai" },
              { name: "Amit Singh", role: "Delivery Staff", email: "delivery@mediflow.ai" },
            ].map((u) => (
              <div key={u.email} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium">{u.role}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full">Invite User</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5" /> Theme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Compact sidebar</span>
              <SettingsSwitch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <SettingsSwitch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
            <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
