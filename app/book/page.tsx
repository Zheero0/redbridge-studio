"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageSelection } from "@/components/booking/package-selection"
import { DateSelection } from "@/components/booking/date-selection"
import { CustomerInfoStep } from "@/components/booking/customer-info-step"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { BookingComplete } from "@/components/booking/booking-complete"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import type { BookingData } from "@/types/booking"

const STEPS = ["Package", "Date & Time", "Your Info", "Confirm & Pay"]

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingData, setBookingData] = useState<BookingData>({
    package: null,
    date: null,
    timeSlot: null,
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setBookingComplete(true)
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <BookingComplete bookingData={bookingData} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">Book Your Studio Session</h1>
            <p className="text-muted-foreground text-center leading-relaxed">
              Complete the steps below to reserve your recording time
            </p>
          </motion.div>

          {/* Progress Steps */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {STEPS.map((step, index) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          index < currentStep
                            ? "bg-primary text-primary-foreground"
                            : index === currentStep
                              ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium hidden sm:block ${
                          index <= currentStep ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-2 rounded transition-all ${
                          index < currentStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <PackageSelection
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 1 && (
                <DateSelection
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 2 && (
                <CustomerInfoStep
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <BookingConfirmation
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onNext={handleComplete}
                  onBack={handleBack}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
