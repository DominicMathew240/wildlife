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
    const articleString = Array.isArray(article) ? article.join('\n') : article; // Join paragraphs into a single string with newline characters if article is an array
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

// Edit an existing event
// Create a simple put with the  console success message
app.put('/events/edit/:event_id', (req, res) => {
    const { event_id } = req.params;
    const { title, image, description, article, date, location } = req.body;
    const articleString = Array.isArray(article) ? article.join('\n') : article; // Join paragraphs into a single string with newline characters if article is an array

    console.log(`Received request to edit event with ID: ${event_id}`); // Log the event_id
    console.log('Request body:', req.body); // Log the request body

    // Check if the event_id exists in the database
    db.query('SELECT * FROM events WHERE event_id = ?', [event_id], (err, result) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).send('Error fetching event');
        }
        if (result.length === 0) {
            return res.status(404).send('Event not found');
        }

        // Prepare the update query and values
        let query = 'UPDATE events SET title = ?, description = ?, article = ?, date = ?, location = ? WHERE event_id = ?';
        let values = [title, description, articleString, date, location, event_id];

        // Include image field only if it is not empty
        if (image) {
            query = 'UPDATE events SET title = ?, image = ?, description = ?, article = ?, date = ?, location = ? WHERE event_id = ?';
            values = [title, image, description, articleString, date, location, event_id];
        }

        // Proceed with updating the event
        db.query(query, values, (err) => {
            if (err) {
                console.error('Error updating event:', err); // Log the specific error
                return res.status(500).send('Error updating event');
            }
            res.send('Event updated successfully');
        });
    });
});

// Delete an event by event_id
app.delete('/events/delete/:event_id', (req, res) => {
    const { event_id } = req.params;

    console.log(`Received request to delete event with ID: ${event_id}`); // Log the event_id

    // Check if the event_id exists in the database
    db.query('SELECT * FROM events WHERE event_id = ?', [event_id], (err, result) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).send('Error fetching event');
        }
        if (result.length === 0) {
            return res.status(404).send('Event not found');
        }

        // Proceed with deleting the event
        db.query('DELETE FROM events WHERE event_id = ?', [event_id], (err) => {
            if (err) {
                console.error('Error deleting event:', err); // Log the specific error
                return res.status(500).send('Error deleting event');
            }
            res.send('Event deleted successfully');
        });
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