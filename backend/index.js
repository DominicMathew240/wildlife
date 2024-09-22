// Create a simple server to connect with phpmyadmin and get data from the database.

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 4000; // Changed port to 4000 to avoid conflicts

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wildlife'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get('/getAnimals', (req, res) => {
    db.query('SELECT * FROM animals', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.get('/home', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});