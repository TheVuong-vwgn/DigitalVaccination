"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  MapPin,
  QrCode,
  Settings,
  Shield,
  Syringe,
  User,
  Users,
  Wallet,
  BarChart3,
  Package,
  MessageSquare,
  Star,
  Camera,
  Clock,
  AlertTriangle,
} from "lucide-react"

type UserRole = "patient" | "receptionist" | "doctor" | "admin" | "verifier"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: UserRole
  onLogout: () => void
  onNavigate?: (section: string) => void
}

const menuItems = {
  patient: [
    { title: "Trang chủ", icon: Home, href: "#", section: "dashboard" },
    { title: "Hồ sơ cá nhân", icon: User, href: "#", section: "profile" },
    { title: "Tìm địa điểm tiêm", icon: MapPin, href: "#", section: "locations" },
    { title: "Đặt lịch tiêm", icon: Calendar, href: "#", section: "schedule" },
    { title: "Thanh toán", icon: Wallet, href: "#", section: "payment" },
    { title: "Lịch sử tiêm", icon: FileText, href: "#", section: "history" },
    { title: "Chứng chỉ tiêm", icon: Shield, href: "#", section: "certificate" },
    { title: "Thông báo", icon: Bell, href: "#", section: "notifications" },
    { title: "Đánh giá", icon: Star, href: "#", section: "reviews" },
    { title: "Chatbot AI", icon: MessageSquare, href: "#", section: "chatbot" },
  ],
  receptionist: [
    { title: "Trang chủ", icon: Home, href: "#", section: "dashboard" },
    { title: "Quản lý lịch hẹn", icon: Calendar, href: "#", section: "appointments" },
    { title: "Xác nhận thanh toán", icon: Wallet, href: "#", section: "payments" },
    { title: "Cập nhật chứng chỉ", icon: Shield, href: "#", section: "certificates" },
    { title: "Quản lý kho vaccine", icon: Package, href: "#", section: "inventory" },
    { title: "Thông báo", icon: Bell, href: "#", section: "notifications" },
  ],
  doctor: [
    { title: "Trang chủ", icon: Home, href: "#", section: "dashboard" },
    { title: "Lịch làm việc", icon: Calendar, href: "#", section: "schedule" },
    { title: "Xác nhận tiêm", icon: Syringe, href: "#", section: "confirmation" },
    { title: "Bệnh nhân hôm nay", icon: Users, href: "#", section: "patients" },
    { title: "Thông báo", icon: Bell, href: "#", section: "notifications" },
  ],
  admin: [
    { title: "Trang chủ", icon: Home, href: "#", section: "dashboard" },
    { title: "Quản lý người dùng", icon: Users, href: "#", section: "users" },
    { title: "Vaccine và kho", icon: Package, href: "#", section: "vaccines" },
    { title: "Cảnh báo vaccine", icon: AlertTriangle, href: "#", section: "alerts" },
    { title: "Thống kê", icon: BarChart3, href: "#", section: "statistics" },
    { title: "Cài đặt hệ thống", icon: Settings, href: "#", section: "settings" },
  ],
  verifier: [
    { title: "Trang chủ", icon: Home, href: "#", section: "dashboard" },
    { title: "Quét QR chứng chỉ", icon: QrCode, href: "#", section: "scanner" },
    { title: "Camera quét", icon: Camera, href: "#", section: "camera" },
    { title: "Lịch sử xác minh", icon: Clock, href: "#", section: "history" },
  ],
}

const roleLabels = {
  patient: "Người dân",
  receptionist: "Lễ tân",
  doctor: "Bác sĩ",
  admin: "Quản trị viên",
  verifier: "Người xác minh",
}

const roleColors = {
  patient: "bg-blue-500",
  receptionist: "bg-green-500",
  doctor: "bg-purple-500",
  admin: "bg-red-500",
  verifier: "bg-orange-500",
}

export function DashboardLayout({ children, userRole, onLogout, onNavigate }: DashboardLayoutProps) {
  const [notifications] = useState(3)

  // Fallback to patient menu if userRole is invalid
  const currentMenuItems = menuItems[userRole] || menuItems.patient
  const currentRoleLabel = roleLabels[userRole] || "Người dùng"
  const currentRoleColor = roleColors[userRole] || "bg-gray-500"

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Syringe className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">VaxManager</span>
                <span className="text-xs text-muted-foreground">Quản lý tiêm chủng</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarMenu>
              {currentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!onNavigate}
                    onClick={onNavigate ? () => onNavigate(item.section || item.href.replace("#", "")) : undefined}
                  >
                    {onNavigate ? (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <a href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-xs">
                    <span>Người dùng</span>
                    <Badge variant="secondary" className={`text-xs ${currentRoleColor} text-white`}>
                      {currentRoleLabel}
                    </Badge>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
                )}
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
