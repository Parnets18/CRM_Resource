import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Settings, UserPlus, Building, Key, Users } from "lucide-react";
import Nav from "../Nav";

export default function SiteAdmin() {
 
  const projectManagers = [
    { id: 1, name: "Sarah Johnson", email: "sarah@company.com" },
    { id: 2, name: "Michael Chen", email: "michael@company.com" }
  ];

  const sites = [
    { id: 1, name: "Downtown Tower", location: "New York", pm: "Sarah Johnson", roles: ["view", "edit"] },
    { id: 2, name: "Tech Campus", location: "San Francisco", pm: "Michael Chen", roles: ["admin"] }
  ];

  return (
    <div className="min-h-screen bg-black lg:ml-64">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        
        <div className="flex-1 p-8 mt-16 md:mt-0">
         
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Administration Dashboard</h2>
              <p className="text-gray-400">System configuration and management</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building className="w-5 h-5" /> Create New Site
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Site Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      placeholder="Enter site name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Location</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Assign Project Manager</label>
                    <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                      <option value="">Select Project Manager</option>
                      {projectManagers.map(pm => (
                        <option key={pm.id} value={pm.id}>{pm.name} ({pm.email})</option>
                      ))}
                    </select>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <UserPlus className="w-4 h-4 mr-2" /> Create Site
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-5 h-5" /> Manage Access Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                          <th className="pb-3">Site Name</th>
                          <th className="pb-3">Location</th>
                          <th className="pb-3">Project Manager</th>
                          <th className="pb-3">Access Roles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sites.map(site => (
                          <motion.tr 
                            key={site.id} 
                            whileHover={{ scale: 1.01 }}
                            className="border-b border-gray-800 hover:bg-gray-900/50"
                          >
                            <td className="py-3 text-white">{site.name}</td>
                            <td className="py-3 text-gray-400">{site.location}</td>
                            <td className="py-3 text-purple-400">{site.pm}</td>
                            <td className="py-3">
                              <div className="flex gap-4">
                                <label className="flex items-center gap-1 text-sm">
                                  <input 
                                    type="checkbox" 
                                    className="accent-purple-500"
                                    checked={site.roles.includes('view')}
                                  />
                                  View
                                </label>
                                <label className="flex items-center gap-1 text-sm">
                                  <input 
                                    type="checkbox" 
                                    className="accent-purple-500"
                                    checked={site.roles.includes('edit')}
                                  />
                                  Edit
                                </label>
                                <label className="flex items-center gap-1 text-sm">
                                  <input 
                                    type="checkbox" 
                                    className="accent-purple-500"
                                    checked={site.roles.includes('admin')}
                                  />
                                  Admin
                                </label>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                      Reset Changes
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Settings className="w-4 h-4 mr-2" /> Save Permissions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          
          <div className="mt-6">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" /> Managed Sites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sites.map(site => (
                    <motion.div 
                      key={site.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-gray-900/50 border border-gray-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{site.name}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                          {site.location}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Manager: {site.pm}</p>
                      <div className="flex flex-wrap gap-2">
                        {site.roles.map(role => (
                          <span 
                            key={role}
                            className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}