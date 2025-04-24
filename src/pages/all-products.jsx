import ProductCard from "../components/product-card"
import FilterSidebar from "../components/filter-sidebar"

export default function AllProducts() {
  const products = [
    { id: 1, name: "Product Name", price: "$99.99" },
    { id: 2, name: "Product Name", price: "$99.99" },
    { id: 3, name: "Product Name", price: "$99.99" },
    { id: 4, name: "Product Name", price: "$99.99" },
    { id: 5, name: "Product Name", price: "$99.99" },
    { id: 6, name: "Product Name", price: "$99.99" },
    { id: 7, name: "Product Name", price: "$99.99" },
    { id: 8, name: "Product Name", price: "$99.99" },
    { id: 9, name: "Product Name", price: "$99.99" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar />

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
