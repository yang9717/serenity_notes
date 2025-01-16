import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { UserCog } from 'lucide-react'
import { ActionButton, DeleteButton } from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import Toggle from '../../components/ui/Toggle'
import PageHeader from '../../components/layouts/PageHeader'
import InputField from '../../components/ui/InputField'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }
    
    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async () => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}
                className="text-slate-200 bg-slate-800"
            >{role}</option>
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <div className="max-w-2xl mx-auto">

            <PageHeader
                icon={UserCog} 
                title="Update User Settings"
            />


            {(isError || isDelError) && (<ErrorMessage errmsg={errContent} />)}

            {/* Form Card */}
            <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 
                              to-teal-500/20 rounded-2xl blur-xl" />
                
                <form onSubmit={e => e.preventDefault()} 
                      className="relative bg-slate-800/80 backdrop-blur-sm p-8 
                               rounded-xl shadow-xl space-y-6">
   
                    <div>
                        <InputField 
                            id="username" 
                            label="Username" 
                            helperText="[3-20 letters]" 
                            value={username} 
                            onChange={onUsernameChanged} 
                            valid={validUsername}
                        />
                    </div>

                    <div>
                        <InputField 
                            id="password" 
                            label="Password" 
                            helperText="[empty = no change]" 
                            type="password" 
                            value={password} 
                            onChange={onPasswordChanged}
                            valid={validPassword}
                        />
                    </div>

                    <div className="flex items-center">
                        <Toggle 
                            label="Active Status" 
                            checked={active} 
                            onChange={onActiveChanged} 
                        />
                    </div>

                    <div>
                        <Select 
                            label="Assigned Roles"
                            value={roles} 
                            onChange={onRolesChanged} 
                            options={options}  
                            multiple={true} 
                            size={3}
                            isInvalid={roles.length === 0} 
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <ActionButton 
                            onClick={onSaveUserClicked} 
                            disabled={!canSave} 
                            text="Save Changes" 
                            canSave={canSave} 
                        />
                        <DeleteButton 
                            onClick={onDeleteUserClicked} 
                            text="Delete User"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
    return content
}

export default EditUserForm