const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;
const secret = 'your_jwt_secret';

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usertable'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Register User
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.status(201).send({ message: 'User registered' });
  });
});

// Login User
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 }); // 24 hours
    res.status(200).send({ auth: true, token: token });
  });
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
}

// Protected Route
app.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).send('Welcome to the protected route, user ' + req.userId);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
