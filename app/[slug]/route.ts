import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Link from "@/models/Link";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  await dbConnect();

  const link = await Link.findOne({ slug });

  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }

  await Link.updateOne({ _id: link._id }, { $inc: { clicks: 1 } });

  return NextResponse.redirect(link.originalUrl, 301);
}
