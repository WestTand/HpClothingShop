import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";
import { collection, getDocs } from "firebase/firestore";
import AddProduct from "../components/addProducts";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Admin() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
        if (!isLoggedIn) {
            localStorage.setItem("adminLoggedIn", "true");
        }

        const fetchData = async () => {
            try {
                setLoading(true);

                // Lấy products
                const productsSnapshot = await getDocs(collection(db, "products"));
                const productsData = productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name || "Unknown",
                    price: doc.data().price || 0,
                    stock: doc.data().stock || 0,
                }));
                setProducts(productsData);

                // Lấy orders
                const ordersSnapshot = await getDocs(collection(db, "orders"));
                const ordersData = ordersSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        customer: data.customer || "Unknown",
                        date: data.createdAt?.toDate().toISOString().split("T")[0] || "N/A",
                        total: Number(data.total) || 0,
                        status: data.status || "Pending",
                    };
                });
                setOrders(ordersData);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Tính toán dữ liệu cho biểu đồ số lượng đơn hàng theo tháng
    const getOrderChartData = () => {
        const currentYear = 2025; // Dựa trên ngày hiện tại
        const months = Array(12).fill(0); // Mảng lưu số đơn hàng theo tháng (1-12)

        orders.forEach((order) => {
            const orderDate = new Date(order.date);
            if (orderDate.getFullYear() === currentYear) {
                const month = orderDate.getMonth(); // 0-11
                months[month] += 1;
            }
        });

        return {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            datasets: [
                {
                    label: "Số lượng đơn hàng",
                    data: months,
                    backgroundColor: "rgba(135, 85, 242, 0.6)", // Màu tím giống theme
                    borderColor: "rgba(135, 85, 242, 1)",
                    borderWidth: 1,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Số lượng đơn hàng trong năm 2025",
            },
        },
    };

    const handleLogout = () => {
        localStorage.removeItem("adminLoggedIn");
        navigate("/admin/login");
    };

    if (loading) {
        return <div className="text-center py-10">Đang tải...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

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
                <div className="w-full md:w-64 bg-gray-100 p-4 rounded-lg">
                    <nav>
                        <ul>
                            {["dashboard", "products", "orders", "users"].map((tab) => (
                                <li key={tab} className="mb-2">
                                    <button
                                        className={`w-full text-left px-4 py-2 rounded ${activeTab === tab ? "bg-[#8755f2] text-white" : "hover:bg-gray-200"
                                            }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

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
                            <h3 className="font-semibold mb-2">Order Statistics</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Bar data={getOrderChartData()} options={chartOptions} />
                            </div>
                        </div>
                    )}
                    {activeTab === "products" && <AddProduct />}
                    {activeTab === "orders" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
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
                                        {orders.map((order) => (
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
                    {activeTab === "users" && <div>Users Management (To be implemented)</div>}
                </div>
            </div>
        </div>
    );
}