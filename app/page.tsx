"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { DashboardLayout } from "@/components/dashboard-layout"

// Patient components
import { PatientDashboard } from "@/components/patient/patient-dashboard"
import { PatientProfile } from "@/components/patient/patient-profile"
import { LocationFinder } from "@/components/patient/location-finder"
import { VaccinationSchedule } from "@/components/patient/vaccination-schedule"
import { PaymentSection } from "@/components/patient/payment-section"
import { VaccinationHistory } from "@/components/patient/vaccination-history"
import { VaccinationCertificate } from "@/components/patient/vaccination-certificate"
import { Notifications } from "@/components/patient/notifications"
import { Reviews } from "@/components/patient/reviews"
import { Chatbot } from "@/components/patient/chatbot"

// Receptionist components
import { ReceptionistDashboard } from "@/components/receptionist/receptionist-dashboard"
import { AppointmentManagement } from "@/components/receptionist/appointment-management"
import { PaymentConfirmation } from "@/components/receptionist/payment-confirmation"
import { CertificateUpdate } from "@/components/receptionist/certificate-update"
import { VaccineInventory } from "@/components/receptionist/vaccine-inventory"
import { ReceptionistNotifications } from "@/components/receptionist/notifications"

// Admin components
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { UserManagement } from "@/components/admin/user-management"
import { VaccineManagement } from "@/components/admin/vaccine-management"
import { StatisticsReport } from "@/components/admin/statistics-report"

// Doctor components
import { DoctorDashboard } from "@/components/doctor/doctor-dashboard"
import { DoctorSchedule } from "@/components/doctor/doctor-schedule"
import { VaccinationConfirmation } from "@/components/doctor/vaccination-confirmation"

// Verifier components
import { VerifierDashboard } from "@/components/verifier/verifier-dashboard"
import { QRScanner } from "@/components/verifier/qr-scanner"
import { VerificationHistory } from "@/components/verifier/verification-history"

type UserRole = "patient" | "receptionist" | "doctor" | "admin" | "verifier"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [currentSection, setCurrentSection] = useState("dashboard")

  const handleLogin = (userData: User) => {
    setUser(userData)
    setCurrentSection("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentSection("dashboard")
  }

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
  }

  const renderContent = () => {
    if (!user) return null

    // Patient role
    if (user.role === "patient") {
      switch (currentSection) {
        case "dashboard":
          return <PatientDashboard onNavigate={handleNavigate} />
        case "profile":
          return <PatientProfile />
        case "locations":
          return <LocationFinder />
        case "schedule":
          return <VaccinationSchedule />
        case "payment":
          return <PaymentSection />
        case "history":
          return <VaccinationHistory />
        case "certificate":
          return <VaccinationCertificate />
        case "notifications":
          return <Notifications />
        case "reviews":
          return <Reviews />
        case "chatbot":
          return <Chatbot />
        default:
          return <PatientDashboard onNavigate={handleNavigate} />
      }
    }

    // Receptionist role
    if (user.role === "receptionist") {
      switch (currentSection) {
        case "dashboard":
          return <ReceptionistDashboard />
        case "appointments":
          return <AppointmentManagement />
        case "payments":
          return <PaymentConfirmation />
        case "certificates":
          return <CertificateUpdate />
        case "inventory":
          return <VaccineInventory />
        case "notifications":
          return <ReceptionistNotifications />
        default:
          return <ReceptionistDashboard />
      }
    }

    // Admin role
    if (user.role === "admin") {
      switch (currentSection) {
        case "dashboard":
          return <AdminDashboard />
        case "users":
          return <UserManagement />
        case "vaccines":
          return <VaccineManagement />
        case "statistics":
          return <StatisticsReport />
        case "notifications":
          return (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Thông báo Admin</h3>
              <p className="text-muted-foreground">Chức năng đang phát triển</p>
            </div>
          )
        default:
          return <AdminDashboard />
      }
    }

    // Doctor role
    if (user.role === "doctor") {
      switch (currentSection) {
        case "dashboard":
          return <DoctorDashboard />
        case "schedule":
          return <DoctorSchedule />
        case "confirmation":
          return <VaccinationConfirmation />
        case "notifications":
          return (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Thông báo Bác sĩ</h3>
              <p className="text-muted-foreground">Chức năng đang phát triển</p>
            </div>
          )
        default:
          return <DoctorDashboard />
      }
    }

    // Verifier role
    if (user.role === "verifier") {
      switch (currentSection) {
        case "dashboard":
          return <VerifierDashboard />
        case "scanner":
          return <QRScanner />
        case "history":
          return <VerificationHistory />
        case "notifications":
          return (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Thông báo Xác minh</h3>
              <p className="text-muted-foreground">Chức năng đang phát triển</p>
            </div>
          )
        default:
          return <VerifierDashboard />
      }
    }

    // Default fallback
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Chức năng đang phát triển</h2>
          <p className="text-muted-foreground">Chức năng cho vai trò {user.role} đang được phát triển</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <DashboardLayout userRole={user.role} onLogout={handleLogout} onNavigate={handleNavigate}>
      {renderContent()}
    </DashboardLayout>
  )
}
