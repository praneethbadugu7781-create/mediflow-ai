"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  signup: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "owner@mediflow.ai": {
    password: "demo123",
    user: { id: "1", email: "owner@mediflow.ai", name: "Rajesh Verma", role: "OWNER" },
  },
  "accountant@mediflow.ai": {
    password: "demo123",
    user: { id: "2", email: "accountant@mediflow.ai", name: "Priya Sharma", role: "ACCOUNTANT" },
  },
  "delivery@mediflow.ai": {
    password: "demo123",
    user: { id: "3", email: "delivery@mediflow.ai", name: "Amit Singh", role: "DELIVERY_STAFF" },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mediflow_user");
    if (stored) {
      try {
        // Restore the persisted client-only session after the initial server render.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("mediflow_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const demo = DEMO_USERS[email.toLowerCase()];
    if (demo && demo.password === password) {
      setUser(demo.user);
      localStorage.setItem("mediflow_user", JSON.stringify(demo.user));
      localStorage.setItem("mediflow_token", "demo-jwt-token");
      return true;
    }
    if (password.length >= 6) {
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split("@")[0],
        role: "ACCOUNTANT",
      };
      setUser(newUser);
      localStorage.setItem("mediflow_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(
    async (data: { name: string; email: string; password: string; role: UserRole }) => {
      const newUser: User = {
        id: crypto.randomUUID(),
        email: data.email,
        name: data.name,
        role: data.role,
      };
      setUser(newUser);
      localStorage.setItem("mediflow_user", JSON.stringify(newUser));
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("mediflow_user");
    localStorage.removeItem("mediflow_token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
