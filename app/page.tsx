"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Check, Headphones, Users, Zap, MonitorPlay } from "lucide-react";
import { StudioGallery } from "@/components/studio-gallery";
import Link from "next/link";
import { motion } from "framer-motion";
import { PACKAGES } from "@/types/booking";

// Social platform icons (simple-icons)
import type { SimpleIcon } from "simple-icons";
import {
  siFacebook,
  siInstagram,
  siTiktok,
  siYoutube,
  siTwitch,
} from "simple-icons/icons";

// shadcn accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SocialIconSvg({
  icon,
  className,
  title,
}: {
  icon: SimpleIcon;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={title ?? icon.title}
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

const STREAM_PLATFORMS: Array<{ name: string; icon: SimpleIcon }> = [
  { name: "Facebook", icon: siFacebook },
  { name: "Instagram", icon: siInstagram },
  { name: "TikTok", icon: siTiktok },
  { name: "YouTube", icon: siYoutube },
  { name: "Twitch", icon: siTwitch },
];

const FAQ_ITEMS = [
  {
    q: "Do you provide live streaming?",
    a: "Yes. We can stream live to up to 8 platforms simultaneously including Facebook, Instagram, TikTok, YouTube, Twitch and more.",
  },
  {
    q: "Do you provide editing?",
    a: "Yes — editing is included in our Production & Editing option or available as an add-on.",
  },
  {
    q: "Can I record audio-only?",
    a: "Yes, but most clients choose video due to the quality of our setup.",
  },
  {
    q: "How many guests can you accommodate?",
    a: "Multiple guests and panel discussions are supported — contact us for specifics.",
  },
  {
    q: "Is help available during the session?",
    a: "Yes. Production support is included in Studio + Production Support and Production & Editing packages.",
  },
];

const STUDIO_KIT = [
  "4 × Blackmagic 6K cinema cameras",
  "ATEM Mini Extreme ISO (live switching + ISO recording)",
  "Broadcast-grade microphones & professional audio routing",
  "Studio-grade cinematic lighting",
  "Multi-guest & panel configurations",
  "Multi-platform live streaming capability",
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HOME / Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-10" />

          <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-20 lg:py-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-5xl mx-auto text-center"
            >
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight text-balance">
                Broadcast-Quality Podcast & Interview Production Studio in Greater
                Manchester
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground mb-7 max-w-3xl mx-auto leading-relaxed text-pretty">
                Cinematic, multi-camera podcast production using Blackmagic 6K
                cameras — built for creators, brands, and shows that want content
                that looks like TV, not a basic podcast.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/book">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-base w-full sm:w-auto"
                  >
                    Book the Studio
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base w-full sm:w-auto bg-transparent"
                  asChild
                >
                  <Link href="#packages">View Packages</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Video (player controls, same dimensions) */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-10 sm:mt-12"
            >
              <Card className="overflow-hidden p-0">
                <div className="relative aspect-video w-full">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/hero2.mp4"
                    controls
                    poster="/thumbnail1.jpg"
                    playsInline
                    preload="metadata"
                    controlsList="nodownload noplaybackrate"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-black/0 to-black/10" />
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-5xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-5">
                This Isn&apos;t a Podcast Room. It&apos;s a Show.
              </h2>

              <h3 className="text-xl text-muted-foreground mb-4 font-semibold">
                Most podcast studios give you a mic, a camera, and a quiet room.
              </h3>

              <div className="text-lg text-muted-foreground leading-relaxed mb-10 space-y-4 max-w-4xl mx-auto">
                <p>
                  Redbridge Podcast Studios gives you a broadcast-grade production
                  environment designed for high-impact, long-form podcasts,
                  interviews, documentaries, and branded content.
                </p>
                <p>
                  We specialise in high-impact, long-form podcasts, interviews,
                  documentaries, and branded content — using the same multi-camera
                  workflows found in television and high-end digital productions.
                </p>
                <p>
                  If you want content that holds attention, looks cinematic, and
                  feels premium, you’re in the right place.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
                  description:
                    "RØDECaster Pro II with premium microphones for crystal-clear, broadcast-ready sound",
                },
                {
                  icon: Users,
                  title: "Expert Production Team",
                  description:
                    "Dedicated technician and producer to handle everything while you focus on your content",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="hover:border-primary transition-colors h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW: Built for Live Streaming */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-8 sm:mb-10"
              >
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  NEW: Built for Live Streaming
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  In addition to recording, Redbridge Podcast Studios is fully
                  equipped for{" "}
                  <span className="font-semibold">professional live streaming</span>.
                </p>

                {/* DJ Video (exact same player style as hero) */}
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.12 }}
                  className="mt-8"
                >
                  <Card className="overflow-hidden p-0">
                    <div className="relative aspect-video w-full">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/dj.mp4"
                        controls
                        poster="/thumbnail3.jpg"
                        playsInline
                        preload="metadata"
                        controlsList="nodownload noplaybackrate"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-black/0 to-black/10" />
                    </div>
                  </Card>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                <Card className="h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MonitorPlay className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">
                        Stream into up to 8 platforms simultaneously
                      </h3>
                    </div>

                    <p className="text-muted-foreground mb-5 leading-relaxed">
                      We can stream live into{" "}
                      <span className="font-semibold">up to 8 platforms simultaneously</span>, including:
                    </p>

                    <ul className="space-y-2 text-sm sm:text-base">
                      {STREAM_PLATFORMS.map((p) => (
                        <li key={p.name} className="flex items-center gap-3">
                          <span className="h-8 w-8 rounded-md border bg-background flex items-center justify-center">
                            <SocialIconSvg
                              icon={p.icon}
                              title={p.name}
                              className="h-4 w-4 text-primary"
                            />
                          </span>
                          <span>{p.name}</span>
                        </li>
                      ))}
                      <li className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-md border bg-background flex items-center justify-center text-muted-foreground">
                          +
                        </span>
                        <span>And additional platforms on request</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">This is ideal for:</h3>
                    </div>

                    <ul className="space-y-2 text-sm sm:text-base mb-5">
                      {[
                        "Live podcasts",
                        "IRL & talk-based streamers",
                        "Live audience Q&As",
                        "Panel discussions",
                        "Brand launches and announcements",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                      Your content can be experienced <span className="font-semibold">live</span> and then repurposed
                      into high-quality on-demand episodes and clips.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO */}
        <section
          id="studio"
          className="py-16 sm:py-20 lg:py-24 bg-muted/30 overflow-hidden"
        >
          <div className="container mx-auto px-4 lg:px-8 max-w-full">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-10"
              >
                <p className="text-xs tracking-wide uppercase text-muted-foreground mb-2">
                  STUDIO
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  A Cinematic Production Space Built for Conversation
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  Redbridge Podcast Studios is designed specifically for depth,
                  emotion, and storytelling.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-3">
                  Our space is acoustically treated, visually controlled, and
                  technically engineered to support long-form conversations and
                  live broadcasts without fatigue — for both guests and viewers.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full min-w-0"
                >
                  <StudioGallery title="" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-5 sm:p-6">
                      <h3 className="text-xl font-bold mb-5">Studio Features</h3>

                      <div className="space-y-4">
                        {STUDIO_KIT.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-muted-foreground leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-5 border-t">
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Comfortable guest setup</p>
                            <p className="text-sm text-muted-foreground">
                              Professional yet relaxed environment for great
                              conversations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-full">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold mb-3">
                      Multi-Camera, Broadcast Workflow
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      Unlike standard podcast studios, we use a true multi-camera
                      broadcast workflow:
                    </p>
                    <ul className="space-y-2 text-sm sm:text-base">
                      {[
                        "Live multi-camera switching",
                        "Individual ISO recordings from every camera",
                        "Clean, broadcast-ready audio tracks",
                        "Multi-platform live streaming",
                        "Flexibility to deliver live cuts or fully edited episodes",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-5">
                      This means more energy, better pacing, and content that
                      feels alive.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold mb-3">
                      Designed for Long-Form Content
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      Our studio is optimised for:
                    </p>
                    <ul className="space-y-2 text-sm sm:text-base">
                      {[
                        "60–150 minute episodes",
                        "Deep, emotional interviews",
                        "Live-streamed podcasts",
                        "Panel discussions",
                        "Documentary-style conversations",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-5">
                      No rushing. No pressure. Just quality.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-8 sm:mb-10"
              >
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Who We Work With
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {[
                  "Podcasters ready to level up",
                  "YouTubers & long-form interviewers",
                  "Live streamers & digital creators",
                  "Brands & marketing agencies",
                  "Coaches & thought leaders",
                  "Documentary & testimony creators",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <p className="font-medium">{item}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-muted-foreground leading-relaxed mt-8 max-w-3xl mx-auto">
                If you’re tired of your content looking like everyone else’s —
                Redbridge was built for you.
              </p>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section id="packages" className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center mb-6"
            >
              <p className="text-xs tracking-wide uppercase text-muted-foreground mb-2">
                PACKAGES
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                Simple, Accessible Pricing
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our pricing is intentionally positioned to help creators, brands,
                and agencies get their foot in the door, build long-term
                relationships, and grow with us.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-2">
                While our studio operates at a broadcast-production level, we’ve
                kept our packages accessible to support repeat bookings, ongoing
                shows, and long-form projects.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full mb-8">
              {PACKAGES.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card
                    className={`relative ${
                      pkg.badge ? "border-primary border-2 shadow-lg" : "border-2"
                    } h-full`}
                  >
                    {pkg.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                          {pkg.badge}
                        </span>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {pkg.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold">£{pkg.price}</span>
                        <span className="text-muted-foreground ml-2">
                          / {pkg.duration}
                        </span>
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
                          className={`w-full ${
                            pkg.badge
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                              : ""
                          }`}
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

            <div className="max-w-5xl mx-auto">
              <Card className="border-2 bg-muted/20">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold mb-3">Why Our Pricing Works</h3>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Redbridge Podcast Studios is based in Bolton, on a
                      professional industrial estate — allowing us to offer:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "High-end production quality",
                        "Competitive pricing",
                        "Easy access and parking",
                        "A calm, private recording and streaming environment",
                      ].map((it) => (
                        <li key={it} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <p>Our goal isn’t one-off bookings.</p>
                    <p>It’s long-term partnerships and repeat clients.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CONTACT / BOOKING */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Card className="overflow-hidden relative border-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7D6BF5] via-[#E04C84] to-[#7D6BF5] p-[2px] rounded-lg">
                  <div className="h-full w-full bg-background rounded-lg" />
                </div>

                <CardContent className="relative p-7 sm:p-10">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Book Your Session
                  </h2>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Whether you’re launching a new podcast, planning a live
                    stream, upgrading an existing show, or producing branded
                    content — we’ll help you choose the right setup.
                  </p>

                  <Link href="/book">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-base"
                    >
                      Book Your Studio Session
                    </Button>
                  </Link>

                  <div className="mt-6 text-muted-foreground leading-relaxed">
                    <p>Bolton / Greater Manchester</p>
                    <p>Broadcast-quality podcast, interview &amp; live streaming production</p>
                    <p className="mt-3">
                      Email:{" "}
                      <a
                        className="underline underline-offset-4 hover:text-primary"
                        href="mailto:hello@redbridgepodcaststudios.com"
                      >
                        hello@redbridgepodcaststudios.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ (Accordion) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">FAQ</h2>
                <p className="text-muted-foreground">
                  Quick answers to the most common questions.
                </p>
              </motion.div>

              <Card >
                <CardContent className="p-4 sm:p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {FAQ_ITEMS.map((item, idx) => (
                      <AccordionItem key={item.q} value={`faq-${idx}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <div className="text-center mt-10 text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground">Final Note</p>
                <p className="mt-3">
                  If you’re looking for the cheapest option, we’re probably not
                  the right studio.
                </p>
                <p className="mt-2">
                  If you’re looking for content that looks cinematic,
                  professional, and unforgettable — welcome to Redbridge Podcast
                  Studios.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
