// Importation des dépendances nécessaires
const express = require("express"); // Pour créer le serveur
const mysql = require("mysql"); // Pour interagir avec la base de données MySQL
const cors = require("cors"); // Pour gérer les requêtes CORS

// Création d'une instance de l'application Express
const app = express();
const port = 5000; // Le port sur lequel l'API écoutera

// Middleware
app.use(cors()); // Autoriser les requêtes CORS
app.use(express.json()); // Pour analyser les corps de requêtes JSON

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Changez si nécessaire
  password: "", // Changez si nécessaire
  database: "mapsys", // Remplacez par le nom de votre base de données
});

// Vérifiez la connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Route pour récupérer les copieurs
app.get("/api/imp_copieurs", (req, res) => {
  const sql = "SELECT * FROM imp_copieurs"; // Assurez-vous que ce nom de table est correct
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    }
    res.json({ data: results, total: results.length });
  });
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
