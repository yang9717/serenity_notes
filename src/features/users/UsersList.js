import { useGetUsersQuery } from "./usersApiSlice"
import { Users } from 'lucide-react'
import Loading from "../../components/ui/Loading"
import useTitle from "../../hooks/useTitle"
import User from "./User"

const UsersList = () => {
    
    useTitle('Serenity: Users List')
    
    const {
      data: users,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetUsersQuery('usersList', {
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    })
    
    let content

    if (isLoading) {
        content = Loading
    }

    if (isError) {
        content = (<ErrorMessage errmsg={error?.data?.message} />)
    }

    if (isSuccess) {
        const { ids } = users

        const tableContent = ids?.length 
              ? ids.map(userId => <User key={userId} userId={userId} />)
              : null

        const tableHeaderClass = "px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"

          return (
              <div className="w-full">

                  <div className="mb-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 
                                    rounded-full bg-emerald-500/10 mb-4">
                          <Users className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h1 className="text-2xl font-bold text-slate-200">Users List</h1>
                      <p className="text-slate-400 mt-2">
                          {ids.length} {ids.length === 1 ? 'user' : 'users'} registered
                      </p>
                  </div>

                  <div className="relative">
                      {/* Glowing background effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 
                                    to-teal-500/20 rounded-2xl blur-xl" />
                      
                      <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl 
                                    shadow-xl overflow-hidden">

                          <table className="w-full">
                              <thead>
                                  <tr className="border-b border-slate-700/50">
                                      <th scope="col" 
                                          className={tableHeaderClass}>
                                          User Name
                                      </th>
                                      <th scope="col" 
                                          className={tableHeaderClass}>
                                          Roles
                                      </th>
                                      <th scope="col" 
                                          className={tableHeaderClass}>
                                          Edit
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
        )
  }

  return content
}

export default UsersList