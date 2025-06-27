"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { QrCode, Download, Share2, Shield, Search, Calendar, MapPin, User, Phone } from "lucide-react"

interface Certificate {
  id: string
  patientName: string
  patientId: string
  dateOfBirth: string
  vaccineName: string
  manufacturer: string
  batchNumber: string
  vaccinationDate: string
  location: string
  doctor: string
  issueDate: string
  qrCode: string
  status: "valid" | "expired" | "pending"
}

const mockCertificates: Certificate[] = [
  {
    id: "CV-2024-001234",
    patientName: "Nguyễn Văn An",
    patientId: "123456789",
    dateOfBirth: "1990-05-15",
    vaccineName: "COVID-19 mũi 3",
    manufacturer: "Pfizer-BioNTech",
    batchNumber: "FF2345",
    vaccinationDate: "2024-06-15",
    location: "Bệnh viện Đa khoa Thành phố",
    doctor: "BS. Nguyễn Văn A",
    issueDate: "2024-06-15",
    qrCode: "QR_CODE_DATA_HERE",
    status: "valid",
  },
  {
    id: "CV-2023-005678",
    patientName: "Nguyễn Văn An",
    patientId: "123456789",
    dateOfBirth: "1990-05-15",
    vaccineName: "Vaccine cúm mùa 2023",
    manufacturer: "Sanofi",
    batchNumber: "FL1234",
    vaccinationDate: "2023-10-20",
    location: "Trung tâm Y tế Quận 1",
    doctor: "BS. Trần Thị B",
    issueDate: "2023-10-20",
    qrCode: "QR_CODE_DATA_HERE",
    status: "valid",
  },
]

export function VaccinationCertificate() {
  const [certificates, setCertificates] = useState(mockCertificates)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.vaccineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-100 text-green-800">Có hiệu lực</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Hết hạn</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Đang xử lý</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chứng chỉ tiêm chủng</h1>
        <p className="text-muted-foreground">Quản lý và tải xuống chứng chỉ tiêm chủng</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Tìm kiếm chứng chỉ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Tìm theo tên vaccine hoặc mã chứng chỉ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificates List */}
      <div className="grid gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Chứng chỉ tiêm chủng
                  </CardTitle>
                  <CardDescription>Mã số: {certificate.id}</CardDescription>
                </div>
                {getStatusBadge(certificate.status)}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Patient Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Thông tin cá nhân</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{certificate.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">CMND: {certificate.patientId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Sinh: {certificate.dateOfBirth}</span>
                    </div>
                  </div>
                </div>

                {/* Vaccination Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Thông tin tiêm chủng</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">{certificate.vaccineName}</p>
                      <p className="text-sm text-muted-foreground">{certificate.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm">Số lô: {certificate.batchNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Ngày tiêm: {certificate.vaccinationDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{certificate.location}</span>
                    </div>
                    <div>
                      <p className="text-sm">Bác sĩ: {certificate.doctor}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code and Actions */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Mã QR</h3>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Tải PDF
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Share2 className="h-4 w-4 mr-2" />
                        Chia sẻ
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <QrCode className="h-4 w-4 mr-2" />
                        Xem QR lớn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Ngày cấp: {certificate.issueDate}</span>
                  <span>Chứng chỉ điện tử - Có giá trị pháp lý</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có chứng chỉ nào</h3>
            <p className="text-muted-foreground mb-4">
              Chứng chỉ sẽ được tạo tự động sau khi bạn hoàn thành tiêm chủng
            </p>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Đặt lịch tiêm
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Lưu ý quan trọng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <p>Chứng chỉ điện tử có giá trị pháp lý tương đương chứng chỉ giấy</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <p>Mã QR có thể được quét để xác minh tính xác thực của chứng chỉ</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <p>Chứng chỉ được cập nhật tự động sau mỗi lần tiêm</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <p>Liên hệ cơ sở y tế nếu có sai sót trong thông tin chứng chỉ</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
