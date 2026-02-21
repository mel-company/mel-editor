import { Injectable } from '@nestjs/common';
import sqlite3 from 'sqlite3';
import path from 'path';

@Injectable()
export class DatabaseService {
  private db: sqlite3.Database | null = null;

  async getDatabase(): Promise<sqlite3.Database> {
    if (this.db) {
      return this.db;
    }

    const dbPath = path.resolve(process.cwd(), 'stores.db');

    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          this.initializeTables();
          resolve(this.db!);
        }
      });
    });
  }

  private initializeTables() {
    if (!this.db) return;

    this.db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL,
        category TEXT,
        image TEXT
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        route TEXT NOT NULL UNIQUE,
        store TEXT NOT NULL
      )
    `);
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db!.close((err) => {
          if (err) reject(err);
          else {
            this.db = null;
            resolve();
          }
        });
      });
    }
  }
}
