
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, X, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RestoNav from '../RestoNav';

export default function TableManagement() {
  // Sample table data
  const [tables, setTables] = useState([
    { id: 1, number: "T1", capacity: 4, status: "Available", location: "Patio", type: "Square", restaurantId: 1 },
    { id: 2, number: "T2", capacity: 2, status: "Occupied", location: "Window", type: "Round", restaurantId: 1 },
    { id: 3, number: "T3", capacity: 6, status: "Reserved", location: "Center", type: "Rectangle", restaurantId: 1 },
    { id: 4, number: "T4", capacity: 8, status: "Available", location: "Private Room", type: "Oval", restaurantId: 2 },
    { id: 5, number: "T5", capacity: 4, status: "Maintenance", location: "Bar", type: "Square", restaurantId: 2 },
  ]);

  // Sample restaurant data
  const restaurants = [
    { id: 1, name: "Urban Bites", location: "Downtown" },
    { id: 2, name: "Coastal Kitchen", location: "Seaside" },
    { id: 3, name: "Mountain Grill", location: "Highlands" }
  ];

  // State for selected restaurant
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]); // Auto-select first restaurant

  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    capacity: 4,
    status: 'Available',
    location: 'Main Dining',
    type: 'Square',
    minSpend: '',
    notes: ''
  });

  const statusOptions = ['Available', 'Occupied', 'Reserved', 'Maintenance'];
  const locationOptions = ['Main Dining', 'Patio', 'Window', 'Center', 'Private Room', 'Bar'];
  const tableTypes = ['Standard', 'Booth', 'Bar', 'Round', 'Family', 'VIP'];

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
    const newTable = {
      id: tables.length + 1,
      number: formData.number,
      capacity: parseInt(formData.capacity),
      status: formData.status,
      location: formData.location,
      type: formData.type,
      minSpend: formData.minSpend,
      notes: formData.notes,
      restaurantId: selectedRestaurant.id
    };

    setTables([...tables, newTable]);
    setFormData({
      number: '',
      capacity: 4,
      status: 'Available',
      location: 'Main Dining',
      type: 'Square',
      minSpend: '',
      notes: ''
    });
    setIsPopupOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-900/30 text-green-400';
      case 'Occupied': return 'bg-red-900/30 text-red-400';
      case 'Reserved': return 'bg-purple-900/30 text-purple-400';
      case 'Maintenance': return 'bg-yellow-900/30 text-yellow-400';
      default: return 'bg-gray-900/30 text-gray-400';
    }
  };

  // Filter tables by selected restaurant
  const filteredTables = tables.filter(table => table.restaurantId === selectedRestaurant.id);

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
              <h2 className="text-2xl font-bold text-white">Dine-In Table Management</h2>
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
            <div className="flex gap-3">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="text-white"
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid View
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className="text-white"
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </Button>
              <Button
                onClick={() => setIsPopupOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Table
              </Button>
            </div>
          </div>

          {/* Add Table Popup */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 border border-purple-500/30 rounded-lg shadow-xl w-full max-w-sm "
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-3">
                  <h3 className="text-base font-semibold text-white">Add New Table</h3>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-3 space-y-3 ">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Restaurant</label>
                    <input
                      type="text"
                      value={selectedRestaurant.name}
                      readOnly
                      className="w-full px-2 py-1 bg-gray-800/50 border border-gray-700 rounded-md text-gray-400 text-sm cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Table Number *</label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                      placeholder="e.g., T1, A2, B3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Seating Capacity *</label>
                    <div className="grid grid-cols-3 gap-1">
                      {[2, 4, 6, 8, 10, 12].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, capacity: num })}
                          className={`p-1 rounded-md border text-xs ${formData.capacity === num
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                          {num} Seats
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Table Type *</label>
                    <div className="grid grid-cols-2 gap-1">
                      {tableTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, type })}
                          className={`p-1 rounded-md border text-xs ${formData.type === type
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Location Zone *</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                        required
                      >
                        {locationOptions.map((loc) => (
                          <option key={loc} value={loc} className="bg-gray-800 text-sm">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Status *</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                        required
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className="bg-gray-800 text-sm">
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Minimum Spend (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        name="minSpend"
                        value={formData.minSpend}
                        onChange={handleChange}
                        className="w-full pl-6 px-2 py-1 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Special Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                      rows="2"
                      placeholder="Wheelchair accessible, near outlet, etc."
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsPopupOpen(false)}
                      className="px-3 py-1 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center text-sm"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Table
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
          {/* Main Content */}
          <div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTables.map((table) => (
                  <motion.div
                    key={table.id}
                    whileHover={{ scale: 1.03 }}
                    className={`relative rounded-lg border p-4 ${table.status === 'Available' ? 'border-green-500/30' :
                      table.status === 'Occupied' ? 'border-red-500/30' :
                        table.status === 'Reserved' ? 'border-purple-500/30' :
                          'border-yellow-500/30'
                      } bg-gray-900/50 backdrop-blur-sm`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white">{table.number}</h3>
                        <p className="text-gray-400">{table.type} Table</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(table.status)}`}>
                        {table.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-300 mb-1">
                        {table.capacity} seats
                      </div>
                      <div className="text-sm text-gray-400">
                        {table.location}
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <Button variant="ghost" size="icon" className="text-purple-400 hover:bg-purple-900/20 h-8 w-8">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-900/20 h-8 w-8">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">All Tables</CardTitle>
                    <Input
                      placeholder="Search tables..."
                      className="bg-gray-900/50 border-gray-700 text-white w-64"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-gray-300">Table</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Capacity</TableHead>
                        <TableHead className="text-gray-300">Location</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-right text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTables.map((table) => (
                        <motion.tr
                          key={table.id}
                          whileHover={{ backgroundColor: "rgba(107, 33, 168, 0.2)" }}
                          className="border-b border-gray-800"
                        >
                          <TableCell className="font-medium text-white">
                            {table.number}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                              {table.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            <div className="flex items-center">
                              {table.capacity}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-400">{table.location}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(table.status)}`}>
                              {table.status}
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}