"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Syringe, Clock, CheckCircle } from "lucide-react"
import { DoctorSchedule } from "./doctor-schedule"
import { VaccinationConfirmation } from "./vaccination-confirmation"

type ActiveSection = "dashboard" | "schedule" | "confirmation"

export function DoctorDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "schedule":
        return <DoctorSchedule />
      case "confirmation":
        return <VaccinationConfirmation />
      default:
        return <DashboardOverview onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bác sĩ</h1>
          <p className="text-muted-foreground">Lịch làm việc và xác nhận tiêm chủng</p>
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
    totalAppointments: 12,
    completedVaccinations: 8,
    pendingConfirmations: 4,
    nextAppointment: "09:30",
  }

  const todayAppointments = [
    {
      id: "1",
      time: "09:00",
      patientName: "Nguyễn Văn A",
      vaccine: "COVID-19 Pfizer",
      status: "Hoàn thành",
      notes: "Không có phản ứng phụ",
    },
    {
      id: "2",
      time: "09:30",
      patientName: "Trần Thị B",
      vaccine: "Cúm mùa",
      status: "Đang chờ",
      notes: "Bệnh nhân có tiền sử dị ứng",
    },
    {
      id: "3",
      time: "10:00",
      patientName: "Lê Văn C",
      vaccine: "Viêm gan B",
      status: "Chờ xác nhận",
      notes: "",
    },
    {
      id: "4",
      time: "10:30",
      patientName: "Phạm Thị D",
      vaccine: "HPV",
      status: "Đã lên lịch",
      notes: "Lần tiêm đầu tiên",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch hẹn hôm nay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">Tổng số lịch hẹn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã tiêm</CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.completedVaccinations}</div>
            <p className="text-xs text-muted-foreground">Mũi tiêm hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xác nhận</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.pendingConfirmations}</div>
            <p className="text-xs text-muted-foreground">Cần xác nhận</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch tiếp theo</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.nextAppointment}</div>
            <p className="text-xs text-muted-foreground">Trần Thị B</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch làm việc hôm nay</CardTitle>
              <CardDescription>Danh sách bệnh nhân và vaccine cần tiêm</CardDescription>
            </div>
            <Button onClick={() => onNavigate("schedule")}>Xem chi tiết</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {appointment.time} - {appointment.patientName}
                    </p>
                    <p className="text-sm text-muted-foreground">{appointment.vaccine}</p>
                    {appointment.notes && <p className="text-xs text-orange-600">⚠️ {appointment.notes}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      appointment.status === "Hoàn thành"
                        ? "default"
                        : appointment.status === "Đang chờ"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {appointment.status}
                  </Badge>
                  {appointment.status === "Chờ xác nhận" && <Button size="sm">Xác nhận</Button>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("schedule")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Xem lịch làm việc
            </CardTitle>
            <CardDescription>Xem chi tiết lịch hẹn và thông tin bệnh nhân</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("confirmation")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5 text-green-600" />
              Xác nhận tiêm
            </CardTitle>
            <CardDescription>Xác nhận các mũi tiêm đã thực hiện</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
