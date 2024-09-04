const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Permet à l'API de parser les corps des requêtes en JSON

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: "localhost", // Remplacez par votre hôte MySQL
  user: "root", // Remplacez par votre utilisateur MySQL
  password: "", // Remplacez par votre mot de passe MySQL
  database: "mapsys", // Remplacez par le nom de votre base de données
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Exemple de route pour obtenir toutes les imprimantes
app.get("/api/imp_support", (req, res) => {
  const sql = "SELECT * FROM imp_support"; // Remplacez par votre requête SQL
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get("/api/imp_copieurs", (req, res) => {
  const sql = "SELECT * FROM imp_copieurs"; // Remplacez par votre requête SQL
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get("/api/pc_glpi", (req, res) => {
  const sql = "SELECT * FROM pc_glpi"; // Remplacez par votre requête SQL
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Démarrer le serveur sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
