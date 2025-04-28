import CartItem from "../components/cart-item";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";
import { collection, addDoc, Timestamp, doc, updateDoc, getDoc } from "firebase/firestore";

export default function Cart() {
  const { cartItems, setCartItems } = useCart();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10000;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }

    // Validate stock trước khi tạo đơn hàng
    for (const item of cartItems) {
      if (item.selectedSize) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          if (!Array.isArray(productData.stock)) {
            alert(`Sản phẩm ${item.name} có dữ liệu tồn kho không hợp lệ!`);
            return;
          }
          const stockItem = productData.stock.find((s) => s.size === item.selectedSize);
          if (!stockItem || parseInt(stockItem.quantity) < item.quantity) {
            alert(`Kích cỡ ${item.selectedSize} của ${item.name} không đủ tồn kho!`);
            return;
          }
        } else {
          alert(`Sản phẩm ${item.name} không tồn tại!`);
          return;
        }
      }
    }

    // Tạo order object
    const order = {
      userId: currentUser.uid,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize || "N/A",
        total: item.price * item.quantity,
      })),
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      status: "pending",
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    };

    try {
      // Thêm đơn hàng vào Firestore
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Order added with ID: ", docRef.id);

      // Cập nhật stock
      for (const item of cartItems) {
        if (item.selectedSize) {
          const productRef = doc(db, "products", item.id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const productData = productSnap.data();
            const updatedStock = productData.stock.map((stockItem) =>
              stockItem.size === item.selectedSize
                ? {
                  ...stockItem,
                  quantity: Math.max(0, parseInt(stockItem.quantity) - item.quantity).toString(),
                }
                : stockItem
            );
            await updateDoc(productRef, { stock: updatedStock });
          }
        }
      }

      // Xóa giỏ hàng
      setCartItems([]);
      alert("Đơn hàng của bạn đã được ghi nhận!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error adding order: ", error);
      alert("Có lỗi xảy ra khi xử lý đơn hàng!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartItems.length === 0 ? (
            <p>Giỏ hàng trống 😭</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedSize || "no-size"}`}
                item={item}
              />
            ))
          )}
        </div>

        <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{total.toLocaleString()} đ</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-purple-600 text-white py-3 rounded-md font-medium"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}