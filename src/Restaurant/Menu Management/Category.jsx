import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  Utensils,
  ChevronDown,
  ChevronUp,
  Leaf,
  Beef,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import RestoNav from "../RestoNav";

export default function MenuManagement() {
  // Auto-selected restaurant
  const [selectedRestaurant] = useState({
    id: 1,
    name: "Urban Bites",
    location: "Downtown",
  });

  // Menu categories with subcategories
  const categories = [
    {
      name: "Starters",
      subcategories: ["Veg", "Non-Veg"],
      expanded: true,
    },
    {
      name: "Main Course",
      subcategories: ["Veg", "Non-Veg"],
      expanded: true,
    },
    {
      name: "Beverages",
      subcategories: ["Hot", "Cold"],
      expanded: true,
    },
  ];

  // Sample menu data with category and subcategory
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Spring Rolls",
      category: "Starters",
      subcategory: "Veg",
      price: 5.99,
      status: "Available",
      ingredients: "Vegetables, wrappers",
    },
    {
      id: 2,
      name: "Chicken Wings",
      category: "Starters",
      subcategory: "Non-Veg",
      price: 8.99,
      status: "Available",
      ingredients: "Chicken, spices",
    },
    {
      id: 3,
      name: "Paneer Tikka",
      category: "Main Course",
      subcategory: "Veg",
      price: 12.99,
      status: "Available",
      ingredients: "Paneer, spices",
    },
    {
      id: 4,
      name: "Butter Chicken",
      category: "Main Course",
      subcategory: "Non-Veg",
      price: 14.99,
      status: "Available",
      ingredients: "Chicken, butter, spices",
    },
    {
      id: 5,
      name: "Masala Chai",
      category: "Beverages",
      subcategory: "Hot",
      price: 2.99,
      status: "Available",
      ingredients: "Tea, spices, milk",
    },
    {
      id: 6,
      name: "Mango Lassi",
      category: "Beverages",
      subcategory: "Cold",
      price: 3.99,
      status: "Available",
      ingredients: "Yogurt, mango",
    },
  ]);

  // State for active subcategory filter
  const [activeFilter, setActiveFilter] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(
    categories.reduce(
      (acc, category) => ({ ...acc, [category.name]: true }),
      {}
    )
  );

  // Edit modal state
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    ingredients: "",
    status: "",
    subcategory: "",
  });

  // Toggle category expansion
  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  // Filter menu items by subcategory if active filter is set
  const filteredItems = activeFilter
    ? menuItems.filter((item) => item.subcategory === activeFilter)
    : menuItems;

  // Open edit modal and populate form
  const openEditModal = (item) => {
    setEditItem(item);
    setEditForm({
      name: item.name,
      price: item.price,
      ingredients: item.ingredients,
      status: item.status,
      subcategory: item.subcategory,
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes (replace with your update logic)
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === editItem.id
          ? { ...item, ...editForm, price: parseFloat(editForm.price) }
          : item
      )
    );
    setEditItem(null);
  };

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex-1 p-4 md:p-8">
          {/* Header with restaurant info */}
          <RestoNav />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-2">
            <div>
              <h2 className="text-2xl font-bold text-black">Menu Management</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="border-green-500/50 text-green-700 bg-green-50"
                >
                  {selectedRestaurant.name}
                </Badge>
                <span className="text-gray-500 text-sm">
                  {selectedRestaurant.location}
                </span>
              </div>
            </div>
          </div>

          {/* Subcategory filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={!activeFilter ? "default" : "outline"}
              className={
                !activeFilter
                  ? "bg-purple-600 text-white"
                  : "border-gray-300 text-gray-700"
              }
              onClick={() => setActiveFilter(null)}
            >
              All Items
            </Button>
            <Button
              variant={activeFilter === "Veg" ? "default" : "outline"}
              className={
                activeFilter === "Veg"
                  ? "bg-green-600 text-white"
                  : "border-gray-300 text-gray-700"
              }
              onClick={() => setActiveFilter("Veg")}
            >
              <Leaf className="w-4 h-4 mr-2" />
              Veg
            </Button>
            <Button
              variant={activeFilter === "Non-Veg" ? "default" : "outline"}
              className={
                activeFilter === "Non-Veg"
                  ? "bg-red-600 text-white"
                  : "border-gray-300 text-gray-700"
              }
              onClick={() => setActiveFilter("Non-Veg")}
            >
              <Beef className="w-4 h-4 mr-2" />
              Non-Veg
            </Button>
            <Button
              variant={activeFilter === "Hot" ? "default" : "outline"}
              className={
                activeFilter === "Hot"
                  ? "bg-orange-600 text-white"
                  : "border-gray-300 text-gray-700"
              }
              onClick={() => setActiveFilter("Hot")}
            >
              Hot Drinks
            </Button>
            <Button
              variant={activeFilter === "Cold" ? "default" : "outline"}
              className={
                activeFilter === "Cold"
                  ? "bg-blue-600 text-white"
                  : "border-gray-300 text-gray-700"
              }
              onClick={() => setActiveFilter("Cold")}
            >
              Cold Drinks
            </Button>
          </div>

          {/* Edit Modal */}
          {editItem && (
            <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-xl shadow-2xl w-full max-w-md"
                style={{ maxHeight: 400, overflowY: "auto" }}
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-black">
                    Edit Menu Item
                  </h3>
                  <button
                    onClick={() => setEditItem(null)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleEditSubmit} className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Ingredients
                    </label>
                    <input
                      type="text"
                      name="ingredients"
                      value={editForm.ingredients}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Subcategory
                    </label>
                    <select
                      name="subcategory"
                      value={editForm.subcategory}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      required
                    >
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Hot">Hot</option>
                      <option value="Cold">Cold</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditItem(null)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Menu Items by Category */}
          <div className="space-y-6">
            {categories.map((category) => {
              const itemsInCategory = filteredItems.filter(
                (item) => item.category === category.name
              );
              if (itemsInCategory.length === 0) return null;

              return (
                <Card
                  key={category.name}
                  className="border border-purple-500/20 bg-white backdrop-blur-sm"
                >
                  <CardHeader
                    className="p-4 cursor-pointer"
                    onClick={() => toggleCategory(category.name)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-black flex items-center gap-3">
                        {category.name}
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-700"
                        >
                          {itemsInCategory.length} items
                        </Badge>
                      </CardTitle>
                      {expandedCategories[category.name] ? (
                        <ChevronUp className="w-5 h-5 text-purple-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                  </CardHeader>

                  {expandedCategories[category.name] && (
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="text-gray-700 w-[40%] min-w-[120px]">
                                Item
                              </TableHead>
                              <TableHead className="text-gray-700 min-w-[80px]">
                                Type
                              </TableHead>
                              <TableHead className="text-gray-700 min-w-[80px]">
                                Price
                              </TableHead>
                              <TableHead className="text-gray-700 min-w-[80px]">
                                Status
                              </TableHead>
                              <TableHead className="text-right text-gray-700 min-w-[80px]">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {itemsInCategory.map((item) => (
                              <motion.tr
                                key={item.id}
                                whileHover={{
                                  backgroundColor: "rgba(168, 85, 247, 0.08)",
                                }}
                                className="border-t border-gray-200"
                              >
                                <TableCell>
                                  <div className="font-medium text-black">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {item.ingredients}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {item.subcategory === "Veg" ? (
                                    <Badge
                                      variant="outline"
                                      className="border-green-500/50 text-green-700 bg-green-50"
                                    >
                                      <Leaf className="w-3 h-3 mr-1" />
                                      Veg
                                    </Badge>
                                  ) : item.subcategory === "Non-Veg" ? (
                                    <Badge
                                      variant="outline"
                                      className="border-red-500/50 text-red-700 bg-red-50"
                                    >
                                      <Beef className="w-3 h-3 mr-1" />
                                      Non-Veg
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="border-purple-500/50 text-purple-700 bg-purple-50"
                                    >
                                      {item.subcategory}
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-black">
                                  ${item.price.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      item.status === "Available"
                                        ? "border-green-500/50 text-green-700 bg-green-50"
                                        : "border-yellow-500/50 text-yellow-700 bg-yellow-50"
                                    }
                                  >
                                    {item.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-purple-700 hover:bg-purple-100"
                                      onClick={() => openEditModal(item)}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-700 hover:bg-red-100"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}