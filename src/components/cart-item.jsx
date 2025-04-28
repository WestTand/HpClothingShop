import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { setCartItems } = useCart();

  // Xử lý tăng số lượng
  const handleIncrease = () => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id && i.selectedSize === item.selectedSize
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  // Xử lý giảm số lượng
  const handleDecrease = () => {
    if (item.quantity === 1) {
      handleRemove();
    } else {
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id && i.selectedSize === item.selectedSize
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    }
  };

  // Xử lý xóa sản phẩm
  const handleRemove = () => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (i) => !(i.id === item.id && i.selectedSize === item.selectedSize)
      )
    );
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      {/* Hình ảnh sản phẩm */}
      <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
        <img
          src={item.imageUrl || "/placeholder.svg?height=80&width=80"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {item.name} {item.selectedSize && <span className="text-gray-500">({item.selectedSize})</span>}
        </h3>
        <p className="text-purple-600 font-medium">{item.price.toLocaleString()} đ</p>
      </div>

      {/* Điều khiển số lượng */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="p-1 border border-gray-300 rounded-md hover:bg-purple-100 hover:border-purple-600 transition-colors duration-200"
        >
          <Minus size={16} className="text-gray-600" />
        </button>
        <span className="w-8 text-center font-medium text-gray-800">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="p-1 border border-gray-300 rounded-md hover:bg-purple-100 hover:border-purple-600 transition-colors duration-200"
        >
          <Plus size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Nút xóa */}
      <button
        onClick={handleRemove}
        className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
      >
        <Trash2 size={18} className="text-gray-500 hover:text-red-600" />
      </button>
    </div>
  );
}