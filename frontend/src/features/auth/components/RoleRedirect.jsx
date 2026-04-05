"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

/**
 * RoleRedirect
 * A small utility component that automatically redirects a user to their specific dashboard
 * upon authentication.
 */
export default function RoleRedirect() {
  const { user, isAuthenticated, loading, getDashboardRoute } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role) {
      const dashboard = getDashboardRoute(user.role);
      router.push(dashboard);
    }
  }, [loading, isAuthenticated, user, router, getDashboardRoute]);

  return null;
}
