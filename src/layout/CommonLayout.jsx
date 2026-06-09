import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({ children }) => {
  return (
    <div className=" min-h-screen w-full max-w-full overflow-x-hidden bg-background flex flex-col min-w-0">
      <Navbar />
      <div className="grow max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
