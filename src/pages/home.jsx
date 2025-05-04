import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase_config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import ProductCard from "../components/product-card";

export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("updatedAt", "desc"), // Sắp xếp theo updatedAt mới nhất
          limit(8)
        );
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLatestProducts(products);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchLatestProducts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="bg-purple-600 text-white text-center py-16 px-4 mb-10">
        <h1 className="text-3xl font-bold mb-2">Summer Collection 2023</h1>
        <p className="mb-6">Check out our latest summer collection and find your style</p>
        <Link to="/all-products">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium">Shop Now</button>
        </Link>
      </div>

      {/* Latest Products Section */}
      <div className="mb-10">
      <h2 className="text-xl font-semibold mb-6">Sản phẩm mới nhất</h2>
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mb-16">
        <Link to="/all-products">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium">Xem tất cả</button>
        </Link>
      </div>
    </div>
  );
}
