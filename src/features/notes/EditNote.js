import { useParams } from "react-router-dom"
import { useGetNotesQuery } from "./notesApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import useAuth from "../../hooks/useAuth"
import Loading from '../../components/ui/Loading'
import EditNoteForm from "./EditNoteForm"
import ErrorMessage from '../../components/ui/ErrorMessage'
import useTitle from '../../hooks/useTitle'

const EditNote = () => {

    useTitle('Serenity: Edit Note')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { note } = useGetNotesQuery('notesList', {
        selectFromResult:({ data }) => ({
          note: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery('usersList', {
        selectFromResult:({ data }) => ({
          users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!note || !users?.length) return Loading

    if (!isAdmin && !isManager) {
        if (note.username !== username){
          return <ErrorMessage errmsg="No Access" />
        }
    }

    const content = <EditNoteForm note={note} users={users} />
    return content
}

export default EditNote