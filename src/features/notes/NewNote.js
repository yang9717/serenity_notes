import NewNoteForm from "./NewNoteForm"
import { useGetUsersQuery } from '../users/usersApiSlice'
import Loading from "../../components/ui/Loading"
import useTitle from '../../hooks/useTitle'

const NewNote = () => {
    useTitle('Serenity: New Note')

    const { users } = useGetUsersQuery('usersList', {
            selectFromResult: ({ data }) => ({
                users: data?.ids.map(id => data?.entities[id])
            })
        })
    
    if (!users?.length) return Loading
    const content = <NewNoteForm users={users} />

    return content
}

export default NewNote