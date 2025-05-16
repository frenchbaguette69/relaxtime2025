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
    title: "Orders",
    url: "/admin/orders",
    icon: Quote,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: PackageSearch,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: AlignVerticalJustifyEnd,
  },
  {
    title: "Promos",
    url: "/admin/promos",
    icon: BadgePercent,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: Briefcase,
  },
];

export function AppSidebar() {
  const session = useSession();

  if (!session.data) return null;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
              onClick={() => signOut()}
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
