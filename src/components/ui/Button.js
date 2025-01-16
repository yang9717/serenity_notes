import { Save, Trash2 } from 'lucide-react'

const ActionButton = ({ 
    type = "button", 
    onClick, 
    disabled, 
    text, 
    canSave }) => {
        return (<button
                    type={type}
                    onClick={onClick}
                    disabled={!canSave}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium
                                transition-all duration-300 
                                ${canSave 
                                    ? 'bg-emerald-500/80 hover:bg-emerald-500/70 text-white hover:shadow-lg hover:shadow-emerald-500/20' 
                                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                >
                    <Save className="w-4 h-4" />
                    {text}
                </button>
        )
    }

const DeleteButton = ({onClick, text}) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium 
                        bg-red-500/10 text-red-400 hover:bg-red-500/20 
                        transition-all duration-300`}
        >
            <Trash2 className="w-4 h-4" />
            {text}
        </button>
    )
}

export { ActionButton, DeleteButton }