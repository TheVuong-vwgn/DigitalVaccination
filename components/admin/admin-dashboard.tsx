"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Package, AlertTriangle, BarChart3, TrendingUp, MapPin, Syringe } from "lucide-react"
import { UserManagement } from "./user-management"
import { VaccineManagement } from "./vaccine-management"
import { StatisticsReport } from "./statistics-report"

type ActiveSection = "dashboard" | "users" | "vaccines" | "alerts" | "statistics"

// Placeholder components
function SystemAlerts() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Cảnh báo hệ thống</h2>
      <Card>
        <CardContent className="p-6">
          <p>Chức năng cảnh báo hệ thống đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />
      case "vaccines":
        return <VaccineManagement />
      case "alerts":
        return <SystemAlerts />
      case "statistics":
        return <StatisticsReport />
      default:
        return <DashboardOverview onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản trị hệ thống</h1>
          <p className="text-muted-foreground">Tổng quan và quản lý hệ thống tiêm chủng</p>
        </div>
        {activeSection !== "dashboard" && (
          <Button variant="outline" onClick={() => setActiveSection("dashboard")}>
            Về trang chủ
          </Button>
        )}
      </div>

      {renderSection()}
    </div>
  )
}

function DashboardOverview({ onNavigate }: { onNavigate: (section: ActiveSection) => void }) {
  const stats = {
    totalUsers: 15420,
    totalVaccinations: 45680,
    activeLocations: 25,
    vaccineStock: 8500,
    monthlyGrowth: 12.5,
    weeklyVaccinations: 1250,
  }

  const alerts = [
    {
      id: "1",
      type: "warning",
      title: "Vaccine sắp hết hạn",
      message: "Có 150 liều vaccine cúm mùa sẽ hết hạn trong 7 ngày",
      location: "Bệnh viện Đa khoa Thành phố",
    },
    {
      id: "2",
      type: "error",
      title: "Tồn kho thấp",
      message: "Vaccine HPV chỉ còn 25 liều tại Trung tâm Y tế Quận 1",
      location: "Trung tâm Y tế Quận 1",
    },
    {
      id: "3",
      type: "info",
      title: "Cập nhật hệ thống",
      message: "Hệ thống sẽ được bảo trì vào 2:00 AM ngày mai",
      location: "Toàn hệ thống",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />+{stats.monthlyGrowth}% so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng mũi tiêm</CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVaccinations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.weeklyVaccinations} trong tuần này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Địa điểm hoạt động</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLocations}</div>
            <p className="text-xs text-muted-foreground">Trên toàn quốc</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tồn kho vaccine</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vaccineStock.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Liều vaccine có sẵn</p>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Cảnh báo hệ thống
              </CardTitle>
              <CardDescription>Các vấn đề cần được xử lý ngay</CardDescription>
            </div>
            <Button variant="outline" onClick={() => onNavigate("alerts")}>
              Xem tất cả
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === "error"
                    ? "border-red-500 bg-red-50"
                    : alert.type === "warning"
                      ? "border-orange-500 bg-orange-50"
                      : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <MapPin className="inline h-3 w-3 mr-1" />
                      {alert.location}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.type === "error" ? "destructive" : alert.type === "warning" ? "secondary" : "default"
                    }
                  >
                    {alert.type === "error" ? "Khẩn cấp" : alert.type === "warning" ? "Cảnh báo" : "Thông tin"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("users")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              Quản lý người dùng
            </CardTitle>
            <CardDescription>Quản lý tài khoản và phân quyền</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("vaccines")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Package className="h-4 w-4 text-green-600" />
              </div>
              Quản lý vaccine
            </CardTitle>
            <CardDescription>Quản lý kho vaccine và nhập xuất</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("alerts")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              Cảnh báo
            </CardTitle>
            <CardDescription>Theo dõi cảnh báo và sự cố</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("statistics")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
              Thống kê
            </CardTitle>
            <CardDescription>Báo cáo và phân tích dữ liệu</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Các hoạt động mới nhất trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Syringe className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">125 mũi tiêm hoàn thành</p>
                  <p className="text-xs text-muted-foreground">Hôm nay</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">45 người dùng mới đăng ký</p>
                  <p className="text-xs text-muted-foreground">Hôm nay</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <Package className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nhập 500 liều vaccine COVID-19</p>
                  <p className="text-xs text-muted-foreground">2 giờ trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tình trạng hệ thống</CardTitle>
            <CardDescription>Trạng thái hoạt động của các thành phần</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Hệ thống đặt lịch</span>
                <Badge variant="default">Hoạt động</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Cổng thanh toán</span>
                <Badge variant="default">Hoạt động</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Hệ thống thông báo</span>
                <Badge variant="secondary">Bảo trì</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">API tích hợp</span>
                <Badge variant="default">Hoạt động</Badge>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Hiệu suất hệ thống</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
