"use client"

import { useState } from "react"
import { Truck, Search, Check, AlertTriangle, Plus, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RestoNav from "../RestoNav"

export default function SuppliersVendors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    category: "",
    address: ""
  })

  // Sample suppliers data
  const suppliers = [
    {
      id: 1,
      name: "Fresh Farms",
      contact: "555-0101",
      email: "contact@freshfarms.com",
      category: "Produce",
      address: "123 Farm Road, Springfield"
    },
    {
      id: 2,
      name: "Dairy Direct",
      contact: "555-0102",
      email: "info@dairydirect.com",
      category: "Dairy",
      address: "456 Milk Lane, Springfield"
    },
    {
      id: 3,
      name: "Grain Co",
      contact: "555-0103",
      email: "sales@grainco.com",
      category: "Grains",
      address: "789 Wheat Street, Springfield"
    }
  ]

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddSupplier = () => {
    // Here you would implement the actual supplier addition logic
    setIsAddDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    // Reset form
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      category: "",
      address: ""
    })

    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
    }, 2000)
  }

  const handleEditSupplier = () => {
    // Here you would implement the actual supplier edit logic
    setIsEditDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedSupplier(null)
    }, 2000)
  }

  const handleDeleteSupplier = () => {
    // Here you would implement the actual supplier deletion logic
    setIsDeleteDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedSupplier(null)
    }, 2000)
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="absolute inset-0 z-0">
        <RestoNav />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto ml-[16rem]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Suppliers & Vendors</h2>
            <p className="text-gray-400">Manage your restaurant's suppliers and vendors</p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Supplier
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-white">Supplier List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search suppliers..."
                      className="w-full bg-gray-900/50 border-gray-700 pl-8 text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label>Category Filter</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="produce">Produce</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="grains">Grains</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label>Suppliers</Label>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                      {filteredSuppliers.map((supplier) => (
                        <div
                          key={supplier.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedSupplier?.id === supplier.id
                              ? "bg-purple-900/50 text-white"
                              : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                          }`}
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-2 text-purple-400" />
                            <span>{supplier.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Category: {supplier.category} • Contact: {supplier.contact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Supplier Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSupplier ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-white flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-purple-400" />
                        {selectedSupplier.name}
                      </h3>
                      <div className="space-x-2">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            setNewSupplier(selectedSupplier)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => setIsDeleteDialogOpen(true)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Contact</Label>
                        <p className="text-gray-300">{selectedSupplier.contact}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <p className="text-gray-300">{selectedSupplier.email}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <p className="text-gray-300">{selectedSupplier.category}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <p className="text-gray-300">{selectedSupplier.address}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Truck className="w-12 h-12 text-gray-700 mb-4" />
                    <h3 className="text-lg font-medium text-gray-400">No Supplier Selected</h3>
                    <p className="text-gray-500 mt-2 max-w-md">
                      Select a supplier from the list to view details or add a new supplier.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Supplier Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newSupplier.email}
                onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setNewSupplier({ ...newSupplier, category: value })}
              >
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produce">Produce</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddSupplier}>
              Add Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Supplier Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newSupplier.email}
                onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newSupplier.category}
                onValueChange={(value) => setNewSupplier({ ...newSupplier, category: value })}
              >
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produce">Produce</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                className="bg nato-gray-900/50 border-gray-700 text-white"
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleEditSupplier}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Supplier Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Delete Supplier</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">{selectedSupplier?.name}</span>?
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeleteSupplier}>
              Delete Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              Operation Successful
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Supplier operation completed successfully.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}