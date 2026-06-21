import { Coupon } from "../types";

export const coupons: Coupon[] = [
  {
    code: "WELCOME20",
    discount: 20,
    type: "percentage",
    minOrder: 100,
    expiresAt: "2025-12-31"
  },
  {
    code: "SAVE50",
    discount: 50,
    type: "fixed",
    minOrder: 300,
    expiresAt: "2025-06-30"
  },
  {
    code: "SUMMER30",
    discount: 30,
    type: "percentage",
    minOrder: 200,
    expiresAt: "2025-08-31"
  },
  {
    code: "FREESHIP",
    discount: 25,
    type: "fixed",
    minOrder: 150,
    expiresAt: "2025-12-31"
  }
];