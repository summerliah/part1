const express = require("express");

const mysql = require("mysql");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.json());

// MySQL connection

const db = mysql.createConnection({
  host: "localhost",

  user: "root",

  port: "3306",

  database: "task_management",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Login route
app.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  const sql =
    "SELECT * FROM users WHERE username = ? AND password = ? AND role = ?";
  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Database query error" });
    } else if (result.length > 0) {
      res.json({ message: `Welcome ${role}!` });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

// Get all students

app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

// Add a new student

app.post("/students", (req, res) => {
  const { task_title, task_description } = req.body;

  const sql =
    "INSERT INTO students (task_title, task_description) VALUES (?, ?)";

  db.query(sql, [task_title, task_description], (err, result) => {
    if (err) throw err;

    res.json({ id: result.insertId, ...req.body });
  });
});

// Update a student

app.put("/students/:id", (req, res) => {
  const { id } = req.params;

  const { task_title, task_description } = req.body;

  const sql =
    "UPDATE students SET task_title = ?, task_description = ? WHERE id = ?";

  db.query(sql, [task_title, task_description, id], (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

// Delete a student

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

// Start the server

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
