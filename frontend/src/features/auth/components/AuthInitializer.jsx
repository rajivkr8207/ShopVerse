'use client'
import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

/**
 * AuthInitializer
 * Automatically fetches the current user session on application mount.
 * This ensures that even on page refresh, the user's authentication state is restored.
 */
export default function AuthInitializer() {
  const { handleGetMe, isAuthenticated, loading } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (!initialized.current && !isAuthenticated) {
      initialized.current = true;
      handleGetMe();
    }
  }, [handleGetMe, isAuthenticated]);

  return null; // Side-effect only component
}
