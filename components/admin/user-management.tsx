"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2, User, Shield, UserCheck } from "lucide-react"

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showAddUser, setShowAddUser] = useState(false)

  const users = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      role: "patient",
      status: "active",
      lastLogin: "2024-12-15T10:30:00",
      createdAt: "2024-01-15T08:00:00",
      location: "TP.HCM",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@hospital.com",
      phone: "0987654321",
      role: "receptionist",
      status: "active",
      lastLogin: "2024-12-15T14:20:00",
      createdAt: "2024-02-01T09:00:00",
      location: "Bệnh viện Đa khoa",
    },
    {
      id: "3",
      name: "BS. Lê Văn C",
      email: "levanc@hospital.com",
      phone: "0456789123",
      role: "doctor",
      status: "active",
      lastLogin: "2024-12-15T13:45:00",
      createdAt: "2024-01-20T10:00:00",
      location: "Phòng khám ABC",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      email: "phamthid@admin.com",
      phone: "0789123456",
      role: "admin",
      status: "active",
      lastLogin: "2024-12-15T15:00:00",
      createdAt: "2024-01-01T08:00:00",
      location: "Trụ sở chính",
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      email: "hoangvane@verify.com",
      phone: "0321654987",
      role: "verifier",
      status: "inactive",
      lastLogin: "2024-12-10T16:30:00",
      createdAt: "2024-03-01T11:00:00",
      location: "Sân bay",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      patient: "Người dân",
      receptionist: "Lễ tân",
      doctor: "Bác sĩ",
      admin: "Quản trị viên",
      verifier: "Người xác minh",
    }
    return roleNames[role as keyof typeof roleNames] || role
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "doctor":
        return "default"
      case "receptionist":
        return "secondary"
      case "verifier":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "secondary"
  }

  const addUser = () => {
    console.log("Adding new user...")
    setShowAddUser(false)
  }

  const editUser = (userId: string) => {
    console.log("Editing user:", userId)
  }

  const deleteUser = (userId: string) => {
    console.log("Deleting user:", userId)
  }

  const toggleUserStatus = (userId: string) => {
    console.log("Toggling user status:", userId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý người dùng</h2>
          <p className="text-muted-foreground">Quản lý tài khoản và phân quyền người dùng</p>
        </div>
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm người dùng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm người dùng mới</DialogTitle>
              <DialogDescription>Tạo tài khoản mới cho người dùng</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input id="name" placeholder="Nhập họ và tên" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="0123456789" />
                </div>
                <div>
                  <Label htmlFor="role">Vai trò</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Người dân</SelectItem>
                      <SelectItem value="receptionist">Lễ tân</SelectItem>
                      <SelectItem value="doctor">Bác sĩ</SelectItem>
                      <SelectItem value="verifier">Người xác minh</SelectItem>
                      <SelectItem value="admin">Quản trị viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Địa điểm làm việc</Label>
                <Input id="location" placeholder="Nhập địa điểm làm việc" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddUser(false)}>
                  Hủy
                </Button>
                <Button onClick={addUser}>Tạo tài khoản</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                placeholder="Tìm theo tên, email hoặc số điện thoại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="patient">Người dân</SelectItem>
                <SelectItem value="receptionist">Lễ tân</SelectItem>
                <SelectItem value="doctor">Bác sĩ</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="verifier">Người xác minh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                    <p className="text-sm text-muted-foreground">{user.location}</p>
                    <p className="text-xs text-muted-foreground">
                      Đăng nhập cuối: {new Date(user.lastLogin).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getRoleColor(user.role)}>{getRoleDisplayName(user.role)}</Badge>
                    <Badge variant={getStatusColor(user.status)}>
                      {user.status === "active" ? "Hoạt động" : "Tạm khóa"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tạo: {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                      <User className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thông tin người dùng</DialogTitle>
                      <DialogDescription>Chi tiết tài khoản và hoạt động</DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium">Họ và tên</p>
                            <p className="text-muted-foreground">{selectedUser.name}</p>
                          </div>
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground">{selectedUser.email}</p>
                          </div>
                          <div>
                            <p className="font-medium">Số điện thoại</p>
                            <p className="text-muted-foreground">{selectedUser.phone}</p>
                          </div>
                          <div>
                            <p className="font-medium">Vai trò</p>
                            <Badge variant={getRoleColor(selectedUser.role)}>
                              {getRoleDisplayName(selectedUser.role)}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium">Trạng thái</p>
                            <Badge variant={getStatusColor(selectedUser.status)}>
                              {selectedUser.status === "active" ? "Hoạt động" : "Tạm khóa"}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium">Địa điểm</p>
                            <p className="text-muted-foreground">{selectedUser.location}</p>
                          </div>
                          <div>
                            <p className="font-medium">Ngày tạo</p>
                            <p className="text-muted-foreground">
                              {new Date(selectedUser.createdAt).toLocaleString("vi-VN")}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Đăng nhập cuối</p>
                            <p className="text-muted-foreground">
                              {new Date(selectedUser.lastLogin).toLocaleString("vi-VN")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button size="sm" variant="outline" onClick={() => editUser(user.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Sửa
                </Button>

                <Button
                  size="sm"
                  variant={user.status === "active" ? "secondary" : "default"}
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status === "active" ? (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Khóa
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Kích hoạt
                    </>
                  )}
                </Button>

                <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy người dùng</h3>
            <p className="text-muted-foreground">Không có người dùng nào phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}

      {/* User Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê người dùng</CardTitle>
          <CardDescription>Tổng quan về người dùng trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="text-center">
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-sm text-muted-foreground">Tổng số</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "patient").length}</div>
              <p className="text-sm text-muted-foreground">Người dân</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{users.filter((u) => u.role === "doctor").length}</div>
              <p className="text-sm text-muted-foreground">Bác sĩ</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {users.filter((u) => u.role === "receptionist").length}
              </div>
              <p className="text-sm text-muted-foreground">Lễ tân</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Đang hoạt động</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
