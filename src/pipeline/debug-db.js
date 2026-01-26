import db from './database.js';

console.log('Checking database content...');

db.all(`SELECT * FROM stores`, [], (err, rows) => {
    if (err) {
        return console.error('Error querying data:', err.message);
    }
    if (!rows || rows.length === 0) {
        console.log('No rows found in stores table.');
        return;
    }
    console.log(`Found ${rows.length} rows:`);
    rows.forEach(row => {
        console.log('--------------------------------------------------');
        console.log('Store ID:', row.store_id);
        if (row.json) {
            try {
                const data = JSON.parse(row.json);
                console.log('JSON Keys:', Object.keys(data));
                console.log('editor-pages-storage size:', data['editor-pages-storage'] ? data['editor-pages-storage'].length : 'MISSING');
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.log('JSON column is empty or null');
        }
    });
});
