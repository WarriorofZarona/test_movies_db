const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: process.env.DBPASSWORD,
    database: 'movie_db',
  },
  console.log(`Connected to the movie_db database.`)
);

app.get('/api/movies', (req, res) => {
  const sql = 'SELECT * FROM movies';

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: results,
    });
  });
});

app.get('/api/movie-reviews', (req, res) => {
  const sql =
    'SELECT movies.movie_name, reviews.review FROM movies JOIN reviews on reviews.movie_id = movies.id;';

  db.query(sql, null, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: results,
    });
  });
});

app.post('/api/add-movie', ({ body }, res) => {
  const sql = 'INSERT INTO MOVIES (movie_name) VALUES (?)';

  const params = body.movie_name;

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: results,
    });
  });
});

app.put('/api/review/:id', (req, res) => {
  const id = req.params.id;
  const review = req.body.review;

  const sql = 'UPDATE reviews SET review = ? WHERE id = ?';

  const params = [review, id];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: results,
    });
  });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
