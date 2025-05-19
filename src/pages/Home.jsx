import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "CRM Management",
      description: "Manage multiple companies with a powerful admin dashboard",
      color: "bg-pink-400",
    },
    {
      title: "Construction CRM",
      description: "Create detailed company profiles with custom modules",
      color: "bg-purple-500",
    },
    {
      title: "Resturant CRM",
      description: "Resturant CRM for  management",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col     text-white">
      <header
        className={`fixed  top-0 z-50 w-full bg-white px-12  "
        }`}
      >
        <div className="container flex h-16 items-center px-5">
          <div className="mr-4 hidden md:flex ">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center "
              >
                <span className="text-white font-bold">N</span>
              </motion.div>
              <span className=" hidden font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 sm:inline-block">
                NexusCRM
              </span>
            </Link>
            {/* <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                to="/about"
                className="text-gray-300 transition-colors hover:text-white"
              >
                About
              </Link>
            </nav> */}
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link to="/login">
              <Button
                variant="outline"
                className="mr-2 border-purple-500 text-black bg-purple-300 px-5 cursor-pointer "
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-20">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-gray-900 to-black"></div>
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
            <div className="absolute  left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container relative z-10 px-4 md:px-6"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl font-bold tracking-tighter text-black sm:text-5xl xl:text-6xl/none bg-clip-text   bg-gradient-to-r from-white via-purple-300 to-pink-400"
                  >
                    Next-Gen CRM Solution for Modern Businesses
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-[600px] text-gray-400 md:text-xl"
                  >
                    Streamline your customer relationships, manage companies,
                    and empower your team with our comprehensive CRM platform.
                  </motion.p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center"
              >
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-b from-purple-950/50 to-black p-4 shadow-2xl shadow-purple-500/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-md rounded-lg border border-purple-500/20 bg-black/80 p-4 shadow-lg backdrop-blur">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">
                          SuperAdmin Dashboard
                        </h3>
                        <div className="h-2 w-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                      </div>
                      <div className="mt-4 grid gap-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="rounded-lg border border-purple-500/20 bg-gray-900/80 p-3 transition-all hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                AC
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                Acme Corporation
                              </h4>
                              <p className="text-xs text-gray-400">
                                Technology • 250 Employees
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="rounded-lg border border-purple-500/20 bg-gray-900/80 p-3 transition-all hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                GL
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                GlobalTech Industries
                              </h4>
                              <p className="text-xs text-gray-400">
                                Manufacturing • 1200 Employees
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="rounded-lg border border-purple-500/20 bg-gray-900/80 p-3 transition-all hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                SV
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                Skyview Enterprises
                              </h4>
                              <p className="text-xs text-gray-400">
                                Healthcare • 500 Employees
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <ChevronDown className="h-6 w-6 text-purple-400" />
            </motion.div>
          </div> */}
        </section>

        <section className="w-full      ">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/10 to-black"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            <div className="absolute  left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-300 border border-purple-500/20 px-5 py-3 text-sm text-black">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-black via-purple-300 to-pink-400">
                  Everything you need to manage your business
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our CRM platform provides powerful tools for managing
                  companies, employees, and customer relationships.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`grid gap-1 rounded-xl border border-purple-500/20 p-6 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer ${
                    currentFeature === index
                      ? "bg-gradient-to-br bg-opacity-20 " + feature.color
                      : "bg-gray-900/50"
                  }`}
                  onClick={() => navigate("/login")}
                >
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 md:py-0 px-10 bg-blue-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
            © 2023 NexusCRM. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-purple-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-purple-400 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
