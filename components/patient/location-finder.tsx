"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Clock, Phone, Star, Navigation, Calendar } from "lucide-react"

interface VaccinationLocation {
  id: string
  name: string
  address: string
  distance: number
  rating: number
  phone: string
  openHours: string
  availableVaccines: string[]
  nextAvailable: string
  type: "hospital" | "clinic" | "center"
}

const mockLocations: VaccinationLocation[] = [
  {
    id: "1",
    name: "Bệnh viện Đa khoa Thành phố",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    distance: 2.5,
    rating: 4.8,
    phone: "028-3822-1234",
    openHours: "7:00 - 17:00",
    availableVaccines: ["COVID-19", "Cúm mùa", "Viêm gan B"],
    nextAvailable: "Hôm nay - 14:30",
    type: "hospital",
  },
  {
    id: "2",
    name: "Trung tâm Y tế Quận 1",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    distance: 1.8,
    rating: 4.6,
    phone: "028-3829-5678",
    openHours: "8:00 - 16:30",
    availableVaccines: ["COVID-19", "Cúm mùa"],
    nextAvailable: "Ngày mai - 09:00",
    type: "center",
  },
  {
    id: "3",
    name: "Phòng khám Đa khoa An Khang",
    address: "789 Đường Pasteur, Quận 3, TP.HCM",
    distance: 3.2,
    rating: 4.4,
    phone: "028-3930-1234",
    openHours: "8:00 - 20:00",
    availableVaccines: ["COVID-19", "Viêm gan A", "Viêm gan B"],
    nextAvailable: "Hôm nay - 16:00",
    type: "clinic",
  },
]

const vaccineTypes = ["Tất cả", "COVID-19", "Cúm mùa", "Viêm gan A", "Viêm gan B", "Sởi", "Rubella"]

const locationTypes = [
  { value: "all", label: "Tất cả" },
  { value: "hospital", label: "Bệnh viện" },
  { value: "clinic", label: "Phòng khám" },
  { value: "center", label: "Trung tâm Y tế" },
]

export function LocationFinder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVaccine, setSelectedVaccine] = useState("Tất cả")
  const [selectedType, setSelectedType] = useState("all")
  const [locations, setLocations] = useState(mockLocations)

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesVaccine = selectedVaccine === "Tất cả" || location.availableVaccines.includes(selectedVaccine)
    const matchesType = selectedType === "all" || location.type === selectedType

    return matchesSearch && matchesVaccine && matchesType
  })

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "hospital":
        return "Bệnh viện"
      case "clinic":
        return "Phòng khám"
      case "center":
        return "Trung tâm Y tế"
      default:
        return type
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "bg-blue-100 text-blue-800"
      case "clinic":
        return "bg-green-100 text-green-800"
      case "center":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tìm địa điểm tiêm</h1>
        <p className="text-muted-foreground">Tìm kiếm địa điểm tiêm chủng gần bạn</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Tìm kiếm và lọc
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm theo tên hoặc địa chỉ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Loại vaccine</label>
              <Select value={selectedVaccine} onValueChange={setSelectedVaccine}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vaccineTypes.map((vaccine) => (
                    <SelectItem key={vaccine} value={vaccine}>
                      {vaccine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Loại cơ sở</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="map">Bản đồ</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Tìm thấy {filteredLocations.length} địa điểm</p>
          </div>

          <div className="grid gap-4">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{location.name}</h3>
                        <Badge className={getTypeBadgeColor(location.type)}>{getTypeLabel(location.type)}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{location.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="h-4 w-4" />
                          <span>{location.distance}km</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{location.openHours}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{location.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Vaccine có sẵn:</p>
                      <div className="flex flex-wrap gap-2">
                        {location.availableVaccines.map((vaccine) => (
                          <Badge key={vaccine} variant="outline">
                            {vaccine}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">Lịch trống: {location.nextAvailable}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Đặt lịch
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardContent className="p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Bản đồ sẽ hiển thị ở đây</p>
                  <p className="text-sm text-gray-400">Tích hợp với Google Maps hoặc OpenStreetMap</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
