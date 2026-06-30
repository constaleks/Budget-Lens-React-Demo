import { useState } from 'react';

import { expenses as mockData } from './mocks/mockData';
import { categoryStyles, defaultCategoryStyle } from './utils/categoryStyles';

function App() {
    const [expenses, setExpenses] = useState(mockData);

    const [form, setForm] = useState({
        description: '',
        amount: '',
        date: '',
        category: 'Home',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newExpense = {
            id: expenses.length > 0 ? Math.max(...expenses.map((exp) => exp.id)) + 1 : 1,
            description: form.description,
            amount: parseFloat(form.amount),
            date: form.date,
            category: form.category,
        };

        setExpenses((prev) => [newExpense, ...prev]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            <header className="sticky top-0 z-10 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                            <span className="text-sky-400 text-sm font-bold">B</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">
                            <span className="text-sky-400">Budget</span>
                            <span className="text-slate-200"> Lens</span>
                        </h1>
                    </div>
                    <span className="text-xs text-slate-500 hidden sm:block">Personal Finance Tracker</span>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                    <p className="text-slate-400">Your financial overview, all in one place.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
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
                                    className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                                />
                            </label>
                            <label className="text-sm">
                                <span className="block mb-1.5 text-slate-400 font-medium">End date</span>
                                <input
                                    type="date"
                                    className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                                />
                            </label>
                            <label className="text-sm md:col-span-2">
                                <span className="block mb-1.5 text-slate-400 font-medium">Category</span>
                                <select className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition">
                                    <option>All categories</option>
                                    <option>Home</option>
                                    <option>Food</option>
                                    <option>Health</option>
                                </select>
                            </label>
                            <button className="rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700/70 px-4 py-2 text-sm text-slate-300 hover:text-slate-100 transition-colors">
                                Clear
                            </button>
                        </div>
                    </section>

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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl bg-slate-800/80 border border-slate-700/70 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition">
                                    <option>Home</option>
                                    <option>Food</option>
                                    <option>Health</option>
                                </select>
                            </label>

                            <button className="w-full rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
                                <span className="text-lg leading-none">+</span>
                                Add Expense
                            </button>
                        </form>
                    </section>
                </div>

                <div className="mb-4 flex items-center gap-3">
                    <span className="text-sm text-slate-400">Total spending</span>
                    <span className="rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-300 px-4 py-1 font-bold text-base">
                        1,315.00€
                    </span>
                </div>

                <section className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden mb-6">
                    <div className="px-5 py-4 border-b border-slate-800">
                        <h2 className="text-base font-semibold flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-sky-500 inline-block"></span>
                            Expenses
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                                <tr>
                                    <th className="text-left px-5 py-3 font-medium">Date</th>
                                    <th className="text-left px-5 py-3 font-medium">Description</th>
                                    <th className="text-left px-5 py-3 font-medium">Category</th>
                                    <th className="text-right px-5 py-3 font-medium">Amount</th>
                                    <th className="px-5 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-5 py-3.5 text-slate-400">{expense.date}</td>
                                        <td className="px-5 py-3.5 font-medium">{expense.description}</td>
                                        <td className="px-5 py-3.5">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryStyles[expense.category] || defaultCategoryStyle}`}>
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right font-semibold">{expense.amount.toFixed(2)}€</td>
                                        <td className="px-5 py-3.5 text-right">
                                            <button className="text-rose-400/70 hover:text-rose-300 border border-rose-400/20 hover:border-rose-400/40 hover:bg-rose-400/5 px-3 py-1 rounded-lg text-xs transition-all">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-sky-500 inline-block"></span>
                            Spending by Category
                        </h3>
                        <div className="h-56 rounded-xl bg-slate-800/50 border border-dashed border-slate-700/40 flex flex-col items-center justify-center gap-2 text-slate-600">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                                <path d="M22 12A10 10 0 0 0 12 2v10z" />
                            </svg>
                            <span className="text-sm">Pie chart coming soon</span>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-sky-500 inline-block"></span>
                            Spending Over Time
                        </h3>
                        <div className="h-56 rounded-xl bg-slate-800/50 border border-dashed border-slate-700/40 flex flex-col items-center justify-center gap-2 text-slate-600">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="3" width="4" height="18" rx="1" />
                                <rect x="9" y="8" width="4" height="13" rx="1" />
                                <rect x="16" y="5" width="4" height="16" rx="1" />
                            </svg>
                            <span className="text-sm">Bar chart coming soon</span>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="max-w-6xl mx-auto px-6 py-5 mt-4 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-600">
                <span>Budget Lens</span>
                <span>Built with React &amp; Tailwind CSS</span>
            </footer>
        </div>
    );
}

export default App;
