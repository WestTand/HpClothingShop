import CartItem from "../components/cart-item";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { db } from "../config/firebase_config"; // Import Firestore
import { collection, addDoc, Timestamp, doc, updateDoc } from "firebase/firestore"; // Import các hàm cần thiết từ Firestore

export default function Cart() {
  const { cartItems } = useCart();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();  // Khởi tạo useNavigate

  // Nếu đang tải thông tin người dùng, hiển thị loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Tính tiền
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10000; // Tùy chọn phí vận chuyển
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập để thanh toán!");
      navigate("/login");  // Chuyển hướng đến trang đăng nhập
      return;
    }

    // Tạo order object
    const order = {
      userId: currentUser.uid,  // ID của người dùng
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      status: "pending",  // Trạng thái đơn hàng
      createdAt: Timestamp.fromDate(new Date()), // Thời gian tạo đơn hàng
      updatedAt: Timestamp.fromDate(new Date())
    };

    try {
      // Thêm đơn hàng vào Firestore
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Order added with ID: ", docRef.id);

      // Cập nhật stock cho từng sản phẩm trong giỏ hàng
      for (const item of cartItems) {
        const productRef = doc(db, "products", item.id); // Tham chiếu đến sản phẩm
        await updateDoc(productRef, {
          stock: item.stock - item.quantity  // Giảm số lượng tồn kho
        });
      }

      // Sau khi tạo đơn hàng và cập nhật stock, chuyển hướng tới trang "Thank You" hoặc trang thanh toán
      alert("Đơn hàng của bạn đã được ghi nhận!");
      navigate("/thank-you");  // Chuyển hướng đến trang cảm ơn (hoặc trang thanh toán)
    } catch (error) {
      console.error("Error adding order: ", error);
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
              <CartItem key={item.id} item={item} />
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
            onClick={handleCheckout}  // Thêm hàm kiểm tra đăng nhập và lưu đơn hàng
            className="w-full bg-purple-600 text-white py-3 rounded-md font-medium"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
