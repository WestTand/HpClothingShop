export default function FilterSidebar() {
  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <h2 className="font-bold mb-4">All Products</h2>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>Men</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>Women</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>Accessories</span>
              </label>
            </li>
          </ul>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>$0 - $50</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>$50 - $100</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>$100 - $200</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>$200+</span>
              </label>
            </li>
          </ul>
        </div>

        {/* Size */}
        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>XS</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>S</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>M</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>L</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span>XL</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
