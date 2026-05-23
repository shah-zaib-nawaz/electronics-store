export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  category: string | ICategory;
  brand: string | IBrand;
  images: string[];
  specifications: Record<string, string>;
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
