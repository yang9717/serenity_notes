import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from './usersApiSlice'
import Loading from "../../components/ui/Loading"
import useTitle from '../../hooks/useTitle'

const EditUser = () => {
    useTitle('Serenity: Edit User')
    
    const{ id } = useParams()
    
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    if (!user) return Loading

    const content =  <EditUserForm user={user} />

    return content
}

export default EditUser