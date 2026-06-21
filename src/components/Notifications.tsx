import { X, Bell, Gift, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface NotificationsProps {
  onClose: () => void;
}

export default function Notifications({ onClose }: NotificationsProps) {
  const { notifications, markAsRead, isDarkMode } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case "offer":
        return <Gift className="w-5 h-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return isDarkMode ? "bg-slate-700/50" : "bg-slate-50";
    switch (type) {
      case "offer":
        return "bg-amber-50";
      case "success":
        return "bg-emerald-50";
      case "warning":
        return "bg-amber-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-2xl p-6 relative max-h-[80vh] overflow-y-auto ${
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
          <div className="bg-blue-500 p-2 rounded-full">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              الإشعارات
            </h2>
            <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              {notifications.filter(n => !n.read).length} إشعار غير مقروء
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                getBgColor(notification.type, notification.read)
              } ${!notification.read ? "border-r-4 border-emerald-500" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${isDarkMode ? "bg-slate-600" : "bg-white"}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {notification.title}
                  </h3>
                  <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {notification.message}
                  </p>
                  <p className={`text-xs mt-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ar })}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}