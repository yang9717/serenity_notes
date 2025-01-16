import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { Home } from 'lucide-react'
import { FooterRoleBadge } from "../ui/RoleBadge"

const DashFooter = () => {
    const { username, status, isAdmin, isManager } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="p-2 rounded-lg transition-all duration-200
                          hover:bg-slate-700 active:bg-slate-600
                          focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <Home className="w-5 h-5 text-slate-300" />
            </button>
        )
    }
    
    return (
        <footer className="sticky bottom-0 bg-slate-800/95 backdrop-blur-sm 
                          border-t border-slate-700/50 shadow-lg">
            <div className="max-w-7xl mx-auto p-3 flex items-center gap-3">
                {goHomeButton}
                <p className="text-slate-400 text-sm">
                    You're logged in as <span className="text-emerald-400">{username}</span>
                        <span className={FooterRoleBadge}>
                            {status}
                        </span>
                </p>
            </div>
        </footer>
    )
}

export default DashFooter