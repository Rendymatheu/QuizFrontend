// app/explore/page.tsx
"use client";

import React, { useState } from "react";

const MOCK_PLANTS = [
  {
    id: "1",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    description: "Popular vegetable plant, easy to grow indoors with proper light. Requires 6-8 hours of sunlight daily.",
    category: "Vegetable",
    difficulty: "Medium"
  },
  {
    id: "2",
    name: "Basil",
    scientificName: "Ocimum basilicum",
    description: "Aromatic herb, great for indoor gardening and cooking. Loves warmth and sunlight.",
    category: "Herb",
    difficulty: "Easy"
  },
  {
    id: "3",
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    description: "Low-maintenance indoor plant, perfect for beginners. Can tolerate low light conditions.",
    category: "Houseplant",
    difficulty: "Easy"
  },
  {
    id: "4",
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    description: "Hardy indoor plant that tolerates low light. Very drought-tolerant and air-purifying.",
    category: "Houseplant",
    difficulty: "Easy"
  },
  {
    id: "5",
    name: "Mint",
    scientificName: "Mentha",
    description: "Fast-growing herb, excellent for indoor containers. Needs consistent moisture.",
    category: "Herb",
    difficulty: "Easy"
  },
  {
    id: "6",
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    description: "Easy-care plant that produces baby plants. Great for hanging baskets.",
    category: "Houseplant",
    difficulty: "Easy"
  },
  {
    id: "7",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    description: "Succulent plant with medicinal properties. Requires minimal watering.",
    category: "Succulent",
    difficulty: "Easy"
  },
  {
    id: "8",
    name: "Peace Lily",
    scientificName: "Spathiphyllum",
    description: "Beautiful flowering plant that thrives in low light. Excellent air purifier.",
    category: "Houseplant",
    difficulty: "Medium"
  },
  {
    id: "9",
    name: "Cilantro",
    scientificName: "Coriandrum sativum",
    description: "Popular herb for cooking. Grows quickly but bolts in heat.",
    category: "Herb",
    difficulty: "Medium"
  },
  {
    id: "10",
    name: "Lavender",
    scientificName: "Lavandula",
    description: "Fragrant herb with purple flowers. Needs lots of sunlight and good drainage.",
    category: "Herb",
    difficulty: "Hard"
  },
  {
    id: "11",
    name: "Monstera",
    scientificName: "Monstera deliciosa",
    description: "Trendy houseplant with split leaves. Prefers bright indirect light.",
    category: "Houseplant",
    difficulty: "Medium"
  },
  {
    id: "12",
    name: "Jade Plant",
    scientificName: "Crassula ovata",
    description: "Succulent with thick, glossy leaves. Symbol of good luck in some cultures.",
    category: "Succulent",
    difficulty: "Easy"
  },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ FIX: Gunakan Array.from() instead of spread operator
  const categories = ["All", ...Array.from(new Set(MOCK_PLANTS.map(p => p.category)))];

  const filtered = MOCK_PLANTS.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "success";
      case "Medium": return "warning";
      case "Hard": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div>
      <h2 className="mb-4">Explore Plants</h2>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, scientific name, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select 
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-muted">
        Showing {filtered.length} of {MOCK_PLANTS.length} plants
      </p>

      <div className="row">
        {filtered.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-primary me-2">{p.category}</span>
                  <span className={`badge bg-${getDifficultyColor(p.difficulty)}`}>
                    {p.difficulty}
                  </span>
                </div>
                <h5 className="card-title">{p.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <em>{p.scientificName}</em>
                </h6>
                <p className="card-text flex-grow-1">{p.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info">
              No plants found matching your search. Try different keywords or category.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}