import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICouponDoc extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableCategories: mongoose.Types.ObjectId[];
  applicableProducts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICouponDoc>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    minPurchase: { type: Number, min: 0 },
    maxUses: { type: Number, min: 0 },
    usedCount: { type: Number, default: 0, min: 0 },
    validFrom: { type: Date, required: true, default: Date.now },
    validUntil: { type: Date, required: true },
    isActive: { type: Boolean, default: true, index: true },
    applicableCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

CouponSchema.pre("save", async function (this: ICouponDoc) {
  if (this.discountType === "percentage" && this.discountValue > 100) {
    throw new Error("Percentage discount cannot exceed 100%");
  }
});

const Coupon: Model<ICouponDoc> =
  mongoose.models.Coupon || mongoose.model<ICouponDoc>("Coupon", CouponSchema);

export default Coupon;
