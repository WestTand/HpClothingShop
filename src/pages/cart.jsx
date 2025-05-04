import CartItem from "../components/cart-item";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";
import { collection, addDoc, Timestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Cart() {
  const { cartItems, setCartItems, getStockQuantity } = useCart();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10000;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.");
      return;
    }

    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }

    try {
      const stockUpdates = {};
      for (const item of cartItems) {
        if (item.selectedSize) {
          const stockQuantity = await getStockQuantity(item.id, item.selectedSize);
          if (stockQuantity < item.quantity) {
            toast.error(`Kích cỡ ${item.selectedSize} của ${item.name} chỉ còn ${stockQuantity} trong kho!`);
            return;
          }
          stockUpdates[item.id] = stockUpdates[item.id] || { stock: null, items: [] };
          stockUpdates[item.id].items.push({ size: item.selectedSize, quantity: item.quantity });
        }
      }

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
        subtotal,
        shipping,
        total,
        status: "pending",
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Order added with ID: ", docRef.id);

      for (const [productId, { items }] of Object.entries(stockUpdates)) {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          const updatedStock = productData.stock.map((stockItem) => {
            const updateItem = items.find((i) => i.size === stockItem.size);
            if (updateItem) {
              const newQuantity = Math.max(0, Number(stockItem.quantity) - updateItem.quantity);
              return { ...stockItem, quantity: newQuantity.toString() };
            }
            return stockItem;
          });
          await updateDoc(productRef, { stock: updatedStock });
        }
      }

      setCartItems([]);
      toast.success("Đơn hàng của bạn đã được ghi nhận!");
      navigate("/thankyou", { state: { orderId: docRef.id } });
    } catch (error) {
      console.error("Error adding order: ", error);
      toast.error("Có lỗi xảy ra khi xử lý đơn hàng!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Giỏ hàng trống 😭</p>
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
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-md font-medium text-white transition-colors ${cartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}