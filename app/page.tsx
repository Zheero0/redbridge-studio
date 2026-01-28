"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Video,
  Check,
  Headphones,
  Users,
  Zap,
  MonitorPlay,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

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

/* ----------------------------- Helpers ----------------------------- */

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

/* ----------------------------- Lighting ---------------------------- */

const lightingLooks = [
  {
    src: "/stu4.JPG",
    alt: "Color Selection",
    title: "Select from any RGB Colour",
    copy: "Create the perfect vibe with full RGB customisation.",
  },
  { src: "/stuWarm.JPG", alt: "", title: "  ", copy: "   " },
  { src: "/stuHero.JPG", alt: " ", title: "  ", copy: "" },
  { src: "/stu7.JPG", alt: " ", title: "  ", copy: "    " },
  { src: "/stu3.JPG", alt: " ", title: "   ", copy: " " },
  { src: "/stu5.JPG", alt: "  ", title: "  ", copy: "    " },
  { src: "/stu6.JPG", alt: " ", title: " ", copy: "" },
  { src: "/stu8.JPG", alt: " ", title: " ", copy: "" },
  { src: "/stu9.JPG", alt: " ", title: " ", copy: "" },
  { src: "/stu10.JPG", alt: " ", title: " ", copy: "" },
  { src: "/stu11.JPG", alt: " ", title: " ", copy: "" },
  { src: "/stu12.JPG", alt: " ", title: " ", copy: "" },
  { src: "/stu13.JPG", alt: " ", title: " ", copy: "" },
  { src: "/stu14.JPG", alt: " ", title: " ", copy: "" },
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />

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
                        i === idx ? "bg-white" : "bg-white/40 hover:bg-white/70",
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
              FULLY CUSTOMISABLE STUDIO LIGHTING
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
              Set the mood in seconds — change lighting instantly in the app
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              At Redbridge Podcast Studios, lighting isn’t fixed — it’s fully customisable.
              Using an intuitive app, the entire studio lighting system can be adjusted instantly from the touch of a finger.
              Use a full colour-palette slider to dial in the exact look you want — from warm and intimate, to bold and dramatic,
              to clean and professional.
            </p>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              The side light bars are also fully adjustable, giving you complete control over accent colours, contrast, and atmosphere.
              Each episode, guest, or brand can have its own unique visual identity — without changing the studio setup.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-2">
              {[
                "Instant lighting changes with a tap in the app",
                "Full RGB colour control (no presets, no limits)",
                "Adjust brightness and accents in seconds",
                "Match your brand colours or episode vibe",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-lg border bg-background/60 backdrop-blur p-4">
              <p className="text-sm font-semibold">Why this matters</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Lighting sets the emotional tone of a conversation. With full control over colour, brightness, and accents,
                you can keep visuals fresh across long-running shows and make clips stand out on social media.
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">No presets. No limitations.</span> Just complete creative control.
              </p>
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

/* -------------------- NEW: Multimedia Screen Section -------------------- */

function IntegratedMultimediaScreenSection() {
  const bullets = [
    "Bring remote guests into the studio via Zoom and other platforms",
    "Display videos, images, websites, or documents during interviews",
    "React to content live on camera",
    "Support hybrid podcasts with in-studio + remote participants",
    "Enhance live streams with on-screen visuals and references",
  ];

  const whyPoints = [
    "Interview guests from anywhere in the world as if they’re in the studio",
    "Seamlessly mix in-person and remote conversations",
    "Reference content live without breaking the flow",
    "Add visual storytelling to podcasts and live streams",
    "Create more engaging clips for social media",
  ];

  const idealFor = [
    "Podcasts with international guests",
    "Hybrid shows",
    "Panel discussions",
    "Brand interviews and product walkthroughs",
    "Live-streamed reactions and breakdowns",
  ];

  return (
    <section className="py-14 sm:py-18 lg:py-22 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="w-full min-w-0"
          >
            <Card className="overflow-hidden border-0 shadow-lg p-0">
              <div className="relative aspect-video w-full">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/equipment.mp4"
                  controls
                  playsInline
                  poster="/promote.jpg"
                  preload="metadata"
                  controlsList="nodownload noplaybackrate"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-black/0 to-black/10" />
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: MonitorPlay, label: "On-screen visuals" },
                { icon: Users, label: "Remote guests" },
                { icon: Zap, label: "Live reactions" },
              ].map((t, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border bg-background/70 backdrop-blur px-3 py-1.5 text-xs sm:text-sm"
                >
                  <t.icon className="h-4 w-4 text-primary" />
                  <span className="text-foreground/90">{t.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs tracking-wide uppercase text-muted-foreground">
              INTEGRATED MULTIMEDIA SCREEN
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
              Bring the world into the room
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Redbridge Podcast Studios features a fully integrated multimedia screen,
              giving you powerful creative and production flexibility during your sessions.
              This allows conversations to go beyond just talking — adding context, interaction,
              and depth in real time.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-2">
              {bullets.map((b) => (
                <div key={b} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border bg-background/60">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold">Why this changes the game</p>
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {whyPoints.slice(0, 3).map((p) => (
                      <div key={p} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{p}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-background/60">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold">Ideal for</p>
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {idealFor.slice(0, 3).map((p) => (
                      <div key={p} className="flex items-start gap-2 text-sm">
                        <div className="h-5 w-5 flex items-center justify-center shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{p}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 rounded-lg border bg-background/60 backdrop-blur p-4">
              <p className="text-sm font-semibold">Perfect for live streaming & hybrid shows</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Bring in remote guests, live audience call-ins, visual prompts, and real-time reactions —
                all while maintaining a cinematic, broadcast-quality look.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
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

              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mt-1">One studio. In-person and remote. Seamlessly connected.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Page ------------------------------ */

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

            {/* Hero Video */}
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
                    title: "Cinematic Video",
                    description:
                      "Up to 4 Blackmagic 6K cameras with live switching, ISO recording, and color-graded output",
                    imageSrc: "/about-video.jpg", // <- replace with your real image
                    imageAlt: "Blackmagic 6K cameras and studio camera setup",
                  },
                  {
                    title: "Studio-Grade Audio",
                    description:
                      "RØDECaster Pro II with premium microphones for crystal-clear, broadcast-ready sound",
                    imageSrc: "/about-audio.jpg", // <- replace with your real image
                    imageAlt: "RØDECaster Pro II and podcast microphones",
                  },
                  {
                    title: "Expert Production Team",
                    description:
                      "Dedicated technician and producer to handle everything while you focus on your content",
                    imageSrc: "/about-team.jpg", // <- replace with your real image
                    imageAlt: "Producer/technician working in the studio",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Card className="hover:border-primary transition-colors h-full overflow-hidden">
                      {/* Image */}
                    {/* Image */}
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={feature.imageSrc}
                        alt={feature.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                        className="object-cover object-[center_35%] scale-[1.03]"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
                    </div>


                      {/* Text */}
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
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




        {/* NEW: Integrated Multimedia Screen (equipment.mp4) */}
        <IntegratedMultimediaScreenSection />


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
                        src="/dj1.mp4"
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
                      <span className="font-semibold">
                        up to 8 platforms simultaneously
                      </span>
                      , including:
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
                      Your content can be experienced{" "}
                      <span className="font-semibold">live</span> and then
                      repurposed into high-quality on-demand episodes and clips.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>


        {/* Lighting */}
        <CustomiseLightingSection />

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
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 lg:py-24 ">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
                  Quick answers to the most common questions.
                </p>
              </motion.div>

              <Card className="border-0 shadow-none">
                <CardContent className="border-0 shadow-none">
                  <Accordion type="single" collapsible className="w-full shadow-none border-none">
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
