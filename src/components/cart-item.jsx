import { Trash2, Plus, Minus } from "lucide-react"

export default function CartItem({ item }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0">
        <img src="/placeholder.svg?height=80&width=80" alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-1 border rounded-md">
          <Minus size={16} />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button className="p-1 border rounded-md">
          <Plus size={16} />
        </button>
      </div>

      <button className="p-1 text-gray-500 hover:text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  )
}
