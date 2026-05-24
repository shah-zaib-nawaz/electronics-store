import { Address } from "./user";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
