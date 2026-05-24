import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const demoUsers: Record<string, { password: string; role: string; name: string }> = {
    "owner@mediflow.ai": { password: "demo123", role: "OWNER", name: "Rajesh Verma" },
    "accountant@mediflow.ai": { password: "demo123", role: "ACCOUNTANT", name: "Priya Sharma" },
    "delivery@mediflow.ai": { password: "demo123", role: "DELIVERY_STAFF", name: "Amit Singh" },
  };

  const user = demoUsers[email?.toLowerCase()];
  if (user && user.password === password) {
    return NextResponse.json({
      token: "demo-jwt-token",
      user: { id: "1", email, name: user.name, role: user.role },
    });
  }

  if (password?.length >= 6) {
    return NextResponse.json({
      token: "demo-jwt-token",
      user: { id: crypto.randomUUID(), email, name: email.split("@")[0], role: "ACCOUNTANT" },
    });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
