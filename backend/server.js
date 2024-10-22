const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "your_jwt_secret_key"; // Define your JWT secret key

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "", // Your MySQL password if set
  port: "3306", // Default MySQL port for XAMPP
  database: "task_management", // Your database name
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate fields
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const sql =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [username, email, hashedPassword, role], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error registering user" });

      res.status(200).json({ message: "User registered successfully!" });
    });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Include user role
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token, role: user.role });
  });
});

// Other endpoints (students, etc.) here...

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
