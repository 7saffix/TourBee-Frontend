import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How do I book a tour?",
    a: "Browse any tour, click on it to view details, then hit the Book Now button. You'll need to be logged in to complete a booking.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes. You can cancel or reschedule up to 48 hours before the tour start date from your dashboard. Cancellations within 48 hours may be subject to a fee.",
  },
  {
    q: "Are the tour prices per person?",
    a: "Yes, all prices shown are per traveler. The total cost is calculated based on the number of guests during checkout.",
  },
  {
    q: "What's included in a tour package?",
    a: "Each tour lists exactly what's included — accommodation, meals, transport, and guide fees vary by package. Check the tour details page for a full breakdown.",
  },
  {
    q: "How do I find tours in a specific division?",
    a: "Use the Regions section on the homepage or visit the Tours page and filter by division using the sidebar.",
  },
  {
    q: "Is there a group discount?",
    a: "Some tours offer group pricing. Contact the tour organizer directly via the tour detail page for group booking inquiries.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-background py-12 md:py-20 border-b border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 md:space-y-12">
        {/* Header */}
        <div className="space-y-2 md:space-y-3">
          <div className="inline-flex items-center gap-1.5 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <HelpCircle size={14} className="shrink-0" />
            <span>Got questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-foreground tracking-tight">
            Frequently asked
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Everything you need to know before your next journey.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl md:rounded-2xl overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? "border-primary/30 bg-primary/[0.02]"
                    : "border-border bg-background"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
