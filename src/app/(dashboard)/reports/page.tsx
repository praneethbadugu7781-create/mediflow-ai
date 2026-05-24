"use client";

import { Download, Calendar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SalesChart } from "@/components/charts/sales-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

const reportTypes = [
  { title: "Revenue Report", value: formatCurrency(2847500), change: "+12.4%" },
  { title: "Expense Report", value: formatCurrency(127000), change: "-3.2%" },
  { title: "Profit/Loss", value: formatCurrency(412800), change: "+8.2%" },
  { title: "Hospital Performance", value: "5 hospitals", change: "Top: Apollo" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive business intelligence and downloadable reports"
        action={
          <div className="flex gap-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-36"><Calendar className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><Download className="h-4 w-4" /> Download</Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((r) => (
          <Card key={r.title}>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">{r.title}</p>
              <p className="mt-1 text-xl font-bold">{r.value}</p>
              <p className="mt-1 text-xs text-[#22C55E]">{r.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Revenue Analytics</CardTitle><CardDescription>Monthly revenue trends</CardDescription></CardHeader>
          <CardContent><SalesChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Expense Breakdown</CardTitle><CardDescription>Category-wise expenses</CardDescription></CardHeader>
          <CardContent><ExpensePieChart /></CardContent>
        </Card>
      </div>
    </div>
  );
}
