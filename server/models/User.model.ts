import mongoose, { Schema, Document, Model } from "mongoose";

const AddressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: "USA" },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

export interface IUserDoc extends Document {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: "customer" | "admin" | "superadmin";
  phone?: string;
  addresses: (typeof AddressSchema)[];
  wishlist: mongoose.Types.ObjectId[];
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    role: {
      type: String,
      enum: ["customer", "admin", "superadmin"],
      default: "customer",
      index: true,
    },
    phone: { type: String },
    addresses: { type: [AddressSchema], default: [] },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    stripeCustomerId: { type: String, index: true, sparse: true },
  },
  { timestamps: true }
);

const User: Model<IUserDoc> =
  mongoose.models.User || mongoose.model<IUserDoc>("User", UserSchema);

export default User;
