import { Button } from "@/components/ui/button";
import { MapPin, Users, Warehouse, ShoppingCart, Banknote, Scale } from "lucide-react";

export function SidebarNav() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      {/* Dashboard Layout */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 min-h-screen border-r border-purple-500/20 bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="flex items-center gap-2 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">N</span>
            </motion.div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              NexusCRM
            </h1>
          </div>
    <nav className="space-y-1.5">
      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <MapPin className="w-4 h-4 mr-2 text-purple-400" />
        Site Management
      </Button>

      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <Users className="w-4 h-4 mr-2 text-purple-400" />
        HR & Payroll
      </Button>

      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <Warehouse className="w-4 h-4 mr-2 text-purple-400" />
        Indent & Inventory
      </Button>

      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <ShoppingCart className="w-4 h-4 mr-2 text-purple-400" />
        Purchase Management
      </Button>

      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <Banknote className="w-4 h-4 mr-2 text-purple-400" />
        Sales Management
      </Button>

      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <Scale className="w-4 h-4 mr-2 text-purple-400" />
        Expense Management
      </Button>
    </nav>
    </motion.div>
    </div>
    </div>
  );
}