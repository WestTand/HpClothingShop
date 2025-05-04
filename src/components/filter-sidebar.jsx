import { useState } from "react";

export default function FilterSidebar({ filters, setFilters }) {
  const [expanded, setExpanded] = useState({ Men: false, Women: false });

  const genderMap = {
    Men: "Nam",
    Women: "Nữ"
  };

  const subcategories = ["Áo", "Quần", "Giày"];

  const isCategoryChecked = (value) => filters.category.includes(value);
  const isPriceChecked = (range) => filters.price.includes(range);
  const isSizeChecked = (size) => filters.size.includes(size);

  const handleGenderToggle = (gender) => {
    const label = genderMap[gender];
    const subLabels = subcategories.map(sub => `${sub} ${label}`);
    const isChecked = isCategoryChecked(label) || subLabels.some(isCategoryChecked);

    if (isChecked) {
      // Bỏ tick => xóa tất cả label liên quan đến gender
      setFilters(prev => ({
        ...prev,
        category: prev.category.filter(c => !c.includes(label))
      }));
      setExpanded(prev => ({ ...prev, [gender]: false }));
    } else {
      // Thêm "Nam" hoặc "Nữ"
      setFilters(prev => ({
        ...prev,
        category: [...prev.category, label]
      }));
      setExpanded(prev => ({ ...prev, [gender]: true }));
    }
  };

  const handleSubToggle = (gender, sub) => {
    const label = genderMap[gender];
    const subLabel = `${sub} ${label}`;
    const isChecked = isCategoryChecked(subLabel);

    setFilters(prev => {
      // Loại bỏ "Nam" hoặc "Nữ" nếu đang có (vì đang chọn sub)
      let newCategory = prev.category.filter(c => c !== label);

      if (isChecked) {
        // Bỏ sub
        newCategory = newCategory.filter(c => c !== subLabel);
      } else {
        // Thêm sub
        newCategory = [...newCategory, subLabel];
      }

      // Nếu bỏ hết sub nhưng vẫn mở gender → thêm lại "Nam" hoặc "Nữ"
      const remainingSub = subcategories
        .map(sc => `${sc} ${label}`)
        .filter(sc => newCategory.includes(sc));
      if (remainingSub.length === 0) {
        newCategory.push(label);
      }

      return { ...prev, category: newCategory };
    });
  };

  const handlePriceToggle = (range) => {
    setFilters(prev => {
      let newPrice = [...prev.price];
      if (newPrice.includes(range)) {
        newPrice = newPrice.filter(p => p !== range); // Remove the range if already selected
      } else {
        newPrice.push(range); // Add the range if not selected
      }
      return { ...prev, price: newPrice };
    });
  };

  const handleSizeToggle = (size) => {
    setFilters(prev => {
      let newSize = [...prev.size];
      if (newSize.includes(size)) {
        newSize = newSize.filter(s => s !== size); // Remove size if already selected
      } else {
        newSize.push(size); // Add size if not selected
      }
      return { ...prev, size: newSize };
    });
  };

  const createCheckbox = (type, label) => (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="rounded text-purple-600"
        checked={type === "price" ? isPriceChecked(label) : type === "size" ? isSizeChecked(label) : isCategoryChecked(label)}
        onChange={() => type === "price" ? handlePriceToggle(label) : type === "size" ? handleSizeToggle(label) : handleChange(type, label)}
      />
      <span>{label}</span>
    </label>
  );

  return (
    <div className="w-full md:w-64 flex-shrink-0 space-y-6">

      {/* ✅ Categories */}
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <ul className="space-y-1 text-sm">
          {["Men", "Women"].map((gender) => {
            const genderLabel = genderMap[gender];
            return (
              <li key={gender}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded text-purple-600"
                    checked={isCategoryChecked(genderLabel)}
                    onChange={() => handleGenderToggle(gender)}
                  />
                  <span>{gender}</span>
                </label>

                {expanded[gender] && (
                  <ul className="ml-5 mt-1 space-y-1">
                    {subcategories.map(sub => {
                      const subLabel = `${sub} ${genderMap[gender]}`;
                      return (
                        <li key={subLabel}>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="rounded text-purple-600"
                              checked={isCategoryChecked(subLabel)}
                              onChange={() => handleSubToggle(gender, sub)}
                            />
                            <span>{sub}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ✅ Price Range */}
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <ul className="space-y-1 text-sm">
          {["0-50.000", "50.000-100.000", "100.000-200.000", "200.000+"].map((p) => (
            <li key={p}>{createCheckbox("price", p)}</li>
          ))}
        </ul>
      </div>

      {/* ✅ Size */}
      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <ul className="space-y-1 text-sm">
          {["S", "M", "L", "XL"].map((s) => (
            <li key={s}>{createCheckbox("size", s)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
