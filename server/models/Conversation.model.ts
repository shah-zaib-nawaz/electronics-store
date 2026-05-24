import mongoose, { Schema, Document, Model } from "mongoose";

const ChatMessageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system", "tool"],
      required: true,
    },
    content: { type: String, required: true },
    toolCalls: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

export interface IConversationDoc extends Document {
  user?: mongoose.Types.ObjectId;
  title: string;
  messages: {
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    toolCalls?: unknown;
    timestamp: Date;
  }[];
  context?: {
    lastViewedProducts?: mongoose.Types.ObjectId[];
    currentPage?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversationDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      sparse: true,
    },
    title: { type: String, default: "New Conversation" },
    messages: { type: [ChatMessageSchema], default: [] },
    context: {
      lastViewedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      currentPage: { type: String },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ConversationSchema.index({ user: 1, updatedAt: -1 });

const Conversation: Model<IConversationDoc> =
  mongoose.models.Conversation ||
  mongoose.model<IConversationDoc>("Conversation", ConversationSchema);

export default Conversation;
