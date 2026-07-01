function Header() {
    return (
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
    );
}

export default Header;
