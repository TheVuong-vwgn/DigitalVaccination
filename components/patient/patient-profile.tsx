"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Heart, Bell, Save } from "lucide-react"

interface PatientInfo {
  fullName: string
  dateOfBirth: string
  gender: string
  phone: string
  email: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalConditions: string[]
  allergies: string[]
  medications: string[]
  insuranceNumber: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

export function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    fullName: "Nguyễn Văn An",
    dateOfBirth: "1990-05-15",
    gender: "male",
    phone: "0901234567",
    email: "nguyenvanan@email.com",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    emergencyContact: "Nguyễn Thị Bình",
    emergencyPhone: "0907654321",
    medicalConditions: ["Cao huyết áp", "Tiểu đường type 2"],
    allergies: ["Penicillin", "Hải sản"],
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    insuranceNumber: "SV123456789",
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Saving patient info:", patientInfo)
  }

  const handleInputChange = (field: keyof PatientInfo, value: any) => {
    setPatientInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (type: keyof PatientInfo["notifications"], value: boolean) => {
    setPatientInfo((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">Quản lý thông tin cá nhân và y tế của bạn</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Thông tin cá nhân
          </CardTitle>
          <CardDescription>Thông tin cơ bản về bản thân</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                value={patientInfo.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={patientInfo.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                value={patientInfo.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={patientInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={patientInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceNumber">Số bảo hiểm</Label>
              <Input
                id="insuranceNumber"
                value={patientInfo.insuranceNumber}
                onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Textarea
              id="address"
              value={patientInfo.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Liên hệ khẩn cấp
          </CardTitle>
          <CardDescription>Thông tin người liên hệ trong trường hợp khẩn cấp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Tên người liên hệ</Label>
              <Input
                id="emergencyContact"
                value={patientInfo.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Số điện thoại</Label>
              <Input
                id="emergencyPhone"
                value={patientInfo.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Thông tin y tế
          </CardTitle>
          <CardDescription>Bệnh nền, dị ứng và thuốc đang sử dụng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Bệnh nền</Label>
            <div className="flex flex-wrap gap-2">
              {patientInfo.medicalConditions.map((condition, index) => (
                <Badge key={index} variant="secondary">
                  {condition}
                </Badge>
              ))}
              {patientInfo.medicalConditions.length === 0 && (
                <span className="text-muted-foreground text-sm">Không có bệnh nền</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Dị ứng</Label>
            <div className="flex flex-wrap gap-2">
              {patientInfo.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive">
                  {allergy}
                </Badge>
              ))}
              {patientInfo.allergies.length === 0 && (
                <span className="text-muted-foreground text-sm">Không có dị ứng</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Thuốc đang sử dụng</Label>
            <div className="flex flex-wrap gap-2">
              {patientInfo.medications.map((medication, index) => (
                <Badge key={index} variant="outline">
                  {medication}
                </Badge>
              ))}
              {patientInfo.medications.length === 0 && (
                <span className="text-muted-foreground text-sm">Không sử dụng thuốc</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Cài đặt thông báo
          </CardTitle>
          <CardDescription>Chọn cách thức nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Thông báo qua Email</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
            </div>
            <Switch
              checked={patientInfo.notifications.email}
              onCheckedChange={(checked) => handleNotificationChange("email", checked)}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Thông báo qua SMS</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo qua tin nhắn</p>
            </div>
            <Switch
              checked={patientInfo.notifications.sms}
              onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Thông báo đẩy</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo đẩy trên ứng dụng</p>
            </div>
            <Switch
              checked={patientInfo.notifications.push}
              onCheckedChange={(checked) => handleNotificationChange("push", checked)}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
