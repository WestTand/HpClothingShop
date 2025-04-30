import ProductCard from "../components/product-card"
import { db } from "../config/firebase_config"
import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function WomensCollection() {
  const [womensProducts, setWomensProducts] = useState([])

  useEffect(() => {
    const fetchWomensProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "products")
        const data = await getDocs(productsCollectionRef)
        const allProducts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        const filtered = allProducts.filter((product) =>
          product.category?.toLowerCase().includes("nữ")
        )

        setWomensProducts(filtered)
      } catch (error) {
        console.error("Error fetching women's products:", error)
      }
    }

    fetchWomensProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Women's Collection</h1>
        <p className="text-gray-600">Explore our latest women's fashion items</p>
      </div>

      {womensProducts.length === 0 ? (
        <p className="text-center text-gray-600">Không có sản phẩm nữ nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {womensProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
