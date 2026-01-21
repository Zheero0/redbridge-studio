export interface BookingData {
  package: Package | null
  date: string | null
  timeSlot: "morning" | "afternoon" | "evening" | null
  name: string
  email: string
  phone: string
  notes: string
}

export interface Package {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  description: string
  badge?: string
}

export const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "STARTER",
    description: "Audio & Single-Angle Video",
    price: 250,
    duration: "2 hours",
    badge: undefined,
    features: [
      "Premium podcast studio hire",
      "High-end microphones & RØDECaster Pro",
      "2 x Blackmagic 6K camera (static angle)",
      "Professional audio capture & sync",
      "Clean programme video file",
      "Raw audio file",
    ],
  },
  {
    id: "pro",
    name: "PRO",
    description: "Multi-Camera Podcast",
    price: 450,
    duration: "up to 3 hours",
    badge: "POPULAR",
    features: [
      "Fully rigged premium studio",
      "Up to 4 x Blackmagic 6K cameras",
      "ATEM Mini Extreme ISO live switching",
      "Broadcast-quality audio via RØDECaster",
      "Multi-angle programme edit (live cut)",
      "ISO camera recordings",
      "Separate audio stems",
      "Studio technician on site",
    ],
  },
  {
    id: "broadcast",
    name: "BROADCAST",
    description: "Full Production Experience",
    price: 750,
    duration: "half day (up to 5 hours)",
    badge: undefined,
    features: [
      "Full premium studio access",
      "4 x Blackmagic 6K cinema cameras",
      "ATEM Mini Extreme ISO (live switching + ISO)",
      "Advanced lighting setup",
      "Dedicated producer / engineer",
      "Multiple takes & retakes",
      "Programme feed + all ISO files",
      "Separate audio tracks",
      "Pre-session setup & post-session packdown",
    ],
  },
  {
    id: "ultimate",
    name: "ULTIMATE",
    description: "TV-Level Full Day Production",
    price: 1000,
    duration: "full day (up to 8 hours)",
    badge: "BEST VALUE",
    features: [
      "FULL DAY studio access (up to 8 hours)",
      "Shoot 3-4 shows in one day",
      "4 x Blackmagic 6K cinema cameras",
      "ATEM Mini Extreme ISO (live switching + ISO)",
      "Advanced lighting setup",
      "Dedicated producer / engineer",
      "Multiple takes & retakes",
      "Programme feed + all ISO files",
      "Separate audio tracks",
      "Pre-session setup & post-session packdown",
      "Optional: Short-form clips (Reels/TikTok/Shorts)",
    ],
  },
]

export interface FirestoreBooking extends BookingData {
  id?: string
  createdAt: Date
  status: "pending" | "confirmed" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed"
  paymentIntentId?: string
}
