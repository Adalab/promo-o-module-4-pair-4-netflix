const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const users = require('./data/users.json');
// create and config server
const app = express();
app.use(cors());
app.use(express.json());

// init express aplication
const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

app.get('/movies', (req, res) => {
  console.log(movies);
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

//static server
const staticServerPathWeb = './public-react';
app.use(express.static(staticServerPathWeb));

const staticServerPathImage = './src/public-movies-images';
app.use(express.static(staticServerPathImage));
