import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connectDB } from "../lib/db";
import {
  User,
  Category,
  Brand,
  Product,
  Order,
  Review,
  Cart,
  Conversation,
  Coupon,
} from "../server/models";

async function test() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();

    console.log("\n📋 Registered Models:");
    console.log("  ✅ User       :", User.modelName);
    console.log("  ✅ Category   :", Category.modelName);
    console.log("  ✅ Brand      :", Brand.modelName);
    console.log("  ✅ Product    :", Product.modelName);
    console.log("  ✅ Order      :", Order.modelName);
    console.log("  ✅ Review     :", Review.modelName);
    console.log("  ✅ Cart       :", Cart.modelName);
    console.log("  ✅ Conversation:", Conversation.modelName);
    console.log("  ✅ Coupon     :", Coupon.modelName);

    // Try a simple count on each
    console.log("\n📊 Document counts:");
    console.log("  Users     :", await User.countDocuments());
    console.log("  Categories:", await Category.countDocuments());
    console.log("  Products  :", await Product.countDocuments());

    console.log("\n🎉 SUCCESS! Everything works!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ ERROR:", error);
    process.exit(1);
  }
}

test();
