// https://www.returngis.net/2019/04/ejemplo-de-authorization-code-flow-de-oauth-2-0/

const express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('./config');
const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');
const SCOPES = require('./utils/scopes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

let OAuth2Client;

/**
 * To use OAuth2 authentication, we need access to a a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.
 * To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
 */
const getOAuthKeys = async (key_path) => {
  try {
    key_path = path.join(__dirname, key_path);
    const file_exists = await fs.stat(key_path);
    if (file_exists) return require(key_path).web;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Create a new OAuth2 client with the configured keys.
 */
const createOAuth2Client = (keys) => {
  return new google.auth.OAuth2(keys.client_id, keys.client_secret, keys.redirect_uris[0]);
};

// Init Web Server
const server = app.listen(8080, async () => {
  console.log(`Listening http://localhost:${server.address().port}`);
  const keys = await getOAuthKeys('oauth2.keys.json');
  OAuth2Client = createOAuth2Client(keys);
});

// Get authorization url
app.get('/api/v1/authorize', (req, res, next) => {
  try {
    const authUrl = OAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    res.status(200).send({ authUrl });
  } catch (err) {
    next(err);
  }
});

// Interact with Google
app.get('/api/v1/callback', async (req, res, next) => {
  try {
    const { code } = req.query;
    const { tokens } = await OAuth2Client.getToken(code);
    // Pasar cabeceras en el reedireccionamiento: https://stackoverflow.com/questions/39997413/how-to-pass-headers-while-doing-res-redirect-in-express-js
    //res.set(tokens);
    res.redirect(`http://localhost:4200/callback?tokens=${JSON.stringify(tokens)}`); // TODO: Best way to send code param?
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/gmail/labels', async (req, res, next) => {
  try {
    const { tokens } = req.body;
    if (tokens) {
      OAuth2Client.setCredentials(JSON.parse(tokens));
      const gmail = google.gmail({ version: 'v1', auth: OAuth2Client });
      const resp = await gmail.users.labels.list({ userId: 'me' });
      const labels = resp.data.labels;
      return res.send(labels);
    } else {
      return res.status(404).send({});
    }
  } catch (err) {
    next(err);
  }
});

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
  const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret);
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

/*
function generateToken(payload) {
  const SIGN_OPTIONS = {
    algorithm: 'RS256',
    expiresIn: '1h'
  };
  return (token = jwt.sign(payload, config.authJwtSecret, SIGN_OPTIONS));
}*/
