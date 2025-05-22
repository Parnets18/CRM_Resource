
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Phone,
  Calendar,
  FileText,
  Search,
  Plus,
  Menu,
  X,
  ChevronRight,
  Mail,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Filter,
} from "lucide-react";

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: "Infosys Technologies",
    type: "Enterprise",
    industry: "IT Services",
    contactPerson: "Rajesh Kumar",
    email: "rajesh.kumar@infosys.com",
    phone: "+91 9876543210",
    status: "Active",
    lastContact: "2023-05-15",
  },
  {
    id: 2,
    name: "Reliance Industries",
    type: "Enterprise",
    industry: "Energy",
    contactPerson: "Priya Sharma",
    email: "priya.sharma@reliance.com",
    phone: "+91 9876543211",
    status: "Active",
    lastContact: "2023-05-10",
  },
  {
    id: 3,
    name: "Tata Consultancy Services",
    type: "Enterprise",
    industry: "IT Services",
    contactPerson: "Amit Patel",
    email: "amit.patel@tcs.com",
    phone: "+91 9876543212",
    status: "Inactive",
    lastContact: "2023-04-28",
  },
  {
    id: 4,
    name: "Flipkart",
    type: "Enterprise",
    industry: "E-commerce",
    contactPerson: "Sneha Reddy",
    email: "sneha.reddy@flipkart.com",
    phone: "+91 9876543213",
    status: "Active",
    lastContact: "2023-05-12",
  },
  {
    id: 5,
    name: "Bharti Airtel",
    type: "Enterprise",
    industry: "Telecommunications",
    contactPerson: "Vikram Singh",
    email: "vikram.singh@airtel.com",
    phone: "+91 9876543214",
    status: "Active",
    lastContact: "2023-05-08",
  },
];

// Mock data for follow-ups
const mockFollowUps = [
  {
    id: 1,
    customerId: 1,
    customerName: "Infosys Technologies",
    type: "Call",
    date: "2023-05-20",
    time: "10:30 AM",
    notes: "Discuss renewal of annual maintenance contract",
    status: "Scheduled",
    assignedTo: "Rahul Verma",
  },
  {
    id: 2,
    customerId: 2,
    customerName: "Reliance Industries",
    type: "Meeting",
    date: "2023-05-22",
    time: "02:00 PM",
    notes: "Product demo for new security solution",
    status: "Scheduled",
    assignedTo: "Priya Sharma",
  },
  {
    id: 3,
    customerId: 4,
    customerName: "Flipkart",
    type: "Email",
    date: "2023-05-18",
    time: "11:00 AM",
    notes: "Send proposal for cloud migration project",
    status: "Scheduled",
    assignedTo: "Amit Patel",
  },
  {
    id: 4,
    customerId: 5,
    customerName: "Bharti Airtel",
    type: "Call",
    date: "2023-05-19",
    time: "04:30 PM",
    notes: "Follow up on pending invoice payment",
    status: "Scheduled",
    assignedTo: "Rahul Verma",
  },
  {
    id: 5,
    customerId: 3,
    customerName: "Tata Consultancy Services",
    type: "Meeting",
    date: "2023-05-25",
    time: "01:00 PM",
    notes: "Quarterly business review meeting",
    status: "Scheduled",
    assignedTo: "Sneha Reddy",
  },
];

// Mock data for support tickets
const mockTickets = [
  {
    id: 1,
    customerId: 1,
    customerName: "Infosys Technologies",
    subject: "Network connectivity issues",
    description: "Experiencing intermittent network drops at main office",
    priority: "High",
    status: "Open",
    createdDate: "2023-05-14",
    assignedTo: "Vikram Singh",
  },
  {
    id: 2,
    customerId: 4,
    customerName: "Flipkart",
    subject: "Server performance degradation",
    description: "Database servers showing high CPU usage during peak hours",
    priority: "Critical",
    status: "In Progress",
    createdDate: "2023-05-13",
    assignedTo: "Rahul Verma",
  },
  {
    id: 3,
    customerId: 2,
    customerName: "Reliance Industries",
    subject: "Email delivery delays",
    description: "Emails taking more than 30 minutes to deliver",
    priority: "Medium",
    status: "Open",
    createdDate: "2023-05-15",
    assignedTo: "Priya Sharma",
  },
  {
    id: 4,
    customerId: 5,
    customerName: "Bharti Airtel",
    subject: "VPN access issues",
    description: "Remote users unable to connect to VPN",
    priority: "High",
    status: "In Progress",
    createdDate: "2023-05-12",
    assignedTo: "Amit Patel",
  },
  {
    id: 5,
    customerId: 3,
    customerName: "Tata Consultancy Services",
    subject: "Software license activation",
    description: "Unable to activate new software licenses",
    priority: "Low",
    status: "Resolved",
    createdDate: "2023-05-10",
    assignedTo: "Sneha Reddy",
  },
];

// Mock data for contracts
const mockContracts = [
  {
    id: 1,
    customerId: 1,
    customerName: "Infosys Technologies",
    type: "Annual Maintenance Contract",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    value: 1200000,
    status: "Active",
    renewalDate: "2023-11-30",
  },
  {
    id: 2,
    customerId: 2,
    customerName: "Reliance Industries",
    type: "Software License",
    startDate: "2023-03-15",
    endDate: "2024-03-14",
    value: 3500000,
    status: "Active",
    renewalDate: "2024-02-14",
  },
  {
    id: 3,
    customerId: 4,
    customerName: "Flipkart",
    type: "Cloud Services",
    startDate: "2023-02-01",
    endDate: "2024-01-31",
    value: 2800000,
    status: "Active",
    renewalDate: "2023-12-31",
  },
  {
    id: 4,
    customerId: 5,
    customerName: "Bharti Airtel",
    type: "Security Services",
    startDate: "2022-12-01",
    endDate: "2023-11-30",
    value: 1800000,
    status: "Active",
    renewalDate: "2023-10-30",
  },
  {
    id: 5,
    customerId: 3,
    customerName: "Tata Consultancy Services",
    type: "Hardware Warranty",
    startDate: "2022-10-15",
    endDate: "2023-10-14",
    value: 950000,
    status: "Active",
    renewalDate: "2023-09-14",
  },
];

// Mock data for communications
const mockCommunications = [
  {
    id: 1,
    customerId: 1,
    customerName: "Infosys Technologies",
    type: "Email",
    date: "2023-05-15",
    subject: "AMC Renewal Discussion",
    content: "Discussed the upcoming renewal of the annual maintenance contract.",
    sentBy: "Rahul Verma",
  },
  {
    id: 2,
    customerId: 2,
    customerName: "Reliance Industries",
    type: "Call",
    date: "2023-05-10",
    subject: "Product Demo Follow-up",
    content: "Called to follow up after the product demonstration. Client expressed interest in proceeding.",
    sentBy: "Priya Sharma",
  },
  {
    id: 3,
    customerId: 4,
    customerName: "Flipkart",
    type: "Meeting",
    date: "2023-05-12",
    subject: "Quarterly Business Review",
    content: "Conducted quarterly business review meeting. Discussed current projects and future opportunities.",
    sentBy: "Amit Patel",
  },
  {
    id: 4,
    customerId: 5,
    customerName: "Bharti Airtel",
    type: "Email",
    date: "2023-05-08",
    subject: "Invoice Payment Reminder",
    content: "Sent a reminder about the pending invoice payment due on May 15th.",
    sentBy: "Sneha Reddy",
  },
  {
    id: 5,
    customerId: 3,
    customerName: "Tata Consultancy Services",
    type: "Call",
    date: "2023-04-28",
    subject: "Service Outage Update",
    content: "Called to provide updates on the recent service outage and resolution timeline.",
    sentBy: "Vikram Singh",
  },
];

// CRM stats
const crmStats = [
  {
    title: "Total Customers",
    value: "45",
    period: "Active accounts",
    icon: Users,
    change: "+5",
  },
  {
    title: "Open Tickets",
    value: "12",
    period: "Support requests",
    icon: AlertCircle,
    change: "-3",
  },
  {
    title: "Upcoming Renewals",
    value: "8",
    period: "Next 30 days",
    icon: RefreshCw,
    change: "+2",
  },
  {
    title: "Scheduled Follow-ups",
    value: "15",
    period: "This week",
    icon: Calendar,
    change: "+4",
  },
];

// The main component - only defined once
const CRMManagement = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddFollowUpModalOpen, setIsAddFollowUpModalOpen] = useState(false);
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [isAddCommunicationModalOpen, setIsAddCommunicationModalOpen] = useState(false);

  // Filter data based on search term
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFollowUps = mockFollowUps.filter(
    (followUp) =>
      followUp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTickets = mockTickets.filter(
    (ticket) =>
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContracts = mockContracts.filter(
    (contract) =>
      contract.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCommunications = mockCommunications.filter(
    (communication) =>
      communication.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      communication.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      communication.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      communication.sentBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Navigation tabs
  const tabs = [
    { id: "customers", label: "Customer Master" },
    { id: "followups", label: "Follow-ups & Activities" },
    { id: "communications", label: "Communication Log" },
    { id: "tickets", label: "Support Tickets" },
    { id: "contracts", label: "Contracts & Renewals" },
  ];

  // Component JSX
  return (
    <div className="bg-white min-h-screen p-6 text-black">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Relationship Management</h1>
        <p className="text-gray-600">Manage customers, follow-ups, support tickets, and communications</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {crmStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <stat.icon className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-black font-medium">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
              <span className="text-gray-600 text-xs ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-bold text-black">Recent Leads</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-black rounded-md text-sm">
                  View All
                </button>
                <button className="px-3 py-1 bg-black hover:bg-gray-800 text-white rounded-md text-sm">
                  Add Lead
                </button>
              </div>
            </div>
            {/* Leads list */}
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          {/* Other content */}
        </div>
      </div>

      {/* Rest of your component */}
    </div>
  );
};

export default CRMManagement
