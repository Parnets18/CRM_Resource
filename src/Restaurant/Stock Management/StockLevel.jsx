

import { useState } from "react"
import { ArrowUpCircle, ArrowDownCircle, Search, Filter, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import RestoNav from "../RestoNav"


export default function StockOperations() {
  const [isAddInwardDialogOpen, setIsAddInwardDialogOpen] = useState(false)
  const [isAddOutwardDialogOpen, setIsAddOutwardDialogOpen] = useState(false)

  const stockTransactions = [
    {
      id: 1,
      type: "inward",
      date: "2024-03-18",
      material: "Tomatoes",
      quantity: 20,
      unit: "kg",
      source: "Supplier A",
      location: "Main Store",
      reference: "PO-2024-001",
    },
    {
      id: 2,
      type: "outward",
      date: "2024-03-17",
      material: "Flour",
      quantity: 5,
      unit: "kg",
      source: "Recipe: Pizza Base",
      location: "Kitchen Store",
      reference: "RCP-2024-015",
    },
    {
      id: 3,
      type: "inward",
      date: "2024-03-16",
      material: "Cheese",
      quantity: 10,
      unit: "kg",
      source: "Supplier B",
      location: "Main Store",
      reference: "PO-2024-002",
    },
    {
      id: 4,
      type: "outward",
      date: "2024-03-15",
      material: "Tomatoes",
      quantity: 3,
      unit: "kg",
      source: "Recipe: Pasta Sauce",
      location: "Kitchen Store",
      reference: "RCP-2024-016",
    },
  ]

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
              <h2 className="text-2xl font-bold text-black">Stock Operations</h2>
              <p className="text-gray-700">Manage stock inward and outward</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setIsAddInwardDialogOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
                <ArrowUpCircle className="w-4 h-4 mr-2" /> Stock Inward
              </Button>
              <Button onClick={() => setIsAddOutwardDialogOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
                <ArrowDownCircle className="w-4 h-4 mr-2" /> Stock Outward
              </Button>
            </div>
          </div>

          <Card className="border border-purple-500/20 bg-white backdrop-blur-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="w-full bg-gray-100 border-gray-300 text-black pl-8"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] bg-gray-100 border-gray-300 text-black">
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="inward">Inward</SelectItem>
                    <SelectItem value="outward">Outward</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-300 text-gray-700">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700">
                  <FileText className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-gray-100 border border-gray-300 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                All Transactions
              </TabsTrigger>
              <TabsTrigger value="inward" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                Stock Inward
              </TabsTrigger>
              <TabsTrigger value="outward" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                Stock Outward
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-black">All Stock Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Material</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Quantity</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Source/Destination</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Location</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Reference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockTransactions.map((transaction) => (
                          <motion.tr
                            key={transaction.id}
                            whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                            className="border-b border-gray-200"
                          >
                            <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
                            <td className="py-3 px-4">
                              {transaction.type === "inward" ? (
                                <span className="flex items-center text-green-700">
                                  <ArrowUpCircle className="w-4 h-4 mr-1" /> Inward
                                </span>
                              ) : (
                                <span className="flex items-center text-red-700">
                                  <ArrowDownCircle className="w-4 h-4 mr-1" /> Outward
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-black">{transaction.material}</td>
                            <td className="py-3 px-4 text-gray-700">
                              {transaction.quantity} {transaction.unit}
                            </td>
                            <td className="py-3 px-4 text-gray-700">{transaction.source}</td>
                            <td className="py-3 px-4 text-gray-700">{transaction.location}</td>
                            <td className="py-3 px-4 text-gray-700">{transaction.reference}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inward" className="mt-0">
              <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-black">Stock Inward Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Material</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Quantity</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Supplier</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Location</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Reference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockTransactions
                          .filter((t) => t.type === "inward")
                          .map((transaction) => (
                            <motion.tr
                              key={transaction.id}
                              whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                              className="border-b border-gray-200"
                            >
                              <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
                              <td className="py-3 px-4 text-black">{transaction.material}</td>
                              <td className="py-3 px-4 text-gray-700">
                                {transaction.quantity} {transaction.unit}
                              </td>
                              <td className="py-3 px-4 text-gray-700">{transaction.source}</td>
                              <td className="py-3 px-4 text-gray-700">{transaction.location}</td>
                              <td className="py-3 px-4 text-gray-700">{transaction.reference}</td>
                            </motion.tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outward" className="mt-0">
              <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-black">Stock Outward Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Material</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Quantity</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Destination</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Location</th>
                          <th className="text-left py-3 px-4 text-gray-700 font-medium">Reference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockTransactions
                          .filter((t) => t.type === "outward")
                          .map((transaction) => (
                            <motion.tr
                              key={transaction.id}
                              whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                              className="border-b border-gray-200"
                            >
                              <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
                              <td className="py-3 px-4 text-black">{transaction.material}</td>
                              <td className="py-3 px-4 text-gray-700">
                                {transaction.quantity} {transaction.unit}
                              </td>
                              <td className="py-3 px-4 text-gray-700">{transaction.source}</td>
                              <td className="py-3 px-4 text-gray-700">{transaction.location}</td>
                              <td className="py-3 px-4 text-gray-700">{transaction.reference}</td>
                            </motion.tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Stock Inward Dialog */}
      <Dialog open={isAddInwardDialogOpen} onOpenChange={setIsAddInwardDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle>Add Stock Inward</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="material">Material</Label>
              <Select>
                <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="cheese">Cheese</SelectItem>
                  <SelectItem value="flour">Flour</SelectItem>
                  <SelectItem value="olive-oil">Olive Oil</SelectItem>
                  <SelectItem value="basil">Basil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Select>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="liter">Liter</SelectItem>
                    <SelectItem value="ml">Milliliter (ml)</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="bunch">Bunch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Store Location</Label>
                <Select>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-store">Main Store</SelectItem>
                    <SelectItem value="kitchen-store">Kitchen Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reference">Reference Number</Label>
                <Input id="reference" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" className="bg-gray-100 border-gray-300 text-black" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300 text-gray-700" onClick={() => setIsAddInwardDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Add Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Stock Outward Dialog */}
      <Dialog open={isAddOutwardDialogOpen} onOpenChange={setIsAddOutwardDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle>Add Stock Outward</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="material-out">Material</Label>
              <Select>
                <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="cheese">Cheese</SelectItem>
                  <SelectItem value="flour">Flour</SelectItem>
                  <SelectItem value="olive-oil">Olive Oil</SelectItem>
                  <SelectItem value="basil">Basil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity-out">Quantity</Label>
                <Input id="quantity-out" type="number" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit-out">Unit</Label>
                <Select>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="liter">Liter</SelectItem>
                    <SelectItem value="ml">Milliliter (ml)</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="bunch">Bunch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="destination">Destination/Recipe</Label>
                <Input id="destination" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location-out">Store Location</Label>
                <Select>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-store">Main Store</SelectItem>
                    <SelectItem value="kitchen-store">Kitchen Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reference-out">Reference Number</Label>
                <Input id="reference-out" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date-out">Date</Label>
                <Input id="date-out" type="date" className="bg-gray-100 border-gray-300 text-black" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300 text-gray-700" onClick={() => setIsAddOutwardDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Deduct Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
// ...existing code...
}
