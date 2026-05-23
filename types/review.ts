import { IUser } from "./user";

export interface IReview {
  _id: string;
  user: string | IUser;
  product: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
