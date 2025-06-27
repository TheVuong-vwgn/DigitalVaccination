"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Syringe, Eye, EyeOff } from "lucide-react"

type UserRole = "patient" | "receptionist" | "doctor" | "admin" | "verifier"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface LoginFormProps {
  onLogin: (user: User) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("patient")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on role
    const userData: User = {
      id: `${role}_001`,
      name: getRoleName(role),
      email: email,
      role: role,
    }

    onLogin(userData)
    setIsLoading(false)
  }

  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case "patient":
        return "Nguyễn Văn A"
      case "receptionist":
        return "Trần Thị B (Lễ tân)"
      case "doctor":
        return "BS. Lê Văn C"
      case "admin":
        return "Phạm Thị D (Admin)"
      case "verifier":
        return "Hoàng Văn E (Xác minh)"
      default:
        return "Người dùng"
    }
  }

  const getRoleDescription = (role: UserRole): string => {
    switch (role) {
      case "patient":
        return "Đặt lịch tiêm, xem lịch sử và chứng chỉ"
      case "receptionist":
        return "Quản lý lịch hẹn, thanh toán và chứng chỉ"
      case "doctor":
        return "Xác nhận tiêm chủng và quản lý bệnh nhân"
      case "admin":
        return "Quản lý hệ thống và người dùng"
      case "verifier":
        return "Xác minh chứng chỉ tiêm chủng"
      default:
        return ""
    }
  }

  const quickLogin = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setEmail(`${selectedRole}@example.com`)
    setPassword("123456")
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Syringe className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">VaxManager</CardTitle>
          <CardDescription>Hệ thống quản lý tiêm chủng</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Người dân</SelectItem>
                  <SelectItem value="receptionist">Lễ tân</SelectItem>
                  <SelectItem value="doctor">Bác sĩ</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                  <SelectItem value="verifier">Người xác minh</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{getRoleDescription(role)}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Login Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Đăng nhập nhanh</CardTitle>
          <CardDescription>Chọn vai trò để đăng nhập demo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Button variant="outline" onClick={() => quickLogin("patient")} className="justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 mr-3">
                <Syringe className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Người dân</div>
                <div className="text-xs text-muted-foreground">Đặt lịch và xem chứng chỉ</div>
              </div>
            </Button>

            <Button variant="outline" onClick={() => quickLogin("receptionist")} className="justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 mr-3">
                <Syringe className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Lễ tân</div>
                <div className="text-xs text-muted-foreground">Quản lý lịch hẹn và thanh toán</div>
              </div>
            </Button>

            <Button variant="outline" onClick={() => quickLogin("doctor")} className="justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 mr-3">
                <Syringe className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Bác sĩ</div>
                <div className="text-xs text-muted-foreground">Xác nhận tiêm chủng</div>
              </div>
            </Button>

            <Button variant="outline" onClick={() => quickLogin("admin")} className="justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 mr-3">
                <Syringe className="h-4 w-4 text-red-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Quản trị viên</div>
                <div className="text-xs text-muted-foreground">Quản lý hệ thống</div>
              </div>
            </Button>

            <Button variant="outline" onClick={() => quickLogin("verifier")} className="justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 mr-3">
                <Syringe className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Người xác minh</div>
                <div className="text-xs text-muted-foreground">Xác minh chứng chỉ</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
