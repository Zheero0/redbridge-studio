import Link from "next/link";
import { FaXTwitter, FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";

const SOCIAL_LINKS = [
  {
    name: "X",
    href: "https://x.com/droneboy88?s=21&t=paIAi5HONBGWlxCmPlD9YQ",
    Icon: FaXTwitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/redbridgepodcaststudio?igsh=eHRneGl6bW51OTds&utm_source=qr",
    Icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/17uZ9NMCWX/?mibextid=wwXIfr",
    Icon: FaFacebookF,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@redbridgepodcast?_r=1&_t=ZN-93PwvL6u9Zb",
    Icon: FaTiktok,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@redbridgepodcaststudios?si=eq-z4VT9S_fYodU_",
    Icon: FaYoutube,
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Redbridge Studios</h3>
            <p className="text-sm text-background/70 leading-relaxed">
              Broadcast-quality podcast, interview & live streaming production
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-background/15 bg-background/5 text-background/80 hover:text-background hover:bg-background/10 transition-colors"
                >
                  <s.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/studio-features"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Studio Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#packages"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a
                  href="mailto:hello@redbridgepodcaststudios.com"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  hello@redbridgepodcaststudios.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+441204525579"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  01204 525579
                </a>
              </li>
              <li>Bolton, BL2 5PH</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/50">
          <p>
            &copy; {new Date().getFullYear()} Redbridge Studios. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
