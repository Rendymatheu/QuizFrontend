// app/page.tsx (server component)
import React from "react";

export default function Home() {
  return (
    <main className="mx-auto" style={{ maxWidth: 900 }}>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h1 className="card-title display-6">QuizFrontend</h1>
          <p className="card-text lead">
            Nama: <strong>Rendy Matheu</strong> <br />
            NIM: <strong>535240129</strong> <br />
            Topik Project: <strong>Plant Care Tracker — web app untuk mencatat tanaman rumah</strong>
          </p>
          <p>
            Project ini memungkinkan pengguna menambahkan tanaman (create), melihat list, edit, delete, dan melihat detail masing-masing tanaman. Juga menampilkan data tanaman dari public API (OpenFarm).
          </p>
          <a className="btn btn-success me-2" href="/items">Lihat Plants</a>
          <a className="btn btn-outline-success" href="/explore">Explore API</a>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5>Fitur</h5>
              <ul>
                <li>CRUD Plants (SQLite + Prisma)</li>
                <li>Dynamic routing: /items/[id]</li>
                <li>External API: OpenFarm</li>
                <li>Bootstrap styling</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5>Petunjuk singkat</h5>
              <ol>
                <li>npm run migrate (prisma)</li>
                <li>npm run dev</li>
                <li>Buka <code>/items</code> untuk menambah dan mengelola tanaman</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
