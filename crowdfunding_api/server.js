const express = require('express');
const db = require('./crowdfunding_db');
const app = express();

app.get('/test', (req, res) => {
    db.query('SELECT * FROM FUNDRAISER', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
