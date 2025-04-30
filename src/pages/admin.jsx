import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";
import { collection, getDocs } from "firebase/firestore";
import AdminSidebar from "../components/AdminSidebar";
import DashboardOverview from "../components/DashboardOverview";
import OrdersManagement from "../components/OrdersManagement";
import AddProduct from "../components/addProducts";

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

                // Lấy customers để map userId sang firstName + lastName
                const customersSnapshot = await getDocs(collection(db, "users"));
                const customersMap = {};
                customersSnapshot.forEach((doc) => {
                    const data = doc.data();
                    customersMap[doc.id] = `${data.lastName || ""} ${data.firstName || ""}`.trim() || "Unknown";
                });

                // Lấy orders
                const ordersSnapshot = await getDocs(collection(db, "orders"));
                const ordersData = ordersSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        customerName: customersMap[data.userId] || data.userId || "Unknown", // Ghép firstName + lastName
                        date: data.createdAt?.toDate().toISOString().split("T")[0] || "N/A",
                        total: Number(data.total) || 0,
                        status: data.status || "pending",
                        items: data.items || [],
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
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex-1 bg-white p-6 rounded-lg shadow">
                    {activeTab === "dashboard" && <DashboardOverview products={products} orders={orders} />}
                    {activeTab === "products" && <AddProduct />}
                    {activeTab === "orders" && <OrdersManagement orders={orders} setOrders={setOrders} />}
                    {activeTab === "users" && <div>Users Management (To be implemented)</div>}
                </div>
            </div>
        </div>
    );
}