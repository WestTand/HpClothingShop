import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    // Kiểm tra localStorage khi ứng dụng khởi động
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, []);

    // Lưu giỏ hàng vào localStorage mỗi khi cartItems thay đổi
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cartItems");
        }
    }, [cartItems]);

    const addToCart = (product) => {
        const { id, selectedSize } = product;
        // Tìm item với cùng id và selectedSize
        const existingItem = cartItems.find(
            (item) => item.id === id && item.selectedSize === selectedSize
        );

        if (existingItem) {
            // Nếu đã có item với cùng id và size, tăng quantity
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            // Nếu chưa có, thêm mới với quantity: 1
            setCartItems((prevItems) => [
                ...prevItems,
                { ...product, quantity: 1 }
            ]);
        }

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 500);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, isAdded }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}