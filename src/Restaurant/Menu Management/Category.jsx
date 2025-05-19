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
  const menuItems = [
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
  ];

  // State for active subcategory filter
  const [activeFilter, setActiveFilter] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(
    categories.reduce(
      (acc, category) => ({ ...acc, [category.name]: true }),
      {}
    )
  );

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

  return (
    <div className="min-h-screen bg-black lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex-1 p-8">
          {/* Header with restaurant info */}
          <RestoNav />
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Menu Management</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="border-green-500/50 text-green-400"
                >
                  {selectedRestaurant.name}
                </Badge>
                <span className="text-gray-400 text-sm">
                  {selectedRestaurant.location}
                </span>
              </div>
            </div>
            {/* <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
                        </Button> */}
          </div>

          {/* Subcategory filters */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <Button
              variant={!activeFilter ? "default" : "outline"}
              className={!activeFilter ? "bg-purple-600" : "border-gray-700"}
              onClick={() => setActiveFilter(null)}
            >
              All Items
            </Button>
            <Button
              variant={activeFilter === "Veg" ? "default" : "outline"}
              className={
                activeFilter === "Veg" ? "bg-green-600" : "border-gray-700"
              }
              onClick={() => setActiveFilter("Veg")}
            >
              <Leaf className="w-4 h-4 mr-2" />
              Veg
            </Button>
            <Button
              variant={activeFilter === "Non-Veg" ? "default" : "outline"}
              className={
                activeFilter === "Non-Veg" ? "bg-red-600" : "border-gray-700"
              }
              onClick={() => setActiveFilter("Non-Veg")}
            >
              <Beef className="w-4 h-4 mr-2" />
              Non-Veg
            </Button>
            <Button
              variant={activeFilter === "Hot" ? "default" : "outline"}
              className={
                activeFilter === "Hot" ? "bg-orange-600" : "border-gray-700"
              }
              onClick={() => setActiveFilter("Hot")}
            >
              Hot Drinks
            </Button>
            <Button
              variant={activeFilter === "Cold" ? "default" : "outline"}
              className={
                activeFilter === "Cold" ? "bg-blue-600" : "border-gray-700"
              }
              onClick={() => setActiveFilter("Cold")}
            >
              Cold Drinks
            </Button>
          </div>

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
                  className="border border-purple-500/20 bg-black/80 backdrop-blur-sm"
                >
                  <CardHeader
                    className="p-4 cursor-pointer"
                    onClick={() => toggleCategory(category.name)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white flex items-center gap-3">
                        {category.name}
                        <Badge
                          variant="secondary"
                          className="bg-purple-900/30 text-purple-300"
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
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-gray-300 w-[40%]">
                              Item
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Type
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Price
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Status
                            </TableHead>
                            <TableHead className="text-right text-gray-300">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itemsInCategory.map((item) => (
                            <motion.tr
                              key={item.id}
                              whileHover={{
                                backgroundColor: "rgba(107, 33, 168, 0.2)",
                              }}
                              className="border-t border-gray-800"
                            >
                              <TableCell>
                                <div className="font-medium text-white">
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
                                    className="border-green-500/50 text-green-400"
                                  >
                                    <Leaf className="w-3 h-3 mr-1" />
                                    Veg
                                  </Badge>
                                ) : item.subcategory === "Non-Veg" ? (
                                  <Badge
                                    variant="outline"
                                    className="border-red-500/50 text-red-400"
                                  >
                                    <Beef className="w-3 h-3 mr-1" />
                                    Non-Veg
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="border-purple-500/50 text-purple-400"
                                  >
                                    {item.subcategory}
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-white">
                                ${item.price.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    item.status === "Available"
                                      ? "border-green-500/50 text-green-400"
                                      : "border-yellow-500/50 text-yellow-400"
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
                                    className="text-purple-400 hover:bg-purple-900/20"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-400 hover:bg-red-900/20"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
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
