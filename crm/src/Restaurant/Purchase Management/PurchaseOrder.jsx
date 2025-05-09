"use client"

import { useState } from "react"
import { Package, Search, Check, AlertTriangle, Plus, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RestoNav from "../RestoNav"

export default function PurchaseOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [selectedPO, setSelectedPO] = useState(null)
  const [newPO, setNewPO] = useState({
    supplier: "",
    orderDate: "",
    deliveryDate: "",
    status: "",
    total: ""
  })

  // Sample purchase orders data
  const purchaseOrders = [
    {
      id: 1,
      supplier: "Fresh Farms",
      orderDate: "2025-05-01",
      deliveryDate: "2025-05-05",
      status: "Pending",
      total: "$500.00"
    },
    {
      id: 2,
      supplier: "Dairy Direct",
      orderDate: "2025-05-02",
      deliveryDate: "2025-05-06",
      status: "Delivered",
      total: "$300.00"
    },
    {
      id: 3,
      supplier: "Grain Co",
      orderDate: "2025-05-03",
      deliveryDate: "2025-05-07",
      status: "In Transit",
      total: "$450.00"
    }
  ]

  const filteredPOs = purchaseOrders.filter(
    (po) =>
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPO = () => {
    // Here you would implement the actual PO addition logic
    setIsAddDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    // Reset form
    setNewPO({
      supplier: "",
      orderDate: "",
      deliveryDate: "",
      status: "",
      total: ""
    })

    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
    }, 2000)
  }

  const handleEditPO = () => {
    // Here you would implement the actual PO edit logic
    setIsEditDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedPO(null)
    }, 2000)
  }

  const handleDeletePO = () => {
    // Here you would implement the actual PO deletion logic
    setIsDeleteDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedPO(null)
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
            <h2 className="text-2xl font-bold text-white">Purchase Orders</h2>
            <p className="text-gray-400">Manage your restaurant's purchase orders</p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Create PO
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-white">PO List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search POs..."
                      className="w-full bg-gray-900/50 border-gray-700 pl-8 text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label>Status Filter</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label>Purchase Orders</Label>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                      {filteredPOs.map((po) => (
                        <div
                          key={po.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedPO?.id === po.id
                              ? "bg-purple-900/50 text-white"
                              : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                          }`}
                          onClick={() => setSelectedPO(po)}
                        >
                          <div className="flex items-center">
                            <Package className="w-4 h-4 mr-2 text-purple-400" />
                            <span>{po.supplier}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Status: {po.status} • Total: {po.total}
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
                <CardTitle className="text-white">PO Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPO ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-white flex items-center">
                        <Package className="w-5 h-5 mr-2 text-purple-400" />
                        {selectedPO.supplier}
                      </h3>
                      <div className="space-x-2">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            setNewPO(selectedPO)
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
                        <Label>Order Date</Label>
                        <p className="text-gray-300">{selectedPO.orderDate}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Delivery Date</Label>
                        <p className="text-gray-300">{selectedPO.deliveryDate}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <p className="text-gray-300">{selectedPO.status}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Total</Label>
                        <p className="text-gray-300">{selectedPO.total}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="w-12 h-12 text-gray-700 mb-4" />
                    <h3 className="text-lg font-medium text-gray-400">No PO Selected</h3>
                    <p className="text-gray-500 mt-2 max-w-md">
                      Select a purchase order from the list to view details or create a new PO.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add PO Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Create New Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select
                onValueChange={(value) => setNewPO({ ...newPO, supplier: value })}
              >
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresh Farms">Fresh Farms</SelectItem>
                  <SelectItem value="Dairy Direct">Dairy Direct</SelectItem>
                  <SelectItem value="Grain Co">Grain Co</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date</Label>
              <Input
                id="orderDate"
                type="date"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newPO.orderDate}
                onChange={(e) => setNewPO({ ...newPO, orderDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newPO.deliveryDate}
                onChange={(e) => setNewPO({ ...newPO, deliveryDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => setNewPO({ ...newPO, status: value })}
              >
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Total Amount</Label>
              <Input
                id="total"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newPO.total}
                onChange={(e) => setNewPO({ ...newPO, total: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddPO}>
              Create PO
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit PO Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Edit Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select
                value={newPO.supplier}
                onValueChange={(value) => setNewPO({ ...newPO, supplier: value })}
              >
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresh Farms">Fresh Farms</SelectItem>
                  <SelectItem value="Dairy Direct">Dairy Direct</SelectItem>
                  <SelectItem value="Grain Co">Grain Co</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date</Label>
              <Input
                id="orderDate"
                type="date"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newPO.orderDate}
                onChange={(e) => setNewPO({ ...newPO, orderDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newPO.deliveryDate}
                onChange={(e) => setNewPO({ ...newPO, deliveryDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newPO.status}
                onValueChange={(value) => setNewPO({ ...newPO, status: value })}
              >
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Total Amount</Label>
              <Input
                id="total"
                className="bg-gray-900/50 border-gray-700 text-white"
                value={newPO.total}
                onChange={(e) => setNewPO({ ...newPO, total: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleEditPO}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete PO Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Delete Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Are you sure you want to delete the PO for{" "}
              <span className="font-medium text-white">{selectedPO?.supplier}</span>?
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeletePO}>
              Delete PO
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
              Purchase order operation completed successfully.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}