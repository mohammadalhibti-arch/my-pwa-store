import { Button } from "./ui/button";
import { X, Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Product } from "../types";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart, isFavorite, toggleFavorite, isDarkMode, cartItems, updateQuantity } = useApp();
  const [quantity, setQuantity] = useState(1);
  const cartItem = cartItems.find(item => item.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-2xl p-6 relative my-8 ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 p-2 rounded-full z-10 ${
            isDarkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          <X className={`w-5 h-5 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`} />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* الصورة */}
          <div className={`flex items-center justify-center rounded-xl p-8 ${isDarkMode ? "bg-slate-700" : "bg-slate-100"}`}>
            <span className="text-[150px]">{product.image}</span>
          </div>

          {/* التفاصيل */}
          <div className="space-y-4">
            <div>
              <span className={`text-sm ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                {product.category}
              </span>
              <h1 className={`text-2xl md:text-3xl font-bold mt-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                {product.name}
              </h1>
            </div>

            {/* التقييم */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-current"
                        : isDarkMode ? "text-slate-600" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {product.rating} ({product.reviews} تقييم)
              </span>
            </div>

            {/* السعر */}
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                {product.price} ر.س
              </span>
              {product.originalPrice && (
                <span className={`text-lg line-through ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  {product.originalPrice} ر.س
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-rose-500 text-white text-sm px-2 py-1 rounded-full">
                  خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* الوصف */}
            <div>
              <h3 className={`font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                الوصف
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                {product.description}
              </p>
            </div>

            {/* المخزون */}
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                التوفر:
              </span>
              {product.stock > 10 ? (
                <span className="text-emerald-500 text-sm font-medium">متوفر ({product.stock} قطعة)</span>
              ) : product.stock > 0 ? (
                <span className="text-amber-500 text-sm font-medium">متبقي {product.stock} قطع فقط!</span>
              ) : (
                <span className="text-rose-500 text-sm font-medium">نفذت الكمية</span>
              )}
            </div>

            {/* الكمية */}
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                الكمية:
              </span>
              <div className={`flex items-center gap-2 rounded-lg p-1 ${isDarkMode ? "bg-slate-700" : "bg-slate-100"}`}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`p-2 rounded-md ${isDarkMode ? "hover:bg-slate-600" : "hover:bg-slate-200"}`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className={`w-12 text-center font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className={`p-2 rounded-md ${isDarkMode ? "hover:bg-slate-600" : "hover:bg-slate-200"}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => toggleFavorite(product.id)}
                variant="outline"
                className={`flex-1 ${isFavorite(product.id) ? "border-rose-500 text-rose-500" : ""}`}
              >
                <Heart className={`w-5 h-5 ml-2 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                {isFavorite(product.id) ? "في المفضلة" : "أضف للمفضلة"}
              </Button>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                {cartItem ? `أضف المزيد (${cartItem.quantity} في السلة)` : "أضف للسلة"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}