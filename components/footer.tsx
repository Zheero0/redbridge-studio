import Link from "next/link";

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
                  href="tel:+441204 525579"
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
