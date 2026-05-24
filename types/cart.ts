import { IProduct } from "./product";

export interface CartItem {
  product: string | IProduct;
  quantity: number;
}

export interface ICart {
  _id: string;
  user?: string;
  sessionId?: string;
  items: CartItem[];
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
