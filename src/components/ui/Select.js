const Select = ({ label, value, onChange, options, multiple = false, size = 3, isInvalid = false }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
            {label}
        </label>
        <select
            id={label.toLowerCase().replace(/\s+/g, '')}
            name={label.toLowerCase().replace(/\s+/g, '')}
            value={value}
            onChange={onChange}
            multiple={multiple}
            size={size}
            className={`w-full px-4 py-2 bg-slate-900/50 border rounded-lg 
                        text-slate-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent
                        transition-all duration-300`}
        >
            {options}
        </select>
    </div>
)

export default Select