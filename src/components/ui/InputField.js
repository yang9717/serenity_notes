const InputField = ({
    id,
    label,
    helperText,
    type = 'text', // default type
    value,
    onChange,
    valid,
    placeholder = '',
    className = '',
}) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
            {label}
            {helperText && (
                <span className="ml-2 text-sm text-slate-400">{helperText}</span>
            )}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            autoComplete="off"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2 bg-slate-900/50 border rounded-lg 
                        text-slate-200 placeholder-slate-400
                        focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent
                        transition-all duration-300`}
        />
    </div>
)

export default InputField