"use client"

import React, { useState } from "react"
import { Package, Search, Check, AlertTriangle, Plus, Download, CheckCircle, XCircle } from "lucide-react"
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

export default function StockInwardApproval() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [rejectionReason, setRejectionReason] = useState("")

  // Sample stock inward data
  const stockInwardData = [
    {
      id: 1,
      grnNumber: "GRN001",
      poNumber: "PO001",
      supplier: "Fresh Farms",
      receiptDate: "2025-05-05",
      items: "Tomatoes, Lettuce",
      quantity: "50 kg",
      status: "Pending",
      notes: "Awaiting approval"
    },
    {
      id: 2,
      grnNumber: "GRN002",
      poNumber: "PO002",
      supplier: "Dairy Direct",
      receiptDate: "2025-05-06",
      items: "Milk, Cheese",
      quantity: "100 L",
      status: "Approved",
      notes: "Stock inward completed"
    },
    {
      id: 3,
      grnNumber: "GRN003",
      poNumber: "PO003",
      supplier: "Grain Co",
      receiptDate: "2025-05-07",
      items: "Flour, Rice",
      quantity: "200 kg",
      status: "Rejected",
      notes: "Quality issues detected"
    }
  ]

  const filteredStock = stockInwardData.filter(
    (stock) =>
      (stock.grnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
       stock.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || stock.status.toLowerCase() === statusFilter.toLowerCase())
  )

  const handleApproveStock = () => {
    // Here you would implement the actual stock approval logic
    setIsApproveDialogOpen(false)
    setIsSuccessDialogOpen(true)
    
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedStock(null)
    }, 2000)
  }

  const handleRejectStock = () => {
    // Here you would implement the actual stock rejection logic
    setIsRejectDialogOpen(false)
    setIsSuccessDialogOpen(true)
    setRejectionReason("")
    
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedStock(null)
    }, 2000)
  }

  const handleDownloadStockReport = (stock) => {
    const content = `
Stock Inward Report
-------------------
GRN Number: ${stock.grnNumber}
PO Number: ${stock.poNumber}
Supplier: ${stock.supplier}
Receipt Date: ${stock.receiptDate}
Items: ${stock.items}
Quantity: ${stock.quantity}
Status: ${stock.status}
Notes: ${stock.notes}
-------------------
Generated on: ${new Date().toLocaleString()}
    `
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Stock_Inward_${stock.grnNumber}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  // ...existing code...
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
              Stock Inward Approval
            </h2>
            <p className="text-gray-700 mt-2">Approve or reject incoming stock for inventory</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black text-2xl">Stock Inward Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by GRN Number or Supplier..."
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
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-gray-200">
                    <TableHead className="text-gray-700">GRN Number</TableHead>
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
                  {filteredStock.map((stock) => (
                    <motion.tr
                      key={stock.id}
                      whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                      className="border-t border-gray-200"
                      onClick={() => setSelectedStock(stock)}
                    >
                      <TableCell className="text-black font-medium">{stock.grnNumber}</TableCell>
                      <TableCell className="text-black">{stock.poNumber}</TableCell>
                      <TableCell className="text-black">{stock.supplier}</TableCell>
                      <TableCell className="text-black">{stock.receiptDate}</TableCell>
                      <TableCell className="text-black">{stock.items}</TableCell>
                      <TableCell className="text-black">{stock.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            stock.status === "Approved" ? "border-green-500/50 text-green-700" :
                            stock.status === "Rejected" ? "border-red-500/50 text-red-700" :
                            "border-yellow-500/50 text-yellow-700"
                          }
                        >
                          {stock.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {stock.status === "Pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-700 hover:bg-green-100"
                                onClick={() => {
                                  setSelectedStock(stock)
                                  setIsApproveDialogOpen(true)
                                }}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-700 hover:bg-red-100"
                                onClick={() => {
                                  setSelectedStock(stock)
                                  setIsRejectDialogOpen(true)
                                }}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-purple-700 hover:bg-purple-100"
                            onClick={() => handleDownloadStockReport(stock)}
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

          {selectedStock && (
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-black text-xl">Stock Inward Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700">GRN Number</Label>
                      <p className="text-black font-medium">{selectedStock.grnNumber}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">PO Number</Label>
                      <p className="text-black font-medium">{selectedStock.poNumber}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Supplier</Label>
                      <p className="text-black font-medium">{selectedStock.supplier}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Receipt Date</Label>
                      <p className="text-black font-medium">{selectedStock.receiptDate}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Items</Label>
                      <p className="text-black font-medium">{selectedStock.items}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Quantity</Label>
                      <p className="text-black font-medium">{selectedStock.quantity}</p>
                    </div>
                    <div>
                      <Label className="text-gray-700">Status</Label>
                      <Badge
                        variant="outline"
                        className={
                          selectedStock.status === "Approved" ? "border-green-500/50 text-green-700" :
                          selectedStock.status === "Rejected" ? "border-red-500/50 text-red-700" :
                          "border-yellow-500/50 text-yellow-700"
                        }
                      >
                        {selectedStock.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-700">Notes</Label>
                    <p className="text-black font-medium">{selectedStock.notes || "No additional notes"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Approve Stock Dialog */}
        <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
          <DialogContent className="bg-white border border-purple-500/20 text-black rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Approve Stock Inward
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700">
                Are you sure you want to approve the stock inward for{" "}
                <span className="font-medium text-black">{selectedStock?.grnNumber}</span>?
              </p>
              <p className="text-gray-500 text-sm mt-2">
                This will update the inventory with the received items.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-gray-300 rounded-lg text-gray-700" onClick={() => setIsApproveDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 rounded-lg text-white" onClick={handleApproveStock}>
                Approve Stock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Stock Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent className="bg-white border border-purple-500/20 text-black rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                Reject Stock Inward
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <p className="text-gray-700">
                Are you sure you want to reject the stock inward for{" "}
                <span className="font-medium text-black">{selectedStock?.grnNumber}</span>?
              </p>
              <div className="space-y-2">
                <Label htmlFor="rejectionReason">Reason for Rejection</Label>
                <Input
                  id="rejectionReason"
                  className="bg-gray-100 border-gray-300 text-black rounded-lg"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter reason for rejection"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-gray-300 rounded-lg text-gray-700" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 rounded-lg text-white" onClick={handleRejectStock} disabled={!rejectionReason}>
                Reject Stock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="bg-white border border-purple-500/20 text-black rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Operation Successful
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700">
                Stock inward operation completed successfully.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
// ...existing code...
}