"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, CheckCircle, X, Download, Calendar, MapPin } from "lucide-react"

export function VerificationHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVerification, setSelectedVerification] = useState<any>(null)

  const verificationHistory = [
    {
      id: "1",
      timestamp: "2024-12-15T14:30:00",
      patientName: "Nguyễn Văn A",
      certificateId: "CERT2024121500001",
      vaccine: "COVID-19 Pfizer",
      status: "Hợp lệ",
      location: "Sân bay Tân Sơn Nhất",
      verifierName: "Nhân viên A",
      details: {
        patientId: "123456789012",
        vaccinationDate: "2024-03-15",
        doctor: "BS. Trần Văn B",
        batchNumber: "PF2024031500001",
        issueDate: "2024-03-15",
        expiryDate: "2025-03-15",
      },
    },
    {
      id: "2",
      timestamp: "2024-12-15T14:25:00",
      patientName: "Trần Thị B",
      certificateId: "CERT2024121500002",
      vaccine: "Cúm mùa 2024",
      status: "Hợp lệ",
      location: "Trung tâm thương mại",
      verifierName: "Nhân viên B",
      details: {
        patientId: "987654321098",
        vaccinationDate: "2024-02-10",
        doctor: "BS. Lê Thị C",
        batchNumber: "FLU2024021000001",
        issueDate: "2024-02-10",
        expiryDate: "2025-02-10",
      },
    },
    {
      id: "3",
      timestamp: "2024-12-15T14:20:00",
      patientName: "Lê Văn C",
      certificateId: "INVALID001",
      vaccine: "N/A",
      status: "Không hợp lệ",
      location: "Khách sạn ABC",
      verifierName: "Nhân viên A",
      details: {
        reason: "Chứng chỉ đã hết hạn",
        errorCode: "EXPIRED_CERTIFICATE",
      },
    },
    {
      id: "4",
      timestamp: "2024-12-15T13:45:00",
      patientName: "Phạm Thị D",
      certificateId: "CERT2024121500003",
      vaccine: "Viêm gan B",
      status: "Hợp lệ",
      location: "Bệnh viện Đa khoa",
      verifierName: "Nhân viên C",
      details: {
        patientId: "456789123456",
        vaccinationDate: "2024-06-15",
        doctor: "BS. Phạm Văn D",
        batchNumber: "HBV2024061500001",
        issueDate: "2024-06-15",
        expiryDate: "2025-06-15",
      },
    },
  ]

  const filteredHistory = verificationHistory.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.vaccine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const exportHistory = () => {
    console.log("Exporting verification history...")
  }

  const getStatusColor = (status: string) => {
    return status === "Hợp lệ" ? "default" : "destructive"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lịch sử xác minh</h2>
          <p className="text-muted-foreground">Xem lại các lần quét QR và xác minh chứng chỉ</p>
        </div>
        <Button onClick={exportHistory}>
          <Download className="h-4 w-4 mr-2" />
          Xuất báo cáo
        </Button>
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
                placeholder="Tìm theo tên, mã chứng chỉ hoặc vaccine..."
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
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Hợp lệ">Hợp lệ</SelectItem>
                <SelectItem value="Không hợp lệ">Không hợp lệ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Verification History List */}
      <div className="space-y-4">
        {filteredHistory.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      record.status === "Hợp lệ" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {record.status === "Hợp lệ" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <X className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{record.patientName}</h3>
                    <p className="text-muted-foreground">{record.vaccine}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(record.timestamp).toLocaleString("vi-VN")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{record.location}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Xác minh bởi: {record.verifierName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusColor(record.status)}>{record.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{record.certificateId}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedVerification(record)}>
                      Chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Chi tiết xác minh</DialogTitle>
                      <DialogDescription>Thông tin chi tiết về lần xác minh chứng chỉ</DialogDescription>
                    </DialogHeader>
                    {selectedVerification && (
                      <div className="space-y-4">
                        {/* Verification Info */}
                        <div>
                          <h4 className="font-semibold mb-3">Thông tin xác minh</h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <p className="text-sm font-medium">Thời gian</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(selectedVerification.timestamp).toLocaleString("vi-VN")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Địa điểm</p>
                              <p className="text-sm text-muted-foreground">{selectedVerification.location}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Người xác minh</p>
                              <p className="text-sm text-muted-foreground">{selectedVerification.verifierName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Kết quả</p>
                              <Badge variant={getStatusColor(selectedVerification.status)}>
                                {selectedVerification.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Patient Info */}
                        <div>
                          <h4 className="font-semibold mb-3">Thông tin bệnh nhân</h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <p className="text-sm font-medium">Họ và tên</p>
                              <p className="text-sm text-muted-foreground">{selectedVerification.patientName}</p>
                            </div>
                            {selectedVerification.details.patientId && (
                              <div>
                                <p className="text-sm font-medium">Số CCCD</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedVerification.details.patientId}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Certificate Info */}
                        {selectedVerification.status === "Hợp lệ" ? (
                          <div>
                            <h4 className="font-semibold mb-3">Thông tin chứng chỉ</h4>
                            <div className="grid gap-3 md:grid-cols-2">
                              <div>
                                <p className="text-sm font-medium">Mã chứng chỉ</p>
                                <p className="text-sm text-muted-foreground">{selectedVerification.certificateId}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Vaccine</p>
                                <p className="text-sm text-muted-foreground">{selectedVerification.vaccine}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Ngày tiêm</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(selectedVerification.details.vaccinationDate).toLocaleDateString("vi-VN")}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Bác sĩ</p>
                                <p className="text-sm text-muted-foreground">{selectedVerification.details.doctor}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Số lô</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedVerification.details.batchNumber}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Có hiệu lực đến</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(selectedVerification.details.expiryDate).toLocaleDateString("vi-VN")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-semibold mb-3">Lý do không hợp lệ</h4>
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-sm text-red-800">{selectedVerification.details.reason}</p>
                              <p className="text-xs text-red-600 mt-1">
                                Mã lỗi: {selectedVerification.details.errorCode}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Xuất
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy lịch sử</h3>
            <p className="text-muted-foreground">Không có lịch sử xác minh nào phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê tổng quan</CardTitle>
          <CardDescription>Tổng hợp kết quả xác minh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{verificationHistory.length}</div>
              <p className="text-sm text-muted-foreground">Tổng số lần quét</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {verificationHistory.filter((v) => v.status === "Hợp lệ").length}
              </div>
              <p className="text-sm text-muted-foreground">Chứng chỉ hợp lệ</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {verificationHistory.filter((v) => v.status === "Không hợp lệ").length}
              </div>
              <p className="text-sm text-muted-foreground">Không hợp lệ</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round(
                  (verificationHistory.filter((v) => v.status === "Hợp lệ").length / verificationHistory.length) * 100,
                )}
                %
              </div>
              <p className="text-sm text-muted-foreground">Tỷ lệ thành công</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
