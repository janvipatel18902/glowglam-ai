const filters = ['All', 'Cleanser', 'Serum', 'Moisturizer', 'Sunscreen'];

export function ProductFilter() {
    return (
        <div className="space-y-3 rounded-[1.2rem] bg-[#fcfbfd] p-4">
            {filters.map((filter, index) => {
                const isActive = index === 0;

                return (
                    <button
                        key={filter}
                        className={
                            isActive
                                ? 'w-full rounded-2xl border border-fuchsia-200 bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm'
                                : 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-600 transition hover:border-fuchsia-200 hover:bg-fuchsia-50 hover:text-slate-800'
                        }
                    >
                        {filter}
                    </button>
                );
            })}
        </div>
    );
}