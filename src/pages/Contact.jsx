import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit architecture here
  };

  return (
    <main className="w-full bg-background text-foreground min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6  w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Context Details */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                <span>Inquiries</span>
              </div>
              <h1 className="text-4xl font-serif tracking-tight font-normal text-foreground">
                Connect with our concierge.
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                Have a unique route outline blueprint or booking request? Reach
                out directly. Our global desks respond within 4 business hours.
              </p>
            </div>

            {/* Solid Minimal Info Rows */}
            <div className="space-y-4 pt-4 border-t border-border/60">
              <div className="flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-xl border border-border bg-muted/20 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href="mailto:concierge@tourbee.com"
                    className="text-xs font-semibold text-foreground hover:underline"
                  >
                    concierge@tourbee.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-xl border border-border bg-muted/20 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    Direct Line
                  </p>
                  <a
                    href="tel:+1234567890"
                    className="text-xs font-semibold text-foreground hover:underline"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-xl border border-border bg-muted/20 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    HQ Hub
                  </p>
                  <p className="text-xs font-semibold text-foreground">
                    78 Pall Mall, St. James's, London
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Class Form Layout */}
          <div className="md:col-span-7 bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-2xs">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., John Doe"
                    className="w-full bg-muted/10 border border-border focus:border-foreground/40 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full bg-muted/10 border border-border focus:border-foreground/40 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Subject intent
                </label>
                <input
                  type="text"
                  required
                  placeholder="Custom Route Planning, Business Event, Booking issue..."
                  className="w-full bg-muted/10 border border-border focus:border-foreground/40 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Message detail
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Outline your inquiry requirements cleanly..."
                  className="w-full bg-muted/10 border border-border focus:border-foreground/40 rounded-xl px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-primary hover:bg-primary-hover text-background text-xs font-semibold py-3 rounded-xl transition-all duration-200 active:scale-[0.99] shadow-2xs flex items-center justify-center gap-2 group"
              >
                <span>Dispatch Message</span>
                <Send
                  size={12}
                  className="text-background/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
