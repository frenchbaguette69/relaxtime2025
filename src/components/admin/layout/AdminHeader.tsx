"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Logo from "@/assets/naderzwart.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { Menu, ShieldCheck } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="sticky flex h-16 w-full items-center bg-white py-4 pr-6 pl-12 shadow-md lg:pr-12">
      <SidebarTrigger />
      <div className="flex-1">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              {/* <Image
                className="h-20 object-contain"
                src={Logo}
                alt="Nadergas logo"
                height={100}
                width={250}
              /> */}
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:gap-5">
            {session ? (
              <Button variant="outline">
                <ShieldCheck /> {session.user.email}
              </Button>
            ) : (
              <Link href="/api/auth/signin">
                <Button variant="secondary">Aanmelden</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Menu />
              </SheetTrigger>
              <SheetContent side="left">
                <div className="mt-12 flex flex-col gap-4">
                  {session ? (
                    <Button variant="outline">
                      <ShieldCheck /> {session.user.email}
                    </Button>
                  ) : (
                    <Link href="/api/auth/signin">
                      <Button variant="secondary">Aanmelden</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
