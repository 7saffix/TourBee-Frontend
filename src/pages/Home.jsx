import FeaturedDestination from "../components/FeatureDestination";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
      <Hero />
      <FeaturedDestination />
    </div>
  );
};

export default Home;
