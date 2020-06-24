// https://www.returngis.net/2019/04/ejemplo-de-authorization-code-flow-de-oauth-2-0/

const express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('./config');
const fs = require('fs').promises;
const { google } = require('googleapis');
const SCOPES = require('./utils/scopes');
const cors = require('cors');

const app = express();

app.use(express.json());
app
  .use(
    express.urlencoded({
      extended: false
    })
  )
  .use(
    cors({
      origin: '*'
    })
  );

// Firma el token (login)
app.post('/api/auth/token', (req, res, next) => {
  console.log(req.body);
  const { email, username, name } = req.body;
  console.log(email, username, name);
  // Esto es bastante bueno: si publica la clave pública pero conserva la clave privada para usted, solo usted puede firmar tokens, pero cualquiera puede verificar si un token dado está firmado correctamente.
  // atacante tiene acceso a la clave publica y puede enviar un token al servidor especificando un algoritmo HMAC, con lo que el servidor pensara que la clave publica es en realidad la clave secreta de HMAC.
  // en el payload usar el claim kid:
  /*const SIGN_OPTIONS = {
    algorithm: 'RS256', // algoritmo asimétrico. Token se crea y firma con una clave privada, pero se verifican con la clave pública.
    expiresIn: '15m'
  };*/
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

app.get('/api/v1/login', async (req, res, next) => {
  try {
    const { code } = req.query;
    //const { tokens } = await oAuth2Client.getToken(code);
    //console.log('tokens: ', tokens);
    res.redirect(`http://localhost:4200/home?code=${code}`);
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

//==================================
//=== OAUTH
//==================================
// Set 1: Ask the authorization code
app.get('/api/authorize', (req, res, next) => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('authorize...');
    //res.redirect(authUrl); // reedireccionar
    res.send({
      authUrl
    });
  } catch (err) {
    next(err);
  }
});

let oAuth2Client;
const server = app.listen(8080, async () => {
  console.log(`Listening http://localhost:${server.address().port}`);
  const credentials = JSON.parse(await fs.readFile('credentials.json'));
  const { client_secret, client_id, redirect_uris } = credentials.web;
  oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
});
