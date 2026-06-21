import { Button } from "./ui/button";
import { X, Package, Users, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { allProducts, cartItems, user, isDarkMode } = useApp();

  const stats = [
    {
      title: "المنتجات",
      value: allProducts.length,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "المبيعات",
      value: "12,450 ر.س",
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      title: "الطلبات",
      value: "156",
      icon: ShoppingCart,
      color: "bg-amber-500",
    },
    {
      title: "المستخدمين",
      value: "1,234",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  const recentOrders = [
    { id: 1234, customer: "أحمد محمد", total: 450, status: "تم التسليم" },
    { id: 1235, customer: "سارة علي", total: 890, status: "قيد التوصيل" },
    { id: 1236, customer: "محمد خالد", total: 320, status: "قيد التجهيز" },
    { id: 1237, customer: "نورة أحمد", total: 1200, status: "تم التسليم" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-2xl p-6 relative my-8 ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 p-2 rounded-full ${
            isDarkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          <X className={`w-5 h-5 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-500 p-2 rounded-full">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              لوحة الإدارة
            </h2>
            <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              مرحباً، {user?.name}
            </p>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${isDarkMode ? "bg-slate-700" : "bg-slate-50"}`}
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* الطلبات الأخيرة */}
        <div>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
            الطلبات الأخيرة
          </h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  isDarkMode ? "bg-slate-700" : "bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-slate-600" : "bg-slate-200"}`}>
                    <span className="text-lg">📦</span>
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      #{order.id}
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {order.customer}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className={`font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                    {order.total} ر.س
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* أزرار الإدارة */}
        <div className="flex gap-3 mt-6">
          <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
            إضافة منتج جديد
          </Button>
          <Button variant="outline" className="flex-1">
            عرض جميع الطلبات
          </Button>
        </div>
      </div>
    </div>
  );
}