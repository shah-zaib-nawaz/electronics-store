import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategoryDoc extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: mongoose.Types.ObjectId | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategoryDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String },
    image: { type: String },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isActive: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CategorySchema.index({ parentCategory: 1, isActive: 1 });

const Category: Model<ICategoryDoc> =
  mongoose.models.Category ||
  mongoose.model<ICategoryDoc>("Category", CategorySchema);

export default Category;
