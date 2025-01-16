import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import useDebounce from "../../hooks/useDebounce"
import { useState } from "react"
import { FileText } from 'lucide-react'
import Loading from "../../components/ui/Loading"
import PageHeader from '../../components/layouts/PageHeader'
import useTitle from "../../hooks/useTitle"
import SearchBar from "../../components/layouts/SearchBar"
import ErrorMessage from "../../components/ui/ErrorMessage"

const NotesList = () => {
    
    useTitle('Serenity: Notes List')

    const { username, isManager, isAdmin } = useAuth()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    const {
      data: notes,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetNotesQuery('notesList', {
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    })

    let content 

    if (isLoading) {
        content = Loading
    }

    if (isError) {
        content = <ErrorMessage errmsg={error?.data?.message} />
    }

    if (isSuccess) {
      const { ids, entities } = notes

      let filteredIds
      if (isAdmin || isManager) {
          filteredIds = [...ids]
      } else {
          filteredIds = ids.filter(noteId => entities[noteId].username === username)
      }

      if (debouncedSearchTerm) {
          filteredIds = filteredIds.filter(noteId =>
            entities[noteId].ticketno.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        }

      const tableContent = ids?.length 
            ? filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />) 
            : null

      const tableHeaderClass = "px-6 py-4 text-left text-xs ont-semibold text-slate-300 uppercase tracking-wider whitespace-nowrap"
      
      content = (
            <div className="w-full">

            <PageHeader
                icon={FileText} 
                title="Client Care Notes" 
                subtitle={`${filteredIds.length} ${filteredIds.length === 1 ? 'note' : 'notes'} recorded`} 
            />

            <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isDebouncing={searchTerm !== debouncedSearchTerm}
            />

                <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 
                                to-teal-500/20 rounded-2xl blur-xl" />
                    
                    <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl 
                                shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-slate-700/50">
                                        <th scope="col" className={tableHeaderClass}>
                                            Ticket No.
                                        </th>
                                        <th scope="col" className={tableHeaderClass}>
                                            Title
                                        </th>
                                        <th scope="col" className={tableHeaderClass}>
                                            Therapist
                                        </th>
                                        <th scope="col" className={tableHeaderClass}>
                                            Created
                                        </th>
                                        <th scope="col" className={tableHeaderClass}>
                                            Updated
                                        </th>
                                        <th scope="col" className={tableHeaderClass}>
                                            Status
                                        </th>
                                        <th scope="col" className={tableHeaderClass}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {tableContent}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
      )
    }
    return content
}

export default NotesList