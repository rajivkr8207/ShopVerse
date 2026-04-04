"use client";

import RoleRedirect from "@/features/auth/components/RoleRedirect";

/**
 * Legacy Dashboard Route
 * Redirects to the role-specific dashboard using the central RoleRedirect component.
 */
export default function Page() {
  return <RoleRedirect />;
}
