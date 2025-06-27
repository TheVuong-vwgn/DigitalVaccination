"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Syringe, Clock, AlertTriangle, FileText } from "lucide-react"

export function DoctorSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  const appointments = [
    {
      id: "1",
      time: "09:00",
      patientName: "Nguyễn Văn A",
      patientAge: 35,
      patientPhone: "0123456789",
      vaccine: "COVID-19 Pfizer",
      medicalHistory: ["Tiểu đường", "Cao huyết áp"],
      allergies: "Không có",
      notes: "Bệnh nhân cần theo dõi đường huyết",
      status: "Đã hoàn thành",
      room: "Phòng 101",
    },
    {
      id: "2",
      time: "09:30",
      patientName: "Trần Thị B",
      patientAge: 28,
      patientPhone: "0987654321",
      vaccine: "Cúm mùa 2024",
      medicalHistory: ["Hen suyễn"],
      allergies: "Dị ứng penicillin",
      notes: "Cần chuẩn bị thuốc chống dị ứng",
      status: "Đang chờ",
      room: "Phòng 101",
    },
    {
      id: "3",
      time: "10:00",
      patientName: "Lê Văn C",
      patientAge: 42,
      patientPhone: "0456789123",
      vaccine: "Viêm gan B",
      medicalHistory: [],
      allergies: "Không có",
      notes: "",
      status: "Đã lên lịch",
      room: "Phòng 101",
    },
    {
      id: "4",
      time: "10:30",
      patientName: "Phạm Thị D",
      patientAge: 25,
      patientPhone: "0789123456",
      vaccine: "HPV",
      medicalHistory: [],
      allergies: "Không có",
      notes: "Lần tiêm đầu tiên trong chuỗi 3 mũi",
      status: "Đã lên lịch",
      room: "Phòng 101",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã hoàn thành":
        return "default"
      case "Đang chờ":
        return "secondary"
      case "Đã lên lịch":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Lịch làm việc</h2>
        <p className="text-muted-foreground">Xem lịch hẹn và thông tin bệnh nhân</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Chọn ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} />
          </CardContent>
        </Card>

        {/* Schedule for Selected Date */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lịch hẹn ngày {selectedDate?.toLocaleDateString("vi-VN")}</CardTitle>
            <CardDescription>Danh sách bệnh nhân và thông tin tiêm chủng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.patientName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.patientAge} tuổi - {appointment.patientPhone}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Syringe className="h-3 w-3" />
                            <span>{appointment.vaccine}</span>
                          </div>
                          <span>{appointment.room}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                  </div>

                  {/* Medical Alerts */}
                  {(appointment.allergies !== "Không có" ||
                    appointment.medicalHistory.length > 0 ||
                    appointment.notes) && (
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-yellow-800">Lưu ý y tế:</p>
                          {appointment.medicalHistory.length > 0 && (
                            <p className="text-sm text-yellow-700">Bệnh nền: {appointment.medicalHistory.join(", ")}</p>
                          )}
                          {appointment.allergies !== "Không có" && (
                            <p className="text-sm text-yellow-700">Dị ứng: {appointment.allergies}</p>
                          )}
                          {appointment.notes && <p className="text-sm text-yellow-700">Ghi chú: {appointment.notes}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedAppointment(appointment)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Hồ sơ BN
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Hồ sơ bệnh nhân</DialogTitle>
                          <DialogDescription>Thông tin chi tiết về bệnh nhân và lịch sử y tế</DialogDescription>
                        </DialogHeader>
                        {selectedAppointment && (
                          <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <p className="font-medium">Họ và tên</p>
                                <p className="text-muted-foreground">{selectedAppointment.patientName}</p>
                              </div>
                              <div>
                                <p className="font-medium">Tuổi</p>
                                <p className="text-muted-foreground">{selectedAppointment.patientAge}</p>
                              </div>
                              <div>
                                <p className="font-medium">Số điện thoại</p>
                                <p className="text-muted-foreground">{selectedAppointment.patientPhone}</p>
                              </div>
                              <div>
                                <p className="font-medium">Vaccine</p>
                                <p className="text-muted-foreground">{selectedAppointment.vaccine}</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Tiền sử bệnh</p>
                              <p className="text-muted-foreground">
                                {selectedAppointment.medicalHistory.length > 0
                                  ? selectedAppointment.medicalHistory.join(", ")
                                  : "Không có"}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Dị ứng</p>
                              <p className="text-muted-foreground">{selectedAppointment.allergies}</p>
                            </div>
                            {selectedAppointment.notes && (
                              <div>
                                <p className="font-medium">Ghi chú đặc biệt</p>
                                <p className="text-muted-foreground">{selectedAppointment.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {appointment.status === "Đã lên lịch" && (
                      <Button size="sm">
                        <Syringe className="h-4 w-4 mr-2" />
                        Bắt đầu tiêm
                      </Button>
                    )}

                    {appointment.status === "Đang chờ" && (
                      <Button size="sm">
                        <Syringe className="h-4 w-4 mr-2" />
                        Tiêm ngay
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
