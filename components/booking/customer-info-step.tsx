"use client"

import type React from "react"
import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, MessageSquare, AlertCircle } from "lucide-react"
import type { BookingData } from "@/types/booking"

interface CustomerInfoStepProps {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  onNext: () => void
  onBack: () => void
}

interface ValidationErrors {
  name?: string
  email?: string
  phone?: string
}

// Sanitize input by removing potentially harmful characters
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>'"&]/g, "") // Remove special characters
    .trim()
}

// Validate name: must be at least 2 characters, letters and spaces only
const validateName = (name: string): string | undefined => {
  const sanitized = sanitizeInput(name)
  if (!sanitized) return "Name is required"
  if (sanitized.length < 2) return "Name must be at least 2 characters"
  if (sanitized.length > 100) return "Name must be less than 100 characters"
  if (!/^[a-zA-Z\s\-']+$/.test(sanitized)) return "Name can only contain letters, spaces, hyphens and apostrophes"
  return undefined
}

// Validate email: must be a valid email format
const validateEmail = (email: string): string | undefined => {
  const sanitized = sanitizeInput(email).toLowerCase()
  if (!sanitized) return "Email is required"
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(sanitized)) return "Please enter a valid email address"
  if (sanitized.length > 254) return "Email must be less than 254 characters"
  return undefined
}

// Validate UK phone number
const validatePhone = (phone: string): string | undefined => {
  const sanitized = phone.replace(/[\s\-\(\)]/g, "") // Remove spaces, dashes, parentheses
  if (!sanitized) return "Phone number is required"
  // UK phone regex: accepts formats like 07XXX, +447XXX, 447XXX, or international
  const phoneRegex = /^(\+?44|0)?7\d{9}$|^(\+?44|0)?\d{10,11}$/
  if (!phoneRegex.test(sanitized)) return "Please enter a valid UK phone number"
  return undefined
}

export function CustomerInfoStep({ bookingData, setBookingData, onNext, onBack }: CustomerInfoStepProps) {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (field: keyof ValidationErrors, value: string): string | undefined => {
    switch (field) {
      case "name":
        return validateName(value)
      case "email":
        return validateEmail(value)
      case "phone":
        return validatePhone(value)
      default:
        return undefined
    }
  }

  const handleBlur = (field: keyof ValidationErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const value = bookingData[field] || ""
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleChange = (field: keyof BookingData, value: string) => {
    // Sanitize on change for name field
    const sanitizedValue = field === "name" ? sanitizeInput(value) : value
    setBookingData({ ...bookingData, [field]: sanitizedValue })
    
    // Clear error when user starts typing if field was touched
    if (touched[field]) {
      const error = validateField(field as keyof ValidationErrors, sanitizedValue)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const validateAll = (): boolean => {
    const nameError = validateName(bookingData.name || "")
    const emailError = validateEmail(bookingData.email || "")
    const phoneError = validatePhone(bookingData.phone || "")

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    })

    setTouched({ name: true, email: true, phone: true })

    return !nameError && !emailError && !phoneError
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateAll()) {
      // Sanitize all fields before proceeding
      setBookingData({
        ...bookingData,
        name: sanitizeInput(bookingData.name || ""),
        email: sanitizeInput(bookingData.email || "").toLowerCase(),
        phone: (bookingData.phone || "").replace(/[\s\-\(\)]/g, ""),
        notes: sanitizeInput(bookingData.notes || ""),
      })
      onNext()
    }
  }

  const isFormValid = !validateName(bookingData.name || "") && 
                      !validateEmail(bookingData.email || "") && 
                      !validatePhone(bookingData.phone || "")

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Your Information</h2>

      <Card className="mb-6">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={bookingData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`h-12 ${touched.name && errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {touched.name && errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={bookingData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`h-12 ${touched.email && errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {touched.email && errors.email ? (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">We'll use this to contact you about your booking</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+44 7XXX XXXXXX"
              value={bookingData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              className={`h-12 ${touched.phone && errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {touched.phone && errors.phone ? (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.phone}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">In case we need to contact you about your booking</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or information we should know about..."
              value={bookingData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button type="button" size="lg" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={!isFormValid}
        >
          Continue to Payment
        </Button>
      </div>
    </form>
  )
}
