"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, FileText, Download, Send, QrCode, CheckCircle, User } from "lucide-react"

export function CertificateUpdate() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  const certificates = [
    {
      id: "CERT001",
      patientName: "Nguyễn Văn A",
      patientPhone: "0123456789",
      patientEmail: "nguyenvana@email.com",
      vaccine: "COVID-19 Pfizer",
      vaccinationDate: "2024-12-15",
      doctor: "BS. Trần Văn B",
      batchNumber: "PF2024121500001",
      status: "Đã tạo",
      createdAt: "2024-12-15T10:30:00",
      qrCode: "QR_CERT001_2024",
      notes: "",
    },
    {
      id: "CERT002",
      patientName: "Trần Thị B",
      patientPhone: "0987654321",
      patientEmail: "tranthib@email.com",
      vaccine: "Cúm mùa 2024",
      vaccinationDate: "2024-12-15",
      doctor: "BS. Lê Thị C",
      batchNumber: "FLU2024121500001",
      status: "Chờ tạo",
      createdAt: "",
      qrCode: "",
      notes: "Chờ xác nhận tiêm từ bác sĩ",
    },
    {
      id: "CERT003",
      patientName: "Lê Văn C",
      patientPhone: "0456789123",
      patientEmail: "levanc@email.com",
      vaccine: "Viêm gan B",
      vaccinationDate: "2024-12-15",
      doctor: "BS. Phạm Văn D",
      batchNumber: "HBV2024121500001",
      status: "Đã gửi",
      createdAt: "2024-12-15T11:00:00",
      qrCode: "QR_CERT003_2024",
      notes: "Đã gửi qua email và SMS",
    },
    {
      id: "CERT004",
      patientName: "Phạm Thị D",
      patientPhone: "0789123456",
      patientEmail: "phamthid@email.com",
      vaccine: "HPV",
      vaccinationDate: "2024-12-15",
      doctor: "BS. Hoàng Văn E",
      batchNumber: "HPV2024121500001",
      status: "Lỗi",
      createdAt: "2024-12-15T12:00:00",
      qrCode: "",
      notes: "Lỗi khi tạo QR code, cần tạo lại",
    },
  ]

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.patientPhone.includes(searchQuery) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã tạo":
        return "default"
      case "Chờ tạo":
        return "secondary"
      case "Đã gửi":
        return "default"
      case "Lỗi":
        return "destructive"
      default:
        return "outline"
    }
  }

  const createCertificate = (certId: string) => {
    console.log("Creating certificate:", certId)
  }

  const downloadCertificate = (certId: string) => {
    console.log("Downloading certificate:", certId)
  }

  const sendCertificate = (certId: string) => {
    console.log("Sending certificate:", certId)
  }

  const regenerateCertificate = (certId: string) => {
    console.log("Regenerating certificate:", certId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Quản lý chứng chỉ</h2>
        <p className="text-muted-foreground">Tạo và quản lý chứng chỉ tiêm chủng</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên, SĐT hoặc mã chứng chỉ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="Chờ tạo">Chờ tạo</SelectItem>
                <SelectItem value="Đã tạo">Đã tạo</SelectItem>
                <SelectItem value="Đã gửi">Đã gửi</SelectItem>
                <SelectItem value="Lỗi">Lỗi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Certificates List */}
      <div className="space-y-4">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{certificate.patientName}</h3>
                    <p className="text-muted-foreground">{certificate.patientPhone}</p>
                    <p className="text-sm text-muted-foreground">{certificate.vaccine}</p>
                    <p className="text-sm text-muted-foreground">Mã: {certificate.id}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>Ngày tiêm: {new Date(certificate.vaccinationDate).toLocaleDateString("vi-VN")}</span>
                      <span>BS: {certificate.doctor}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusColor(certificate.status)} className="mb-2">
                    {certificate.status}
                  </Badge>
                  {certificate.createdAt && (
                    <p className="text-xs text-muted-foreground">
                      Tạo: {new Date(certificate.createdAt).toLocaleString("vi-VN")}
                    </p>
                  )}
                </div>
              </div>

              {certificate.notes && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Ghi chú:</strong> {certificate.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedCertificate(certificate)}>
                      <User className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chi tiết chứng chỉ</DialogTitle>
                      <DialogDescription>Thông tin chi tiết về chứng chỉ tiêm chủng</DialogDescription>
                    </DialogHeader>
                    {selectedCertificate && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium">Mã chứng chỉ</p>
                            <p className="text-muted-foreground">{selectedCertificate.id}</p>
                          </div>
                          <div>
                            <p className="font-medium">Bệnh nhân</p>
                            <p className="text-muted-foreground">{selectedCertificate.patientName}</p>
                          </div>
                          <div>
                            <p className="font-medium">Số điện thoại</p>
                            <p className="text-muted-foreground">{selectedCertificate.patientPhone}</p>
                          </div>
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground">{selectedCertificate.patientEmail}</p>
                          </div>
                          <div>
                            <p className="font-medium">Vaccine</p>
                            <p className="text-muted-foreground">{selectedCertificate.vaccine}</p>
                          </div>
                          <div>
                            <p className="font-medium">Ngày tiêm</p>
                            <p className="text-muted-foreground">
                              {new Date(selectedCertificate.vaccinationDate).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Bác sĩ</p>
                            <p className="text-muted-foreground">{selectedCertificate.doctor}</p>
                          </div>
                          <div>
                            <p className="font-medium">Số lô</p>
                            <p className="text-muted-foreground">{selectedCertificate.batchNumber}</p>
                          </div>
                          <div>
                            <p className="font-medium">Trạng thái</p>
                            <Badge variant={getStatusColor(selectedCertificate.status)}>
                              {selectedCertificate.status}
                            </Badge>
                          </div>
                          {selectedCertificate.qrCode && (
                            <div>
                              <p className="font-medium">Mã QR</p>
                              <p className="text-muted-foreground">{selectedCertificate.qrCode}</p>
                            </div>
                          )}
                        </div>
                        {selectedCertificate.notes && (
                          <div>
                            <p className="font-medium">Ghi chú</p>
                            <p className="text-muted-foreground">{selectedCertificate.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                {certificate.status === "Chờ tạo" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Tạo chứng chỉ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tạo chứng chỉ tiêm chủng</DialogTitle>
                        <DialogDescription>Tạo chứng chỉ cho {certificate.patientName}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="certId">Mã chứng chỉ</Label>
                            <Input id="certId" value={certificate.id} disabled />
                          </div>
                          <div>
                            <Label htmlFor="issueDate">Ngày cấp</Label>
                            <Input id="issueDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                          </div>
                          <div>
                            <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                            <Input
                              id="expiryDate"
                              type="date"
                              defaultValue={
                                new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Địa điểm tiêm</Label>
                            <Input id="location" placeholder="Nhập địa điểm tiêm" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="additionalNotes">Ghi chú thêm</Label>
                          <Textarea id="additionalNotes" placeholder="Ghi chú bổ sung cho chứng chỉ..." />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Hủy</Button>
                          <Button onClick={() => createCertificate(certificate.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Tạo chứng chỉ
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {certificate.status === "Đã tạo" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => downloadCertificate(certificate.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Tải PDF
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Gửi cho BN
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Gửi chứng chỉ</DialogTitle>
                          <DialogDescription>Gửi chứng chỉ cho {certificate.patientName}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="sendMethod">Phương thức gửi</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phương thức" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="both">Cả email và SMS</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="message">Tin nhắn kèm theo</Label>
                            <Textarea
                              id="message"
                              placeholder="Tin nhắn gửi kèm chứng chỉ..."
                              defaultValue="Chúc mừng bạn đã hoàn thành tiêm chủng. Đây là chứng chỉ tiêm chủng của bạn."
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Hủy</Button>
                            <Button onClick={() => sendCertificate(certificate.id)}>
                              <Send className="h-4 w-4 mr-2" />
                              Gửi ngay
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}

                {certificate.status === "Lỗi" && (
                  <Button size="sm" onClick={() => regenerateCertificate(certificate.id)}>
                    <QrCode className="h-4 w-4 mr-2" />
                    Tạo lại
                  </Button>
                )}

                {certificate.qrCode && (
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Xem QR
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có chứng chỉ</h3>
            <p className="text-muted-foreground">Không tìm thấy chứng chỉ nào phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}

      {/* Certificate Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê chứng chỉ</CardTitle>
          <CardDescription>Tổng quan về chứng chỉ tiêm chủng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{certificates.length}</div>
              <p className="text-sm text-muted-foreground">Tổng số chứng chỉ</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {certificates.filter((c) => c.status === "Chờ tạo").length}
              </div>
              <p className="text-sm text-muted-foreground">Chờ tạo</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {certificates.filter((c) => c.status === "Đã tạo").length}
              </div>
              <p className="text-sm text-muted-foreground">Đã tạo</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {certificates.filter((c) => c.status === "Đã gửi").length}
              </div>
              <p className="text-sm text-muted-foreground">Đã gửi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
