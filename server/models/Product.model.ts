import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductDoc extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  category: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId;
  images: string[];
  specifications: Map<string, string>;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  ratings: {
    average: number;
    count: number;
  };
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, required: true },
    shortDescription: { type: String },
    sku: { type: String, required: true, unique: true, uppercase: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    images: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Product must have at least 1 image",
      },
    },
    specifications: {
      type: Map,
      of: String,
      default: new Map(),
    },
    stock: { type: Number, required: true, min: 0, default: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
    tags: { type: [String], default: [], index: true },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    embedding: {
      type: [Number],
      select: false,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ brand: 1, isActive: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ "ratings.average": -1 });
ProductSchema.index({ createdAt: -1 });

ProductSchema.index(
  { name: "text", description: "text", tags: "text" },
  { weights: { name: 10, tags: 5, description: 1 } }
);

const Product: Model<IProductDoc> =
  mongoose.models.Product ||
  mongoose.model<IProductDoc>("Product", ProductSchema);

export default Product;
