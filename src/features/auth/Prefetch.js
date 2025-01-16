import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {


    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'noteList', { force: true }))
        store.dispatch(notesApiSlice.util.prefetch('getUsers', 'userList', { force: true }))
    }, [])

  return <Outlet />
}

export default Prefetch