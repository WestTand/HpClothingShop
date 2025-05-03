import { useEffect, useState } from "react";
import { db } from "../config/firebase_config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function DeleteProductPanel({ onEditClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 1. search state

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "products", id));
        await fetchProducts();
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Lọc danh sách theo searchQuery (case-insensitive)
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Modal "Đang xoá" */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-xl font-semibold">Đang xoá...</p>
            <div className="mt-4">
              <div className="w-6 h-6 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {/* Thanh search */}
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Danh sách sản phẩm đã lọc */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        filtered.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border p-2 rounded-md"
          >
            <div>
              <p className="font-bold">{product.name}</p>
              <p>{product.price}đ</p>
            </div>
            <div>
              <button
                onClick={() => onEditClick(product)}
                className="text-blue-600 mr-2"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600"
              >
                Xoá
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
