const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cms"
});

con.connect(function (err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + con.threadId);
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname) + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to delete a post
app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  con.query("DELETE FROM posts WHERE post_id = ?", [postId], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Database error');
      return;
    }
    if (result.affectedRows > 0) {
      res.status(200).send('Post deleted successfully');
    } else {
      res.status(404).send('Post not found');
    }
  });
});

// Route to fetch all posts
app.get('/api/posts', (req, res) => {
  const updateData = req.session.name;
  const title = req.session.title;
  con.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Database error');
      return;
    }
    res.json({ sessionData: { updateData, title }, sqlData: result });
  });
});

// Route to fetch a post by ID
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  con.query("SELECT * FROM posts WHERE post_id = ?", [postId], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Database error');
      return;
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('Post not found');
    }
  });
});

// Route to insert a new post
app.post('/api/posts', upload.single("image"), (req, res) => {
  const { title, content, name } = req.body;
  const image = req.file ? req.file.path : null;
  const imagePath = image ? image.substring(14) : null;
  
  con.query("SELECT * FROM posts WHERE post_title = ?", [title], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Database error');
      return;
    }
    if (results.length > 0) {
      res.status(400).send('Post with the same title already exists');
      return;
    }

    con.query(
      "INSERT INTO posts (post_title, post_content, post_image) VALUES (?, ?, ?)",
      [title, content, imagePath],
      (err, result) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Database error');
          return;
        }
        if (title === "idol") {
          req.session.title = title;
        } else {
          req.session.title = "You are not my idol";
        }
        res.status(201).json({ id: result.insertId, title, content, imagePath, sessionTitle: req.session.title });
      }
    );
  });
});

// Route to update a post
app.put('/api/posts/:id', (req, res) => {
  req.session.name = "Phanit, you have been updating data";
  const postId = req.params.id;
  const { title, content } = req.body;

  con.query(
    "UPDATE posts SET post_title = ?, post_content = ? WHERE post_id = ?",
    [title, content, postId],
    (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Database error');
        return;
      }
      if (result.affectedRows > 0) {
        res.status(200).send('Post updated successfully');
      } else {
        res.status(404).send('Post not found');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
