import { Outlet } from "react-router-dom"
import DashHeader from './DashHeader'
import DashFooter from "./DashFooter"


const Dashlayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
          <DashHeader />
          <main className="flex-1 container mx-auto px-4 py-6">
              <Outlet />
          </main>
          <DashFooter />
    </div>
  )
}

export default Dashlayout