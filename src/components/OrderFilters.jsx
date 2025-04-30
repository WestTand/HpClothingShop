export default function OrderFilters({
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    filterStatus,
    setFilterStatus,
    exportType,
    setExportType,
    exportToExcel,
}) {
    const years = [2023, 2024, 2025];
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return (
        <div className="flex justify-end mb-4 gap-2 flex-wrap">
            <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border rounded px-2 py-1 focus:outline-none focus:border-[#8755f2]"
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border rounded px-2 py-1 focus:outline-none focus:border-[#8755f2]"
            >
                {months.map((month, index) => (
                    <option key={index} value={index}>
                        {month}
                    </option>
                ))}
            </select>
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded px-2 py-1 focus:outline-none focus:border-[#8755f2]"
            >
                <option value="all">Tất cả</option>
                <option value="pending">pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
            </select>
            <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="border rounded px-2 py-1 focus:outline-none focus:border-[#8755f2]"
            >
                <option value="only_pending">Chỉ pending</option>
                <option value="pending">Chưa được giao (pending/Processing)</option>
                <option value="delivered">Đã giao (Shipped/Completed)</option>
            </select>
            <button
                onClick={exportToExcel}
                className="bg-[#8755f2] text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
                Export to Excel
            </button>
        </div>
    );
}