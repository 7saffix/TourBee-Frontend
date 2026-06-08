import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Rocket,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useRegisterMutation } from "../redux/Api/auth.api";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();
      toast.success(response?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Centralized Minimalist Auth Card */}
      <div className="w-full max-w-md space-y-8 bg-background border border-border p-8 rounded-2xl shadow-xl transition-all duration-300 hover:border-border/80">
        {/* Header/Branding */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2.5 rounded-xl shadow-md transition-transform duration-300 group-hover:rotate-12">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Tour<span className="text-primary">Bee</span>
            </span>
          </Link>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground mt-2">
              Create your account
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Join TourBee to manage and book your dream adventures
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full pl-10 pr-4 py-3 bg-muted/30 border border-border text-foreground text-sm rounded-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full pl-10 pr-4 py-3 bg-muted/30 border border-border text-foreground text-sm rounded-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full pl-10 pr-10 py-3 bg-muted/30 border border-border text-foreground text-sm rounded-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-border text-primary bg-muted/30 focus:ring-primary focus:ring-offset-background transition-colors"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-muted-foreground select-none leading-tight"
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-medium text-primary hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-medium text-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Action */}
          <button
            disabled={isLoading}
            type="submit"
            className="group relative w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            {isLoading ? (
              <> Creating...</>
            ) : (
              <>
                Get Started
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Footer/Switch to Login */}
        <div className="text-center text-sm text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
