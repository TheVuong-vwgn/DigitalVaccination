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
import { Progress } from "@/components/ui/progress"
import { FileText, Search, Calendar, MapPin, Shield, Download, Eye, Filter } from "lucide-react"

interface VaccinationRecord {
  id: string
  vaccineName: string
  manufacturer: string
  batchNumber: string
  date: string
  location: string
  doctor: string
  nextDue?: string
  sideEffects?: string[]
  certificateId: string
}

const mockRecords: VaccinationRecord[] = [
  {
    id: "1",
    vaccineName: "COVID-19 mũi 3",
    manufacturer: "Pfizer-BioNTech",
    batchNumber: "FF2345",
    date: "2024-06-15",
    location: "Bệnh viện Đa khoa Thành phố",
    doctor: "BS. Nguyễn Văn A",
    nextDue: "2024-12-15",
    sideEffects: ["Đau tại chỗ tiêm", "Mệt mỏi nhẹ"],
    certificateId: "CV-2024-001234",
  },
  {
    id: "2",
    vaccineName: "Vaccine cúm mùa 2023",
    manufacturer: "Sanofi",
    batchNumber: "FL1234",
    date: "2023-10-20",
    location: "Trung tâm Y tế Quận 1",
    doctor: "BS. Trần Thị B",
    nextDue: "2024-10-20",
    certificateId: "CV-2023-005678",
  },
  {
    id: "3",
    vaccineName: "Viêm gan B mũi 3",
    manufacturer: "GSK",
    batchNumber: "HB5678",
    date: "2023-03-10",
    location: "Phòng khám Đa khoa An Khang",
    doctor: "BS. Lê Văn C",
    certificateId: "CV-2023-009012",
  },
]

const vaccineStats = {
  totalVaccinations: 12,
  thisYear: 3,
  upToDate: 85,
  pending: 2,
}

export function VaccinationHistory() {
  const [records, setRecords] = useState(mockRecords)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedVaccine, setSelectedVaccine] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<VaccinationRecord | null>(null)

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.vaccineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear = selectedYear === "all" || record.date.startsWith(selectedYear)
    const matchesVaccine = selectedVaccine === "all" || record.vaccineName.includes(selectedVaccine)

    return matchesSearch && matchesYear && matchesVaccine
  })

  const years = ["all", "2024", "2023", "2022", "2021"]
  const vaccineTypes = ["all", "COVID-19", "Cúm mùa", "Viêm gan", "Sởi", "Rubella"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lịch sử tiêm chủng</h1>
        <p className="text-muted-foreground">Xem lại các mũi tiêm đã thực hiện</p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số mũi tiêm</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vaccineStats.totalVaccinations}</div>
            <p className="text-xs text-muted-foreground">Từ khi bắt đầu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiêm trong năm</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vaccineStats.thisYear}</div>
            <p className="text-xs text-muted-foreground">Năm 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Độ bao phủ</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vaccineStats.upToDate}%</div>
            <Progress value={vaccineStats.upToDate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cần tiêm</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vaccineStats.pending}</div>
            <p className="text-xs text-muted-foreground">Mũi tiêm sắp tới</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Tìm kiếm và lọc
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm theo tên vaccine hoặc địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Năm</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {years.slice(1).map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Loại vaccine</label>
              <Select value={selectedVaccine} onValueChange={setSelectedVaccine}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {vaccineTypes.slice(1).map((vaccine) => (
                    <SelectItem key={vaccine} value={vaccine}>
                      {vaccine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vaccination Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Hồ sơ tiêm chủng
          </CardTitle>
          <CardDescription>Tìm thấy {filteredRecords.length} bản ghi</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy bản ghi nào</p>
              <p className="text-sm text-gray-400">Thử thay đổi bộ lọc tìm kiếm</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{record.vaccineName}</p>
                      <p className="text-sm text-muted-foreground">{record.manufacturer}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{record.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {record.nextDue && (
                      <Badge variant="outline" className="text-xs">
                        Tiếp theo: {record.nextDue}
                      </Badge>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedRecord(record)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Chi tiết
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Chi tiết mũi tiêm</DialogTitle>
                          <DialogDescription>Thông tin chi tiết về mũi tiêm {record.vaccineName}</DialogDescription>
                        </DialogHeader>
                        {selectedRecord && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Tên vaccine</label>
                                <p className="text-sm text-muted-foreground">{selectedRecord.vaccineName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Nhà sản xuất</label>
                                <p className="text-sm text-muted-foreground">{selectedRecord.manufacturer}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Số lô</label>
                                <p className="text-sm text-muted-foreground">{selectedRecord.batchNumber}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Ngày tiêm</label>
                                <p className="text-sm text-muted-foreground">{selectedRecord.date}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Bác sĩ tiêm</label>
                                <p className="text-sm text-muted-foreground">{selectedRecord.doctor}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Mã chứng chỉ</label>
                                <p className="text-sm text-muted-foreground">{selectedRecord.certificateId}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Địa điểm tiêm</label>
                              <p className="text-sm text-muted-foreground">{selectedRecord.location}</p>
                            </div>
                            {selectedRecord.sideEffects && selectedRecord.sideEffects.length > 0 && (
                              <div>
                                <label className="text-sm font-medium">Tác dụng phụ</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedRecord.sideEffects.map((effect, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {effect}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedRecord.nextDue && (
                              <div>
                                <label className="text-sm font-medium">Mũi tiếp theo</label>
                                <p className="text-sm text-muted-foreground">{selectedRecord.nextDue}</p>
                              </div>
                            )}
                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1">
                                <Download className="h-4 w-4 mr-2" />
                                Tải chứng chỉ
                              </Button>
                              <Button variant="outline" className="flex-1 bg-transparent">
                                <Shield className="h-4 w-4 mr-2" />
                                Xem QR Code
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
