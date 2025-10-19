import * as SQLite from 'expo-sqlite';
import { Item } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync('items.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const fetchItems = async (): Promise<Item[]> => {
  if (!db) db = await SQLite.openDatabaseAsync('items.db');
  const rows = await db.getAllAsync<Item>('SELECT * FROM items ORDER BY id DESC');
  return rows;
};

export const insertItem = async (item: Item) => {
  if (!db) db = await SQLite.openDatabaseAsync('items.db');
  await db.runAsync('INSERT INTO items (title, description) VALUES (?, ?)', [
    item.title,
    item.description,
  ]);
};

export const updateItem = async (item: Item) => {
  if (!db) db = await SQLite.openDatabaseAsync('items.db');
  await db.runAsync(
    'UPDATE items SET title = ?, description = ? WHERE id = ?',
    [item.title, item.description, item.id!]
  );
};

export const deleteItem = async (id: number) => {
  if (!db) db = await SQLite.openDatabaseAsync('items.db');
  await db.runAsync('DELETE FROM items WHERE id = ?', [id]);
};