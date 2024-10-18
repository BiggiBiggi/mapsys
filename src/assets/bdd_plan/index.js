/* eslint-disable no-undef */
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors()); // CORS pour autoriser toutes les requêtes
app.use((req, res, next) => {
  // Middleware pour définir les en-têtes CORS
  res.header("Access-Control-Allow-Origin", "*"); // Autoriser cette origine
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS"); // Méthodes autorisées
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // En-têtes autorisés
  res.header("Access-Control-Expose-Headers", "Content-Range"); // Exposer Content-Range pour React Admin
  next(); // Passer au middleware suivant
});

app.use(express.json()); // Permet à l'API de parser les corps des requêtes en JSON

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: "localhost", // Remplacez par votre hôte MySQL
  user: "root", // Remplacez par votre utilisateur MySQL
  password: "root", // Remplacez par votre mot de passe MySQL
  database: "mapsys", // Remplacez par le nom de votre base de données
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

/*


_______________________________________________________________________________________

----------------------------------- API IMP SUPPORT -----------------------------------
_______________________________________________________________________________________


*/

/*
{-----------------------API GET Complete List-----------------------}
*/
app.get("/api/imp_support", (req, res) => {
  const { _sort, _order } = req.query; // Récupérer les paramètres de tri
  console.log("Sort Field:", _sort); // Log du champ de tri
  console.log("Order:", _order); // Log de l'ordre de tri

  let sql = "SELECT * FROM imp_support";

  // Ajouter le tri si les paramètres sont présents et valides
  if (_sort && _order) {
    const validSortFields = [
      "Nom_IMP",
      "Adresse_IP",
      "SN",
      "Lieux_Affectation",
      "Type",
    ];
    const validOrderValues = ["ASC", "DESC"];

    // Vérification des champs et ordres
    if (validSortFields.includes(_sort) && validOrderValues.includes(_order)) {
      sql += ` ORDER BY ${_sort} ${_order}`;
      console.log("Constructed SQL Query with Sorting:", sql); // Log de la requête SQL construite
    } else {
      console.log("Invalid sort field or order:", { _sort, _order }); // Log en cas de paramètres invalides
      return res.status(400).json({ error: "Invalid sort field or order" });
    }
  } else {
    console.log("No sorting parameters provided."); // Log si aucun paramètre de tri n'est fourni
  }

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log pour les erreurs de requête
      res.status(500).send(err);
      return;
    }

    const totalResults = results.length;

    const mappedResults = results.map((result) => ({
      ...result,
      id: result.ID, // Utilise le bon champ pour l'ID
    }));

    res.setHeader(
      "Content-Range",
      `imp_support 0-${totalResults}/${totalResults}`
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    console.log("Query Results:", mappedResults); // Log des résultats de la requête
    res.json(mappedResults); // Retourner les résultats
  });
});

/*
{-----------------------API GET Filtered ID-----------------------}
*/
app.get("/api/imp_support/:id", (req, res) => {
  const { id } = req.params; // Récupérer l'id depuis les paramètres de l'URL
  const sql = "SELECT * FROM imp_support WHERE id = ?"; // Requête SQL pour récupérer une imprimante spécifique
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err); // Log pour déboguer
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      console.log("Aucun élément trouvé pour l'id :", id); // Log pour déboguer
      return res.status(404).json({ error: "Element does not exist" }); // Si l'imprimante n'existe pas
    }

    const result = {
      ...results[0],
      id: results[0].ID || results[0].id, // Assurez-vous que la colonne ID est correcte
    };

    res.json(result); // Retourner l'imprimante avec son 'id'
  });
});

/*
{-----------------------API PUT-----------------------}
*/
app.put("/api/imp_support/:id", (req, res) => {
  const { id } = req.params;
  const { Nom_IMP, Adresse_IP, SN, Lieux_Affectation, Type } = req.body;

  const sql = `
    UPDATE imp_support 
    SET Nom_IMP = ?, Adresse_IP = ?, SN = ?, Lieux_Affectation = ?, Type = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [Nom_IMP, Adresse_IP, SN, Lieux_Affectation, Type, id],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).send(err);
      }

      // Utiliser le résultat pour envoyer une réponse plus informative
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Aucune imprimante trouvée avec cet ID" });
      }

      res.json({
        success: true,
        message: "Imprimante mise à jour avec succès",
        id,
      });
    }
  );
});

/*
{-----------------------API POST-----------------------}
*/
app.post("/api/imp_support", (req, res) => {
  const { Nom_IMP, Adresse_IP, SN, Lieux_Affectation, Type } = req.body;

  const sql = `
    INSERT INTO imp_support (Nom_IMP, Adresse_IP, SN, Lieux_Affectation, Type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [Nom_IMP, Adresse_IP, SN, Lieux_Affectation, Type],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return res.status(500).send(err);
      }

      res.status(201).json({
        success: true,
        message: "Imprimante créée avec succès",
        id: result.insertId, // Retourner l'ID généré par l'insertion
      });
    }
  );
});

/*
{-----------------------API DELETE-----------------------}
*/
app.delete("/api/imp_support/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM imp_support WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      return res.status(500).send(err);
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Aucune imprimante trouvée avec cet ID" });
    }

    res.json({ success: true, message: "Imprimante supprimée avec succès" });
  });
});

/*


_______________________________________________________________________________________

----------------------------------- API IMP COPIEUR -----------------------------------
_______________________________________________________________________________________


*/

/*
{-----------------------API GET Complete List-----------------------}
*/
app.get("/api/imp_copieurs", (req, res) => {
  const sql = "SELECT * FROM imp_copieurs"; // Remplacez par votre requête SQL
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    const totalResults = results.length;

    // Mapper les résultats pour que chaque objet ait un champ 'id'
    const mappedResults = results.map((result) => ({
      ...result,
      id: result.copieur_id || result.Id || result.id, // Remplacer par le nom de votre champ d'identifiant dans la base de données
    }));

    // Ajouter l'en-tête Content-Range pour la pagination
    res.setHeader(
      "Content-Range",
      `imp_copieurs 0-${totalResults}/${totalResults}`
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    res.json(mappedResults); // Retourner les résultats avec 'id'
  });
});

/*
{-----------------------API GET Filtered ID-----------------------}
*/
app.get("/api/imp_copieurs/:id", (req, res) => {
  const { id } = req.params; // Récupérer l'id depuis les paramètres de l'URL
  const sql = "SELECT * FROM imp_copieurs WHERE id = ?"; // Requête SQL pour récupérer une imprimante spécifique
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err); // Log pour déboguer
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      console.log("Aucun élément trouvé pour l'id :", id); // Log pour déboguer
      return res.status(404).json({ error: "Element does not exist" }); // Si l'imprimante n'existe pas
    }

    const result = {
      ...results[0],
      id: results[0].ID || results[0].id, // Assurez-vous que la colonne ID est correcte
    };

    res.json(result); // Retourner l'imprimante avec son 'id'
  });
});

/*
{-----------------------API PUT-----------------------}
*/
app.put("/api/imp_copieurs/:id", (req, res) => {
  const { id } = req.params;
  const { Nom_IMP_Serveur, Lieux, Model, Adresse_IP } = req.body;

  const sql = `
    UPDATE imp_copieurs 
    SET Nom_IMP_Serveur = ?, Lieux = ?, Model = ?, Adresse_IP = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [Nom_IMP_Serveur, Lieux, Model, Adresse_IP, id],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).send(err);
      }

      // Utiliser le résultat pour envoyer une réponse plus informative
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Aucune imprimante trouvée avec cet ID" });
      }

      res.json({
        success: true,
        message: "Imprimante mise à jour avec succès",
        id,
      });
    }
  );
});

/*


_______________________________________________________________________________________

------------------------------------- API PC GLPI -------------------------------------
_______________________________________________________________________________________


*/

/*
{-----------------------API GET Complete List-----------------------}
*/
app.get("/api/pc_glpi", (req, res) => {
  const sql = "SELECT * FROM pc_glpi"; // Remplacez par votre requête SQL
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    const totalResults = results.length;

    // Mapper les résultats pour que chaque objet ait un champ 'id'
    const mappedResults = results.map((result) => ({
      ...result,
      id: result.ID, // Remplacer par le nom de votre champ d'identifiant dans la base de données
    }));

    // Ajouter l'en-tête Content-Range pour la pagination
    res.setHeader("Content-Range", `pc_glpi 0-${totalResults}/${totalResults}`);
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    res.json(mappedResults); // Retourner les résultats avec 'id'
  });
});

/*
{-----------------------API GET Filtered ID-----------------------}
*/
app.get("/api/pc_glpi/:id", (req, res) => {
  const { id } = req.params; // Récupérer l'id depuis les paramètres de l'URL
  const sql = "SELECT * FROM pc_glpi WHERE id = ?"; // Requête SQL pour récupérer une imprimante spécifique
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err); // Log pour déboguer
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      console.log("Aucun élément trouvé pour l'id :", id); // Log pour déboguer
      return res.status(404).json({ error: "Element does not exist" }); // Si l'imprimante n'existe pas
    }

    const result = {
      ...results[0],
      id: results[0].ID || results[0].id, // Assurez-vous que la colonne ID est correcte
    };

    res.json(result); // Retourner l'imprimante avec son 'id'
  });
});

/*
{-----------------------API PUT-----------------------}
*/
app.put("/api/pc_glpi/:id", (req, res) => {
  const { id } = req.params;
  const { Nom_PC, SN, IP_Wifi, IP_Filaire, Prise } = req.body;

  const sql = `
    UPDATE pc_glpi 
    SET Nom_PC = ?, SN = ?, IP_Wifi = ?, IP_Filaire = ?, Prise = ?
    WHERE id = ?
  `;

  db.query(sql, [Nom_PC, SN, IP_Wifi, IP_Filaire, Prise, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour :", err);
      return res.status(500).send(err);
    }

    // Utiliser le résultat pour envoyer une réponse plus informative
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Aucun ordinateur trouvée avec cet ID" });
    }

    res.json({
      success: true,
      message: "Ordinateur mis à jour avec succès",
      id,
    });
  });
});

// Démarrer le serveur sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
