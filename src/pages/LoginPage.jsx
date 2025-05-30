import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log({ email, password, role });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center  p-4">
      <header className="h-16 w-full bg-white px-12 flex items-center justify-between fixed top-0 z-50">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden md:inline font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              CRM
            </span>
          </Link>
        </div>
        
      </header>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-sm shadow-xl shadow-purple-500/10">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              {/* Logo or animation can go here */}
            </div>
            <CardTitle className="text-2xl font-bold text-center ">
              Login to CRM
            </CardTitle>
            <CardDescription className="text-center text-black">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Role Selection Dropdown */}
              <div className="space-y-2">
                <Label className="text-black">Login As</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="text-black focus:border-purple-500 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-800 text-black">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="hr-manager">HR Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="project-manager">
                      Project Manager
                    </SelectItem>
                    <SelectItem value="site-supervisor">
                      Site Supervisor
                    </SelectItem>
                    <SelectItem value="procurement-officer">
                      Procurement Officer
                    </SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-black focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>
              <div className="">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-black">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-500 underline-offset-4  transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="   text-black focus:border-black focus:ring-purple-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-purple-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Link to="/admin/create">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-600/20 mt-4 cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <p className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-400 underline-offset-4 hover:text-purple-300 transition-colors"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
