import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBrandDoc extends Document {
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrandDoc>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    logo: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const Brand: Model<IBrandDoc> =
  mongoose.models.Brand || mongoose.model<IBrandDoc>("Brand", BrandSchema);

export default Brand;
