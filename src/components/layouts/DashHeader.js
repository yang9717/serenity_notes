import { useEffect } from "react"
import { FileText, FilePlus, UserPlus, LogOut, Users, Heart } from 'lucide-react'
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
import useAuth from "../../hooks/useAuth"
import ErrorMessage from "../ui/ErrorMessage"

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const { isAdmin, isManager } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    const containerClass = !DASH_REGEX.test(pathname) && 
                            !NOTES_REGEX.test(pathname) && 
                            !USERS_REGEX.test(pathname)
                            ? 'max-w-3xl'
                            : 'max-w-7xl'

    const IconButton = ({ onClick, title, icon: Icon, disabled = false }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded-lg transition-all duration-300
                      ${disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-emerald-500/10 active:bg-emerald-500/20'}
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
            title={title}
        >
            <Icon className="w-5 h-5 text-emerald-400" />
        </button>
    )

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <IconButton
                title="New Note"
                icon={FilePlus}
                onClick={onNewNoteClicked}
            />
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <IconButton
                title="New User"
                icon={UserPlus}
                onClick={onNewUserClicked}
            />
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <IconButton
                    title="Users"
                    icon={Users}
                    onClick={onUsersClicked}
                />
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <IconButton
                title="Notes"
                icon={FileText}
                onClick={onNotesClicked}
            />
        )
    }

    const handleLogout = async () => {
        try {
            await sendLogout().unwrap()
            navigate('/')
        } catch (err) {
            console.error('Failed to logout:', err)
        }
    }

    const logoutButton = (
        <IconButton
            title="Logout"
            icon={LogOut}
            onClick={handleLogout}
        />
    )
 
    const buttonContent = isLoading ? (
        <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 
                          rounded-full animate-spin" />
            <span>Signing out...</span>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            {newNoteButton}
            {newUserButton}
            {notesButton}
            {userButton}
            {logoutButton}
        </div>
    )
    
    const content = (
        <>
            {isError && (
                <ErrorMessage errmsg={error?.data?.message} />
            )}
            
            <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm 
                             border-b border-slate-700/50 shadow-lg">
                <div className={`${containerClass} mx-auto px-4 py-3`}>
                    <div className="flex justify-between items-center">
                        <Link 
                            to="/dash/notes"
                            className="flex items-center gap-2 group"
                        >
                            <Heart className="w-6 h-6 text-emerald-400 
                                           group-hover:text-emerald-300 transition-colors" />
                            <span className="text-2xl font-bold bg-gradient-to-r 
                                         from-emerald-400 to-teal-400 bg-clip-text 
                                         text-transparent group-hover:opacity-90 
                                         transition-opacity">
                                Serenity Notes Management System
                            </span>
                        </Link>

                        <nav className="flex items-center gap-2">
                            {buttonContent}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )

    return content
}

export default DashHeader