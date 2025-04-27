import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isAdded, setIsAdded] = useState(false); // 👈 thêm cái này

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
        }

        // Khi thêm hàng => bật hiệu ứng
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 500); // 👈 tự tắt sau 0.5s
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, isAdded }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
