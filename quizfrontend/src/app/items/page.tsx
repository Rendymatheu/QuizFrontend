// app/items/page.tsx
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function ItemsPage() {
  const items = await prisma.item.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Plants</h2>
        <Link href="/items/new" className="btn btn-success">Add New Plant</Link>
      </div>

      <div className="row">
        {items.map((it) => (
          <div className="col-md-4 mb-3" key={it.id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{it.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{it.species}</h6>
                <p className="card-text flex-grow-1">{it.notes ?? "—"}</p>
                <div className="d-flex gap-2 mt-2">
                  <Link href={`/items/${it.id}`} className="btn btn-outline-primary btn-sm">Details</Link>
                  <Link href={`/items/${it.id}/edit`} className="btn btn-outline-secondary btn-sm">Edit</Link>
                  <button
                    className="btn btn-danger btn-sm ms-auto"
                    onClick={async () => {
                      if (!confirm("Delete this plant?")) return;
                      await fetch(`/api/items/${it.id}`, { method: "DELETE" });
                      location.reload();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted small">
                Added: {new Date(it.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}