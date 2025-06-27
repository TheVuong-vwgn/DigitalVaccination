"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Shield, MapPin, Bell, Star, MessageSquare, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface DashboardStats {
  totalVaccinations: number
  upcomingAppointments: number
  certificates: number
  notifications: number
}

interface UpcomingAppointment {
  id: string
  vaccine: string
  date: string
  time: string
  location: string
  status: "confirmed" | "pending"
}

interface RecentActivity {
  id: string
  type: "vaccination" | "appointment" | "certificate"
  title: string
  date: string
  status: "completed" | "pending" | "scheduled"
}

interface PatientDashboardProps {
  onNavigate: (section: string) => void
}

export function PatientDashboard({ onNavigate }: PatientDashboardProps) {
  const [stats] = useState<DashboardStats>({
    totalVaccinations: 8,
    upcomingAppointments: 2,
    certificates: 5,
    notifications: 3,
  })

  const [upcomingAppointments] = useState<UpcomingAppointment[]>([
    {
      id: "1",
      vaccine: "COVID-19 mũi 4",
      date: "2024-12-15",
      time: "09:00",
      location: "Bệnh viện Đa khoa Thành phố",
      status: "confirmed",
    },
    {
      id: "2",
      vaccine: "Vaccine cúm mùa",
      date: "2024-12-22",
      time: "14:30",
      location: "Trung tâm Y tế Quận 1",
      status: "pending",
    },
  ])

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "vaccination",
      title: "Hoàn thành tiêm COVID-19 mũi 3",
      date: "2024-06-15",
      status: "completed",
    },
    {
      id: "2",
      type: "certificate",
      title: "Chứng chỉ tiêm cúm mùa đã sẵn sàng",
      date: "2024-12-10",
      status: "completed",
    },
    {
      id: "3",
      type: "appointment",
      title: "Đặt lịch tiêm COVID-19 mũi 4",
      date: "2024-12-13",
      status: "scheduled",
    },
  ])

  const vaccinationProgress = 85 // Percentage of recommended vaccinations completed

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "vaccination":
        return <Shield className="h-4 w-4 text-green-600" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "certificate":
        return <Shield className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trang chủ</h1>
        <p className="text-muted-foreground">Chào mừng bạn đến với VaxManager</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng mũi tiêm</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVaccinations}</div>
            <p className="text-xs text-muted-foreground">Đã hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch hẹn</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">Sắp tới</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chứng chỉ</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificates}</div>
            <p className="text-xs text-muted-foreground">Có sẵn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thông báo</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notifications}</div>
            <p className="text-xs text-muted-foreground">Chưa đọc</p>
          </CardContent>
        </Card>
      </div>

      {/* Vaccination Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Tiến độ tiêm chủng
          </CardTitle>
          <CardDescription>Mức độ hoàn thành các vaccine khuyến nghị</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Hoàn thành</span>
              <span>{vaccinationProgress}%</span>
            </div>
            <Progress value={vaccinationProgress} className="h-2" />
          </div>
          <div className="grid gap-2 md:grid-cols-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>COVID-19: Hoàn thành</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Cúm mùa: Cập nhật</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Viêm gan B: Cần mũi 3</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Lịch hẹn sắp tới
            </CardTitle>
            <CardDescription>Các mũi tiêm được lên lịch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{appointment.vaccine}</p>
                  <p className="text-sm text-muted-foreground">{appointment.location}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{appointment.date}</span>
                    <span>•</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                    {appointment.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" onClick={() => onNavigate("schedule")}>
              Xem tất cả lịch hẹn
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Hoạt động gần đây
            </CardTitle>
            <CardDescription>Các hoạt động tiêm chủng mới nhất</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                {getStatusIcon(activity.status)}
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" onClick={() => onNavigate("history")}>
              Xem lịch sử đầy đủ
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
          <CardDescription>Các tính năng thường sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => onNavigate("schedule")}
            >
              <Calendar className="h-6 w-6" />
              <span>Đặt lịch tiêm</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => onNavigate("locations")}
            >
              <MapPin className="h-6 w-6" />
              <span>Tìm địa điểm</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => onNavigate("certificate")}
            >
              <Shield className="h-6 w-6" />
              <span>Chứng chỉ tiêm</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => onNavigate("chatbot")}
            >
              <MessageSquare className="h-6 w-6" />
              <span>Trợ lý AI</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Lời khuyên sức khỏe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Theo dõi sức khỏe sau tiêm</p>
                <p className="text-sm text-muted-foreground">
                  Quan sát cơ thể trong 15-30 phút sau tiêm và theo dõi các triệu chứng trong 24-48 giờ tiếp theo.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Duy trì lịch tiêm định kỳ</p>
                <p className="text-sm text-muted-foreground">
                  Tiêm vaccine định kỳ theo khuyến cáo để duy trì miễn dịch tối ưu cho cơ thể.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Cập nhật thông tin sức khỏe</p>
                <p className="text-sm text-muted-foreground">
                  Thường xuyên cập nhật hồ sơ sức khỏe để nhận được tư vấn phù hợp nhất.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
