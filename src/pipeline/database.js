import sqlite3 from 'sqlite3';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, '../../stores.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // 1. Create table if not exists with new schema
        db.run(`CREATE TABLE IF NOT EXISTS stores (
            store_id TEXT PRIMARY KEY,
            template_id TEXT,
            json TEXT,
            published_json TEXT,
            subdomain TEXT UNIQUE
        )`, (err) => {
            if (err) {
                console.error('Error creating table: ' + err.message);
            } else {
                console.log('Stores table ready.');

                // 2. Migration: Check if published_json exists (for existing dbs)
                db.run(`ALTER TABLE stores ADD COLUMN published_json TEXT`, (alterErr) => {
                    // Ignore error if column already exists
                    if (alterErr && !alterErr.message.includes('duplicate column name')) {
                        console.log('Migration note: ' + alterErr.message);
                    } else if (!alterErr) {
                        console.log('Migration success: stored added published_json column');
                    }
                });

                // 3. Migration: Add subdomain column
                db.run(`ALTER TABLE stores ADD COLUMN subdomain TEXT`, (alterErr) => {
                    if (alterErr && !alterErr.message.includes('duplicate column name')) {
                        console.log('Migration note: ' + alterErr.message);
                    } else {
                        if (!alterErr) console.log('Migration success: stored added subdomain column');

                        // Set default subdomain for existing store-1 AND auto-publish it for immediate demo
                        // We run this regardless of whether column was just added or already existed

                        // Try to update store-1 specificall first
                        db.run(`UPDATE stores SET subdomain = 'demo', published_json = json WHERE store_id = 'store-1'`, function (err) {
                            if (!err && this.changes === 0) {
                                // If store-1 didn't exist (changes=0), try to set ANY existing store to 'demo' if it has no subdomain
                                console.log('store-1 not found, assigning demo to first available store...');
                                db.run(`UPDATE stores SET subdomain = 'demo', published_json = json WHERE subdomain IS NULL OR subdomain = '' LIMIT 1`);
                            } else if (!err) {
                                console.log("Ensure store-1 is mapped to demo and published.");
                            }
                        });
                    }
                });
            }
        });
    }
});

export function getStoreById(storeId) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT json FROM stores WHERE store_id = ?`, [storeId], (err, row) => {
            if (err) {
                console.error('Database Error:', err);
                reject(err);
                return;
            }
            if (!row || !row.json) {
                resolve(null);
                return;
            }
            try {
                const storeData = JSON.parse(row.json);
                resolve(storeData);
            } catch (parseErr) {
                console.error('JSON Parse Error:', parseErr);
                reject(parseErr);
            }
        });
    });
}

export default db;
