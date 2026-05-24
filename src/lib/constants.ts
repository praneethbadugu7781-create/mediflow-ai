export const BRAND = {
  name: "MediFlow AI",
  tagline: "Intelligent Medical Distribution",
  primary: "#2563EB",
  secondary: "#0F172A",
  accent: "#14B8A6",
  background: "#F8FAFC",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;

export const EXPENSE_CATEGORIES = [
  { value: "PETROL", label: "Petrol" },
  { value: "FOOD", label: "Food" },
  { value: "TOLL", label: "Toll" },
  { value: "TRAVEL", label: "Travel" },
  { value: "HOTEL", label: "Hotel" },
  { value: "COURIER", label: "Courier" },
  { value: "MISCELLANEOUS", label: "Miscellaneous" },
] as const;

export const USER_ROLES = [
  { value: "OWNER", label: "Owner / Admin", description: "Full system access" },
  { value: "ACCOUNTANT", label: "Accountant", description: "Finance & reports" },
  { value: "DELIVERY_STAFF", label: "Delivery Staff", description: "Deliveries & expenses" },
  { value: "SALES_EXECUTIVE", label: "Sales Executive", description: "Hospitals & quotations" },
] as const;

export const DELIVERY_STATUSES = [
  { value: "PENDING", label: "Pending", color: "warning" },
  { value: "DELIVERED", label: "Delivered", color: "success" },
  { value: "RETURNED", label: "Returned", color: "danger" },
] as const;

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  OWNER: ["*"],
  ADMIN: ["*"],
  ACCOUNTANT: ["dashboard", "expenses", "payments", "reports", "gst", "invoices", "hospitals"],
  DELIVERY_STAFF: ["dashboard", "deliveries", "expenses", "bill-scanner", "inventory"],
  SALES_EXECUTIVE: ["dashboard", "hospitals", "quotations", "products", "deliveries"],
};

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard", roles: ["*"] },
  { href: "/expenses", label: "Expenses", icon: "Wallet", roles: ["*"] },
  { href: "/bill-scanner", label: "AI Bill Scanner", icon: "ScanLine", roles: ["*"], badge: "AI" },
  { href: "/hospitals", label: "Hospitals", icon: "Building2", roles: ["*"] },
  { href: "/products", label: "Products", icon: "Package", roles: ["*"] },
  { href: "/deliveries", label: "Deliveries", icon: "Truck", roles: ["*"] },
  { href: "/inventory", label: "Inventory", icon: "Boxes", roles: ["*"] },
  { href: "/invoices", label: "Invoices", icon: "FileText", roles: ["*"] },
  { href: "/quotations", label: "Quotations", icon: "FileCheck", roles: ["*"] },
  { href: "/payments", label: "Payments", icon: "CreditCard", roles: ["*"] },
  { href: "/reports", label: "Reports", icon: "BarChart3", roles: ["*"] },
  { href: "/gst", label: "GST & Accounting", icon: "Calculator", roles: ["*"] },
  { href: "/notifications", label: "Notifications", icon: "Bell", roles: ["*"] },
  { href: "/settings", label: "Settings", icon: "Settings", roles: ["OWNER", "ADMIN"] },
] as const;
