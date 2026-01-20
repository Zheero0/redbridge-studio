"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { Calendar, Clock, Package, User, Mail, Phone, MessageSquare, CreditCard, ArrowLeft, MapPin } from "lucide-react"
import type { FirestoreBooking } from "@/types/booking"
import Link from "next/link"
import { motion } from "framer-motion"

export default function BookingDetailPage() {
  const params = useParams()
  const [booking, setBooking] = useState<FirestoreBooking | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingRef = doc(db, "bookings", params.id as string)
        const bookingSnap = await getDoc(bookingRef)

        if (bookingSnap.exists()) {
          setBooking({
            id: bookingSnap.id,
            ...bookingSnap.data(),
            createdAt: bookingSnap.data().createdAt?.toDate() || new Date(),
          } as FirestoreBooking)
        } else {
          console.error("[v0] Booking not found")
        }
      } catch (error) {
        console.error("[v0] Error fetching booking:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchBooking()
    }
  }, [params.id])

  const getTimeSlotDisplay = (slot: string) => {
    const slots: Record<string, string> = {
      morning: "9:00 AM - 12:00 PM",
      afternoon: "12:00 PM - 5:00 PM",
      evening: "5:00 PM - 9:00 PM",
    }
    return slots[slot] || slot
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
            <p className="text-muted-foreground">Loading booking details...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Booking not found</p>
              <Link href="/panel-manager-v1">
                <Button variant="outline" className="bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Bookings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/panel-manager-v1">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Button>
            </Link>

            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">Booking Details</h1>
                  <p className="text-muted-foreground text-sm">Booking ID: {booking.id}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-1">£{booking.package?.price}</div>
                  <div className="text-sm text-muted-foreground">
                    Booked on {booking.createdAt.toLocaleDateString("en-GB")}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Customer Information */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Full Name</div>
                      <div className="font-medium">{booking.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Email Address</div>
                      <a
                        href={`mailto:${booking.email}`}
                        className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Mail className="h-4 w-4" />
                        {booking.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Phone Number</div>
                    <a
                      href={`tel:${booking.phone}`}
                      className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Phone className="h-4 w-4" />
                      {booking.phone}
                    </a>
                  </div>
                  {booking.notes && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Additional Notes
                      </div>
                      <div className="bg-muted p-4 rounded-lg">{booking.notes}</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Package Information */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Package Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Package Name</div>
                    <div className="text-xl font-bold">{booking.package?.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Description</div>
                    <div>{booking.package?.description}</div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Duration</div>
                      <div className="font-medium">{booking.package?.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Price</div>
                      <div className="font-medium">£{booking.package?.price}</div>
                    </div>
                  </div>
                  {booking.package?.features && booking.package.features.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Features Included</div>
                      <ul className="space-y-1">
                        {booking.package.features.map((feature, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Session Details */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Session Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Session Date</div>
                      <div className="font-medium">
                        {booking.date
                          ? new Date(booking.date).toLocaleDateString("en-GB", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Preferred Time Slot</div>
                      <div className="font-medium capitalize">{booking.timeSlot}</div>
                      <div className="text-sm text-muted-foreground">{getTimeSlotDisplay(booking.timeSlot || "")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Deposit Paid (50%)</div>
                      <div className="text-2xl font-bold text-primary">£{booking.package ? booking.package.price / 2 : 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Remaining Balance</div>
                      <div className="text-2xl font-bold">£{booking.package ? booking.package.price / 2 : 0}</div>
                    </div>
                  </div>
                  {booking.paymentIntentId && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Payment Reference</div>
                      <div className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
                        {booking.paymentIntentId}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Studio Location */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Studio Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-medium">Redbridge Studios</div>
                    <div className="text-sm text-muted-foreground">
                      Professional podcast recording studio in Bolton, BL2 5PB
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
