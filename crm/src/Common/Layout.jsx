import { Outlet } from "react-router-dom"
import Sidebar from "../Common/Sidebar"

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
