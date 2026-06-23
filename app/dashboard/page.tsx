import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Link from "@/models/Link";
import DashboardClient from "./DashboardClient";

export const metadata = { title: "Dashboard - URL Shortener" };

async function getLinks(userId: string) {
  await dbConnect();
  const links = await Link.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return links.map((link) => ({
    _id: link._id.toString(),
    originalUrl: link.originalUrl,
    slug: link.slug,
    clicks: link.clicks,
    createdAt:
      link.createdAt?.toISOString?.() ?? new Date().toISOString(),
  }));
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? "";

  const links = await getLinks(userId);
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  return <DashboardClient links={links} baseUrl={baseUrl} />;
}
