import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [   
    {
      title: " Common CRM Management",
      description: "Manage multiple companies with a powerful admin dashboard",
    },   
    {
      title: "Resturant CRM",
      description: "Resturant CRM for management",
    },
    {
      title: "Construction CRM",
      description: "Create detailed company profiles with custom modules",
    },
   
  
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white">
      <header className="h-16 w-full bg-white px-12 flex items-center justify-between fixed top-0 z-50">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden md:inline font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              CRM
            </span>
          </Link>
        </div>
        <Link to="/login">
          <Button
            variant="outline"
            className="border-purple-500 text-black bg-purple-300 px-5 cursor-pointer"
          >
            Login
          </Button>
        </Link>
      </header>

      <main className="flex flex-1 pt-16">
        <section className="w-full h-full relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/10 to-black"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-8">
            {/* Left: Image */}
            <div className="h-full flex items-center justify-center">
              <img
                src="/Image/dlvrit-customer-relations-blog-1.png"
                alt="Customer Relationship"
                className="w-300 h-100      "
              />
            </div>

            {/* Right: Text + Cards */}
            <div className="flex flex-col justify-center h-full space-y-6">
              <div className="text-left">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-black via-purple-300 to-pink-400">
                  Everything you need to manage your business
                </h2>
              </div>

              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (feature.title == "Resturant CRM") {
                        navigate("/RestaurantCrmDashboard");
                      } else if (feature.title == "Construction CRM") {
                        navigate("/admin/create");
                      }else if(feature.title == " Common CRM Management") {
                        navigate("/common");
                      }
                    }}
                    className="group rounded-xl border border-purple-200 bg-purple-50 p-5 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-purple-500"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="h-16 bg-blue-50 flex items-center justify-between px-10 text-black text-sm">
        <p>© 2023 CRM. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link
            to="/terms"
            className="underline underline-offset-4   transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="underline underline-offset-4   transition-colors"
          >
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}
