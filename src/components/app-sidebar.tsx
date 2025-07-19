"use client";
import {
  AlignVerticalJustifyEnd,
  BadgePercent,
  Briefcase,
  LogOut,
  PackageSearch,
  Quote,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "bestellingen",
    url: "/admin/orders",
    icon: Quote,
  },
  {
    title: "Producten",
    url: "/admin/products",
    icon: PackageSearch,
  },
  {
    title: "Categorie",
    url: "/admin/categories",
    icon: AlignVerticalJustifyEnd,
  },
];

export function AppSidebar() {
  const session = useSession();

  if (!session.data) return null;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Massagestoel-kopen.com</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
  onClick={() => signOut({ callbackUrl: "/" })}
  className="border-destructive hover:bg-destructive text-destructive w-full hover:text-white"
  variant="outline"
>
  <LogOut /> Sign out
</Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
