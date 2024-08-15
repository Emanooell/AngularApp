const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

const dbPath = path.join(__dirname, "db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

app.get("/users", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

app.post("/users", (req, res) => {
  const db = readDB();
  const newUser = req.body;
  newUser.id = Date.now().toString();
  db.users.push(newUser);
  saveDB(db);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const db = readDB();
  const userIndex = db.users.findIndex((user) => user.id === req.params.id);

  if (userIndex !== -1) {
    db.users[userIndex] = { ...db.users[userIndex], ...req.body };
    saveDB(db);
    res.json(db.users[userIndex]);
  } else {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
});

app.delete("/users/:id", (req, res) => {
  const db = readDB();
  const newUsers = db.users.filter((user) => user.id !== req.params.id);

  if (newUsers.length !== db.users.length) {
    db.users = newUsers;
    saveDB(db);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
});

app.get("/books", (req, res) => {
  const db = readDB();
  res.json(db.books);
});

app.post("/books", (req, res) => {
  const db = readDB();
  const newBook = req.body;
  newBook.id = Date.now().toString();
  db.books.push(newBook);
  saveDB(db);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const db = readDB();
  const bookIndex = db.books.findIndex((book) => book.id === req.params.id);

  if (bookIndex !== -1) {
    db.books[bookIndex] = { ...db.books[bookIndex], ...req.body };
    saveDB(db);
    res.json(db.books[bookIndex]);
  } else {
    res.status(404).json({ error: "Livro não encontrado" });
  }
});

app.delete("/books/:id", (req, res) => {
  const db = readDB();
  const newBooks = db.books.filter((book) => book.id !== req.params.id);

  if (newBooks.length !== db.books.length) {
    db.books = newBooks;
    saveDB(db);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Livro não encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
