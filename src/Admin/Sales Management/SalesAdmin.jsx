import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, UserPlus, Briefcase, FileText, Percent, DollarSign, ClipboardList } from "lucide-react";

import RestoNav from "@/Restaurant/RestoNav";

export default function SalesAdmin() {
  
  const invoiceSettings = {
    prefix: "INV",
    nextNumber: 1045,
    taxRate: 15,
    taxId: "VAT-123456"
  };

  // Example clients for the Recent Clients section
  const clients = [
    { name: "Acme Corp", company: "Acme Corp Pvt Ltd" },
    { name: "Global Tech", company: "Global Tech Solutions" }
  ];

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <RestoNav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Sales Management Dashboard</h2>
              <p className="text-gray-700">Client and invoice management portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Add Client/Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Client Name" 
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />
                  <input 
                    type="text" 
                    placeholder="Project Name" 
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" 
                      placeholder="Budget" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input 
                      type="date" 
                      placeholder="Start Date" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Briefcase className="w-4 h-4 mr-2" /> Add Project
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Invoice Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Invoice Prefix" 
                      defaultValue={invoiceSettings.prefix}
                      className="w-1/3 p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input 
                      type="number" 
                      placeholder="Next Invoice Number" 
                      defaultValue={invoiceSettings.nextNumber}
                      className="w-2/3 p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" 
                      placeholder="Tax Rate (%)" 
                      defaultValue={invoiceSettings.taxRate}
                      className="p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input 
                      type="text" 
                      placeholder="Tax ID" 
                      defaultValue={invoiceSettings.taxId}
                      className="p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <FileText className="w-4 h-4 mr-2" /> Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Recent Clients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {clients.map((client, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-black">{client.name}</p>
                      <p className="text-xs text-gray-500">{client.company}</p>
                    </div>
                    <DollarSign className="text-purple-600 w-5 h-5" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Invoice Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                  <span className="text-black">Default Template</span>
                  <Button size="sm">Preview</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                  <span className="text-black">Modern Template</span>
                  <Button size="sm">Activate</Button>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <ClipboardList className="w-4 h-4 mr-2" /> Upload New Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}