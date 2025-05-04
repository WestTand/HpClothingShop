import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";

export default function ThankYou() {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Lấy orderId từ state và lấy chi tiết đơn hàng từ Firestore
    useEffect(() => {
        const fetchOrder = async () => {
            const orderId = location.state?.orderId;
            if (!orderId) {
                toast.error("Không tìm thấy đơn hàng!");
                navigate("/");
                return;
            }

            try {
                const orderRef = doc(db, "orders", orderId);
                const orderSnap = await getDoc(orderRef);
                if (orderSnap.exists()) {
                    setOrder({ id: orderSnap.id, ...orderSnap.data() });
                    toast.success("Đơn hàng của bạn đã được đặt thành công!");
                } else {
                    toast.error("Đơn hàng không tồn tại!");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching order:", error);
                toast.error("Lỗi khi tải thông tin đơn hàng!");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [location, navigate]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center animate-fade-in">
                <CheckCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Cảm ơn bạn đã mua sắm!</h1>
                <p className="text-gray-600 mb-6">
                    Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ xử lý và giao hàng sớm nhất có thể.
                </p>

                {order && (
                    <div className="bg-gray-100 p-4 rounded-md mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Tóm tắt đơn hàng</h2>
                        <p className="text-gray-600">
                            <span className="font-medium">Mã đơn hàng:</span> {order.id}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Tổng tiền:</span>{" "}
                            {order.total.toLocaleString()} đ
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Trạng thái:</span>{" "}
                            {order.status === "pending" ? "Đang xử lý" : order.status}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-700 transition-colors"
                    >
                        <Home size={20} />
                        Quay lại trang chủ
                    </button>
                    <button
                        onClick={() => navigate("/all-products")}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-md font-medium hover:bg-gray-300 transition-colors"
                    >
                        <ShoppingBag size={20} />
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>

            <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}