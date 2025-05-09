import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, Utensils, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import RestoNav from '../RestoNav';

export default function MenuManagement() {
    // Sample menu data
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: "Margherita Pizza", category: "Pizza", price: 12.99, status: "Available", ingredients: "Tomato sauce, mozzarella, basil" },
        { id: 2, name: "Chicken Sandwich", category: "Sandwich", price: 9.99, status: "Available", ingredients: "Grilled chicken, lettuce, tomato" },
        { id: 3, name: "Spaghetti Carbonara", category: "Pasta", price: 14.99, status: "Out of Stock", ingredients: "Pasta, eggs, cheese, pancetta" },
        { id: 4, name: "Caesar Salad", category: "Salad", price: 8.99, status: "Available", ingredients: "Romaine, croutons, parmesan, dressing" },
        { id: 5, name: "Pepperoni Pizza", category: "Pizza", price: 13.99, status: "Limited", ingredients: "Tomato sauce, mozzarella, pepperoni" },
    ]);

    // State for popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'main course',
        type: 'veg',
        sizes: {
            small: '',
            medium: '',
            large: ''
        },
        unit: 'plate',
        description: '',
        status: 'Available'
    });

    const categories = ['Pizza', 'Sandwich', 'Pasta', 'Salad', 'Starter', 'Beverage', 'Dessert'];
    const foodTypes = ['veg', 'non-veg'];
    const statusOptions = ['Available', 'Limited', 'Out of Stock'];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in formData.sizes) {
            setFormData({
                ...formData,
                sizes: {
                    ...formData.sizes,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
                ...(name === 'category' && {
                    unit: value === 'Beverage' ? 'glass' : 'plate'
                })
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create new menu item
        const newItem = {
            id: menuItems.length + 1,
            name: formData.name,
            category: formData.category,
            price: formData.sizes.medium || formData.sizes.small, // Use medium or small price
            status: formData.status,
            ingredients: formData.description
        };

        // Add to menu items
        setMenuItems([...menuItems, newItem]);

        // Reset form and close popup
        setFormData({
            name: '',
            category: 'main course',
            type: 'veg',
            sizes: {
                small: '',
                medium: '',
                large: ''
            },
            unit: 'plate',
            description: '',
            status: 'Available'
        });
        setIsPopupOpen(false);
    };

    return (
        <div className="min-h-screen bg-black lg:ml-64">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
            </div>

            <div className="relative z-10">
                <div className="flex-1 p-8">
                    {/* Header */}
                    <RestoNav />
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Menu Items</h2>
                            <p className="text-gray-400">Manage your restaurant's menu items</p>
                        </div>
                        <Button
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
                        </Button>
                    </div>

                    {/* Add Item Popup */}
                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gray-900 border border-purple-500/30 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm"
                            >
                                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                                    <h3 className="text-lg font-semibold text-white">Add New Menu Item</h3>
                                    <button
                                        onClick={() => setIsPopupOpen(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            placeholder="e.g., Pizza, Sandwich, Pasta"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Category
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat} className="bg-gray-800">
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Type
                                            </label>
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            >
                                                {foodTypes.map(type => (
                                                    <option key={type} value={type} className="bg-gray-800">
                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Serving Unit
                                            </label>
                                            <select
                                                name="unit"
                                                value={formData.unit}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            >
                                                <option value="plate" className="bg-gray-800">Plate</option>
                                                <option value="bowl" className="bg-gray-800">Bowl</option>
                                                <option value="glass" className="bg-gray-800">Glass</option>
                                                <option value="litre" className="bg-gray-800">Litre</option>
                                                <option value="piece" className="bg-gray-800">Piece</option>
                                                <option value="glass" className="bg-gray-800">Size</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            >
                                                {statusOptions.map(status => (
                                                    <option key={status} value={status} className="bg-gray-800">
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Prices
                                        </label>
                                        <div className="space-y-2">
                                            {formData.category !== 'Beverage' ? (
                                                <>
                                                    <div className="flex items-center">
                                                        <span className="w-20 text-gray-400">Small:</span>
                                                        <input
                                                            type="number"
                                                            name="small"
                                                            value={formData.sizes.small}
                                                            onChange={handleChange}
                                                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white ml-2"
                                                            placeholder="Price"
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-20 text-gray-400">Medium:</span>
                                                        <input
                                                            type="number"
                                                            name="medium"
                                                            value={formData.sizes.medium}
                                                            onChange={handleChange}
                                                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white ml-2"
                                                            placeholder="Price"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-20 text-gray-400">Large:</span>
                                                        <input
                                                            type="number"
                                                            name="large"
                                                            value={formData.sizes.large}
                                                            onChange={handleChange}
                                                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white ml-2"
                                                            placeholder="Price"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex items-center">
                                                    <span className="w-20 text-gray-400">Price:</span>
                                                    <input
                                                        type="number"
                                                        name="medium"
                                                        value={formData.sizes.medium}
                                                        onChange={handleChange}
                                                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white ml-2"
                                                        placeholder="Price"
                                                        required
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Description (Ingredients)
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            rows="3"
                                            placeholder="Enter item ingredients..."
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsPopupOpen(false)}
                                            className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                                        >
                                            Add Item
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div>
                        <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-white">All Menu Items</CardTitle>
                                    <Input
                                        placeholder="Search items..."
                                        className="bg-gray-900/50 border-gray-700 text-white w-64"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="text-gray-300">Item</TableHead>
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
                                                className="border-b border-gray-800"
                                            >
                                                <TableCell>
                                                    <div className="font-medium text-white">{item.name}</div>
                                                    <div className="text-xs text-gray-500">{item.ingredients}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                                                        {item.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-white">${item.price.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === "Available" ? "bg-green-900/30 text-green-400" :
                                                            item.status === "Out of Stock" ? "bg-red-900/30 text-red-400" :
                                                                "bg-yellow-900/30 text-yellow-400"
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="text-purple-400 hover:bg-purple-900/20">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-900/20">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}