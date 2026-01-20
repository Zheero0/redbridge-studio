import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    const bookingsRef = collection(db, "bookings")
    const docRef = await addDoc(bookingsRef, {
      // Customer information
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      notes: bookingData.notes || "",

      // Booking details
      package: bookingData.package,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,

      // Payment information
      paymentIntentId: bookingData.paymentIntentId || null,
      paymentStatus: bookingData.paymentStatus || "completed",

      // Status and timestamps
      status: "confirmed",
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({
      success: true,
      bookingId: docRef.id,
    })
  } catch (error) {
    console.error("[v0] Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
