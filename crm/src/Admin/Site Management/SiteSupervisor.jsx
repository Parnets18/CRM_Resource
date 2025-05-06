// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//  import { motion } from "framer-motion";
//  import { Bell, Upload, HardHat, AlertTriangle, Tool, CheckCircle2, UserCheck } from "lucide-react";
// import Nav from "../Nav";

// export default function SiteSupervisor() {
  
//   const workers = [
//     { id: 1, name: "John Carter", status: "present" },
//     { id: 2, name: "Mike Johnson", status: "absent" },
//     { id: 3, name: "Sarah Connor", status: "present" }
//   ];

//   const activeRequests = [
//     { id: 1, type: "Tools", item: "Power Drills", quantity: 5, urgency: "high" },
//     { id: 2, type: "Material", item: "Concrete Mix", quantity: 20, urgency: "medium" }
//   ];

//   return (
//     <div className="min-h-screen bg-black">
    
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-gray-900 to-black"></div>
//         <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-amber-600/10 to-transparent"></div>
//       </div>

//       <div className="relative z-10 flex">
//         <Nav />

//         <div className="flex-1 p-8">
         
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h2 className="text-2xl font-bold text-white">Site Supervisor Dashboard</h2>
//               <p className="text-gray-400">Construction Site Management Portal</p>
//             </div>
//             <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
//               <Bell className="w-5 h-5" />
//             </Button>
//           </div>

         
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-300">
//                     Total Workers
//                   </CardTitle>
//                   <HardHat className="h-4 w-4 text-amber-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">85</div>
//                   <p className="text-xs text-green-400">+12 this week</p>
//                 </CardContent>
//               </Card>
//             </motion.div>

          
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-300">
//                     Present Today
//                   </CardTitle>
//                   <UserCheck className="h-4 w-4 text-amber-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">72</div>
//                   <p className="text-xs text-red-400">13 absent</p>
//                 </CardContent>
//               </Card>
//             </motion.div>

            
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-300">
//                     Active Issues
//                   </CardTitle>
//                   <AlertTriangle className="h-4 w-4 text-amber-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">5</div>
//                   <p className="text-xs text-green-400">2 resolved today</p>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-300">
//                     Tools Available
//                   </CardTitle>
//                   <Tool className="h-4 w-4 text-amber-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">142</div>
//                   <p className="text-xs text-red-400">15 in maintenance</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>

         
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         
//             <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Daily Attendance</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {workers.map((worker) => (
//                     <motion.div 
//                       key={worker.id}
//                       whileHover={{ x: 5 }}
//                       className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
//                     >
//                       <span className="text-gray-300">{worker.name}</span>
//                       <select 
//                         className={`px-3 py-1 rounded bg-gray-900/50 border ${
//                           worker.status === 'present' ? 'border-green-500' : 'border-red-500'
//                         } text-white`}
//                         defaultValue={worker.status}
//                       >
//                         <option value="present">Present</option>
//                         <option value="absent">Absent</option>
//                       </select>
//                     </motion.div>
//                   ))}
//                   <Button className="w-full bg-amber-600 hover:bg-amber-700">
//                     <CheckCircle2 className="w-4 h-4 mr-2" /> Submit Attendance
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>


//             <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Daily Site Log</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <textarea 
//                     placeholder="Today's progress, notes, and observations..."
//                     className="w-full h-32 p-3 rounded bg-gray-900/50 border border-gray-700 text-white"
//                   />
//                   <div className="flex items-center gap-4">
//                     <input type="file" className="hidden" id="siteLogUpload" />
//                     <label 
//                       htmlFor="siteLogUpload" 
//                       className="flex-1 p-2 rounded bg-gray-900/50 border border-dashed border-gray-600 text-center text-gray-300 cursor-pointer hover:border-amber-500"
//                     >
//                       Upload Photos/Reports
//                     </label>
//                     <Button className="bg-amber-600 hover:bg-amber-700">
//                       <Upload className="w-4 h-4 mr-2" /> Submit Log
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
//             <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Resource Requests</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <form className="space-y-4">
//                   <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
//                     <option value="">Select Resource Type</option>
//                     <option value="tools">Tools/Equipment</option>
//                     <option value="materials">Construction Materials</option>
//                     <option value="safety">Safety Gear</option>
//                   </select>
//                   <input 
//                     type="text" 
//                     placeholder="Item name/description" 
//                     className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
//                   />
//                   <div className="grid grid-cols-2 gap-4">
//                     <input 
//                       type="number" 
//                       placeholder="Quantity" 
//                       className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
//                     />
//                     <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
//                       <option value="normal">Normal Priority</option>
//                       <option value="high">High Priority</option>
//                       <option value="urgent">Urgent</option>
//                     </select>
//                   </div>
//                   <Button className="w-full bg-amber-600 hover:bg-amber-700">
//                     <Tool className="w-4 h-4 mr-2" /> Submit Request
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>

            
//             <Card className="border border-amber-500/20 bg-black/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Incident Reports</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <form className="space-y-4">
//                   <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
//                     <option value="">Select Incident Type</option>
//                     <option value="injury">Worker Injury</option>
//                     <option value="theft">Equipment Theft</option>
//                     <option value="delay">Project Delay</option>
//                     <option value="safety">Safety Violation</option>
//                   </select>
//                   <textarea 
//                     placeholder="Describe the incident in detail..."
//                     className="w-full h-32 p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
//                   />
//                   <div className="flex gap-4">
//                     <input type="file" className="hidden" id="incidentEvidence" />
//                     <label 
//                       htmlFor="incidentEvidence" 
//                       className="flex-1 p-2 text-center rounded bg-gray-900/50 border border-dashed border-gray-600 text-gray-300 cursor-pointer hover:border-amber-500"
//                     >
//                       Attach Evidence
//                     </label>
//                     <Button className="bg-amber-600 hover:bg-amber-700">
//                       <AlertTriangle className="w-4 h-4 mr-2" /> Report Incident
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div> 
//         </div>
//       </div>
//     </div>
//   );
// }