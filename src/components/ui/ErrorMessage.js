import { AlertCircle } from 'lucide-react'

const ErrorMessage = ({ errmsg, append='' }) => {
    return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div className="flex gap-1">
                <span>{errmsg}</span>
                {append}
            </div>
        </div>
    )
}

export default ErrorMessage