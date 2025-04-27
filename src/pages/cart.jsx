import CartItem from "../components/cart-item";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems } = useCart();

  // Tính tiền
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10000; // tùy bạn
  const total = subtotal + shipping;

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

          <button className="w-full bg-purple-600 text-white py-3 rounded-md font-medium">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}
