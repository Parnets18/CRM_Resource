"use client";

import { useState } from "react";
import {
  Truck,
  Search,
  Check,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  ShoppingCart,
  Package,
  X,
  Minus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RestoNav from "../RestoNav";

export default function SuppliersVendors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    category: "",
    address: "",
  });

  // Purchase order state
  const [purchaseOrder, setPurchaseOrder] = useState({
    items: [{ name: "", quantity: 1, unit: "", pricePerUnit: 0, total: 0 }]
  });

  // Sample suppliers data
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Fresh Farms",
      contact: "555-0101",
      email: "contact@freshfarms.com",
      category: "Produce",
      address: "123 Farm Road, Springfield",
      status: "Active",
      lastOrder: "2024-01-15"
    },
    {
      id: 2,
      name: "Dairy Direct",
      contact: "555-0102",
      email: "info@dairydirect.com",
      category: "Dairy",
      address: "456 Milk Lane, Springfield",
      status: "Active",
      lastOrder: "2024-01-10"
    },
    {
      id: 3,
      name: "Grain Co",
      contact: "555-0103",
      email: "sales@grainco.com",
      category: "Grains",
      address: "789 Wheat Street, Springfield",
      status: "Inactive",
      lastOrder: "2023-12-20"
    },
    {
      id: 4,
      name: "Meat Masters",
      contact: "555-0104",
      email: "orders@meatmasters.com",
      category: "Meat",
      address: "321 Butcher Ave, Springfield",
      status: "Active",
      lastOrder: "2024-01-18"
    },
    {
      id: 5,
      name: "Spice World",
      contact: "555-0105",
      email: "info@spiceworld.com",
      category: "Spices",
      address: "654 Flavor St, Springfield",
      status: "Active",
      lastOrder: "2024-01-12"
    }
  ]);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || 
      supplier.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleAddSupplier = () => {
    const newId = Math.max(...suppliers.map(s => s.id)) + 1;
    const supplierToAdd = {
      ...newSupplier,
      id: newId,
      status: "Active",
      lastOrder: "Never"
    };
    
    setSuppliers([...suppliers, supplierToAdd]);
    setIsAddDialogOpen(false);
    setIsSuccessDialogOpen(true);

    // Reset form
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      category: "",
      address: "",
    });

    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false);
    }, 2000);
  };

  const handleEditSupplier = () => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === selectedSupplier.id 
        ? { ...supplier, ...newSupplier }
        : supplier
    ));
    setIsEditDialogOpen(false);
    setIsSuccessDialogOpen(true);

    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false);
      setSelectedSupplier(null);
    }, 2000);
  };

  const handleDeleteSupplier = () => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== selectedSupplier.id));
    setIsDeleteDialogOpen(false);
    setIsSuccessDialogOpen(true);

    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false);
      setSelectedSupplier(null);
    }, 2000);
  };

  // Purchase Order functions
  const addOrderItem = () => {
    setPurchaseOrder({
      ...purchaseOrder,
      items: [...purchaseOrder.items, { name: "", quantity: 1, unit: "", pricePerUnit: 0, total: 0 }]
    });
  };

  const removeOrderItem = (index) => {
    if (purchaseOrder.items.length > 1) {
      const newItems = purchaseOrder.items.filter((_, i) => i !== index);
      setPurchaseOrder({ ...purchaseOrder, items: newItems });
    }
  };

  const updateOrderItem = (index, field, value) => {
    const newItems = [...purchaseOrder.items];
    newItems[index][field] = value;
    
    // Calculate total for this item
    if (field === 'quantity' || field === 'pricePerUnit') {
      newItems[index].total = newItems[index].quantity * newItems[index].pricePerUnit;
    }
    
    setPurchaseOrder({ ...purchaseOrder, items: newItems });
  };

  const getTotalOrderValue = () => {
    return purchaseOrder.items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const handleCreatePurchaseOrder = () => {
    // Here you would implement the actual purchase order creation logic
    setIsPurchaseOrderOpen(false);
    setIsSuccessDialogOpen(true);
    
    // Reset purchase order
    setPurchaseOrder({
      items: [{ name: "", quantity: 1, unit: "", pricePerUnit: 0, total: 0 }]
    });

    // Auto-close success dialog
    setTimeout(() => {
      setIsSuccessDialogOpen(false);
      setSelectedSupplier(null);
    }, 2000);
  };

  return (
    <div className="ml-64">
<div className="p-6 bg-gray-50 min-h-screen">
      <RestoNav />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Suppliers & Vendors
            </h2>
            <p className="text-gray-600 mt-2">
              Manage your restaurant's suppliers and vendors
            </p>
          </div>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Supplier
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search suppliers by name, category, or email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="produce">Produce</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="spices">Spices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="w-5 h-5 mr-2 text-purple-600" />
              Suppliers ({filteredSuppliers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Order</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier, index) => (
                    <tr 
                      key={supplier.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{supplier.name}</div>
                          <div className="text-sm text-gray-500">{supplier.address}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{supplier.contact}</td>
                      <td className="py-4 px-4 text-gray-900">{supplier.email}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          supplier.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {supplier.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{supplier.lastOrder}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedSupplier(supplier);
                              setIsPurchaseOrderOpen(true);
                            }}
                          >
                            <ShoppingCart className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedSupplier(supplier);
                              setNewSupplier(supplier);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => {
                              setSelectedSupplier(supplier);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredSuppliers.length === 0 && (
                <div className="text-center py-12">
                  <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Supplier Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                value={newSupplier.name}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={newSupplier.contact}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, contact: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newSupplier.email}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setNewSupplier({ ...newSupplier, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produce">Produce</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                  <SelectItem value="Spices">Spices</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newSupplier.address}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, address: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleAddSupplier}
            >
              Add Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Supplier Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                value={newSupplier.name}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={newSupplier.contact}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, contact: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newSupplier.email}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newSupplier.category}
                onValueChange={(value) =>
                  setNewSupplier({ ...newSupplier, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produce">Produce</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                  <SelectItem value="Spices">Spices</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newSupplier.address}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, address: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleEditSupplier}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Order Dialog */}
      <Dialog open={isPurchaseOrderOpen} onOpenChange={setIsPurchaseOrderOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Create Purchase Order - {selectedSupplier?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Supplier Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Contact:</span> {selectedSupplier?.contact}
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span> {selectedSupplier?.email}
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span> {selectedSupplier?.category}
                  </div>
                  <div>
                    <span className="text-gray-600">Address:</span> {selectedSupplier?.address}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Items to Purchase</h4>
                  <Button
                    onClick={addOrderItem}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {purchaseOrder.items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-6 gap-4 items-end">
                        <div className="col-span-2">
                          <Label>Item Name</Label>
                          <Input
                            placeholder="e.g. Tomatoes, Milk, Rice"
                            value={item.name}
                            onChange={(e) => updateOrderItem(index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateOrderItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>Unit</Label>
                          <Select
                            value={item.unit}
                            onValueChange={(value) => updateOrderItem(index, 'unit', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="lbs">lbs</SelectItem>
                              <SelectItem value="pcs">pcs</SelectItem>
                              <SelectItem value="boxes">boxes</SelectItem>
                              <SelectItem value="liters">liters</SelectItem>
                              <SelectItem value="gallons">gallons</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Price per Unit ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.pricePerUnit}
                            onChange={(e) => updateOrderItem(index, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div>
                            <Label>Total</Label>
                            <div className="text-lg font-medium text-green-600">
                              ${item.total.toFixed(2)}
                            </div>
                          </div>
                          {purchaseOrder.items.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeOrderItem(index)}
                              className="text-red-600 hover:text-red-700 mt-6"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Order Value:</span>
                    <span className="text-xl font-bold text-green-600">${getTotalOrderValue()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPurchaseOrderOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleCreatePurchaseOrder}
            >
              <Package className="w-4 h-4 mr-2" />
              Create Purchase Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Supplier Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete Supplier</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-medium text-black">
                {selectedSupplier?.name}
              </span>
              ?
            </p>
            <p className="text-gray-500 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteSupplier}
            >
              Delete Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              Operation Successful
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Operation completed successfully.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </div>
     
  );
}