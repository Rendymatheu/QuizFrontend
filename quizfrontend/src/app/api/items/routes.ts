import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all items
export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Get items error:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

// POST create new item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, species, notes } = body;

    // Validasi input
    if (!name || !species) {
      return NextResponse.json(
        { error: "Name and species are required" },
        { status: 400 }
      );
    }

    // Create item di database
    const item = await prisma.item.create({
      data: {
        name,
        species,
        notes: notes || null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create item error:", error);
    return NextResponse.json(
      { error: "Failed to create item", details: String(error) },
      { status: 500 }
    );
  }
}