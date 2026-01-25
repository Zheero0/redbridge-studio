"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { PACKAGES, type BookingData } from "@/types/booking"

interface PackageSelectionProps {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  onNext: () => void
  onBack: () => void
}

export function PackageSelection({ bookingData, setBookingData, onNext }: PackageSelectionProps) {
  const handleSelectPackage = (pkg: (typeof PACKAGES)[0]) => {
    setBookingData({ ...bookingData, package: pkg })
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Select Your Package</h2>
      <p className="text-muted-foreground mb-8">Whether you’re launching a new podcast, planning a live stream, upgrading an existing show, or producing branded content — we’ll help you choose the right setup. </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {PACKAGES.map((pkg) => (
          <Card
            key={pkg.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              bookingData.package?.id === pkg.id ? "border-primary border-2 ring-4 ring-primary/10" : "border-2"
            }`}
            onClick={() => handleSelectPackage(pkg)}
          >
            <CardContent className="p-6">
              {pkg.badge && (
                <div className="mb-4">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold">£{pkg.price}</span>
                <span className="text-muted-foreground ml-2">/ {pkg.duration}</span>
              </div>
              <ul className="space-y-2 mb-4">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {bookingData.package?.id === pkg.id && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <Check className="h-5 w-5" />
                    <span>Selected</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={onNext}
          disabled={!bookingData.package}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Continue to Date Selection
        </Button>
      </div>
    </div>
  )
}
