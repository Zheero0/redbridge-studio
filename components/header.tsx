"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="text-xl lg:text-2xl font-bold tracking-tight">
            Redbridge Studios
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/#packages" className="text-sm font-medium hover:text-primary transition-colors">
              Packages
            </Link>
            <Link href="/#studio" className="text-sm font-medium hover:text-primary transition-colors">
              Studio
            </Link>
            <Link href="/book">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Book Now</Button>
            </Link>
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px] p-8">
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-6 flex-1 pt-8">
                  <Link
                    href="/#about"
                    className="text-base font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/#packages"
                    className="text-base font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={() => setOpen(false)}
                  >
                    Packages
                  </Link>
                  <Link
                    href="/#studio"
                    className="text-base font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={() => setOpen(false)}
                  >
                    Studio
                  </Link>
                  <div className="mt-auto pt-6">
                    <Link href="/book" onClick={() => setOpen(false)}>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full" size="lg">
                        Book Your Session
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
