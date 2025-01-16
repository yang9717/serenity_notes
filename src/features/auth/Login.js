import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { Loader, AlertCircle, ArrowLeft, Heart } from 'lucide-react'
import Toggle from '../../components/ui/Toggle'
import Loading from '../../components/ui/Loading'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'

const Login = () => {
    useTitle('Staff Login')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
      userRef.current.focus()
    }, [])

    useEffect(() => {
      setErrMsg('')
    }, [username, password])

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
          const { accessToken } = await login({ username, password }).unwrap()
          dispatch(setCredentials({ accessToken }))
          setUsername('')
          setPassword('')
          navigate('/dash')
        } catch (err) {
            if(!err.status) {
              setErrMsg('No Server Response')
            } else if (err.status === 400) {
              setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
              setErrMsg('Unauthorized')
            }
            errRef.current.focus()
        }
    }

    if (isLoading) return Loading

    const content = (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(148_163_184_/_0.05)_1px,_transparent_0)] [background-size:24px_24px] pointer-events-none" />

            <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Heart className="w-12 h-12 text-emerald-400/80 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-slate-200">
                                Staff Portal Access
                        </h1>
                    </div>

                    <div className="relative">
                        {/* Glowing background effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl" />
                        
                        <div className="relative bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl shadow-xl">

                            {errMsg && (
                                <div ref={errRef}
                                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg 
                                               flex items-center gap-3 text-red-400"
                                    aria-live="assertive">
                                    <AlertCircle className="w-5 h-5" />
                                    <p>{errMsg}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="username" 
                                            className="block text-sm font-medium text-slate-300 mb-2">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        ref={userRef}
                                        value={username}
                                        onChange={handleUserInput}
                                        type="text"
                                        autoComplete="off"
                                        required
                                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 
                                                   rounded-lg text-slate-200 placeholder-slate-400
                                                   focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent
                                                   transition-all duration-300"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" 
                                            className="block text-sm font-medium text-slate-300 mb-2">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={handlePwdInput}
                                        required
                                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 
                                                   rounded-lg text-slate-200 placeholder-slate-400
                                                   focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent
                                                   transition-all duration-300"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <Toggle 
                                        label="Trust This Device" 
                                        checked={persist} 
                                        onChange={handleToggle} 
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-emerald-500/80 hover:bg-emerald-500/70
                                               text-white font-medium rounded-lg
                                               transition-all duration-300
                                               hover:shadow-lg hover:shadow-emerald-500/20"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>

                    <Link 
                        to="/"
                        className="mt-8 flex items-center justify-center gap-2 text-slate-400 
                                   hover:text-emerald-400/80 transition-colors duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return to Home
                    </Link>
                </div>
            </div>
    </div>
    )

    return content
}

export default Login