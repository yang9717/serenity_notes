import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { Clock, FileEdit } from 'lucide-react'
import Select from '../../components/ui/Select'
import { ActionButton, DeleteButton } from '../../components/ui/Button'
import PageHeader from '../../components/layouts/PageHeader'
import Toggle from '../../components/ui/Toggle'
import useAuth from '../../hooks/useAuth'
import InputField from '../../components/ui/InputField'
import TextArea from '../../components/ui/TextArea'
import useTitle from '../../hooks/useTitle'

const EditNoteForm = ({ note, users }) => {

    useTitle('Serenity: Edit Note')
    
    const { isAdmin, isManager } = useAuth()
    
    const [updateNote, {
            isLoading,
            isSuccess,
            isError,
            error
        }] = useUpdateNoteMutation()
    
    const [deleteNote, {
            isSuccess: isDelSuccess,
            isError: isDelError,
            error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [userId, setUserId] = useState(note.user)
    const [completed, setCompleted] = useState(note.completed)
    
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onCompletedChanged = () => setCompleted(prev => !prev)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async () => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-MY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-MY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
                className="text-slate-200 bg-slate-800"
            >{user.username}</option>
        )
    })

    const DateInfo = ({ label, date }) => (
        <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 mt-0.5" />
            <div>
                <p className="font-medium text-slate-300">{label}</p>
                <p>{date}</p>
            </div>
        </div>
    )

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <div className="max-w-2xl mx-auto">

            <PageHeader
                icon={FileEdit} 
                title="Update Care Note" 
                subtitle={`Case #${note.ticketno}`} 
            />

            {(isError || isDelError) && (<ErrorMessage errmsg={errContent} />)}

            <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 
                              to-teal-500/20 rounded-2xl blur-xl" />
                
                <form onSubmit={e => e.preventDefault()} 
                      className="relative bg-slate-800/80 backdrop-blur-sm p-8 
                               rounded-xl shadow-xl space-y-6">

                    <div>
                        <InputField
                            id="title"
                            label="Session Title"
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
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div>
                                <Toggle
                                    label="Session Complete"
                                    checked={completed}
                                    onChange={onCompletedChanged}
                                />
                            </div>

                            <div>
                                <Select 
                                    label="Therapist" 
                                    value={userId} 
                                    onChange={onUserIdChanged} 
                                    options={options}
                                    size={1}
                                /> 
                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-slate-400">
                            <DateInfo label="Created" date={created} />
                            <DateInfo label="Updated" date={updated} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <ActionButton 
                            onClick={onSaveNoteClicked} 
                            disabled={!canSave} 
                            text="Save Changes" 
                            canSave={canSave} 
                        />
                        {(isManager || isAdmin) && (
                            <DeleteButton 
                                onClick={onDeleteNoteClicked}
                                text="Remove Note"/>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
    return content
}

export default EditNoteForm