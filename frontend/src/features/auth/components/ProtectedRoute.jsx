"use client";

import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * ProtectedRoute
 * A high-level HOC-like component that restricts access based on authentication and role.
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      } else if (requiredRole && user?.role !== requiredRole) {
        const dashboard = user?.role === "ADMIN" ? "/admin" :
          user?.role === "SELLER" ? "/seller" :
            user?.role === "RIDER" ? "/rider" : "/marketplace";
        router.push(dashboard);
      }
    }
  }, [loading, isAuthenticated, user, router, requiredRole]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-[#0b1326]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
