import { useState } from "react";
import { BarChart3, Users, Building2, Calendar, MessageSquare, Settings, HelpCircle, Bell, Search, Menu, X, ChevronDown, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "../lib/utils"; // Assuming you have a utils file

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for the CRM dashboard
  const recentDeals = [
    { id: 1, company: "Acme Inc.", value: "$12,500", status: "Won", date: "Today" },
    { id: 2, company: "Globex Corp", value: "$8,750", status: "In Progress", date: "Yesterday" },
    { id: 3, company: "Stark Industries", value: "$24,000", status: "In Progress", date: "May 18" },
    { id: 4, company: "Wayne Enterprises", value: "$16,300", status: "Lost", date: "May 17" },
    { id: 5, company: "Umbrella Corp", value: "$9,200", status: "Won", date: "May 16" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Call with Acme Inc. CEO", date: "Today, 2:00 PM", priority: "High" },
    { id: 2, title: "Prepare proposal for Globex", date: "Tomorrow, 10:00 AM", priority: "Medium" },
    { id: 3, title: "Follow up with Stark Industries", date: "May 21, 11:30 AM", priority: "Low" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Won": return "bg-green-100 text-green-800";
      case "Lost": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-20 md:relative md:translate-x-0"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">CRM Dashboard</h1>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100 md:hidden"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Dashboard
                </a>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Contacts
                </a>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Building2 className="mr-3 h-5 w-5" />
                  Companies
                </a>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Calendar
                </a>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Messages
                </a>
              </nav>
              
              <div className="p-4 border-t border-gray-200">
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </a>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <HelpCircle className="mr-3 h-5 w-5" />
                  Help & Support
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="ml-4 md:ml-6 relative">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
                        sideOffset={5}
                      >
                        Notifications
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                <div className="ml-3 relative">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="flex items-center max-w-xs bg-white rounded-full focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          JD
                        </div>
                        <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        sideOffset={5}
                      >
                        <DropdownMenu.Item className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Your Profile
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Sign out
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">Dashboard</h2>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    New Deal
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Create New Deal
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-gray-500">
                      Fill in the details to create a new deal in your pipeline.
                    </Dialog.Description>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                          Deal Value
                        </label>
                        <input
                          type="text"
                          id="value"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="$0.00"
                        />
                      </div>
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option>New</option>
                          <option>In Progress</option>
                          <option>Won</option>
                          <option>Lost</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Create
                      </button>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="mt-6">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex border-b border-gray-200">
                <Tabs.Trigger
                  value="overview"
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    activeTab === "overview"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  Overview
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="deals"
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    activeTab === "deals"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  Deals
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="tasks"
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    activeTab === "tasks"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  Tasks
                </Tabs.Trigger>
              </Tabs.List>
              
              <Tabs.Content value="overview" className="py-4">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Recent Deals */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Deals</h3>
                      <button className="text-sm text-blue-600 hover:text-blue-500">
                        View all
                      </button>
                    </div>
                    <div className="border-t border-gray-200 divide-y divide-gray-200">
                      {recentDeals.map((deal) => (
                        <div key={deal.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{deal.company}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(deal.status)}`}>
                                {deal.status}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {deal.value}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <p>{deal.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Tasks */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Tasks</h3>
                      <button className="text-sm text-blue-600 hover:text-blue-500">
                        View all
                      </button>
                    </div>
                    <div className="border-t border-gray-200 divide-y divide-gray-200">
                      {upcomingTasks.map((task) => (
                        <div key={task.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {task.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tabs.Content>
              
              <Tabs.Content value="deals" className="py-4">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">All Deals</h3>
                    <div className="flex items-center space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Deal
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentDeals.map((deal) => (
                          <tr key={deal.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{deal.company}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{deal.value}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(deal.status)}`}>
                                {deal.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {deal.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-gray-400 hover:text-gray-500">
                                <MoreHorizontal className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tabs.Content>
              
              <Tabs.Content value="tasks" className="py-4">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">All Tasks</h3>
                    <button className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="px-4 py-4 sm:px-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id={`task-${task.id}`}
                              name={`task-${task.id}`}
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`task-${task.id}`} className="ml-3 text-sm font-medium text-gray-900">
                              {task.title}
                            </label>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {task.date}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <button className="text-blue-600 hover:text-blue-500">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </main>
      </div>
    </div>
  );
}