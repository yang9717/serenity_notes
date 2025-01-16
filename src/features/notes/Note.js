import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { memo } from 'react'
import { Pencil } from 'lucide-react'

const Note = ({ noteId }) => {
    
    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        })
    })
    
    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-MY', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-MY', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="hover:bg-slate-700/50 border-b border-slate-700">
                <td className="px-6 py-4 text-sm text-slate-200 whitespace-nowrap">
                    {note.ticketno}
                </td>
                <td className="px-6 py-4 text-sm text-slate-200 font-medium whitespace-nowrap">
                    {note.title}
                </td>
                <td className="px-6 py-4 text-sm text-slate-200 whitespace-nowrap">
                    {note.username}
                </td>
                <td className="px-6 py-4 text-sm text-slate-200 whitespace-nowrap">
                    {created}
                </td>
                <td className="px-6 py-4 text-sm text-slate-200 whitespace-nowrap">
                    {updated}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {note.completed ? (
                        <span className="px-3 py-1 text-xs font-medium 
                                     bg-green-500/20 text-green-300">
                            Completed
                        </span>
                    ) : (
                        <span className="px-3 py-1 text-xs font-medium 
                                     bg-red-500/20 text-red-300">
                            Open
                        </span>
                    )}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button
                        onClick={handleEdit}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Edit Note"
                    >
                        <Pencil className="w-4 h-4 text-slate-300" />
                    </button>
                </td>
            </tr>
        )
    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote