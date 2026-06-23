import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Link from "@/models/Link";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const links = await Link.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const serialized = links.map((link) => ({
    _id: link._id.toString(),
    originalUrl: link.originalUrl,
    slug: link.slug,
    clicks: link.clicks,
    createdAt: link.createdAt?.toISOString?.() ?? new Date().toISOString(),
  }));

  return NextResponse.json(serialized);
}
