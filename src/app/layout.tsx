import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/Providers";

export const metadata: Metadata = {
  title: "Social App",
  description: "Base social network app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
