"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Check, Headphones, Users, ImageIcon } from "lucide-react"
import { StudioGallery } from "@/components/studio-gallery"
import Link from "next/link"
import { motion } from "framer-motion"
import { PACKAGES } from "@/types/booking"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-10" />
          <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-balance">
                Broadcast-Quality Podcast Studio in Redbridge
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
                Record like the pros with our fully-equipped studio. Multi-camera setups, pristine audio, and expert
                production support to make your podcast stand out from the crowd.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-base w-full sm:w-auto"
                  >
                    Book Your Session
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-base w-full sm:w-auto bg-transparent" asChild>
                  <Link href="#packages">View Packages</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Image Carousel */}
{/* Hero Image */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mt-12 sm:mt-16 w-full px-4"
>
  <Card className="overflow-hidden p-0">
    <div className="relative aspect-video w-full">
      <img
        src="/stu.JPG"
        alt="Professional podcast studio setup"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </Card>
</motion.div>

          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Your Content Deserves Professional Production</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                From intimate audio-only recordings to full cinematic multi-camera productions, we provide the
                broadcast-grade equipment and technical expertise to make your podcast look and sound incredible.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Video,
                  title: "Cinematic Video",
                  description:
                    "Up to 4 Blackmagic 6K cameras with live switching, ISO recording, and color-graded output",
                },
                {
                  icon: Headphones,
                  title: "Studio-Grade Audio",
                  description: "RØDECaster Pro II with premium microphones for crystal-clear, broadcast-ready sound",
                },
                {
                  icon: Users,
                  title: "Expert Production Team",
                  description: "Dedicated technician and producer to handle everything while you focus on your content",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:border-primary transition-colors h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Choose Your Production Level</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Flexible packages designed to fit your podcast style and budget
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full px-4 mb-8">
              {PACKAGES.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`relative ${pkg.badge ? "border-primary border-2 shadow-lg" : "border-2"} h-full`}>
                    {pkg.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                          {pkg.badge}
                        </span>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold">£{pkg.price}</span>
                        <span className="text-muted-foreground ml-2">/ {pkg.duration}</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/book" className="block">
                        <Button
                          className={`w-full ${pkg.badge ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}`}
                          variant={pkg.badge ? "default" : "outline"}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <Card className="border-2 border-dashed border-primary/50 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Need Something Different?</h3>
                  <p className="text-muted-foreground mb-4">
                    We offer fully customizable packages tailored to your specific production needs.
                  </p>
                  <Link href="/book">
                    <Button variant="outline" className="bg-transparent">
                      Customize Your Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Studio Section */}
        <section id="studio" className="py-12 sm:py-20 lg:py-24 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 max-w-full">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-12"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Purpose-Built for Podcasters</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  A professionally designed recording environment with equipment trusted by industry leaders
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Studio Gallery */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full min-w-0">
                  <StudioGallery title="" />
                </motion.div>

                {/* Studio Features */}
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <Card className="h-full">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-6">Studio Features</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Blackmagic 6K Cameras</p>
                            <p className="text-sm text-muted-foreground">Up to 4 cinema-quality cameras for multi-angle coverage</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">RØDECaster Pro Audio</p>
                            <p className="text-sm text-muted-foreground">Broadcast-grade audio with premium microphones</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">ATEM Mini Extreme ISO</p>
                            <p className="text-sm text-muted-foreground">Live switching with individual ISO recordings</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Professional Lighting</p>
                            <p className="text-sm text-muted-foreground">Advanced LED lighting for perfect on-camera look</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Comfortable Guest Setup</p>
                            <p className="text-sm text-muted-foreground">Professional yet relaxed environment for great conversations</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>


            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <Card className="overflow-hidden relative border-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7D6BF5] via-[#E04C84] to-[#7D6BF5] p-[2px] rounded-lg">
                  <div className="h-full w-full bg-background rounded-lg" />
                </div>
                <CardContent className="relative p-8 lg:p-12">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Elevate Your Digital Presence?</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Book your session today and experience the difference professional production makes
                  </p>
                  <Link href="/book">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base">
                      Book Your Studio Session
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
