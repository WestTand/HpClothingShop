import { useState } from "react";
import { db } from "../config/firebase_config";
import { collection, addDoc } from "firebase/firestore";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState([
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
  ]);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Áo Nam");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "deq1douln");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/deq1douln/image/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.secure_url);
      } else {
        console.error("Cloudinary upload failed:", data.error.message);
      }
    } catch (error) {
      console.error("Lỗi khi upload hình ảnh:", error);
    }
  };

  const handleStockChange = (size, value) => {
    setStock((prev) =>
      prev.map((item) =>
        item.size === size ? { ...item, quantity: Number(value) } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !stock.some((item) => item.quantity > 0) ||
      !imageUrl
    ) {
      alert(
        "Vui lòng điền đầy đủ thông tin và đảm bảo có ít nhất một size có stock"
      );
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        name,
        description,
        price: parseInt(price, 10),
        stock,
        imageUrl,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      alert("Sản phẩm đã được thêm thành công!");
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setStock([
        { size: "S", quantity: 0 },
        { size: "M", quantity: 0 },
        { size: "L", quantity: 0 },
        { size: "XL", quantity: 0 },
      ]);
      setImageUrl("");
      setCategory("");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  // RANDOM DATA (giữ nguyên)
  const handleRandomAdd = async () => {
    // ... như cũ
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit}>
        {/* Tên */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tên Sản Phẩm
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            disabled={loading}
          />
        </div>

        {/* Mô tả */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô Tả
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            disabled={loading}
          />
        </div>

        {/* Giá */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            disabled={loading}
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Số Lượng Theo Kích Thước
          </label>
          {stock.map(({ size, quantity }) => (
            <div key={size} className="flex items-center mb-2">
              <span className="w-16">{size}</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleStockChange(size, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="0"
                required
                disabled={loading}
              />
            </div>
          ))}
        </div>

        {/* Hình ảnh */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Hình Ảnh
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            disabled={loading}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Product"
              className="mt-4 w-32 h-32 object-cover"
            />
          )}
        </div>

        {/* Danh mục */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Danh Mục
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={loading}
          >
            <option value="Áo Nam">Áo Nam</option>
            <option value="Quần Nam">Quần Nam</option>
            <option value="Giày Nam">Giày Nam</option>
            <option value="Áo Nữ">Áo Nữ</option>
            <option value="Quần Nữ">Quần Nữ</option>
            <option value="Giày Nữ">Giày Nữ</option>
            <option value="Áo Nam Nữ">Áo Unisex</option>
            <option value="Quần Nam Nữ">Quần Unisex</option>
            <option value="Giày Nam Nữ">Giày Unisex</option>
          </select>
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Đang thêm..." : "Thêm Sản Phẩm"}
        </button>
        <button
          type="button"
          onClick={handleRandomAdd}
          className="bg-green-500 text-white p-2 rounded-md ml-4"
          disabled={loading}
        >
          Random Thêm Sản Phẩm
        </button>
      </form>
    </div>
  );
}
