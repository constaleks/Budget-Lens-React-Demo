import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Charts({ categoryChartData, dateChartData }) {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-sky-500 inline-block"></span>
                    Spending by Category
                </h3>
                <div className="h-64 rounded-xl bg-slate-800/50 border border-dashed border-slate-700/40 flex flex-col items-center justify-center gap-2 text-slate-600">
                    <Pie
                        data={categoryChartData}
                        options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#94a3b8',
                                        boxWidth: 12,
                                        padding: 16,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-sky-500 inline-block"></span>
                    Spending Over Time
                </h3>
                <div className="h-64 rounded-xl bg-slate-800/50 border border-dashed border-slate-700/40 flex flex-col items-center justify-center gap-2 text-slate-600">
                    <Bar data={dateChartData} />
                </div>
            </div>
        </section>
    );
}

export default Charts;
