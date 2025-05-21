import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, Printer, Gauge, Percent } from "lucide-react";
import RestoNav from '../RestoNav';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Configuration() {
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
    const [activeTab, setActiveTab] = useState("tax");
    const [taxSlabs, setTaxSlabs] = useState([
        { id: 1, name: "GST", rate: 5, isActive: true },
        { id: 2, name: "VAT", rate: 12, isActive: true },
        { id: 3, name: "Service Charge", rate: 10, isActive: false }
    ]);
    const [units, setUnits] = useState([
        { id: 1, name: "Kilogram", symbol: "kg", isBase: true },
        { id: 2, name: "Gram", symbol: "g", isBase: false },
        { id: 3, name: "Liter", symbol: "L", isBase: true },
        { id: 4, name: "Milliliter", symbol: "mL", isBase: false }
    ]);
    const [printers, setPrinters] = useState([
        { id: 1, name: "Main Kitchen", ip: "192.168.1.101", isActive: true },
        { id: 2, name: "Bar Station", ip: "192.168.1.102", isActive: true },
        { id: 3, name: "Bakery", ip: "192.168.1.103", isActive: false }
    ]);

    const restaurants = [
        { id: "1", name: "Main Restaurant" },
        { id: "2", name: "Downtown Branch" },
        { id: "3", name: "Mall Outlet" },
    ];

    const handleRestaurantChange = (value) => {
        setSelectedRestaurant(value);
    };

    const toggleTaxStatus = (id) => {
        setTaxSlabs(taxSlabs.map(tax =>
            tax.id === id ? { ...tax, isActive: !tax.isActive } : tax
        ));
    };

    const togglePrinterStatus = (id) => {
        setPrinters(printers.map(printer =>
            printer.id === id ? { ...printer, isActive: !printer.isActive } : printer
        ));
    };

    const addNewTax = () => {
        const newTax = {
            id: taxSlabs.length + 1,
            name: "",
            rate: 0,
            isActive: true
        };
        setTaxSlabs([...taxSlabs, newTax]);
    };

    const addNewUnit = () => {
        const newUnit = {
            id: units.length + 1,
            name: "",
            symbol: "",
            isBase: false
        };
        setUnits([...units, newUnit]);
    };

    const addNewPrinter = () => {
        const newPrinter = {
            id: printers.length + 1,
            name: "",
            ip: "",
            isActive: true
        };
        setPrinters([...printers, newPrinter]);
    };

    return (
        <div className="min-h-screen bg-white lg:ml-64">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-100 to-white"></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent"></div>
            </div>

            <div className="relative z-10">
                <div className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-black">Restaurant Configuration</h2>
                            <p className="text-gray-700">Manage system settings and preferences</p>
                        </div>
                        <RestoNav />
                    </div>

                    {/* Restaurant Selection */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-black">Select Restaurant</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Select onValueChange={handleRestaurantChange} value={selectedRestaurant}>
                                            <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                                                <SelectValue placeholder="Select a restaurant" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300 text-black">
                                                {restaurants.map((restaurant) => (
                                                    <SelectItem
                                                        key={restaurant.id}
                                                        value={restaurant.id}
                                                        className="hover:bg-gray-100"
                                                    >
                                                        {restaurant.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-3 bg-gray-100 border border-gray-300 mb-6">
                                <TabsTrigger value="tax" className="flex items-center gap-2 text-black">
                                    <Percent className="h-4 w-4" /> Tax Slabs
                                </TabsTrigger>
                                <TabsTrigger value="units" className="flex items-center gap-2 text-black">
                                    <Gauge className="h-4 w-4" /> Units
                                </TabsTrigger>
                                <TabsTrigger value="printers" className="flex items-center gap-2 text-black">
                                    <Printer className="h-4 w-4" /> Kitchen Printers
                                </TabsTrigger>
                            </TabsList>

                            {/* Tax Slabs Configuration */}
                            <TabsContent value="tax">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-6">
                                        <CardHeader className="flex flex-row justify-between items-center">
                                            <CardTitle className="text-black">Tax Configuration</CardTitle>
                                            <Button onClick={addNewTax} className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <Plus className="w-4 h-4 mr-2" /> Add Tax
                                            </Button>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableHead className="text-gray-700">Tax Name</TableHead>
                                                        <TableHead className="text-gray-700">Rate (%)</TableHead>
                                                        <TableHead className="text-gray-700">Status</TableHead>
                                                        <TableHead className="text-right text-gray-700">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {taxSlabs.map((tax) => (
                                                        <TableRow key={tax.id} className="border-b border-gray-200">
                                                            <TableCell className="font-medium text-black">
                                                                <Input
                                                                    value={tax.name}
                                                                    onChange={(e) => setTaxSlabs(taxSlabs.map(t =>
                                                                        t.id === tax.id ? { ...t, name: e.target.value } : t
                                                                    ))}
                                                                    className="bg-gray-100 border-gray-300 text-black w-full md:w-64"
                                                                />

                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    type="number"
                                                                    value={tax.rate}
                                                                    onChange={(e) => setTaxSlabs(taxSlabs.map(t =>
                                                                        t.id === tax.id ? { ...t, rate: parseFloat(e.target.value) } : t
                                                                    ))}
                                                                    className="bg-gray-100 border-gray-300 text-black w-24"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Switch
                                                                    checked={tax.isActive}
                                                                    onCheckedChange={() => toggleTaxStatus(tax.id)}
                                                                />
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>

                            {/* Units of Measurement */}
                            <TabsContent value="units">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-6">
                                        <CardHeader className="flex flex-row justify-between items-center">
                                            <CardTitle className="text-black">Units of Measurement</CardTitle>
                                            <Button onClick={addNewUnit} className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <Plus className="w-4 h-4 mr-2" /> Add Unit
                                            </Button>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableHead className="text-gray-700">Unit Name</TableHead>
                                                        <TableHead className="text-gray-700">Symbol</TableHead>
                                                        <TableHead className="text-gray-700">Base Unit</TableHead>
                                                        <TableHead className="text-right text-gray-700">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {units.map((unit) => (
                                                        <TableRow key={unit.id} className="border-b border-gray-200">
                                                            <TableCell className="font-medium text-black">
                                                                <Input
                                                                    value={unit.name}
                                                                    onChange={(e) => setUnits(units.map(u =>
                                                                        u.id === unit.id ? { ...u, name: e.target.value } : u
                                                                    ))}
                                                                    className="bg-gray-100 border-gray-300 text-black w-full md:w-64"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    value={unit.symbol}
                                                                    onChange={(e) =>
                                                                        setUnits(units.map(u =>
                                                                            u.id === unit.id ? { ...u, symbol: e.target.value } : u
                                                                        ))
                                                                    }
                                                                    className="bg-gray-100 border-gray-300 text-black w-24"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Switch
                                                                    checked={unit.isBase}
                                                                    onCheckedChange={() =>
                                                                        setUnits(units.map(u =>
                                                                            u.id === unit.id ? { ...u, isBase: !u.isBase } : u
                                                                        ))
                                                                    }
                                                                />
                                                            </TableCell>

                                                            <TableCell className="text-right">
                                                                <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>

                            {/* Kitchen Printers */}
                            <TabsContent value="printers">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-6">
                                        <CardHeader className="flex flex-row justify-between items-center">
                                            <CardTitle className="text-black">Kitchen Printers</CardTitle>
                                            <Button onClick={addNewPrinter} className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <Plus className="w-4 h-4 mr-2" /> Add Printer
                                            </Button>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div className="space-y-2">
                                                    <Label className="text-gray-700">Default Printer Settings</Label>
                                                    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                                                        <div>
                                                            <Label className="text-gray-700">Print Order Copies</Label>
                                                            <Select defaultValue="1">
                                                                <SelectTrigger className="bg-gray-100 border-gray-300 text-black w-24">
                                                                    <SelectValue placeholder="Copies" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-white border-gray-300 text-black">
                                                                    <SelectItem value="1">1</SelectItem>
                                                                    <SelectItem value="2">2</SelectItem>
                                                                    <SelectItem value="3">3</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Label className="text-gray-700">Print Test Page</Label>
                                                            <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white">
                                                                Print Test
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableHead className="text-gray-700">Printer Name</TableHead>
                                                        <TableHead className="text-gray-700">IP Address</TableHead>
                                                        <TableHead className="text-gray-700">Status</TableHead>
                                                        <TableHead className="text-right text-gray-700">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {printers.map((printer) => (
                                                        <TableRow key={printer.id} className="border-b border-gray-200">
                                                            <TableCell className="font-medium text-black">
                                                                <Input
                                                                    value={printer.name}
                                                                    onChange={(e) => setPrinters(printers.map(p =>
                                                                        p.id === printer.id ? { ...p, name: e.target.value } : p
                                                                    ))}
                                                                    className="bg-gray-100 border-gray-300 text-black w-full md:w-64"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    value={printer.ip}
                                                                    onChange={(e) => setPrinters(printers.map(p =>
                                                                        p.id === printer.id ? { ...p, ip: e.target.value } : p
                                                                    ))}
                                                                    className="bg-gray-100 border-gray-300 text-black w-36"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Switch
                                                                    checked={printer.isActive}
                                                                    onCheckedChange={() => togglePrinterStatus(printer.id)}
                                                                />
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-100">
                                                                        <Printer className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>
                        </Tabs>
                   

                    {!selectedRestaurant && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-16 text-center"
                        >
                            <Printer className="w-12 h-12 text-blue-400 mb-4" />
                            <h3 className="text-xl font-medium text-black mb-2">Select a Restaurant</h3>
                            <p className="text-gray-700 max-w-md">
                                Please select a restaurant from the dropdown above to configure its settings.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}