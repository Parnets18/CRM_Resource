"use client"

import React, { useState } from "react"
import { Package, Search, Check, AlertTriangle, Plus, Edit, Trash2, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import RestoNav from "../RestoNav"

export default function GoodsReceiptNotes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [selectedGRN, setSelectedGRN] = useState(null)
  const [newGRN, setNewGRN] = useState({
    poNumber: "",
    supplier: "",
    receiptDate: "",
    items: "",
    status: "",
    quantity: "",
    notes: ""
  })
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample goods receipt notes data
  const goodsReceiptNotes = [
    {
      id: 1,
      poNumber: "PO001",
      supplier: "Fresh Farms",
      receiptDate: "2025-05-05",
      items: "Tomatoes, Lettuce",
      status: "Received",
      quantity: "50 kg",
      notes: "All items in good condition"
    },
    {
      id: 2,
      poNumber: "PO002",
      supplier: "Dairy Direct",
      receiptDate: "2025-05-06",
      items: "Milk, Cheese",
      status: "Partial",
      quantity: "100 L",
      notes: "Partial delivery due to stock shortage"
    },
    {
      id: 3,
      poNumber: "PO003",
      supplier: "Grain Co",
      receiptDate: "2025-05-07",
      items: "Flour, Rice",
      status: "Pending",
      quantity: "200 kg",
      notes: "Awaiting delivery confirmation"
    }
  ]

  const filteredGRNs = goodsReceiptNotes.filter(
    (grn) =>
      (grn.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
       grn.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || grn.status.toLowerCase() === statusFilter.toLowerCase())
  )

  const handleAddGRN = () => {
    setIsAddDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    setNewGRN({
      poNumber: "",
      supplier: "",
      receiptDate: "",
      items: "",
      status: "",
      quantity: "",
      notes: ""
    })

    setTimeout(() => {
      setIsSuccessDialogOpen(false)
    }, 2000)
  }

  const handleEditGRN = () => {
    setIsEditDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedGRN(null)
    }, 2000)
  }

  const handleDeleteGRN = () => {
    setIsDeleteDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedGRN(null)
    }, 2000)
  }

  const handleDownloadGRN = (grn) => {
    const content = `
Goods Receipt Note
-----------------
PO Number: ${grn.poNumber}
Supplier: ${grn.supplier}
Receipt Date: ${grn.receiptDate}
Items: ${grn.items}
Quantity: ${grn.quantity}
Status: ${grn.status}
Notes: ${grn.notes}
-----------------
Generated on: ${new Date().toLocaleString()}
    `
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `GRN_${grn.poNumber}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <RestoNav />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black flex items-center">
              <Package className="w-8 h-8 mr-3 text-purple-400" />
              Goods Receipt Notes
            </h2>
            <p className="text-gray-700 mt-2">Track and manage delivery receipts for your restaurant</p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add GRN
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black text-2xl">GRN Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by PO Number or Supplier..."
                    className="w-full bg-gray-100 border-gray-300 pl-10 text-black rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black w-full sm:w-48 rounded-lg">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Received">Received</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-gray-200">
                    <TableHead className="text-gray-700">PO Number</TableHead>
                    <TableHead className="text-gray-700">Supplier</TableHead>
                    <TableHead className="text-gray-700">Receipt Date</TableHead>
                    <TableHead className="text-gray-700">Items</TableHead>
                    <TableHead className="text-gray-700">Quantity</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                    <TableHead className="text-right text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGRNs.map((grn) => (
                    <motion.tr
                      key={grn.id}
                      whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                      className="border-t border-gray-200"
                      onClick={() => setSelectedGRN(grn)}
                    >
                      <TableCell className="text-black font-medium">{grn.poNumber}</TableCell>
                      <TableCell className="text-black">{grn.supplier}</TableCell>
                      <TableCell className="text-black">{grn.receiptDate}</TableCell>
                      <TableCell className="text-black">{grn.items}</TableCell>
                      <TableCell className="text-black">{grn.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            grn.status === "Received" ? "border-green-500/50 text-green-700" :
                            grn.status === "Partial" ? "border-yellow-500/50 text-yellow-700" :
                            "border-red-500/50 text-red-700"
                          }
                        >
                          {grn.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:bg-blue-100"
                            onClick={() => {
                              setNewGRN(grn)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:bg-red-100"
                            onClick={() => setIsDeleteDialogOpen(true)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-purple-600 hover:bg-purple-100"
                            onClick={() => handleDownloadGRN(grn)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedGRN && (
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-black text-xl">GRN Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700">PO Number</Label>
                      <p className="text-black font-medium">{selectedGRN.poNumber}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Supplier</Label>
                      <p className="text-black font-medium">{selectedGRN.supplier}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Receipt Date</Label>
                      <p className="text-black font-medium">{selectedGRN.receiptDate}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Quantity</Label>
                      <p className="text-black font-medium">{selectedGRN.quantity}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Items</Label>
                      <p className="text-black font-medium">{selectedGRN.items}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Status</Label>
                      <Badge
                        variant="outline"
                        className={
                          selectedGRN.status === "Received" ? "border-green-500/50 text-green-700" :
                          selectedGRN.status === "Partial" ? "border-yellow-500/50 text-yellow-700" :
                          "border-red-500/50 text-red-700"
                        }
                      >
                        {selectedGRN.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-700">Notes</Label>
                    <p className="text-black font-medium">{selectedGRN.notes || "No additional notes"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add GRN Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-white border border-purple-500/20 text-black rounded-xl max-w-md p-0">
            <DialogHeader>
              <DialogTitle className="text-xl px-5 py-1">Add New Goods Receipt Note</DialogTitle>
            </DialogHeader>
            <div className=" space-y-4 px-6">
              <div className="space-y-2">
                <Label htmlFor="poNumber">PO Number</Label>
                <Input
                  id="poNumber"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.poNumber}
                  onChange={(e) => setNewGRN({ ...newGRN, poNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select
                  onValueChange={(value) => setNewGRN({ ...newGRN, supplier: value })}
                >
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black rounded-lg">
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
                <Label htmlFor="receiptDate">Receipt Date</Label>
                <Input
                  id="receiptDate"
                  type="date"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.receiptDate}
                  onChange={(e) => setNewGRN({ ...newGRN, receiptDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Items Received</Label>
                <Input
                  id="items"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.items}
                  onChange={(e) => setNewGRN({ ...newGRN, items: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.quantity}
                  onChange={(e) => setNewGRN({ ...newGRN, quantity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) => setNewGRN({ ...newGRN, status: value })}
                >
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black rounded-lg">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Received">Received</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.notes}
                  onChange={(e) => setNewGRN({ ...newGRN, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="px-6 pb-4">
              <Button variant="outline" className="border-gray-300 rounded-lg text-gray-700" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 rounded-lg text-white" onClick={handleAddGRN}>
                Add GRN
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit GRN Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white border border-purple-500/20 text-black rounded-xl max-w-md p-0">
            <DialogHeader>
              <DialogTitle className="text-xl py-1 px-5">Edit Goods Receipt Note</DialogTitle>
            </DialogHeader>
            <div className=" space-y-4 px-6">
              <div className="space-y-2">
                <Label htmlFor="poNumber">PO Number</Label>
                <Input
                  id="poNumber"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.poNumber}
                  onChange={(e) => setNewGRN({ ...newGRN, poNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select
                  value={newGRN.supplier}
                  onValueChange={(value) => setNewGRN({ ...newGRN, supplier: value })}
                >
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black rounded-lg">
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
                <Label htmlFor="receiptDate">Receipt Date</Label>
                <Input
                  id="receiptDate"
                  type="date"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.receiptDate}
                  onChange={(e) => setNewGRN({ ...newGRN, receiptDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Items Received</Label>
                <Input
                  id="items"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.items}
                  onChange={(e) => setNewGRN({ ...newGRN, items: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.quantity}
                  onChange={(e) => setNewGRN({ ...newGRN, quantity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newGRN.status}
                  onValueChange={(value) => setNewGRN({ ...newGRN, status: value })}
                >
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black rounded-lg">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Received">Received</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={newGRN.notes}
                  onChange={(e) => setNewGRN({ ...newGRN, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="px-6 pb-4">
              <Button variant="outline" className="border-gray-300 rounded-lg text-gray-700" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white" onClick={handleEditGRN}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete GRN Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-white border border-purple-500/20 text-black rounded-xl max-w-sm p-0">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Confirm Delete Goods Receipt Note
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 px-6">
              <p className="text-gray-700">
                Are you sure you want to delete GRN{" "}
                <span className="font-medium text-black">{selectedGRN?.poNumber}</span>?
              </p>
              <p className="text-gray-500 text-sm mt-2">
                This action cannot be undone.
              </p>
            </div>
            <DialogFooter className="px-6 pb-4">
              <Button variant="outline" className="border-gray-300 rounded-lg text-gray-700" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 rounded-lg text-white" onClick={handleDeleteGRN}>
                Delete GRN
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="bg-white border border-purple-500/20 text-black rounded-xl max-w-xs p-0">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Operation Successful
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 px-6">
              <p className="text-gray-700">
                Goods receipt note operation completed successfully.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}