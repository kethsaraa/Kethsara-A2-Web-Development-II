app.get('/fundraisers', (req, res) => {
    const sql = `
        SELECT F.*, C.NAME AS CATEGORY_NAME
        FROM FUNDRAISER F
        JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
        WHERE F.ACTIVE = 1
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('Error fetching data');
        res.json(results);
    });
});

app.get('/categories', (req, res) => {
    db.query('SELECT * FROM CATEGORY', (err, results) => {
        if (err) return res.status(500).send('Error fetching data');
        res.json(results);
    });
});
