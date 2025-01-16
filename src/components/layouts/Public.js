import { Link } from "react-router-dom"
import { Phone, MapPin, LogIn, Heart } from 'lucide-react'

const Public = () => {
  const content = (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(148_163_184_/_0.05)_1px,_transparent_0)] [background-size:24px_24px] pointer-events-none" />
            
            <div className="relative isolate overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <header className="text-center">
                        <div className="flex justify-center mb-6">
                            <Heart className="w-12 h-12 text-emerald-400/80" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-6xl mb-4">
                            Welcome to{' '}
                            <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                Serenity Mental Health Services
                            </span>
                        </h1>
                    </header>

                    <main className="mt-12">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-lg leading-8 text-slate-300">
                                Begin your journey to emotional well-being in a space of understanding 
                                and support. <br />
                                Our compassionate team of licensed therapists is here to 
                                walk alongside you, creating a safe haven where healing and growth can flourish. <br />
                                Together, we'll explore paths to inner peace and emotional resilience.
                            </p>
                        </div>

                        <div className="mt-16 max-w-2xl mx-auto">
                            <div className="relative">
                                {/* Glowing background effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl" />
                                
                                <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-6 h-6 text-emerald-400/80 mt-1" />
                                            <address className="not-italic text-slate-300 space-y-1">
                                                <div className="font-semibold text-slate-200">
                                                    Serenity Mental Health Services
                                                </div>
                                                1234 Tranquility Lane<br />
                                                Suite 300 Courage, MY
                                            </address>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <Phone className="w-6 h-6 text-emerald-400/80" />
                                            <a 
                                                href="tel:+1234567" 
                                                className="text-slate-300 hover:text-emerald-400/80 transition-all duration-300"
                                            >
                                                987-654321
                                            </a>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-700/50">
                                            <p className="text-slate-400">
                                                Director of Care: 
                                                <span className="ml-2 text-slate-200">V</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Supportive Message */}
                        <div className="mt-12 text-center text-slate-400 max-w-2xl mx-auto">
                            <p className="italic">
                                "Every step towards seeking support is an act of courage. 
                                We're here to help you on your healing journey."
                            </p>
                        </div>
                    </main>

                    {/* Login Link */}
                    <footer className="mt-16 text-center">
                        <Link 
                            to="/login"
                            className="inline-flex items-center gap-2 px-6 py-3 
                                    bg-emerald-500/10 hover:bg-emerald-500/20 
                                    text-emerald-400/80 rounded-lg transition-all duration-300
                                    hover:shadow-lg hover:shadow-emerald-500/10"
                        >
                            <LogIn className="w-5 h-5" />
                            Employee Portal
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    )

  return content
}

export default Public