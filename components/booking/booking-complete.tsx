"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, Package, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { BookingData } from "@/types/booking"

interface BookingCompleteProps {
  bookingData: BookingData
}

export function BookingComplete({ bookingData }: BookingCompleteProps) {
  const getTimeSlotDisplay = (slot: string | null) => {
    if (!slot) return ""
    const slots: Record<string, string> = {
      morning: "9:00 AM - 12:00 PM",
      afternoon: "12:00 PM - 5:00 PM",
      evening: "5:00 PM - 9:00 PM",
    }
    return slots[slot] || ""
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="border-2 border-primary/20">
        <CardContent className="p-8 lg:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </motion.div>

          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Thank you for booking with Redbridge Studios. We will be in touch shortly to confirm your session time.
          </p>

          {/* Booking Details */}
          <Card className="text-left mb-8 border-2">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4 text-lg">Booking Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{bookingData.package?.name} Package</div>
                    <div className="text-sm text-muted-foreground">{bookingData.package?.duration}</div>
                  </div>
                  <div className="font-bold">£{bookingData.package?.price}</div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm text-muted-foreground">
                      {bookingData.date
                        ? new Date(bookingData.date).toLocaleDateString("en-GB", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium capitalize">{bookingData.timeSlot} Session</div>
                    <div className="text-sm text-muted-foreground">{getTimeSlotDisplay(bookingData.timeSlot)}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Contact</div>
                    <div className="text-sm text-muted-foreground">{bookingData.name}</div>
                    <div className="text-sm text-muted-foreground">{bookingData.email}</div>
                    <div className="text-sm text-muted-foreground">{bookingData.phone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="text-left mb-8 bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>We will contact you to confirm your exact session time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Arrive 10 minutes early for setup and orientation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Bring any personal equipment or notes you'd like to use</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="flex-1 sm:flex-none">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Back to Home
              </Button>
            </Link>
            <Link href="/book" className="flex-1 sm:flex-none">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                Book Another Session
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
