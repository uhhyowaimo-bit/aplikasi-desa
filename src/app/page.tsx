// app/page.tsx
import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect pengguna ke halaman beranda
  redirect("/beranda");

  // Kamu bisa return null karena tidak ada yang perlu dirender
  return null;
}
