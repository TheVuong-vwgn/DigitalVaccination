"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Syringe, CheckCircle, AlertTriangle, Clock } from "lucide-react"

export function VaccinationConfirmation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVaccination, setSelectedVaccination] = useState<any>(null)

  const pendingVaccinations = [
    {
      id: "1",
      patientName: "Nguyễn Văn A",
      vaccine: "COVID-19 Pfizer",
      scheduledTime: "09:00",
      actualTime: "09:05",
      batchNumber: "PF2024121500001",
      injectionSite: "Cánh tay trái",
      status: "Chờ xác nhận",
      sideEffects: "Không có",
      notes: "Tiêm thành công, bệnh nhân cảm thấy tốt",
    },
    {
      id: "2",
      patientName: "Trần Thị B",
      vaccine: "Cúm mùa 2024",
      scheduledTime: "09:30",
      actualTime: "09:35",
      batchNumber: "FLU2024121500001",
      injectionSite: "Cánh tay phải",
      status: "Đã tiêm",
      sideEffects: "Đau nhẹ tại chỗ tiêm",
      notes: "Bệnh nhân được khuyên nghỉ ngơi 15 phút",
    },
    {
      id: "3",
      patientName: "Lê Văn C",
      vaccine: "Viêm gan B",
      scheduledTime: "10:00",
      actualTime: "",
      batchNumber: "HBV2024121500001",
      injectionSite: "",
      status: "Đang tiêm",
      sideEffects: "",
      notes: "",
    },
  ]

  const filteredVaccinations = pendingVaccinations.filter(
    (vaccination) =>
      vaccination.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vaccination.vaccine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const confirmVaccination = (vaccinationId: string) => {
    console.log("Confirming vaccination:", vaccinationId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xác nhận":
        return "default"
      case "Chờ xác nhận":
        return "secondary"
      case "Đang tiêm":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Xác nhận tiêm chủng</h2>
        <p className="text-muted-foreground">Xác nhận các mũi tiêm đã thực hiện và ghi nhận tác dụng phụ</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm mũi tiêm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên bệnh nhân hoặc vaccine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vaccination List */}
      <div className="space-y-4">
        {filteredVaccinations.map((vaccination) => (
          <Card key={vaccination.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Syringe className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{vaccination.patientName}</h3>
                    <p className="text-muted-foreground">{vaccination.vaccine}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Dự kiến: {vaccination.scheduledTime}</span>
                      </div>
                      {vaccination.actualTime && <span>Thực tế: {vaccination.actualTime}</span>}
                    </div>
                    {vaccination.batchNumber && (
                      <p className="text-xs text-muted-foreground">Lô: {vaccination.batchNumber}</p>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusColor(vaccination.status)}>{vaccination.status}</Badge>
              </div>

              {vaccination.sideEffects && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Tác dụng phụ:</p>
                      <p className="text-sm text-yellow-700">{vaccination.sideEffects}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {vaccination.status === "Đang tiêm" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Syringe className="h-4 w-4 mr-2" />
                        Hoàn thành tiêm
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hoàn thành tiêm chủng</DialogTitle>
                        <DialogDescription>Xác nhận hoàn thành tiêm cho {vaccination.patientName}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="actualTime">Thời gian thực tế</Label>
                            <Input id="actualTime" type="time" />
                          </div>
                          <div>
                            <Label htmlFor="injectionSite">Vị trí tiêm</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn vị trí" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="left-arm">Cánh tay trái</SelectItem>
                                <SelectItem value="right-arm">Cánh tay phải</SelectItem>
                                <SelectItem value="left-thigh">Đùi trái</SelectItem>
                                <SelectItem value="right-thigh">Đùi phải</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="sideEffects">Tác dụng phụ (nếu có)</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn tác dụng phụ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Không có</SelectItem>
                              <SelectItem value="mild-pain">Đau nhẹ tại chỗ tiêm</SelectItem>
                              <SelectItem value="swelling">Sưng tại chỗ tiêm</SelectItem>
                              <SelectItem value="fever">Sốt nhẹ</SelectItem>
                              <SelectItem value="fatigue">Mệt mỏi</SelectItem>
                              <SelectItem value="headache">Đau đầu</SelectItem>
                              <SelectItem value="other">Khác</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="notes">Ghi chú</Label>
                          <Textarea id="notes" placeholder="Ghi chú về quá trình tiêm và tình trạng bệnh nhân" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Hủy</Button>
                          <Button onClick={() => confirmVaccination(vaccination.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Xác nhận hoàn thành
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {vaccination.status === "Chờ xác nhận" && (
                  <Button size="sm" onClick={() => confirmVaccination(vaccination.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Xác nhận
                  </Button>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedVaccination(vaccination)}>
                      Chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chi tiết mũi tiêm</DialogTitle>
                      <DialogDescription>Thông tin chi tiết về mũi tiêm đã thực hiện</DialogDescription>
                    </DialogHeader>
                    {selectedVaccination && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium">Bệnh nhân</p>
                            <p className="text-muted-foreground">{selectedVaccination.patientName}</p>
                          </div>
                          <div>
                            <p className="font-medium">Vaccine</p>
                            <p className="text-muted-foreground">{selectedVaccination.vaccine}</p>
                          </div>
                          <div>
                            <p className="font-medium">Thời gian dự kiến</p>
                            <p className="text-muted-foreground">{selectedVaccination.scheduledTime}</p>
                          </div>
                          {selectedVaccination.actualTime && (
                            <div>
                              <p className="font-medium">Thời gian thực tế</p>
                              <p className="text-muted-foreground">{selectedVaccination.actualTime}</p>
                            </div>
                          )}
                          {selectedVaccination.batchNumber && (
                            <div>
                              <p className="font-medium">Số lô vaccine</p>
                              <p className="text-muted-foreground">{selectedVaccination.batchNumber}</p>
                            </div>
                          )}
                          {selectedVaccination.injectionSite && (
                            <div>
                              <p className="font-medium">Vị trí tiêm</p>
                              <p className="text-muted-foreground">{selectedVaccination.injectionSite}</p>
                            </div>
                          )}
                        </div>
                        {selectedVaccination.sideEffects && (
                          <div>
                            <p className="font-medium">Tác dụng phụ</p>
                            <p className="text-muted-foreground">{selectedVaccination.sideEffects}</p>
                          </div>
                        )}
                        {selectedVaccination.notes && (
                          <div>
                            <p className="font-medium">Ghi chú</p>
                            <p className="text-muted-foreground">{selectedVaccination.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVaccinations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Syringe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có mũi tiêm nào</h3>
            <p className="text-muted-foreground">Không tìm thấy mũi tiêm phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
