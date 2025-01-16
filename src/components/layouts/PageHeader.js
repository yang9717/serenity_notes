const PageHeader = ({ icon: Icon, title, subtitle, iconClass = '', titleClass = '', subtitleClass = '' }) => (
    <div className="mb-8 text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4 ${iconClass}`}>
            <Icon className={`w-8 h-8 text-emerald-400`} />
        </div>
        <h1 className={`text-2xl font-bold text-slate-200 ${titleClass}`}>{title}</h1>
        {subtitle && <p className={`text-slate-400 mt-2 ${subtitleClass}`}>{subtitle}</p>}
    </div>
)

export default PageHeader