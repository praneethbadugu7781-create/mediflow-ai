import type { DashboardStats, Expense, Hospital, Product, Delivery, Notification } from "./types";

export const dashboardStats: DashboardStats = {
  totalRevenue: 2847500,
  monthlyProfit: 412800,
  pendingPayments: 186400,
  todayExpenses: 12450,
  productDeliveries: 47,
  revenueChange: 12.4,
  profitChange: 8.2,
};

export const salesChartData = [
  { month: "Jan", revenue: 420000, expenses: 180000 },
  { month: "Feb", revenue: 380000, expenses: 165000 },
  { month: "Mar", revenue: 510000, expenses: 195000 },
  { month: "Apr", revenue: 470000, expenses: 188000 },
  { month: "May", revenue: 620000, expenses: 210000 },
  { month: "Jun", revenue: 580000, expenses: 205000 },
];

export const expenseByCategory = [
  { name: "Petrol", value: 32000, color: "#2563EB" },
  { name: "Travel", value: 28000, color: "#14B8A6" },
  { name: "Food", value: 15000, color: "#22C55E" },
  { name: "Hotel", value: 22000, color: "#F59E0B" },
  { name: "Courier", value: 12000, color: "#8B5CF6" },
  { name: "Other", value: 18000, color: "#64748B" },
];

export const paymentStatusData = [
  { name: "Paid", value: 65, color: "#22C55E" },
  { name: "Pending", value: 25, color: "#F59E0B" },
  { name: "Overdue", value: 10, color: "#EF4444" },
];

export const topHospitals = [
  { name: "Apollo Multispeciality", revenue: 485000, orders: 124 },
  { name: "Fortis Healthcare", revenue: 392000, orders: 98 },
  { name: "Max Super Specialty", revenue: 318000, orders: 87 },
  { name: "Manipal Hospital", revenue: 276000, orders: 72 },
  { name: "AIIMS Regional", revenue: 245000, orders: 65 },
];

export const recentActivities = [
  { id: "1", action: "Invoice #INV-2847 generated", hospital: "Apollo Multispeciality", time: "2 min ago", type: "invoice" },
  { id: "2", action: "Delivery completed", hospital: "Fortis Healthcare", time: "15 min ago", type: "delivery" },
  { id: "3", action: "Payment received ₹45,000", hospital: "Max Super Specialty", time: "1 hr ago", type: "payment" },
  { id: "4", action: "Low stock alert: Surgical Gloves", hospital: "-", time: "2 hrs ago", type: "alert" },
  { id: "5", action: "Expense added: Petrol ₹2,400", hospital: "-", time: "3 hrs ago", type: "expense" },
];

export const mockExpenses: Expense[] = [
  { id: "1", amount: 2400, gst: 0, category: "PETROL", vendor: "Indian Oil", expenseDate: "2026-05-24", description: "Delivery route A" },
  { id: "2", amount: 850, gst: 153, category: "FOOD", vendor: "Hotel Sarovar", expenseDate: "2026-05-23" },
  { id: "3", amount: 320, gst: 0, category: "TOLL", vendor: "NHAI Toll", expenseDate: "2026-05-23" },
  { id: "4", amount: 4500, gst: 810, category: "HOTEL", vendor: "Taj Residency", expenseDate: "2026-05-22", description: "Client meeting" },
  { id: "5", amount: 1200, gst: 216, category: "COURIER", vendor: "BlueDart", expenseDate: "2026-05-22" },
];

export const mockHospitals: Hospital[] = [
  { id: "1", name: "Apollo Multispeciality", contactPerson: "Dr. Rajesh Kumar", phone: "+91 98765 43210", address: "Jubilee Hills, Hyderabad", gstNumber: "36AABCA1234A1Z5", pendingAmount: 45000, totalRevenue: 485000 },
  { id: "2", name: "Fortis Healthcare", contactPerson: "Ms. Priya Sharma", phone: "+91 98765 43211", address: "Bannerghatta, Bangalore", gstNumber: "29AABCF5678B1Z2", pendingAmount: 28000, totalRevenue: 392000 },
  { id: "3", name: "Max Super Specialty", contactPerson: "Dr. Anil Mehta", phone: "+91 98765 43212", address: "Saket, New Delhi", gstNumber: "07AABCM9012C1Z8", pendingAmount: 62000, totalRevenue: 318000 },
  { id: "4", name: "Manipal Hospital", contactPerson: "Mr. Suresh Reddy", phone: "+91 98765 43213", address: "Old Airport Road, Bangalore", gstNumber: "29AABCM3456D1Z4", pendingAmount: 0, totalRevenue: 276000 },
];

export const mockProducts: Product[] = [
  { id: "1", name: "Surgical Gloves (L)", sku: "SG-L-100", category: "PPE", unitPrice: 450, gstRate: 12, stock: 8 },
  { id: "2", name: "IV Cannula 22G", sku: "IV-22G", category: "Consumables", unitPrice: 85, gstRate: 12, stock: 2500 },
  { id: "3", name: "Disposable Syringe 5ml", sku: "DS-5ML", category: "Consumables", unitPrice: 12, gstRate: 12, stock: 15000 },
  { id: "4", name: "N95 Respirator Mask", sku: "N95-001", category: "PPE", unitPrice: 35, gstRate: 12, stock: 45 },
  { id: "5", name: "Digital Thermometer", sku: "DT-PRO", category: "Equipment", unitPrice: 280, gstRate: 18, stock: 120 },
];

export const mockDeliveries: Delivery[] = [
  { id: "1", hospitalName: "Apollo Multispeciality", status: "DELIVERED", items: 12, scheduledAt: "2026-05-24" },
  { id: "2", hospitalName: "Fortis Healthcare", status: "PENDING", items: 8, scheduledAt: "2026-05-24" },
  { id: "3", hospitalName: "Max Super Specialty", status: "PENDING", items: 15, scheduledAt: "2026-05-25" },
  { id: "4", hospitalName: "Manipal Hospital", status: "RETURNED", items: 3, scheduledAt: "2026-05-23" },
];

export const mockNotifications: Notification[] = [
  { id: "1", title: "Payment Overdue", message: "Max Super Specialty has ₹62,000 overdue for 15 days", type: "payment", isRead: false, createdAt: "2026-05-24T08:00:00" },
  { id: "2", title: "Low Stock Alert", message: "Surgical Gloves (L) - only 8 units remaining", type: "stock", isRead: false, createdAt: "2026-05-24T07:30:00" },
  { id: "3", title: "Delivery Scheduled", message: "8 items scheduled for Fortis Healthcare today", type: "delivery", isRead: true, createdAt: "2026-05-24T06:00:00" },
  { id: "4", title: "GST Filing Reminder", message: "GSTR-1 due in 5 days", type: "reminder", isRead: true, createdAt: "2026-05-23T18:00:00" },
];
