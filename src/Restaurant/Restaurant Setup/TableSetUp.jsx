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
import { Plus, Trash2, Edit, X, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RestoNav from "../RestoNav";

export default function TableManagement() {
  // Sample table data
  const [tables, setTables] = useState([
    {
      id: 1,
      number: "T1",
      capacity: 4,
      status: "Available",
      location: "Patio",
      type: "Square",
      restaurantId: 1,
      minSpend: "",
      notes: "",
    },
    {
      id: 2,
      number: "T2",
      capacity: 2,
      status: "Occupied",
      location: "Window",
      type: "Round",
      restaurantId: 1,
      minSpend: "",
      notes: "",
    },
    {
      id: 3,
      number: "T3",
      capacity: 6,
      status: "Reserved",
      location: "Center",
      type: "Rectangle",
      restaurantId: 1,
      minSpend: "",
      notes: "",
    },
    {
      id: 4,
      number: "T4",
      capacity: 8,
      status: "Available",
      location: "Private Room",
      type: "Oval",
      restaurantId: 2,
      minSpend: "",
      notes: "",
    },
    {
      id: 5,
      number: "T5",
      capacity: 4,
      status: "Maintenance",
      location: "Bar",
      type: "Square",
      restaurantId: 2,
      minSpend: "",
      notes: "",
    },
  ]);

  // Sample restaurant data
  const restaurants = [
    { id: 1, name: "Urban Bites", location: "Downtown" },
    { id: 2, name: "Coastal Kitchen", location: "Seaside" },
    { id: 3, name: "Mountain Grill", location: "Highlands" },
  ];

  // State for selected restaurant
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]); // Auto-select first restaurant

  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    capacity: 4,
    status: "Available",
    location: "Main Dining",
    type: "Square",
    minSpend: "",
    notes: "",
  });

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTableData, setEditTableData] = useState(null);

  const statusOptions = ["Available", "Occupied", "Reserved", "Maintenance"];
  const locationOptions = [
    "Main Dining",
    "Patio",
    "Window",
    "Center",
    "Private Room",
    "Bar",
  ];
  const tableTypes = [
    "Standard",
    "Booth",
    "Bar",
    "Round",
    "Family",
    "VIP",
    "Square",
    "Rectangle",
    "Oval",
  ];

  // Handle restaurant selection
  const handleRestaurantChange = (value) => {
    const restaurant = restaurants.find((r) => r.id === parseInt(value));
    setSelectedRestaurant(restaurant);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      restaurantId: selectedRestaurant.id,
    };

    setTables([...tables, newTable]);
    setFormData({
      number: "",
      capacity: 4,
      status: "Available",
      location: "Main Dining",
      type: "Square",
      minSpend: "",
      notes: "",
    });
    setIsPopupOpen(false);
  };

  // Edit modal handlers
  const openEditModal = (table) => {
    setEditTableData({ ...table });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTableData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditCapacity = (capacity) => {
    setEditTableData((prev) => ({
      ...prev,
      capacity,
    }));
  };

  const handleEditType = (type) => {
    setEditTableData((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTables((prev) =>
      prev.map((t) => (t.id === editTableData.id ? { ...editTableData } : t))
    );
    setIsEditModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Occupied":
        return "bg-red-100 text-red-700";
      case "Reserved":
        return "bg-purple-100 text-purple-700";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  // Filter tables by selected restaurant
  const filteredTables = tables.filter(
    (table) => table.restaurantId === selectedRestaurant.id
  );

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex-1 p-8">
          {/* Header */}
          <RestoNav />
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">
                Dine-In Table Management
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Select
                  value={selectedRestaurant.id.toString()}
                  onValueChange={handleRestaurantChange}
                >
                  <SelectTrigger className="bg-gray-100 border-gray-300 text-black w-48">
                    <SelectValue placeholder="Select Restaurant" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-black">
                    {restaurants.map((restaurant) => (
                      <SelectItem
                        key={restaurant.id}
                        value={restaurant.id.toString()}
                      >
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <div className="flex gap-3">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="text-purple-700"
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid View
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="text-purple-700"
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
            <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center  z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-xl shadow-2xl w-full max-w-md"
                                style={{ minHeight: "auto", maxHeight: 500, overflowY: "auto" }}

              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-black">
                    Add New Table
                  </h3>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Restaurant
                    </label>
                    <input
                      type="text"
                      value={selectedRestaurant.name}
                      readOnly
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-gray-500 text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Table Number *
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      placeholder="e.g., T1, A2, B3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Seating Capacity *
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[2, 4, 6, 8, 10, 12].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, capacity: num })
                          }
                          className={`p-1 rounded-md border text-xs ${
                            formData.capacity === num
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {num} Seats
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Table Type *
                    </label>
                    <div className="grid grid-cols-2 gap-1">
                      {tableTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, type })}
                          className={`p-1 rounded-md border text-xs ${
                            formData.type === type
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Location Zone *
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                        required
                      >
                        {locationOptions.map((loc) => (
                          <option
                            key={loc}
                            value={loc}
                            className="bg-gray-100 text-sm"
                          >
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                        required
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-gray-100 text-sm"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Minimum Spend (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-gray-400 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        name="minSpend"
                        value={formData.minSpend}
                        onChange={handleChange}
                        className="w-full pl-6 px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Special Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      rows="2"
                      placeholder="Wheelchair accessible, near outlet, etc."
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsPopupOpen(false)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-sm"
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

          {/* Edit Table Modal */}
          {isEditModalOpen && editTableData && (
            <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-xl shadow-2xl w-full max-w-2xl mx-auto"
                style={{ minHeight: "auto", maxHeight: 500, overflowY: "auto" }}
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-black">
                    Edit Table
                  </h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleEditSubmit} className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Table Number *
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={editTableData.number}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Seating Capacity *
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[2, 4, 6, 8, 10, 12].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleEditCapacity(num)}
                          className={`p-1 rounded-md border text-xs ${
                            editTableData.capacity === num
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {num} Seats
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Table Type *
                    </label>
                    <div className="grid grid-cols-2 gap-1">
                      {tableTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleEditType(type)}
                          className={`p-1 rounded-md border text-xs ${
                            editTableData.type === type
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Location Zone *
                      </label>
                      <select
                        name="location"
                        value={editTableData.location}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                        required
                      >
                        {locationOptions.map((loc) => (
                          <option
                            key={loc}
                            value={loc}
                            className="bg-gray-100 text-sm"
                          >
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={editTableData.status}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                        required
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-gray-100 text-sm"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Minimum Spend (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-gray-400 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        name="minSpend"
                        value={editTableData.minSpend}
                        onChange={handleEditChange}
                        className="w-full pl-6 px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Special Notes
                    </label>
                    <textarea
                      name="notes"
                      value={editTableData.notes}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-black text-sm"
                      rows="2"
                      placeholder="Wheelchair accessible, near outlet, etc."
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
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

          {/* Main Content */}
          <div>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTables.map((table) => (
                  <motion.div
                    key={table.id}
                    whileHover={{ scale: 1.03 }}
                    className={`relative rounded-lg border p-4 ${
                      table.status === "Available"
                        ? "border-green-500/30"
                        : table.status === "Occupied"
                        ? "border-red-500/30"
                        : table.status === "Reserved"
                        ? "border-purple-500/30"
                        : "border-yellow-500/30"
                    } bg-white backdrop-blur-sm`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-black">
                          {table.number}
                        </h3>
                        <p className="text-gray-500">{table.type} Table</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          table.status
                        )}`}
                      >
                        {table.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-700 mb-1">
                        {table.capacity} seats
                      </div>
                      <div className="text-sm text-gray-500">
                        {table.location}
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-purple-600 hover:bg-purple-100 h-8 w-8"
                        onClick={() => openEditModal(table)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-100 h-8 w-8"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-black">All Tables</CardTitle>
                    <Input
                      placeholder="Search tables..."
                      className="bg-gray-100 border-gray-300 text-black w-64"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-gray-700">Table</TableHead>
                        <TableHead className="text-gray-700">Type</TableHead>
                        <TableHead className="text-gray-700">
                          Capacity
                        </TableHead>
                        <TableHead className="text-gray-700">
                          Location
                        </TableHead>
                        <TableHead className="text-gray-700">Status</TableHead>
                        <TableHead className="text-right text-gray-700">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTables.map((table) => (
                        <motion.tr
                          key={table.id}
                          whileHover={{
                            backgroundColor: "rgba(168, 85, 247, 0.08)",
                          }}
                          className="border-b border-gray-200"
                        >
                          <TableCell className="font-medium text-black">
                            {table.number}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-purple-500/50 text-purple-700 bg-purple-50"
                            >
                              {table.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <div className="flex items-center">
                              {table.capacity}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-500">
                            {table.location}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                table.status
                              )}`}
                            >
                              {table.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-purple-600 hover:bg-purple-100"
                                onClick={() => openEditModal(table)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:bg-red-100"
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
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
