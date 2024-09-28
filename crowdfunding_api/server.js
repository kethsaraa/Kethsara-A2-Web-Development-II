const express = require('express');
const db = require('./crowdfunding_db'); // Import the database connection

const app = express();

app.use(express.static('website'));

// Test route to check database connection
app.get('/test', (req, res) => {
    db.query('SELECT * FROM FUNDRAISER', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});


// 1. Get all active fundraisers including their categories
app.get('/fundraisers', (req, res) => {
    const sql = `
    SELECT f.*, c.NAME AS CATEGORY_NAME 
    FROM FUNDRAISER f 
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
    WHERE f.ACTIVE = 1`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('Error fetching data');
        res.json(results);
    });
});

// 2. Get all categories
app.get('/categories', (req, res) => {
    const sql = "SELECT * FROM CATEGORY";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('Error fetching data');
        res.json(results);
    });
});

// 3. Get active fundraisers based on category or city (search)
app.get('/search', (req, res) => {
    const { category, city } = req.query;
    const sql = `
    SELECT f.*, c.NAME AS CATEGORY_NAME 
    FROM FUNDRAISER f 
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
    WHERE f.ACTIVE = 1 AND (c.NAME = ? OR f.CITY = ?)`;
    db.query(sql, [category, city], (err, results) => {
        if (err) return res.status(500).send('Error fetching data');
        res.json(results);
    });
});

// 4. Get fundraiser details by ID
app.get('/fundraiser/:id', (req, res) => {
    const sql = `
    SELECT f.*, c.NAME AS CATEGORY_NAME 
    FROM FUNDRAISER f 
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
    WHERE f.FUNDRAISER_ID = ?`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Error fetching data');
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Fundraiser not found');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
