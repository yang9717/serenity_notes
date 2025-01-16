import { Search, Loader2 } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, isDebouncing = false }) => {
    return (
        <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isDebouncing 
                ? (
                    <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />)
                : (
                    <Search className="h-5 w-5 text-slate-400" />
            )}
            </div>
            <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg 
                    bg-slate-700/50 text-slate-200 placeholder-slate-400
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                    focus:border-emerald-500/50"
            placeholder="Search notes by Ticket Number"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
  }
  
  export default SearchBar