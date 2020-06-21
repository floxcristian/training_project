router.use('/secure', (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({
      ok: false,
      message: 'Toket inválido'
    });
  }

  token = token.replace('Bearer ', '');

  jwt.verify(token, 'pass', (err, token) => {
    if (err) {
      return res.status(401).send({
        ok: false,
        message: 'Token inválido'
      });
    } else {
      req.token = token;
      next();
    }
  });
});
