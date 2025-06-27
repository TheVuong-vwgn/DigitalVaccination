"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Package, Plus, Minus, AlertTriangle, TrendingUp } from "lucide-react"

export function VaccineInventory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVaccine, setSelectedVaccine] = useState<any>(null)

  const inventory = [
    {
      id: "VAC001",
      name: "COVID-19 Pfizer",
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      manufacturer: "Pfizer-BioNTech",
      batchNumber: "PF2024121500001",
      expiryDate: "2025-06-15",
      temperature: "-70°C",
      location: "Tủ lạnh A1",
      status: "Tốt",
      lastUpdated: "2024-12-15T08:00:00",
      notes: "",
    },
    {
      id: "VAC002",
      name: "Cúm mùa 2024",
      currentStock: 25,
      minStock: 30,
      maxStock: 200,
      manufacturer: "Sanofi",
      batchNumber: "FLU2024121500001",
      expiryDate: "2025-03-20",
      temperature: "2-8°C",
      location: "Tủ lạnh B2",
      status: "Sắp hết",
      lastUpdated: "2024-12-15T09:30:00",
      notes: "Cần đặt hàng thêm",
    },
    {
      id: "VAC003",
      name: "Viêm gan B",
      currentStock: 80,
      minStock: 40,
      maxStock: 300,
      manufacturer: "GSK",
      batchNumber: "HBV2024121500001",
      expiryDate: "2024-12-30",
      temperature: "2-8°C",
      location: "Tủ lạnh B1",
      status: "Sắp hết hạn",
      lastUpdated: "2024-12-15T10:15:00",
      notes: "Hết hạn trong 15 ngày",
    },
    {
      id: "VAC004",
      name: "HPV",
      currentStock: 120,
      minStock: 20,
      maxStock: 150,
      manufacturer: "Merck",
      batchNumber: "HPV2024121500001",
      expiryDate: "2025-08-10",
      temperature: "2-8°C",
      location: "Tủ lạnh C1",
      status: "Tốt",
      lastUpdated: "2024-12-15T11:00:00",
      notes: "",
    },
  ]

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tốt":
        return "default"
      case "Sắp hết":
        return "secondary"
      case "Sắp hết hạn":
        return "destructive"
      case "Hết hàng":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100
    if (current <= min) return { level: "low", color: "text-red-600" }
    if (percentage <= 30) return { level: "medium", color: "text-orange-600" }
    return { level: "good", color: "text-green-600" }
  }

  const addStock = (vaccineId: string, quantity: number) => {
    console.log("Adding stock:", vaccineId, quantity)
  }

  const removeStock = (vaccineId: string, quantity: number) => {
    console.log("Removing stock:", vaccineId, quantity)
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Quản lý kho vaccine</h2>
        <p className="text-muted-foreground">Theo dõi tồn kho và quản lý vaccine</p>
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
                placeholder="Tìm theo tên vaccine, lô hàng hoặc NSX..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="Tốt">Tốt</SelectItem>
                <SelectItem value="Sắp hết">Sắp hết</SelectItem>
                <SelectItem value="Sắp hết hạn">Sắp hết hạn</SelectItem>
                <SelectItem value="Hết hàng">Hết hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <div className="space-y-4">
        {filteredInventory.map((item) => {
          const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock)
          const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate)

          return (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-muted-foreground">NSX: {item.manufacturer}</p>
                      <p className="text-sm text-muted-foreground">Lô: {item.batchNumber}</p>
                      <p className="text-sm text-muted-foreground">Vị trí: {item.location}</p>
                      <p className="text-sm text-muted-foreground">Nhiệt độ: {item.temperature}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${stockLevel.color}`}>{item.currentStock}</div>
                    <p className="text-sm text-muted-foreground">
                      Min: {item.minStock} | Max: {item.maxStock}
                    </p>
                    <Badge variant={getStatusColor(item.status)} className="mt-2">
                      {item.status}
                    </Badge>
                  </div>
                </div>

                {/* Alerts */}
                {(item.currentStock <= item.minStock || daysUntilExpiry <= 30) && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Cảnh báo:</p>
                        {item.currentStock <= item.minStock && (
                          <p className="text-sm text-yellow-700">Tồn kho thấp - cần nhập thêm</p>
                        )}
                        {daysUntilExpiry <= 30 && (
                          <p className="text-sm text-yellow-700">Sắp hết hạn - còn {daysUntilExpiry} ngày</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {item.notes && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Ghi chú:</strong> {item.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelectedVaccine(item)}>
                        <Package className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Chi tiết vaccine</DialogTitle>
                        <DialogDescription>Thông tin chi tiết về vaccine trong kho</DialogDescription>
                      </DialogHeader>
                      {selectedVaccine && (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <p className="font-medium">Tên vaccine</p>
                              <p className="text-muted-foreground">{selectedVaccine.name}</p>
                            </div>
                            <div>
                              <p className="font-medium">Nhà sản xuất</p>
                              <p className="text-muted-foreground">{selectedVaccine.manufacturer}</p>
                            </div>
                            <div>
                              <p className="font-medium">Số lô</p>
                              <p className="text-muted-foreground">{selectedVaccine.batchNumber}</p>
                            </div>
                            <div>
                              <p className="font-medium">Hạn sử dụng</p>
                              <p className="text-muted-foreground">
                                {new Date(selectedVaccine.expiryDate).toLocaleDateString("vi-VN")}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Tồn kho hiện tại</p>
                              <p className="text-muted-foreground">{selectedVaccine.currentStock} liều</p>
                            </div>
                            <div>
                              <p className="font-medium">Tồn kho tối thiểu</p>
                              <p className="text-muted-foreground">{selectedVaccine.minStock} liều</p>
                            </div>
                            <div>
                              <p className="font-medium">Nhiệt độ bảo quản</p>
                              <p className="text-muted-foreground">{selectedVaccine.temperature}</p>
                            </div>
                            <div>
                              <p className="font-medium">Vị trí lưu trữ</p>
                              <p className="text-muted-foreground">{selectedVaccine.location}</p>
                            </div>
                            <div>
                              <p className="font-medium">Trạng thái</p>
                              <Badge variant={getStatusColor(selectedVaccine.status)}>{selectedVaccine.status}</Badge>
                            </div>
                            <div>
                              <p className="font-medium">Cập nhật cuối</p>
                              <p className="text-muted-foreground">
                                {new Date(selectedVaccine.lastUpdated).toLocaleString("vi-VN")}
                              </p>
                            </div>
                          </div>
                          {selectedVaccine.notes && (
                            <div>
                              <p className="font-medium">Ghi chú</p>
                              <p className="text-muted-foreground">{selectedVaccine.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Nhập kho
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nhập kho vaccine</DialogTitle>
                        <DialogDescription>Thêm vaccine {item.name} vào kho</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="quantity">Số lượng nhập</Label>
                            <Input id="quantity" type="number" placeholder="Nhập số lượng" />
                          </div>
                          <div>
                            <Label htmlFor="newBatch">Số lô mới</Label>
                            <Input id="newBatch" placeholder="Số lô vaccine" />
                          </div>
                          <div>
                            <Label htmlFor="newExpiry">Hạn sử dụng</Label>
                            <Input id="newExpiry" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="supplier">Nhà cung cấp</Label>
                            <Input id="supplier" placeholder="Tên nhà cung cấp" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="importNotes">Ghi chú nhập kho</Label>
                          <Textarea id="importNotes" placeholder="Ghi chú về lô hàng nhập..." />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Hủy</Button>
                          <Button onClick={() => addStock(item.id, 100)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Xác nhận nhập
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Minus className="h-4 w-4 mr-2" />
                        Xuất kho
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Xuất kho vaccine</DialogTitle>
                        <DialogDescription>Xuất vaccine {item.name} khỏi kho</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="exportQuantity">Số lượng xuất</Label>
                            <Input id="exportQuantity" type="number" placeholder="Nhập số lượng" />
                          </div>
                          <div>
                            <Label htmlFor="reason">Lý do xuất</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn lý do" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vaccination">Sử dụng tiêm chủng</SelectItem>
                                <SelectItem value="transfer">Chuyển kho</SelectItem>
                                <SelectItem value="expired">Hết hạn</SelectItem>
                                <SelectItem value="damaged">Hư hỏng</SelectItem>
                                <SelectItem value="other">Khác</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="exportNotes">Ghi chú xuất kho</Label>
                          <Textarea id="exportNotes" placeholder="Ghi chú về việc xuất kho..." />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Hủy</Button>
                          <Button variant="destructive" onClick={() => removeStock(item.id, 10)}>
                            <Minus className="h-4 w-4 mr-2" />
                            Xác nhận xuất
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button size="sm" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Lịch sử
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredInventory.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có vaccine</h3>
            <p className="text-muted-foreground">Không tìm thấy vaccine nào phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}

      {/* Inventory Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng quan kho vaccine</CardTitle>
          <CardDescription>Thống kê tình trạng tồn kho</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{inventory.length}</div>
              <p className="text-sm text-muted-foreground">Loại vaccine</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {inventory.filter((i) => i.status === "Tốt").length}
              </div>
              <p className="text-sm text-muted-foreground">Tình trạng tốt</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {inventory.filter((i) => i.status === "Sắp hết").length}
              </div>
              <p className="text-sm text-muted-foreground">Sắp hết</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {inventory.filter((i) => i.status === "Sắp hết hạn").length}
              </div>
              <p className="text-sm text-muted-foreground">Sắp hết hạn</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
