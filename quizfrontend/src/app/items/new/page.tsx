// app/items/new/page.tsx
import dynamic from "next/dynamic";
import React from "react";
import ItemForm from "@/components/ItemForm";

export default function NewItemPage() {
  return (
    <div>
      <h2>Add New Plant</h2>
      <div className="card p-3">
        <ItemForm />
      </div>
    </div>
  );
}
