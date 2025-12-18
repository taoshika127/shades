import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Get the data directory path
function getDataDir(): string {
  // In development: __dirname = backend/src -> dataDir = backend/data
  // In production: __dirname = backend/dist -> dataDir = backend/data
  return path.join(__dirname, '../data');
}

// Ensure data directory exists and return the path
function ensureDataDir(): string {
  const dataDir = getDataDir();
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
}

// Create database connection - lazy initialization
let db: Database.Database | null = null;

function getDatabase(): Database.Database {
  if (!db) {
    const dataDir = ensureDataDir();
    const dbPath = path.join(dataDir, 'categories.db');
    db = new Database(dbPath);
    db.pragma('foreign_keys = ON');
  }
  return db;
}

// Initialize database schema
export function initializeDatabase() {
  const database = getDatabase();
  // Create categories table if it doesn't exist
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if categories table is empty and seed with initial data
  const count = database.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };

  if (count.count === 0) {
    const insert = database.prepare('INSERT INTO categories (name, image) VALUES (?, ?)');

    const initialCategories = [
      ['Zebra Shades', '/assets/home/zebra_shades.png'],
      ['Honeycomb Shades', '/assets/home/honeycomb_shades.png'],
      ['Roller Shades', '/assets/home/roller_shades.png'],
      ['Shangri-La Shades', '/assets/home/shangri-la_shades.png'],
      ['Roman Shades', '/assets/home/roman_shades.png'],
      ['Bamboo Shades', '/assets/home/bamboo_woven_wood_shades.png'],
      ['Draperies', '/assets/home/draperies.jpg'],
      ['Outdoor Shades', '/assets/home/outdoor_shades.jpg'],
      ['Dream Shades', '/assets/home/dream_shades.png'],
    ];

    const insertMany = database.transaction((categories) => {
      for (const category of categories) {
        insert.run(category[0], category[1]);
      }
    });

    insertMany(initialCategories);
    console.log('Database initialized with initial categories');
  }
}

// Category interface
export interface Category {
  id: number;
  name: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

// Database operations for categories
export const categoryDb = {
  // Get all categories
  getAll: (): Category[] => {
    const database = getDatabase();
    const stmt = database.prepare('SELECT * FROM categories ORDER BY id');
    return stmt.all() as Category[];
  },

  // Get category by ID
  getById: (id: number): Category | undefined => {
    const database = getDatabase();
    const stmt = database.prepare('SELECT * FROM categories WHERE id = ?');
    return stmt.get(id) as Category | undefined;
  },

  // Insert a new category
  insert: (name: string, image: string): Category => {
    const database = getDatabase();
    const stmt = database.prepare('INSERT INTO categories (name, image) VALUES (?, ?)');
    const result = stmt.run(name, image);

    const newCategory = categoryDb.getById(result.lastInsertRowid as number);
    if (!newCategory) {
      throw new Error('Failed to retrieve created category');
    }
    return newCategory;
  },

  // Update a category
  update: (id: number, name: string, image: string): Category | undefined => {
    const database = getDatabase();
    const stmt = database.prepare('UPDATE categories SET name = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(name, image, id);
    return categoryDb.getById(id);
  },

  // Delete a category
  delete: (id: number): boolean => {
    const database = getDatabase();
    const stmt = database.prepare('DELETE FROM categories WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
};

export default getDatabase;

