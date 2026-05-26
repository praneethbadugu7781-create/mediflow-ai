export type UserRole = "OWNER" | "ADMIN" | "ACCOUNTANT" | "DELIVERY_STAFF" | "SALES_EXECUTIVE";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  monthlyProfit: number;
  pendingPayments: number;
  todayExpenses: number;
  productDeliveries: number;
  revenueChange: number;
  profitChange: number;
}

export interface Expense {
  id: string;
  amount: number;
  gst: number;
  category: string;
  vendor?: string;
  description?: string;
  billImage?: string;
  expenseDate: string;
}

export interface Hospital {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  pendingAmount: number;
  totalRevenue: number;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  category?: string;
  unitPrice: number;
  gstRate: number;
  stock?: number;
}

export interface Delivery {
  id: string;
  hospitalName: string;
  status: "PENDING" | "DELIVERED" | "RETURNED";
  items: number;
  scheduledAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "payment" | "stock" | "delivery" | "reminder";
  isRead: boolean;
  createdAt: string;
}

export interface BillScanResult {
  amount: number;
  gst: number;
  date: string;
  vendor: string;
  category: string;
  confidence: number;
  source?: string;
}
