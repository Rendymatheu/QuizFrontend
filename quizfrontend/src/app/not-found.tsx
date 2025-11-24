// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Halaman tidak ditemukan — mungkin linknya salah atau halaman sudah dihapus.</p>
      <Link href="/" className="btn btn-success">Kembali ke Home</Link>
    </div>
  );
}
