
import { useState } from "react"
import { PlusCircle, Edit, Trash2, Search, LayoutGrid, List } from "lucide-react"
import RestoNav from "../RestoNav"

const cn = (...classes) => classes.filter(Boolean).join(" ")

const initialTables = [
  {
    id: 1,
    table_name: "Table 1",
    layout_image: "round",
    capacity: 4,
    loyalty_applied: false,
    discount: 0,
    payment_method: null,
    total: 0,
    status: "available",
  },
  {
    id: 2,
    table_name: "Table 2",
    layout_image: "square",
    capacity: 2,
    loyalty_applied: false,
    discount: 0,
    payment_method: null,
    total: 0,
    status: "occupied",
  },
  {
    id: 3,
    table_name: "Table 3",
    layout_image: "round",
    capacity: 6,
    loyalty_applied: false,
    discount: 0,
    payment_method: null,
    total: 0,
    status: "reserved",
  },
  {
    id: 4,
    table_name: "Table 4",
    layout_image: "square",
    capacity: 4,
    loyalty_applied: false,
    discount: 0,
    payment_method: null,
    total: 0,
    status: "available",
  },
  {
    id: 5,
    table_name: "Table 5",
    layout_image: "round",
    capacity: 8,
    loyalty_applied: false,
    discount: 0,
    payment_method: null,
    total: 0,
    status: "available",
  },
]

export default function TableManagement() {
  const [tables, setTables] = useState(initialTables)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTable, setCurrentTable] = useState(null)
  const [newTable, setNewTable] = useState({
    table_name: "",
    layout_image: "round",
    capacity: 2,
    status: "available",
  })

  const filteredTables = tables.filter((table) => 
    table.table_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddTable = () => {
    if (!newTable.table_name) return

    const newId = Math.max(...tables.map((t) => t.id), 0) + 1
    const tableToAdd = {
      ...newTable,
      id: newId,
      loyalty_applied: false,
      discount: 0,
      payment_method: null,
      total: 0,
    }

    setTables([...tables, tableToAdd])
    setNewTable({
      table_name: "",
      layout_image: "round",
      capacity: 2,
      status: "available",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditTable = () => {
    if (!currentTable) return
    setTables(tables.map((table) => 
      table.id === currentTable.id ? currentTable : table))
    setIsEditDialogOpen(false)
    setCurrentTable(null)
  }

  const handleDeleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800"
      case "occupied": return "bg-red-100 text-red-800"
      case "reserved": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RestoNav />

      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Header Section */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Table Management</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your restaurant tables and layouts</p>
            </div>

            <div className="flex flex-col xs:flex-row gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tables..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                  <button
                    className={cn("p-1.5 rounded-md", viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500")}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </button>
                  <button
                    className={cn("p-1.5 rounded-md", viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500")}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>

                <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTables.map((table) => (
                <div
                  key={table.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-4 flex flex-col items-center">
                    {table.layout_image === "round" ? (
                      <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
                        <span className="text-xs text-blue-800">Round</span>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-green-100 border-2 border-green-300 flex items-center justify-center">
                        <span className="text-xs text-green-800">Square</span>
                      </div>
                    )}
                    <h3 className="mt-3 font-medium text-gray-900">{table.table_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{table.capacity} people</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(table.status)}`}>
                        {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t px-4 py-3 bg-gray-50 flex justify-between">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setCurrentTable(table)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteTable(table.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shape</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTables.map((table) => (
                    <tr key={table.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {table.table_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {table.layout_image === "round" ? "Round" : "Square"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {table.capacity} people
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(table.status)}`}>
                          {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              setCurrentTable(table)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteTable(table.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Table Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Table</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={newTable.table_name}
                  onChange={(e) => setNewTable({ ...newTable, table_name: e.target.value })}
                  placeholder="Table name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Shape</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  value={newTable.layout_image}
                  onChange={(e) => setNewTable({ ...newTable, layout_image: e.target.value })}
                >
                  <option value="round">Round</option>
                  <option value="square">Square</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                >
                  {[2, 4, 6, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>{num} people</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  value={newTable.status}
                  onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                onClick={handleAddTable}
              >
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Table Dialog */}
      {isEditDialogOpen && currentTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Table</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={currentTable.table_name}
                  onChange={(e) => setCurrentTable({ ...currentTable, table_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Shape</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  value={currentTable.layout_image}
                  onChange={(e) => setCurrentTable({ ...currentTable, layout_image: e.target.value })}
                >
                  <option value="round">Round</option>
                  <option value="square">Square</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  value={currentTable.capacity}
                  onChange={(e) => setCurrentTable({ ...currentTable, capacity: e.target.value })}
                >
                  {[2, 4, 6, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>{num} people</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  value={currentTable.status}
                  onChange={(e) => setCurrentTable({ ...currentTable, status: e.target.value })}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentTable.loyalty_applied}
                  onChange={(e) => setCurrentTable({ ...currentTable, loyalty_applied: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label className="text-sm text-gray-700">Loyalty Applied</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={currentTable.discount}
                  onChange={(e) => setCurrentTable({ ...currentTable, discount: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                onClick={handleEditTable}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}