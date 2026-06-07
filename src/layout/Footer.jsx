import { Rocket, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Main Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="bg-primary p-2 rounded-xl shadow-md transition-transform duration-300 group-hover:rotate-12">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Tour<span className="text-primary">Bee</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Taking your travel experiences to new heights. We manage your
              tours so you can focus on the adventure.
            </p>
          </div>

          {/* Quick Links - Popular Tours */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground/90 mb-5">
              Popular Tours
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Mountain Hiking",
                "Beach Resorts",
                "City Breaks",
                "Cruise Packages",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground/90 mb-5">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Booking Policy", "Refunds", "Travel Insurance", "FAQs"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground/90 mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-0.5" size={16} />
                <span>45 Skyward Lane, Adventure Hub, 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={16} />
                <a
                  href="tel:+1800TOURBEE"
                  className="hover:text-primary transition-colors"
                >
                  +1 (800) TOUR-BEE
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={16} />
                <a
                  href="mailto:bookings@tourbee.com"
                  className="hover:text-primary transition-colors"
                >
                  bookings@tourbee.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TourBee. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
