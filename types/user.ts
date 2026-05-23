export type UserRole = "customer" | "admin" | "superadmin";

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  isDefault?: boolean;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: string;
  image?: string;
  role: UserRole;
  phone?: string;
  address: Address[];
  wishlist: string[];
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}
