"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, Mic, Paperclip, MoreVertical } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type: "text" | "quick_reply" | "suggestion"
  quickReplies?: string[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Xin chào! Tôi là trợ lý AI của VaxManager. Tôi có thể giúp bạn:",
    sender: "bot",
    timestamp: new Date(),
    type: "text",
  },
  {
    id: "2",
    content: "Hãy chọn một chủ đề bạn muốn tìm hiểu:",
    sender: "bot",
    timestamp: new Date(),
    type: "quick_reply",
    quickReplies: [
      "Thông tin vaccine",
      "Đặt lịch tiêm",
      "Tác dụng phụ",
      "Chứng chỉ tiêm",
      "Địa điểm tiêm",
      "Câu hỏi khác",
    ],
  },
]

const botResponses = {
  "thông tin vaccine": {
    content:
      "Hiện tại chúng tôi có các loại vaccine sau:\n\n• COVID-19 (Pfizer, Moderna, AstraZeneca)\n• Cúm mùa\n• Viêm gan A, B\n• HPV\n• Sởi - Rubella\n\nBạn muốn tìm hiểu về loại vaccine nào?",
    quickReplies: ["COVID-19", "Cúm mùa", "Viêm gan B", "HPV"],
  },
  "đặt lịch tiêm": {
    content:
      "Để đặt lịch tiêm, bạn có thể:\n\n1. Vào mục 'Đặt lịch tiêm' trên menu\n2. Chọn loại vaccine\n3. Chọn địa điểm và thời gian\n4. Xác nhận thông tin\n\nBạn có muốn tôi hướng dẫn chi tiết không?",
    quickReplies: ["Hướng dẫn chi tiết", "Xem địa điểm tiêm", "Chọn vaccine"],
  },
  "tác dụng phụ": {
    content:
      "Tác dụng phụ thường gặp sau tiêm:\n\n• Đau, sưng tại chỗ tiêm\n• Sốt nhẹ\n• Mệt mỏi\n• Đau đầu\n\nCác triệu chứng thường tự khỏi sau 1-2 ngày. Nếu có triệu chứng nghiêm trọng, hãy liên hệ bác sĩ ngay.",
    quickReplies: ["Cách xử lý", "Khi nào cần gặp bác sĩ", "Thuốc giảm đau"],
  },
  "chứng chỉ tiêm": {
    content:
      "Chứng chỉ tiêm chủng điện tử:\n\n• Được cấp tự động sau khi tiêm\n• Có mã QR để xác thực\n• Tải xuống định dạng PDF\n• Có giá trị pháp lý\n\nBạn có thể xem và tải chứng chỉ trong mục 'Chứng chỉ tiêm'.",
    quickReplies: ["Cách tải chứng chỉ", "Xác thực QR", "In chứng chỉ"],
  },
  "địa điểm tiêm": {
    content:
      "Các địa điểm tiêm gần bạn:\n\n• Bệnh viện Đa khoa Thành phố\n• Trung tâm Y tế Quận 1\n• Phòng khám Đa khoa ABC\n\nBạn có thể tìm kiếm theo khu vực hoặc loại vaccine trong mục 'Tìm địa điểm tiêm'.",
    quickReplies: ["Xem bản đồ", "Giờ mở cửa", "Đặt lịch ngay"],
  },
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(content.toLowerCase())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        sender: "bot",
        timestamp: new Date(),
        type: botResponse.quickReplies ? "quick_reply" : "text",
        quickReplies: botResponse.quickReplies,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (input: string) => {
    // Simple keyword matching
    for (const [key, response] of Object.entries(botResponses)) {
      if (input.includes(key)) {
        return response
      }
    }

    // Default response
    return {
      content: "Tôi hiểu bạn đang cần hỗ trợ. Dưới đây là một số chủ đề tôi có thể giúp bạn:",
      quickReplies: ["Thông tin vaccine", "Đặt lịch tiêm", "Tác dụng phụ", "Chứng chỉ tiêm", "Địa điểm tiêm"],
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trợ lý AI</h1>
        <p className="text-muted-foreground">Hỏi đáp về tiêm chủng và sức khỏe</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
            VaxBot
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Trực tuyến
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        message.sender === "user" ? "bg-blue-600" : "bg-gray-100"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-2">
                          {message.quickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs bg-transparent"
                              onClick={() => handleQuickReply(reply)}
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Nhập câu hỏi của bạn..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                  className="pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Câu hỏi thường gặp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Vaccine COVID-19 có an toàn không?",
              "Sau tiêm bao lâu có hiệu lực?",
              "Có thể tiêm nhiều loại vaccine cùng lúc?",
              "Làm thế nào để đặt lịch tiêm?",
              "Chứng chỉ tiêm có giá trị bao lâu?",
              "Tác dụng phụ kéo dài bao lâu?",
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3 text-left bg-transparent"
                onClick={() => handleSendMessage(question)}
              >
                <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Tính năng của VaxBot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Tư vấn 24/7</h3>
              <p className="text-sm text-muted-foreground">Hỗ trợ tư vấn về vaccine và tiêm chủng mọi lúc</p>
            </div>
            <div className="text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-3">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">AI thông minh</h3>
              <p className="text-sm text-muted-foreground">Sử dụng AI để cung cấp thông tin chính xác</p>
            </div>
            <div className="text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto mb-3">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">Cá nhân hóa</h3>
              <p className="text-sm text-muted-foreground">Tư vấn dựa trên hồ sơ sức khỏe cá nhân</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
