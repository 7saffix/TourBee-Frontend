import { Rocket } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative flex items-center justify-center h-16 w-16">
        {/* Outer Tech Ring - Continuous Rotation */}
        <div className="absolute inset-0 rounded-full border-[3px] border-primary/10 border-t-primary animate-spin" />

        {/* Inner Logo Shell - Smooth Breathing/Pulse Action */}
        <div className="absolute flex items-center justify-center bg-primary/5 rounded-full p-2 animate-pulse">
          <Rocket className="h-8 w-8 text-primary transform rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
