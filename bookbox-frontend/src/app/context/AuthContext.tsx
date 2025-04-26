"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  // Add more fields as needed
} | null;

type AuthContextType = {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = (userData: User) => {
    setUser(userData);
    // Optionally, save to localStorage/sessionStorage
  };

  const logout = () => {
    setUser(null);
    // Optionally, remove from localStorage/sessionStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}