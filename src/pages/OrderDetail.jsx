import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase_config";
import { doc, getDoc } from "firebase/firestore";

export default function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const docRef = doc(db, "orders", orderId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setOrder(docSnap.data());
                } else {
                    console.error("Đơn hàng không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <div className="text-center py-10">Đang tải dữ liệu đơn hàng...</div>;
    if (!order) return <div className="text-center py-10">Không tìm thấy đơn hàng.</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Chi tiết đơn hàng</h1>

                <div className="mb-6 space-y-2">
                    <div><strong>Mã đơn hàng:</strong> {orderId}</div>
                    <div><strong>Trạng thái:</strong> {order.status || "Không rõ"}</div>
                    <div><strong>Ngày đặt:</strong> {order.createdAt?.toDate().toLocaleString() || "Không rõ"}</div>
                </div>

                <h2 className="text-xl font-semibold mb-2">Sản phẩm</h2>
                <div className="space-y-3 mb-6">
                    {order.items?.length > 0 ? (
                        order.items.map((item, index) => (
                            <div key={index} className="border p-4 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{item.name} (Size: {item.selectedSize})</p>
                                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p>{(item.price || 0).toLocaleString()} đ</p>
                                    <p className="text-sm text-gray-500">Tạm tính: {(item.total || 0).toLocaleString()} đ</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có sản phẩm trong đơn hàng.</p>
                    )}
                </div>

                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                        <span>Tạm tính:</span>
                        <span>{(order.subtotal || 0).toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí vận chuyển:</span>
                        <span>{(order.shipping || 0).toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Tổng cộng:</span>
                        <span>{(order.total || 0).toLocaleString()} đ</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
