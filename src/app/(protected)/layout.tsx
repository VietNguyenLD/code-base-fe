// import { redirect } from "next/navigation";
import type { ReactNode } from "react";
// import { ROUTES } from "@/shared/config";
import { getCurrentUser } from "@/shared/lib/authGuard";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    // redirect(ROUTES.PROTECTED.FEED);
  }

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      {children}
    </main>
  );
}
