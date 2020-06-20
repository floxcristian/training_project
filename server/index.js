const express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('./config');

const app = express();

app.use(express.json());

// login
app.post('/api/auth/token', function (req, res, next) {
  console.log(req.body);
  const { email, username, name } = req.body;
  console.log(email, username, name);
  const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret);
  res.json({ access_token: token });
});

// verifica el token
app.get('/api/auth/verify', (req, res, next) => {
  const { access_token } = req.query;
  try {
    const decode = jwt.verify(access_token, config.authJwtSecret);
    console.log(decode);
    res.json({
      message: 'access token is valid',
      username: decode.sub,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/login', (req, res, next) => {
  try {
    res.redirect('https://'); // reedireccionar a spotify
  } catch (err) {
    next(err);
  }
});

const server = app.listen(5000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
