function ExpenseForm({ form, handleChange, handleSubmit }) {
    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-sky-500 inline-block"></span>
                Add Expense
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <label className="block text-sm">
                    <span className="block mb-1.5 text-slate-400 font-medium">Description</span>
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="e.g. Netflix"
                        className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                    />
                </label>

                <div className="grid grid-cols-2 gap-3">
                    <label className="block text-sm">
                        <span className="block mb-1.5 text-slate-400 font-medium">Amount</span>
                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="block mb-1.5 text-slate-400 font-medium">Date</span>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                        />
                    </label>
                </div>

                <label className="block text-sm">
                    <span className="block mb-1.5 text-slate-400 font-medium">Category</span>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition">
                        <option>Home</option>
                        <option>Food</option>
                        <option>Health</option>
                    </select>
                </label>

                <button className="cursor-pointer w-full rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
                    <span className="text-lg leading-none">+</span>
                    Add Expense
                </button>
            </form>
        </section>
    );
}

export default ExpenseForm;
