export interface Item {
  id?: number;       // ID optional karena akan diisi otomatis oleh SQLite
  title: string;      // Nama item
  description: string; // Deskripsi item
  created_at?: string; // Optional timestamp
}