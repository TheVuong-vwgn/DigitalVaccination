"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Search, Package, Plus, AlertTriangle, TrendingUp, Building } from "lucide-react"

export function VaccineManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedVaccine, setSelectedVaccine] = useState<any>(null)

  const vaccineInventory = [
    {
      id: "1",
      name: "COVID-19 Pfizer",
      totalStock: 2500,
      locations: [
        { name: "Bệnh viện Đa khoa TP", stock: 800, status: "Tốt" },
        { name: "Trung tâm Y tế Q1", stock: 600, status: "Tốt" },
        { name: "Phòng khám ABC", stock: 1100, status: "Tốt" },
      ],
      manufacturer: "Pfizer-BioNTech",
      temperature: "-70°C",
      price: 0,
      expiryAlert: 0,
    },
    {
      id: "2",
      name: "Cúm mùa 2024",
      totalStock: 850,
      locations: [
        { name: "Bệnh viện Đa khoa TP", stock: 300, status: "Tốt" },
        { name: "Trung tâm Y tế Q1", stock: 50, status: "Sắp hết" },
        { name: "Phòng khám ABC", stock: 500, status: "Tốt" },
      ],
      manufacturer: "Sanofi",
      temperature: "2-8°C",
      price: 150000,
      expiryAlert: 2,
    },
    {
      id: "3",
      name: "Viêm gan B",
      totalStock: 1200,
      locations: [
        { name: "Bệnh viện Đa khoa TP", stock: 400, status: "Tốt" },
        { name: "Trung tâm Y tế Q1", stock: 300, status: "Sắp hết hạn" },
        { name: "Phòng khám ABC", stock: 500, status: "Tốt" },
      ],
      manufacturer: "GSK",
      temperature: "2-8°C",
      price: 200000,
      expiryAlert: 1,
    },
    {
      id: "4",
      name: "HPV",
      totalStock: 600,
      locations: [
        { name: "Bệnh viện Đa khoa TP", stock: 200, status: "Tốt" },
        { name: "Trung tâm Y tế Q1", stock: 150, status: "Tốt" },
        { name: "Phòng khám ABC", stock: 250, status: "Tốt" },
      ],
      manufacturer: "Merck",
      temperature: "2-8°C",
      price: 1500000,
      expiryAlert: 0,
    },
  ]

  const filteredVaccines = vaccineInventory.filter((vaccine) => {
    const matchesSearch = vaccine.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation =
      locationFilter === "all" || vaccine.locations.some((loc) => loc.name.includes(locationFilter))
    return matchesSearch && matchesLocation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tốt":
        return "default"
      case "Sắp hết":
        return "secondary"
      case "Sắp hết hạn":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getTotalAlerts = () => {
    return vaccineInventory.reduce((total, vaccine) => total + vaccine.expiryAlert, 0)
  }

  const getTotalStock = () => {
    return vaccineInventory.reduce((total, vaccine) => total + vaccine.totalStock, 0)
  }

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "Miễn phí"
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý vaccine</h2>
          <p className="text-muted-foreground">Quản lý kho vaccine và phân phối</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm vaccine mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm loại vaccine mới</DialogTitle>
              <DialogDescription>Thêm loại vaccine mới vào hệ thống</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="vaccineName">Tên vaccine</Label>
                  <Input id="vaccineName" placeholder="Nhập tên vaccine" />
                </div>
                <div>
                  <Label htmlFor="manufacturer">Nhà sản xuất</Label>
                  <Input id="manufacturer" placeholder="Tên nhà sản xuất" />
                </div>
                <div>
                  <Label htmlFor="temperature">Nhiệt độ bảo quản</Label>
                  <Input id="temperature" placeholder="VD: 2-8°C" />
                </div>
                <div>
                  <Label htmlFor="price">Giá (VND)</Label>
                  <Input id="price" type="number" placeholder="0 nếu miễn phí" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Input id="description" placeholder="Mô tả về vaccine" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Hủy</Button>
                <Button>Thêm vaccine</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng tồn kho</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalStock().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Liều vaccine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loại vaccine</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vaccineInventory.length}</div>
            <p className="text-xs text-muted-foreground">Đang quản lý</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cảnh báo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{getTotalAlerts()}</div>
            <p className="text-xs text-muted-foreground">Cần xử lý</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Địa điểm</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>
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
                placeholder="Tìm theo tên vaccine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo địa điểm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả địa điểm</SelectItem>
                <SelectItem value="Bệnh viện Đa khoa TP">Bệnh viện Đa khoa TP</SelectItem>
                <SelectItem value="Trung tâm Y tế Q1">Trung tâm Y tế Q1</SelectItem>
                <SelectItem value="Phòng khám ABC">Phòng khám ABC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vaccine Inventory */}
      <div className="space-y-4">
        {filteredVaccines.map((vaccine) => (
          <Card key={vaccine.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{vaccine.name}</h3>
                    <p className="text-muted-foreground">NSX: {vaccine.manufacturer}</p>
                    <p className="text-sm text-muted-foreground">Nhiệt độ: {vaccine.temperature}</p>
                    <p className="text-sm text-muted-foreground">Giá: {formatCurrency(vaccine.price)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{vaccine.totalStock.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">liều tổng</p>
                  {vaccine.expiryAlert > 0 && (
                    <Badge variant="destructive" className="mt-2">
                      {vaccine.expiryAlert} cảnh báo
                    </Badge>
                  )}
                </div>
              </div>

              {/* Location Distribution */}
              <div className="mb-4">
                <h4 className="font-medium mb-3">Phân phối theo địa điểm:</h4>
                <div className="grid gap-3 md:grid-cols-3">
                  {vaccine.locations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{location.name}</p>
                        <p className="text-xs text-muted-foreground">{location.stock} liều</p>
                      </div>
                      <Badge variant={getStatusColor(location.status)}>{location.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedVaccine(vaccine)}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Thống kê
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Thống kê vaccine {vaccine.name}</DialogTitle>
                      <DialogDescription>Chi tiết sử dụng và tồn kho</DialogDescription>
                    </DialogHeader>
                    {selectedVaccine && (
                      <div className="space-y-6">
                        {/* Overview */}
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{selectedVaccine.totalStock}</div>
                            <p className="text-sm text-muted-foreground">Tổng tồn kho</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">1,250</div>
                            <p className="text-sm text-muted-foreground">Đã sử dụng (tháng)</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">85%</div>
                            <p className="text-sm text-muted-foreground">Tỷ lệ sử dụng</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{selectedVaccine.expiryAlert}</div>
                            <p className="text-sm text-muted-foreground">Cảnh báo</p>
                          </div>
                        </div>

                        {/* Location Details */}
                        <div>
                          <h4 className="font-semibold mb-3">Chi tiết theo địa điểm</h4>
                          <div className="space-y-3">
                            {selectedVaccine.locations.map((location: any, index: number) => (
                              <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium">{location.name}</h5>
                                  <Badge variant={getStatusColor(location.status)}>{location.status}</Badge>
                                </div>
                                <div className="grid gap-2 md:grid-cols-3 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Tồn kho</p>
                                    <p className="font-medium">{location.stock} liều</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Đã dùng (tháng)</p>
                                    <p className="font-medium">{Math.floor(Math.random() * 200) + 100} liều</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Dự kiến hết</p>
                                    <p className="font-medium">{Math.floor(Math.random() * 30) + 15} ngày</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button size="sm" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Nhập kho
                </Button>

                <Button size="sm" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Phân phối
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVaccines.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy vaccine</h3>
            <p className="text-muted-foreground">Không có vaccine nào phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
