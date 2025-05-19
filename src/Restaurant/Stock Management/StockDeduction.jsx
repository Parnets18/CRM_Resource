"use client"

import { useState } from "react"
import { ArrowDownCircle, Utensils, Search, Check, AlertTriangle, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import RestoNav from "../RestoNav"

export default function RecipeStockDeduction() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [isLowStockDialogOpen, setIsLowStockDialogOpen] = useState(false)

  // Sample recipes data
  const recipes = [
    {
      id: 1,
      name: "Pizza Margherita",
      category: "Pizza",
      ingredients: [
        { material: "Flour", quantity: 250, unit: "g", inStock: 5000, minLevel: 1000 },
        { material: "Tomatoes", quantity: 150, unit: "g", inStock: 2000, minLevel: 1000 },
        { material: "Cheese", quantity: 100, unit: "g", inStock: 800, minLevel: 1000 },
        { material: "Basil", quantity: 5, unit: "g", inStock: 100, minLevel: 50 },
        { material: "Olive Oil", quantity: 15, unit: "ml", inStock: 500, minLevel: 200 },
      ],
    },
    {
      id: 2,
      name: "Pasta Arrabbiata",
      category: "Pasta",
      ingredients: [
        { material: "Pasta", quantity: 200, unit: "g", inStock: 3000, minLevel: 1000 },
        { material: "Tomatoes", quantity: 200, unit: "g", inStock: 2000, minLevel: 1000 },
        { material: "Garlic", quantity: 10, unit: "g", inStock: 300, minLevel: 100 },
        { material: "Chili Flakes", quantity: 5, unit: "g", inStock: 150, minLevel: 50 },
        { material: "Olive Oil", quantity: 20, unit: "ml", inStock: 500, minLevel: 200 },
      ],
    },
    {
      id: 3,
      name: "Tiramisu",
      category: "Dessert",
      ingredients: [
        { material: "Mascarpone", quantity: 250, unit: "g", inStock: 500, minLevel: 250 },
        { material: "Coffee", quantity: 100, unit: "ml", inStock: 1000, minLevel: 500 },
        { material: "Ladyfingers", quantity: 100, unit: "g", inStock: 300, minLevel: 200 },
        { material: "Cocoa Powder", quantity: 10, unit: "g", inStock: 100, minLevel: 50 },
      ],
    },
  ]

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe)
    setQuantity(1)
  }

  const handleDeductStock = () => {
    // Check if any ingredients would go below minimum level
    const lowStockIngredients = selectedRecipe.ingredients.filter(
      (ingredient) => ingredient.inStock - ingredient.quantity * quantity < ingredient.minLevel,
    )

    if (lowStockIngredients.length > 0) {
      setIsLowStockDialogOpen(true)
    } else {
      setIsConfirmDialogOpen(true)
    }
  }

  const confirmDeduction = () => {
    // Here you would implement the actual stock deduction logic
    // For each ingredient in the recipe, deduct the quantity * number of recipes from stock

    setIsConfirmDialogOpen(false)
    setIsSuccessDialogOpen(true)

    // Reset after success
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
      setSelectedRecipe(null)
      setQuantity(1)
    }, 2000)
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
            <h2 className="text-2xl font-bold text-white">Recipe Stock Deduction</h2>
            <p className="text-gray-400">Automatically deduct stock based on recipes used</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <ShoppingCart className="w-4 h-4 mr-2" /> View Sales
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-white">Select Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search recipes..."
                      className="w-full bg-gray-900/50 border-gray-700 pl-8 text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label>Category Filter</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
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
                              ? "bg-purple-900/50 text-white"
                              : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                          }`}
                          onClick={() => handleRecipeSelect(recipe)}
                        >
                          <div className="flex items-center">
                            <Utensils className="w-4 h-4 mr-2 text-purple-400" />
                            <span>{recipe.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Category: {recipe.category} • {recipe.ingredients.length} ingredients
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recipe Details & Stock Deduction</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRecipe ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-white flex items-center">
                        <Utensils className="w-5 h-5 mr-2 text-purple-400" />
                        {selectedRecipe.name}
                      </h3>
                      <div className="text-sm text-gray-400">Category: {selectedRecipe.category}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity to Prepare</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          className="bg-gray-900/50 border-gray-700 text-white"
                          value={quantity}
                          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storeLocation">From Store Location</Label>
                        <Select>
                          <SelectTrigger id="storeLocation" className="bg-gray-900/50 border-gray-700 text-white">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main-store">Main Store</SelectItem>
                            <SelectItem value="kitchen-store">Kitchen Store</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="border border-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Required Ingredients</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-5 gap-2 text-sm text-gray-500 pb-2 border-b border-gray-800">
                          <div>Material</div>
                          <div>Required</div>
                          <div>In Stock</div>
                          <div>Remaining</div>
                          <div>Status</div>
                        </div>
                        {selectedRecipe.ingredients.map((ingredient, idx) => {
                          const requiredAmount = ingredient.quantity * quantity
                          const remainingAmount = ingredient.inStock - requiredAmount
                          const isLowStock = remainingAmount < ingredient.minLevel

                          return (
                            <div key={idx} className="grid grid-cols-5 gap-2 py-2 border-b border-gray-800">
                              <div className="text-white">{ingredient.material}</div>
                              <div className="text-gray-300">
                                {requiredAmount} {ingredient.unit}
                              </div>
                              <div className="text-gray-300">
                                {ingredient.inStock} {ingredient.unit}
                              </div>
                              <div className="text-gray-300">
                                {remainingAmount} {ingredient.unit}
                              </div>
                              <div>
                                {isLowStock ? (
                                  <span className="px-2 py-1 rounded-full text-xs bg-red-900/30 text-red-400 flex items-center w-fit">
                                    <AlertTriangle className="w-3 h-3 mr-1" /> Low
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400 flex items-center w-fit">
                                    <Check className="w-3 h-3 mr-1" /> OK
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleDeductStock}>
                        <ArrowDownCircle className="w-4 h-4 mr-2" /> Deduct Stock
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Utensils className="w-12 h-12 text-gray-700 mb-4" />
                    <h3 className="text-lg font-medium text-gray-400">No Recipe Selected</h3>
                    <p className="text-gray-500 mt-2 max-w-md">
                      Select a recipe from the list to view details and deduct stock based on ingredients used.
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
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Stock Deduction</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Are you sure you want to deduct stock for{" "}
              <span className="font-medium text-white">
                {quantity}x {selectedRecipe?.name}
              </span>
              ?
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This will reduce the inventory levels for all ingredients used in this recipe.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={confirmDeduction}>
              Confirm Deduction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Low Stock Warning Dialog */}
      <Dialog open={isLowStockDialogOpen} onOpenChange={setIsLowStockDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              Low Stock Warning
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Deducting stock for{" "}
              <span className="font-medium text-white">
                {quantity}x {selectedRecipe?.name}
              </span>{" "}
              will cause some ingredients to fall below minimum stock levels:
            </p>
            <div className="mt-4 space-y-2">
              {selectedRecipe?.ingredients
                .filter((ingredient) => ingredient.inStock - ingredient.quantity * quantity < ingredient.minLevel)
                .map((ingredient, idx) => (
                  <div key={idx} className="bg-gray-800/50 p-2 rounded flex justify-between">
                    <span>{ingredient.material}</span>
                    <span className="text-yellow-400">
                      Will fall to {ingredient.inStock - ingredient.quantity * quantity} {ingredient.unit}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">Do you want to proceed with the deduction anyway?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-700" onClick={() => setIsLowStockDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => {
                setIsLowStockDialogOpen(false)
                setIsConfirmDialogOpen(true)
              }}
            >
              Proceed Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="bg-gray-900 border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              Stock Deducted Successfully
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Stock has been successfully deducted for {quantity}x {selectedRecipe?.name}.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
