import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase_config"; // Import Firestore
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext"; // Import CartContext

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(""); // State để lưu kích cỡ chọn
    const { addToCart } = useCart(); // Lấy addToCart từ CartContext

    // Lấy dữ liệu sản phẩm từ Firestore
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", productId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("Sản phẩm không tồn tại!");
                }
            } catch (err) {
                setError("Lỗi khi tải sản phẩm: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // Xử lý khi chọn kích cỡ
    const handleSizeChange = (size) => {
        const stockItem = product.stock.find((item) => item.size === size);
        if (stockItem.quantity === "0") {
            alert("Kích cỡ này đã hết hàng!");
            return;
        }
        setSelectedSize(size);
    };

    // Xử lý thêm vào giỏ hàng
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Vui lòng chọn kích cỡ!");
            return;
        }
        addToCart({ ...product, selectedSize });
        alert(`${product.name} (Kích cỡ: ${selectedSize}) đã được thêm vào giỏ hàng!`);
    };

    if (loading) {
        return <div className="text-center py-10">Đang tải...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hình ảnh sản phẩm */}
                <div className="flex justify-center">
                    <img
                        src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
                        alt={product.name}
                        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-2xl font-semibold text-purple-600">{product.price.toLocaleString()} đ</p>
                    <p className="text-gray-600"><strong>Danh mục:</strong> {product.category}</p>
                    <p className="text-gray-600"><strong>Mô tả:</strong> {product.description}</p>

                    {/* Chọn kích cỡ */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Chọn kích cỡ:</h3>
                        <div className="flex space-x-4 mt-2">
                            {product.stock.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSizeChange(item.size)}
                                    disabled={item.quantity === "0"} // Disable nếu quantity = 0
                                    className={`px-4 py-2 rounded-lg border ${item.quantity === "0"
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : selectedSize === item.size
                                            ? "bg-purple-600 text-white"
                                            : "bg-white text-gray-800 hover:bg-purple-100"
                                        }`}
                                >
                                    {item.size} ({item.quantity} cái)
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tồn kho */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Tồn kho:</h3>
                        <ul className="list-disc pl-5">
                            {product.stock.map((item, index) => (
                                <li key={index} className="text-gray-600">
                                    Kích cỡ {item.size}: {item.quantity} cái
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Nút thêm vào giỏ hàng */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
}