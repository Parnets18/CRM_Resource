//import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Box, Briefcase, Clock, DollarSign, Home, Settings, Users } from "lucide-react";

import Nav from "./Nav";
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

  
      <div className="relative z-10 flex">
    <Nav />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome Back, Admin</h2>
              <p className="text-gray-400">Here's your daily overview</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Total Projects
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">24</div>
                  <p className="text-xs text-green-400">+2 from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Ongoing Tasks
                  </CardTitle>
                  <Clock className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">156</div>
                  <p className="text-xs text-red-400">-5 from yesterday</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Active Employees
                  </CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">42</div>
                  <p className="text-xs text-green-400">+3 new hires</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">$234K</div>
                  <p className="text-xs text-green-400">+15.8% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activities */}
          <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((item) => (
                <motion.div 
                  key={item}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-300">
                      New project "Site Expansion" created
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs text-gray-400">Completed</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 