import FAQAccordion from "../components/FAQAccordion";
import FeaturedDestination from "../components/FeatureDestination";
import Hero from "../components/Hero";
import TourTypeGrid from "../components/TourTypeGrid";

const Home = () => {
  return (
    <div className="flex-1 w-full max-w-full overflow-x-hidden min-w-0 min-h-screen">
      <Hero />
      <TourTypeGrid />
      <FeaturedDestination />
      <FAQAccordion />
    </div>
  );
};

export default Home;
