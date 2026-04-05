"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * ThemeManager
 * A utility component that syncs the Redux theme state with the HTML document element.
 */
export default function ThemeManager() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  return null; // This component doesn't render anything UI-related
}
