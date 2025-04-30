export default function OrderStats({ delivered, pending, selectedMonth, selectedYear }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">Đơn hàng đã giao (Tháng {selectedMonth + 1}/{selectedYear})</h3>
                <p className="text-2xl font-bold">{delivered}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-800">Đơn hàng chưa giao (Tháng {selectedMonth + 1}/{selectedYear})</h3>
                <p className="text-2xl font-bold">{pending}</p>
            </div>
        </div>
    );
}