"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, AlertTriangle, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Appointment {
  id: string
  vaccineName: string
  date: string
  time: string
  location: string
  address: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  notes?: string
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    vaccineName: "COVID-19 mũi 4",
    date: "2024-12-15",
    time: "09:00",
    location: "Bệnh viện Đa khoa Thành phố",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    status: "confirmed",
  },
  {
    id: "2",
    vaccineName: "Vaccine cúm mùa",
    date: "2024-12-22",
    time: "14:30",
    location: "Trung tâm Y tế Quận 1",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    status: "pending",
  },
]

const vaccineOptions = [
  "COVID-19",
  "Cúm mùa",
  "Viêm gan A",
  "Viêm gan B",
  "Sởi",
  "Rubella",
  "Bạch hầu",
  "Ho gà",
  "Uốn ván",
]

export function VaccinationSchedule() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    vaccineName: "",
    date: "",
    time: "",
    location: "",
    notes: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Đã xác nhận</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xác nhận</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Đã hoàn thành</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleCreateAppointment = () => {
    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      address: "Địa chỉ sẽ được cập nhật",
      status: "pending",
    }
    setAppointments([...appointments, appointment])
    setNewAppointment({
      vaccineName: "",
      date: "",
      time: "",
      location: "",
      notes: "",
    })
    setIsDialogOpen(false)
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed" || apt.status === "pending")
  const completedAppointments = appointments.filter((apt) => apt.status === "completed")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Đặt lịch tiêm</h1>
          <p className="text-muted-foreground">Quản lý lịch tiêm chủng của bạn</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Đặt lịch mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Đặt lịch tiêm mới</DialogTitle>
              <DialogDescription>Điền thông tin để đặt lịch tiêm chủng</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="vaccine">Loại vaccine</Label>
                <Select
                  value={newAppointment.vaccineName}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, vaccineName: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại vaccine" />
                  </SelectTrigger>
                  <SelectContent>
                    {vaccineOptions.map((vaccine) => (
                      <SelectItem key={vaccine} value={vaccine}>
                        {vaccine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Giờ</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Địa điểm</Label>
                <Input
                  id="location"
                  placeholder="Nhập tên cơ sở y tế"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Ghi chú thêm (tùy chọn)"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreateAppointment}>Đặt lịch</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Lịch hẹn sắp tới
          </CardTitle>
          <CardDescription>Các mũi tiêm được lên lịch trong thời gian tới</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có lịch hẹn nào</p>
              <p className="text-sm text-gray-400">Đặt lịch tiêm để bắt đầu</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.vaccineName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.location}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{appointment.date}</span>
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(appointment.status)}
                    <Button size="sm" variant="outline">
                      Chi tiết
                    </Button>
                    {appointment.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Hủy
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Appointments */}
      {completedAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Lịch sử tiêm
            </CardTitle>
            <CardDescription>Các mũi tiêm đã hoàn thành</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.vaccineName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.location}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{appointment.date}</span>
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(appointment.status)}
                    <Button size="sm" variant="outline">
                      Xem chứng chỉ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Lưu ý quan trọng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <p>Vui lòng đến sớm 15 phút trước giờ hẹn để làm thủ tục</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <p>Mang theo CMND/CCCD và thẻ bảo hiểm y tế (nếu có)</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <p>Thông báo cho bác sĩ về tình trạng sức khỏe và thuốc đang sử dụng</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <p>Ở lại quan sát 15-30 phút sau khi tiêm để theo dõi phản ứng</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
