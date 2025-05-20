import { useState } from "react";
import { Warehouse, Plus, MapPin, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import RestoNav from "../RestoNav";

export default function StoreLocation() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: "Main Store",
      address: "123 Main Street, City Center",
      manager: "John Smith",
      contact: "+1 234 567 8901",
      itemCount: 85,
    },
    {
      id: 2,
      name: "Kitchen Store",
      address: "456 Kitchen Avenue, Downtown",
      manager: "Sarah Johnson",
      contact: "+1 234 567 8902",
      itemCount: 39,
    },
  ];

  const handleEdit = (location) => {
    setSelectedLocation(location);
    setIsEditDialogOpen(true);
  };

  // ...existing code...
  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <RestoNav />

        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Store Locations</h2>
              <p className="text-gray-700">Manage your inventory locations</p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Location
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location) => (
              <Card key={location.id} className="border border-purple-500/20 bg-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-black flex items-center">
                    <Warehouse className="w-5 h-5 mr-2 text-purple-400" />
                    {location.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-purple-700"
                      onClick={() => handleEdit(location)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Manager</p>
                        <p className="text-gray-700">{location.manager}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Contact</p>
                        <p className="text-gray-700">{location.contact}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Items in location</span>
                        <span className="text-black font-medium">{location.itemCount}</span>
                      </div>
                      <Button variant="link" className="text-purple-700 p-0 h-auto mt-2">
                        View inventory
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Location Name</Label>
              <Input id="name" className="bg-gray-100 border-gray-300 text-black" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" className="bg-gray-100 border-gray-300 text-black" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="manager">Manager</Label>
                <Input id="manager" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" className="bg-gray-100 border-gray-300 text-black" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300 text-gray-700" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Location Name</Label>
              <Input id="edit-name" className="bg-gray-100 border-gray-300 text-black" defaultValue={selectedLocation?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Textarea
                id="edit-address"
                className="bg-gray-100 border-gray-300 text-black"
                defaultValue={selectedLocation?.address}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-manager">Manager</Label>
                <Input
                  id="edit-manager"
                  className="bg-gray-100 border-gray-300 text-black"
                  defaultValue={selectedLocation?.manager}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-contact">Contact Number</Label>
                <Input
                  id="edit-contact"
                  className="bg-gray-100 border-gray-300 text-black"
                  defaultValue={selectedLocation?.contact}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300 text-gray-700" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Update Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
// ...existing code...
}
