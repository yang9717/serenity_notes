import { useState, useEffect } from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { ActionButton, DeleteButton } from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import PageHeader from '../../components/layouts/PageHeader'
import { FileText } from 'lucide-react'
import InputField from '../../components/ui/InputField'
import TextArea from '../../components/ui/TextArea'


const NewNoteForm = ({ users }) => {
    
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()
    
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)


    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading
    
    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
                className="text-slate-200 bg-slate-800"
            >{user.username}</option>
        )
    })

    const content = (
        <div className="max-w-2xl mx-auto">
            <PageHeader
                icon={FileText} 
                title="New Care Note" 
                subtitle="Document client request" 
            />

            {isError && (<ErrorMessage errmsg={error?.data?.message} />)}

            <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 
                              to-teal-500/20 rounded-2xl blur-xl" />
                
                <form onSubmit={onSaveNoteClicked} 
                      className="relative bg-slate-800/80 backdrop-blur-sm p-8 
                               rounded-xl shadow-xl space-y-6">

                    <div>
                        <InputField
                            id="title"
                            label="Session Title"
                            placeholder="Enter session title"
                            value={title}
                            onChange={onTitleChanged}
                        />
                    </div>

                    <div>
                        <TextArea
                            id="text"
                            label="Session Notes"
                            value={text}
                            onChange={onTextChanged}
                            placeholder="Enter your session notes here..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <Select 
                            label="Assigned Therapist" 
                            value={userId} 
                            onChange={onUserIdChanged} 
                            options={options}
                            size={1}
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <ActionButton 
                            type="submit" 
                            disabled={!canSave} 
                            text="Create Note" 
                            canSave={canSave} 
                        />
                    </div>
                </form>
            </div>
        </div>
    )

    return content

}

export default NewNoteForm