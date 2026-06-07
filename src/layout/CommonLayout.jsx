import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
