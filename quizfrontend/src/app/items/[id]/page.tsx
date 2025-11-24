// app/items/[id]/page.tsx
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";

type Props = { params: { id: string } };

export default async function ItemDetail({ params }: Props) {
  const id = Number(params.id);
  const item = await prisma.item.findUnique({ where: { id } });
  if (!item) {
    // Next.js app router will render not-found.tsx if we throw
    return (
      <div className="alert alert-warning">
        Item not found. <Link href="/items">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="text-muted">{item.species}</h6>
          <p>{item.notes}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div>
            <small>Created: {new Date(item.createdAt).toLocaleString()}</small>
          </div>
          <div>
            <Link href="/items" className="btn btn-outline-secondary btn-sm me-2">Back</Link>
            <Link href={`/items/${item.id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
