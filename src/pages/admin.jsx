import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/addProducts"; // Import component AddProduct
export default function Admin() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // Mock data
    const mockProducts = [
        { id: 1, name: "Product 1", price: 29.99, stock: 15 },
        { id: 2, name: "Product 2", price: 59.99, stock: 8 },
        { id: 3, name: "Product 3", price: 89.99, stock: 12 },
        { id: 4, name: "Product 4", price: 69.99, stock: 20 },
    ];

    const mockOrders = [
        { id: 1001, customer: "John Doe", date: "2023-04-15", total: 89.98, status: "Completed" },
        { id: 1002, customer: "Jane Smith", date: "2023-04-16", total: 159.97, status: "Processing" },
        { id: 1003, customer: "Bob Johnson", date: "2023-04-17", total: 29.99, status: "Shipped" },
        { id: 1004, customer: "Alice Brown", date: "2023-04-18", total: 119.98, status: "Pending" },
    ];

    useEffect(() => {
        // Kiểm tra xem admin đã đăng nhập chưa
        const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
        if (!isLoggedIn) {
            // Tạo tài khoản admin tạm thời
            localStorage.setItem("adminLoggedIn", "true");
        }

        // Load mock data
        setProducts(mockProducts);
        setOrders(mockOrders);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminLoggedIn");
        navigate("/admin/login");
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-gray-100 p-4 rounded-lg">
                    <nav>
                        <ul>
                            <li className="mb-2">
                                <button
                                    className={`w-full text-left px-4 py-2 rounded ${activeTab === "dashboard" ? "bg-[#8755f2] text-white" : "hover:bg-gray-200"
                                        }`}
                                    onClick={() => setActiveTab("dashboard")}
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li className="mb-2">
                                <button
                                    className={`w-full text-left px-4 py-2 rounded ${activeTab === "products" ? "bg-[#8755f2] text-white" : "hover:bg-gray-200"
                                        }`}
                                    onClick={() => setActiveTab("products")}
                                >
                                    Products
                                </button>
                            </li>
                            <li className="mb-2">
                                <button
                                    className={`w-full text-left px-4 py-2 rounded ${activeTab === "orders" ? "bg-[#8755f2] text-white" : "hover:bg-gray-200"
                                        }`}
                                    onClick={() => setActiveTab("orders")}
                                >
                                    Orders
                                </button>
                            </li>
                            <li className="mb-2">
                                <button
                                    className={`w-full text-left px-4 py-2 rounded ${activeTab === "users" ? "bg-[#8755f2] text-white" : "hover:bg-gray-200"
                                        }`}
                                    onClick={() => setActiveTab("users")}
                                >
                                    Users
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow">
                    {activeTab === "dashboard" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-100 p-4 rounded-lg">
                                    <h3 className="font-medium text-blue-800">Total Products</h3>
                                    <p className="text-2xl font-bold">{products.length}</p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-lg">
                                    <h3 className="font-medium text-green-800">Total Orders</h3>
                                    <p className="text-2xl font-bold">{orders.length}</p>
                                </div>
                                <div className="bg-purple-100 p-4 rounded-lg">
                                    <h3 className="font-medium text-purple-800">Total Revenue</h3>
                                    <p className="text-2xl font-bold">
                                        ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                                    </p>
                                </div>
                            </div>
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
                    )}
                    {activeTab === "products" && (
                        <AddProduct />
                    )}

                    {/* Các Tab khác như "products", "orders" sẽ giữ nguyên */}
                </div>
            </div>
        </div>
    );
}
