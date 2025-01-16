import { useNavigate } from "react-router-dom"
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import { Pencil } from 'lucide-react'
import { RoleBadge } from "../../components/ui/RoleBadge"

const User = ({ userId }) => {
    
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const navigate = useNavigate()

    if (user) {
      
        const handleEdit = () => navigate(`/dash/users/${userId}`)

    return (
            <tr className="hover:bg-slate-700/50 border-b border-slate-700">
                <td className="px-6 py-4 text-sm text-slate-200">
                    {user.username}
                </td>
                <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                        {user.roles.map(role => (
                            <span 
                                key={role}
                                className={RoleBadge}
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <button
                        onClick={handleEdit}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Edit User"
                    >
                        <Pencil className="w-4 h-4 text-slate-300" />
                    </button>
                </td>
            </tr>
      )
    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser