import { Notification } from "../types";

export const notifications: Notification[] = [
  {
    id: 1,
    title: "عرض خاص!",
    message: "خصم 30% على جميع الإلكترونيات",
    type: "offer",
    read: false,
    createdAt: "2025-01-15T10:00:00"
  },
  {
    id: 2,
    title: "تم شحن طلبك",
    message: "طلب رقم #1234 في الطريق إليك",
    type: "success",
    read: false,
    createdAt: "2025-01-14T15:30:00"
  },
  {
    id: 3,
    title: "منتج جديد",
    message: "تم إضافة منتجات جديدة للمتجر",
    type: "info",
    read: true,
    createdAt: "2025-01-13T09:00:00"
  },
  {
    id: 4,
    title: "تنبيه المخزون",
    message: "المنتج 'سماعات لاسلكية برو' على وشك النفاد",
    type: "warning",
    read: true,
    createdAt: "2025-01-12T12:00:00"
  }
];