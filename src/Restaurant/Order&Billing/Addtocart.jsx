// import { useState, useEffect } from "react";
// import {
//   Utensils,
//   Users,
//   CreditCard,
//   Printer,
//   Plus,
//   Minus,
//   Send,
//   Trash2,
//   Check,
//   X,
//   Receipt,
//   Coffee,
//   Pizza,
//   Sandwich,
//   Wine,
//   Dessert,
//   DollarSign,
//   Percent,
//   Home,
//   ShoppingBag,
//   Calendar,
//   BarChart3,
//   Clock,
//   Settings,
//   LogOut,
//   Menu,
// } from "lucide-react";
// import RestoNav from "../RestoNav";

// // Mock data for the POS system
// const TABLES = [
//   { id: 1, name: "Table 1", status: "available" },
//   { id: 2, name: "Table 2", status: "available" },
//   { id: 3, name: "Table 3", status: "available" },
//   { id: 4, name: "Table 4", status: "available" },
//   { id: 5, name: "Table 5", status: "available" },
//   { id: 6, name: "Walk-in", status: "available" },
// ];

// const CATEGORIES = [
//   {
//     id: "starters",
//     name: "Starters",
//     icon: <Sandwich className="icon-small" />,
//   },
//   { id: "mains", name: "Main Course", icon: <Pizza className="icon-small" /> },
//   {
//     id: "desserts",
//     name: "Desserts",
//     icon: <Dessert className="icon-small" />,
//   },
//   {
//     id: "beverages",
//     name: "Beverages",
//     icon: <Coffee className="icon-small" />,
//   },
//   { id: "alcohol", name: "Alcohol", icon: <Wine className="icon-small" /> },
// ];

// const MENU_ITEMS = [
//   // Starters
//   {
//     id: 101,
//     name: "Paneer Tikka",
//     price: 220,
//     category: "starters",
//     stock: 20,
//     kotCategory: "kitchen",
//   },
//   {
//     id: 102,
//     name: "Veg Spring Rolls",
//     price: 180,
//     category: "starters",
//     stock: 15,
//     kotCategory: "kitchen",
//   },
//   {
//     id: 103,
//     name: "Chicken Wings",
//     price: 250,
//     category: "starters",
//     stock: 25,
//     kotCategory: "kitchen",
//   },
//   {
//     id: 104,
//     name: "Mushroom Chilli",
//     price: 190,
//     category: "starters",
//     stock: 18,
//     kotCategory: "kitchen",
//   },

//   // Mains
//   {
//     id: 201,
//     name: "Butter Chicken",
//     price: 320,
//     category: "mains",
//     stock: 30,
//     kotCategory: "kitchen",
//   },
//   {
//     id: 202,
//     name: "Veg Biryani",
//     price: 280,
//     category: "mains",
//     stock: 25,
//     kotCategory: "kitchen",
//   },
//   {
//     id: 203,
//     name: "Palak Paneer",
//     price: 260,
//     category: "mains",
//     stock: 20,
//     kotCategory: "kitchen",
//   },
//   {
//     id: 204,
//     name: "Fish Curry",
//     price: 340,
//     category: "mains",
//     stock: 15,
//     kotCategory: "kitchen",
//   },

//   // Desserts
//   {
//     id: 301,
//     name: "Gulab Jamun",
//     price: 120,
//     category: "desserts",
//     stock: 40,
//     kotCategory: "kitchen",
//   },
//   {
//     id: 302,
//     name: "Ice Cream",
//     price: 150,
//     category: "desserts",
//     stock: 50,
//     kotCategory: "kitchen",
//   },

//   // Beverages
//   {
//     id: 401,
//     name: "Masala Chai",
//     price: 80,
//     category: "beverages",
//     stock: 100,
//     kotCategory: "bar",
//   },
//   {
//     id: 402,
//     name: "Cold Coffee",
//     price: 120,
//     category: "beverages",
//     stock: 80,
//     kotCategory: "bar",
//   },
//   {
//     id: 403,
//     name: "Fresh Lime Soda",
//     price: 100,
//     category: "beverages",
//     stock: 90,
//     kotCategory: "bar",
//   },

//   // Alcohol
//   {
//     id: 501,
//     name: "Beer",
//     price: 220,
//     category: "alcohol",
//     stock: 50,
//     kotCategory: "bar",
//   },
//   {
//     id: 502,
//     name: "Whiskey (30ml)",
//     price: 280,
//     category: "alcohol",
//     stock: 60,
//     kotCategory: "bar",
//   },
//   {
//     id: 503,
//     name: "Wine (Glass)",
//     price: 320,
//     category: "alcohol",
//     stock: 40,
//     kotCategory: "bar",
//   },
// ];

// const PAYMENT_MODES = [
//   { id: "cash", name: "Cash" },
//   { id: "card", name: "Card" },
//   { id: "upi", name: "UPI" },
//   { id: "wallet", name: "Wallet" },
// ];

// const TAX_RATES = {
//   gst: 0.05, // 5% GST
//   serviceCharge: 0.1, // 10% Service Charge
// };

// const COUPONS = [
//   { code: "WELCOME20", discount: 0.2, minAmount: 500, maxDiscount: 200 },
//   { code: "SPECIAL10", discount: 0.1, minAmount: 300, maxDiscount: 100 },
// ];

// export default function POSSystem() {
//   // State for order management
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("starters");
//   const [cartItems, setCartItems] = useState([]);
//   const [kotId, setKotId] = useState(null);
//   const [kots, setKots] = useState([]);
//   const [kotStatus, setKotStatus] = useState("pending"); // pending, sent

//   // State for billing
//   const [subtotal, setSubtotal] = useState(0);
//   const [taxes, setTaxes] = useState({ gst: 0, serviceCharge: 0 });
//   const [discountType, setDiscountType] = useState("none"); // none, manual, coupon
//   const [discountValue, setDiscountValue] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // State for payment
//   const [paymentModes, setPaymentModes] = useState([
//     { mode: "cash", amount: 0 },
//     { mode: "card", amount: 0 },
//     { mode: "upi", amount: 0 },
//     { mode: "wallet", amount: 0 },
//   ]);
//   const [totalPaid, setTotalPaid] = useState(0);
//   const [orderFinalized, setOrderFinalized] = useState(false);

//   // State for UI
//   const [activeTab, setActiveTab] = useState("order");
//   const [showBillPreview, setShowBillPreview] = useState(false);
//   const [showKitchenView, setShowKitchenView] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Generate KOT ID when table is selected
//   useEffect(() => {
//     if (selectedTable) {
//       const newKotId = `KOT${Date.now().toString().slice(-6)}`;
//       setKotId(newKotId);
//       console.log(`New KOT generated: ${newKotId} for table: ${selectedTable}`);
//     } else {
//       setKotId(null);
//       setCartItems([]);
//     }
//   }, [selectedTable]);

//   // Calculate subtotal, taxes and total whenever cart changes
//   useEffect(() => {
//     const newSubtotal = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     setSubtotal(newSubtotal);

//     const gstAmount = newSubtotal * TAX_RATES.gst;
//     const serviceChargeAmount = newSubtotal * TAX_RATES.serviceCharge;
//     setTaxes({ gst: gstAmount, serviceCharge: serviceChargeAmount });

//     // Recalculate discount if coupon is applied
//     if (couponApplied) {
//       applyCoupon(couponCode);
//     } else if (discountType === "manual") {
//       calculateManualDiscount(discountValue);
//     } else {
//       setDiscountAmount(0);
//     }
//   }, [cartItems]);

//   // Calculate total amount whenever subtotal, taxes or discount changes
//   useEffect(() => {
//     const total = subtotal + taxes.gst + taxes.serviceCharge - discountAmount;
//     setTotalAmount(total);
//   }, [subtotal, taxes, discountAmount]);

//   // Calculate total paid amount
//   useEffect(() => {
//     const paid = paymentModes.reduce((sum, payment) => sum + payment.amount, 0);
//     setTotalPaid(paid);
//   }, [paymentModes]);

//   // Add item to cart
//   const addItemToCart = (item) => {
//     if (!selectedTable) {
//       alert("Please select a table first");
//       return;
//     }

//     // Check if item is already in cart
//     const existingItemIndex = cartItems.findIndex(
//       (cartItem) => cartItem.id === item.id
//     );

//     if (existingItemIndex >= 0) {
//       // Item exists, increase quantity
//       const updatedCartItems = [...cartItems];

//       // Check stock availability
//       if (updatedCartItems[existingItemIndex].quantity >= item.stock) {
//         alert(`Sorry, only ${item.stock} units of ${item.name} are available`);
//         return;
//       }

//       updatedCartItems[existingItemIndex].quantity += 1;
//       setCartItems(updatedCartItems);
//       console.log(
//         `Increased quantity of ${item.name} to ${updatedCartItems[existingItemIndex].quantity}`
//       );
//     } else {
//       // Item doesn't exist, add new item
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//       console.log(`Added ${item.name} to cart`);
//     }
//   };

//   // Remove item from cart
//   const removeItemFromCart = (itemId) => {
//     const existingItemIndex = cartItems.findIndex((item) => item.id === itemId);

//     if (existingItemIndex >= 0) {
//       const updatedCartItems = [...cartItems];

//       if (updatedCartItems[existingItemIndex].quantity > 1) {
//         // Decrease quantity if more than 1
//         updatedCartItems[existingItemIndex].quantity -= 1;
//         setCartItems(updatedCartItems);
//         console.log(`Decreased quantity of item ID ${itemId}`);
//       } else {
//         // Remove item if quantity is 1
//         const filteredItems = cartItems.filter((item) => item.id !== itemId);
//         setCartItems(filteredItems);
//         console.log(`Removed item ID ${itemId} from cart`);
//       }
//     }
//   };

//   // Delete item from cart completely
//   const deleteItemFromCart = (itemId) => {
//     const filteredItems = cartItems.filter((item) => item.id !== itemId);
//     setCartItems(filteredItems);
//     console.log(`Deleted item ID ${itemId} from cart completely`);
//   };

//   // Send order to kitchen (create KOTs)
//   const sendToKitchen = () => {
//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     // Group items by KOT category (kitchen or bar)
//     const kitchenItems = cartItems.filter(
//       (item) => item.kotCategory === "kitchen"
//     );
//     const barItems = cartItems.filter((item) => item.kotCategory === "bar");

//     const newKots = [];

//     if (kitchenItems.length > 0) {
//       const kitchenKotId = `${kotId}-K`;
//       newKots.push({
//         id: kitchenKotId,
//         items: kitchenItems,
//         category: "kitchen",
//         status: "preparing",
//         timestamp: new Date().toISOString(),
//       });
//       console.log(
//         `Kitchen KOT created: ${kitchenKotId} with ${kitchenItems.length} items`
//       );
//     }

//     if (barItems.length > 0) {
//       const barKotId = `${kotId}-B`;
//       newKots.push({
//         id: barKotId,
//         items: barItems,
//         category: "bar",
//         status: "preparing",
//         timestamp: new Date().toISOString(),
//       });
//       console.log(`Bar KOT created: ${barKotId} with ${barItems.length} items`);
//     }

//     setKots([...kots, ...newKots]);
//     setKotStatus("sent");

//     // Move to billing tab
//     setActiveTab("billing");
//   };

//   // Apply manual discount
//   const calculateManualDiscount = (value) => {
//     if (value <= 0) {
//       setDiscountAmount(0);
//       return;
//     }

//     if (discountType === "manual") {
//       // Calculate discount amount (percentage or fixed)
//       let discount = 0;

//       if (value <= 100) {
//         // Treat as percentage if <= 100
//         discount = subtotal * (value / 100);
//       } else {
//         // Treat as fixed amount if > 100
//         discount = value;
//       }

//       // Ensure discount doesn't exceed subtotal
//       discount = Math.min(discount, subtotal);

//       setDiscountAmount(discount);
//       console.log(`Applied manual discount: ${discount}`);
//     }
//   };

//   // Apply coupon code
//   const applyCoupon = (code) => {
//     const coupon = COUPONS.find((c) => c.code === code);

//     if (!coupon) {
//       alert("Invalid coupon code");
//       setCouponApplied(false);
//       setDiscountAmount(0);
//       return;
//     }

//     if (subtotal < coupon.minAmount) {
//       alert(`Minimum order amount for this coupon is ₹${coupon.minAmount}`);
//       setCouponApplied(false);
//       setDiscountAmount(0);
//       return;
//     }

//     // Calculate discount amount
//     let discount = subtotal * coupon.discount;

//     // Apply max discount cap
//     discount = Math.min(discount, coupon.maxDiscount);

//     setDiscountAmount(discount);
//     setCouponApplied(true);
//     console.log(`Applied coupon ${code}: Discount amount ₹${discount}`);
//   };

//   // Handle payment mode amount change
//   const handlePaymentChange = (mode, amount) => {
//     const numAmount = Number.parseFloat(amount) || 0;

//     const updatedPaymentModes = paymentModes.map((payment) => {
//       if (payment.mode === mode) {
//         return { ...payment, amount: numAmount };
//       }
//       return payment;
//     });

//     setPaymentModes(updatedPaymentModes);
//     console.log(`Updated payment: ${mode} - ₹${numAmount}`);
//   };

//   // Finalize and print bill
//   const finalizeBill = () => {
//     if (totalPaid < totalAmount) {
//       alert(
//         `Payment amount (₹${totalPaid.toFixed(
//           2
//         )}) is less than total bill amount (₹${totalAmount.toFixed(2)})`
//       );
//       return;
//     }

//     // Create final bill object
//     const bill = {
//       billId: `BILL-${Date.now().toString().slice(-6)}`,
//       kotId: kotId,
//       tableId: selectedTable,
//       items: cartItems,
//       subtotal: subtotal,
//       taxes: taxes,
//       discount: {
//         type: discountType,
//         value: discountValue,
//         amount: discountAmount,
//         couponCode: couponApplied ? couponCode : null,
//       },
//       totalAmount: totalAmount,
//       paymentModes: paymentModes,
//       timestamp: new Date().toISOString(),
//     };

//     // In a real app, this would be sent to the server
//     console.log("Bill finalized:", bill);

//     // Update KOT status to completed
//     const updatedKots = kots.map((kot) => {
//       if (kot.id.startsWith(kotId)) {
//         return { ...kot, status: "completed" };
//       }
//       return kot;
//     });

//     setKots(updatedKots);
//     setOrderFinalized(true);
//     setShowBillPreview(true);

//     // In a real app, this would trigger stock deduction
//     console.log("Stock deduction would happen here based on recipe mapping");
//   };

//   // Reset order after finalization
//   const resetOrder = () => {
//     setSelectedTable(null);
//     setCartItems([]);
//     setKotId(null);
//     setKotStatus("pending");
//     setDiscountType("none");
//     setDiscountValue(0);
//     setDiscountAmount(0);
//     setCouponCode("");
//     setCouponApplied(false);
//     setPaymentModes([
//       { mode: "cash", amount: 0 },
//       { mode: "card", amount: 0 },
//       { mode: "upi", amount: 0 },
//       { mode: "wallet", amount: 0 },
//     ]);
//     setOrderFinalized(false);
//     setActiveTab("order");
//     setShowBillPreview(false);

//     console.log("Order reset, ready for new order");
//   };

//   // Mark KOT as ready (for kitchen view)
//   const markKotAsReady = (kotId) => {
//     const updatedKots = kots.map((kot) => {
//       if (kot.id === kotId) {
//         return { ...kot, status: "ready" };
//       }
//       return kot;
//     });

//     setKots(updatedKots);
//     console.log(`KOT ${kotId} marked as ready`);
//   };

//   // Toggle sidebar
//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   return (
//     <div className="min-h-screen">
//       <RestoNav />
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-gray-900 to-black"></div>
//         <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent"></div>
//       </div>

//       <div className="flex h-screen relative z-10">
//         <div
//           className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
//             sidebarCollapsed ? "w-16" : "w-64"
//           }`}
//         >
//           {/* Sidebar Header */}
//           <div className="border-b border-gray-800 p-4 flex items-center gap-2">
//             <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
//               <Utensils className="h-4 w-4 text-white" />
//             </div>
//             {!sidebarCollapsed && (
//               <div>
//                 <h3 className="text-lg font-semibold text-white">RestoPOS</h3>
//                 <p className="text-xs text-gray-400">Restaurant Management</p>
//               </div>
//             )}
//             <button
//               className="ml-auto text-gray-400 hover:text-white"
//               onClick={toggleSidebar}
//             >
//               <Menu className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Sidebar Menu */}
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-auto">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h1 className="text-2xl font-bold ">Restaurant POS</h1>
//                 <p className="">
//                   {selectedTable
//                     ? `Table: ${
//                         TABLES.find((t) => t.id === selectedTable)?.name
//                       }`
//                     : "No table selected"}
//                   {kotId && ` | KOT: ${kotId}`}
//                 </p>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   className="px-4 py-2 border border-gray-700 rounded-md  flex items-center gap-2 "
//                   onClick={() => setShowKitchenView(!showKitchenView)}
//                 >
//                   <Utensils className="w-4 h-4" />
//                   Kitchen View
//                 </button>

//                 <button
//                   className="px-4 py-2 border border-gray-700 rounded-md  flex items-center gap-2 "
//                   onClick={resetOrder}
//                 >
//                   <X className="w-4 h-4" />
//                   New Order
//                 </button>
//               </div>
//             </div>

//             {/* Main POS Interface */}
//             <div className="grid grid-cols-1 gap-6">
//               {/* Kitchen View Dialog */}
//               {showKitchenView && (
//                 <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//                   <div className="bg-white text-black   rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <div>
//                         <h2 className="text-xl font-bold">
//                           Kitchen Order View
//                         </h2>
//                         <p className="text-black">
//                           Real-time view of all active kitchen orders
//                         </p>
//                       </div>
//                       <button
//                         className="text-black"
//                         onClick={() => setShowKitchenView(false)}
//                       >
//                         <X className="w-6 h-6" />
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                       <div>
//                         <h3 className="text-lg font-semibold mb-2 flex items-center">
//                           <Utensils className="w-4 h-4 mr-2" />
//                           Kitchen Orders
//                         </h3>
//                         <div className="h-[400px] border border-gray-800 rounded-md p-4 overflow-auto">
//                           {kots.filter((kot) => kot.category === "kitchen")
//                             .length > 0 ? (
//                             kots
//                               .filter((kot) => kot.category === "kitchen")
//                               .map((kot) => (
//                                 <div
//                                   key={kot.id}
//                                   className="bg-gray-800 border border-gray-700 rounded-lg mb-4 p-4"
//                                 >
//                                   <div className="flex justify-between items-center pb-2">
//                                     <h4 className="text-sm font-medium">
//                                       {kot.id}
//                                     </h4>
//                                     <span
//                                       className={`px-2 py-1 text-xs rounded-full ${
//                                         kot.status === "preparing"
//                                           ? "bg-yellow-600"
//                                           : kot.status === "ready"
//                                           ? "bg-green-600"
//                                           : "bg-blue-600"
//                                       }`}
//                                     >
//                                       {kot.status}
//                                     </span>
//                                   </div>
//                                   <ul className="space-y-1 text-sm">
//                                     {kot.items.map((item) => (
//                                       <li
//                                         key={item.id}
//                                         className="flex justify-between"
//                                       >
//                                         <span>
//                                           {item.quantity}x {item.name}
//                                         </span>
//                                       </li>
//                                     ))}
//                                   </ul>

//                                   {kot.status === "preparing" && (
//                                     <button
//                                       className="mt-2 w-full py-1 px-2 bg-green-600 hover:bg-green-700 rounded-md text-sm flex items-center justify-center gap-1"
//                                       onClick={() => markKotAsReady(kot.id)}
//                                     >
//                                       <Check className="w-3 h-3" />
//                                       Mark as Ready
//                                     </button>
//                                   )}

//                                   <button className="mt-2 w-full py-1 px-2 border border-gray-600 rounded-md text-sm flex items-center justify-center gap-1">
//                                     <Printer className="w-3 h-3" />
//                                     Print KOT
//                                   </button>
//                                 </div>
//                               ))
//                           ) : (
//                             <div className="text-center py-8 text-gray-500">
//                               No kitchen orders
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div>
//                         <h3 className="text-lg font-semibold mb-2 flex items-center">
//                           <Wine className="w-4 h-4 mr-2" />
//                           Bar Orders
//                         </h3>
//                         <div className="h-[400px] border border-gray-800 rounded-md p-4 overflow-auto">
//                           {kots.filter((kot) => kot.category === "bar").length >
//                           0 ? (
//                             kots
//                               .filter((kot) => kot.category === "bar")
//                               .map((kot) => (
//                                 <div
//                                   key={kot.id}
//                                   className="bg-gray-800 border border-gray-700 rounded-lg mb-4 p-4"
//                                 >
//                                   <div className="flex justify-between items-center pb-2">
//                                     <h4 className="text-sm font-medium">
//                                       {kot.id}
//                                     </h4>
//                                     <span
//                                       className={`px-2 py-1 text-xs rounded-full ${
//                                         kot.status === "preparing"
//                                           ? "bg-yellow-600"
//                                           : kot.status === "ready"
//                                           ? "bg-green-600"
//                                           : "bg-blue-600"
//                                       }`}
//                                     >
//                                       {kot.status}
//                                     </span>
//                                   </div>
//                                   <ul className="space-y-1 text-sm">
//                                     {kot.items.map((item) => (
//                                       <li
//                                         key={item.id}
//                                         className="flex justify-between"
//                                       >
//                                         <span>
//                                           {item.quantity}x {item.name}
//                                         </span>
//                                       </li>
//                                     ))}
//                                   </ul>

//                                   {kot.status === "preparing" && (
//                                     <button
//                                       className="mt-2 w-full py-1 px-2 bg-green-600 hover:bg-green-700 rounded-md text-sm flex items-center justify-center gap-1"
//                                       onClick={() => markKotAsReady(kot.id)}
//                                     >
//                                       <Check className="w-3 h-3" />
//                                       Mark as Ready
//                                     </button>
//                                   )}

//                                   <button className="mt-2 w-full py-1 px-2 border border-gray-600 rounded-md text-sm flex items-center justify-center gap-1">
//                                     <Printer className="w-3 h-3" />
//                                     Print KOT
//                                   </button>
//                                 </div>
//                               ))
//                           ) : (
//                             <div className="text-center py-8 text-gray-500">
//                               No bar orders
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Bill Preview Dialog */}
//               {showBillPreview && (
//                 <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//                   <div className="bg-white text-black border border-purple-500/20 rounded-lg max-w-md w-full max-h-[90vh] overflow-auto p-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <div>
//                         <h2 className="text-xl font-bold">Bill Preview</h2>
//                         <p className="text-gray-700">
//                           Bill #{kotId?.replace("KOT", "BILL")}
//                         </p>
//                       </div>
//                       <button
//                         className="text-black"
//                         onClick={() => setShowBillPreview(false)}
//                       >
//                         <X className="w-6 h-6" />
//                       </button>
//                     </div>

//                     <div className="space-y-4 mt-4">
//                       <div className="text-center border-b border-gray-200 pb-2">
//                         <h3 className="font-bold text-lg">
//                           Your Restaurant Name
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           123 Restaurant Street, City
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Tel: 123-456-7890
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           GSTIN: 22AAAAA0000A1Z5
//                         </p>
//                       </div>

//                       <div className="flex justify-between text-sm">
//                         <span>Date: {new Date().toLocaleDateString()}</span>
//                         <span>Time: {new Date().toLocaleTimeString()}</span>
//                       </div>

//                       <div className="flex justify-between text-sm">
//                         <span>
//                           Table:{" "}
//                           {TABLES.find((t) => t.id === selectedTable)?.name}
//                         </span>
//                         <span>KOT: {kotId}</span>
//                       </div>

//                       <hr className="border-gray-200" />

//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm font-medium">
//                           <span>Item</span>
//                           <div className="flex gap-8">
//                             <span>Qty</span>
//                             <span>Price</span>
//                             <span>Amount</span>
//                           </div>
//                         </div>

//                         {cartItems.map((item) => (
//                           <div
//                             key={item.id}
//                             className="flex justify-between text-sm"
//                           >
//                             <span>{item.name}</span>
//                             <div className="flex gap-8">
//                               <span className="w-8 text-center">
//                                 {item.quantity}
//                               </span>
//                               <span className="w-12 text-right">
//                                 ₹{item.price}
//                               </span>
//                               <span className="w-16 text-right">
//                                 ₹{(item.price * item.quantity).toFixed(2)}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <hr className="border-gray-200" />

//                       <div className="space-y-1">
//                         <div className="flex justify-between text-sm">
//                           <span>Subtotal:</span>
//                           <span>₹{subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span>GST (5%):</span>
//                           <span>₹{taxes.gst.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span>Service Charge (10%):</span>
//                           <span>₹{taxes.serviceCharge.toFixed(2)}</span>
//                         </div>
//                         {discountAmount > 0 && (
//                           <div className="flex justify-between text-sm text-green-600">
//                             <span>
//                               Discount {couponApplied ? `(${couponCode})` : ""}:
//                             </span>
//                             <span>-₹{discountAmount.toFixed(2)}</span>
//                           </div>
//                         )}
//                         <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
//                           <span>Total:</span>
//                           <span>₹{totalAmount.toFixed(2)}</span>
//                         </div>
//                       </div>

//                       <hr className="border-gray-200" />

//                       <div className="space-y-1">
//                         <div className="text-sm font-medium">
//                           Payment Details:
//                         </div>
//                         {paymentModes
//                           .filter((p) => p.amount > 0)
//                           .map((payment) => (
//                             <div
//                               key={payment.mode}
//                               className="flex justify-between text-sm"
//                             >
//                               <span>{payment.mode.toUpperCase()}:</span>
//                               <span>₹{payment.amount.toFixed(2)}</span>
//                             </div>
//                           ))}

//                         {totalPaid > totalAmount && (
//                           <div className="flex justify-between text-sm">
//                             <span>Change:</span>
//                             <span>₹{(totalPaid - totalAmount).toFixed(2)}</span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="text-center text-sm text-gray-500 pt-4">
//                         <p>Thank you for dining with us!</p>
//                         <p>Visit again soon</p>
//                       </div>

//                       <div className="flex justify-end mt-4">
//                         <button
//                           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
//                           onClick={() => {
//                             setShowBillPreview(false);
//                             resetOrder();
//                           }}
//                         >
//                           <Printer className="w-4 h-4" />
//                           Print & New Order
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Main Tabs */}
//               <div className="w-full">
//                 <div className="flex bg-gray-800 border-gray-700 rounded-t-lg mb-4">
//                   <button
//                     className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
//                       activeTab === "order"
//                         ? "bg-purple-600 text-white"
//                         : "text-gray-300 hover:bg-gray-700"
//                     } ${orderFinalized ? "opacity-50 cursor-not-allowed" : ""}`}
//                     onClick={() => !orderFinalized && setActiveTab("order")}
//                     disabled={orderFinalized}
//                   >
//                     <Utensils className="w-4 h-4" />
//                     Order Entry
//                   </button>
//                   <button
//                     className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
//                       activeTab === "billing"
//                         ? "bg-purple-600 text-white"
//                         : "text-gray-300 hover:bg-gray-700"
//                     } ${
//                       cartItems.length === 0 || orderFinalized
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       cartItems.length > 0 &&
//                       !orderFinalized &&
//                       setActiveTab("billing")
//                     }
//                     disabled={cartItems.length === 0 || orderFinalized}
//                   >
//                     <Receipt className="w-4 h-4" />
//                     Billing
//                   </button>
//                   <button
//                     className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
//                       activeTab === "payment"
//                         ? "bg-purple-600 text-white"
//                         : "text-gray-300 hover:bg-gray-700"
//                     } ${
//                       cartItems.length === 0 || orderFinalized
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       cartItems.length > 0 &&
//                       !orderFinalized &&
//                       setActiveTab("payment")
//                     }
//                     disabled={cartItems.length === 0 || orderFinalized}
//                   >
//                     <CreditCard className="w-4 h-4" />
//                     Payment
//                   </button>
//                 </div>

//                 {/* Order Entry Tab */}
//                 {activeTab === "order" && (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Table Selection & Cart */}
//                     <div className="lg:col-span-1 space-y-6">
//                       {/* Table Selection */}
//                       <div className="border border-blue-500/20  backdrop-blur-sm rounded-lg overflow-hidden">
//                         <div className="p-4 border-b border-gray-800">
//                           <h3 className=" flex items-center gap-2 text-lg font-medium">
//                             <Users className="w-4 h-4 text-blue-400" />
//                             Table Selection
//                           </h3>
//                         </div>
//                         <div className="p-4">
//                           <select
//                             className="w-full  border border-gray-700 rounded-md px-3 py-2 "
//                             value={selectedTable || ""}
//                             onChange={(e) =>
//                               setSelectedTable(Number.parseInt(e.target.value))
//                             }
//                             disabled={cartItems.length > 0}
//                           >
//                             <option value="">Select a table</option>
//                             {TABLES.map((table) => (
//                               <option key={table.id} value={table.id}>
//                                 {table.name}
//                               </option>
//                             ))}
//                           </select>

//                           <div className="grid grid-cols-3 gap-2 mt-4">
//                             {TABLES.map((table) => (
//                               <button
//                                 key={table.id}
//                                 className={`py-2 px-3 rounded-md ${
//                                   selectedTable === table.id
//                                     ? "bg-purple-600  text-white"
//                                     : "border border-gray-700 text-black "
//                                 } ${
//                                   cartItems.length > 0 &&
//                                   selectedTable !== table.id
//                                     ? "opacity-50 cursor-not-allowed"
//                                     : ""
//                                 }`}
//                                 onClick={() =>
//                                   cartItems.length === 0 ||
//                                   selectedTable === table.id
//                                     ? setSelectedTable(table.id)
//                                     : null
//                                 }
//                                 disabled={
//                                   cartItems.length > 0 &&
//                                   selectedTable !== table.id
//                                 }
//                               >
//                                 {table.name}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Cart Summary */}
//                       <div className="border border-blue-500/20  backdrop-blur-sm rounded-lg overflow-hidden">
//                         <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//                           <h3 className="flex items-center gap-2 text-lg font-medium">
//                             <Receipt className="w-4 h-4 text-blue-400" />
//                             Cart Summary
//                           </h3>
//                           {kotId && (
//                             <span className="px-2 py-1 text-xs bg-purple-600 rounded-full text-white">
//                               {kotId}
//                             </span>
//                           )}
//                         </div>
//                         <div className="p-4">
//                           {cartItems.length > 0 ? (
//                             <div className="h-[300px] pr-4 overflow-auto">
//                               <div className="space-y-3">
//                                 {cartItems.map((item) => (
//                                   <div
//                                     key={item.id}
//                                     className="flex justify-between items-center border-b border-gray-800 pb-2"
//                                   >
//                                     <div className="flex-1">
//                                       <div className="font-medium ">
//                                         {item.name}
//                                       </div>
//                                       <div className="text-sm ">
//                                         ₹{item.price} x {item.quantity}
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                       <button
//                                         className="h-7 w-7 rounded-full border border-gray-700 flex items-center justify-center   "
//                                         onClick={() =>
//                                           removeItemFromCart(item.id)
//                                         }
//                                       >
//                                         <Minus className="h-3 w-3" />
//                                       </button>
//                                       <span className="w-6 text-center  ">
//                                         {item.quantity}
//                                       </span>
//                                       <button
//                                         className="h-7 w-7 rounded-full border border-gray-700 flex items-center justify-center  "
//                                         onClick={() => addItemToCart(item)}
//                                       >
//                                         <Plus className="h-3 w-3" />
//                                       </button>
//                                       <button
//                                         className="h-7 w-7 text-gray-500 hover:text-red-500 flex items-center justify-center"
//                                         onClick={() =>
//                                           deleteItemFromCart(item.id)
//                                         }
//                                       >
//                                         <Trash2 className="h-3 w-3" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="text-center py-8 text-gray-500">
//                               Cart is empty
//                             </div>
//                           )}

//                           {cartItems.length > 0 && (
//                             <div className="mt-4 space-y-3">
//                               <div className="flex justify-between ">
//                                 <span>Subtotal:</span>
//                                 <span>₹{subtotal.toFixed(2)}</span>
//                               </div>

//                               <button
//                                 className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
//                                   kotStatus === "sent"
//                                     ? "bg-gray-700 cursor-not-allowed"
//                                     : "bg-blue-600 hover:bg-blue-700"
//                                 } text-white`}
//                                 onClick={sendToKitchen}
//                                 disabled={kotStatus === "sent"}
//                               >
//                                 <Send className="w-4 h-4" />
//                                 {kotStatus === "sent"
//                                   ? "Order Sent to Kitchen"
//                                   : "Send to Kitchen"}
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="lg:col-span-2">
//                       <div className="border border-blue-500/20  backdrop-blur-sm rounded-lg overflow-hidden">
//                         <div className="p-4 border-b border-gray-800">
//                           <h3 className="flex items-center gap-2 text-lg font-medium">
//                             <Utensils className="w-4 h-4 text-blue-400" />
//                             Menu Items
//                           </h3>
//                         </div>
//                         <div className="p-4">
//                           {/* Category Tabs */}
//                           <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
//                             {CATEGORIES.map((category) => (
//                               <button
//                                 key={category.id}
//                                 className={`py-2 px-3 rounded-md flex items-center gap-2 ${
//                                   selectedCategory === category.id
//                                     ? "bg-purple-600  text-white"
//                                     : "border border-gray-700 "
//                                 }`}
//                                 onClick={() => setSelectedCategory(category.id)}
//                               >
//                                 {category.icon}
//                                 {category.name}
//                               </button>
//                             ))}
//                           </div>

//                           {/* Items Grid */}
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                             {MENU_ITEMS.filter(
//                               (item) => item.category === selectedCategory
//                             ).map((item) => (
//                               <div
//                                 key={item.id}
//                                 className="  border-gray-800 hover:border-blue-500/50 transition-colors cursor-pointer rounded-lg p-3"
//                                 onClick={() => addItemToCart(item)}
//                               >
//                                 <div className="font-medium  ">{item.name}</div>
//                                 <div className="flex justify-between items-center mt-1">
//                                   <div className="text-black-400 font-medium">
//                                     ₹{item.price}
//                                   </div>
//                                   <div className="text-xs ">
//                                     Stock: {item.stock}
//                                   </div>
//                                 </div>
//                                 <button className="w-full mt-2 py-1 px-2 bg-purple-600  rounded-md text-sm flex items-center justify-center gap-1 text-white">
//                                   <Plus className="w-3 h-3" />
//                                   Add
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Billing Tab */}
//                 {activeTab === "billing" && (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Order Summary */}
//                     <div className="lg:col-span-1 space-y-6">
//                       <div className="border border-blue-500/20  backdrop-blur-sm rounded-lg overflow-hidden">
//                         <div className="p-4 border-b border-gray-800">
//                           <h3 className=" flex items-center gap-2 text-lg font-medium">
//                             <Receipt className="w-4 h-4 text-blue-400" />
//                             Order Summary
//                           </h3>
//                         </div>
//                         <div className="p-4">
//                           <div className="h-[300px] pr-4 overflow-auto">
//                             <div className="space-y-3">
//                               {cartItems.map((item) => (
//                                 <div
//                                   key={item.id}
//                                   className="flex justify-between items-center border-b border-gray-800 pb-2"
//                                 >
//                                   <div className="flex-1">
//                                     <div className="font-medium ">
//                                       {item.name}
//                                     </div>
//                                     <div className="text-sm ">
//                                       ₹{item.price} x {item.quantity}
//                                     </div>
//                                   </div>
//                                   <div className="text-white font-medium">
//                                     ₹{(item.price * item.quantity).toFixed(2)}
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           <div className="mt-4 space-y-2 pt-2 border-t border-gray-800">
//                             <div className="flex justify-between ">
//                               <span>Subtotal:</span>
//                               <span>₹{subtotal.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between ">
//                               <span>GST (5%):</span>
//                               <span>₹{taxes.gst.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between ">
//                               <span>Service Charge (10%):</span>
//                               <span>₹{taxes.serviceCharge.toFixed(2)}</span>
//                             </div>
//                             {discountAmount > 0 && (
//                               <div className="flex justify-between text-green-500">
//                                 <span>Discount:</span>
//                                 <span>-₹{discountAmount.toFixed(2)}</span>
//                               </div>
//                             )}
//                             <div className="flex justify-between  font-bold pt-2 border-t border-gray-800">
//                               <span>Total:</span>
//                               <span>₹{totalAmount.toFixed(2)}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Discount & Tax */}
//                     <div className="lg:col-span-2">
//                       <div className="border border-blue-500/20 backdrop-blur-sm rounded-lg overflow-hidden">
//                         <div className="p-4 border-b border-gray-800">
//                           <h3 className=" flex items-center gap-2 text-lg font-medium">
//                             <Percent className="w-4 h-4 text-blue-400" />
//                             Discounts & Taxes
//                           </h3>
//                         </div>
//                         <div className="p-4">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Discount Section */}
//                             <div className="space-y-4">
//                               <h3 className="font-medium ">Apply Discount</h3>

//                               <div className="space-y-2">
//                                 <div className="flex items-center gap-2">
//                                   <input
//                                     type="radio"
//                                     id="discount-none"
//                                     name="discount-type"
//                                     checked={discountType === "none"}
//                                     onChange={() => {
//                                       setDiscountType("none");
//                                       setDiscountValue(0);
//                                       setDiscountAmount(0);
//                                       setCouponApplied(false);
//                                     }}
//                                   />
//                                   <label htmlFor="discount-none" className="">
//                                     No Discount
//                                   </label>
//                                 </div>

//                                 <div className="flex items-center gap-2">
//                                   <input
//                                     type="radio"
//                                     id="discount-manual"
//                                     name="discount-type"
//                                     checked={discountType === "manual"}
//                                     onChange={() => {
//                                       setDiscountType("manual");
//                                       setCouponApplied(false);
//                                       calculateManualDiscount(discountValue);
//                                     }}
//                                   />
//                                   <label htmlFor="discount-manual" className="">
//                                     Manual Discount
//                                   </label>
//                                 </div>

//                                 {discountType === "manual" && (
//                                   <div className="flex gap-2 items-center pl-6 mt-2">
//                                     <input
//                                       type="number"
//                                       placeholder="Enter discount"
//                                       className=" border border-gray-700 rounded-md px-3 py-2 text-black"
//                                       value={discountValue || ""}
//                                       onChange={(e) => {
//                                         const value =
//                                           Number.parseFloat(e.target.value) ||
//                                           0;
//                                         setDiscountValue(value);
//                                         calculateManualDiscount(value);
//                                       }}
//                                     />
//                                     <span className="">
//                                       {discountValue <= 100 ? "%" : "₹"}
//                                     </span>
//                                   </div>
//                                 )}

//                                 <div className="flex items-center gap-2">
//                                   <input
//                                     type="radio"
//                                     id="discount-coupon"
//                                     name="discount-type"
//                                     checked={discountType === "coupon"}
//                                     onChange={() => {
//                                       setDiscountType("coupon");
//                                       setDiscountValue(0);
//                                       setDiscountAmount(0);
//                                       setCouponApplied(false);
//                                     }}
//                                   />
//                                   <label htmlFor="discount-coupon" className="">
//                                     Coupon Code
//                                   </label>
//                                 </div>

//                                 {discountType === "coupon" && (
//                                   <div className="flex gap-2 pl-6 mt-2">
//                                     <input
//                                       placeholder="Enter coupon code"
//                                       className=" border border-gray-700 rounded-md px-3 py-2 text-black"
//                                       value={couponCode}
//                                       onChange={(e) =>
//                                         setCouponCode(
//                                           e.target.value.toUpperCase()
//                                         )
//                                       }
//                                     />
//                                     <button
//                                       className="px-4 py-2 bg-purple-600  rounded-md text-white"
//                                       onClick={() => applyCoupon(couponCode)}
//                                     >
//                                       Apply
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>

//                               {couponApplied && (
//                                 <div className="bg-green-900/30 border border-green-500/30 rounded-md p-2 text-sm text-green-400">
//                                   Coupon {couponCode} applied successfully!
//                                   Discount: ₹{discountAmount.toFixed(2)}
//                                 </div>
//                               )}
//                             </div>

//                             {/* Tax Information */}
//                             <div className="space-y-4">
//                               <h3 className="font-medium ">Tax Information</h3>

//                               <div className="space-y-3">
//                                 <div className="flex justify-between items-center border-b border-gray-800 pb-2">
//                                   <div>
//                                     <div className="font-medium ">GST</div>
//                                     <div className="text-sm ">
//                                       5% on all items
//                                     </div>
//                                   </div>
//                                   <div className="">
//                                     ₹{taxes.gst.toFixed(2)}
//                                   </div>
//                                 </div>

//                                 <div className="flex justify-between items-center border-b border-gray-800 pb-2">
//                                   <div>
//                                     <div className="font-medium ">
//                                       Service Charge
//                                     </div>
//                                     <div className="text-sm ">
//                                       10% on all items
//                                     </div>
//                                   </div>
//                                   <div className="">
//                                     ₹{taxes.serviceCharge.toFixed(2)}
//                                   </div>
//                                 </div>

//                                 <div className="flex justify-between items-center pt-2">
//                                   <div className="font-medium ">Total Tax</div>
//                                   <div className=" font-medium">
//                                     ₹
//                                     {(taxes.gst + taxes.serviceCharge).toFixed(
//                                       2
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="flex justify-end mt-6 gap-4">
//                             <button
//                               className="px-4 py-2 border border-gray-700 rounded-md text-black "
//                               onClick={() => setActiveTab("order")}
//                             >
//                               Back to Order
//                             </button>
//                             <button
//                               className="px-4 py-2 bg-purple-600 rounded-md text-white"
//                               onClick={() => setActiveTab("payment")}
//                             >
//                               Proceed to Payment
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Payment Tab */}
//                 {activeTab === "payment" && (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Bill Summary */}
//                     <div className="lg:col-span-1">
//                       <div className="border border-blue-500/20  backdrop-blur-sm rounded-lg overflow-hidden">
//                         <div className="p-4 border-b border-gray-800">
//                           <h3 className=" flex items-center gap-2 text-lg font-medium">
//                             <Receipt className="w-4 h-4 text-blue-400" />
//                             Bill Summary
//                           </h3>
//                         </div>
//                         <div className="p-4">
//                           <div className="space-y-2">
//                             <div className="flex justify-between ">
//                               <span>Subtotal:</span>
//                               <span>₹{subtotal.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between ">
//                               <span>GST (5%):</span>
//                               <span>₹{taxes.gst.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between ">
//                               <span>Service Charge (10%):</span>
//                               <span>₹{taxes.serviceCharge.toFixed(2)}</span>
//                             </div>
//                             {discountAmount > 0 && (
//                               <div className="flex justify-between text-green-500">
//                                 <span>
//                                   Discount{" "}
//                                   {couponApplied ? `(${couponCode})` : ""}:
//                                 </span>
//                                 <span>-₹{discountAmount.toFixed(2)}</span>
//                               </div>
//                             )}
//                             <div className="flex justify-between  font-bold pt-2 border-t border-gray-800">
//                               <span>Total:</span>
//                               <span>₹{totalAmount.toFixed(2)}</span>
//                             </div>
//                           </div>

//                           <hr className="my-4 border-gray-800" />

//                           <div className="space-y-2">
//                             <div className="flex justify-between ">
//                               <span>Amount Paid:</span>
//                               <span>₹{totalPaid.toFixed(2)}</span>
//                             </div>

//                             {totalPaid > 0 && (
//                               <div className="flex justify-between ">
//                                 <span>
//                                   {totalPaid >= totalAmount
//                                     ? "Change:"
//                                     : "Balance:"}
//                                 </span>
//                                 <span
//                                   className={
//                                     totalPaid >= totalAmount
//                                       ? "text-green-500"
//                                       : "text-red-500"
//                                   }
//                                 >
//                                   ₹
//                                   {Math.abs(totalPaid - totalAmount).toFixed(2)}
//                                 </span>
//                               </div>
//                             )}
//                           </div>

//                           <button
//                             className={`w-full mt-6 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
//                               totalPaid < totalAmount
//                                 ? "bg-gray-100 cursor-not-allowed"
//                                 : "bg-purple-600 "
//                             } text-black`}
//                             disabled={totalPaid < totalAmount}
//                             onClick={finalizeBill}
//                           >
//                             <Check className="w-4 h-4" />
//                             Finalize & Print Bill
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Payment Methods */}
//                     <div className="lg:col-span-2">
//                       <div className="border border-blue-500/20  backdrop-blur-sm rounded-lg overflow-hidden">
//                         <div className="p-4 border-b border-gray-800">
//                           <h3 className="  flex items-center gap-2 text-lg font-medium">
//                             <CreditCard className="w-4 h-4 text-blue-400" />
//                             Payment Methods
//                           </h3>
//                         </div>
//                         <div className="p-4">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {PAYMENT_MODES.map((mode) => (
//                               <div key={mode.id} className="space-y-2">
//                                 <label className="  flex items-center gap-2">
//                                   <input
//                                     type="checkbox"
//                                     checked={
//                                       paymentModes.find(
//                                         (p) => p.mode === mode.id
//                                       ).amount > 0
//                                     }
//                                     onChange={(e) => {
//                                       if (!e.target.checked) {
//                                         handlePaymentChange(mode.id, 0);
//                                       } else if (totalPaid < totalAmount) {
//                                         handlePaymentChange(
//                                           mode.id,
//                                           totalAmount - totalPaid
//                                         );
//                                       }
//                                     }}
//                                   />
//                                   {mode.name}
//                                 </label>

//                                 <div className="flex gap-2 items-center">
//                                   <input
//                                     type="number"
//                                     placeholder={`Enter ${mode.name.toLowerCase()} amount`}
//                                     className={`bg-gray-100 border border-gray-700 rounded-md px-3 py-2 text-black w-full ${
//                                       paymentModes.find(
//                                         (p) => p.mode === mode.id
//                                       ).amount === 0
//                                         ? "opacity-50"
//                                         : ""
//                                     }`}
//                                     value={
//                                       paymentModes.find(
//                                         (p) => p.mode === mode.id
//                                       ).amount || ""
//                                     }
//                                     onChange={(e) =>
//                                       handlePaymentChange(
//                                         mode.id,
//                                         e.target.value
//                                       )
//                                     }
//                                     disabled={
//                                       paymentModes.find(
//                                         (p) => p.mode === mode.id
//                                       ).amount === 0
//                                     }
//                                   />

//                                   {mode.id === "cash" && (
//                                     <div className="relative">
//                                       <button
//                                         className="px-2 py-2 border border-gray-700 rounded-md flex items-center justify-center"
//                                         onClick={() =>
//                                           setShowDropdown(!showDropdown)
//                                         }
//                                       >
//                                         <DollarSign className="w-4 h-4 " />
//                                       </button>

//                                       {showDropdown && (
//                                         <div className="absolute right-0 mt-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10">
//                                           {[500, 1000, 2000].map((amount) => (
//                                             <button
//                                               key={amount}
//                                               className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
//                                               onClick={() => {
//                                                 handlePaymentChange(
//                                                   "cash",
//                                                   amount
//                                                 );
//                                                 setShowDropdown(false);
//                                               }}
//                                             >
//                                               ₹{amount}
//                                             </button>
//                                           ))}
//                                           <button
//                                             className="block w-full text-left px-4 py-2   hover:bg-gray-800"
//                                             onClick={() => {
//                                               handlePaymentChange(
//                                                 "cash",
//                                                 totalAmount
//                                               );
//                                               setShowDropdown(false);
//                                             }}
//                                           >
//                                             Exact: ₹{totalAmount.toFixed(2)}
//                                           </button>
//                                         </div>
//                                       )}
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>

//                           <div className="mt-6 flex justify-between items-center">
//                             <button
//                               className="px-4 py-2 border border-gray-700 rounded-md    "
//                               onClick={() => {
//                                 // Reset all payment amounts
//                                 const resetPayments = paymentModes.map((p) => ({
//                                   ...p,
//                                   amount: 0,
//                                 }));
//                                 setPaymentModes(resetPayments);
//                               }}
//                             >
//                               Clear All
//                             </button>

//                             <button
//                               className="px-4 py-2 bg-purple-600  rounded-md text-white"
//                               onClick={() => {
//                                 // Set exact amount to first payment method
//                                 const updatedPayments = [...paymentModes];
//                                 updatedPayments[0].amount = totalAmount;
//                                 updatedPayments
//                                   .slice(1)
//                                   .forEach((p) => (p.amount = 0));
//                                 setPaymentModes(updatedPayments);
//                               }}
//                             >
//                               Exact Amount
//                             </button>
//                           </div>

//                           <div className="flex justify-end mt-6 gap-4">
//                             <button
//                               className="px-4 py-2 border border-gray-700 rounded-md "
//                               onClick={() => setActiveTab("billing")}
//                             >
//                               Back to Billing
//                             </button>
//                             <button
//                               className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 ${
//                                 totalPaid < totalAmount
//                                   ? "bg-purple-600 cursor-not-allowed"
//                                   : "bg-purple-600 "
//                               } text-white`}
//                               disabled={totalPaid < totalAmount}
//                               onClick={finalizeBill}
//                             >
//                               <Printer className="w-4 h-4" />
//                               Finalize & Print Bill
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .icon-small {
//           width: 16px;
//           height: 16px;
//           margin-right: 8px;
//         }
//       `}</style>
//     </div>
//   );
// }
 
 
 
"use client"

import { useState, useEffect } from "react"
import {
  Utensils,
  Users,
  Printer,
  Plus,
  Minus,
  Send,
  Trash2,
  X,
  Receipt,
  Coffee,
  Pizza,
  Sandwich,
  Wine,
  Dessert,
  Store,
  Globe,
  MapPin,
} from "lucide-react"

// Mock data for branches
const BRANCHES = [
  { id: 1, name: "Main Branch", location: "Downtown", status: "active" },
  { id: 2, name: "Mall Branch", location: "Shopping Mall", status: "active" },
  { id: 3, name: "Airport Branch", location: "Airport Terminal", status: "active" },
]

// Order types
const ORDER_TYPES = [
  {
    id: "table",
    name: "Table Order",
    icon: <Users className="w-6 h-6" />,
    description: "Dine-in customers",
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
  },
  {
    id: "counter",
    name: "Counter Order",
    icon: <Store className="w-6 h-6" />,
    description: "Takeaway orders",
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
  },
  {
    id: "online",
    name: "Online Order",
    icon: <Globe className="w-6 h-6" />,
    description: "Delivery orders",
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-700",
  },
]

// Tables for table orders
const TABLES = [
  { id: 1, name: "Table 1", status: "available", capacity: 4 },
  { id: 2, name: "Table 2", status: "occupied", capacity: 2 },
  { id: 3, name: "Table 3", status: "available", capacity: 6 },
  { id: 4, name: "Table 4", status: "available", capacity: 4 },
  { id: 5, name: "Table 5", status: "reserved", capacity: 8 },
  { id: 6, name: "Table 6", status: "available", capacity: 2 },
]

const CATEGORIES = [
  {
    id: "starters",
    name: "Starters",
    icon: <Sandwich className="w-4 h-4" />,
  },
  { id: "mains", name: "Main Course", icon: <Pizza className="w-4 h-4" /> },
  {
    id: "desserts",
    name: "Desserts",
    icon: <Dessert className="w-4 h-4" />,
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: <Coffee className="w-4 h-4" />,
  },
  { id: "alcohol", name: "Alcohol", icon: <Wine className="w-4 h-4" /> },
]

const MENU_ITEMS = [
  // Starters
  {
    id: 101,
    name: "Paneer Tikka",
    price: 220,
    category: "starters",
    stock: 20,
    kotCategory: "kitchen",
  },
  {
    id: 102,
    name: "Veg Spring Rolls",
    price: 180,
    category: "starters",
    stock: 15,
    kotCategory: "kitchen",
  },
  {
    id: 103,
    name: "Chicken Wings",
    price: 250,
    category: "starters",
    stock: 25,
    kotCategory: "kitchen",
  },
  {
    id: 104,
    name: "Mushroom Chilli",
    price: 190,
    category: "starters",
    stock: 18,
    kotCategory: "kitchen",
  },

  // Mains
  {
    id: 201,
    name: "Butter Chicken",
    price: 320,
    category: "mains",
    stock: 30,
    kotCategory: "kitchen",
  },
  {
    id: 202,
    name: "Veg Biryani",
    price: 280,
    category: "mains",
    stock: 25,
    kotCategory: "kitchen",
  },
  {
    id: 203,
    name: "Palak Paneer",
    price: 260,
    category: "mains",
    stock: 20,
    kotCategory: "kitchen",
  },
  {
    id: 204,
    name: "Fish Curry",
    price: 340,
    category: "mains",
    stock: 15,
    kotCategory: "kitchen",
  },

  // Desserts
  {
    id: 301,
    name: "Gulab Jamun",
    price: 120,
    category: "desserts",
    stock: 40,
    kotCategory: "kitchen",
  },
  {
    id: 302,
    name: "Ice Cream",
    price: 150,
    category: "desserts",
    stock: 50,
    kotCategory: "kitchen",
  },

  // Beverages
  {
    id: 401,
    name: "Masala Chai",
    price: 80,
    category: "beverages",
    stock: 100,
    kotCategory: "bar",
  },
  {
    id: 402,
    name: "Cold Coffee",
    price: 120,
    category: "beverages",
    stock: 80,
    kotCategory: "bar",
  },
  {
    id: 403,
    name: "Fresh Lime Soda",
    price: 100,
    category: "beverages",
    stock: 90,
    kotCategory: "bar",
  },

  // Alcohol
  {
    id: 501,
    name: "Beer",
    price: 220,
    category: "alcohol",
    stock: 50,
    kotCategory: "bar",
  },
  {
    id: 502,
    name: "Whiskey (30ml)",
    price: 280,
    category: "alcohol",
    stock: 60,
    kotCategory: "bar",
  },
  {
    id: 503,
    name: "Wine (Glass)",
    price: 320,
    category: "alcohol",
    stock: 40,
    kotCategory: "bar",
  },
]

const PAYMENT_MODES = [
  { id: "cash", name: "Cash" },
  { id: "card", name: "Card" },
  { id: "upi", name: "UPI" },
  { id: "wallet", name: "Wallet" },
]

const TAX_RATES = {
  gst: 0.05, // 5% GST
  serviceCharge: 0.1, // 10% Service Charge
}

export default function POSSystem() {
  // Branch and order type state
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedOrderType, setSelectedOrderType] = useState(null)
  const [currentStep, setCurrentStep] = useState("branch") // branch, orderType, details, menu

  // Order details state
  const [selectedTable, setSelectedTable] = useState(null)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")

  // Menu and cart state
  const [selectedCategory, setSelectedCategory] = useState("starters")
  const [cartItems, setCartItems] = useState([])
  const [kotId, setKotId] = useState(null)
  const [kots, setKots] = useState([])
  const [kotStatus, setKotStatus] = useState("pending")

  // Billing state
  const [subtotal, setSubtotal] = useState(0)
  const [taxes, setTaxes] = useState({ gst: 0, serviceCharge: 0 })
  const [discountAmount, setDiscountAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  // Payment state
  const [paymentModes, setPaymentModes] = useState([
    { mode: "cash", amount: 0 },
    { mode: "card", amount: 0 },
    { mode: "upi", amount: 0 },
    { mode: "wallet", amount: 0 },
  ])
  const [totalPaid, setTotalPaid] = useState(0)
  const [orderFinalized, setOrderFinalized] = useState(false)

  // UI state
  const [activeTab, setActiveTab] = useState("order")
  const [showBillPreview, setShowBillPreview] = useState(false)

  // Generate KOT ID when order details are set
  useEffect(() => {
    if (selectedBranch && selectedOrderType) {
      const branchCode = selectedBranch.toString().padStart(2, "0")
      const orderTypeCode = selectedOrderType.charAt(0).toUpperCase()
      const timestamp = Date.now().toString().slice(-6)
      const newKotId = `${branchCode}${orderTypeCode}${timestamp}`
      setKotId(newKotId)
    } else {
      setKotId(null)
      setCartItems([])
    }
  }, [selectedBranch, selectedOrderType])

  // Calculate totals
  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(newSubtotal)

    const gstAmount = newSubtotal * TAX_RATES.gst
    const serviceChargeAmount = newSubtotal * TAX_RATES.serviceCharge
    setTaxes({ gst: gstAmount, serviceCharge: serviceChargeAmount })
  }, [cartItems])

  useEffect(() => {
    const total = subtotal + taxes.gst + taxes.serviceCharge - discountAmount
    setTotalAmount(total)
  }, [subtotal, taxes, discountAmount])

  useEffect(() => {
    const paid = paymentModes.reduce((sum, payment) => sum + payment.amount, 0)
    setTotalPaid(paid)
  }, [paymentModes])

  // Add item to cart
  const addItemToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id)

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems]
      if (updatedCartItems[existingItemIndex].quantity >= item.stock) {
        alert(`Sorry, only ${item.stock} units of ${item.name} are available`)
        return
      }
      updatedCartItems[existingItemIndex].quantity += 1
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  // Remove item from cart
  const removeItemFromCart = (itemId) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === itemId)
    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems]
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity -= 1
        setCartItems(updatedCartItems)
      } else {
        const filteredItems = cartItems.filter((item) => item.id !== itemId)
        setCartItems(filteredItems)
      }
    }
  }

  // Delete item from cart completely
  const deleteItemFromCart = (itemId) => {
    const filteredItems = cartItems.filter((item) => item.id !== itemId)
    setCartItems(filteredItems)
  }

  // Send order to kitchen
  const sendToKitchen = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty")
      return
    }

    const kitchenItems = cartItems.filter((item) => item.kotCategory === "kitchen")
    const barItems = cartItems.filter((item) => item.kotCategory === "bar")

    const newKots = []

    if (kitchenItems.length > 0) {
      const kitchenKotId = `${kotId}-K`
      newKots.push({
        id: kitchenKotId,
        items: kitchenItems,
        category: "kitchen",
        status: "preparing",
        timestamp: new Date().toISOString(),
        orderType: selectedOrderType,
        branch: selectedBranch,
      })
    }

    if (barItems.length > 0) {
      const barKotId = `${kotId}-B`
      newKots.push({
        id: barKotId,
        items: barItems,
        category: "bar",
        status: "preparing",
        timestamp: new Date().toISOString(),
        orderType: selectedOrderType,
        branch: selectedBranch,
      })
    }

    setKots([...kots, ...newKots])
    setKotStatus("sent")
    setActiveTab("billing")
  }

  // Handle payment change
  const handlePaymentChange = (mode, amount) => {
    const numAmount = Number.parseFloat(amount) || 0
    const updatedPaymentModes = paymentModes.map((payment) => {
      if (payment.mode === mode) {
        return { ...payment, amount: numAmount }
      }
      return payment
    })
    setPaymentModes(updatedPaymentModes)
  }

  // Finalize bill
  const finalizeBill = () => {
    if (totalPaid < totalAmount) {
      alert(`Payment amount (₹${totalPaid.toFixed(2)}) is less than total bill amount (₹${totalAmount.toFixed(2)})`)
      return
    }

    setOrderFinalized(true)
    setShowBillPreview(true)
  }

  // Reset order
  const resetOrder = () => {
    setSelectedBranch(null)
    setSelectedOrderType(null)
    setCurrentStep("branch")
    setSelectedTable(null)
    setCustomerName("")
    setCustomerPhone("")
    setDeliveryAddress("")
    setEstimatedTime("")
    setCartItems([])
    setKotId(null)
    setKotStatus("pending")
    setDiscountAmount(0)
    setPaymentModes([
      { mode: "cash", amount: 0 },
      { mode: "card", amount: 0 },
      { mode: "upi", amount: 0 },
      { mode: "wallet", amount: 0 },
    ])
    setOrderFinalized(false)
    setActiveTab("order")
    setShowBillPreview(false)
  }

  const getOrderTypeDetails = () => {
    const orderType = ORDER_TYPES.find((type) => type.id === selectedOrderType)
    return orderType || {}
  }

  const getBranchDetails = () => {
    const branch = BRANCHES.find((b) => b.id === selectedBranch)
    return branch || {}
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800">
          <div className="border-b border-gray-800 p-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">RestoPOS</h3>
              <p className="text-xs text-gray-400">Multi-Branch System</p>
            </div>
          </div>

          {/* Order Summary in Sidebar */}
          {kotId && (
            <div className="p-4 border-b border-gray-800">
              <div className="text-white text-sm space-y-1">
                <div className="font-medium">Order: {kotId}</div>
                <div className="text-gray-400">Branch: {getBranchDetails().name}</div>
                <div className="text-gray-400">Type: {getOrderTypeDetails().name}</div>
                {selectedOrderType === "table" && selectedTable && (
                  <div className="text-gray-400">Table: {TABLES.find((t) => t.id === selectedTable)?.name}</div>
                )}
                {selectedOrderType === "counter" && customerName && (
                  <div className="text-gray-400">Customer: {customerName}</div>
                )}
                {selectedOrderType === "online" && customerName && (
                  <div className="text-gray-400">Customer: {customerName}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Restaurant POS</h1>
                <p className="text-gray-600">
                  {currentStep === "branch" && "Select Branch"}
                  {currentStep === "orderType" && "Select Order Type"}
                  {currentStep === "details" && "Order Details"}
                  {currentStep === "menu" && "Menu Selection"}
                </p>
              </div>

              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                onClick={resetOrder}
              >
                <X className="w-4 h-4" />
                New Order
              </button>
            </div>

            {/* Branch Selection */}
            {currentStep === "branch" && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Branch</h2>
                  <p className="text-gray-600">Choose the branch location for this order</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BRANCHES.map((branch) => (
                    <div
                      key={branch.id}
                      className={`bg-white border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${selectedBranch === branch.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                      onClick={() => {
                        setSelectedBranch(branch.id)
                        setCurrentStep("orderType")
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{branch.name}</h3>
                      <p className="text-gray-600 text-center mb-4">{branch.location}</p>
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${branch.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                          {branch.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Type Selection */}
            {currentStep === "orderType" && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Order Type</h2>
                  <p className="text-gray-600">Choose how this order will be served</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ORDER_TYPES.map((orderType) => (
                    <div
                      key={orderType.id}
                      className={`bg-white border-2 rounded-lg p-8 cursor-pointer transition-all hover:shadow-lg ${selectedOrderType === orderType.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                      onClick={() => {
                        setSelectedOrderType(orderType.id)
                        setCurrentStep("details")
                      }}
                    >
                      <div
                        className={`flex items-center justify-center w-16 h-16 ${orderType.color} rounded-lg mb-6 mx-auto text-white`}
                      >
                        {orderType.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-3">{orderType.name}</h3>
                      <p className="text-gray-600 text-center">{orderType.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setCurrentStep("branch")}
                  >
                    Back to Branch Selection
                  </button>
                </div>
              </div>
            )}

            {/* Order Details */}
            {currentStep === "details" && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h2>
                  <p className="text-gray-600">
                    {selectedOrderType === "table" && "Select table and enter details"}
                    {selectedOrderType === "counter" && "Enter customer details for takeaway"}
                    {selectedOrderType === "online" && "Enter delivery details"}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {selectedOrderType === "table" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Table</label>
                        <div className="grid grid-cols-3 gap-3">
                          {TABLES.map((table) => (
                            <button
                              key={table.id}
                              className={`p-3 rounded-lg border-2 text-center transition-all ${selectedTable === table.id
                                  ? "border-blue-500 bg-blue-50"
                                  : table.status === "available"
                                    ? "border-gray-200 hover:border-gray-300"
                                    : "border-red-200 bg-red-50 cursor-not-allowed"
                                }`}
                              onClick={() => table.status === "available" && setSelectedTable(table.id)}
                              disabled={table.status !== "available"}
                            >
                              <div className="font-medium">{table.name}</div>
                              <div className="text-sm text-gray-500">{table.capacity} seats</div>
                              <div
                                className={`text-xs mt-1 ${table.status === "available" ? "text-green-600" : "text-red-600"
                                  }`}
                              >
                                {table.status}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name (Optional)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter customer name"
                        />
                      </div>
                    </div>
                  )}

                  {selectedOrderType === "counter" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter customer name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Pickup Time</label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={estimatedTime}
                          onChange={(e) => setEstimatedTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {selectedOrderType === "online" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter customer name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Enter complete delivery address"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery Time</label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={estimatedTime}
                          onChange={(e) => setEstimatedTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <button
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      onClick={() => setCurrentStep("orderType")}
                    >
                      Back
                    </button>
                    <button
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => {
                        // Validation
                        if (selectedOrderType === "table" && !selectedTable) {
                          alert("Please select a table")
                          return
                        }
                        if (
                          (selectedOrderType === "counter" || selectedOrderType === "online") &&
                          !customerName.trim()
                        ) {
                          alert("Please enter customer name")
                          return
                        }
                        if (selectedOrderType === "online" && (!customerPhone.trim() || !deliveryAddress.trim())) {
                          alert("Please enter phone number and delivery address")
                          return
                        }
                        setCurrentStep("menu")
                      }}
                    >
                      Continue to Menu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Selection */}
            {currentStep === "menu" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-blue-600" />
                        Cart Summary
                      </h3>
                      {kotId && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{kotId}</span>
                      )}
                    </div>
                    <div className="p-4">
                      {cartItems.length > 0 ? (
                        <div className="h-[300px] overflow-auto">
                          <div className="space-y-3">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center border-b border-gray-100 pb-2"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">
                                    ₹{item.price} x {item.quantity}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                    onClick={() => removeItemFromCart(item.id)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                                  <button
                                    className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                    onClick={() => addItemToCart(item)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                  <button
                                    className="h-7 w-7 text-gray-400 hover:text-red-500 flex items-center justify-center"
                                    onClick={() => deleteItemFromCart(item.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">Cart is empty</div>
                      )}

                      {cartItems.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between text-gray-900">
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                          </div>

                          <button
                            className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 ${kotStatus === "sent" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                              } text-white`}
                            onClick={sendToKitchen}
                            disabled={kotStatus === "sent"}
                          >
                            <Send className="w-4 h-4" />
                            {kotStatus === "sent" ? "Order Sent to Kitchen" : "Send to Kitchen"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-blue-600" />
                        Menu Items
                      </h3>
                    </div>
                    <div className="p-4">
                      {/* Category Tabs */}
                      <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
                        {CATEGORIES.map((category) => (
                          <button
                            key={category.id}
                            className={`py-2 px-3 rounded-md flex items-center gap-2 whitespace-nowrap ${selectedCategory === category.id
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            {category.icon}
                            {category.name}
                          </button>
                        ))}
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {MENU_ITEMS.filter((item) => item.category === selectedCategory).map((item) => (
                          <div
                            key={item.id}
                            className="border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer rounded-lg p-3"
                            onClick={() => addItemToCart(item)}
                          >
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="flex justify-between items-center mt-1">
                              <div className="text-blue-600 font-medium">₹{item.price}</div>
                              <div className="text-xs text-gray-500">Stock: {item.stock}</div>
                            </div>
                            <button className="w-full mt-2 py-1 px-2 bg-blue-600 text-white rounded-md text-sm flex items-center justify-center gap-1 hover:bg-blue-700">
                              <Plus className="w-3 h-3" />
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bill Preview Dialog */}
            {showBillPreview && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Bill Preview</h2>
                      <p className="text-gray-600">Order #{kotId}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowBillPreview(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center border-b border-gray-200 pb-2">
                      <h3 className="font-bold text-lg text-gray-900">{getBranchDetails().name}</h3>
                      <p className="text-sm text-gray-600">{getBranchDetails().location}</p>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Date: {new Date().toLocaleDateString()}</span>
                      <span>Time: {new Date().toLocaleTimeString()}</span>
                    </div>

                    <div className="text-sm space-y-1">
                      <div>Order Type: {getOrderTypeDetails().name}</div>
                      {selectedOrderType === "table" && selectedTable && (
                        <div>Table: {TABLES.find((t) => t.id === selectedTable)?.name}</div>
                      )}
                      {customerName && <div>Customer: {customerName}</div>}
                      {customerPhone && <div>Phone: {customerPhone}</div>}
                      {deliveryAddress && <div>Address: {deliveryAddress}</div>}
                    </div>

                    <hr className="border-gray-200" />

                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <hr className="border-gray-200" />

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GST (5%):</span>
                        <span>₹{taxes.gst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service Charge (10%):</span>
                        <span>₹{taxes.serviceCharge.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                        <span>Total:</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-500 pt-4">
                      <p>Thank you for your order!</p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
                        onClick={() => {
                          setShowBillPreview(false)
                          resetOrder()
                        }}
                      >
                        <Printer className="w-4 h-4" />
                        Print & New Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
