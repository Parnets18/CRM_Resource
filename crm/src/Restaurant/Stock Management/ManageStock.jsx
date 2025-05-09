"use client"

import { useState } from "react"
import {
  ArrowUpCircle,
  Plus,
  Calendar,
  FileText
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import RestoNav from "../RestoNav"

export default function ManageStock() {
  const [stockEntries, setStockEntries] = useState([
    { id: 1, material: "", quantity: "", unit: "", price: "" }
  ])

  const addStockEntry = () => {
    setStockEntries([
      ...stockEntries,
      {
        id: stockEntries.length + 1,
        material: "",
        quantity: "",
        unit: "",
        price: ""
      }
    ])
  }

  const removeStockEntry = (id) => {
    if (stockEntries.length > 1) {
      setStockEntries(stockEntries.filter((entry) => entry.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted entries:", stockEntries)
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
            <h2 className="text-2xl font-bold text-white">Stock Inward Management</h2>
            <p className="text-gray-400">Record new stock from purchase or manual entry</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
            <Calendar className="w-5 h-5" />
          </Button>
        </div>

        <Tabs defaultValue="purchase" className="w-full">
          <TabsList className="bg-gray-900/50 border border-gray-800 mb-6">
            <TabsTrigger value="purchase" className="data-[state=active]:bg-purple-900/50">Purchase Entry</TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:bg-purple-900/50">Manual Entry</TabsTrigger>
          </TabsList>

          {/** Purchase Entry */}
          <TabsContent value="purchase" className="mt-0">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Purchase Stock Entry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="purchaseDate">Purchase Date</Label>
                      <Input id="purchaseDate" type="date" className="bg-gray-900/50 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber">Invoice Number</Label>
                      <Input id="invoiceNumber" placeholder="INV-2024-001" className="bg-gray-900/50 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="supplier-a">Supplier A</SelectItem>
                          <SelectItem value="supplier-b">Supplier B</SelectItem>
                          <SelectItem value="supplier-c">Supplier C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeLocation">Store Location</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main-store">Main Store</SelectItem>
                          <SelectItem value="kitchen-store">Kitchen Store</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <StockEntryList entries={stockEntries} addEntry={addStockEntry} removeEntry={removeStockEntry} />

                  <div className="flex justify-between items-center">
                    <Button type="button" variant="outline" className="border-gray-700 text-gray-300">
                      <FileText className="w-4 h-4 mr-2" /> Save as Draft
                    </Button>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      <ArrowUpCircle className="w-4 h-4 mr-2" /> Record Stock Inward
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/** Manual Entry */}
          <TabsContent value="manual" className="mt-0">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Manual Stock Entry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="entryDate">Entry Date</Label>
                      <Input id="entryDate" type="date" className="bg-gray-900/50 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referenceNumber">Reference Number</Label>
                      <Input id="referenceNumber" placeholder="REF-2024-001" className="bg-gray-900/50 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entryReason">Entry Reason</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="initial-stock">Initial Stock</SelectItem>
                          <SelectItem value="stock-adjustment">Stock Adjustment</SelectItem>
                          <SelectItem value="returned-goods">Returned Goods</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manualStoreLocation">Store Location</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main-store">Main Store</SelectItem>
                          <SelectItem value="kitchen-store">Kitchen Store</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <StockEntryList entries={stockEntries} addEntry={addStockEntry} removeEntry={removeStockEntry} />

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Additional notes about this entry" className="bg-gray-900/50 border-gray-700 text-white" />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      <ArrowUpCircle className="w-4 h-4 mr-2" /> Record Manual Entry
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Reusable component for listing stock entries
function StockEntryList({ entries, addEntry, removeEntry }) {
  return (
    <div className="border border-gray-800 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Stock Items</h3>
        <Button type="button" variant="outline" size="sm" className="border-purple-500/20 text-purple-400" onClick={addEntry}>
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      {entries.map((entry, index) => (
        <div key={entry.id} className="grid grid-cols-5 gap-4 mb-4">
          <div>
            <Select>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tomatoes">Tomatoes</SelectItem>
                <SelectItem value="cheese">Cheese</SelectItem>
                <SelectItem value="flour">Flour</SelectItem>
                <SelectItem value="olive-oil">Olive Oil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input type="number" placeholder="Quantity" className="bg-gray-900/50 border-gray-700 text-white" />
          </div>
          <div>
            <Select>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilogram (kg)</SelectItem>
                <SelectItem value="g">Gram (g)</SelectItem>
                <SelectItem value="liter">Liter</SelectItem>
                <SelectItem value="ml">Milliliter (ml)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input type="number" placeholder="Unit Price" className="bg-gray-900/50 border-gray-700 text-white" />
          </div>
          <div className="flex items-center">
            {entries.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-transparent"
                onClick={() => removeEntry(entry.id)}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
