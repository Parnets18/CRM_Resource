import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, Utensils, ChevronDown, ChevronUp, Leaf, Beef, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RestoNav from '../RestoNav';

// Sample data
const restaurants = [
  { id: 1, name: "Urban Bites", location: "Downtown" },
  { id: 2, name: "Spice Garden", location: "Midtown" },
];

const menuItems = [
  { 
    id: 1, 
    name: "Margherita Pizza", 
    category: "Main Course", 
    subcategory: "Veg", 
    pricing: {
      small: 9.99,
      medium: 12.99,
      large: 15.99
    },
    status: "Available" 
  },
  { 
    id: 2, 
    name: "Chicken Tikka", 
    category: "Main Course", 
    subcategory: "Non-Veg", 
    pricing: {
      standard: 14.99
    },
    status: "Available" 
  },
  { 
    id: 3, 
    name: "Garlic Bread", 
    category: "Starters", 
    subcategory: "Veg", 
    pricing: {
      half: 4.99,
      full: 7.99
    },
    status: "Available" 
  },
];

const recipes = [
  {
    id: 1,
    dishId: 1,
    name: "Margherita Pizza Recipe",
    variants: {
      small: [
        { name: "Flour", quantity: 150, unit: "g" },
        { name: "Tomato Sauce", quantity: 30, unit: "ml" },
        { name: "Mozzarella", quantity: 80, unit: "g" },
      ],
      medium: [
        { name: "Flour", quantity: 200, unit: "g" },
        { name: "Tomato Sauce", quantity: 50, unit: "ml" },
        { name: "Mozzarella", quantity: 100, unit: "g" },
      ],
      large: [
        { name: "Flour", quantity: 250, unit: "g" },
        { name: "Tomato Sauce", quantity: 70, unit: "ml" },
        { name: "Mozzarella", quantity: 120, unit: "g" },
      ]
    }
  },
  // ... other recipes
];

export default function MenuManagement() {
  // State management
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [rawMaterials, setRawMaterials] = useState([]);

  // Auto-select first restaurant on load
  useEffect(() => {
    setSelectedRestaurant(restaurants[0]);
  }, []);

  // Handle dish selection
  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
    setSelectedVariant(null);
    // Find recipe for selected dish
    const dishRecipe = recipes.find(recipe => recipe.dishId === dish.id);
    if (dishRecipe) {
      // Set default variant if exists
      const variants = Object.keys(dish.pricing);
      if (variants.length > 0) {
        setSelectedVariant(variants[0]);
        setRawMaterials(dishRecipe.variants[variants[0]] || []);
      } else {
        setRawMaterials(dishRecipe.ingredients || []);
      }
    }
  };

  // Handle variant selection
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    const dishRecipe = recipes.find(recipe => recipe.dishId === selectedDish.id);
    if (dishRecipe && dishRecipe.variants) {
      setRawMaterials(dishRecipe.variants[variant] || []);
    }
  };

  // Calculate total raw materials
  const calculateTotalMaterials = () => {
    return rawMaterials.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  // Render price display
  const renderPrice = (pricing) => {
    if (!pricing) return null;
    
    const variants = Object.keys(pricing);
    if (variants.length === 1) {
      return `$${pricing[variants[0]].toFixed(2)}`;
    }
    
    return (
      <div className="flex gap-1">
        {variants.map(variant => (
          <Badge 
            key={variant} 
            variant="outline" 
            className={`border-purple-500/50 text-xs ${selectedVariant === variant ? 'bg-purple-900/30' : ''}`}
          >
            {variant}: ${pricing[variant].toFixed(2)}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black lg:ml-64">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>
      <RestoNav/>

      <div className="relative z-10 p-8">
        {/* Restaurant Selection */}
        <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white">Restaurant Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedRestaurant.id.toString()}
              onValueChange={(value) => {
                const restaurant = restaurants.find(r => r.id.toString() === value);
                setSelectedRestaurant(restaurant);
              }}
            >
              <SelectTrigger className="w-[300px] bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select restaurant" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {restaurants.map(restaurant => (
                  <SelectItem 
                    key={restaurant.id} 
                    value={restaurant.id.toString()}
                    className="hover:bg-purple-900/30"
                  >
                    {restaurant.name} - {restaurant.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Menu Items</CardTitle>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Dish
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-gray-300">Dish</TableHead>
                      <TableHead className="text-gray-300">Category</TableHead>
                      <TableHead className="text-gray-300">Price</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-right text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <motion.tr
                        key={item.id}
                        whileHover={{ backgroundColor: "rgba(107, 33, 168, 0.2)" }}
                        className={`border-t border-gray-800 ${selectedDish?.id === item.id ? 'bg-purple-900/30' : ''}`}
                        onClick={() => handleDishSelect(item)}
                      >
                        <TableCell className="font-medium text-white">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {renderPrice(item.pricing)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.status === "Available" ? "default" : "destructive"}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-purple-400 hover:bg-purple-900/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowRecipeModal(true);
                            }}
                          >
                            <ClipboardList className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Dish Details & Raw Materials */}
          <div className="space-y-6">
            {/* Selected Dish */}
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Selected Dish</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDish ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">{selectedDish.name}</h3>
                    
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                        {selectedDish.category}
                      </Badge>
                      <Badge variant="outline" className={
                        selectedDish.subcategory === "Veg" 
                          ? "border-green-500/50 text-green-400" 
                          : "border-red-500/50 text-red-400"
                      }>
                        {selectedDish.subcategory}
                      </Badge>
                    </div>

                    {/* Variant Selection */}
                    {selectedDish.pricing && Object.keys(selectedDish.pricing).length > 1 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-400">Select Variant:</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.keys(selectedDish.pricing).map(variant => (
                            <Button
                              key={variant}
                              variant={selectedVariant === variant ? "default" : "outline"}
                              className={
                                selectedVariant === variant 
                                  ? "bg-purple-600" 
                                  : "border-gray-700 hover:bg-gray-800"
                              }
                              onClick={() => handleVariantSelect(variant)}
                            >
                              {variant.charAt(0).toUpperCase() + variant.slice(1)}: 
                              ${selectedDish.pricing[variant].toFixed(2)}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Display selected price */}
                    {selectedVariant ? (
                      <p className="text-white text-lg">
                        Price: ${selectedDish.pricing[selectedVariant].toFixed(2)}
                      </p>
                    ) : selectedDish.pricing && Object.keys(selectedDish.pricing).length === 1 ? (
                      <p className="text-white text-lg">
                        Price: ${selectedDish.pricing[Object.keys(selectedDish.pricing)[0]].toFixed(2)}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-gray-400">Select a dish to view details</p>
                )}
              </CardContent>
            </Card>

            {/* Raw Materials */}
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">
                    Raw Materials
                    {selectedVariant && ` (${selectedVariant})`}
                  </CardTitle>
                  {selectedDish && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                      onClick={() => setShowRecipeModal(true)}
                    >
                      Edit Recipe
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {selectedDish ? (
                  rawMaterials.length > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 font-medium text-gray-400 pb-2 border-b border-gray-800">
                        <div>Ingredient</div>
                        <div className="text-center">Quantity</div>
                        <div className="text-right">Unit</div>
                      </div>
                      {rawMaterials.map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid grid-cols-3 gap-2 text-sm"
                        >
                          <div className="text-white">{item.name}</div>
                          <div className="text-center text-gray-300">{item.quantity}</div>
                          <div className="text-right text-gray-300">{item.unit}</div>
                        </motion.div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-gray-800 text-right">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                          Total: {calculateTotalMaterials()} units
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">No recipe attached</p>
                  )
                ) : (
                  <p className="text-gray-400">Select a dish to view raw materials</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      {showRecipeModal && selectedDish && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-purple-500/20 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Recipe for {selectedDish.name}
                </h3>
                <button 
                  onClick={() => setShowRecipeModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Variant Tabs */}
                {selectedDish.pricing && Object.keys(selectedDish.pricing).length > 1 && (
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-2">Recipe Variants:</p>
                    <div className="flex border-b border-gray-800">
                      {Object.keys(selectedDish.pricing).map(variant => (
                        <button
                          key={variant}
                          className={`px-4 py-2 text-sm font-medium ${selectedVariant === variant ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                          onClick={() => setSelectedVariant(variant)}
                        >
                          {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Recipe Name
                  </label>
                  <Input 
                    defaultValue={recipes.find(r => r.dishId === selectedDish.id)?.name || ""}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Ingredients for {selectedVariant || 'Standard'} portion
                  </label>
                  <div className="space-y-2">
                    {rawMaterials.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-center">
                        <Input
                          defaultValue={item.name}
                          className="col-span-5 bg-gray-800 border-gray-700 text-white"
                          placeholder="Ingredient"
                        />
                        <Input
                          defaultValue={item.quantity}
                          type="number"
                          className="col-span-3 bg-gray-800 border-gray-700 text-white"
                          placeholder="Qty"
                        />
                        <Select defaultValue={item.unit}>
                          <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700 text-white">
                            <SelectItem value="g">g</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="ml">ml</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="pcs">pcs</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="col-span-1 text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Ingredient
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => setShowRecipeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Save Recipe
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}