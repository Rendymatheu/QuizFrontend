import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Get item error:", error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

// PUT update item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, species, notes } = body;

    const item = await prisma.item.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        species,
        notes: notes || null,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Update item error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

// DELETE item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.item.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete item error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}