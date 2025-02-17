const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Add your MySQL password
  database: "valentines_db",
});

db.connect((err) => {
  if (err) console.error("Database Connection Error:", err);
  else console.log("Connected to MySQL Database!");
});

// API to Save Recipient
app.post("/add-recipient", (req, res) => {
  const { name, phone, relation } = req.body;
  const sql = "INSERT INTO recipients (name, phone, relation) VALUES (?, ?, ?)";
  db.query(sql, [name, phone, relation], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, id: result.insertId });
  });
});

// API to Fetch Recipients
app.get("/recipients", (req, res) => {
  db.query("SELECT * FROM recipients", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
