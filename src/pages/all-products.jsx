import ProductCard from "../components/product-card"
import FilterSidebar from "../components/filter-sidebar"
import { db } from "../config/firebase_config";
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([])

  const productsCollectionRef = collection(db, "products")

  useEffect(() => {
    const fetchProducts = async () => {
      // Read data from firebase
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
    // Call fetchProducts here, not inside the function definition
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Tất Cả Sản Phẩm</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="md:w-1/4">
          <FilterSidebar />
        </div>

        {/* Product Display */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
