import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Building, Plus, Settings, User, Users } from "lucide-react";

export default function SiteManagement() {
  const [sites, setSites] = useState([
    {
      id: 1,
      name: "Central Tower Project",
      address: "Downtown Business District",
      projectManager: "Sarah Johnson",
      status: "active",
      roles: { admin: 2, supervisor: 5 }
    },
    {
      id: 2,
      name: "Riverfront Development",
      address: "North Riverside Zone",
      projectManager: "Michael Chen",
      status: "planning",
      roles: { admin: 1, supervisor: 3 }
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const handleCreateSite = (e) => {
    e.preventDefault();
    // Add your site creation logic here
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar (Reuse your existing sidebar component here) */}

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Site Management
              </h2>
              <p className="text-gray-400">Manage construction sites and access permissions</p>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Site
            </Button>
          </div>

          {/* Sites List */}
          <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Active Construction Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-purple-400">Site Name</TableHead>
                    <TableHead className="text-purple-400">Address</TableHead>
                    <TableHead className="text-purple-400">Project Manager</TableHead>
                    <TableHead className="text-purple-400">Status</TableHead>
                    <TableHead className="text-purple-400 text-right">Access Roles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sites.map((site) => (
                    <motion.div key={site.id} whileHover={{ scale: 1.01 }}>
                      <TableRow className="hover:bg-gray-900/30">
                        <TableCell className="font-medium text-gray-100">
                          <Building className="inline mr-2 w-4 h-4" />
                          {site.name}
                        </TableCell>
                        <TableCell className="text-gray-400">{site.address}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-purple-400" />
                            {site.projectManager}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            site.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-purple-500/20 text-purple-400'
                          }`}>
                            {site.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-purple-400 hover:bg-purple-500/10"
                            onClick={() => {
                              setSelectedSite(site);
                              setIsRolesModalOpen(true);
                            }}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Roles
                          </Button>
                        </TableCell>
                      </TableRow>
                    </motion.div>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Create Site Modal */}
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogContent className="border border-purple-500/20 bg-black/90 backdrop-blur-sm text-white">
              <DialogHeader>
                <DialogTitle className="text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create New Site
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSite} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Site Name</Label>
                  <Input 
                    className="border-gray-800 bg-gray-900/50 text-white"
                    placeholder="Enter site name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Address</Label>
                  <Input 
                    className="border-gray-800 bg-gray-900/50 text-white"
                    placeholder="Enter full address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Project Manager</Label>
                  <Select>
                    <SelectTrigger className="border-gray-800 bg-gray-900/50 text-white">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800 text-white">
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="alex">Alex Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button 
                    type="button"
                    variant="outline"
                    className="border-purple-500/30 text-gray-300 hover:bg-gray-900/50"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Create Site
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Manage Roles Modal */}
          <Dialog open={isRolesModalOpen} onOpenChange={setIsRolesModalOpen}>
            <DialogContent className="border border-purple-500/20 bg-black/90 backdrop-blur-sm text-white">
              <DialogHeader>
                <DialogTitle className="text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Manage Access Roles - {selectedSite?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-purple-400">User</TableHead>
                      <TableHead className="text-purple-400">Current Role</TableHead>
                      <TableHead className="text-purple-400 text-right">Change Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(5)].map((_, i) => (
                      <TableRow key={i} className="hover:bg-gray-900/30">
                        <TableCell className="text-gray-300">user{i}@nexuscrm.com</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                            {i % 2 === 0 ? 'Admin' : 'Supervisor'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Select>
                            <SelectTrigger className="w-[150px] border-gray-800 bg-gray-900/50 text-white">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-800 text-white">
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="project-manager">Project Manager</SelectItem>
                              <SelectItem value="supervisor">Supervisor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end gap-2 mt-6">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => setIsRolesModalOpen(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}