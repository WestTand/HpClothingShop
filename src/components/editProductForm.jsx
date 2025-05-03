import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase_config";

export default function EditProductForm({
  formData,
  setFormData,
  editingProductId,
  onSubmitSuccess,
}) {
  const [loading, setLoading] = useState(false);

  // Nếu formData thay đổi, reset loading
  useEffect(() => {
    setLoading(false);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStockChange = (size, value) => {
    // Chắc chắn rằng số lượng là một số và không có dấu phẩy
    const newQuantity = Number(value) || 0;

    setFormData((prev) => ({
      ...prev,
      stock: prev.stock.map((item) =>
        item.size === size ? { ...item, quantity: newQuantity } : item
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ref = doc(db, "products", editingProductId);
      await updateDoc(ref, {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price, 10),
        stock: formData.stock,
        category: formData.category,
        updatedAt: new Date(),
      });
      alert("Cập nhật thành công!");
      onSubmitSuccess();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left"
    >
      {/* Cột trái */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tên sản phẩm</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Hình (preview)</label>
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="preview"
              className="w-32 h-32 object-cover rounded"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Cột phải */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số lượng theo size</label>
          <div className="grid grid-cols-2 gap-4">
            {formData.stock.map(({ size, quantity }) => (
              <div key={size} className="flex items-center space-x-2">
                <span className="w-16">{size}</span>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => handleStockChange(size, e.target.value)}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Áo Nam">Áo Nam</option>
            <option value="Quần Nam">Quần Nam</option>
            <option value="Giày Nam">Giày Nam</option>
            <option value="Áo Nữ">Áo Nữ</option>
            <option value="Quần Nữ">Quần Nữ</option>
            <option value="Giày Nữ">Giày Nữ</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
          </button>
        </div>
      </div>
    </form>
  );
}
