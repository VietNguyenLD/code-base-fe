import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/shared/lib/authGuard";
import { ROUTES } from "@/shared/config";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  // if (!user) {
  //   redirect(ROUTES.PUBLIC.LOGIN);
  // }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-white md:block">
        <div className="p-4 font-bold">Social App</div>
        {/* TODO: nav items */}
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-white px-4 py-3">
          <div className="font-semibold">News Feed</div>
          {/* <div className="text-sm text-gray-600">Hi, {user.username}</div> */}
        </header>
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
