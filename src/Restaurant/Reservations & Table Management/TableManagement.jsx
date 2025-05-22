"use client"

import { useState } from "react"
import { UsersIcon, PlusCircleIcon, PencilIcon, TrashIcon, SearchIcon } from "lucide-react"
import RestoNav from "../RestoNav"

// Utility function for conditional class names (inline to avoid import errors)
const cn = (...classes) => classes.filter(Boolean).join(" ")

// Mock data for initial tables
const initialTables = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  capacity: Math.floor(Math.random() * 3) + 2, // 2-4 people
  status: "Free",
  shape: i % 3 === 0 ? "round" : "square",
}))

// Mock data for waiters
const waiters = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
  { id: 4, name: "Sarah Williams" },
]

// Table status options
const statusOptions = ["Free", "Reserved", "Occupied", "No-show"]

// Time slot options (30 min intervals from 10 AM to 11 PM)
const timeSlots = Array.from({ length: 26 }, (_, i) => {
  const hour = Math.floor(i / 2) + 10
  const minute = (i % 2) * 30
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minute === 0 ? "00" : minute} ${period}`
})

export default function TableManagement() {
  const [tables, setTables] = useState(initialTables)
  const [reservations, setReservations] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentReservation, setCurrentReservation] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("layout")

  // Form state
  const [formData, setFormData] = useState({
    tableId: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    guestCount: 2,
    reservationDate: formatDate(new Date()),
    timeSlot: timeSlots[0],
    waiterId: "",
    status: "Reserved",
    notes: "",
  })

  // Format date to YYYY-MM-DD for input
  function formatDate(date) {
    const d = new Date(date)
    const month = `${d.getMonth() + 1}`.padStart(2, "0")
    const day = `${d.getDate()}`.padStart(2, "0")
    return `${d.getFullYear()}-${month}-${day}`
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Create a new reservation
  const handleCreateReservation = () => {
    const newReservation = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }

    setReservations((prev) => [...prev, newReservation])

    // Update table status
    setTables((prev) =>
      prev.map((table) =>
        table.id === Number.parseInt(formData.tableId) ? { ...table, status: formData.status } : table,
      ),
    )

    // Reset form and close dialog
    resetForm()
    setIsDialogOpen(false)
  }

  // Edit existing reservation
  const handleEditReservation = () => {
    setReservations((prev) => prev.map((res) => (res.id === currentReservation.id ? { ...res, ...formData } : res)))

    // Update table status
    setTables((prev) =>
      prev.map((table) =>
        table.id === Number.parseInt(formData.tableId) ? { ...table, status: formData.status } : table,
      ),
    )

    // Reset form and close dialog
    resetForm()
    setIsDialogOpen(false)
  }

  // Delete reservation
  const handleDeleteReservation = (id) => {
    const reservation = reservations.find((res) => res.id === id)

    setReservations((prev) => prev.filter((res) => res.id !== id))

    // Reset table status to Free if this was the active reservation
    if (reservation) {
      setTables((prev) =>
        prev.map((table) => (table.id === Number.parseInt(reservation.tableId) ? { ...table, status: "Free" } : table)),
      )
    }
  }

  // Open dialog for new reservation
  const handleNewReservation = (tableId = "") => {
    setCurrentReservation(null)
    setFormData({
      tableId: tableId.toString(),
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      guestCount: 2,
      reservationDate: formatDate(new Date()),
      timeSlot: timeSlots[0],
      waiterId: "",
      status: "Reserved",
      notes: "",
    })
    setIsDialogOpen(true)
  }

  // Open dialog to edit reservation
  const handleEditReservationClick = (reservation) => {
    setCurrentReservation(reservation)
    setFormData({
      tableId: reservation.tableId,
      customerName: reservation.customerName,
      customerPhone: reservation.customerPhone,
      customerEmail: reservation.customerEmail,
      guestCount: reservation.guestCount,
      reservationDate: reservation.reservationDate,
      timeSlot: reservation.timeSlot,
      waiterId: reservation.waiterId,
      status: reservation.status,
      notes: reservation.notes || "",
    })
    setIsDialogOpen(true)
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      tableId: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      guestCount: 2,
      reservationDate: formatDate(new Date()),
      timeSlot: timeSlots[0],
      waiterId: "",
      status: "Reserved",
      notes: "",
    })
    setCurrentReservation(null)
  }

  // Update table status directly
  const handleTableStatusChange = (tableId, newStatus) => {
    setTables((prev) => prev.map((table) => (table.id === tableId ? { ...table, status: newStatus } : table)))
  }

  // Filter reservations by search query
  const filteredReservations = reservations.filter(
    (res) =>
      res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.customerPhone.includes(searchQuery) ||
      res.tableId.toString().includes(searchQuery),
  )

  // Get status color classes
  const getStatusColorClasses = (status) => {
    switch (status) {
      case "Free":
        return {
          bg: "bg-green-100",
          border: "border-green-500",
          text: "bg-green-500 text-white",
          pill: "bg-green-100 text-green-800",
          dot: "bg-green-500",
        }
      case "Reserved":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-500",
          text: "bg-yellow-500 text-white",
          pill: "bg-yellow-100 text-yellow-800",
          dot: "bg-yellow-500",
        }
      case "Occupied":
        return {
          bg: "bg-red-100",
          border: "border-red-500",
          text: "bg-red-500 text-white",
          pill: "bg-red-100 text-red-800",
          dot: "bg-red-500",
        }
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-500",
          text: "bg-gray-500 text-white",
          pill: "bg-gray-100 text-gray-800",
          dot: "bg-gray-500",
        }
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left sidebar navigation */}
      <div className="w-64 border-r bg-white shadow-sm">
        <RestoNav />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Table Management</h1>

        <div className="border-b mb-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab("layout")}
              className={`px-4 py-2 font-medium ${activeTab === "layout" ? "border-b-2 border-blue-500" : ""}`}
            >
              Table Layout
            </button>
            <button
              onClick={() => setActiveTab("reservations")}
              className={`px-4 py-2 font-medium ${activeTab === "reservations" ? "border-b-2 border-blue-500" : ""}`}
            >
              Reservations
            </button>
          </div>
        </div>

        {activeTab === "layout" && (
          <div className="py-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Restaurant Floor Plan</h2>
              <button
                onClick={() => handleNewReservation()}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                <PlusCircleIcon size={16} />
                New Reservation
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tables.map((table) => {
                const statusColors = getStatusColorClasses(table.status)
                return (
                  <div key={table.id}>
                    <div
                      className={`relative p-4 border rounded-md cursor-pointer flex flex-col items-center justify-center ${
                        table.shape === "round" ? "rounded-full" : ""
                      } ${statusColors.bg} ${statusColors.border}`}
                      style={{ height: "100px" }}
                      onClick={() => {
                        const existingReservation = reservations.find(
                          (r) => r.tableId === table.id.toString() && ["Reserved", "Occupied"].includes(r.status),
                        )

                        if (existingReservation) {
                          handleEditReservationClick(existingReservation)
                        } else {
                          handleNewReservation(table.id)
                        }
                      }}
                      title={`${table.name} (${table.capacity} seats) - ${table.status}`}
                    >
                      <span className="font-bold">{table.name}</span>
                      <span className="text-xs flex items-center gap-1">
                        <UsersIcon size={12} /> {table.capacity}
                      </span>
                      <span className={`text-xs mt-1 px-1.5 py-0.5 rounded-full ${statusColors.text}`}>
                        {table.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Table Status Legend:</h3>
              <div className="flex gap-4">
                {statusOptions.map((status) => {
                  const statusColors = getStatusColorClasses(status)
                  return (
                    <div key={status} className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${statusColors.dot}`}></div>
                      <span className="text-sm">{status}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reservations" && (
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Reservations</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <SearchIcon size={16} className="absolute left-2 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reservations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-4 py-1.5 border rounded-md text-sm"
                  />
                </div>
                <button
                  onClick={() => handleNewReservation()}
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  <PlusCircleIcon size={16} />
                  New
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left text-sm font-medium">Table</th>
                    <th className="py-2 px-3 text-left text-sm font-medium">Customer</th>
                    <th className="py-2 px-3 text-left text-sm font-medium">Date & Time</th>
                    <th className="py-2 px-3 text-left text-sm font-medium">Guests</th>
                    <th className="py-2 px-3 text-left text-sm font-medium">Waiter</th>
                    <th className="py-2 px-3 text-left text-sm font-medium">Status</th>
                    <th className="py-2 px-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => {
                      const statusColors = getStatusColorClasses(reservation.status)
                      return (
                        <tr key={reservation.id} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-3 text-sm">
                            {tables.find((t) => t.id.toString() === reservation.tableId)?.name || reservation.tableId}
                          </td>
                          <td className="py-2 px-3 text-sm">
                            <div>{reservation.customerName}</div>
                            <div className="text-xs text-gray-500">{reservation.customerPhone}</div>
                          </td>
                          <td className="py-2 px-3 text-sm">
                            <div>{new Date(reservation.reservationDate).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{reservation.timeSlot}</div>
                          </td>
                          <td className="py-2 px-3 text-sm">{reservation.guestCount}</td>
                          <td className="py-2 px-3 text-sm">
                            {waiters.find((w) => w.id.toString() === reservation.waiterId)?.name || "Not assigned"}
                          </td>
                          <td className="py-2 px-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors.pill}`}>
                              {reservation.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditReservationClick(reservation)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <PencilIcon size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteReservation(reservation.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <TrashIcon size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-gray-500">
                        No reservations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reservation Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl h-[480px] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{currentReservation ? "Edit Reservation" : "New Reservation"}</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="tableId" className="block text-sm font-medium mb-1">
                    Table
                  </label>
                  <select
                    id="tableId"
                    name="tableId"
                    value={formData.tableId}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="">Select a table</option>
                    {tables.map((table) => (
                      <option key={table.id} value={table.id.toString()}>
                        {table.name} ({table.capacity} seats) - {table.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium mb-1">
                    Customer Name
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium mb-1">
                      Guests
                    </label>
                    <input
                      id="guestCount"
                      name="guestCount"
                      type="number"
                      min="1"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
                    Email (Optional)
                  </label>
                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reservationDate" className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <input
                      id="reservationDate"
                      name="reservationDate"
                      type="date"
                      value={formData.reservationDate}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeSlot" className="block text-sm font-medium mb-1">
                      Time
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="waiterId" className="block text-sm font-medium mb-1">
                    Assigned Waiter
                  </label>
                  <select
                    id="waiterId"
                    name="waiterId"
                    value={formData.waiterId}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="">Assign a waiter</option>
                    {waiters.map((waiter) => (
                      <option key={waiter.id} value={waiter.id.toString()}>
                        {waiter.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 min-h-[80px]"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border rounded-md">
                  Cancel
                </button>
                <button
                  onClick={currentReservation ? handleEditReservation : handleCreateReservation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={!formData.tableId || !formData.customerName}
                >
                  {currentReservation ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}