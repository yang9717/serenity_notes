const Toggle = ({ label, checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-700 rounded-full
                        peer-focus:ring-2 peer-focus:ring-emerald-500/50
                        peer peer-checked:after:translate-x-full 
                        peer-checked:after:border-white after:content-['']
                        after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:rounded-full after:h-5
                        after:w-5 after:transition-all
                        peer-checked:bg-emerald-500/80">
        </div>
        <span className="ml-3 text-sm font-medium text-slate-300">
            {label}
        </span>
    </label>
)

export default Toggle