"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/stores/auth-store";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean | null>(() =>
    typeof window !== "undefined" ? isAuthenticated() : null
  );
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (checked === false) {
      router.replace("/login");
      return;
    }
    if (checked === null) setChecked(isAuthenticated());
  }, [checked, router]);

  useEffect(() => {
    const timeout = setTimeout(() => setTimedOut(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (checked === true) return <>{children}</>;
  if (checked === false || timedOut) return null;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}
