import ProductCard from "../components/product-card"
import FilterSidebar from "../components/filter-sidebar"
import { db } from "../config/firebase_config";
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    size: []
  });

  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getDocs(productsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setProducts(filteredData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Hàm lọc theo filter
  const applyFilters = (product) => {
    const { category, price, size } = filters;

    // Category
    const matchCategory =
  category.length === 0 ||
  category.some(filter => {
    if (filter === "Men") return product.category.toLowerCase().includes("nam");
    if (filter === "Women") return product.category.toLowerCase().includes("nữ");
    return false;
  });

    // Price
    const priceNum = Number(product.price);
    const matchPrice = price.length === 0 || price.some(range => {
      if (range === "0-50") return priceNum <= 50;
      if (range === "50-100") return priceNum > 50 && priceNum <= 100;
      if (range === "100-200") return priceNum > 100 && priceNum <= 200;
      if (range === "200+") return priceNum > 200;
    });

    // Size
    const matchSize = size.length === 0 || product.stock.some(s => size.includes(s.size));

    return matchCategory && matchPrice && matchSize;
  };

  const filteredProducts = products.filter(applyFilters);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Tất Cả Sản Phẩm</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">Không có sản phẩm phù hợp.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
