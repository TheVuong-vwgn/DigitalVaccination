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
import { Search, CreditCard, DollarSign, CheckCircle, Receipt, Printer } from "lucide-react"

export function PaymentConfirmation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const payments = [
    {
      id: "PAY001",
      patientName: "Nguyễn Văn A",
      patientPhone: "0123456789",
      vaccine: "COVID-19 Pfizer",
      amount: 0,
      paymentMethod: "Miễn phí",
      status: "Đã thanh toán",
      appointmentId: "APP001",
      transactionId: "TXN001",
      paidAt: "2024-12-15T09:15:00",
      notes: "Vaccine miễn phí theo chương trình quốc gia",
    },
    {
      id: "PAY002",
      patientName: "Trần Thị B",
      patientPhone: "0987654321",
      vaccine: "Cúm mùa 2024",
      amount: 150000,
      paymentMethod: "Tiền mặt",
      status: "Chờ thanh toán",
      appointmentId: "APP002",
      transactionId: "",
      paidAt: "",
      notes: "",
    },
    {
      id: "PAY003",
      patientName: "Lê Văn C",
      patientPhone: "0456789123",
      vaccine: "Viêm gan B",
      amount: 200000,
      paymentMethod: "Thẻ tín dụng",
      status: "Đã thanh toán",
      appointmentId: "APP003",
      transactionId: "TXN003",
      paidAt: "2024-12-15T10:30:00",
      notes: "Thanh toán qua POS",
    },
    {
      id: "PAY004",
      patientName: "Phạm Thị D",
      patientPhone: "0789123456",
      vaccine: "HPV",
      amount: 1500000,
      paymentMethod: "Chuyển khoản",
      status: "Chờ xác nhận",
      appointmentId: "APP004",
      transactionId: "TXN004",
      paidAt: "2024-12-15T11:00:00",
      notes: "Đã chuyển khoản, cần xác nhận",
    },
    {
      id: "PAY005",
      patientName: "Hoàng Văn E",
      patientPhone: "0321654987",
      vaccine: "Cúm mùa 2024",
      amount: 150000,
      paymentMethod: "Tiền mặt",
      status: "Đã hoàn tiền",
      appointmentId: "APP005",
      transactionId: "REF001",
      paidAt: "2024-12-14T14:20:00",
      notes: "Hoàn tiền do hủy lịch hẹn",
    },
  ]

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.patientPhone.includes(searchQuery) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return "default"
      case "Chờ thanh toán":
        return "secondary"
      case "Chờ xác nhận":
        return "outline"
      case "Đã hoàn tiền":
        return "destructive"
      default:
        return "outline"
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "Miễn phí"
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const confirmPayment = (paymentId: string) => {
    console.log("Confirming payment:", paymentId)
  }

  const processRefund = (paymentId: string) => {
    console.log("Processing refund:", paymentId)
  }

  const printReceipt = (paymentId: string) => {
    console.log("Printing receipt:", paymentId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Xử lý thanh toán</h2>
        <p className="text-muted-foreground">Xác nhận và quản lý thanh toán của bệnh nhân</p>
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
                placeholder="Tìm theo tên, SĐT hoặc mã thanh toán..."
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
                <SelectItem value="Chờ thanh toán">Chờ thanh toán</SelectItem>
                <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
                <SelectItem value="Đã thanh toán">Đã thanh toán</SelectItem>
                <SelectItem value="Đã hoàn tiền">Đã hoàn tiền</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{payment.patientName}</h3>
                    <p className="text-muted-foreground">{payment.patientPhone}</p>
                    <p className="text-sm text-muted-foreground">{payment.vaccine}</p>
                    <p className="text-sm text-muted-foreground">Mã: {payment.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatCurrency(payment.amount)}</div>
                  <p className="text-sm text-muted-foreground">{payment.paymentMethod}</p>
                  <Badge variant={getStatusColor(payment.status)} className="mt-2">
                    {payment.status}
                  </Badge>
                </div>
              </div>

              {payment.notes && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Ghi chú:</strong> {payment.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedPayment(payment)}>
                      <Receipt className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chi tiết thanh toán</DialogTitle>
                      <DialogDescription>Thông tin chi tiết về giao dịch thanh toán</DialogDescription>
                    </DialogHeader>
                    {selectedPayment && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium">Mã thanh toán</p>
                            <p className="text-muted-foreground">{selectedPayment.id}</p>
                          </div>
                          <div>
                            <p className="font-medium">Bệnh nhân</p>
                            <p className="text-muted-foreground">{selectedPayment.patientName}</p>
                          </div>
                          <div>
                            <p className="font-medium">Số điện thoại</p>
                            <p className="text-muted-foreground">{selectedPayment.patientPhone}</p>
                          </div>
                          <div>
                            <p className="font-medium">Vaccine</p>
                            <p className="text-muted-foreground">{selectedPayment.vaccine}</p>
                          </div>
                          <div>
                            <p className="font-medium">Số tiền</p>
                            <p className="text-muted-foreground">{formatCurrency(selectedPayment.amount)}</p>
                          </div>
                          <div>
                            <p className="font-medium">Phương thức</p>
                            <p className="text-muted-foreground">{selectedPayment.paymentMethod}</p>
                          </div>
                          <div>
                            <p className="font-medium">Trạng thái</p>
                            <Badge variant={getStatusColor(selectedPayment.status)}>{selectedPayment.status}</Badge>
                          </div>
                          {selectedPayment.transactionId && (
                            <div>
                              <p className="font-medium">Mã giao dịch</p>
                              <p className="text-muted-foreground">{selectedPayment.transactionId}</p>
                            </div>
                          )}
                          {selectedPayment.paidAt && (
                            <div>
                              <p className="font-medium">Thời gian thanh toán</p>
                              <p className="text-muted-foreground">
                                {new Date(selectedPayment.paidAt).toLocaleString("vi-VN")}
                              </p>
                            </div>
                          )}
                        </div>
                        {selectedPayment.notes && (
                          <div>
                            <p className="font-medium">Ghi chú</p>
                            <p className="text-muted-foreground">{selectedPayment.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                {payment.status === "Chờ thanh toán" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Nhận thanh toán
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nhận thanh toán</DialogTitle>
                        <DialogDescription>Xác nhận nhận thanh toán từ {payment.patientName}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="amount">Số tiền</Label>
                            <Input id="amount" value={formatCurrency(payment.amount)} disabled />
                          </div>
                          <div>
                            <Label htmlFor="method">Phương thức thanh toán</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phương thức" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cash">Tiền mặt</SelectItem>
                                <SelectItem value="card">Thẻ tín dụng</SelectItem>
                                <SelectItem value="transfer">Chuyển khoản</SelectItem>
                                <SelectItem value="qr">QR Code</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="notes">Ghi chú</Label>
                          <Textarea id="notes" placeholder="Ghi chú về giao dịch..." />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Hủy</Button>
                          <Button onClick={() => confirmPayment(payment.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Xác nhận thanh toán
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {payment.status === "Chờ xác nhận" && (
                  <Button size="sm" onClick={() => confirmPayment(payment.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Xác nhận
                  </Button>
                )}

                {payment.status === "Đã thanh toán" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => printReceipt(payment.id)}>
                      <Printer className="h-4 w-4 mr-2" />
                      In hóa đơn
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          Hoàn tiền
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Hoàn tiền</DialogTitle>
                          <DialogDescription>Xử lý hoàn tiền cho {payment.patientName}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label htmlFor="refundAmount">Số tiền hoàn</Label>
                              <Input id="refundAmount" value={formatCurrency(payment.amount)} />
                            </div>
                            <div>
                              <Label htmlFor="refundMethod">Phương thức hoàn tiền</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn phương thức" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cash">Tiền mặt</SelectItem>
                                  <SelectItem value="transfer">Chuyển khoản</SelectItem>
                                  <SelectItem value="original">Hoàn về phương thức gốc</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="refundReason">Lý do hoàn tiền</Label>
                            <Textarea id="refundReason" placeholder="Nhập lý do hoàn tiền..." />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Hủy</Button>
                            <Button variant="destructive" onClick={() => processRefund(payment.id)}>
                              Xác nhận hoàn tiền
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có giao dịch</h3>
            <p className="text-muted-foreground">Không tìm thấy giao dịch nào phù hợp với tìm kiếm</p>
          </CardContent>
        </Card>
      )}

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê thanh toán</CardTitle>
          <CardDescription>Tổng quan về các giao dịch thanh toán</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{payments.length}</div>
              <p className="text-sm text-muted-foreground">Tổng giao dịch</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {payments.filter((p) => p.status === "Đã thanh toán").length}
              </div>
              <p className="text-sm text-muted-foreground">Đã thanh toán</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {payments.filter((p) => p.status === "Chờ thanh toán").length}
              </div>
              <p className="text-sm text-muted-foreground">Chờ thanh toán</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {formatCurrency(
                  payments.filter((p) => p.status === "Đã thanh toán").reduce((sum, p) => sum + p.amount, 0),
                )}
              </div>
              <p className="text-sm text-muted-foreground">Tổng doanh thu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
