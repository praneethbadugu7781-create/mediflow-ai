"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, MapPin, FileText, CreditCard, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

const API_URL = "http://localhost:4000";

interface LiveHospitalDetail {
  id: string;
  name: string;
  contactPerson: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  gstNumber: string | null;
  pendingAmount: number;
  totalRevenue: number;
  deliveries: any[];
  invoices: any[];
  payments: any[];
  interactions: any[];
}

export default function HospitalProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [hospital, setHospital] = useState<LiveHospitalDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHospitalDetails = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/hospitals/${id}`);
      if (res.ok) {
        const data = await res.json();
        setHospital(data);
      }
    } catch (err) {
      console.error("Failed to fetch hospital details:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHospitalDetails();
  }, [fetchHospitalDetails]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-sm text-slate-500">Loading hospital profile from Supabase...</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="space-y-6">
        <Link href="/hospitals" className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Hospitals
        </Link>
        <p className="text-sm text-slate-500 text-center py-12">Hospital not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/hospitals" className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Hospitals
      </Link>
      <PageHeader
        title={hospital.name}
        description={hospital.address || "No address supplied"}
        action={
          <div className="flex gap-2">
            <Button variant="outline"><FileText className="h-4 w-4" /> New Invoice</Button>
            <Button><CreditCard className="h-4 w-4" /> Record Payment</Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Hospital Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div><p className="text-sm text-slate-500">Contact Person</p><p className="font-medium">{hospital.contactPerson || "No contact person"}</p></div>
            <div><p className="text-sm text-slate-500">Phone</p><p className="flex items-center gap-1 font-medium"><Phone className="h-4 w-4 text-slate-400" />{hospital.phone || "No phone"}</p></div>
            <div><p className="text-sm text-slate-500">GST Number</p><p className="font-medium">{hospital.gstNumber || "No GST"}</p></div>
            <div><p className="text-sm text-slate-500">Address</p><p className="flex items-start gap-1 font-medium"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />{hospital.address || "No address"}</p></div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold text-[#22C55E]">{formatCurrency(hospital.totalRevenue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Pending Payment</p>
              <p className="text-2xl font-bold text-[#F59E0B]">{formatCurrency(hospital.pendingAmount)}</p>
              {hospital.pendingAmount > 0 && <Badge variant="warning" className="mt-2">Payment Due</Badge>}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Interaction & History</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {hospital.interactions.map((i: any) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
              <div>
                <Badge variant="secondary">{i.type}</Badge>
                <p className="mt-1 text-sm">{i.notes}</p>
              </div>
              <span className="text-xs text-slate-500">{formatDate(i.createdAt)}</span>
            </div>
          ))}
          {hospital.interactions.length === 0 && (
            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
              <div>
                <Badge variant="secondary">Initial Setup</Badge>
                <p className="mt-1 text-sm">Hospital record registered in database</p>
              </div>
              <span className="text-xs text-slate-500">Just now</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
