import ProductCard from "../components/product-card"

export default function MensCollection() {
  const products = [
    { id: 1, name: "Product Name", price: "$99.99" },
    { id: 2, name: "Product Name", price: "$99.99" },
    { id: 3, name: "Product Name", price: "$99.99" },
    { id: 4, name: "Product Name", price: "$99.99" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Men's Collection</h1>
        <p className="text-gray-600">Explore our latest men's fashion items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
