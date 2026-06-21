import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, User, Lock, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login, isDarkMode, user, logout } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        onClose();
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-2xl p-6 relative ${
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

        {user ? (
          <div className="text-center">
            <div className="text-6xl mb-4">{user.avatar}</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              {user.name}
            </h2>
            <p className={`mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              {user.email}
            </p>
            <Button
              onClick={logout}
              variant="outline"
              className="w-full border-rose-500 text-rose-500 hover:bg-rose-50"
            >
              تسجيل الخروج
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                تسجيل الدخول
              </h2>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                مرحباً بك مجدداً!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? "text-slate-400" : "text-slate-400"}`} />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className={`pr-10 ${isDarkMode ? "bg-slate-700 border-slate-600 text-white" : ""}`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? "text-slate-400" : "text-slate-400"}`} />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className={`pr-10 ${isDarkMode ? "bg-slate-700 border-slate-600 text-white" : ""}`}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-rose-500 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "جاري التحقق..." : "دخول"}
              </Button>

              <p className={`text-xs text-center ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                للتجربة: ahmed@example.com / 123456
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}