import { categoryStyles, defaultCategoryStyle } from './../utils/categoryStyles';

function ExpensesTable({ filteredExpenses, handleOpenEdit, handleOpenDelete }) {
    return (
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
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((expense) => (
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
                                        <button
                                            onClick={() => handleOpenEdit(expense)}
                                            className="mr-2 cursor-pointer text-green-400/70 hover:text-green-300 border border-green-400/20 hover:border-green-400/40 hover:bg-green-400/5 px-3 py-1 rounded-lg text-xs transition-all">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleOpenDelete(expense)}
                                            className="cursor-pointer text-rose-400/70 hover:text-rose-300 border border-rose-400/20 hover:border-rose-400/40 hover:bg-rose-400/5 px-3 py-1 rounded-lg text-xs transition-all">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="hover:bg-slate-800/30 transition-colors">
                                <td colspan="5" className="px-5 py-3.5 text-slate-400 text-center">
                                    No expenses
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ExpensesTable;
