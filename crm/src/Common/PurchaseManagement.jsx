

import { useState } from "react"
import {
  ShoppingBag,
  DollarSign,
  Package,
  Plus,
  Search,
  Filter,
  Calendar,
  Clipboard,
  Eye,
  Download,
  FileText,
  RefreshCw,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  BarChart2,
  ChevronDown,
  Save,
} from "lucide-react"

export default function PurchaseManagement() {
  const [activeTab, setActiveTab] = useState("purchase-requests")
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    department: "all",
    dateRange: "all",
  })
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  // Sample data
  const purchaseStats = [
    {
      title: "Total Purchases",
      value: "$87,342.50",
      change: "+8.3%",
      icon: ShoppingBag,
    },
    {
      title: "Pending Orders",
      value: "24",
      change: "-3.7%",
      icon: Calendar,
    },
    {
      title: "Received Items",
      value: "1,432",
      change: "+12.2%",
      icon: Package,
    },
    {
      title: "Vendor Payments",
      value: "$45,230.75",
      change: "+5.1%",
      icon: DollarSign,
    },
  ]

  // Sample departments
  const departments = [
    "Operations",
    "Marketing",
    "IT",
    "HR",
    "Finance",
    "Sales",
    "Production",
    "R&D",
    "Logistics",
    "Quality Control",
  ]

  // Sample purchase orders data
  const purchaseOrders = [
    {
      id: "PO-2001",
      vendor: "Global Supplies",
      date: "2025-05-07",
      amount: "$4,250.00",
      status: "Received",
      items: [
        {
          id: 1,
          name: "Office Desk",
          quantity: 5,
          unitPrice: "$350.00",
          total: "$1,750.00",
          rateComparison: [
            { vendor: "Global Supplies", price: "$350.00" },
            { vendor: "Office Solutions", price: "$375.00" },
          ],
        },
        {
          id: 2,
          name: "Office Chair",
          quantity: 10,
          unitPrice: "$250.00",
          total: "$2,500.00",
          rateComparison: [
            { vendor: "Global Supplies", price: "$250.00" },
            { vendor: "Office Solutions", price: "$265.00" },
          ],
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "John Smith", date: "2025-05-01", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-02", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-03", status: "Approved" },
      ],
    },
    {
      id: "PO-2002",
      vendor: "Tech Components",
      date: "2025-05-06",
      amount: "$2,875.50",
      status: "In Transit",
      items: [
        {
          id: 1,
          name: "Laptop",
          quantity: 2,
          unitPrice: "$1,200.00",
          total: "$2,400.00",
          rateComparison: [
            { vendor: "Tech Components", price: "$1,200.00" },
            { vendor: "IT Supplies", price: "$1,250.00" },
          ],
        },
        {
          id: 2,
          name: "Mouse",
          quantity: 5,
          unitPrice: "$25.10",
          total: "$125.50",
          rateComparison: [
            { vendor: "Tech Components", price: "$25.10" },
            { vendor: "IT Supplies", price: "$27.50" },
          ],
        },
        {
          id: 3,
          name: "Keyboard",
          quantity: 5,
          unitPrice: "$70.00",
          total: "$350.00",
          rateComparison: [
            { vendor: "Tech Components", price: "$70.00" },
            { vendor: "IT Supplies", price: "$75.00" },
          ],
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Michael Brown", date: "2025-05-01", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-02", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-03", status: "Approved" },
      ],
    },
    {
      id: "PO-2003",
      vendor: "Office Solutions",
      date: "2025-05-05",
      amount: "$1,240.75",
      status: "Pending",
      items: [
        {
          id: 1,
          name: "Paper (Reams)",
          quantity: 50,
          unitPrice: "$4.50",
          total: "$225.00",
          rateComparison: [
            { vendor: "Office Solutions", price: "$4.50" },
            { vendor: "Global Supplies", price: "$4.75" },
          ],
        },
        {
          id: 2,
          name: "Pens (Box)",
          quantity: 20,
          unitPrice: "$12.50",
          total: "$250.00",
          rateComparison: [
            { vendor: "Office Solutions", price: "$12.50" },
            { vendor: "Global Supplies", price: "$13.00" },
          ],
        },
        {
          id: 3,
          name: "Notebooks",
          quantity: 100,
          unitPrice: "$7.65",
          total: "$765.75",
          rateComparison: [
            { vendor: "Office Solutions", price: "$7.65" },
            { vendor: "Global Supplies", price: "$8.00" },
          ],
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Sarah Johnson", date: "2025-05-01", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-02", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-03", status: "Pending" },
      ],
    },
    {
      id: "PO-2004",
      vendor: "Industrial Parts",
      date: "2025-05-04",
      amount: "$3,950.25",
      status: "Received",
      items: [
        {
          id: 1,
          name: "Motor Assembly",
          quantity: 2,
          unitPrice: "$1,200.00",
          total: "$2,400.00",
          rateComparison: [
            { vendor: "Industrial Parts", price: "$1,200.00" },
            { vendor: "Machine Supply Co", price: "$1,350.00" },
          ],
        },
        {
          id: 2,
          name: "Bearings",
          quantity: 50,
          unitPrice: "$15.50",
          total: "$775.00",
          rateComparison: [
            { vendor: "Industrial Parts", price: "$15.50" },
            { vendor: "Machine Supply Co", price: "$16.25" },
          ],
        },
        {
          id: 3,
          name: "Control Panel",
          quantity: 1,
          unitPrice: "$775.25",
          total: "$775.25",
          rateComparison: [
            { vendor: "Industrial Parts", price: "$775.25" },
            { vendor: "Machine Supply Co", price: "$800.00" },
          ],
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "John Smith", date: "2025-04-28", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-04-29", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-04-30", status: "Approved" },
      ],
    },
    {
      id: "PO-2005",
      vendor: "Raw Materials Inc",
      date: "2025-05-03",
      amount: "$5,120.00",
      status: "Pending Approval",
      items: [
        {
          id: 1,
          name: "Steel Sheets",
          quantity: 20,
          unitPrice: "$120.00",
          total: "$2,400.00",
          rateComparison: [
            { vendor: "Raw Materials Inc", price: "$120.00" },
            { vendor: "Metal Suppliers", price: "$125.00" },
          ],
        },
        {
          id: 2,
          name: "Aluminum Rods",
          quantity: 50,
          unitPrice: "$32.00",
          total: "$1,600.00",
          rateComparison: [
            { vendor: "Raw Materials Inc", price: "$32.00" },
            { vendor: "Metal Suppliers", price: "$34.50" },
          ],
        },
        {
          id: 3,
          name: "Copper Wire (Rolls)",
          quantity: 8,
          unitPrice: "$140.00",
          total: "$1,120.00",
          rateComparison: [
            { vendor: "Raw Materials Inc", price: "$140.00" },
            { vendor: "Metal Suppliers", price: "$145.00" },
          ],
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Michael Brown", date: "2025-05-01", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-02", status: "Pending" },
        { stage: "Procurement", approver: "", date: "", status: "Not Started" },
      ],
    },
  ]

  // Sample vendor data
  const vendors = [
    {
      name: "Global Supplies",
      purchases: "$12,450.00",
      orders: 8,
      rating: "A",
      contact: {
        name: "Robert Johnson",
        email: "robert@globalsupplies.com",
        phone: "555-123-4567",
        address: "123 Supply St, Business Park, NY 10001",
      },
      documents: [
        { name: "Contract 2025", type: "PDF", date: "2025-01-15" },
        { name: "Tax Certificate", type: "PDF", date: "2025-01-10" },
        { name: "Insurance Policy", type: "PDF", date: "2025-01-05" },
      ],
      transactions: [
        { id: "TR-1001", date: "2025-05-07", amount: "$4,250.00", type: "Payment" },
        { id: "TR-1002", date: "2025-04-15", amount: "$3,200.00", type: "Payment" },
        { id: "TR-1003", date: "2025-03-22", amount: "$5,000.00", type: "Payment" },
      ],
    },
    {
      name: "Tech Components",
      purchases: "$8,975.50",
      orders: 5,
      rating: "A",
      contact: {
        name: "Sarah Miller",
        email: "sarah@techcomponents.com",
        phone: "555-234-5678",
        address: "456 Tech Ave, Innovation Park, CA 90210",
      },
      documents: [
        { name: "Contract 2025", type: "PDF", date: "2025-01-20" },
        { name: "Tax Certificate", type: "PDF", date: "2025-01-18" },
        { name: "Quality Certification", type: "PDF", date: "2025-01-15" },
      ],
      transactions: [
        { id: "TR-2001", date: "2025-05-06", amount: "$2,875.50", type: "Payment" },
        { id: "TR-2002", date: "2025-04-10", amount: "$3,100.00", type: "Payment" },
        { id: "TR-2003", date: "2025-03-15", amount: "$3,000.00", type: "Payment" },
      ],
    },
    {
      name: "Office Solutions",
      purchases: "$6,240.75",
      orders: 4,
      rating: "B",
      contact: {
        name: "Michael Davis",
        email: "michael@officesolutions.com",
        phone: "555-345-6789",
        address: "789 Office Blvd, Corporate Center, IL 60601",
      },
      documents: [
        { name: "Contract 2025", type: "PDF", date: "2025-02-01" },
        { name: "Tax Certificate", type: "PDF", date: "2025-01-25" },
      ],
      transactions: [
        { id: "TR-3001", date: "2025-05-05", amount: "$1,240.75", type: "Payment" },
        { id: "TR-3002", date: "2025-04-05", amount: "$2,000.00", type: "Payment" },
        { id: "TR-3003", date: "2025-03-10", amount: "$3,000.00", type: "Payment" },
      ],
    },
    {
      name: "Industrial Parts",
      purchases: "$9,950.25",
      orders: 6,
      rating: "A",
      contact: {
        name: "Jennifer Wilson",
        email: "jennifer@industrialparts.com",
        phone: "555-456-7890",
        address: "101 Industrial Way, Manufacturing District, MI 48201",
      },
      documents: [
        { name: "Contract 2025", type: "PDF", date: "2025-01-10" },
        { name: "Tax Certificate", type: "PDF", date: "2025-01-05" },
        { name: "ISO Certification", type: "PDF", date: "2025-01-02" },
      ],
      transactions: [
        { id: "TR-4001", date: "2025-05-04", amount: "$3,950.25", type: "Payment" },
        { id: "TR-4002", date: "2025-04-20", amount: "$3,000.00", type: "Payment" },
        { id: "TR-4003", date: "2025-03-25", amount: "$3,000.00", type: "Payment" },
      ],
    },
    {
      name: "Raw Materials Inc",
      purchases: "$7,120.00",
      orders: 3,
      rating: "C",
      contact: {
        name: "David Brown",
        email: "david@rawmaterials.com",
        phone: "555-567-8901",
        address: "202 Material St, Industrial Zone, TX 75001",
      },
      documents: [
        { name: "Contract 2025", type: "PDF", date: "2025-02-15" },
        { name: "Tax Certificate", type: "PDF", date: "2025-02-10" },
      ],
      transactions: [
        { id: "TR-5001", date: "2025-05-03", amount: "$5,120.00", type: "Payment" },
        { id: "TR-5002", date: "2025-03-30", amount: "$2,000.00", type: "Payment" },
      ],
    },
  ]

  // Sample purchase requests data with multi-department support
  const purchaseRequests = [
    {
      id: "PR-1001",
      requester: "John Smith",
      department: "Operations",
      date: "2025-05-07",
      status: "Approved",
      items: [
        {
          id: 1,
          name: "Office Desk",
          quantity: 5,
          estimatedCost: "$1,750.00",
          justification: "Expansion of operations team",
        },
        {
          id: 2,
          name: "Office Chair",
          quantity: 10,
          estimatedCost: "$2,500.00",
          justification: "Expansion of operations team",
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Mark Johnson", date: "2025-05-05", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-06", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-07", status: "Approved" },
      ],
    },
    {
      id: "PR-1002",
      requester: "Sarah Johnson",
      department: "Marketing",
      date: "2025-05-06",
      status: "Pending",
      items: [
        {
          id: 1,
          name: "Digital Camera",
          quantity: 1,
          estimatedCost: "$1,200.00",
          justification: "Product photography",
        },
        { id: 2, name: "Tripod", quantity: 1, estimatedCost: "$150.00", justification: "Product photography" },
        { id: 3, name: "Lighting Kit", quantity: 1, estimatedCost: "$350.00", justification: "Product photography" },
      ],
      approvals: [
        { stage: "Department Head", approver: "Jessica Adams", date: "2025-05-06", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "", status: "Pending" },
        { stage: "Procurement", approver: "", date: "", status: "Not Started" },
      ],
    },
    {
      id: "PR-1003",
      requester: "Michael Brown",
      department: "IT",
      date: "2025-05-05",
      status: "Rejected",
      items: [
        {
          id: 1,
          name: "Server",
          quantity: 1,
          estimatedCost: "$5,000.00",
          justification: "Upgrade existing infrastructure",
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Robert Chen", date: "2025-05-05", status: "Approved" },
        {
          stage: "Finance",
          approver: "David Wilson",
          date: "2025-05-05",
          status: "Rejected",
          reason: "Budget constraints - defer to next quarter",
        },
        { stage: "Procurement", approver: "", date: "", status: "Not Started" },
      ],
    },
    {
      id: "PR-1004",
      requester: "Emily Davis",
      department: "HR",
      date: "2025-05-04",
      status: "Approved",
      items: [
        {
          id: 1,
          name: "Training Materials",
          quantity: 50,
          estimatedCost: "$1,000.00",
          justification: "New employee onboarding",
        },
        {
          id: 2,
          name: "Office Supplies",
          quantity: 1,
          estimatedCost: "$500.00",
          justification: "New employee welcome kits",
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Patricia Lopez", date: "2025-05-04", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-04", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-04", status: "Approved" },
      ],
    },
    {
      id: "PR-1005",
      requester: "David Wilson",
      department: "Finance",
      date: "2025-05-03",
      status: "Pending",
      items: [
        {
          id: 1,
          name: "Accounting Software License",
          quantity: 5,
          estimatedCost: "$2,500.00",
          justification: "Annual renewal",
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "George Thompson", date: "2025-05-03", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-03", status: "Approved" },
        { stage: "Procurement", approver: "", date: "", status: "Pending" },
      ],
    },
  ]

  // Sample goods receipt data with batch and expiry tracking
  const goodsReceipts = [
    {
      id: "GR-3001",
      poRef: "PO-2001",
      vendor: "Global Supplies",
      date: "2025-05-07",
      items: 12,
      status: "Complete",
      receivedItems: [
        {
          id: 1,
          name: "Office Desk",
          quantity: 5,
          batchNumber: "GS-D-2505",
          location: "Warehouse A",
          condition: "Good",
          notes: "All items received in good condition",
        },
        {
          id: 2,
          name: "Office Chair",
          quantity: 10,
          batchNumber: "GS-C-2505",
          location: "Warehouse A",
          condition: "Good",
          notes: "All items received in good condition",
        },
      ],
    },
    {
      id: "GR-3002",
      poRef: "PO-2002",
      vendor: "Tech Components",
      date: "2025-05-06",
      items: 8,
      status: "Partial",
      receivedItems: [
        {
          id: 1,
          name: "Laptop",
          quantity: 2,
          batchNumber: "TC-L-2505",
          serialNumbers: ["L123456", "L123457"],
          location: "IT Department",
          condition: "Good",
          notes: "All items received in good condition",
        },
        {
          id: 2,
          name: "Mouse",
          quantity: 5,
          batchNumber: "TC-M-2505",
          location: "IT Department",
          condition: "Good",
          notes: "All items received in good condition",
        },
        {
          id: 3,
          name: "Keyboard",
          quantity: 0,
          batchNumber: "",
          location: "",
          condition: "",
          notes: "Items on backorder, expected in 1 week",
        },
      ],
    },
    {
      id: "GR-3003",
      poRef: "PO-2004",
      vendor: "Industrial Parts",
      date: "2025-05-04",
      items: 15,
      status: "Complete",
      receivedItems: [
        {
          id: 1,
          name: "Motor Assembly",
          quantity: 2,
          batchNumber: "IP-MA-2505",
          serialNumbers: ["MA78901", "MA78902"],
          location: "Production Floor",
          condition: "Good",
          notes: "Tested and working properly",
        },
        {
          id: 2,
          name: "Bearings",
          quantity: 50,
          batchNumber: "IP-B-2505",
          location: "Parts Storage",
          condition: "Good",
          notes: "Quality inspection passed",
        },
        {
          id: 3,
          name: "Control Panel",
          quantity: 1,
          batchNumber: "IP-CP-2505",
          serialNumbers: ["CP45678"],
          location: "Production Floor",
          condition: "Good",
          notes: "Tested and working properly",
        },
      ],
    },
    {
      id: "GR-3004",
      poRef: "PO-2003",
      vendor: "Office Solutions",
      date: "2025-05-05",
      items: 5,
      status: "Pending",
      receivedItems: [],
    },
    {
      id: "GR-3005",
      poRef: "PO-2005",
      vendor: "Raw Materials Inc",
      date: "2025-05-03",
      items: 20,
      status: "Scheduled",
      receivedItems: [],
      scheduledDate: "2025-05-10",
    },
  ]

  // Sample invoices data with tax compliance
  const invoices = [
    {
      id: "INV-4001",
      vendor: "Global Supplies",
      date: "2025-05-07",
      amount: "$4,250.00",
      status: "Paid",
      poRef: "PO-2001",
      taxDetails: {
        subtotal: "$3,900.00",
        taxRate: "9%",
        taxAmount: "$350.00",
        total: "$4,250.00",
      },
      paymentTerms: "Net 30",
      dueDate: "2025-06-06",
      paymentDate: "2025-05-20",
      paymentRef: "PAY-5001",
    },
    {
      id: "INV-4002",
      vendor: "Tech Components",
      date: "2025-05-06",
      amount: "$2,875.50",
      status: "Pending",
      poRef: "PO-2002",
      taxDetails: {
        subtotal: "$2,638.99",
        taxRate: "9%",
        taxAmount: "$236.51",
        total: "$2,875.50",
      },
      paymentTerms: "Net 30",
      dueDate: "2025-06-05",
      paymentDate: "",
      paymentRef: "",
    },
    {
      id: "INV-4003",
      vendor: "Office Solutions",
      date: "2025-05-05",
      amount: "$1,240.75",
      status: "Overdue",
      poRef: "PO-2003",
      taxDetails: {
        subtotal: "$1,138.30",
        taxRate: "9%",
        taxAmount: "$102.45",
        total: "$1,240.75",
      },
      paymentTerms: "Net 15",
      dueDate: "2025-05-20",
      paymentDate: "",
      paymentRef: "",
    },
    {
      id: "INV-4004",
      vendor: "Industrial Parts",
      date: "2025-05-04",
      amount: "$3,950.25",
      status: "Paid",
      poRef: "PO-2004",
      taxDetails: {
        subtotal: "$3,624.08",
        taxRate: "9%",
        taxAmount: "$326.17",
        total: "$3,950.25",
      },
      paymentTerms: "Net 30",
      dueDate: "2025-06-03",
      paymentDate: "2025-05-15",
      paymentRef: "PAY-5004",
    },
    {
      id: "INV-4005",
      vendor: "Raw Materials Inc",
      date: "2025-05-03",
      amount: "$5,120.00",
      status: "Pending",
      poRef: "PO-2005",
      taxDetails: {
        subtotal: "$4,697.25",
        taxRate: "9%",
        taxAmount: "$422.75",
        total: "$5,120.00",
      },
      paymentTerms: "Net 45",
      dueDate: "2025-06-17",
      paymentDate: "",
      paymentRef: "",
    },
  ]

  // Sample payments data with scheduling and aging
  const payments = [
    {
      id: "PAY-5001",
      vendor: "Global Supplies",
      date: "2025-05-20",
      amount: "$4,250.00",
      method: "Bank Transfer",
      invoiceRef: "INV-4001",
      status: "Completed",
      bankDetails: {
        bank: "First National Bank",
        accountName: "Global Supplies Inc.",
        accountNumber: "XXXX4567",
        reference: "INV-4001",
      },
    },
    {
      id: "PAY-5002",
      vendor: "Tech Components",
      date: "2025-06-05",
      amount: "$2,875.50",
      method: "Credit Card",
      invoiceRef: "INV-4002",
      status: "Scheduled",
      cardDetails: {
        cardType: "Corporate Card",
        lastFour: "8901",
        expiryDate: "XX/XX",
        reference: "INV-4002",
      },
    },
    {
      id: "PAY-5003",
      vendor: "Office Solutions",
      date: "2025-05-25",
      amount: "$1,240.75",
      method: "Check",
      invoiceRef: "INV-4003",
      status: "Pending",
      checkDetails: {
        checkNumber: "10045",
        bankName: "First National Bank",
        reference: "INV-4003",
      },
    },
    {
      id: "PAY-5004",
      vendor: "Industrial Parts",
      date: "2025-05-15",
      amount: "$3,950.25",
      method: "Bank Transfer",
      invoiceRef: "INV-4004",
      status: "Completed",
      bankDetails: {
        bank: "First National Bank",
        accountName: "Industrial Parts Ltd.",
        accountNumber: "XXXX7890",
        reference: "INV-4004",
      },
    },
    {
      id: "PAY-5005",
      vendor: "Raw Materials Inc",
      date: "2025-06-15",
      amount: "$5,120.00",
      method: "Wire Transfer",
      invoiceRef: "INV-4005",
      status: "Scheduled",
      bankDetails: {
        bank: "International Bank",
        accountName: "Raw Materials Inc.",
        accountNumber: "XXXX2345",
        reference: "INV-4005",
      },
    },
  ]

  // Aging report data
  const agingReport = [
    {
      vendor: "Global Supplies",
      current: "$0.00",
      days30: "$0.00",
      days60: "$0.00",
      days90: "$0.00",
      days90Plus: "$0.00",
      total: "$0.00",
    },
    {
      vendor: "Tech Components",
      current: "$2,875.50",
      days30: "$0.00",
      days60: "$0.00",
      days90: "$0.00",
      days90Plus: "$0.00",
      total: "$2,875.50",
    },
    {
      vendor: "Office Solutions",
      current: "$0.00",
      days30: "$1,240.75",
      days60: "$0.00",
      days90: "$0.00",
      days90Plus: "$0.00",
      total: "$1,240.75",
    },
    {
      vendor: "Industrial Parts",
      current: "$0.00",
      days30: "$0.00",
      days60: "$0.00",
      days90: "$0.00",
      days90Plus: "$0.00",
      total: "$0.00",
    },
    {
      vendor: "Raw Materials Inc",
      current: "$5,120.00",
      days30: "$0.00",
      days60: "$0.00",
      days90: "$0.00",
      days90Plus: "$0.00",
      total: "$5,120.00",
    },
  ]

  // Function to handle opening modals
  const openModal = (type, item = null) => {
    setModalType(type)
    setSelectedItem(item)
    setShowModal(true)
  }

  // Function to handle closing modals
  const closeModal = () => {
    setShowModal(false)
    setModalType("")
    setSelectedItem(null)
  }

  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Function to toggle filter menu
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu)
  }

  // Function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilterOptions({
      ...filterOptions,
      [filterType]: value,
    })
  }

  return (
    <div className="p-6 bg-black/90 border-r border-purple-700/30 backdrop-blur-md text-gray-400 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-400">Purchase Management</h1>
          <p className="text-gray-400">Manage vendor orders and procurement</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" /> Export
          </button>
          <button
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md flex items-center"
            onClick={() => openModal("new-purchase")}
          >
            <Plus className="h-4 w-4 mr-2" /> New Purchase
          </button>
        </div>
      </div>

      {/* Stats Cards as Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-900/20">
              {purchaseStats.map((stat, index) => (
                <th
                  key={index}
                  className="p-4 text-left font-medium text-purple-300 border-r border-purple-700/30 last:border-r-0"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-800/30 rounded-full mr-3">
                      <stat.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    {stat.title}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {purchaseStats.map((stat, index) => (
                <td key={index} className="p-4 border-r border-purple-700/30 last:border-r-0">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">from last month</span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Purchase Process Steps as Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-900/20">
              <th className="p-4 text-center font-medium text-purple-300" colSpan={6}>
                Purchase Process Flow
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <Clipboard className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Purchase Request</span>
                </div>
              </td>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Request Approval</span>
                </div>
              </td>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <ShoppingBag className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Purchase Order</span>
                </div>
              </td>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <Package className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Goods Receipt</span>
                </div>
              </td>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Purchase Invoice</span>
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <DollarSign className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Vendor Payment</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="grid grid-cols-6 bg-purple-900/20 border border-purple-700/30 rounded-lg p-1">
          {["purchase-requests", "purchase-orders", "goods-receipt", "vendor-invoices", "payments", "vendors"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab
                    ? "bg-purple-800/30 text-purple-300"
                    : "text-gray-400 hover:text-purple-300 hover:bg-purple-900/10"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ),
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 my-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-black border border-purple-700/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center"
              onClick={toggleFilterMenu}
            >
              <Filter className="h-4 w-4 mr-2" /> Filter <ChevronDown className="h-4 w-4 ml-2" />
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-black border border-purple-700/30 rounded-md shadow-lg z-10">
                <div className="p-3">
                  <h4 className="text-purple-300 font-medium mb-2">Filter Options</h4>

                  <div className="mb-3">
                    <label className="block text-sm text-gray-400 mb-1">Status</label>
                    <select
                      className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white"
                      value={filterOptions.status}
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm text-gray-400 mb-1">Department</label>
                    <select
                      className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white"
                      value={filterOptions.department}
                      onChange={(e) => handleFilterChange("department", e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept.toLowerCase()}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm text-gray-400 mb-1">Date Range</label>
                    <select
                      className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white"
                      value={filterOptions.dateRange}
                      onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm"
                      onClick={() => {
                        setFilterOptions({
                          status: "all",
                          department: "all",
                          dateRange: "all",
                        })
                        setShowFilterMenu(false)
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-sm ml-2"
                      onClick={() => setShowFilterMenu(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "purchase-requests" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-purple-300">Purchase Requests</h3>
                <p className="text-sm text-gray-400">Manage and track purchase requisitions</p>
              </div>
              <button
                className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-sm flex items-center"
                onClick={() => openModal("new-request")}
              >
                <Plus className="h-4 w-4 mr-1" /> New Request
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Request ID</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Requester</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{request.id}</td>
                      <td className="py-3 px-4">{request.requester}</td>
                      <td className="py-3 px-4">{request.department}</td>
                      <td className="py-3 px-4">{request.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            request.status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : request.status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center"
                            onClick={() => openModal("view-request", request)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </button>
                          {request.status === "Approved" && (
                            <button
                              className="px-3 py-1 bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-md text-sm flex items-center"
                              onClick={() => openModal("create-po", request)}
                            >
                              <ShoppingBag className="h-4 w-4 mr-1" /> Create PO
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "purchase-orders" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-purple-300">Purchase Orders</h3>
                <p className="text-sm text-gray-400">Manage and track vendor orders</p>
              </div>
              <button
                className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-sm flex items-center"
                onClick={() => openModal("new-po")}
              >
                <Plus className="h-4 w-4 mr-1" /> New PO
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">PO Number</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.vendor}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4 font-medium">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Received"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "In Transit"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center"
                            onClick={() => openModal("view-po", order)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </button>
                          {(order.status === "In Transit" || order.status === "Pending") && (
                            <button
                              className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-md text-sm flex items-center"
                              onClick={() => openModal("create-grn", order)}
                            >
                              <Package className="h-4 w-4 mr-1" /> Receive
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "goods-receipt" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
              <h3 className="text-lg font-medium text-purple-300">Goods Receipt</h3>
              <p className="text-sm text-gray-400">Track received items and deliveries</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Receipt ID</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">PO Reference</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {goodsReceipts.map((receipt, index) => (
                    <tr
                      key={receipt.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{receipt.id}</td>
                      <td className="py-3 px-4">{receipt.poRef}</td>
                      <td className="py-3 px-4">{receipt.vendor}</td>
                      <td className="py-3 px-4">{receipt.date}</td>
                      <td className="py-3 px-4">{receipt.items}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            receipt.status === "Complete"
                              ? "bg-green-500/20 text-green-400"
                              : receipt.status === "Partial"
                                ? "bg-blue-500/20 text-blue-400"
                                : receipt.status === "Scheduled"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {receipt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center"
                            onClick={() => openModal("view-grn", receipt)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </button>
                          {(receipt.status === "Complete" || receipt.status === "Partial") && (
                            <button
                              className="px-3 py-1 bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-md text-sm flex items-center"
                              onClick={() => openModal("create-invoice", receipt)}
                            >
                              <FileText className="h-4 w-4 mr-1" /> Invoice
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "vendor-invoices" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-purple-300">Vendor Invoices</h3>
                <p className="text-sm text-gray-400">Manage and track vendor invoices</p>
              </div>
              <button
                className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-sm flex items-center"
                onClick={() => openModal("new-invoice")}
              >
                <Plus className="h-4 w-4 mr-1" /> New Invoice
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr
                      key={invoice.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{invoice.id}</td>
                      <td className="py-3 px-4">{invoice.vendor}</td>
                      <td className="py-3 px-4">{invoice.date}</td>
                      <td className="py-3 px-4 font-medium">{invoice.amount}</td>
                      <td className="py-3 px-4">{invoice.dueDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            invoice.status === "Paid"
                              ? "bg-green-500/20 text-green-400"
                              : invoice.status === "Overdue"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center"
                            onClick={() => openModal("view-invoice", invoice)}
                          >
                            <FileText className="h-4 w-4 mr-1" /> View
                          </button>
                          {invoice.status === "Pending" && (
                            <button
                              className="px-3 py-1 bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-md text-sm flex items-center"
                              onClick={() => openModal("schedule-payment", invoice)}
                            >
                              <DollarSign className="h-4 w-4 mr-1" /> Pay
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <div className="border border-purple-700/30 rounded-lg overflow-hidden mb-8">
              <div className="bg-purple-900/20 p-4 border-b border-purple-700/30 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-purple-300">Payments</h3>
                  <p className="text-sm text-gray-400">Track vendor payments and schedules</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-sm flex items-center"
                    onClick={() => openModal("schedule-payment")}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Schedule Payment
                  </button>
                  <button
                    className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center"
                    onClick={() => openModal("aging-report")}
                  >
                    <BarChart2 className="h-4 w-4 mr-1" /> Aging Report
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-900/10">
                      <th className="text-left py-3 px-4 font-medium text-purple-300">Payment ID</th>
                      <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                      <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-purple-300">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-purple-300">Method</th>
                      <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr
                        key={payment.id}
                        className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                      >
                        <td className="py-3 px-4 font-medium">{payment.id}</td>
                        <td className="py-3 px-4">{payment.vendor}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4 font-medium">{payment.amount}</td>
                        <td className="py-3 px-4">{payment.method}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === "Completed"
                                ? "bg-green-500/20 text-green-400"
                                : payment.status === "Scheduled"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center ml-auto"
                            onClick={() => openModal("view-payment", payment)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Aging Report */}
            <div className="border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
                <h3 className="text-lg font-medium text-purple-300">Vendor Aging Report</h3>
                <p className="text-sm text-gray-400">Outstanding payments by age</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-900/10">
                      <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                      <th className="text-right py-3 px-4 font-medium text-purple-300">Current</th>
                      <th className="text-right py-3 px-4 font-medium text-purple-300">1-30 Days</th>
                      <th className="text-right py-3 px-4 font-medium text-purple-300">31-60 Days</th>
                      <th className="text-right py-3 px-4 font-medium text-purple-300">61-90 Days</th>
                      <th className="text-right py-3 px-4 font-medium text-purple-300">90+ Days</th>
                      <th className="text-right py-3 px-4 font-medium text-purple-300">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agingReport.map((report, index) => (
                      <tr
                        key={report.vendor}
                        className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                      >
                        <td className="py-3 px-4 font-medium">{report.vendor}</td>
                        <td className="py-3 px-4 text-right">{report.current}</td>
                        <td className="py-3 px-4 text-right">{report.days30}</td>
                        <td className="py-3 px-4 text-right">{report.days60}</td>
                        <td className="py-3 px-4 text-right">{report.days90}</td>
                        <td className="py-3 px-4 text-right">{report.days90Plus}</td>
                        <td className="py-3 px-4 text-right font-medium">{report.total}</td>
                      </tr>
                    ))}
                    <tr className="bg-purple-900/20 font-medium">
                      <td className="py-3 px-4">Total</td>
                      <td className="py-3 px-4 text-right">$7,995.50</td>
                      <td className="py-3 px-4 text-right">$1,240.75</td>
                      <td className="py-3 px-4 text-right">$0.00</td>
                      <td className="py-3 px-4 text-right">$0.00</td>
                      <td className="py-3 px-4 text-right">$0.00</td>
                      <td className="py-3 px-4 text-right">$9,236.25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "vendors" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-purple-300">Vendor Master</h3>
                <p className="text-sm text-gray-400">Manage vendor information and history</p>
              </div>
              <button
                className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-sm flex items-center"
                onClick={() => openModal("new-vendor")}
              >
                <Plus className="h-4 w-4 mr-1" /> New Vendor
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor Name</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Contact Person</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Total Purchases</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Orders</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Rating</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor, index) => (
                    <tr
                      key={vendor.name}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{vendor.name}</td>
                      <td className="py-3 px-4">{vendor.contact.name}</td>
                      <td className="py-3 px-4">{vendor.contact.email}</td>
                      <td className="py-3 px-4">{vendor.purchases}</td>
                      <td className="py-3 px-4">{vendor.orders}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            vendor.rating === "A"
                              ? "bg-green-500/20 text-green-400"
                              : vendor.rating === "B"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {vendor.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center"
                            onClick={() => openModal("view-vendor", vendor)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Details
                          </button>
                          <button
                            className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-md text-sm flex items-center"
                            onClick={() => openModal("edit-vendor", vendor)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-purple-700/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30 flex justify-between items-center">
              <h3 className="text-lg font-medium text-purple-300">
                {modalType === "new-request" && "New Purchase Request"}
                {modalType === "view-request" && "Purchase Request Details"}
                {modalType === "new-po" && "New Purchase Order"}
                {modalType === "view-po" && "Purchase Order Details"}
                {modalType === "create-po" && "Create Purchase Order"}
                {modalType === "create-grn" && "Receive Goods"}
                {modalType === "view-grn" && "Goods Receipt Details"}
                {modalType === "new-invoice" && "New Vendor Invoice"}
                {modalType === "view-invoice" && "Invoice Details"}
                {modalType === "create-invoice" && "Create Invoice"}
                {modalType === "schedule-payment" && "Schedule Payment"}
                {modalType === "view-payment" && "Payment Details"}
                {modalType === "aging-report" && "Aging Report"}
                {modalType === "new-vendor" && "New Vendor"}
                {modalType === "view-vendor" && "Vendor Details"}
                {modalType === "edit-vendor" && "Edit Vendor"}
              </h3>
              <button className="text-gray-400 hover:text-white" onClick={closeModal}>
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* New Purchase Request Form */}
              {modalType === "new-request" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Requester</label>
                      <input
                        type="text"
                        className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Department</label>
                      <select className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white">
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Request Date</label>
                      <input
                        type="date"
                        className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Priority</label>
                      <select className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white">
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm text-gray-400">Items</label>
                      <button className="px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-xs flex items-center">
                        <Plus className="h-3 w-3 mr-1" /> Add Item
                      </button>
                    </div>
                    <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="text-left p-2 text-xs font-medium text-purple-300">Item Name</th>
                          <th className="text-left p-2 text-xs font-medium text-purple-300">Quantity</th>
                          <th className="text-left p-2 text-xs font-medium text-purple-300">Est. Cost</th>
                          <th className="text-left p-2 text-xs font-medium text-purple-300">Justification</th>
                          <th className="w-10 p-2 text-xs font-medium text-purple-300"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-purple-700/20">
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full bg-black border border-purple-700/30 rounded-md p-1 text-white text-sm"
                              placeholder="Item name"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              className="w-full bg-black border border-purple-700/30 rounded-md p-1 text-white text-sm"
                              placeholder="Qty"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full bg-black border border-purple-700/30 rounded-md p-1 text-white text-sm"
                              placeholder="$0.00"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full bg-black border border-purple-700/30 rounded-md p-1 text-white text-sm"
                              placeholder="Reason for purchase"
                            />
                          </td>
                          <td className="p-2">
                            <button className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-1">Additional Notes</label>
                    <textarea
                      className="w-full bg-black border border-purple-700/30 rounded-md p-2 text-white h-24"
                      placeholder="Any additional information..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md flex items-center">
                      <Save className="h-4 w-4 mr-2" /> Submit Request
                    </button>
                  </div>
                </div>
              )}

              {/* View Purchase Request */}
              {modalType === "view-request" && selectedItem && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Request ID</label>
                      <div className="p-2 bg-black/50 border border-purple-700/30 rounded-md text-white">
                        {selectedItem.id}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Status</label>
                      <div className="p-2 bg-black/50 border border-purple-700/30 rounded-md">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedItem.status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : selectedItem.status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Requester</label>
                      <div className="p-2 bg-black/50 border border-purple-700/30 rounded-md text-white">
                        {selectedItem.requester}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Department</label>
                      <div className="p-2 bg-black/50 border border-purple-700/30 rounded-md text-white">
                        {selectedItem.department}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Request Date</label>
                      <div className="p-2 bg-black/50 border border-purple-700/30 rounded-md text-white">
                        {selectedItem.date}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Requested Items</label>
                    <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Item Name</th>
                          <th className="text-center p-3 text-sm font-medium text-purple-300">Quantity</th>
                          <th className="text-right p-3 text-sm font-medium text-purple-300">Est. Cost</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Justification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.items.map((item) => (
                          <tr key={item.id} className="border-b border-purple-700/20">
                            <td className="p-3 text-white">{item.name}</td>
                            <td className="p-3 text-center text-white">{item.quantity}</td>
                            <td className="p-3 text-right text-white">{item.estimatedCost}</td>
                            <td className="p-3 text-white">{item.justification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Approval History</label>
                    <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Stage</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Approver</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Date</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Status</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.approvals.map((approval, index) => (
                          <tr key={index} className="border-b border-purple-700/20">
                            <td className="p-3 text-white">{approval.stage}</td>
                            <td className="p-3 text-white">{approval.approver || "-"}</td>
                            <td className="p-3 text-white">{approval.date || "-"}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  approval.status === "Approved"
                                    ? "bg-green-500/20 text-green-400"
                                    : approval.status === "Rejected"
                                      ? "bg-red-500/20 text-red-400"
                                      : approval.status === "Pending"
                                        ? "bg-yellow-500/20 text-yellow-400"
                                        : "bg-gray-500/20 text-gray-400"
                                }`}
                              >
                                {approval.status}
                              </span>
                            </td>
                            <td className="p-3 text-white">{approval.reason || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    {selectedItem.status === "Approved" && (
                      <button
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md flex items-center"
                        onClick={() => {
                          closeModal()
                          openModal("create-po", selectedItem)
                        }}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" /> Create PO
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* View Vendor Details */}
              {modalType === "view-vendor" && selectedItem && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Vendor Name</label>
                      <div className="p-2 bg-black/50 border border-purple-700/30 rounded-md text-white">
                        {selectedItem.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Rating</label>
                      <div className="p-2 bg-black/50 border border-purple-700/30 rounded-md">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedItem.rating === "A"
                              ? "bg-green-500/20 text-green-400"
                              : selectedItem.rating === "B"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {selectedItem.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-purple-300 font-medium mb-2">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-purple-700/30 rounded-md">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Contact Person</label>
                        <div className="text-white">{selectedItem.contact.name}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <div className="text-white">{selectedItem.contact.email}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone</label>
                        <div className="text-white">{selectedItem.contact.phone}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Address</label>
                        <div className="text-white">{selectedItem.contact.address}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-purple-300 font-medium mb-2">Documents</h4>
                    <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Document Name</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Type</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Date</th>
                          <th className="text-right p-3 text-sm font-medium text-purple-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.documents.map((doc, index) => (
                          <tr key={index} className="border-b border-purple-700/20">
                            <td className="p-3 text-white">{doc.name}</td>
                            <td className="p-3 text-white">{doc.type}</td>
                            <td className="p-3 text-white">{doc.date}</td>
                            <td className="p-3 text-right">
                              <button className="px-2 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-xs">
                                <Download className="h-3 w-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-purple-300 font-medium mb-2">Transaction History</h4>
                    <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Transaction ID</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Date</th>
                          <th className="text-left p-3 text-sm font-medium text-purple-300">Type</th>
                          <th className="text-right p-3 text-sm font-medium text-purple-300">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-purple-700/20">
                            <td className="p-3 text-white">{transaction.id}</td>
                            <td className="p-3 text-white">{transaction.date}</td>
                            <td className="p-3 text-white">{transaction.type}</td>
                            <td className="p-3 text-right text-white">{transaction.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md flex items-center"
                      onClick={() => {
                        closeModal()
                        openModal("edit-vendor", selectedItem)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit Vendor
                    </button>
                  </div>
                </div>
              )}

              {/* Other modal content types would go here */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
