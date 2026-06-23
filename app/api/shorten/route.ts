import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { nanoid } from "nanoid";
import dbConnect from "@/lib/mongoose";
import Link from "@/models/Link";

const schema = z.object({
  url: z.string().url("Please enter a valid URL"),
  customSlug: z
    .string()
    .max(32, "Custom slug must be 32 characters or less")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores allowed")
    .optional()
    .or(z.literal("")),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await dbConnect();

  const { url, customSlug } = parsed.data;
  const slug = customSlug || nanoid(7);

  if (customSlug) {
    const existing = await Link.findOne({ slug: customSlug });
    if (existing) {
      return NextResponse.json(
        { error: "This custom slug is already taken" },
        { status: 409 }
      );
    }
  }

  const link = await Link.create({
    originalUrl: url,
    slug,
    clicks: 0,
    userId: session.user.id,
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return NextResponse.json(
    { shortUrl: `${baseUrl}/${link.slug}`, slug: link.slug },
    { status: 201 }
  );
}
