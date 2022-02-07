const express = require('express');
const cors = require('cors');

const users = require('./data/users.json');
const Database = require('better-sqlite3');

// create and config server
const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Import Database
const db = new Database('./src/db/database.db', {
  verbose: console.log,
});

//endpoints
app.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT * FROM movies WHERE gender = UPPER(?)`);
  const gender = `${req.query.gender}`;
  const movies = query.all(gender.toUpperCase());
  const response = {
    success: true,
    movies: movies,
  };
  res.json(response);
});

app.post('/login', (req, res) => {
  console.log(users);
  const response = {
    success: true,
    users: users,
  };
  res.json(response);
});

// endpoints with url params
app.get('/movie/:movieId', (req, res) => {
  const requestMovieId = req.params.movieId;
  console.log(requestMovieId);
  const movieData = movies.find((movie) => movie.id === requestMovieId);
  console.log(movieData);
  res.render('movie', movieData);
});

//static servers
const staticServerPathWeb = './public-react';
app.use(express.static(staticServerPathWeb));

const staticServerPathImage = './src/public-movies-images';
app.use(express.static(staticServerPathImage));

const staticServerPathCSS = './src/styles';
app.use(express.static(staticServerPathCSS));
