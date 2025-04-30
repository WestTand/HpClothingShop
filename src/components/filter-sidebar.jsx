export default function FilterSidebar({ filters, setFilters }) {
  const handleChange = (type, value) => {
    setFilters(prev => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  const createCheckbox = (type, label) => (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="rounded text-purple-600"
        checked={filters[type].includes(label)}
        onChange={() => handleChange(type, label)}
      />
      <span>{label}</span>
    </label>
  );

  return (
    <div className="w-full md:w-64 flex-shrink-0">

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <ul className="space-y-1 text-sm">
            {["Men", "Women"].map(c => (
              <li key={c}>{createCheckbox("category", c)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <ul className="space-y-1 text-sm">
            {["0-50", "50-100", "100-200", "200+"].map(p => (
              <li key={p}>{createCheckbox("price", p)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <ul className="space-y-1 text-sm">
            {["XS", "S", "M", "L", "XL"].map(s => (
              <li key={s}>{createCheckbox("size", s)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
