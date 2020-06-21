const express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('./config');

const app = express();

app.use(express.json());

// Firma el token (login)
app.post('/api/auth/token', (req, res, next) => {
  console.log(req.body);
  const { email, username, name } = req.body;
  console.log(email, username, name);
  // Esto es bastante bueno: si publica la clave pública pero conserva la clave privada para usted, solo usted puede firmar tokens, pero cualquiera puede verificar si un token dado está firmado correctamente.
  // atacante tiene acceso a la clave publica y puede enviar un token al servidor especificando un algoritmo HMAC, con lo que el servidor pensara que la clave publica es en realidad la clave secreta de HMAC.
  // en el payload usar el claim kid:
  const SIGN_OPTIONS = {
    algorithm: 'RS256', // algoritmo asimétrico. Token se crea y firma con una clave privada, pero se verifican con la clave pública.
    expiresIn: '15m'
  };
  const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret, SIGN_OPTIONS);
  res.json({ access_token: token });
});

// Verifica si la firma del JWT es válida
app.get('/api/auth/verify', (req, res, next) => {
  const { access_token } = req.query; // cambiarlo a header
  try {
    const decode = jwt.verify(access_token, config.authJwtSecret);
    console.log(decode);
    res.json({
      message: 'access token is valid',
      username: decode.sub
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

function generateToken(payload) {
  const SIGN_OPTIONS = {
    algorithm: 'RS256',
    expiresIn: '1h'
  };
  return (token = jwt.sign(payload, config.authJwtSecret, SIGN_OPTIONS));
}

const server = app.listen(5000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
