"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { db, auth } from "@/lib/firebase"; // <-- make sure auth is exported (see note below)
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

import {
  Calendar,
  Clock,
  Package,
  User,
  Mail,
  Phone,
  ArrowRight,
  Lock,
} from "lucide-react";

import type { FirestoreBooking } from "@/types/booking";

export default function AdminPage() {
  const [bookings, setBookings] = useState<FirestoreBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // auth state
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    // Track auth state first
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // Don’t do anything until we know auth status
    if (!authReady) return;

    // If not logged in, stop loading and show login message (no redirect)
    if (!user) {
      setIsLoading(false);
      setBookings([]);
      return;
    }

    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as FirestoreBooking[];

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [authReady, user]);

  const showLoginGate = authReady && !user;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Bookings</h1>
            <p className="text-muted-foreground">View all studio bookings</p>
          </div>

          {/* Auth gate (no redirects) */}
          {showLoginGate ? (
            <Card className="max-w-xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Login required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You must be logged in to view bookings.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/redlog" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">Go to Login</Button>
                  </Link>
                  <Link href="/" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4" />
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No bookings yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">
                          {booking.package?.name}
                        </CardTitle>
                        <div className="text-xl font-bold text-primary">
                          £{booking.package?.price}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Booked on{" "}
                        {booking.createdAt.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-primary shrink-0" />
                          <span className="font-medium truncate">
                            {booking.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-muted-foreground truncate">
                            {booking.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">
                            {booking.phone}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">
                            {booking.date
                              ? new Date(booking.date).toLocaleDateString(
                                  "en-GB",
                                  { day: "numeric", month: "short", year: "numeric" }
                                )
                              : "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-muted-foreground capitalize">
                            {booking.timeSlot}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/panel-manager-v1/${booking.id}`}
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="w-full group bg-transparent"
                        >
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
