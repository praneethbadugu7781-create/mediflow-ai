"use client";

import { useState } from "react";
import { Plus, Search, Download, Filter } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { mockExpenses } from "@/lib/mock-data";
import { EXPENSE_CATEGORIES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [expenses] = useState(mockExpenses);

  const filtered = expenses.filter((e) => {
    const matchSearch = !search || e.vendor?.toLowerCase().includes(search.toLowerCase()) || e.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || e.category === category;
    return matchSearch && matchCat;
  });

  const monthlyTotal = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Management"
        description="Track, categorize, and analyze all business expenses"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4" /> Add Expense</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New Expense</DialogTitle></DialogHeader>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2"><Label>Amount (₹)</Label><Input type="number" placeholder="0" /></div>
                  <div className="space-y-2"><Label>Category</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{EXPENSE_CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Vendor</Label><Input placeholder="Vendor name" /></div>
                  <Button type="submit" className="w-full">Save Expense</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">This Month</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{formatCurrency(monthlyTotal)}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Total Entries</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{filtered.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Avg. Expense</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{formatCurrency(filtered.length ? monthlyTotal / filtered.length : 0)}</p></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-48"><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {EXPENSE_CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <DataTable
            keyField="id"
            data={filtered}
            columns={[
              { key: "expenseDate", header: "Date", render: (e) => formatDate(e.expenseDate) },
              { key: "category", header: "Category", render: (e) => <Badge variant="secondary">{String(e.category)}</Badge> },
              { key: "vendor", header: "Vendor" },
              { key: "amount", header: "Amount", render: (e) => <span className="font-semibold">{formatCurrency(e.amount)}</span> },
              { key: "gst", header: "GST", render: (e) => formatCurrency(e.gst) },
            ]}
          />
        </div>
        <Card>
          <CardHeader><CardTitle>Expense Analytics</CardTitle></CardHeader>
          <CardContent><ExpensePieChart /></CardContent>
        </Card>
      </div>
    </div>
  );
}
