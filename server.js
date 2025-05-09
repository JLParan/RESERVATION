const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Connect to the database
const db = new sqlite3.Database('./database/reservation.db', (err) => {
    if (err) {
        console.error('Error connecting to DB:', err.message);
    } else {
        console.log('Connected to the reservation.db');
    }
});

// Make DB accessible globally (optional)
app.locals.db = db;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the adminNotif.html directly
app.get('/admin/notifications', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adminNotif.html'));
});

// API route to fetch notifications
// API route to fetch notifications directly from Reservation table
app.get('/api/notifications', (req, res) => {
    db.all(`
        SELECT 
            reservationID, 
            fullName, 
            date, 
            start_time, 
            end_time, 
            datetime('now') as created_at
        FROM Reservation
        ORDER BY reservationID DESC
    `, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch notifications' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
