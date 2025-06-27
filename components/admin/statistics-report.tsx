"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Syringe, 
  MapPin, 
  Calendar,
  Download,
  Filter,
  Eye,
  Package
} from "lucide-react"

export function StatisticsReport() {
  const [timeRange, setTimeRange] = useState("month")
  const [selectedLocation, setSelectedLocation] = useState("all")

  // Mock data cho thống kê
  const statistics = {
    overview: {
      totalVaccinations: 45680,
      monthlyGrowth: 12.5,
      weeklyVaccinations: 1250,
      activeUsers: 15420,
      completedAppointments: 8956,
      cancelledAppointments: 234,
      successRate: 97.4,
    },
    vaccinationTrend: [
      { month: "T1", vaccinations: 3200, target: 3000 },
      { month: "T2", vaccinations: 3450, target: 3200 },
      { month: "T3", vaccinations: 3800, target: 3500 },
      { month: "T4", vaccinations: 4100, target: 3800 },
      { month: "T5", vaccinations: 4350, target: 4000 },
      { month: "T6", vaccinations: 4200, target: 4200 },
      { month: "T7", vaccinations: 4600, target: 4400 },
      { month: "T8", vaccinations: 4800, target: 4600 },
      { month: "T9", vaccinations: 5100, target: 4800 },
      { month: "T10", vaccinations: 5350, target: 5000 },
      { month: "T11", vaccinations: 5200, target: 5200 },
      { month: "T12", vaccinations: 5500, target: 5400 },
    ],
    vaccineTypes: [
      { name: "COVID-19", count: 18500, percentage: 40.5, color: "bg-blue-500" },
      { name: "Cúm mùa", count: 12300, percentage: 26.9, color: "bg-green-500" },
      { name: "Viêm gan B", count: 8900, percentage: 19.5, color: "bg-purple-500" },
      { name: "HPV", count: 4200, percentage: 9.2, color: "bg-orange-500" },
      { name: "Khác", count: 1780, percentage: 3.9, color: "bg-gray-500" },
    ],
    locations: [
      { name: "Bệnh viện Đa khoa TP", vaccinations: 15600, percentage: 34.1, staff: 45 },
      { name: "Trung tâm Y tế Q1", vaccinations: 12400, percentage: 27.1, staff: 32 },
      { name: "Phòng khám ABC", vaccinations: 10200, percentage: 22.3, staff: 28 },
      { name: "Trạm Y tế Q3", vaccinations: 4800, percentage: 10.5, staff: 15 },
      { name: "Khác", vaccinations: 2680, percentage: 5.9, staff: 12 },
    ],
    ageGroups: [
      { range: "0-17", count: 8900, percentage: 19.5 },
      { range: "18-30", count: 12400, percentage: 27.1 },
      { range: "31-50", count: 15600, percentage: 34.1 },
      { range: "51-65", count: 6800, percentage: 14.9 },
      { range: "65+", count: 1980, percentage: 4.3 },
    ],
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num)
  }

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Thống kê báo cáo</h2>
          <p className="text-muted-foreground">Phân tích dữ liệu và xu hướng tiêm chủng</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm này</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-48">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả địa điểm</SelectItem>
              <SelectItem value="hospital">Bệnh viện Đa khoa TP</SelectItem>
              <SelectItem value="center">Trung tâm Y tế Q1</SelectItem>
              <SelectItem value="clinic">Phòng khám ABC</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng mũi tiêm</CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(statistics.overview.totalVaccinations)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{statistics.overview.monthlyGrowth}% so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng hoạt động</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(statistics.overview.activeUsers)}</div>
            <p className="text-xs text-muted-foreground">
              +{statistics.overview.weeklyVaccinations} tuần này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.overview.successRate}%</div>
            <Progress value={statistics.overview.successRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch hẹn tuần này</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.overview.weeklyVaccinations}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.overview.cancelledAppointments} bị hủy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Vaccination Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng tiêm chủng</CardTitle>
          <CardDescription>Số mũi tiêm theo từng tháng so với mục tiêu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statistics.vaccinationTrend.slice(-6).map((data, index) => {
              const achievement = (data.vaccinations / data.target * 100).toFixed(1)
              const isAboveTarget = data.vaccinations >= data.target
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 text-sm font-medium">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">
                        {formatNumber(data.vaccinations)} / {formatNumber(data.target)}
                      </span>
                      <Badge variant={isAboveTarget ? "default" : "secondary"}>
                        {achievement}%
                      </Badge>
                    </div>
                    <Progress 
                      value={Math.min(parseFloat(achievement), 100)} 
                      className="h-2"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Vaccine Types & Locations */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo loại vaccine</CardTitle>
            <CardDescription>Tỷ lệ sử dụng các loại vaccine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistics.vaccineTypes.map((vaccine, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${vaccine.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{vaccine.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatNumber(vaccine.count)} ({vaccine.percentage}%)
                      </span>
                    </div>
                    <Progress value={vaccine.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê theo địa điểm</CardTitle>
            <CardDescription>Hiệu suất tiêm chủng theo cơ sở</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistics.locations.map((location, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{location.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatNumber(location.vaccinations)}</div>
                      <div className="text-xs text-muted-foreground">{location.staff} nhân viên</div>
                    </div>
                  </div>
                  <Progress value={location.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Groups & Detailed Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo độ tuổi</CardTitle>
            <CardDescription>Tỷ lệ tiêm chủng theo nhóm tuổi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statistics.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-16 text-sm font-medium">{group.range}</div>
                    <Progress value={group.percentage} className="h-2 w-32" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatNumber(group.count)}</div>
                    <div className="text-xs text-muted-foreground">{group.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân tích hiệu suất</CardTitle>
            <CardDescription>Các chỉ số quan trọng trong tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Tăng trưởng tháng</span>
                </div>
                <span className="font-medium text-green-600">+{statistics.overview.monthlyGrowth}%</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Tỷ lệ hoàn thành</span>
                </div>
                <span className="font-medium text-blue-600">{statistics.overview.successRate}%</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Hiệu suất kho</span>
                </div>
                <span className="font-medium text-purple-600">89.2%</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Độ hài lòng</span>
                </div>
                <span className="font-medium text-orange-600">4.8/5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Tùy chọn xuất báo cáo</CardTitle>
          <CardDescription>Tạo và tải xuống các báo cáo chi tiết</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Báo cáo tổng quan</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Syringe className="h-6 w-6 mb-2" />
              <span>Báo cáo tiêm chủng</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MapPin className="h-6 w-6 mb-2" />
              <span>Báo cáo theo địa điểm</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 