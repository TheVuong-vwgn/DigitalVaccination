"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, AlertTriangle, Info, CheckCircle, Settings, Trash2 } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "reminder" | "alert" | "info" | "success"
  date: string
  read: boolean
  priority: "high" | "medium" | "low"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nhắc nhở lịch tiêm",
    message: "Bạn có lịch tiêm COVID-19 mũi 4 vào ngày 15/12/2024 lúc 09:00 tại Bệnh viện Đa khoa Thành phố",
    type: "reminder",
    date: "2024-12-13T10:00:00",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Chứng chỉ đã sẵn sàng",
    message: "Chứng chỉ tiêm vaccine cúm mùa đã được cập nhật và sẵn sàng tải xuống",
    type: "success",
    date: "2024-12-12T14:30:00",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    title: "Cập nhật thông tin vaccine",
    message: "Vaccine COVID-19 mới đã có sẵn tại các cơ sở y tế. Liên hệ để đặt lịch",
    type: "info",
    date: "2024-12-11T09:15:00",
    read: true,
    priority: "low",
  },
  {
    id: "4",
    title: "Cảnh báo tác dụng phụ",
    message: "Theo dõi sức khỏe sau tiêm. Liên hệ bác sĩ nếu có triệu chứng bất thường",
    type: "alert",
    date: "2024-12-10T16:45:00",
    read: true,
    priority: "high",
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    reminderNotifications: true,
    alertNotifications: true,
    infoNotifications: false,
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-600" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "info":
        return <Info className="h-5 w-5 text-gray-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getNotificationBadge = (type: string, priority: string) => {
    const baseClasses = "text-xs"

    if (priority === "high") {
      return <Badge className={`${baseClasses} bg-red-100 text-red-800`}>Quan trọng</Badge>
    } else if (priority === "medium") {
      return <Badge className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Trung bình</Badge>
    } else {
      return <Badge className={`${baseClasses} bg-gray-100 text-gray-800`}>Thông thường</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Vừa xong"
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} ngày trước`
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const reminderNotifications = notifications.filter((n) => n.type === "reminder")
  const alertNotifications = notifications.filter((n) => n.type === "alert")
  const infoNotifications = notifications.filter((n) => n.type === "info" || n.type === "success")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thông báo</h1>
          <p className="text-muted-foreground">
            Quản lý thông báo và cài đặt nhắc nhở
            {unreadCount > 0 && <Badge className="ml-2 bg-red-100 text-red-800">{unreadCount} chưa đọc</Badge>}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Đánh dấu tất cả đã đọc
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tất cả ({notifications.length})</TabsTrigger>
          <TabsTrigger value="reminders">Nhắc nhở ({reminderNotifications.length})</TabsTrigger>
          <TabsTrigger value="alerts">Cảnh báo ({alertNotifications.length})</TabsTrigger>
          <TabsTrigger value="info">Thông tin ({infoNotifications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Tất cả thông báo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Không có thông báo nào</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                                {notification.title}
                              </h3>
                              {getNotificationBadge(notification.type, notification.priority)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                              Đánh dấu đã đọc
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Nhắc nhở lịch tiêm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminderNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                            Đánh dấu đã đọc
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Cảnh báo quan trọng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${notification.read ? "bg-gray-50" : "bg-red-50 border-red-200"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                            Đánh dấu đã đọc
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Thông tin và cập nhật
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {infoNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      notification.read ? "bg-gray-50" : "bg-green-50 border-green-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                            Đánh dấu đã đọc
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Cài đặt thông báo
          </CardTitle>
          <CardDescription>Tùy chỉnh cách thức nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Phương thức nhận thông báo</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo qua Email</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo qua SMS</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo qua tin nhắn</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsNotifications: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo đẩy</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo đẩy trên ứng dụng</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushNotifications: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Loại thông báo</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nhắc nhở lịch tiêm</Label>
                  <p className="text-sm text-muted-foreground">Nhắc nhở về các lịch hẹn sắp tới</p>
                </div>
                <Switch
                  checked={settings.reminderNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, reminderNotifications: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cảnh báo quan trọng</Label>
                  <p className="text-sm text-muted-foreground">Cảnh báo về sức khỏe và an toàn</p>
                </div>
                <Switch
                  checked={settings.alertNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, alertNotifications: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông tin cập nhật</Label>
                  <p className="text-sm text-muted-foreground">Thông tin về vaccine mới và cập nhật hệ thống</p>
                </div>
                <Switch
                  checked={settings.infoNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, infoNotifications: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Lưu cài đặt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
