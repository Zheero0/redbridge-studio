"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Mic2,
  MonitorPlay,
  Sparkles,
  Users,
  Video,
  Zap,
} from "lucide-react";

type Feature = {

  title: string;
  description: string;
  bullets: string[];
};

type Spotlight = {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: {
    src: string;
    alt: string;
  };
};

const lightingLooks = [
  {
    src: "/stuWarm.JPG",
    alt: "Warm, cinematic look",
    title: "Warm & cinematic",
    copy: "Perfect for intimate conversations and story-led podcasts.",
  },
  {
    src: "/stuHero.JPG",
    alt: "Clean, neutral look",
    title: "Clean & neutral",
    copy: "Bright, flattering lighting for a modern studio feel.",
  },
  {
    src: "/stu5.JPG",
    alt: "Brand colour accent look",
    title: "Brand colour accents",
    copy: "Match your brand colours for a consistent look across episodes.",
  },
];

function CustomiseLightingSection() {
  const [idx, setIdx] = useState(0);
  const current = lightingLooks[idx];

  const goPrev = () =>
    setIdx((p) => (p - 1 + lightingLooks.length) % lightingLooks.length);
  const goNext = () => setIdx((p) => (p + 1) % lightingLooks.length);

  return (
    <section className="py-14 sm:py-18 lg:py-22 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Carousel */}
          <div className="w-full min-w-0">
            <Card className="relative border-0 shadow-lg overflow-hidden p-0">
              <div className="relative aspect-video w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      priority={false}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Readability overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />

                    {/* Caption */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold text-base sm:text-lg">
                        {current.title}
                      </p>
                      <p className="text-white/80 text-xs sm:text-sm mt-1">
                        {current.copy}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/75 hover:bg-background/90 backdrop-blur-sm"
                  onClick={goPrev}
                  aria-label="Previous look"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/75 hover:bg-background/90 backdrop-blur-sm"
                  onClick={goNext}
                  aria-label="Next look"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Dots */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {lightingLooks.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={[
                        "h-2 w-2 rounded-full transition",
                        i === idx
                          ? "bg-white"
                          : "bg-white/40 hover:bg-white/70",
                      ].join(" ")}
                      aria-label={`Go to look ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Copy */}
          <div>
            <p className="text-xs tracking-wide uppercase text-muted-foreground">
              CUSTOMISE YOUR LOOK
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
              RGB lighting presets to match your brand
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Choose a clean, neutral studio look or lean into bold RGB accents.
              We can set the mood, match brand colours, and keep the lighting
              consistent across episodes.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-2">
              {[
                "Pick warm / cool / neutral looks",
                "Add colour accents behind the set",
                "Consistent lighting between sessions",
                "Flattering exposure for all guests",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Session <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#packages">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                >
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StudioPage() {
  const highlights = [
    { icon: Mic2, label: "Broadcast-grade audio" },
    { icon: Video, label: "Multi-cam 6K capture" },
    { icon: Zap, label: "ATEM ISO switching" },
    { icon: Lightbulb, label: "Custom LED lighting" },
  ];

  const features: Feature[] = [
    {

      title: "Custom Lighting System",
      description:
        "Professional LED lighting tuned for flattering skin tones and consistent studio aesthetics.",
      bullets: [
        "Adjustable colour temperature",
        "Even, shadow-controlled setup",
        "Flicker-free lighting for video",
        "Multiple “look” presets",
      ],
    },
    {

      title: "RØDECaster Pro Audio Chain",
      description:
        "Clean, studio-ready audio with proper monitoring and controlled levels for every speaker.",
      bullets: [
        "Multi-track recording",
        "Live mixing and monitoring",
        "Premium microphone setup",
        "Consistent loudness and clarity",
      ],
    },
    {

      title: "Blackmagic 6K Camera System",
      description:
        "Up to 4 cinema cameras capturing coverage that feels modern and high-end.",
      bullets: [
        "Up to 4 camera angles",
        "Cinematic image quality",
        "Wide + tight shots supported",
        "Consistent colour and exposure",
      ],
    },
    {

      title: "ATEM Mini Extreme ISO",
      description:
        "Live switching plus ISO recordings for flexible edits and fast turnarounds.",
      bullets: [
        "Live switching capability",
        "ISO camera recordings",
        "Clean program output",
        "Reliable, repeatable workflow",
      ],
    },
  ];

  // ✅ Add image URLs here; no placeholders needed anymore
  const spotlights: Spotlight[] = [
    {
      icon: MonitorPlay,
      eyebrow: "VIDEO WORKFLOW",
      title: "Shoot like a show, not a Zoom call",
      description:
        "A multi-cam setup changes how your content feels. Cuts land better, reactions read cleaner, and your edit becomes simpler.",
      bullets: [
        "Multi-angle coverage",
        "Better pacing and retention",
        "Cleaner “studio” look instantly",
        "More usable clips for socials",
      ],
      image: {
        src: "/stuFace.JPG",
        alt: "Multi-camera podcast studio setup",
      },
    },
    // {
    //   icon: Sparkles,
    //   eyebrow: "CONSISTENCY",
    //   title: "A repeatable look across episodes",
    //   description:
    //     "Consistency is what makes a podcast feel established. The studio environment keeps your visuals and audio uniform across sessions.",
    //   bullets: [
    //     "Consistent lighting and framing",
    //     "Controlled sound environment",
    //     "Same camera positions each time",
    //     "Brand-ready presentation",
    //   ],
    //   image: {
    //     src: "/stu5.JPG",
    //     alt: "Consistent studio lighting and framing",
    //   },
    // },
  ];

  const gearSpecs = [
    { label: "Audio desk", value: "RØDECaster Pro" },
    { label: "Microphones", value: "Premium mic setup (multi-speaker ready)" },
    { label: "Cameras", value: "Up to 4 Blackmagic 6K cinema cameras" },
    { label: "Switcher", value: "ATEM Mini Extreme ISO (live switch + ISO)" },
    { label: "Lighting", value: "Custom LED lighting rig" },
    { label: "Capacity", value: "Multi-guest sessions supported" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,theme(colors.foreground)_1px,transparent_0)] [background-size:28px_28px]" />

          <div className="relative container mx-auto px-4 lg:px-8 max-w-7xl py-14 sm:py-18 lg:py-22">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-xs sm:text-sm text-muted-foreground tracking-wide uppercase">
                Studio Features
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
                Everything you need for professional audio and video
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Built for podcasts, interviews, and content that needs to look
                and sound premium. Lighting, audio, and multi-cam capture are
                designed to be consistent and repeatable.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 rounded-full border bg-background/70 backdrop-blur px-3 py-1.5 text-xs sm:text-sm"
                  >
                    <h.icon className="h-4 w-4 text-primary" />
                    <span className="text-foreground/90">{h.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/book">
                  <Button size="lg" className="w-full sm:w-auto">
                    Book a Session <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#packages">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                  >
                    View Packages
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* HERO MEDIA */}
            {/* <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-12 sm:mt-14"
            >
              <Card className="overflow-hidden border-0 shadow-lg p-0">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/stuHero.JPG"
                    alt="Studio showcase"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/10" />
                </div>
              </Card>
            </motion.div> */}
          </div>
        </section>

        {/* CUSTOMISE LIGHTING */}
        <CustomiseLightingSection />

        {/* FEATURES GRID */}
        <section className="py-14 sm:py-18 lg:py-22">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Equipment and capabilities
              </h2>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                Purpose-built gear stack for clean audio, flattering visuals,
                and flexible editing.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              {features.map((f, idx) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 sm:p-7">
                      <div className="flex items-start gap-4">

                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold">
                            {f.title}
                          </h3>
                          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {f.description}
                          </p>

                          <div className="mt-5 grid grid-cols-1 gap-2">
                            {f.bullets.map((b) => (
                              <div
                                key={b}
                                className="flex items-center gap-2 text-sm"
                              >
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">
                                  {b}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SPOTLIGHTS (now uses s.image) */}
        <section className="py-14 sm:py-18 lg:py-22 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl space-y-8 sm:space-y-10">
            {spotlights.map((s, i) => (
              <div
                key={s.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xs tracking-wide uppercase text-muted-foreground">
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-2">
                    {s.bullets.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 16 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full min-w-0"
                >
                  <Card className="overflow-hidden border-0 shadow-lg p-0">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        priority={false}
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/10" />
                    </div>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* GEAR SPECS */}
        <section className="py-14 sm:py-18 lg:py-22">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-10 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Gear stack overview
              </h2>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                The core kit we use to capture clean audio and crisp multi-angle
                video.
              </p>
            </motion.div>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                  {gearSpecs.map((row) => (
                    <div key={row.label} className="flex items-start gap-3">
                      <div className="mt-1 h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{row.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {row.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">Multi-guest ready</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Designed for interviews, panels, and group sessions.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">
                        Multi-angle coverage
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Cuts and reactions read cleanly on camera.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">Flexible edits</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      ISO workflow supports both fast and detailed post.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-18 lg:py-22">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <Card className="overflow-hidden relative border-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7D6BF5] via-[#E04C84] to-[#7D6BF5] p-[2px] rounded-lg">
                  <div className="h-full w-full bg-background rounded-lg" />
                </div>
                <CardContent className="relative p-8 lg:p-12">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Ready to Record in a Pro Setup?
                  </h2>
                  <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Book your session or review packages. Everything here is
                    built to make your content look and sound premium.
                  </p>
                  <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/book">
                      <Button size="lg" className="w-full sm:w-auto">
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/#packages">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto bg-transparent"
                      >
                        View Packages
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
