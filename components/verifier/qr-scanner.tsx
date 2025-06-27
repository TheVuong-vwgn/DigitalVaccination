"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Upload, QrCode, CheckCircle, X, User, Syringe } from "lucide-react"

export function QRScanner() {
  const [scanResult, setScanResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [scanMode, setScanMode] = useState<"camera" | "upload">("camera")

  // Mock scan result
  const mockScanResult = {
    isValid: true,
    patientName: "Nguyễn Văn A",
    patientId: "123456789012",
    certificateId: "CERT2024121500001",
    vaccine: "COVID-19 Pfizer",
    vaccinationDate: "2024-03-15",
    location: "Bệnh viện Đa khoa Thành phố",
    doctor: "BS. Trần Văn B",
    batchNumber: "PF2024031500001",
    expiryDate: "2025-03-15",
    issueDate: "2024-03-15",
  }

  const handleScan = () => {
    // Simulate QR scan
    setScanResult(mockScanResult)
    setShowResult(true)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate processing uploaded image
      setTimeout(() => {
        setScanResult(mockScanResult)
        setShowResult(true)
      }, 1000)
    }
  }

  const resetScanner = () => {
    setScanResult(null)
    setShowResult(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Quét QR chứng chỉ</h2>
        <p className="text-muted-foreground">Quét mã QR để xác minh chứng chỉ tiêm chủng</p>
      </div>

      {/* Scanner Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Chọn phương thức quét</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={scanMode === "camera" ? "default" : "outline"}
              onClick={() => setScanMode("camera")}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Camera
            </Button>
            <Button
              variant={scanMode === "upload" ? "default" : "outline"}
              onClick={() => setScanMode("upload")}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              Tải ảnh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scanner Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            {scanMode === "camera" ? "Quét bằng camera" : "Tải ảnh QR"}
          </CardTitle>
          <CardDescription>
            {scanMode === "camera"
              ? "Đưa mã QR vào khung hình để quét"
              : "Chọn ảnh chứa mã QR từ thiết bị của bạn"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scanMode === "camera" ? (
            <div className="space-y-4">
              {/* Camera Preview Placeholder */}
              <div className="aspect-square max-w-md mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Camera sẽ hiển thị ở đây</p>
                  <p className="text-sm text-gray-400">Đưa mã QR vào khung để quét</p>
                </div>
              </div>
              <div className="text-center">
                <Button onClick={handleScan}>
                  <QrCode className="h-4 w-4 mr-2" />
                  Bắt đầu quét
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="qr-upload">Chọn ảnh QR</Label>
                <Input
                  id="qr-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Hỗ trợ các định dạng: JPG, PNG, GIF
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {scanResult?.isValid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-600" />
              )}
              Kết quả xác minh
            </DialogTitle>
            <DialogDescription>
              {scanResult?.isValid
                ? "Chứng chỉ tiêm chủng hợp lệ"
                : "Chứng chỉ không hợp lệ hoặc đã hết hạn"}
            </DialogDescription>
          </DialogHeader>

          {scanResult && (
            <div className="space-y-6">
              {/* Verification Status */}
              <div className="text-center p-4 rounded-lg border-2 border-dashed">
                {scanResult.isValid ? (
                  <div className="text-green-600">
                    <CheckCircle className="h-16 w-16 mx-auto mb-2" />
                    <h3 className="text-xl font-semibold">Chứng chỉ hợp lệ</h3>
                    <p className="text-sm">Đã xác minh thành công</p>
                  </div>
                ) : (
                  <div className="text-red-600">
                    <X className="h-16 w-16 mx-auto mb-2" />
                    <h3 className="text-xl font-semibold">Chứng chỉ không hợp lệ</h3>
                    <p className="text-sm">Không thể xác minh</p>
                  </div>
                )}
              </div>

              {scanResult.isValid && (
                <>
                  {/* Patient Information */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Thông tin bệnh nhân
                    </h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium">Họ và tên</p>
                        <p className="text-sm text-muted-foreground">{scanResult.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Số CCCD</p>
                        <p className="text-sm text-muted-foreground">{scanResult.patientId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vaccination Information */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Syringe className="h-4 w-4" />
                      Thông tin tiêm chủng
                    </h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium">Vaccine</p>
                        <p className="text-sm text-muted-foreground">{scanResult.vaccine}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ngày tiêm</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(scanResult.vaccinationDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bác sĩ thực hiện</p>
                        <p className="text-sm text-muted-foreground">{scanResult.doctor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Số lô vaccine</p>
                        <p className="text-sm text-muted-foreground">{scanResult.batchNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Information */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      Thông tin chứng chỉ
                    </h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium">Mã chứng chỉ</p>
                        <p className="text-sm text-muted-foreground">{scanResult.certificateId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ngày cấp</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(scanResult.issueDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Có hiệu lực đến</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(scanResult.expiryDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Địa điểm tiêm</p>
                        <p className="text-sm text-muted-foreground">{scanResult.location}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetScanner}>
                  Quét mã khác
                </Button>
                <Button onClick={() => setShowResult(false)}>Đóng</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Instructions */}
      <Card>
        <CardHeader>
          {/* Thêm hướng dẫn sử dụng ở đây nếu cần */}
        </CardHeader>
      </Card>
    </div>
  )
}
