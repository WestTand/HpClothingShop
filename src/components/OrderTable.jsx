import { db } from "../config/firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
export default function OrderTable({ orders, setOrders, filterStatus }) {
    const [updating, setUpdating] = useState(null);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdating(orderId);
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: newStatus });

            if (typeof setOrders === "function") {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                console.warn("setOrders is not a function, skipping state update");
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            alert("Lỗi khi cập nhật trạng thái đơn hàng!");
        } finally {
            setUpdating(null);
        }
    };

    const filteredOrders = filterStatus === "all"
        ? orders
        : orders.filter((order) => order.status === filterStatus);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Order ID</th>
                        <th className="py-2 px-4 border-b text-left">Customer</th>
                        <th className="py-2 px-4 border-b text-left">Date</th>
                        <th className="py-2 px-4 border-b text-left">Total</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                        <th className="py-2 px-4 border-b text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4 border-b">#{order.id}</td>
                            <td className="py-2 px-4 border-b">{order.customerName}</td>
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
                            <td className="py-2 px-4 border-b">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    disabled={updating === order.id}
                                    className="border rounded px-2 py-1 focus:outline-none focus:border-[#8755f2]"
                                >
                                    <option value="pending">pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}