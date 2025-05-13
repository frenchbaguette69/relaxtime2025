import "@/styles/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";

import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";

import { NextAuthProvider } from "@/context/NextAuthProvider";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Toaster } from "sonner";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin | Relax-Time",
  description: "De beste massagestoelen voor thuis en op kantoor",
};

export default async function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const sess = await auth();

  console.log("sess", sess);

  // @ts-ignore
  if (sess?.user?.role !== "ADMIN") return redirect("/api/auth/signin");

  return (
    <html lang="nl" className="relative">
      <body className={twMerge(dmSans.className, "antialiased")}>
        <NextAuthProvider session={session}>
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full">
              <AdminHeader />
              <div className="lg:px-12 lg:py-8">{children}</div>
              <Toaster />
            </main>
          </SidebarProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
