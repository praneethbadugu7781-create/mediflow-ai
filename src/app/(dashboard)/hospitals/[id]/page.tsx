"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, MapPin, FileText, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockHospitals } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function HospitalProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const hospital = mockHospitals.find((h) => h.id === id) || mockHospitals[0];

  return (
    <div className="space-y-6">
      <Link href="/hospitals" className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Hospitals
      </Link>
      <PageHeader
        title={hospital.name}
        description={hospital.address}
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
            <div><p className="text-sm text-slate-500">Contact Person</p><p className="font-medium">{hospital.contactPerson}</p></div>
            <div><p className="text-sm text-slate-500">Phone</p><p className="flex items-center gap-1 font-medium"><Phone className="h-4 w-4" />{hospital.phone}</p></div>
            <div><p className="text-sm text-slate-500">GST Number</p><p className="font-medium">{hospital.gstNumber}</p></div>
            <div><p className="text-sm text-slate-500">Address</p><p className="flex items-start gap-1 font-medium"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{hospital.address}</p></div>
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
        <CardHeader><CardTitle>Interaction History</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { type: "Delivery", note: "12 items delivered", date: "May 24, 2026" },
            { type: "Payment", note: "₹45,000 received", date: "May 20, 2026" },
            { type: "Quotation", note: "Quote #QT-1842 sent", date: "May 18, 2026" },
          ].map((i) => (
            <div key={i.date + i.type} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
              <div><Badge variant="secondary">{i.type}</Badge><p className="mt-1 text-sm">{i.note}</p></div>
              <span className="text-xs text-slate-500">{i.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
