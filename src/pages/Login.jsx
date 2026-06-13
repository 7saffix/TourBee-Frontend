import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Rocket,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useLoginMutation } from "../redux/Api/auth.api";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      toast.success(response.message);
      navigate("/");
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
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your credentials to access your traveler dashboard
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
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

          {/* Submit Action */}
          <button
            disabled={isLoading}
            type="submit"
            className="group relative w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
              </>
            ) : (
              <>
                Sign In
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Footer/Switch to Register */}
        <div className="text-center text-sm text-muted-foreground pt-2">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
