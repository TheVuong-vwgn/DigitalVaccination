"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, Plus, MapPin, Calendar, ThumbsUp } from "lucide-react"

interface Review {
  id: string
  vaccineName: string
  location: string
  date: string
  rating: number
  serviceRating: number
  facilityRating: number
  staffRating: number
  comment: string
  helpful: number
  status: "published" | "pending" | "draft"
}

const mockReviews: Review[] = [
  {
    id: "1",
    vaccineName: "COVID-19 mũi 3",
    location: "Bệnh viện Đa khoa Thành phố",
    date: "2024-06-15",
    rating: 5,
    serviceRating: 5,
    facilityRating: 4,
    staffRating: 5,
    comment:
      "Dịch vụ rất tốt, nhân viên thân thiện và chuyên nghiệp. Quy trình tiêm nhanh gọn, không phải chờ đợi lâu.",
    helpful: 12,
    status: "published",
  },
  {
    id: "2",
    vaccineName: "Vaccine cúm mùa 2023",
    location: "Trung tâm Y tế Quận 1",
    date: "2023-10-20",
    rating: 4,
    serviceRating: 4,
    facilityRating: 4,
    staffRating: 4,
    comment: "Cơ sở vật chất khá tốt, bác sĩ tư vấn kỹ càng. Tuy nhiên thời gian chờ hơi lâu vào giờ cao điểm.",
    helpful: 8,
    status: "published",
  },
]

export function Reviews() {
  const [reviews, setReviews] = useState(mockReviews)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    vaccineName: "",
    location: "",
    rating: 5,
    serviceRating: 5,
    facilityRating: 5,
    staffRating: 5,
    comment: "",
  })

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    }

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const renderInteractiveStars = (rating: number, onChange: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 cursor-pointer transition-colors ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
            }`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    )
  }

  const handleSubmitReview = () => {
    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
      status: "pending",
    }
    setReviews([review, ...reviews])
    setNewReview({
      vaccineName: "",
      location: "",
      rating: 5,
      serviceRating: 5,
      facilityRating: 5,
      staffRating: 5,
      comment: "",
    })
    setIsDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Đã đăng</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Bản nháp</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Đánh giá của tôi</h1>
          <p className="text-muted-foreground">Chia sẻ trải nghiệm tiêm chủng của bạn</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Viết đánh giá
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Viết đánh giá mới</DialogTitle>
              <DialogDescription>Chia sẻ trải nghiệm tiêm chủng của bạn</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vaccine">Loại vaccine</Label>
                  <Input
                    id="vaccine"
                    placeholder="Ví dụ: COVID-19 mũi 3"
                    value={newReview.vaccineName}
                    onChange={(e) => setNewReview({ ...newReview, vaccineName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm</Label>
                  <Input
                    id="location"
                    placeholder="Tên cơ sở y tế"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Đánh giá tổng thể</Label>
                <div className="flex items-center gap-2">
                  {renderInteractiveStars(newReview.rating, (rating) => setNewReview({ ...newReview, rating }))}
                  <span className="text-sm text-muted-foreground">({newReview.rating}/5)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Dịch vụ</Label>
                  {renderInteractiveStars(newReview.serviceRating, (rating) =>
                    setNewReview({ ...newReview, serviceRating: rating }),
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Cơ sở</Label>
                  {renderInteractiveStars(newReview.facilityRating, (rating) =>
                    setNewReview({ ...newReview, facilityRating: rating }),
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Nhân viên</Label>
                  {renderInteractiveStars(newReview.staffRating, (rating) =>
                    setNewReview({ ...newReview, staffRating: rating }),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Nhận xét</Label>
                <Textarea
                  id="comment"
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmitReview}>Đăng đánh giá</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đánh giá</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">Đánh giá đã viết</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm trung bình</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1">{renderStars(Math.round(averageRating), "sm")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hữu ích</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.reduce((sum, review) => sum + review.helpful, 0)}</div>
            <p className="text-xs text-muted-foreground">Lượt thích</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã đăng</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.filter((r) => r.status === "published").length}</div>
            <p className="text-xs text-muted-foreground">Đánh giá công khai</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{review.vaccineName}</h3>
                      {getStatusBadge(review.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{review.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm font-medium">({review.rating}/5)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Dịch vụ:</span>
                    {renderStars(review.serviceRating, "sm")}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cơ sở:</span>
                    {renderStars(review.facilityRating, "sm")}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Nhân viên:</span>
                    {renderStars(review.staffRating, "sm")}
                  </div>
                </div>

                <p className="text-muted-foreground">{review.comment}</p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpful} người thấy hữu ích</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Chỉnh sửa
                    </Button>
                    <Button size="sm" variant="outline">
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có đánh giá nào</h3>
            <p className="text-muted-foreground mb-4">Hãy chia sẻ trải nghiệm tiêm chủng của bạn</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Viết đánh giá đầu tiên
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
