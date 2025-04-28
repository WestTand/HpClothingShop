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
        const { selectedSize } = product;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa, kiểm tra cả theo kích thước
        const existingItem = cartItems.find(
            (item) => item.id === product.id && item.selectedSize === selectedSize
        );

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, kiểm tra stock của sản phẩm
            const updatedCart = cartItems.map((item) => {
                if (item.id === product.id && item.selectedSize === selectedSize) {
                    // Nếu stock còn, tăng số lượng trong giỏ hàng
                    if (item.quantity < item.stock) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        alert("Sản phẩm đã hết hàng!");
                        return item;
                    }
                }
                return item;
            });

            setCartItems(updatedCart);
        } else {
            // Nếu chưa có sản phẩm này trong giỏ hàng, thêm mới
            const sizeInfo = product.stock.find((size) => size.size === selectedSize);
            if (sizeInfo) {
                setCartItems((prevItems) => [
                    ...prevItems,
                    { ...product, selectedSize, quantity: 1, stock: sizeInfo.quantity }, // Thêm sản phẩm mới với số lượng là 1
                ]);
            }
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
