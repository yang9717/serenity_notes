import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import { NotepadText, PenLine, Users, UserPlus } from 'lucide-react'

const Welcome = () => {
    useTitle('Serenity: Dashboard')

    const { username, isAdmin, isManager } = useAuth()
    const date = new Date() 
    const today = new Intl.DateTimeFormat('en-MY', {dateStyle: 'full', timeStyle: 'long'}).format(date)
    
    const ActionCard = ({ icon: Icon, title, description, to }) => (
        <Link
            to={to}
            className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl 
                       hover:bg-slate-800/70 transition-all duration-300 
                       border border-slate-700/50 hover:border-emerald-500/30
                       flex items-start gap-4 relative"
        >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 
                          group-hover:from-emerald-500/5 group-hover:to-teal-500/5 
                          rounded-xl transition-all duration-300" />
            
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center 
                          justify-center group-hover:bg-emerald-500/20 transition-colors
                          border border-emerald-500/20 group-hover:border-emerald-500/30
                          relative"
            >
                <Icon className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 relative">
                <h3 className="text-lg font-semibold mb-1 text-slate-200 
                             group-hover:text-emerald-400 transition-colors"
                >
                    {title}
                </h3>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>
        </Link>
    )

    return (
        <div className="min-h-[calc(100vh-theme(spacing.32))] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(148_163_184_/_0.05)_1px,_transparent_0)] [background-size:24px_24px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <p className="text-slate-400 mb-2">{today}</p>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Welcome back, {username}
                    </h1>
                </div>

                {/* Action Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <ActionCard
                        icon={NotepadText}
                        title="View Care Notes"
                        description="View and manage your existing care notes"
                        to="/dash/notes"
                    />
                    <ActionCard
                        icon={PenLine}
                        title="Add New Note"
                        description="Create a new care note"
                        to="/dash/notes/new"
                    />
                    {(isManager || isAdmin) && (
                        <>
                            <ActionCard
                                icon={Users}
                                title="Staff Management"
                                description="View and manage staff accounts"
                                to="/dash/users"
                            />
                            <ActionCard
                                icon={UserPlus}
                                title="Add Staff Member"
                                description="Create a new staff account"
                                to="/dash/users/new"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Welcome