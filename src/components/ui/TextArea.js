const TextArea = ({ id, label, value, onChange, placeholder, rows = 6, valid = true }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                className={`w-full px-4 py-2 bg-slate-900/50 border rounded-lg 
                            text-slate-200 placeholder-slate-400
                            focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent
                            transition-all duration-300`}
            />
        </div>
    )
}

export default TextArea
