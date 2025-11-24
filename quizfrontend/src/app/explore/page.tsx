// app/explore/page.tsx
import React from "react";

type Crop = {
  id: string;
  attributes: {
    name: string;
    description: string | null;
  };
};

export default async function ExplorePage() {
  const q = "indoor";
  let crops: Crop[] = [];
  let error = null;

  try {
    const res = await fetch(
      `https://openfarm.cc/api/v1/crops?filter=${encodeURIComponent(q)}`,
      {
        next: { revalidate: 60 * 60 },
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    // Cek apakah response berhasil
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    // Cek content-type
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Response is not JSON:", text);
      throw new Error("API returned HTML instead of JSON");
    }

    const json = await res.json();
    crops = json?.data ?? [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
    console.error("Fetch error:", err);
  }

  return (
    <div>
      <h2>Explore plants (OpenFarm)</h2>
      <p>Showing results for "<strong>{q}</strong>"</p>

      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="row">
        {!error && crops.length === 0 && (
          <div className="alert alert-info">No results from API.</div>
        )}
        {crops.map((c) => (
          <div className="col-md-6" key={c.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>{c.attributes.name}</h5>
                <p>{c.attributes.description ?? "No description."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
