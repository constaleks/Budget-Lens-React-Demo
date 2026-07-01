import { useState, useEffect } from 'react';

import Header from './components/Header';
import Filters from './components/Filters';
import ExpenseForm from './components/ExpenseForm';
import ExpensesTable from './components/ExpensesTable';
import Charts from './components/Charts';

function App() {
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return JSON.parse(savedExpenses) || [];
    });

    const [editingExpense, setEditingExpense] = useState(null);

    const [deletingExpense, setDeletingExpense] = useState(null);

    const [notification, setNotification] = useState('');

    const [filters, setFilters] = useState({
        category: '',
        start: '',
        end: '',
    });

    const [form, setForm] = useState({
        description: '',
        amount: '',
        date: '',
        category: 'Home',
    });

    const [editForm, setEditForm] = useState({
        description: '',
        amount: '',
        date: '',
        category: 'Home',
    });

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleOpenEdit = (expense) => {
        setEditingExpense(expense);
        setEditForm({
            description: expense.description,
            amount: String(expense.amount),
            date: expense.date,
            category: expense.category,
        });
    };

    const handleCloseEdit = () => {
        setEditingExpense(null);
        setEditForm({
            description: '',
            amount: '',
            date: '',
            category: 'Home',
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.description || !form.amount || !form.date) {
            return;
        }

        const newExpense = {
            id: expenses.length > 0 ? Math.max(...expenses.map((exp) => exp.id)) + 1 : 1,
            description: form.description,
            amount: parseFloat(form.amount),
            date: form.date,
            category: form.category,
        };

        setExpenses((prev) => [newExpense, ...prev]);

        showNotification('✅ Expense added');

        setForm({
            description: '',
            amount: '',
            date: '',
            category: 'Home',
        });
    };

    const handleUpdateExpense = () => {
        showNotification('✏️ Expense updated');

        setExpenses((prev) =>
            prev.map((expense) => {
                if (expense.id === editingExpense.id) {
                    return {
                        ...expense,
                        description: editForm.description,
                        amount: parseFloat(editForm.amount),
                        date: editForm.date,
                        category: editForm.category,
                    };
                }

                return expense;
            }),
        );

        setEditingExpense(null);
    };

    const handleRemove = (id) => {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        showNotification('🗑️ Expense removed');
    };

    const handleOpenDelete = (expense) => {
        setDeletingExpense(expense);
    };

    const handleCloseDelete = () => {
        setDeletingExpense(null);
    };

    const handleConfirmDelete = () => {
        handleRemove(deletingExpense.id);
        setDeletingExpense(null);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredExpenses = expenses.filter((expense) => {
        if (filters.category && expense.category !== filters.category) {
            return false;
        }

        if (filters.start && expense.date < filters.start) {
            return false;
        }

        if (filters.end && expense.date > filters.end) {
            return false;
        }

        return true;
    });

    const resetFilters = () => {
        setFilters({
            category: '',
            start: '',
            end: '',
        });
    };

    const total = filteredExpenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;

        return acc;
    }, {});

    const categoryChartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: ['#fbbf24', '#34d399', '#a78bfa'],
                borderColor: '#0f172a',
                borderWidth: 2,
            },
        ],
    };

    const dateTotals = filteredExpenses.reduce((acc, expense) => {
        acc[expense.date] = (acc[expense.date] || 0) + expense.amount;

        return acc;
    }, {});

    const dateChartData = {
        labels: Object.keys(dateTotals),
        datasets: [
            {
                label: 'Expenses',
                data: Object.values(dateTotals),
                backgroundColor: 'oklch(60.6% 0.25 292.717)',
            },
        ],
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            {notification && (
                <div className="fixed top-20 right-5 z-100 rounded border border-slate-600 bg-slate-800 py-2 px-4">
                    <h3>{notification}</h3>
                </div>
            )}

            <Header />

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                    <p className="text-slate-400">Your financial overview, all in one place.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    <Filters filters={filters} handleFilterChange={handleFilterChange} resetFilters={resetFilters} />
                    <ExpenseForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
                </div>

                <div className="mb-4 flex items-center gap-3">
                    <span className="text-sm text-slate-400">Total spending</span>
                    <span className="rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-300 px-4 py-1 font-bold text-base">
                        {total.toFixed(2)}€
                    </span>
                </div>

                <ExpensesTable filteredExpenses={filteredExpenses} handleOpenEdit={handleOpenEdit} handleOpenDelete={handleOpenDelete} />
                <Charts categoryChartData={categoryChartData} dateChartData={dateChartData} />
            </main>

            {editingExpense && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
                    <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5">
                        <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>

                        <div className="space-y-3">
                            <label className="block text-sm">
                                <span className="block mb-1 text-slate-300">Description</span>
                                <input
                                    type="text"
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditChange}
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                                />
                            </label>

                            <div className="grid grid-cols-2 gap-3">
                                <label className="block text-sm">
                                    <span className="block mb-1 text-slate-300">Amount</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={editForm.amount}
                                        onChange={handleEditChange}
                                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                                    />
                                </label>

                                <label className="block text-sm">
                                    <span className="block mb-1 text-slate-300">Date</span>
                                    <input
                                        type="date"
                                        name="date"
                                        value={editForm.date}
                                        onChange={handleEditChange}
                                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                                    />
                                </label>
                            </div>

                            <label className="block text-sm">
                                <span className="block mb-1 text-slate-300">Category</span>
                                <select
                                    name="category"
                                    value={editForm.category}
                                    onChange={handleEditChange}
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2">
                                    <option>Home</option>
                                    <option>Food</option>
                                    <option>Health</option>
                                </select>
                            </label>
                        </div>

                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={handleUpdateExpense}
                                className="cursor-pointer text-green-400/70 hover:text-green-300 border border-green-400/20 hover:border-green-400/40 hover:bg-green-400/5 px-5 py-2 rounded-lg text-xs transition-all">
                                Save
                            </button>
                            <button
                                onClick={handleCloseEdit}
                                className="cursor-pointer text-slate-400/70 hover:text-slate-300 border border-slate-400/20 hover:border-slate-400/40 hover:bg-slate-400/5 px-5 py-2 rounded-lg text-xs transition-all">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deletingExpense && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
                    <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5">
                        <h2 className="text-xl font-semibold mb-2">Remove Expense</h2>
                        <p className="text-sm text-slate-400">
                            Are you sure you want to remove &quot;{deletingExpense.description}&quot;? This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={handleConfirmDelete}
                                className="cursor-pointer text-rose-400/70 hover:text-rose-300 border border-rose-400/20 hover:border-rose-400/40 hover:bg-rose-400/5 px-5 py-2 rounded-lg text-xs transition-all">
                                Remove
                            </button>
                            <button
                                onClick={handleCloseDelete}
                                className="cursor-pointer text-slate-400/70 hover:text-slate-300 border border-slate-400/20 hover:border-slate-400/40 hover:bg-slate-400/5 px-5 py-2 rounded-lg text-xs transition-all">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="max-w-6xl mx-auto px-6 py-5 mt-4 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-600">
                <span>Budget Lens</span>
                <span>Built with React &amp; Tailwind CSS</span>
            </footer>
        </div>
    );
}

export default App;
