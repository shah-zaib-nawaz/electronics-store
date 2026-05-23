export type DiscountType = "percentage" | "fixed";

export interface ICoupon {
  _id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableCategories: string[];
  applicableProducts: string[];
  createdAt: Date;
  updatedAt: Date;
}
