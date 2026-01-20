"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import type { BookingData } from "@/types/booking"
import { Check } from "lucide-react"

interface DateSelectionProps {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  onNext: () => void
  onBack: () => void
}

const TIME_SLOTS = [
  { id: "morning" as const, label: "Morning", time: "9:00 AM - 12:00 PM" },
  { id: "afternoon" as const, label: "Afternoon", time: "12:00 PM - 5:00 PM" },
  { id: "evening" as const, label: "Evening", time: "5:00 PM - 9:00 PM" },
]

export function DateSelection({ bookingData, setBookingData, onNext, onBack }: DateSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(bookingData.date ? new Date(bookingData.date) : undefined)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setBookingData({ ...bookingData, date: selectedDate.toISOString() })
    }
  }

  const handleTimeSlotSelect = (timeSlot: "morning" | "afternoon" | "evening") => {
    setBookingData({ ...bookingData, timeSlot })
  }

  const disabledDays = { before: new Date() }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Date & Preferred Time</h2>

      <Card className="mb-8">
        <CardContent className="p-6 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={disabledDays}
            className="rounded-md"
          />
        </CardContent>
      </Card>

      {date && (
        <Card className="mb-8 border-primary/50">
          <CardContent className="p-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Selected date:</span>
              <span className="font-medium ml-2">
                {date.toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {date && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Preferred Time</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select your preferred time slot. Your exact time will be confirmed after booking.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {TIME_SLOTS.map((slot) => (
              <Card
                key={slot.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  bookingData.timeSlot === slot.id ? "border-primary border-2 ring-4 ring-primary/10" : "border-2"
                }`}
                onClick={() => handleTimeSlotSelect(slot.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{slot.label}</h4>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </div>
                    {bookingData.timeSlot === slot.id && <Check className="h-5 w-5 text-primary shrink-0" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button size="lg" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          onClick={onNext}
          disabled={!date || !bookingData.timeSlot}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Continue to Confirmation
        </Button>
      </div>
    </div>
  )
}
