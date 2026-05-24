import mongoose, { Schema, Document, Model } from "mongoose";

const CartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
);

export interface ICartDoc extends Document {
  user?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICartDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      sparse: true,
    },
    sessionId: { type: String, index: true, sparse: true },
    items: { type: [CartItemSchema], default: [] },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Cart: Model<ICartDoc> =
  mongoose.models.Cart || mongoose.model<ICartDoc>("Cart", CartSchema);

export default Cart;
