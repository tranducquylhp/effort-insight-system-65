
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FileText, Calendar, Calculator, DollarSign, MapPin, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Quản lý hợp đồng",
    url: "/contracts",
    icon: FileText,
  },
  {
    title: "Quản lý lịch sản xuất",
    url: "/production-schedule",
    icon: Calendar,
  },
  {
    title: "Tính toán phân bổ nỗ lực",
    url: "/effort-allocation",
    icon: Calculator,
  },
  {
    title: "Quản lý chi phí lương",
    url: "/cost-management",
    icon: DollarSign,
  },
  {
    title: "Quản lý phụ cấp onsite",
    url: "/onsite-allowance",
    icon: MapPin,
  },
  {
    title: "Bảng tính P&L",
    url: "/pnl-report",
    icon: BarChart3,
  },
];

function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hệ thống quản lý P&L</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b p-4">
            <SidebarTrigger />
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
