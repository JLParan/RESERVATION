const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
  });

// Connect to the SQLite database
const db = new sqlite3.Database('./database/reservation.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1); // Exit the server if database connection fails
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// API: Add booking
app.post('/api/book', (req, res) => {
  const { name, room, date, time } = req.body;
  db.run('INSERT INTO bookings (name, room, date, time) VALUES (?, ?, ?, ?)',
    [name, room, date, time],
    function(err) {
      if (err) {
        console.error('Error inserting booking:', err.message);
        return res.status(500).send(err.message);
      }
      res.send({ id: this.lastID });
    }
  );
});

// API: Get bookings
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings', [], (err, rows) => {
    if (err) {
      console.error('Error fetching bookings:', err.message);
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
