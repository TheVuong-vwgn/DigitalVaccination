"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Camera, CheckCircle, X } from "lucide-react"
import { QRScanner } from "./qr-scanner"
import { VerificationHistory } from "./verification-history"

type ActiveSection = "dashboard" | "scanner" | "history"

export function VerifierDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "scanner":
        return <QRScanner />
      case "history":
        return <VerificationHistory />
      default:
        return <DashboardOverview onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Người xác minh</h1>
          <p className="text-muted-foreground">Quét QR và xác minh chứng chỉ tiêm chủng</p>
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
    totalScans: 45,
    validCertificates: 42,
    invalidCertificates: 3,
    successRate: 93.3,
  }

  const recentVerifications = [
    {
      id: "1",
      patientName: "Nguyễn Văn A",
      certificateId: "CERT2024121500001",
      vaccine: "COVID-19 Pfizer",
      verificationTime: "14:30",
      status: "Hợp lệ",
      location: "Sân bay Tân Sơn Nhất",
    },
    {
      id: "2",
      patientName: "Trần Thị B",
      certificateId: "CERT2024121500002",
      vaccine: "Cúm mùa",
      verificationTime: "14:25",
      status: "Hợp lệ",
      location: "Trung tâm thương mại",
    },
    {
      id: "3",
      patientName: "Lê Văn C",
      certificateId: "INVALID001",
      vaccine: "N/A",
      verificationTime: "14:20",
      status: "Không hợp lệ",
      location: "Khách sạn ABC",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số quét</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalScans}</div>
            <p className="text-xs text-muted-foreground">Hôm nay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chứng chỉ hợp lệ</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{todayStats.validCertificates}</div>
            <p className="text-xs text-muted-foreground">Đã xác minh</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Không hợp lệ</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{todayStats.invalidCertificates}</div>
            <p className="text-xs text-muted-foreground">Bị từ chối</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ thành công</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Chứng chỉ hợp lệ</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Quét QR nhanh
          </CardTitle>
          <CardDescription>Quét mã QR chứng chỉ tiêm chủng để xác minh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => onNavigate("scanner")} className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Mở camera quét
            </Button>
            <Button variant="outline" onClick={() => onNavigate("scanner")} className="flex-1">
              <QrCode className="h-4 w-4 mr-2" />
              Tải ảnh QR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Verifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Xác minh gần đây</CardTitle>
              <CardDescription>Các lần quét QR và xác minh mới nhất</CardDescription>
            </div>
            <Button variant="outline" onClick={() => onNavigate("history")}>
              Xem tất cả
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentVerifications.map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      verification.status === "Hợp lệ" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {verification.status === "Hợp lệ" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{verification.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {verification.vaccine} - {verification.verificationTime}
                    </p>
                    <p className="text-xs text-muted-foreground">{verification.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={verification.status === "Hợp lệ" ? "default" : "destructive"}>
                    {verification.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{verification.certificateId}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Hướng dẫn sử dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Sử dụng camera để quét mã QR trên chứng chỉ tiêm chủng</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Có thể tải ảnh chứa mã QR từ thiết bị để xác minh</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Hệ thống sẽ tự động xác minh tính hợp lệ của chứng chỉ</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Lịch sử xác minh được lưu trữ để tra cứu sau này</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
