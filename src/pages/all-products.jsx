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
    const prodWords = product.category.toLowerCase().split(" ");
  
    // 1. Category: dùng cách tách từ để kiểm tra
    const matchCategory =
      category.length === 0 ||
      category.some(filter => {
        const filterWords = filter.toLowerCase().split(" ");
        // kiểm tra tất cả từ của filter có trong prodWords không
        return filterWords.every(w => prodWords.includes(w));
      });
  
    // 2. Price: giữ nguyên logic trước
    const priceNum = Number(product.price);
    const matchPrice =
      price.length === 0 ||
      price.some(range => {
        if (range === "0-100.000")           return priceNum <= 100000;
        if (range === "100.000-200.000")    return priceNum > 100000  && priceNum <= 200000;
        if (range === "200.000-300.000")   return priceNum > 200000 && priceNum <= 300000;
        if (range === "300.000-400.000")    return priceNum > 300000 && priceNum <= 400000;
        if (range === "400.000+")          return priceNum > 400000;
      });
  
    // 3. Size: giữ nguyên
    const matchSize =
      size.length === 0 ||
      product.stock.some(s => size.includes(s.size));
  
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
