import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, CreditCard, Truck, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { cartItems, isDarkMode, user, couponDiscount, clearCart } = useApp();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [cardNumber, setCardNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 30;
  const total = subtotal + shipping - couponDiscount;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        clearCart();
        onClose();
      }, 2000);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className={`w-full max-w-md rounded-2xl p-8 text-center ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
          <div className="bg-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
            تم الطلب بنجاح!
          </h2>
          <p className={`${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            شكراً لك. سيتم توصيل طلبك خلال 2-3 أيام عمل.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className={`w-full max-w-2xl rounded-2xl p-6 relative my-8 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 p-2 rounded-full ${isDarkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-100 hover:bg-slate-200"}`}
        >
          <X className={`w-5 h-5 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`} />
        </button>

        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
          إتمام الطلب
        </h2>

        {/* الخطوات */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  s <= step
                    ? "bg-emerald-500 text-white"
                    : isDarkMode ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-500"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 ${s < step ? "bg-emerald-500" : isDarkMode ? "bg-slate-700" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        {/* الخطوة 1: العنوان */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-emerald-500" />
              <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                معلومات التوصيل
              </h3>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                العنوان
              </label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="المدينة، الحي، الشارع"
                className={isDarkMode ? "bg-slate-700 border-slate-600 text-white" : ""}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                رقم الجوال
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05xxxxxxxx"
                className={isDarkMode ? "bg-slate-700 border-slate-600 text-white" : ""}
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={!address || !phone}
            >
              التالي
            </Button>
          </div>
        )}

        {/* الخطوة 2: الدفع */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-emerald-500" />
              <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                معلومات الدفع
              </h3>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                رقم البطاقة
              </label>
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                placeholder="1234 5678 9012 3456"
                className={isDarkMode ? "bg-slate-700 border-slate-600 text-white" : ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                  تاريخ الانتهاء
                </label>
                <Input placeholder="MM/YY" className={isDarkMode ? "bg-slate-700 border-slate-600 text-white" : ""} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                  CVV
                </label>
                <Input placeholder="123" className={isDarkMode ? "bg-slate-700 border-slate-600 text-white" : ""} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                السابق
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={cardNumber.length < 16}
              >
                التالي
              </Button>
            </div>
          </div>
        )}

        {/* الخطوة 3: التأكيد */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              ملخص الطلب
            </h3>

            <div className={`p-4 rounded-xl space-y-3 ${isDarkMode ? "bg-slate-700" : "bg-slate-50"}`}>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>
                    {item.name} × {item.quantity}
                  </span>
                  <span className={`font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {item.price * item.quantity} ر.س
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>المجموع الفرعي</span>
                  <span className={isDarkMode ? "text-white" : "text-slate-800"}>{subtotal} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>الشحن</span>
                  <span className={isDarkMode ? "text-white" : "text-slate-800"}>
                    {shipping === 0 ? "مجاني" : `${shipping} ر.س`}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>الخصم</span>
                    <span>-{couponDiscount} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span className={isDarkMode ? "text-white" : "text-slate-800"}>الإجمالي</span>
                  <span className="text-emerald-500">{total} ر.س</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1"
              >
                السابق
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? "جاري المعالجة..." : "تأكيد الدفع"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}