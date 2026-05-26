"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, Building2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import type { Hospital } from "@/lib/types";

const API_URL = "http://localhost:4000";

export default function HospitalsPage() {
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formGst, setFormGst] = useState("");

  const fetchHospitals = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/hospitals`);
      if (res.ok) {
        const data = await res.json();
        setHospitals(data);
      }
    } catch (err) {
      console.error("Failed to fetch hospitals:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/hospitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          contactPerson: formContact,
          phone: formPhone,
          email: formEmail,
          address: formAddress,
          gstNumber: formGst,
        }),
      });
      if (res.ok) {
        setDialogOpen(false);
        setFormName("");
        setFormContact("");
        setFormPhone("");
        setFormEmail("");
        setFormAddress("");
        setFormGst("");
        await fetchHospitals();
      }
    } catch (err) {
      console.error("Failed to save hospital:", err);
    } finally {
      setSaving(false);
    }
  };

  const filtered = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.contactPerson?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-sm text-slate-500">Loading hospitals from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hospital & Client Management"
        description="Manage hospital relationships, contacts, and payment history"
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4" /> Add Hospital</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Hospital</DialogTitle></DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2"><Label>Hospital Name *</Label><Input placeholder="e.g. Apollo Hospital" value={formName} onChange={(e) => setFormName(e.target.value)} required /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label>Contact Person</Label><Input placeholder="Dr. Name" value={formContact} onChange={(e) => setFormContact(e.target.value)} /></div>
                  <div className="space-y-2"><Label>Phone</Label><Input placeholder="+91 98765 43210" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} /></div>
                </div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="hospital@example.com" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} /></div>
                <div className="space-y-2"><Label>Address</Label><Input placeholder="Full address" value={formAddress} onChange={(e) => setFormAddress(e.target.value)} /></div>
                <div className="space-y-2"><Label>GST Number</Label><Input placeholder="36AABCA1234A1Z5" value={formGst} onChange={(e) => setFormGst(e.target.value)} /></div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : "Add Hospital"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input placeholder="Search hospitals..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, 4).map((h) => (
          <Link key={h.id} href={`/hospitals/${h.id}`}>
            <div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <Building2 className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h3 className="font-semibold">{h.name}</h3>
              <p className="text-sm text-slate-500">{h.contactPerson}</p>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-slate-500">Pending</span>
                <span className={h.pendingAmount > 0 ? "font-semibold text-[#F59E0B]" : "text-[#22C55E]"}>
                  {formatCurrency(h.pendingAmount)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <DataTable
        keyField="id"
        data={filtered}
        onRowClick={(h) => window.location.href = `/hospitals/${h.id}`}
        columns={[
          { key: "name", header: "Hospital", render: (h) => <span className="font-medium">{h.name}</span> },
          { key: "contactPerson", header: "Contact" },
          { key: "phone", header: "Phone" },
          { key: "gstNumber", header: "GST" },
          { key: "pendingAmount", header: "Pending", render: (h) => (
            h.pendingAmount > 0 ? <Badge variant="warning">{formatCurrency(h.pendingAmount)}</Badge> : <Badge variant="success">Clear</Badge>
          )},
          { key: "totalRevenue", header: "Revenue", render: (h) => formatCurrency(h.totalRevenue) },
        ]}
      />
    </div>
  );
}
