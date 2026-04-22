const express = require('express');

const sql = require('mssql');
 
const app = express();

app.use(express.json());
 
app.get('/', (req, res) => {

    res.send("API is running 🚀");

});
 
app.post('/order', async (req, res) => {

    try {

        const { item, quantity } = req.body;
 
        const pool = await sql.connect(process.env.DB_CONNECTION);
 
        await pool.request()

            .input('item', sql.NVarChar, item)

            .input('quantity', sql.Int, quantity)

            .query('INSERT INTO Orders (item, quantity) VALUES (@item, @quantity)');
 
        res.send("Order placed!");

    } catch (err) {

        res.status(500).send(err.message);

    }

});
 
app.listen(process.env.PORT || 3000);
 