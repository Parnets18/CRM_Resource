// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Banknote,
//   MapPin,
//   Scale,
//   ShoppingCart,
//   Warehouse,
//   Users,
//   ChevronDown,
//   ChevronRight,
//   UserPlus,
//   FileSpreadsheet,
//   Calendar,
//   Building,
//   Settings,
//   Users2,
//   ClipboardList,
//   Package,
//   BarChart3,
//   CreditCard,
//   Receipt,
//   DollarSign,
//   PieChart,
//   Wallet,
//   Calculator,
//   Menu,
//   X,
//   CalendarDays,
//   Star,
//   Gift,
//   LockKeyhole,
//   User,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   return isMobile;
// }

// export default function Nav() {
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [expandedSubtab, setExpandedSubtab] = useState(null);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const isMobile = useIsMobile();
//   const location = useLocation();

//   // Track active subtab path for highlighting
//   const [activeSubtabPath, setActiveSubtabPath] = useState(location.pathname);

//   useEffect(() => {
//     setActiveSubtabPath(location.pathname);
//     // Expand the main section and subtab if the current path matches
//     navItems.forEach((item) => {
//       if (item.subtabs) {
//         item.subtabs.forEach((sub) => {
//           if (sub.subtabs && sub.subtabs.some((nested) => nested.path === location.pathname)) {
//             setExpandedSection(item.id);
//             setExpandedSubtab(sub.title);
//           } else if (sub.path === location.pathname) {
//             setExpandedSection(item.id);
//             setExpandedSubtab(null);
//           }
//         });
//       }
//     });
//     // eslint-disable-next-line
//   }, [location.pathname]);

//   const navItems = [
//        {
//       title: "Dashboard",
//       icon: PieChart,
//       id: "dashboard",
//       path: "/ConstructionDashboard",
//     }, 
//     {
//       title: "HR & Payroll Module",
//       icon: MapPin,
//       id: "hr",
//       subtabs: [
//         {
//           title: "Admin",
//           icon: UserPlus,
//           subtabs: [
//             { title: "Create Role", icon: Users, path: "/admin/create" },
//             { title: "Config", icon: LockKeyhole, path: "/admin/config" },
//             { title: "Report", icon: ClipboardList, path: "/admin/report" },
//           ],
//         },
//         {
//           title: "HR Manager",
//           icon: FileSpreadsheet,
//           path: "/manager",
//         },
//         {
//           title: "Employee",
//           icon: Calendar,
//           path: "/employee",
//         },
//       ],
//     },
//     {
//       title: "Site Management",
//       icon: Users,
//       id: "site",
//       subtabs: [
//         { title: "Admin", icon: Building, path: "/siteadmin" },
//         { title: "Project Manager", icon: Settings, path: "/siteproject" },
//         { title: "Site Supervisor", icon: Users2, path: "/sitesupervisor" },
//       ],
//     },
//     {
//       title: "Indent & Inventory",
//       icon: Warehouse,
//       id: "inventory",
//       subtabs: [
//         {
//           title: "Site Supervisor",
//           icon: ClipboardList,
//           path: "/inventorysite",
//         },
//         {
//           title: "Procurement Office",
//           icon: Package,
//           path: "/inventoryofficer",
//         },
//         { title: "Project Manager", icon: Users, path: "/inventorymanager" },
//         { title: "Admin", icon: BarChart3, path: "/inventoryadmin" },
//       ],
//     },
//     {
//       title: "Purchase Management",
//       icon: ShoppingCart,
//       id: "purchase",
//       subtabs: [
//         {
//           title: "Procurement Officer",
//           icon: CreditCard,
//           path: "/purchaseofficer",
//         },
//         { title: "Accountant", icon: Users, path: "/purchaseaccountant" },
//         { title: "Admin", icon: Receipt, path: "/purchaseadmin" },
//       ],
//     },
//     {
//       title: "Sales Management",
//       icon: Banknote,
//       id: "sales",
//       subtabs: [
//         { title: "Admin", icon: DollarSign, path: "/salesadmin" },
//         { title: "Accountant", icon: PieChart, path: "/salesaccountant" },
//         { title: "Project Manager", icon: Users, path: "/salesproject" },
//       ],
//     },
//     {
//       title: "Expense Management",
//       icon: Scale,
//       id: "expense",
//       subtabs: [
//         { title: "Site Supervisor", icon: Wallet, path: "/expensesupervisor" },
//         { title: "Project Manager", icon: Calculator, path: "/expensemanager" },
//         { title: "Accountant", icon: BarChart3, path: "/expenseaccountant" },
//         { title: "Admin", icon: DollarSign, path: "/expenseadmin" },
//       ],
//     },
//   ];

//   return (
//     <>
//       {isMobile && !isNavOpen && (
//         <button
//           onClick={() => setIsNavOpen(true)}
//           className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white hover:bg-gray-100 text-purple-700 border border-purple-200"
//         >
//           <Menu className="w-6 h-6" />
//         </button>
//       )}

//       <div
//         className="w-64 fixed top-0 left-0 h-screen border-r border-purple-500/20 bg-white backdrop-blur-sm p-4 overflow-y-auto z-40"
//         style={{ display: isMobile && !isNavOpen ? "none" : "block" }}
//       >
//         <div className="flex items-center gap-2 mb-8">
//           <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
//             CRM
//           </h1>
//           {isMobile && (
//             <button onClick={() => setIsNavOpen(false)} className="ml-auto">
//               <X className="w-6 h-6 text-purple-400" />
//             </button>
//           )}
//         </div>

//         <nav className="space-y-1">
//           {navItems.map((item) => (
//             <div key={item.id}>
//               <Button
//                 variant="ghost"
//                 className={`w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-purple-700 ${
//                   expandedSection === item.id ? "bg-purple-50" : ""
//                 }`}
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === item.id ? null : item.id
//                   )
//                 }
//               >
//                 <item.icon className="w-4 h-4 mr-2 text-purple-500" />
//                 <span className="flex-1">{item.title}</span>
//                 {expandedSection === item.id ? (
//                   <ChevronDown className="w-4 h-4 text-purple-400" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4 text-purple-400" />
//                 )}
//               </Button>
//               {expandedSection === item.id && (
//                 <div className="overflow-hidden">
//                   {item?.subtabs?.map((subtab, index) => {
//                     const hasSubtabs = subtab?.subtabs && subtab?.subtabs.length > 0;
//                     const isSubtabExpanded = expandedSubtab === subtab?.title;

//                     if (hasSubtabs) {
//                       return (
//                         <div key={index}>
//                           <Button
//                             variant="ghost"
//                             className={`w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-purple-700 pl-8 ${
//                               isSubtabExpanded ? "bg-purple-100 text-purple-700" : ""
//                             }`}
//                             onClick={() =>
//                               setExpandedSubtab(
//                                 isSubtabExpanded ? null : subtab.title
//                               )
//                             }
//                           >
//                             <subtab.icon className="w-4 h-4 mr-2 text-purple-400" />
//                             {subtab.title}
//                             {isSubtabExpanded ? (
//                               <ChevronDown className="w-4 h-4 ml-auto text-purple-400" />
//                             ) : (
//                               <ChevronRight className="w-4 h-4 ml-auto text-purple-400" />
//                             )}
//                           </Button>
//                           {isSubtabExpanded && (
//                             <div className="overflow-hidden">
//                               {subtab.subtabs.map((nestedSubtab, nestedIndex) => (
//                                 <Link
//                                   key={nestedIndex}
//                                   to={nestedSubtab.path}
//                                   className="block no-underline"
//                                   onClick={() => {
//                                     setActiveSubtabPath(nestedSubtab.path);
//                                     if (isMobile) setIsNavOpen(false);
//                                   }}
//                                 >
//                                   <Button
//                                     variant="ghost"
//                                     className={`w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-purple-700 pl-12 ${
//                                       activeSubtabPath === nestedSubtab.path
//                                         ? "bg-purple-200 text-purple-700"
//                                         : ""
//                                     }`}
//                                   >
//                                     <nestedSubtab.icon className="w-4 h-4 mr-2 text-purple-400" />
//                                     {nestedSubtab.title}
//                                   </Button>
//                                 </Link>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     } else {
//                       return (
//                         <Link
//                           key={index}
//                           to={subtab.path}
//                           className="block no-underline"
//                           onClick={() => {
//                             setActiveSubtabPath(subtab.path);
//                             if (isMobile) setIsNavOpen(false);
//                           }}
//                         >
//                           <Button
//                             variant="ghost"
//                             className={`w-full justify-start pl-8 text-gray-500 hover:bg-gray-100 hover:text-purple-700 ${
//                               activeSubtabPath === subtab.path
//                                 ? "bg-purple-100 text-purple-700"
//                                 : ""
//                             }`}
//                           >
//                             <subtab.icon className="w-4 h-4 mr-2 text-purple-400" />
//                             {subtab.title}
//                           </Button>
//                         </Link>
//                       );
//                     }
//                   })}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  MapPin,
  Scale,
  ShoppingCart,
  Warehouse,
  Users,
  ChevronDown,
  ChevronRight,
  UserPlus,
  FileSpreadsheet,
  Calendar,
  Building,
  Settings,
  Users2,
  ClipboardList,
  Package,
  BarChart3,
  CreditCard,
  Receipt,
  DollarSign,
  PieChart,
  Wallet,
  Calculator,
  Menu,
  X,
  CalendarDays,
  Star,
  Gift,
  LockKeyhole,
  User,
  Download,
  Clock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default function Nav() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubtab, setExpandedSubtab] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Track active subtab path for highlighting
  const [activeSubtabPath, setActiveSubtabPath] = useState(location.pathname);

  useEffect(() => {
    setActiveSubtabPath(location.pathname);
    // Expand the main section and subtab if the current path matches
    navItems.forEach((item) => {
      if (item.subtabs) {
        item.subtabs.forEach((sub) => {
          if (sub.subtabs && sub.subtabs.some((nested) => nested.path === location.pathname)) {
            setExpandedSection(item.id);
            setExpandedSubtab(sub.title);
          } else if (sub.path === location.pathname) {
            setExpandedSection(item.id);
            setExpandedSubtab(null);
          }
        });
      }
    });
    // eslint-disable-next-line
  }, [location.pathname]);

  const navItems = [
    {
      title: "Dashboard",
      icon: PieChart,
      id: "dashboard",
      path: "/ConstructionDashboard",
    }, 
    {
      title: "HR & Payroll Module",
      icon: MapPin,
      id: "hr",
      subtabs: [
        {
          title: "Admin",
          icon: UserPlus,
          subtabs: [
            { title: "Create Role", icon: Users, path: "/admin/create" },
            { title: "Config", icon: LockKeyhole, path: "/admin/config" },
            { title: "Report", icon: ClipboardList, path: "/admin/report" },
          ],
        },
        {
          title: "HR Manager",
          icon: FileSpreadsheet,
          path: "/manager",
        },
        {
          title: "Employee",
          icon: Calendar,
          subtabs: [
            { title: "Employee Profile", icon: User, path: "/employee/profile" },
            { title: "Leave", icon: CalendarDays, path: "/employee/leave" },
            { title: "Payslip Download", icon: Download, path: "/employee/payslip" },
            { title: "Attendance", icon: Clock, path: "/employee/attendance" },
          ],
        },
      ],
    },
    {
      title: "Site Management",
      icon: Users,
      id: "site",
      subtabs: [
        { title: "Admin", icon: Building, path: "/siteadmin" },
        { title: "Project Manager", icon: Settings, path: "/siteproject" },
        { title: "Site Supervisor", icon: Users2, path: "/sitesupervisor" },
      ],
    },
    {
      title: "Indent & Inventory",
      icon: Warehouse,
      id: "inventory",
      subtabs: [
        {
          title: "Site Supervisor",
          icon: ClipboardList,
          path: "/inventorysite",
        },
        {
          title: "Procurement Office",
          icon: Package,
          path: "/inventoryofficer",
        },
        { title: "Project Manager", icon: Users, path: "/inventorymanager" },
        { title: "Admin", icon: BarChart3, path: "/inventoryadmin" },
      ],
    },
    {
      title: "Purchase Management",
      icon: ShoppingCart,
      id: "purchase",
      subtabs: [
        {
          title: "Procurement Officer",
          icon: CreditCard,
          path: "/purchaseofficer",
        },
        { title: "Accountant", icon: Users, path: "/purchaseaccountant" },
        { title: "Admin", icon: Receipt, path: "/purchaseadmin" },
      ],
    },
    {
      title: "Sales Management",
      icon: Banknote,
      id: "sales",
      subtabs: [
        { title: "Admin", icon: DollarSign, path: "/salesadmin" },
        { title: "Accountant", icon: PieChart, path: "/salesaccountant" },
        { title: "Project Manager", icon: Users, path: "/salesproject" },
      ],
    },
    {
      title: "Expense Management",
      icon: Scale,
      id: "expense",
      subtabs: [
        { title: "Site Supervisor", icon: Wallet, path: "/expensesupervisor" },
        { title: "Project Manager", icon: Calculator, path: "/expensemanager" },
        { title: "Accountant", icon: BarChart3, path: "/expenseaccountant" },
        { title: "Admin", icon: DollarSign, path: "/expenseadmin" },
      ],
    },
  ];

  return (
    <>
      {isMobile && !isNavOpen && (
        <button
          onClick={() => setIsNavOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white hover:bg-gray-100 text-purple-700 border border-purple-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <div
        className="w-64 fixed top-0 left-0 h-screen border-r border-purple-500/20 bg-white backdrop-blur-sm p-4 overflow-y-auto z-40"
        style={{ display: isMobile && !isNavOpen ? "none" : "block" }}
      >
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            CRM
          </h1>
          {isMobile && (
            <button onClick={() => setIsNavOpen(false)} className="ml-auto">
              <X className="w-6 h-6 text-purple-400" />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <div key={item.id}>
              {/* Main navigation items */}
              {item.path ? (
                // Dashboard - direct link
                <Link
                  to={item.path}
                  className="block no-underline"
                  onClick={() => {
                    setActiveSubtabPath(item.path);
                    if (isMobile) setIsNavOpen(false);
                  }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-purple-700 ${
                      activeSubtabPath === item.path ? "bg-purple-50 text-purple-700" : ""
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="flex-1">{item.title}</span>
                  </Button>
                </Link>
              ) : (
                // Other sections with dropdowns
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-purple-700 ${
                    expandedSection === item.id ? "bg-purple-50" : ""
                  }`}
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === item.id ? null : item.id
                    )
                  }
                >
                  <item.icon className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="flex-1">{item.title}</span>
                  {expandedSection === item.id ? (
                    <ChevronDown className="w-4 h-4 text-purple-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  )}
                </Button>
              )}

              {/* Subtabs */}
              {expandedSection === item.id && item.subtabs && (
                <div className="overflow-hidden">
                  {item.subtabs.map((subtab, index) => {
                    const hasSubtabs = subtab?.subtabs && subtab?.subtabs.length > 0;
                    const isSubtabExpanded = expandedSubtab === subtab?.title;

                    if (hasSubtabs) {
                      return (
                        <div key={index}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-purple-700 pl-8 ${
                              isSubtabExpanded ? "bg-purple-100 text-purple-700" : ""
                            }`}
                            onClick={() =>
                              setExpandedSubtab(
                                isSubtabExpanded ? null : subtab.title
                              )
                            }
                          >
                            <subtab.icon className="w-4 h-4 mr-2 text-purple-400" />
                            {subtab.title}
                            {isSubtabExpanded ? (
                              <ChevronDown className="w-4 h-4 ml-auto text-purple-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 ml-auto text-purple-400" />
                            )}
                          </Button>
                          {isSubtabExpanded && (
                            <div className="overflow-hidden">
                              {subtab.subtabs.map((nestedSubtab, nestedIndex) => (
                                <Link
                                  key={nestedIndex}
                                  to={nestedSubtab.path}
                                  className="block no-underline"
                                  onClick={() => {
                                    setActiveSubtabPath(nestedSubtab.path);
                                    if (isMobile) setIsNavOpen(false);
                                  }}
                                >
                                  <Button
                                    variant="ghost"
                                    className={`w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-purple-700 pl-12 ${
                                      activeSubtabPath === nestedSubtab.path
                                        ? "bg-purple-200 text-purple-700"
                                        : ""
                                    }`}
                                  >
                                    <nestedSubtab.icon className="w-4 h-4 mr-2 text-purple-400" />
                                    {nestedSubtab.title}
                                  </Button>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <Link
                          key={index}
                          to={subtab.path}
                          className="block no-underline"
                          onClick={() => {
                            setActiveSubtabPath(subtab.path);
                            if (isMobile) setIsNavOpen(false);
                          }}
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-start pl-8 text-gray-500 hover:bg-gray-100 hover:text-purple-700 ${
                              activeSubtabPath === subtab.path
                                ? "bg-purple-100 text-purple-700"
                                : ""
                            }`}
                          >
                            <subtab.icon className="w-4 h-4 mr-2 text-purple-400" />
                            {subtab.title}
                          </Button>
                        </Link>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}