import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello ");
});

app.get("/phones", (req, res) => {
  const q = "SELECT * FROM phones";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/phones", (req, res) => {
  const q =
    "INSERT INTO phones (`title`, `price`, `description`, `imageURL`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageURL
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("successfully");
  });
});

app.get("/phones/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM phones WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update phones

app.put("/updatephone/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE phones SET `title` = ?, `price` = ?, `description` = ?, `imageURL`= ? WHERE id = ?";

  const value = [
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageURL
  ];

  db.query(sql, [...value, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/deletephone/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM phones WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(3001, () => {
  console.log("Đã kết nối http://localhost:3001");
});
