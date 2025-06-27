"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, FileText, Package, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { AppointmentManagement } from "./appointment-management"
import { PaymentConfirmation } from "./payment-confirmation"
import { CertificateUpdate } from "./certificate-update"
import { VaccineInventory } from "./vaccine-inventory"

type ActiveSection = "dashboard" | "appointments" | "payments" | "certificates" | "inventory"

export function ReceptionistDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "appointments":
        return <AppointmentManagement />
      case "payments":
        return <PaymentConfirmation />
      case "certificates":
        return <CertificateUpdate />
      case "inventory":
        return <VaccineInventory />
      default:
        return <DashboardOverview onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lễ tân</h1>
          <p className="text-muted-foreground">Quản lý lịch hẹn, thanh toán và chứng chỉ</p>
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
  const todayStats = {
    totalAppointments: 28,
    checkedIn: 15,
    pendingPayments: 8,
    completedPayments: 20,
    pendingCertificates: 5,
    lowStockAlerts: 3,
  }

  const urgentTasks = [
    {
      id: "1",
      type: "appointment",
      title: "Xác nhận lịch hẹn",
      description: "3 lịch hẹn cần xác nhận trong 30 phút tới",
      priority: "high",
      time: "09:30",
    },
    {
      id: "2",
      type: "payment",
      title: "Thanh toán chờ xử lý",
      description: "8 thanh toán cần được xác nhận",
      priority: "medium",
      time: "10:00",
    },
    {
      id: "3",
      type: "certificate",
      title: "Chứng chỉ cần cập nhật",
      description: "5 chứng chỉ tiêm chủng cần được tạo",
      priority: "medium",
      time: "10:30",
    },
    {
      id: "4",
      type: "inventory",
      title: "Cảnh báo tồn kho",
      description: "3 loại vaccine sắp hết",
      priority: "high",
      time: "11:00",
    },
  ]

  const recentActivities = [
    {
      id: "1",
      action: "Xác nhận lịch hẹn",
      patient: "Nguyễn Văn A",
      time: "09:15",
      status: "completed",
    },
    {
      id: "2",
      action: "Xử lý thanh toán",
      patient: "Trần Thị B",
      time: "09:10",
      status: "completed",
    },
    {
      id: "3",
      action: "Tạo chứng chỉ",
      patient: "Lê Văn C",
      time: "09:05",
      status: "completed",
    },
    {
      id: "4",
      action: "Check-in bệnh nhân",
      patient: "Phạm Thị D",
      time: "09:00",
      status: "completed",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch hẹn hôm nay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{todayStats.checkedIn} đã check-in</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thanh toán</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.completedPayments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">{todayStats.pendingPayments} chờ xử lý</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chứng chỉ</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.pendingCertificates}</div>
            <p className="text-xs text-muted-foreground">Cần tạo chứng chỉ</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Công việc cần xử lý gấp
          </CardTitle>
          <CardDescription>Các nhiệm vụ ưu tiên cao cần được hoàn thành</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {urgentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    {task.type === "appointment" && <Calendar className="h-4 w-4 text-blue-600" />}
                    {task.type === "payment" && <CreditCard className="h-4 w-4 text-blue-600" />}
                    {task.type === "certificate" && <FileText className="h-4 w-4 text-blue-600" />}
                    {task.type === "inventory" && <Package className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(task.priority)}>
                    {task.priority === "high" ? "Khẩn cấp" : "Trung bình"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{task.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("appointments")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              Quản lý lịch hẹn
            </CardTitle>
            <CardDescription>Xem và quản lý lịch hẹn của bệnh nhân</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("payments")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <CreditCard className="h-4 w-4 text-green-600" />
              </div>
              Xử lý thanh toán
            </CardTitle>
            <CardDescription>Xác nhận và xử lý thanh toán</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("certificates")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              Chứng chỉ tiêm
            </CardTitle>
            <CardDescription>Tạo và quản lý chứng chỉ</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("inventory")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <Package className="h-4 w-4 text-orange-600" />
              </div>
              Kho vaccine
            </CardTitle>
            <CardDescription>Quản lý tồn kho vaccine</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Các thao tác vừa thực hiện</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.patient} - {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông báo quan trọng</CardTitle>
            <CardDescription>Cập nhật và thông báo mới nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Cập nhật hệ thống</p>
                <p className="text-xs text-blue-600">Hệ thống sẽ bảo trì từ 22:00-23:00 hôm nay</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">Vaccine mới</p>
                <p className="text-xs text-green-600">Đã nhập 500 liều vaccine COVID-19 mới</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-medium text-orange-800">Lưu ý quan trọng</p>
                <p className="text-xs text-orange-600">Kiểm tra kỹ thông tin trước khi tạo chứng chỉ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
