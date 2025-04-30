import PropTypes from "prop-types";

export default function RecentOrdersTable({ orders }) {
    return (
        <div>
            <h3 className="font-semibold mb-2">Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Order ID</th>
                            <th className="py-2 px-4 border-b text-left">Customer</th>
                            <th className="py-2 px-4 border-b text-left">Date</th>
                            <th className="py-2 px-4 border-b text-left">Total</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(0, 3).map((order) => (
                            <tr key={order.id}>
                                <td className="py-2 px-4 border-b">#{order.id}</td>
                                <td className="py-2 px-4 border-b">{order.customer}</td>
                                <td className="py-2 px-4 border-b">{order.date}</td>
                                <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                                <td className="py-2 px-4 border-b">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${order.status === "Completed"
                                            ? "bg-green-100 text-green-800"
                                            : order.status === "Processing"
                                                ? "bg-blue-100 text-blue-800"
                                                : order.status === "Shipped"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

RecentOrdersTable.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            customer: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};