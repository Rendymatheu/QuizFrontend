// components/ItemForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ItemForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Cek content type response
      const contentType = res.headers.get("content-type");
      
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Response is HTML:", text);
        throw new Error("API route not found. Check if /app/api/items/route.ts exists");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save");
      }

      alert("Plant saved successfully!");
      router.push("/items");
      router.refresh();
    } catch (error) {
      console.error("Submit error:", error);
      alert(error instanceof Error ? error.message : "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Plant Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Species</label>
        <input
          type="text"
          className="form-control"
          value={formData.species}
          onChange={(e) => setFormData({ ...formData, species: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea
          className="form-control"
          rows={4}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Saving..." : "Save Plant"}
      </button>
    </form>
  );
}