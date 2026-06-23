import mongoose, { Schema, Document } from "mongoose";

export interface ILink extends Document {
  originalUrl: string;
  slug: string;
  clicks: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema = new Schema<ILink>(
  {
    originalUrl: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

LinkSchema.index({ slug: 1 }, { unique: true });
LinkSchema.index({ userId: 1 });

export default mongoose.models.Link || mongoose.model<ILink>("Link", LinkSchema);
