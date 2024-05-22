const path = require('path');
const fs = require('fs');

const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, 'database.sqlite');
console.log("=========================================");
console.log({ dbPath });
console.log("=========================================");

if (!fs.existsSync(dbPath)) {
    try {
        // Attempt to create the database file
        fs.closeSync(fs.openSync(dbPath, 'w'));
        console.log('Database file created successfully.');
    } catch (error) {
        console.error('Error creating database file:', error);
    }
}

const db = new Database(dbPath);


// Create the table if it doesn't exist
db.exec('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT UNIQUE, quantity INTEGER)');

const DatabaseAPI = {
    getProducts: () => {
        try {
            const rows = db.prepare('SELECT * FROM products').all();
            return Promise.resolve(rows);
        } catch (err) {
            return Promise.reject(err);
        }
    },
    createProduct: (name, quantity) => {
        try {
            const info = db.prepare('INSERT INTO products (name, quantity) VALUES (?, ?)').run(name, quantity);
            return Promise.resolve({ id: info.lastInsertRowid });
        } catch (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return Promise.reject(new Error('Product name must be unique.'));
            }
            return Promise.reject(err);
        }
    },
    updateProductQuantity: (id, quantity) => {
        try {
            const info = db.prepare('UPDATE products SET quantity = quantity + ? WHERE id = ?').run(quantity, id);
            return Promise.resolve({ changes: info.changes });
        } catch (err) {
            return Promise.reject(err);
        }
    },
};

module.exports = DatabaseAPI;
