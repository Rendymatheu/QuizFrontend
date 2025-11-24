// app/items/[id]/edit/page.tsx
import React from "react";
import { prisma } from "@/lib/prisma";
import ItemForm from "@/components/ItemForm";

type Props = { params: { id: string } };

export default async function EditPage({ params }: Props) {
  const id = Number(params.id);
  const item = await prisma.item.findUnique({ where: { id } });
  if (!item) return <div>Item not found</div>;

  // pass initial props
  return (
    <div>
      <h2>Edit Plant</h2>
      <div className="card p-3">
        {/* @ts-ignore server -> client initial prop is serializable */}
        <ItemForm initial={{ name: item.name, species: item.species ?? "", notes: item.notes ?? "" }} itemId={item.id} />
      </div>
    </div>
  );
}
