"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Package, CreditCard, AlertCircle, User, Mail, Phone } from "lucide-react"
import type { BookingData } from "@/types/booking"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Alert, AlertDescription } from "@/components/ui/alert"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface BookingConfirmationProps {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  onNext: () => void
  onBack: () => void
}

function CheckoutForm({
  bookingData,
  onComplete,
  onBack,
}: { bookingData: BookingData; onComplete: () => void; onBack: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      })

      if (error) {
        setErrorMessage(error.message || "An error occurred during payment")
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
          const response = await fetch("/api/create-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...bookingData,
              paymentIntentId: paymentIntent.id,
              paymentStatus: "completed",
            }),
          })

          const data = await response.json()

          if (data.success) {
            onComplete()
          } else {
            throw new Error("Failed to save booking")
          }
        } catch (bookingError) {
          console.error("[v0] Error saving booking:", bookingError)
          setErrorMessage("Payment successful but failed to save booking. Please contact support.")
          setIsProcessing(false)
        }
      } else {
        setErrorMessage("Payment was not successful. Please try again.")
        setIsProcessing(false)
      }
    } catch (err) {
      console.error("[v0] Payment error:", err)
      setErrorMessage("An unexpected error occurred. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement />
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between gap-4">
        <Button type="button" size="lg" variant="outline" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={!stripe || isProcessing}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isProcessing ? "Processing..." : `Pay £${bookingData.package ? bookingData.package.price / 2 : 0} Deposit`}
        </Button>
      </div>
    </form>
  )
}

function PaymentWrapper({
  bookingData,
  onComplete,
  onBack,
}: { bookingData: BookingData; onComplete: () => void; onBack: () => void }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: bookingData.package?.price || 0,
            bookingDetails: {
              package: bookingData.package?.name,
              date: bookingData.date,
              timeSlot: bookingData.timeSlot,
              customerName: bookingData.name,
              customerEmail: bookingData.email,
            },
          }),
        })

        const data = await response.json()

        if (data.error) {
          setError(data.error)
        } else {
          setClientSecret(data.clientSecret)
        }
      } catch (err) {
        console.error("[v0] Error creating payment intent:", err)
        setError("Failed to initialize payment. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [bookingData])

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
        <p className="text-muted-foreground">Preparing payment...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button size="lg" variant="outline" onClick={onBack} className="w-full bg-transparent">
          Go Back
        </Button>
      </div>
    )
  }

  if (!clientSecret) {
    return null
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#E04C84",
            colorBackground: "#ffffff",
            colorText: "#000000",
            colorDanger: "#df1b41",
            borderRadius: "8px",
          },
        },
      }}
    >
      <CheckoutForm bookingData={bookingData} onComplete={onComplete} onBack={onBack} />
    </Elements>
  )
}

export function BookingConfirmation({ bookingData, setBookingData, onNext, onBack }: BookingConfirmationProps) {
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Confirm & Pay</h2>

      {/* Booking Summary */}
      <Card className="mb-6 border-2">
        <CardContent className="p-6">
          <h3 className="font-bold mb-4 text-lg">Booking Summary</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">{bookingData.package?.name} Package</div>
                <div className="text-sm text-muted-foreground">{bookingData.package?.duration}</div>
              </div>
              <div className="ml-auto font-bold text-lg">£{bookingData.package?.price}</div>
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
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span>{bookingData.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>{bookingData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>{bookingData.phone}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t space-y-3">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
              <span>
                <strong>50% Deposit Required:</strong> You'll pay £{bookingData.package ? bookingData.package.price / 2 : 0} today to secure your booking. The remaining £{bookingData.package ? bookingData.package.price / 2 : 0} is due after your session.
              </span>
            </p>
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                <strong>Non-refundable:</strong> All deposits are non-refundable. Please ensure your selected date and time works for your schedule.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg">Payment Details</h3>
          </div>

          <div className="space-y-3 mb-6 pb-6 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Full Package Price</span>
              <span className="text-lg font-medium">£{bookingData.package?.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Deposit Due Today (50%)</span>
              <span className="text-3xl font-bold text-primary">£{bookingData.package ? bookingData.package.price / 2 : 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Remaining Balance</span>
              <span className="text-muted-foreground">£{bookingData.package ? bookingData.package.price / 2 : 0} (due after session)</span>
            </div>
          </div>

          {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
            <PaymentWrapper bookingData={bookingData} onComplete={onNext} onBack={onBack} />
          ) : (
            <div>
              <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg p-12 text-center mb-6">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Stripe Payment Element</p>
                <p className="text-sm text-muted-foreground">
                  Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable payment processing
                </p>
              </div>
              <div className="flex justify-between">
                <Button size="lg" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button size="lg" onClick={onNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Pay £{bookingData.package ? bookingData.package.price / 2 : 0} Deposit (Demo)
                </Button>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center mt-6">
            Your payment information is secure and encrypted. We use Stripe for payment processing.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
