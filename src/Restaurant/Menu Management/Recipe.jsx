import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Search, ChefHat } from 'lucide-react';
import RestoNav from '../RestoNav';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

<<<<<<< HEAD
  // Menu categories with subcategories
  const [categories, setCategories] = useState([
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
  ]);
=======
  // Sample raw materials data
  const sampleRawMaterials = [
    { id: 1, name: 'Tomatoes', unit: 'kg', cost_per_unit: 50 },
    { id: 2, name: 'Onions', unit: 'kg', cost_per_unit: 30 },
    { id: 3, name: 'Chicken Breast', unit: 'kg', cost_per_unit: 300 },
    { id: 4, name: 'Rice', unit: 'kg', cost_per_unit: 40 },
    { id: 5, name: 'Oil', unit: 'liter', cost_per_unit: 120 },
    { id: 6, name: 'Salt', unit: 'kg', cost_per_unit: 20 },
    { id: 7, name: 'Spices Mix', unit: 'kg', cost_per_unit: 200 },
    { id: 8, name: 'Flour', unit: 'kg', cost_per_unit: 35 }
  ];
>>>>>>> b09516f7ff1e110bbd5fbb2108bd7c26387be63f

  // Sample recipes data
  const sampleRecipes = [
    {
      id: 1,
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice with spiced chicken',
      cooking_time: 45,
      servings: 4,
      cost_per_serving: 85,
      ingredients: [
        { raw_material_id: 3, quantity: 0.5, unit: 'kg' },
        { raw_material_id: 4, quantity: 0.4, unit: 'kg' },
        { raw_material_id: 2, quantity: 0.2, unit: 'kg' },
        { raw_material_id: 7, quantity: 0.05, unit: 'kg' }
      ],
      instructions: 'Marinate chicken, cook rice, layer and dum cook for 30 minutes.'
    },
    {
      id: 2,
      name: 'Vegetable Curry',
      description: 'Mixed vegetables in spiced gravy',
      cooking_time: 30,
      servings: 3,
      cost_per_serving: 45,
      ingredients: [
        { raw_material_id: 1, quantity: 0.3, unit: 'kg' },
        { raw_material_id: 2, quantity: 0.2, unit: 'kg' },
        { raw_material_id: 5, quantity: 0.05, unit: 'liter' },
        { raw_material_id: 7, quantity: 0.03, unit: 'kg' }
      ],
      instructions: 'Sauté onions, add vegetables and spices, simmer until tender.'
    }
  ];

  useEffect(() => {
    setRawMaterials(sampleRawMaterials);
    setRecipes(sampleRecipes);
  }, []);

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    cooking_time: '',
    servings: '',
    ingredients: [{ raw_material_id: '', quantity: '', unit: '' }],
    instructions: ''
  });

<<<<<<< HEAD
  // Add Category modal state
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    subcategories: "",
  });

  // Toggle category expansion
  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
=======
  const calculateRecipeCost = (ingredients) => {
    return ingredients.reduce((total, ingredient) => {
      const material = rawMaterials.find(m => m.id === parseInt(ingredient.raw_material_id));
      if (material && ingredient.quantity) {
        return total + (material.cost_per_unit * parseFloat(ingredient.quantity));
      }
      return total;
    }, 0);
>>>>>>> b09516f7ff1e110bbd5fbb2108bd7c26387be63f
  };

  const addIngredient = () => {
    const recipe = editingRecipe || newRecipe;
    const updatedIngredients = [...recipe.ingredients, { raw_material_id: '', quantity: '', unit: '' }];
    
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
    const costPerServing = recipe.servings ? (totalCost / parseInt(recipe.servings)).toFixed(2) : 0;

    const recipeData = {
      ...recipe,
      cost_per_serving: parseFloat(costPerServing),
      cooking_time: parseInt(recipe.cooking_time),
      servings: parseInt(recipe.servings)
    };

    if (editingRecipe) {
      setRecipes(recipes.map(r => r.id === editingRecipe.id ? { ...recipeData, id: editingRecipe.id } : r));
      setEditingRecipe(null);
    } else {
      setRecipes([...recipes, { ...recipeData, id: Date.now() }]);
      setNewRecipe({
        name: '',
        description: '',
        cooking_time: '',
        servings: '',
        ingredients: [{ raw_material_id: '', quantity: '', unit: '' }],
        instructions: ''
      });
      setShowAddRecipe(false);
    }
  };

  const editRecipe = (recipe) => {
    setEditingRecipe({ ...recipe });
    setShowAddRecipe(false);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  const cancelEdit = () => {
    setEditingRecipe(null);
    setShowAddRecipe(false);
    setNewRecipe({
      name: '',
      description: '',
      cooking_time: '',
      servings: '',
      ingredients: [{ raw_material_id: '', quantity: '', unit: '' }],
      instructions: ''
    });
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

<<<<<<< HEAD
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

  // Handle add category modal submit
  const handleAddCategory = (e) => {
    e.preventDefault();
    setCategories((prev) => [
      ...prev,
      {
        name: newCategory.name,
        subcategories: newCategory.subcategories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        expanded: true,
      },
    ]);
    setExpandedCategories((prev) => ({
      ...prev,
      [newCategory.name]: true,
    }));
    setShowAddCategory(false);
    setNewCategory({ name: "", subcategories: "" });
  };

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex-1 p-8">
          {/* Header with restaurant info */}
          <RestoNav />
          <div className="flex justify-between items-center mb-8">
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
          <div className="flex gap-3 mb-6 flex-wrap">
            <Button
              variant={!activeFilter ? "default" : "outline"}
              className={!activeFilter ? "bg-purple-600 text-white" : "border-gray-300 text-gray-700"}
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
            <Button
              className="ml-120 bg-purple-600 text-white hover:bg-purple-600"
              onClick={() => setShowAddCategory(true)}
            >
              + Add category
            </Button>
          </div>

          {/* Add Category Modal */}
          {showAddCategory && (
            <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-xl shadow-2xl w-full max-w-md"
                style={{ maxHeight: 350, overflowY: "auto" }}
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-black">Add Category</h3>
                  <button
                    onClick={() => setShowAddCategory(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleAddCategory} className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Subcategories (comma separated)
                    </label>
                    <input
                      type="text"
                      name="subcategories"
                      value={newCategory.subcategories}
                      onChange={(e) =>
                        setNewCategory((prev) => ({
                          ...prev,
                          subcategories: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      placeholder="e.g. Veg, Non-Veg"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(false)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center text-sm"
                    >
                      Add Category
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

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
                  <h3 className="text-lg font-semibold text-black">Edit Menu Item</h3>
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
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-gray-700 w-[40%]">
                              Item
                            </TableHead>
                            <TableHead className="text-gray-700">
                              Type
                            </TableHead>
                            <TableHead className="text-gray-700">
                              Price
                            </TableHead>
                            <TableHead className="text-gray-700">
                              Status
                            </TableHead>
                            <TableHead className="text-right text-gray-700">
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
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
=======
  const RecipeForm = ({ recipe, setRecipe, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ChefHat className="w-5 h-5" />
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipe name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (minutes)</label>
          <input
            type="number"
            value={recipe.cooking_time}
            onChange={(e) => setRecipe({ ...recipe, cooking_time: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the recipe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
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
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-medium text-gray-800">Ingredients</h4>
          <button
            onClick={addIngredient}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Ingredient
          </button>
>>>>>>> b09516f7ff1e110bbd5fbb2108bd7c26387be63f
        </div>
        
        <div className="space-y-3">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-md">
              <div className="flex-1">
                <select
                  value={ingredient.raw_material_id}
                  onChange={(e) => updateIngredient(index, 'raw_material_id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Material</option>
                  {rawMaterials.map(material => (
                    <option key={material.id} value={material.id}>
                      {material.name} (₹{material.cost_per_unit}/{material.unit})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-24">
                <input
                  type="number"
                  step="0.01"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Qty"
                />
              </div>
              
              <div className="w-20">
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Unit"
                />
              </div>
              
              <button
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Instructions</label>
        <textarea
          value={recipe.instructions}
          onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Step by step cooking instructions..."
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <div className="text-sm text-gray-600">
          <strong>Total Cost:</strong> ₹{calculateRecipeCost(recipe.ingredients).toFixed(2)}
          {recipe.servings && (
            <span className="ml-4">
              <strong>Cost per Serving:</strong> ₹{(calculateRecipeCost(recipe.ingredients) / parseInt(recipe.servings)).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={saveRecipe}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Recipe
        </button>
        <button
          onClick={cancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className='ml-64'>
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <RestoNav />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <ChefHat className="w-8 h-8 text-blue-500" />
          Recipe Management
        </h1>
        <p className="text-gray-600">Manage recipes, ingredients, and calculate costs</p>
      </div>

      {/* Add Recipe Button */}
      {!showAddRecipe && !editingRecipe && (
        <div className="mb-6">
          <button
            onClick={() => setShowAddRecipe(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center gap-2 font-medium"
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{recipe.name}</h3>
                    <p className="text-gray-600 text-sm">{recipe.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editRecipe(recipe)}
                      className="text-blue-500 hover:text-blue-700 p-1"
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

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Cooking Time:</span>
                    <span className="ml-2 font-medium">{recipe.cooking_time} mins</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Servings:</span>
                    <span className="ml-2 font-medium">{recipe.servings}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost per Serving:</span>
                    <span className="ml-2 font-medium text-green-600">₹{recipe.cost_per_serving}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Cost:</span>
                    <span className="ml-2 font-medium">₹{(recipe.cost_per_serving * recipe.servings).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Ingredients:</h4>
                  <div className="space-y-1">
                    {recipe.ingredients.map((ingredient, index) => {
                      const material = rawMaterials.find(m => m.id === ingredient.raw_material_id);
                      return (
                        <div key={index} className="text-sm text-gray-600 flex justify-between">
                          <span>{material?.name || 'Unknown'}</span>
                          <span>{ingredient.quantity} {ingredient.unit}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {recipe.instructions && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Instructions:</h4>
                    <p className="text-sm text-gray-600">{recipe.instructions}</p>
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
          <h3 className="text-xl font-medium text-gray-600 mb-2">No recipes found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first recipe to get started'}
          </p>
        </div>
      )}
    </div>
    </div>
     
  );
};

export default RecipeManagement;