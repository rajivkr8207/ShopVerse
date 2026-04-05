"use client";

import RoleRedirect from "@/features/auth/components/RoleRedirect";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Root Page
 * Serves as the intelligent entry point. 
 * If logged in -> Redirect to role-based dashboard.
 * If not logged in -> Show Landing Page or Login.
 */
export default function Home() {
  const { isAuthenticated, loading, handleGetMe } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) {
        const result = await handleGetMe();
        if (!result.success) {
          router.push("/auth/login");
        }
      }
    };
    initAuth();
  }, [isAuthenticated, handleGetMe, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-[#0b1326]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-8 border-indigo-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // If authenticated, RoleRedirect handles the logic
  return <RoleRedirect />;
}