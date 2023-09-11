const TOKEN = process.env.MAILER_API_KEY;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send('Authorization is required');
    return;
  }

  const userToken = authHeader.split(' ')[1];

  if (userToken !== TOKEN) {
    res.status(401).send('Authorization is required');
    return;
  }

  next();
}

export default auth;