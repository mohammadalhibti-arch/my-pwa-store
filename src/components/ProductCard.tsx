import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-slate-700 text-white text-xs font-bold px-2 py-1 rounded-lg">
              نفذت
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`absolute bottom-3 left-3 right-3 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            product.inStock
              ? "bg-emerald-600 text-white opacity-0 group-hover:opacity-100 hover:bg-emerald-700"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "أضف للسلة" : "غير متوفر"}
        </button>
      </div>

      <div className="p-4">
        <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">
          {product.category}
        </span>

        <h3 className="text-slate-800 font-bold mt-2 mb-1">{product.name}</h3>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-slate-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-emerald-600">{product.price} ر.س</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">{product.originalPrice} ر.س</span>
          )}
        </div>
      </div>
    </div>
  );
}