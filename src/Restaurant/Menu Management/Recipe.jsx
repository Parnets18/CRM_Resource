import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Search, ChefHat } from "lucide-react";
import RestoNav from "../RestoNav";

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample raw materials data
  const sampleRawMaterials = [
    { id: 1, name: "Tomatoes", unit: "kg", cost_per_unit: 50 },
    { id: 2, name: "Onions", unit: "kg", cost_per_unit: 30 },
    { id: 3, name: "Chicken Breast", unit: "kg", cost_per_unit: 300 },
    { id: 4, name: "Rice", unit: "kg", cost_per_unit: 40 },
    { id: 5, name: "Oil", unit: "liter", cost_per_unit: 120 },
    { id: 6, name: "Salt", unit: "kg", cost_per_unit: 20 },
    { id: 7, name: "Spices Mix", unit: "kg", cost_per_unit: 200 },
    { id: 8, name: "Flour", unit: "kg", cost_per_unit: 35 },
  ];

  // Sample recipes data
  const sampleRecipes = [
    {
      id: 1,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with spiced chicken",
      cooking_time: 45,
      servings: 4,
      cost_per_serving: 85,
      ingredients: [
        { raw_material_id: 3, quantity: 0.5, unit: "kg" },
        { raw_material_id: 4, quantity: 0.4, unit: "kg" },
        { raw_material_id: 2, quantity: 0.2, unit: "kg" },
        { raw_material_id: 7, quantity: 0.05, unit: "kg" },
      ],
      instructions:
        "Marinate chicken, cook rice, layer and dum cook for 30 minutes.",
    },
    {
      id: 2,
      name: "Vegetable Curry",
      description: "Mixed vegetables in spiced gravy",
      cooking_time: 30,
      servings: 3,
      cost_per_serving: 45,
      ingredients: [
        { raw_material_id: 1, quantity: 0.3, unit: "kg" },
        { raw_material_id: 2, quantity: 0.2, unit: "kg" },
        { raw_material_id: 5, quantity: 0.05, unit: "liter" },
        { raw_material_id: 7, quantity: 0.03, unit: "kg" },
      ],
      instructions:
        "Sauté onions, add vegetables and spices, simmer until tender.",
    },
  ];

  useEffect(() => {
    setRawMaterials(sampleRawMaterials);
    setRecipes(sampleRecipes);
  }, []);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    cooking_time: "",
    servings: "",
    ingredients: [{ raw_material_id: "", quantity: "", unit: "" }],
    instructions: "",
  });

  const calculateRecipeCost = (ingredients) => {
    return ingredients.reduce((total, ingredient) => {
      const material = rawMaterials.find(
        (m) => m.id === parseInt(ingredient.raw_material_id)
      );
      if (material && ingredient.quantity) {
        return total + material.cost_per_unit * parseFloat(ingredient.quantity);
      }
      return total;
    }, 0);
  };

  const addIngredient = () => {
    const recipe = editingRecipe || newRecipe;
    const updatedIngredients = [
      ...recipe.ingredients,
      { raw_material_id: "", quantity: "", unit: "" },
    ];

    if (editingRecipe) {
      setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
    } else {
      setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
    }
  };

  const removeIngredient = (index) => {
    const recipe = editingRecipe || newRecipe;
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);

    if (editingRecipe) {
      setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
    } else {
      setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
    }
  };

  const updateIngredient = (index, field, value) => {
    const recipe = editingRecipe || newRecipe;
    const updatedIngredients = recipe.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );

    if (editingRecipe) {
      setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
    } else {
      setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
    }
  };

  const saveRecipe = () => {
    const recipe = editingRecipe || newRecipe;
    const totalCost = calculateRecipeCost(recipe.ingredients);
    const costPerServing = recipe.servings
      ? (totalCost / parseInt(recipe.servings)).toFixed(2)
      : 0;

    const recipeData = {
      ...recipe,
      cost_per_serving: parseFloat(costPerServing),
      cooking_time: parseInt(recipe.cooking_time),
      servings: parseInt(recipe.servings),
    };

    if (editingRecipe) {
      setRecipes(
        recipes.map((r) =>
          r.id === editingRecipe.id
            ? { ...recipeData, id: editingRecipe.id }
            : r
        )
      );
      setEditingRecipe(null);
    } else {
      setRecipes([...recipes, { ...recipeData, id: Date.now() }]);
      setNewRecipe({
        name: "",
        description: "",
        cooking_time: "",
        servings: "",
        ingredients: [{ raw_material_id: "", quantity: "", unit: "" }],
        instructions: "",
      });
      setShowAddRecipe(false);
    }
  };

  const editRecipe = (recipe) => {
    setEditingRecipe({ ...recipe });
    setShowAddRecipe(false);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const cancelEdit = () => {
    setEditingRecipe(null);
    setShowAddRecipe(false);
    setNewRecipe({
      name: "",
      description: "",
      cooking_time: "",
      servings: "",
      ingredients: [{ raw_material_id: "", quantity: "", unit: "" }],
      instructions: "",
    });
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Responsive Recipe Form
  const RecipeForm = ({ recipe, setRecipe, title }) => (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ChefHat className="w-5 h-5" />
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Name
          </label>
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter recipe name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            value={recipe.cooking_time}
            onChange={(e) =>
              setRecipe({ ...recipe, cooking_time: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={recipe.description}
            onChange={(e) =>
              setRecipe({ ...recipe, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the recipe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servings
          </label>
          <input
            type="number"
            value={recipe.servings}
            onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="4"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
          <h4 className="text-lg font-medium text-gray-800">Ingredients</h4>
          <button
            onClick={addIngredient}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Ingredient
          </button>
        </div>

        <div className="space-y-3">
          {recipe.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center bg-gray-50 p-3 rounded-md"
            >
              <div className="flex-1">
                <select
                  value={ingredient.raw_material_id}
                  onChange={(e) =>
                    updateIngredient(index, "raw_material_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Material</option>
                  {rawMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name} (₹{material.cost_per_unit}/{material.unit}
                      )
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-24">
                <input
                  type="number"
                  step="0.01"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    updateIngredient(index, "quantity", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Qty"
                />
              </div>

              <div className="w-full sm:w-20">
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) =>
                    updateIngredient(index, "unit", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Unit"
                />
              </div>

              <button
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700 self-end sm:self-auto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cooking Instructions
        </label>
        <textarea
          value={recipe.instructions}
          onChange={(e) =>
            setRecipe({ ...recipe, instructions: e.target.value })
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Step by step cooking instructions..."
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <div className="text-sm text-gray-600">
          <strong>Total Cost:</strong> ₹
          {calculateRecipeCost(recipe.ingredients).toFixed(2)}
          {recipe.servings && (
            <span className="ml-4 block sm:inline">
              <strong>Cost per Serving:</strong> ₹
              {(
                calculateRecipeCost(recipe.ingredients) /
                parseInt(recipe.servings)
              ).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={saveRecipe}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 justify-center"
        >
          <Save className="w-4 h-4" />
          Save Recipe
        </button>
        <button
          onClick={cancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center gap-2 justify-center"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="lg:ml-64">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
        <RestoNav />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-purple-600" />
            Recipe Management
          </h1>
          <p className="text-gray-600">
            Manage recipes, ingredients, and calculate costs
          </p>
        </div>

        {/* Add Recipe Button */}
        {!showAddRecipe && !editingRecipe && (
          <div className="mb-6">
            <button
              onClick={() => setShowAddRecipe(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center gap-2 font-medium w-full sm:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              Add New Recipe
            </button>
          </div>
        )}

        {/* Search Bar */}
        {!showAddRecipe && !editingRecipe && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        )}

        {/* Add Recipe Form */}
        {showAddRecipe && (
          <div className="mb-8">
            <RecipeForm
              recipe={newRecipe}
              setRecipe={setNewRecipe}
              title="Add New Recipe"
            />
          </div>
        )}

        {/* Edit Recipe Form */}
        {editingRecipe && (
          <div className="mb-8">
            <RecipeForm
              recipe={editingRecipe}
              setRecipe={setEditingRecipe}
              title="Edit Recipe"
            />
          </div>
        )}

        {/* Recipes List */}
        {!showAddRecipe && !editingRecipe && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-lg border hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {recipe.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {recipe.description}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => editRecipe(recipe)}
                        className="text-purple-500 hover:text-purple-600 p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRecipe(recipe.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Cooking Time:</span>
                      <span className="ml-2 font-medium">
                        {recipe.cooking_time} mins
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Servings:</span>
                      <span className="ml-2 font-medium">
                        {recipe.servings}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cost per Serving:</span>
                      <span className="ml-2 font-medium text-green-600">
                        ₹{recipe.cost_per_serving}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Cost:</span>
                      <span className="ml-2 font-medium">
                        ₹
                        {(recipe.cost_per_serving * recipe.servings).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Ingredients:
                    </h4>
                    <div className="space-y-1">
                      {recipe.ingredients.map((ingredient, index) => {
                        const material = rawMaterials.find(
                          (m) => m.id === ingredient.raw_material_id
                        );
                        return (
                          <div
                            key={index}
                            className="text-sm text-gray-600 flex justify-between"
                          >
                            <span>{material?.name || "Unknown"}</span>
                            <span>
                              {ingredient.quantity} {ingredient.unit}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {recipe.instructions && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Instructions:
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recipe.instructions}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!showAddRecipe && !editingRecipe && filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first recipe to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeManagement;