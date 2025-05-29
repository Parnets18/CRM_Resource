import React, { useState } from "react";
import { Package2, Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RestoNav from "../RestoNav";

export default function RawMaterials() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const materials = [
    { id: 1, name: "Tomatoes", category: "Vegetables", unit: "kg", minLevel: 10, currentStock: 15 },
    { id: 2, name: "Cheese", category: "Dairy", unit: "kg", minLevel: 5, currentStock: 8 },
    { id: 3, name: "Flour", category: "Dry Goods", unit: "kg", minLevel: 15, currentStock: 20 },
    { id: 4, name: "Olive Oil", category: "Oils", unit: "liter", minLevel: 3, currentStock: 5 },
    { id: 5, name: "Basil", category: "Herbs", unit: "bunch", minLevel: 5, currentStock: 3 },
  ];

  const handleEdit = (material) => {
    setSelectedMaterial(material);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row mt-12">
        <RestoNav />
        <div className="flex-1 p-4 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-black">Raw Materials</h2>
              <p className="text-gray-700">Manage your inventory items</p>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Material
            </Button>
          </div>

          {/* Filter Bar */}
          <Card className="border border-purple-500/20 bg-white backdrop-blur-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search materials..."
                    className="w-full bg-gray-100 border-gray-300 text-black pl-8"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] bg-gray-100 border-gray-300 text-black">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="dry-goods">Dry Goods</SelectItem>
                    <SelectItem value="oils">Oils</SelectItem>
                    <SelectItem value="herbs">Herbs</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 w-full md:w-auto"
                >
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Materials Table - Responsive */}
          <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black">Materials List</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Unit</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Min Level</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Current Stock</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                      <th className="text-right py-3 px-4 text-gray-700 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material) => (
                      <motion.tr
                        key={material.id}
                        whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                        className="border-b border-gray-200"
                      >
                        <td className="py-3 px-4 text-black">{material.name}</td>
                        <td className="py-3 px-4 text-gray-700">{material.category}</td>
                        <td className="py-3 px-4 text-gray-700">{material.unit}</td>
                        <td className="py-3 px-4 text-gray-700">{material.minLevel}</td>
                        <td className="py-3 px-4 text-gray-700">{material.currentStock}</td>
                        <td className="py-3 px-4">
                          {material.currentStock < material.minLevel ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Low Stock</span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">In Stock</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-700 hover:text-purple-700"
                              onClick={() => handleEdit(material)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-700 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {materials.map((material) => (
                  <motion.div
                    key={material.id}
                    whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-black">{material.name}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-700 hover:text-purple-700"
                          onClick={() => handleEdit(material)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-700 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                      <span>Category: {material.category}</span>
                      <span>Unit: {material.unit}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                      <span>Min Level: {material.minLevel}</span>
                      <span>Current: {material.currentStock}</span>
                    </div>
                    <div>
                      {material.currentStock < material.minLevel ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Low Stock</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">In Stock</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Material Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Material Name</Label>
              <Input id="name" className="bg-gray-100 border-gray-300 text-black" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="dry-goods">Dry Goods</SelectItem>
                    <SelectItem value="oils">Oils</SelectItem>
                    <SelectItem value="herbs">Herbs</SelectItem>
                  </SelectContent>
                </Select>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minLevel">Minimum Stock Level</Label>
                <Input id="minLevel" type="number" className="bg-gray-100 border-gray-300 text-black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input id="currentStock" type="number" className="bg-gray-100 border-gray-300 text-black" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300 text-gray-700" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Material</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle>Edit Material</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Material Name</Label>
              <Input id="edit-name" className="bg-gray-100 border-gray-300 text-black" defaultValue={selectedMaterial?.name} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select defaultValue={selectedMaterial?.category?.toLowerCase()}>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="dry-goods">Dry Goods</SelectItem>
                    <SelectItem value="oils">Oils</SelectItem>
                    <SelectItem value="herbs">Herbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-unit">Unit</Label>
                <Select defaultValue={selectedMaterial?.unit}>
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                    <SelectValue />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-minLevel">Minimum Stock Level</Label>
                <Input id="edit-minLevel" type="number" className="bg-gray-100 border-gray-300 text-black" defaultValue={selectedMaterial?.minLevel} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-currentStock">Current Stock</Label>
                <Input id="edit-currentStock" type="number" className="bg-gray-100 border-gray-300 text-black" defaultValue={selectedMaterial?.currentStock} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300 text-gray-700" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Update Material</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}