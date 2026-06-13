import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  MapPin,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Layers,
  ArrowLeft,
  Briefcase,
  Compass,
  Heart,
  Share2,
  Info,
  Loader2,
} from "lucide-react";
import { useGetToursQuery } from "../redux/Api/tour.api";
import { useCreateBookingMutation } from "../redux/Api/booking.api";
import { useProfileQuery } from "../redux/Api/user.api";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: toursResponse,
    isLoading,
    isError,
  } = useGetToursQuery({
    page: 1,
  });
  const { data: userData } = useProfileQuery();
  console.log(userData?.data?.email);

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const tours = toursResponse?.tours || toursResponse?.data || [];

  const tour = tours.find((item) => item._id === id);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-9 h-9 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Parsing Cached Memory Clusters...
        </p>
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <p className="text-xs font-bold text-primary uppercase tracking-widest">
          Registry Sync Interrupted
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">
          The specific journey configuration you requested does not reside in
          the active buffer framework.
        </p>
        <Link
          to="/tours"
          className="h-10 px-5 bg-primary text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Grid Frame</span>
        </Link>
      </div>
    );
  }

  const tourImages =
    tour.images && tour.images.length > 0
      ? tour.images
      : [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
        ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!userData?.data?.email) {
      navigate("/login");
      return;
    }

    const checkoutPayload = {
      tour: tour._id,
      guestCount: Number(guestCount),
    };
    try {
      const response = await createBooking(checkoutPayload).unwrap();
      console.log(response);

      if (response?.success && response?.data) {
        navigate("/checkout", {
          state: {
            booking: response?.data?.booking,
            paymentUrl: response?.data?.paymentUrl,
          },
        });
      }
    } catch (error) {
      console.error("Booking transactional failure:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground pb-20">
      {/* 1. Dynamic Hero Media Console Frame */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-muted overflow-hidden">
        <img
          src={tourImages[activeImgIdx]}
          alt={`${tour.title} scene framing-${activeImgIdx}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out contrast-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-black/50" />

        {/* Floating Controller HUD Nav Strips */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between z-10">
          <Link
            to="/tours"
            className="flex items-center gap-2 h-10 px-4 bg-background/80 backdrop-blur-md border border-border/40 rounded-xl text-xs font-bold hover:bg-background transition-colors shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Matrix Base</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2.5 rounded-xl border border-border/40 backdrop-blur-md transition-colors shadow-xs ${isSaved ? "bg-primary text-white border-primary" : "bg-background/80 text-foreground hover:bg-background"}`}
            >
              <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button className="p-2.5 bg-background/80 backdrop-blur-md border border-border/40 rounded-xl hover:bg-background transition-colors shadow-xs">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Categories Metadata Layout Node Banner */}
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-3 justify-end h-full pointer-events-none">
          <div className="flex flex-wrap gap-2 pointer-events-auto">
            {tour.tourType?.name && (
              <span className="inline-flex items-center gap-1 bg-primary/95 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                <Compass size={11} />
                {tour.tourType.name}
              </span>
            )}
            {tour.division?.name && (
              <span className="inline-flex items-center gap-1 bg-muted/80 backdrop-blur-md text-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-border/40 shadow-sm">
                <MapPin size={11} className="text-primary" />
                {tour.division.name} Hub
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-5xl font-serif tracking-tight text-white max-w-3xl filter drop-shadow-md">
            {tour.title}
          </h1>
        </div>
      </div>

      {/* 2. Interactive Variable Image Gallery Grid Track */}
      {tourImages.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {tourImages.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIdx(idx)}
                className={`relative w-20 h-14 sm:w-28 sm:h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-muted ${
                  activeImgIdx === idx
                    ? "border-primary scale-95 shadow-xs"
                    : "border-border/60 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={url}
                  alt={`Preview row view-${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Core Architecture Structural Splitter Column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 md:mt-12 items-start">
        {/* Left Specification Column Pillar */}
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          {/* Diagnostic Metrics Specs Grid layout HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-muted/20 border border-border/80 p-4 rounded-2xl">
            <div className="flex items-center gap-3 p-2 min-w-0">
              <div className="p-2 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0">
                <Clock size={16} />
              </div>
              <div className="min-w-0">
                <div className=" bg-muted/20 rounded-xl flex items-center gap-2.5">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                      Schedule Setup
                    </p>
                    <p className="font-semibold text-foreground text-xs">
                      {tour.startDate
                        ? new Date(tour.startDate).toLocaleDateString(
                            undefined,
                            {
                              dateStyle: "medium",
                            },
                          )
                        : "Flexible Operational Track"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 min-w-0">
              <div className="p-2 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0">
                <Users size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  Availability
                </p>
                <p className="text-xs font-bold text-foreground truncate">
                  Max {tour.maxGuest || 0} Slots
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 min-w-0">
              <div className="p-2 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0">
                <Layers size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  Age Restriction
                </p>
                <p className="text-xs font-bold text-foreground truncate">
                  {tour.minAge || 0}+ Years Base
                </p>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="space-y-3 text-left">
            <h2 className="font-serif text-lg md:text-xl font-medium tracking-wide">
              Expedition Manifesto
            </h2>
            <div className="h-px bg-border w-16" />
            <p className="text-sm text-muted-foreground leading-relaxed font-normal">
              {tour.description}
            </p>
          </div>

          {/* Chronological Itinerary Target Sequential Mappings */}
          {tour.tourPlan && tour.tourPlan.length > 0 && (
            <div className="space-y-6 text-left">
              <h2 className="font-serif text-lg md:text-xl font-medium tracking-wide">
                Operational Route Map
              </h2>
              <div className="relative border-l-2 border-border pl-6 ml-3 space-y-8 py-2">
                {tour.tourPlan.map((step, idx) => {
                  const parts = step.split(":");
                  const dayLabel = parts[0];
                  const details = parts.slice(1).join(":").trim();
                  return (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors flex items-center justify-center z-10" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase text-primary tracking-widest">
                          {dayLabel}
                        </h4>
                        {details && (
                          <p className="text-sm font-medium text-foreground">
                            {details}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Logistics Inclusions and Liabilities Exclusions Matrix layout split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-border/80 py-8 text-left">
            {tour.included && tour.included.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground flex items-center gap-1.5">
                  <Briefcase size={12} className="text-primary" />
                  <span>Logistics Provided</span>
                </h3>
                <ul className="space-y-2.5">
                  {tour.included.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground font-medium"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.excluded && tour.excluded.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground flex items-center gap-1.5">
                  <Info size={12} className="text-primary" />
                  <span>Excluded Liabilities</span>
                </h3>
                <ul className="space-y-2.5">
                  {tour.excluded.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground font-medium"
                    >
                      <XCircle
                        size={14}
                        className="text-destructive shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Operational Support Gear List mapping */}
          {tour.amenities && tour.amenities.length > 0 && (
            <div className="space-y-4 text-left">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Tactical Amenities & Support Gear
              </h3>
              <div className="flex flex-wrap gap-2">
                {tour.amenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1.5 bg-muted rounded-xl border border-border/60 flex items-center gap-2"
                  >
                    <ShieldCheck size={12} className="text-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Pillar Interactive Transaction Checkout Console Card */}
        <div className="lg:col-span-1 lg:sticky lg:top-6 bg-background border border-border rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-baseline justify-between border-b border-border pb-4 text-left">
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Base Rate Value
              </p>
              <h3 className="text-2xl font-black tracking-tight mt-0.5">
                ৳{tour.costForm?.toLocaleString()}{" "}
                <span className="text-xs font-medium text-muted-foreground">
                  / Seat
                </span>
              </h3>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Traveler Roster Allocation
              </label>
              <div className="flex items-center justify-between border border-border bg-muted h-10 rounded-xl px-2">
                <button
                  type="button"
                  disabled={guestCount <= 1}
                  onClick={() => setGuestCount((prev) => prev - 1)}
                  className="w-7 h-7 bg-background border border-border rounded-lg text-xs font-bold disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold font-mono">
                  {guestCount}
                </span>
                <button
                  type="button"
                  disabled={guestCount >= (tour.maxGuest || 1)}
                  onClick={() => setGuestCount((prev) => prev + 1)}
                  className="w-7 h-7 bg-background border border-border rounded-lg text-xs font-bold disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal Calculation Ledgers Box */}
            <div className="bg-muted/40 rounded-xl p-3.5 border border-border/50 space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-muted-foreground font-medium">
                <span>
                  ৳{tour.costForm?.toLocaleString()} BDT × {guestCount}{" "}
                  Travelers
                </span>
                <span>
                  ৳{((tour.costForm || 0) * guestCount).toLocaleString()} BDT
                </span>
              </div>
              <div className="h-px bg-border/60 my-1" />
              <div className="flex justify-between text-sm font-black text-foreground pt-1">
                <span>Aggregated Total BDT</span>
                <span>
                  ৳{((tour.costForm || 0) * guestCount).toLocaleString()} BDT
                </span>
              </div>
            </div>

            <button
              // to={"/checkout"}
              onClick={handleBookingSubmit}
              disabled={isBooking}
              className="w-full h-11 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              {isBooking ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Booking</span>
                </>
              ) : (
                <>
                  <span>Book Now</span>
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
