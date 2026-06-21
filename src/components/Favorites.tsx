import { Button } from "./ui/button";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

interface FavoritesProps {
  onClose: () => void;
}

export default function Favorites({ onClose }: FavoritesProps) {
  const { favorites, allProducts, toggleFavorite, addToCart, isDarkMode } = useApp();

  const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl rounded-2xl p-6 relative max-h-[80vh] overflow-y-auto ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 p-1 rounded-full ${
            isDarkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"
          }`}
        >
          <X className={`w-5 h-5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-rose-500 p-2 rounded-full">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              المفضلة
            </h2>
            <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              {favoriteProducts.length} منتج
            </p>
          </div>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">لا توجد منتجات في المفضلة</p>
            <p className="text-sm mt-1">اضغط على قلب المنتج لإضافته هنا</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  isDarkMode ? "bg-slate-700" : "bg-slate-50"
                }`}
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg ${isDarkMode ? "bg-slate-600" : "bg-slate-200"}`}>
                  <span className="text-3xl">{product.image}</span>
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {product.category}
                  </p>
                  <p className={`font-bold mt-1 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                    {product.price} ر.س
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => addToCart(product)}
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => toggleFavorite(product.id)}
                    size="sm"
                    variant="outline"
                    className="border-rose-500 text-rose-500 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}