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

// List Product

app.get("/phones", (req, res) => {
  const q = "SELECT * FROM phones";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// add Product

app.post("/phones", (req, res) => {
  const sql =
    "INSERT INTO phones (`title`, `price`, `description`, `imageURL`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageURL
  ];

  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("successfully");
  });
});

// detail product

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

//  Delete product

app.delete("/deletephone/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM phones WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// list users

app.get("/user", (req, res) => {
  const q = "SELECT * FROM user";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Register users

app.post("/register", (req, res) => {
  const { email, username, password, firstname, lastname, fullname, role } =
    req.body;

  // Check if the user already exists in the database using their email or username
  const checkUserExistsQuery =
    "SELECT * FROM user WHERE email = ? OR username = ?";
  db.query(checkUserExistsQuery, [email, username], (err, rows) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // If a user with the provided email or username already exists, return an error
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // If the user does not exist, proceed with user registration
    const insertUserQuery =
      "INSERT INTO user (`email`, `username`, `password`, `firstname`, `lastname`, `fullname`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      email,
      username,
      password,
      firstname,
      lastname,
      fullname,
      role
    ];

    db.query(insertUserQuery, values, (err, data) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: "Error registering user" });
      }

      // User registration successful
      res.json({ message: "User registered successfully" });
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE username = ? AND password = ? ";
  const values = [req.body.username, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      req.setEncoding({ err: err });
    } else {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.send({ message: "Tài khoản hoặc mật khẩu sai" });
      }
    }
  });
});

app.listen(3001, () => {
  console.log("Đã kết nối http://localhost:3001");
});
