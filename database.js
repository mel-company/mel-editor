import sqlite3 from 'sqlite3';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, 'stores.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS stores (
            store_id TEXT PRIMARY KEY,
            template_id TEXT,
            json TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table: ' + err.message);
            } else {
                console.log('Stores table ready.');
            }
        });
    }
});

export default db;
