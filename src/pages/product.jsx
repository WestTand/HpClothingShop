import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config"; // Import Firestore
import { doc, getDoc } from "firebase/firestore"; // Các hàm Firestore cần thiết
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(""); // Lưu kích thước người dùng chọn
    const { addToCart } = useCart(); // Lấy hàm addToCart từ context
    const navigate = useNavigate(); // Dùng để chuyển hướng đến các trang khác

    useEffect(() => {
        // Lấy dữ liệu sản phẩm từ Firestore theo ID
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", id); // Tham chiếu đến sản phẩm theo ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct(docSnap.data()); // Set dữ liệu sản phẩm vào state
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
            } finally {
                setLoading(false); // Đặt trạng thái loading = false khi hoàn thành fetch
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Hiển thị loading nếu chưa lấy được sản phẩm
    }

    if (!product) {
        return <div>Product not found!</div>; // Nếu không tìm thấy sản phẩm
    }

    // Kiểm tra xem product.stock có phải là một object không, nếu có thì chuyển nó thành mảng
    const sizes = product.stock ? Object.entries(product.stock).map(([size, stock]) => ({ size, stock })) : [];

    const handleAddToCart = () => {
        // Kiểm tra xem kích thước đã được chọn hay chưa
        if (!selectedSize) {
            alert("Vui lòng chọn kích thước!");
            return;
        }

        // Tìm sản phẩm có kích thước đã chọn
        const selectedProduct = { ...product, selectedSize };
        addToCart(selectedProduct); // Thêm sản phẩm vào giỏ hàng
    };

    // Tính tổng tồn kho nếu product.stock là object
    const totalStock = sizes.reduce((acc, size) => acc + size.stock, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Hình ảnh sản phẩm */}
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <img
                        src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h2>
                    <p className="text-lg text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xl font-semibold text-purple-600">{product.price.toLocaleString()} đ</span>
                        <span className="text-sm text-gray-500">Tồn kho: {totalStock} sản phẩm</span>
                    </div>

                    {/* Chọn kích thước */}
                    <div className="mb-4">
                        <label htmlFor="size" className="block text-gray-700">Chọn kích thước</label>
                        <select
                            id="size"
                            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)} // Cập nhật khi chọn kích thước
                        >
                            <option value="">Chọn kích thước</option>
                            {sizes.map((size) => (
                                <option key={size.size} value={size.size}>
                                    {size.size} (Tồn kho: {size.stock})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nút Thêm vào giỏ hàng */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-purple-600 text-white py-3 rounded-md font-medium"
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            onClick={() => navigate(-1)}  // Quay lại trang trước
                            className="w-full bg-gray-300 text-gray-700 py-3 rounded-md font-medium"
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
