"use client";

import { useState } from "react";
import {
  ArrowDownCircle,
  Utensils,
  Search,
  Check,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import RestoNav from "../RestoNav";

export default function RecipeStockDeduction() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isLowStockDialogOpen, setIsLowStockDialogOpen] = useState(false);

  // Sample recipes data
  const recipes = [
    {
      id: 1,
      name: "Pizza Margherita",
      category: "Pizza",
      ingredients: [
        {
          material: "Flour",
          quantity: 250,
          unit: "g",
          inStock: 5000,
          minLevel: 1000,
        },
        {
          material: "Tomatoes",
          quantity: 150,
          unit: "g",
          inStock: 2000,
          minLevel: 1000,
        },
        {
          material: "Cheese",
          quantity: 100,
          unit: "g",
          inStock: 800,
          minLevel: 1000,
        },
        {
          material: "Basil",
          quantity: 5,
          unit: "g",
          inStock: 100,
          minLevel: 50,
        },
        {
          material: "Olive Oil",
          quantity: 15,
          unit: "ml",
          inStock: 500,
          minLevel: 200,
        },
      ],
    },
    {
      id: 2,
      name: "Pasta Arrabbiata",
      category: "Pasta",
      ingredients: [
        {
          material: "Pasta",
          quantity: 200,
          unit: "g",
          inStock: 3000,
          minLevel: 1000,
        },
        {
          material: "Tomatoes",
          quantity: 200,
          unit: "g",
          inStock: 2000,
          minLevel: 1000,
        },
        {
          material: "Garlic",
          quantity: 10,
          unit: "g",
          inStock: 300,
          minLevel: 100,
        },
        {
          material: "Chili Flakes",
          quantity: 5,
          unit: "g",
          inStock: 150,
          minLevel: 50,
        },
        {
          material: "Olive Oil",
          quantity: 20,
          unit: "ml",
          inStock: 500,
          minLevel: 200,
        },
      ],
    },
    {
      id: 3,
      name: "Tiramisu",
      category: "Dessert",
      ingredients: [
        {
          material: "Mascarpone",
          quantity: 250,
          unit: "g",
          inStock: 500,
          minLevel: 250,
        },
        {
          material: "Coffee",
          quantity: 100,
          unit: "ml",
          inStock: 1000,
          minLevel: 500,
        },
        {
          material: "Ladyfingers",
          quantity: 100,
          unit: "g",
          inStock: 300,
          minLevel: 200,
        },
        {
          material: "Cocoa Powder",
          quantity: 10,
          unit: "g",
          inStock: 100,
          minLevel: 50,
        },
      ],
    },
  ];

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setQuantity(1);
  };

  const handleDeductStock = () => {
    // Check if any ingredients would go below minimum level
    const lowStockIngredients = selectedRecipe.ingredients.filter(
      (ingredient) =>
        ingredient.inStock - ingredient.quantity * quantity <
        ingredient.minLevel
    );

    if (lowStockIngredients.length > 0) {
      setIsLowStockDialogOpen(true);
    } else {
      setIsConfirmDialogOpen(true);
    }
  };

  const confirmDeduction = () => {
    // Here you would implement the actual stock deduction logic
    // For each ingredient in the recipe, deduct the quantity * number of recipes from stock

    setIsConfirmDialogOpen(false);
    setIsSuccessDialogOpen(true);

    // Reset after success
    setTimeout(() => {
      setIsSuccessDialogOpen(false);
      setSelectedRecipe(null);
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>
      <RestoNav />
      <div className="relative z-10 max-w-5xl mx-auto lg:ml-[16rem]">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 mt-12">
          <div>
            <h2 className="text-2xl font-bold text-black">
              Recipe Stock Deduction
            </h2>
            <p className="text-gray-700">
              Automatically deduct stock based on recipes used
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
            <ShoppingCart className="w-4 h-4 mr-2" /> View Sales
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recipe List */}
          <div className="md:col-span-1">
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-black">Select Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search recipes..."
                      className="w-full bg-gray-100 border-gray-300 pl-8 text-black"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label>Category Filter</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="pizza">Pizza</SelectItem>
                        <SelectItem value="pasta">Pasta</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label>Recipe List</Label>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                      {filteredRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedRecipe?.id === recipe.id
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => handleRecipeSelect(recipe)}
                        >
                          <div className="flex items-center">
                            <Utensils className="w-4 h-4 mr-2 text-purple-400" />
                            <span>{recipe.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Category: {recipe.category} •{" "}
                            {recipe.ingredients.length} ingredients
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recipe Details & Deduction */}
          <div className="md:col-span-2">
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">
                  Recipe Details & Stock Deduction
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRecipe ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <h3 className="text-xl font-medium text-black flex items-center">
                        <Utensils className="w-5 h-5 mr-2 text-purple-400" />
                        {selectedRecipe.name}
                      </h3>
                      <div className="text-sm text-gray-700">
                        Category: {selectedRecipe.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity to Prepare</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          className="bg-gray-100 border-gray-300 text-black"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(Number.parseInt(e.target.value) || 1)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storeLocation">
                          From Store Location
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="storeLocation"
                            className="bg-gray-100 border-gray-300 text-black"
                          >
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main-store">
                              Main Store
                            </SelectItem>
                            <SelectItem value="kitchen-store">
                              Kitchen Store
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 overflow-x-auto">
                      <h4 className="text-black font-medium mb-3">
                        Required Ingredients
                      </h4>
                      <div className="space-y-2 min-w-[400px]">
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2 text-sm text-gray-700 pb-2 border-b border-gray-200">
                          <div>Material</div>
                          <div>Required</div>
                          <div>In Stock</div>
                          <div className="hidden xs:block sm:block">
                            Remaining
                          </div>
                          <div>Status</div>
                        </div>
                        {selectedRecipe.ingredients.map((ingredient, idx) => {
                          const requiredAmount = ingredient.quantity * quantity;
                          const remainingAmount =
                            ingredient.inStock - requiredAmount;
                          const isLowStock =
                            remainingAmount < ingredient.minLevel;

                          return (
                            <div
                              key={idx}
                              className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2 py-2 border-b border-gray-200 items-center"
                            >
                              <div className="text-black">
                                {ingredient.material}
                              </div>
                              <div className="text-gray-700">
                                {requiredAmount} {ingredient.unit}
                              </div>
                              <div className="text-gray-700">
                                {ingredient.inStock} {ingredient.unit}
                              </div>
                              <div className="hidden xs:block sm:block text-gray-700">
                                {remainingAmount} {ingredient.unit}
                              </div>
                              <div>
                                {isLowStock ? (
                                  <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 flex items-center w-fit">
                                    <AlertTriangle className="w-3 h-3 mr-1" />{" "}
                                    Low
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 flex items-center w-fit">
                                    <Check className="w-3 h-3 mr-1" /> OK
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
                        onClick={handleDeductStock}
                      >
                        <ArrowDownCircle className="w-4 h-4 mr-2" /> Deduct
                        Stock
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Utensils className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">
                      No Recipe Selected
                    </h3>
                    <p className="text-gray-500 mt-2 max-w-md">
                      Select a recipe from the list to view details and deduct
                      stock based on ingredients used.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle>Confirm Stock Deduction</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to deduct stock for{" "}
              <span className="font-medium text-black">
                {quantity}x {selectedRecipe?.name}
              </span>
              ?
            </p>
            <p className="text-gray-500 text-sm mt-2">
              This will reduce the inventory levels for all ingredients used in
              this recipe.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={confirmDeduction}
            >
              Confirm Deduction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Low Stock Warning Dialog */}
      <Dialog
        open={isLowStockDialogOpen}
        onOpenChange={setIsLowStockDialogOpen}
      >
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              Low Stock Warning
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Deducting stock for{" "}
              <span className="font-medium text-black">
                {quantity}x {selectedRecipe?.name}
              </span>{" "}
              will cause some ingredients to fall below minimum stock levels:
            </p>
            <div className="mt-4 space-y-2">
              {selectedRecipe?.ingredients
                .filter(
                  (ingredient) =>
                    ingredient.inStock - ingredient.quantity * quantity <
                    ingredient.minLevel
                )
                .map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="bg-yellow-100 p-2 rounded flex justify-between"
                  >
                    <span>{ingredient.material}</span>
                    <span className="text-yellow-700">
                      Will fall to{" "}
                      {ingredient.inStock - ingredient.quantity * quantity}{" "}
                      {ingredient.unit}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Do you want to proceed with the deduction anyway?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700"
              onClick={() => setIsLowStockDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              onClick={() => {
                setIsLowStockDialogOpen(false);
                setIsConfirmDialogOpen(true);
              }}
            >
              Proceed Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="bg-white border border-purple-500/20 text-black">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              Stock Deducted Successfully
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Stock has been successfully deducted for {quantity}x{" "}
              {selectedRecipe?.name}.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
