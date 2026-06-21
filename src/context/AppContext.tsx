import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem, User, Notification, Coupon } from "../types";
import { products } from "../data/products";
import { users } from "../data/users";
import { initialNotifications } from "../data/notifications";
import { coupons } from "../data/coupons";

interface AppContextType {
  // السلة
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // المفضلة
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  
  // المستخدم
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // الوضع الداكن
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // الإشعارات
  notifications: Notification[];
  markAsRead: (id: number) => void;
  unreadCount: number;
  
  // الكوبونات
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  couponDiscount: number;
  
  // المنتجات
  allProducts: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // تحميل البيانات من التخزين المحلي
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedFavorites = localStorage.getItem("favorites");
    const savedUser = localStorage.getItem("user");
    const savedDarkMode = localStorage.getItem("darkMode");
    
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // حفظ البيانات في التخزين المحلي
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // دوال السلة
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // دوال المفضلة
  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  // دوال المستخدم
  const login = (email: string, password: string): boolean => {
    const foundUser = users.find((u) => u.email === email);
    if (foundUser && password === "123456") {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // دوال الوضع الداكن
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // دوال الإشعارات
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // دوال الكوبونات
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const coupon = coupons.find((c) => c.code === code);
    
    if (!coupon) {
      return { success: false, message: "كود الخصم غير صالح" };
    }
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    if (total < coupon.minOrder) {
      return { success: false, message: `الحد الأدنى للطلب ${coupon.minOrder} ريال` };
    }
    
    if (new Date(coupon.expiresAt) < new Date()) {
      return { success: false, message: "انتهت صلاحية الكود" };
    }
    
    setAppliedCoupon(code);
    return { success: true, message: `تم تطبيق الخصم بنجاح!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateCouponDiscount = (): number => {
    if (!appliedCoupon) return 0;
    const coupon = coupons.find((c) => c.code === appliedCoupon);
    if (!coupon) return 0;
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    if (coupon.type === "percentage") {
      return total * (coupon.discount / 100);
    }
    return coupon.discount;
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        isFavorite,
        user,
        login,
        logout,
        isDarkMode,
        toggleDarkMode,
        notifications,
        markAsRead,
        unreadCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscount: calculateCouponDiscount(),
        allProducts: products,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}