import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany();
    const data: Record<string, string> = {};
    for (const s of settings) {
      data[s.key] = s.value;
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    if (typeof data !== "object" || data === null) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const updates = Object.entries(data).map(([key, value]) =>
      db.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    );

    await db.$transaction(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
