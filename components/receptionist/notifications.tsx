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
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Calendar,
  CreditCard,
  Package,
  FileText,
  Users,
} from "lucide-react"

export function ReceptionistNotifications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState<any>(null)

  const notifications = [
    {
      id: "NOTIF001",
      type: "appointment",
      priority: "high",
      title: "Lịch hẹn cần xác nhận gấp",
      message: "3 lịch hẹn trong 30 phút tới chưa được xác nhận",
      details: "Nguyễn Văn A (09:30), Trần Thị B (09:45), Lê Văn C (10:00)",
      status: "unread",
      createdAt: "2024-12-15T09:00:00",
      actionRequired: true,
      relatedData: {
        appointmentIds: ["APP001", "APP002", "APP003"],
        count: 3,
      },
    },
    {
      id: "NOTIF002",
      type: "payment",
      priority: "medium",
      title: "Thanh toán online cần xác nhận",
      message: "5 thanh toán qua VNPay đã hoàn thành, cần xác nhận",
      details: "Tổng giá trị: 2.500.000 VND",
      status: "unread",
      createdAt: "2024-12-15T08:45:00",
      actionRequired: true,
      relatedData: {
        paymentIds: ["PAY001", "PAY002", "PAY003", "PAY004", "PAY005"],
        totalAmount: 2500000,
      },
    },
    {
      id: "NOTIF003",
      type: "inventory",
      priority: "high",
      title: "Cảnh báo tồn kho thấp",
      message: "Vaccine cúm mùa sắp hết (còn 25 liều)",
      details: "Tồn kho hiện tại: 25 liều, tối thiểu: 30 liều",
      status: "unread",
      createdAt: "2024-12-15T08:30:00",
      actionRequired: true,
      relatedData: {
        vaccineId: "VAC002",
        currentStock: 25,
        minStock: 30,
      },
    },
    {
      id: "NOTIF004",
      type: "certificate",
      priority: "medium",
      title: "Chứng chỉ cần tạo",
      message: "8 chứng chỉ tiêm chủng cần được tạo và gửi",
      details: "Các bệnh nhân đã hoàn thành tiêm chủng hôm nay",
      status: "read",
      createdAt: "2024-12-15T08:15:00",
      actionRequired: true,
      relatedData: {
        certificateIds: ["CERT001", "CERT002", "CERT003", "CERT004", "CERT005", "CERT006", "CERT007", "CERT008"],
        count: 8,
      },
    },
    {
      id: "NOTIF005",
      type: "system",
      priority: "low",
      title: "Cập nhật hệ thống",
      message: "Hệ thống sẽ bảo trì từ 22:00-23:00 hôm nay",
      details: "Vui lòng hoàn thành công việc trước 22:00",
      status: "read",
      createdAt: "2024-12-15T07:00:00",
      actionRequired: false,
      relatedData: {
        maintenanceStart: "2024-12-15T22:00:00",
        maintenanceEnd: "2024-12-15T23:00:00",
      },
    },
    {
      id: "NOTIF006",
      type: "appointment",
      priority: "medium",
      title: "Bệnh nhân hủy lịch hẹn",
      message: "Phạm Thị D đã hủy lịch hẹn HPV lúc 15:30",
      details: "Lý do: Có việc đột xuất, cần đặt lại lịch",
      status: "read",
      createdAt: "2024-12-15T06:30:00",
      actionRequired: false,
      relatedData: {
        appointmentId: "APP004",
        patientName: "Phạm Thị D",
        reason: "Có việc đột xuất",
      },
    },
    {
      id: "NOTIF007",
      type: "inventory",
      priority: "high",
      title: "Vaccine sắp hết hạn",
      message: "Vaccine Viêm gan B sẽ hết hạn trong 15 ngày",
      details: "Lô HBV2024121500001, hết hạn 30/12/2024",
      status: "unread",
      createdAt: "2024-12-15T06:00:00",
      actionRequired: true,
      relatedData: {
        vaccineId: "VAC003",
        batchNumber: "HBV2024121500001",
        expiryDate: "2024-12-30",
        daysLeft: 15,
      },
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "payment":
        return <CreditCard className="h-4 w-4" />
      case "inventory":
        return <Package className="h-4 w-4" />
      case "certificate":
        return <FileText className="h-4 w-4" />
      case "system":
        return <Info className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-600"
      case "payment":
        return "bg-green-100 text-green-600"
      case "inventory":
        return "bg-orange-100 text-orange-600"
      case "certificate":
        return "bg-purple-100 text-purple-600"
      case "system":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-blue-100 text-blue-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Khẩn cấp"
      case "medium":
        return "Trung bình"
      case "low":
        return "Thấp"
      default:
        return "Bình thường"
    }
  }

  const markAsRead = (notificationId: string) => {
    console.log("Marking as read:", notificationId)
  }

  const markAllAsRead = () => {
    console.log("Marking all as read")
  }

  const handleAction = (notification: any) => {
    console.log("Handling action for:", notification.id)
    // Logic để chuyển đến trang tương ứng
  }

  const deleteNotification = (notificationId: string) => {
    console.log("Deleting notification:", notificationId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Thông báo</h2>
          <p className="text-muted-foreground">Theo dõi các thông báo và cảnh báo quan trọng</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Tìm kiếm và lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm thông báo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại thông báo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="appointment">Lịch hẹn</SelectItem>
                <SelectItem value="payment">Thanh toán</SelectItem>
                <SelectItem value="inventory">Kho vaccine</SelectItem>
                <SelectItem value="certificate">Chứng chỉ</SelectItem>
                <SelectItem value="system">Hệ thống</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="unread">Chưa đọc</SelectItem>
                <SelectItem value="read">Đã đọc</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setTypeFilter("all")
                setStatusFilter("all")
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Tổng thông báo</span>
            </div>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Chưa đọc</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {notifications.filter((n) => n.status === "unread").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Cần xử lý</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {notifications.filter((n) => n.actionRequired).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Khẩn cấp</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {notifications.filter((n) => n.priority === "high").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.status === "unread" ? "border-l-4 border-l-blue-500" : ""}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${getTypeColor(notification.type)}`}
                  >
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{notification.title}</h3>
                      {notification.status === "unread" && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                    </div>
                    <p className="text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-sm text-muted-foreground">{notification.details}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(notification.priority)}>
                    {getPriorityLabel(notification.priority)}
                  </Badge>
                  {notification.actionRequired && (
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      Cần xử lý
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedNotification(notification)}>
                      <Info className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chi tiết thông báo</DialogTitle>
                      <DialogDescription>Thông tin chi tiết về thông báo</DialogDescription>
                    </DialogHeader>
                    {selectedNotification && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium">Loại thông báo</p>
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex h-6 w-6 items-center justify-center rounded-full ${getTypeColor(selectedNotification.type)}`}
                              >
                                {getTypeIcon(selectedNotification.type)}
                              </div>
                              <span className="text-muted-foreground capitalize">{selectedNotification.type}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Mức độ ưu tiên</p>
                            <Badge variant={getPriorityColor(selectedNotification.priority)}>
                              {getPriorityLabel(selectedNotification.priority)}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium">Trạng thái</p>
                            <Badge variant={selectedNotification.status === "unread" ? "secondary" : "outline"}>
                              {selectedNotification.status === "unread" ? "Chưa đọc" : "Đã đọc"}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium">Thời gian</p>
                            <p className="text-muted-foreground">
                              {new Date(selectedNotification.createdAt).toLocaleString("vi-VN")}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Tiêu đề</p>
                          <p className="text-muted-foreground">{selectedNotification.title}</p>
                        </div>
                        <div>
                          <p className="font-medium">Nội dung</p>
                          <p className="text-muted-foreground">{selectedNotification.message}</p>
                        </div>
                        <div>
                          <p className="font-medium">Chi tiết</p>
                          <p className="text-muted-foreground">{selectedNotification.details}</p>
                        </div>
                        {selectedNotification.relatedData && (
                          <div>
                            <p className="font-medium">Dữ liệu liên quan</p>
                            <pre className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
                              {JSON.stringify(selectedNotification.relatedData, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                {notification.actionRequired && (
                  <Button size="sm" onClick={() => handleAction(notification)}>
                    <Users className="h-4 w-4 mr-2" />
                    Xử lý ngay
                  </Button>
                )}

                {notification.status === "unread" && (
                  <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Đánh dấu đã đọc
                  </Button>
                )}

                <Button size="sm" variant="destructive" onClick={() => deleteNotification(notification.id)}>
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có thông báo</h3>
            <p className="text-muted-foreground">Không tìm thấy thông báo nào phù hợp với bộ lọc</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
          <CardDescription>Xử lý nhanh các thông báo quan trọng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Xem lịch hẹn</span>
              <span className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === "appointment" && n.status === "unread").length} mới
              </span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <CreditCard className="h-6 w-6 mb-2" />
              <span>Xử lý thanh toán</span>
              <span className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === "payment" && n.status === "unread").length} mới
              </span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Package className="h-6 w-6 mb-2" />
              <span>Kiểm tra kho</span>
              <span className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === "inventory" && n.status === "unread").length} cảnh báo
              </span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <FileText className="h-6 w-6 mb-2" />
              <span>Tạo chứng chỉ</span>
              <span className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === "certificate" && n.status === "unread").length} cần xử lý
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
