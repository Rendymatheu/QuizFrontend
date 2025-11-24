// app/layout.tsx
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export const metadata = {
  title: "Plant Care Tracker",
  description: "Simpan data tanamanmu dengan mudah",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-dark bg-success mb-4">
          <div className="container">
            <a className="navbar-brand" href="/">Plant Care Tracker</a>
            <a href="/items" className="btn btn-sm btn-light">My Plants</a>
            <a href="/explore" className="btn btn-sm btn-outline-light ms-2">Explore Plants</a>
          </div>
        </nav>
        <div className="container">{children}</div>
        <footer className="text-center mt-5 mb-3 text-muted">Made for Coursework • 2025</footer>
      </body>
    </html>
  );
}
