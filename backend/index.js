// Create a simple server to connect with phpmyadmin and get data from the database.

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 4000; // Changed port to 4000 to avoid conflicts

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

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

app.get('/events', (req, res) => {
    db.query('SELECT * FROM events', (err, result) => {
        if (err) {
            throw err;
        }
        // res.send(result);
        res.json(result);
    });
});

// Get event details by event_id
app.get('/events/event_content/:event_id', (req, res) => {
    console.log("Request received for event:", req.params.event_id);  // Add this log
    const { event_id } = req.params;  // Correct destructuring
    db.query('SELECT * FROM events WHERE event_id = ?', [event_id], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching event details');
        }
        if (result.length > 0) {
            res.json(result[0]);            
        } else {
            res.status(404).send('Event not found');
        }
    });
});

// create a new event
app.post('/events/create', (req, res) => {
    const { title, image, description, article, date, location } = req.body;
    const articleString = article.join('\n'); // Join paragraphs into a single string with newline characters
    const query = 'INSERT INTO events (title, image, description, article, date, location) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [title, image, description, articleString, date, location];

    db.query(query, values, (err) => {
        if (err) {
            console.error('Error creating event:', err); // Log the specific error
            return res.status(500).send('Error creating event');
        }
        res.status(201).send('Event created successfully');
    });
});

app.get('/list-users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


app.get('/home', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});