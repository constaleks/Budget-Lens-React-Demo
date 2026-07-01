function Filters({ filters, handleFilterChange, resetFilters }) {
    return (
        <section className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-sky-500 inline-block"></span>
                Filters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                <label className="text-sm">
                    <span className="block mb-1.5 text-slate-400 font-medium">Start date</span>
                    <input
                        type="date"
                        name="start"
                        value={filters.start}
                        onChange={handleFilterChange}
                        className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                    />
                </label>
                <label className="text-sm">
                    <span className="block mb-1.5 text-slate-400 font-medium">End date</span>
                    <input
                        type="date"
                        name="end"
                        value={filters.end}
                        onChange={handleFilterChange}
                        className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                    />
                </label>
                <label className="text-sm md:col-span-2">
                    <span className="block mb-1.5 text-slate-400 font-medium">Category</span>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition">
                        <option value="">All categories</option>
                        <option value="Home">Home</option>
                        <option value="Food">Food</option>
                        <option value="Health">Health</option>
                    </select>
                </label>

                <button
                    onClick={resetFilters}
                    className="cursor-pointer rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700/70 px-4 py-2 text-sm text-slate-300 hover:text-slate-100 transition-colors">
                    Clear
                </button>
            </div>
        </section>
    );
}

export default Filters;
