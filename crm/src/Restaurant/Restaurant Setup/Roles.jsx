
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, User, X, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RestoNav from '../RestoNav';

export default function UserManagement() {
    // Sample user data with roles
    const [users, setUsers] = useState([
        { id: 1, name: "Admin User", email: "admin@resto.com", role: "Admin", status: "Active" },
        { id: 2, name: "Cashier 1", email: "cashier@resto.com", role: "Cashier", status: "Active" },
        { id: 3, name: "Head Chef", email: "chef@resto.com", role: "Chef", status: "Active" },
        { id: 4, name: "Waiter 1", email: "waiter@resto.com", role: "Waiter", status: "Inactive" },
        { id: 5, name: "Store Manager", email: "manager@resto.com", role: "Store Manager", status: "Active" },
    ]);

    // Sample restaurant data
    const restaurants = [
        { id: 1, name: "Urban Bites", location: "Downtown" },
        { id: 2, name: "Coastal Kitchen", location: "Seaside" },
        { id: 3, name: "Mountain Grill", location: "Highlands" }
    ];

    // State for selected restaurant
    const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]); // Auto-select first restaurant

    // State for popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Cashier',
        status: 'Active'
    });

    const roles = ['Admin', 'Cashier', 'Chef', 'Waiter', 'Store Manager', 'Delivery'];
    const statusOptions = ['Active', 'Inactive', 'Suspended'];

    // Handle restaurant selection
    const handleRestaurantChange = (value) => {
        const restaurant = restaurants.find(r => r.id === parseInt(value));
        setSelectedRestaurant(restaurant);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create new user
        const newUser = {
            id: users.length + 1,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status
        };
        
        // Add to users
        setUsers([...users, newUser]);
        
        // Reset form and close popup
        setFormData({
            name: '',
            email: '',
            role: 'Cashier',
            status: 'Active'
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
                            <h2 className="text-2xl font-bold text-white">User Management</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Select
                                    value={selectedRestaurant.id.toString()}
                                    onValueChange={handleRestaurantChange}
                                >
                                    <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white w-48">
                                        <SelectValue placeholder="Select Restaurant" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {restaurants.map((restaurant) => (
                                            <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                                                {restaurant.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Badge variant="outline" className="border-green-500/50 text-green-400">
                                    {selectedRestaurant.name}
                                </Badge>
                                <span className="text-gray-400 text-sm">{selectedRestaurant.location}</span>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </Button>
                    </div>

                    {/* Add User Popup */}
                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gray-900 border border-purple-500/30 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm"
                            >
                                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                                    <h3 className="text-lg font-semibold text-white">Add New User</h3>
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
                                            Restaurant Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            placeholder="Enter Restaurant name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Role
                                            </label>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                                                required
                                            >
                                                {roles.map(role => (
                                                    <option key={role} value={role} className="bg-gray-800">
                                                        {role}
                                                    </option>
                                                ))}
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
                                            Add User
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
                                    <CardTitle className="text-white">Staff Members</CardTitle>
                                    <Input 
                                        placeholder="Search users..." 
                                        className="bg-gray-900/50 border-gray-700 text-white w-64" 
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="text-gray-300">User</TableHead>
                                            <TableHead className="text-gray-300">Email</TableHead>
                                            <TableHead className="text-gray-300">Role</TableHead>
                                            <TableHead className="text-gray-300">Status</TableHead>
                                            <TableHead className="text-right text-gray-300">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <motion.tr
                                                key={user.id}
                                                whileHover={{ backgroundColor: "rgba(107, 33, 168, 0.2)" }}
                                                className="border-b border-gray-800"
                                            >
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <div className="bg-purple-600/20 p-2 rounded-full mr-3">
                                                            <User className="w-5 h-5 text-purple-400" />
                                                        </div>
                                                        <div className="font-medium text-white">{user.name}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-gray-400">{user.email}</TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        variant="outline" 
                                                        className={`${
                                                            user.role === 'Admin' ? 'border-red-500/50 text-red-400' :
                                                            user.role === 'Cashier' ? 'border-blue-500/50 text-blue-400' :
                                                            user.role === 'Chef' ? 'border-orange-500/50 text-orange-400' :
                                                            user.role === 'Store Manager' ? 'border-green-500/50 text-green-400' :
                                                            'border-purple-500/50 text-purple-400'
                                                        }`}
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        user.status === "Active" ? "bg-green-900/30 text-green-400" :
                                                        user.status === "Suspended" ? "bg-red-900/30 text-red-400" :
                                                        "bg-yellow-900/30 text-yellow-400"
                                                    }`}>
                                                        {user.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="text-purple-400 hover:bg-purple-900/20">
                                                            <Key className="w-4 h-4" />
                                                        </Button>
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