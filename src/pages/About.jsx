// import { Compass, Users, Target, Shield } from "lucide-react";

// const About = () => {
//   const stats = [
//     { label: "Destinations Covered", value: "150+" },
//     { label: "Curated Experiences", value: "12,000+" },
//     { label: "Expert Local Guides", value: "450+" },
//     { label: "Satisfaction Rating", value: "99.4%" },
//   ];

//   const pillars = [
//     {
//       icon: Target,
//       title: "Our Mission",
//       desc: "To curate exceptional human journeys by connecting intent with authentic, deeply immersive environmental footprints.",
//     },
//     {
//       icon: Shield,
//       title: "Absolute Safety",
//       desc: "Securing top-tier vetted transits, uncompromised routes, and real-time network assistance across global nodes.",
//     },
//     {
//       icon: Users,
//       title: "Community First",
//       desc: "Empowering indigenous economies directly by sustaining local ecosystems through micro-targeted eco-tourism blueprints.",
//     },
//   ];

//   return (
//     <main className="w-full bg-background text-foreground min-h-screen">
//       {/* Editorial Hero Header */}
//       <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-24 border-b border-border/60">
//         <div className="space-y-4 max-w-3xl">
//           <div className="inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
//             <Compass size={12} />
//             <span>Our Philosophy</span>
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-serif tracking-tight font-normal leading-tight">
//             We architect tailored pathways for the intentional explorer.
//           </h1>
//           <p className="text-sm md:text-base text-muted-foreground max-w-2xl font-light leading-relaxed pt-2">
//             Founded on the principle that exploration shouldn't be
//             mass-produced, TourBee curates sharp, purposeful travel experiences
//             that ditch predictable tourist tracks in pursuit of unrefined,
//             lasting stories.
//           </p>
//         </div>
//       </section>

//       {/* Structural Stats Bento */}
//       <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 border-b border-border/60">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((stat, i) => (
//             <div key={i} className="space-y-1.5 p-1">
//               <p className="text-3xl sm:text-4xl font-serif text-foreground font-normal tracking-tight">
//                 {stat.value}
//               </p>
//               <p className="text-xs text-muted-foreground/80 font-medium uppercase tracking-wider">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Core Values Section */}
//       <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {pillars.map((pillar, i) => {
//             const Icon = pillar.icon;
//             return (
//               <div
//                 key={i}
//                 className="bg-background border border-border/80 rounded-2xl p-6 flex flex-col justify-between h-56 transition-all duration-300 hover:border-foreground/40 shadow-2xs hover:shadow-sm"
//               >
//                 <div className="w-10 h-10 rounded-xl bg-muted/30 border border-border flex items-center justify-center text-foreground">
//                   <Icon size={16} />
//                 </div>
//                 <div className="space-y-1.5">
//                   <h3 className="text-sm font-semibold text-foreground tracking-wide">
//                     {pillar.title}
//                   </h3>
//                   <p className="text-xs text-muted-foreground leading-relaxed font-light">
//                     {pillar.desc}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default About;

import { Compass, Users, Target, Shield, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const About = () => {
  const stats = [
    { label: "Destinations Covered", value: "150+" },
    { label: "Curated Experiences", value: "12,000+" },
    { label: "Expert Local Guides", value: "450+" },
    { label: "Satisfaction Rating", value: "99.4%" },
  ];

  const pillars = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "To curate exceptional human journeys by connecting intent with authentic, deeply immersive environmental footprints.",
    },
    {
      icon: Shield,
      title: "Absolute Safety",
      desc: "Securing top-tier vetted transits, uncompromised routes, and real-time network assistance across global nodes.",
    },
    {
      icon: Users,
      title: "Community First",
      desc: "Empowering indigenous economies directly by sustaining local ecosystems through micro-targeted eco-tourism blueprints.",
    },
  ];

  return (
    <main className="w-full bg-background text-foreground min-h-screen">
      {/* Editorial Hero Header */}
      <section className="max-w-5xl mx-auto px-4  pt-2  border-b border-border/60">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full border border-primary/10 select-none">
            <Compass size={12} className="animate-spin-slow" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight font-normal leading-tight">
            We architect tailored pathways for the{" "}
            <span className="text-primary italic font-medium">intentional</span>{" "}
            explorer.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl font-light leading-relaxed pt-2">
            Founded on the principle that exploration shouldn't be
            mass-produced, TourBee curates sharp, purposeful travel experiences
            that ditch predictable tourist tracks in pursuit of unrefined,
            lasting stories.
          </p>
        </div>
      </section>

      {/* Structural Stats Bento */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-b border-border/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1.5 p-1 group select-none">
              <p className="text-3xl sm:text-4xl font-serif text-foreground font-normal tracking-tight group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground/80 font-medium uppercase tracking-wider transition-colors duration-300 group-hover:text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-background border border-border/80 rounded-2xl p-6 flex flex-col justify-between h-56 transition-all duration-300 hover:border-primary text-white hover:bg-muted/[0.04] shadow-2xs hover:shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary border  flex items-center justify-center group-hover:bg-primary group-hover:text-background border-border/60 group-hover:border-primary transition-all duration-300">
                  <Icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-foreground tracking-wide transition-colors duration-300 group-hover:text-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Action Pitch */}
        <div className="border border-border/60 rounded-2xl p-8 md:p-12 bg-linear-to-br from-background via-muted/[0.02] to-muted/[0.07] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight">
              Ready to construct your next story?
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
              Explore our current roster of non-traditional routes or talk
              directly to an architect to formulate a pristine, personalized
              itinerary framework.
            </p>
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background text-xs font-semibold px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-2xs group focus:outline-none shrink-0"
          >
            <span>Explore Tours</span>
            <ArrowUpRight
              size={14}
              className="opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
