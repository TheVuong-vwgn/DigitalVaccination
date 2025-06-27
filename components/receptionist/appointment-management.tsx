"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, CalendarIcon, Phone, MessageSquare, CheckCircle, X, Clock, User } from "lucide-react"

export function AppointmentManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  const appointments = [
    {
      id: "1",
      patientName: "Nguyễn Văn A",
      patientPhone: "0123456789",
      patientEmail: "nguyenvana@email.com",
      appointmentDate: "2024-12-15",
      appointmentTime: "09:00",
      vaccine: "COVID-19 Pfizer",
      status: "Đã xác nhận",
      notes: "Bệnh nhân có tiền sử dị ứng penicillin",
      paymentStatus: "Đã thanh toán",
      createdAt: "2024-12-10T10:00:00",
    },
    {
      id: "2",
      patientName: "Trần Thị B",
      patientPhone: "0987654321",
      patientEmail: "tranthib@email.com",
      appointmentDate: "2024-12-15",
      appointmentTime: "09:30",
      vaccine: "Cúm mùa 2024",
      status: "Chờ xác nhận",
      notes: "",
      paymentStatus: "Chưa thanh toán",
      createdAt: "2024-12-12T14:30:00",
    },
    {
      id: "3",
      patientName: "Lê Văn C",
      patientPhone: "0456789123",
      patientEmail: "levanc@email.com",
      appointmentDate: "2024-12-15",
      appointmentTime: "10:00",
      vaccine: "Viêm gan B",
      status: "Đã check-in",
      notes: "Bệnh nhân đến sớm 15 phút",
      paymentStatus: "Đã thanh toán",
      createdAt: "2024-12-11T16:20:00",
    },
    {
      id: "4",
      patientName: "Phạm Thị D",
      patientPhone: "0789123456",
      patientEmail: "phamthid@email.com",
      appointmentDate: "2024-12-15",
      appointmentTime: "10:30",
      vaccine: "HPV",
      status: "Đã hủy",
      notes: "Bệnh nhân hủy do có việc đột xuất",
      paymentStatus: "Đã hoàn tiền",
      createdAt: "2024-12-09T11:15:00",
    },
  ]

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patientPhone.includes(searchQuery) ||
      appointment.vaccine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesDate = appointment.appointmentDate === dateFilter.toISOString().split("T")[0]
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xác nhận":
        return "default"
      case "Chờ xác nhận":
        return "secondary"
      case "Đã check-in":
        return "default"
      case "Đã hủy":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return "default"
      case "Chưa thanh toán":
        return "secondary"
      case "Đã hoàn tiền":
        return "outline"
      default:
        return "outline"
    }
  }

  const confirmAppointment = (appointmentId: string) => {
    console.log("Confirming appointment:", appointmentId)
  }

  const cancelAppointment = (appointmentId: string) => {
    console.log("Cancelling appointment:", appointmentId)
  }

  const checkInPatient = (appointmentId: string) => {
    console.log("Checking in patient:", appointmentId)
  }

  const callPatient = (phone: string) => {
    console.log("Calling patient:", phone)
  }

  const sendSMS = (phone: string) => {
    console.log("Sending SMS to:", phone)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Quản lý lịch hẹn</h2>
        <p className="text-muted-foreground">Xem và quản lý lịch hẹn của bệnh nhân</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên, SĐT, vaccine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
                <SelectItem value="Đã xác nhận">Đã xác nhận</SelectItem>
                <SelectItem value="Đã check-in">Đã check-in</SelectItem>
                <SelectItem value="Đã hủy">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <Calendar mode="single" selected={dateFilter} onSelect={(date) => date && setDateFilter(date)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                    <p className="text-muted-foreground">{appointment.patientPhone}</p>
                    <p className="text-sm text-muted-foreground">{appointment.patientEmail}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>
                          {new Date(appointment.appointmentDate).toLocaleDateString("vi-VN")} -{" "}
                          {appointment.appointmentTime}
                        </span>
                      </div>
                      <span>{appointment.vaccine}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    <Badge variant={getPaymentStatusColor(appointment.paymentStatus)}>
                      {appointment.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Đặt lịch: {new Date(appointment.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              {appointment.notes && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Ghi chú:</strong> {appointment.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedAppointment(appointment)}>
                      <User className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
                      <DialogDescription>Thông tin chi tiết về lịch hẹn và bệnh nhân</DialogDescription>
                    </DialogHeader>
                    {selectedAppointment && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium">Họ và tên</p>
                            <p className="text-muted-foreground">{selectedAppointment.patientName}</p>
                          </div>
                          <div>
                            <p className="font-medium">Số điện thoại</p>
                            <p className="text-muted-foreground">{selectedAppointment.patientPhone}</p>
                          </div>
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground">{selectedAppointment.patientEmail}</p>
                          </div>
                          <div>
                            <p className="font-medium">Vaccine</p>
                            <p className="text-muted-foreground">{selectedAppointment.vaccine}</p>
                          </div>
                          <div>
                            <p className="font-medium">Ngày hẹn</p>
                            <p className="text-muted-foreground">
                              {new Date(selectedAppointment.appointmentDate).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Giờ hẹn</p>
                            <p className="text-muted-foreground">{selectedAppointment.appointmentTime}</p>
                          </div>
                          <div>
                            <p className="font-medium">Trạng thái</p>
                            <Badge variant={getStatusColor(selectedAppointment.status)}>
                              {selectedAppointment.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium">Thanh toán</p>
                            <Badge variant={getPaymentStatusColor(selectedAppointment.paymentStatus)}>
                              {selectedAppointment.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                        {selectedAppointment.notes && (
                          <div>
                            <p className="font-medium">Ghi chú</p>
                            <p className="text-muted-foreground">{selectedAppointment.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button size="sm" variant="outline" onClick={() => callPatient(appointment.patientPhone)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi điện
                </Button>

                <Button size="sm" variant="outline" onClick={() => sendSMS(appointment.patientPhone)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Gửi SMS
                </Button>

                {appointment.status === "Chờ xác nhận" && (
                  <Button size="sm" onClick={() => confirmAppointment(appointment.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Xác nhận
                  </Button>
                )}

                {appointment.status === "Đã xác nhận" && (
                  <Button size="sm" onClick={() => checkInPatient(appointment.id)}>
                    <Clock className="h-4 w-4 mr-2" />
                    Check-in
                  </Button>
                )}

                {(appointment.status === "Chờ xác nhận" || appointment.status === "Đã xác nhận") && (
                  <Button size="sm" variant="destructive" onClick={() => cancelAppointment(appointment.id)}>
                    <X className="h-4 w-4 mr-2" />
                    Hủy lịch
                  </Button>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      Đổi lịch
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Đổi lịch hẹn</DialogTitle>
                      <DialogDescription>Thay đổi thời gian lịch hẹn cho {appointment.patientName}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="newDate">Ngày mới</Label>
                          <Input id="newDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="newTime">Giờ mới</Label>
                          <Input id="newTime" type="time" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="reason">Lý do đổi lịch</Label>
                        <Textarea id="reason" placeholder="Nhập lý do đổi lịch..." />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Hủy</Button>
                        <Button>Xác nhận đổi lịch</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có lịch hẹn</h3>
            <p className="text-muted-foreground">Không tìm thấy lịch hẹn nào phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê lịch hẹn</CardTitle>
          <CardDescription>Tổng quan lịch hẹn trong ngày</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-sm text-muted-foreground">Tổng số lịch hẹn</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter((a) => a.status === "Đã xác nhận").length}
              </div>
              <p className="text-sm text-muted-foreground">Đã xác nhận</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {appointments.filter((a) => a.status === "Chờ xác nhận").length}
              </div>
              <p className="text-sm text-muted-foreground">Chờ xác nhận</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter((a) => a.status === "Đã check-in").length}
              </div>
              <p className="text-sm text-muted-foreground">Đã check-in</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
