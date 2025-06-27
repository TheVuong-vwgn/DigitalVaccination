"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Wallet, QrCode, Receipt, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentRecord {
  id: string
  vaccineName: string
  amount: number
  date: string
  status: "paid" | "pending" | "failed"
  method: "card" | "bank" | "qr" | "cash"
  location: string
  receiptId: string
}

const mockPayments: PaymentRecord[] = [
  {
    id: "PAY-001",
    vaccineName: "COVID-19 mũi 4",
    amount: 250000,
    date: "2024-12-15",
    status: "paid",
    method: "card",
    location: "Bệnh viện Đa khoa Thành phố",
    receiptId: "RC-2024-001",
  },
  {
    id: "PAY-002",
    vaccineName: "Vaccine cúm mùa",
    amount: 180000,
    date: "2024-12-22",
    status: "pending",
    method: "qr",
    location: "Trung tâm Y tế Quận 1",
    receiptId: "RC-2024-002",
  },
]

export function PaymentSection() {
  const [payments, setPayments] = useState(mockPayments)
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Đã thanh toán</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ thanh toán</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Thất bại</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "bank":
        return <Wallet className="h-4 w-4" />
      case "qr":
        return <QrCode className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thanh toán</h1>
        <p className="text-muted-foreground">Quản lý thanh toán và hóa đơn tiêm chủng</p>
      </div>

      {/* Payment Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã thanh toán</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-muted-foreground">Tổng số tiền đã trả</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ thanh toán</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-muted-foreground">Cần thanh toán</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng giao dịch</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">Số lần thanh toán</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments */}
      {payments.some((p) => p.status === "pending") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Thanh toán chờ xử lý
            </CardTitle>
            <CardDescription>Các khoản thanh toán cần được hoàn thành</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments
                .filter((p) => p.status === "pending")
                .map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50"
                  >
                    <div>
                      <p className="font-medium">{payment.vaccineName}</p>
                      <p className="text-sm text-muted-foreground">{payment.location}</p>
                      <p className="text-sm text-muted-foreground">Ngày hẹn: {payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                      <Button size="sm" className="mt-2">
                        Thanh toán ngay
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
          <CardDescription>Chọn phương thức thanh toán phù hợp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-blue-200">
              <CardContent className="p-4 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Thẻ tín dụng/ghi nợ</h3>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Wallet className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Chuyển khoản ngân hàng</h3>
                <p className="text-sm text-muted-foreground">Internet Banking</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <QrCode className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">Ví điện tử</h3>
                <p className="text-sm text-muted-foreground">MoMo, ZaloPay, VNPay</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Lịch sử thanh toán
          </CardTitle>
          <CardDescription>Tất cả các giao dịch thanh toán</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    {getMethodIcon(payment.method)}
                  </div>
                  <div>
                    <p className="font-medium">{payment.vaccineName}</p>
                    <p className="text-sm text-muted-foreground">{payment.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.date} • Mã: {payment.receiptId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(payment.amount)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(payment.status)}
                    <Button size="sm" variant="outline">
                      <Receipt className="h-4 w-4 mr-2" />
                      Hóa đơn
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thanh toán mới</CardTitle>
          <CardDescription>Thực hiện thanh toán cho dịch vụ tiêm chủng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vaccine">Loại vaccine</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại vaccine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="covid">COVID-19</SelectItem>
                  <SelectItem value="flu">Cúm mùa</SelectItem>
                  <SelectItem value="hepatitis">Viêm gan B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Số tiền</Label>
              <Input id="amount" placeholder="0 VNĐ" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phương thức thanh toán</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Thẻ tín dụng/ghi nợ</SelectItem>
                <SelectItem value="bank">Chuyển khoản ngân hàng</SelectItem>
                <SelectItem value="qr">Ví điện tử</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Số thẻ</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Tên chủ thẻ</Label>
                  <Input id="cardName" placeholder="NGUYEN VAN A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Ngày hết hạn</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Tổng thanh toán</p>
              <p className="text-2xl font-bold">250,000 VNĐ</p>
            </div>
            <Button size="lg">
              <CreditCard className="h-4 w-4 mr-2" />
              Thanh toán
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
