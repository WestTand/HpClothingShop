import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [stockCache, setStockCache] = useState({});

    // Kiểm tra localStorage khi khởi động
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, []);

    // Lưu giỏ hàng vào localStorage
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cartItems");
        }
    }, [cartItems]);

    // Lấy stock quantity từ Firestore hoặc cache
    const getStockQuantity = async (productId, selectedSize) => {
        try {
            // Kiểm tra cache
            if (stockCache[productId]) {
                const stockItem = stockCache[productId].find((s) => s.size === selectedSize);
                return stockItem ? Number(stockItem.quantity) : 0;
            }

            // Truy vấn Firestore
            const productRef = doc(db, "products", productId);
            const productSnap = await getDoc(productRef);
            if (!productSnap.exists()) {
                toast.error("Sản phẩm không tồn tại!");
                return 0;
            }

            const stock = productSnap.data().stock || [];
            setStockCache((prev) => ({ ...prev, [productId]: stock }));
            const stockItem = stock.find((s) => s.size === selectedSize);
            return stockItem ? Number(stockItem.quantity) : 0;
        } catch (err) {
            console.error("Lỗi khi kiểm tra stock:", err);
            toast.error("Lỗi khi kiểm tra tồn kho!");
            return 0;
        }
    };

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (product) => {
        const { id, selectedSize } = product;

        // Kiểm tra stock
        const stockQuantity = await getStockQuantity(id, selectedSize);
        if (stockQuantity === 0) {
            toast.error(`Size ${selectedSize} đã hết hàng!`);
            return;
        }

        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === id && item.selectedSize === selectedSize
            );
            const currentQuantity = existingItem ? existingItem.quantity : 0;

            if (currentQuantity >= stockQuantity) {
                toast.error(`Chỉ còn ${stockQuantity} sản phẩm size ${selectedSize} trong kho!`);
                return prevItems;
            }

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            toast.success("Đã thêm vào giỏ hàng!");
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 500);
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, isAdded, getStockQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}