import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { UserPlus } from 'lucide-react'
import PageHeader from '../../components/layouts/PageHeader'
import { ActionButton } from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import InputField from '../../components/ui/InputField'
import ErrorMessage from '../../components/ui/ErrorMessage'
import useTitle from '../../hooks/useTitle'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle('Serenity: Users List')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(['Employee'])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}
            >{role}</option>
        )
    })
    
    const content = (
        <div className="max-w-2xl mx-auto">
            <PageHeader 
                icon={UserPlus} 
                title="New User Registration" 
            />

            {isError && (<ErrorMessage errmsg={error?.data?.message} />)}

            {/* Form */}
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 
                              to-teal-500/20 rounded-2xl blur-xl" />
                
                <form onSubmit={onSaveUserClicked} 
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
                            helperText="[4-12 chars include !@#$%]" 
                            type="password" 
                            value={password} 
                            onChange={onPasswordChanged} 
                            valid={validPassword}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <Select 
                            label="Assigned Roles"
                            value={roles} 
                            onChange={onRolesChanged} 
                            options={options}  
                            multiple={true} 
                            size={3}
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <ActionButton 
                            type="submit" 
                            disabled={!canSave} 
                            text="Register Staff" 
                            canSave={canSave} 
                        />
                    </div>
                </form>
            </div>
        </div>
    )
    
    return content
}

export default NewUserForm