/* eslint-disable no-undef */
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cron = require("node-cron");
const ping = require("ping");
const axios = require("axios");

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
  const { sort, range, filter } = req.query;

  // Définir les valeurs par défaut pour le tri
  let sortField = "Nom_IMP";
  let sortOrder = "ASC";

  // Traitement du paramètre `sort` JSON
  if (sort) {
    try {
      const [field, order] = JSON.parse(sort);
      sortField = field;
      sortOrder = order;
    } catch (error) {
      console.error("Erreur lors du parsing du champ de tri :", error);
    }
  }

  // Traitement du paramètre `range` JSON pour la pagination
  let offset = 0;
  let limit = 1000; // Nombre par défaut
  if (range) {
    try {
      const [start, end] = JSON.parse(range);
      offset = start;
      limit = end - start + 1;
    } catch (error) {
      console.error("Erreur lors du parsing du champ range :", error);
    }
  }

  // Filtrage de base avec `filter`
  let whereClause = "";
  if (filter) {
    try {
      const filters = JSON.parse(filter);
      if (filters.q) {
        whereClause = `WHERE Nom_IMP LIKE '%${filters.q}%' OR 
        AdresseIp LIKE '%${filters.q}%' OR 
        SN LIKE '%${filters.q}%' OR 
        LieuxAffectation LIKE '%${filters.q}%' OR 
        Type LIKE '%${filters.q}%'`;
      }
    } catch (error) {
      console.error("Erreur lors du parsing du champ filter :", error);
    }
  }

  // Construire la requête SQL avec tri et pagination
  let sql = `SELECT * FROM imp_support ${whereClause} ORDER BY ${sortField} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête SQL :", err);
      res.status(500).send(err);
      return;
    }

    const totalResults = results.length;

    const mappedResults = results.map((result) => ({
      ...result,
      id: result.id, // Assurez-vous d'utiliser le bon champ pour l'identifiant
    }));

    // Ajouter l'en-tête Content-Range pour la pagination
    res.setHeader(
      "Content-Range",
      `imp_support ${offset}-${offset + totalResults - 1}/${totalResults}`
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    res.json(mappedResults);
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
      id: results[0].id, // Assurez-vous que la colonne ID est correcte
    };

    res.json(result); // Retourner l'imprimante avec son 'id'
  });
});

/*
{-----------------------API PUT-----------------------}
*/
app.put("/api/imp_support/:id", (req, res) => {
  const { id } = req.params;
  const { Nom_IMP, AdresseIp, SN, LieuxAffectation, Type } = req.body;

  const sql = `
    UPDATE imp_support 
    SET Nom_IMP = ?, AdresseIp = ?, SN = ?, LieuxAffectation = ?, Type = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [Nom_IMP, AdresseIp, SN, LieuxAffectation, Type, id],
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
  const { Nom_IMP, AdresseIp, SN, LieuxAffectation, Type } = req.body;

  const sql = `
    INSERT INTO imp_support (Nom_IMP, AdresseIp, SN, LieuxAffectation, Type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [Nom_IMP, AdresseIp, SN, LieuxAffectation, Type],
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
  const { sort, range, filter } = req.query;

  // Définir les valeurs par défaut pour le tri
  let sortField = "NomImpServeur";
  let sortOrder = "ASC";

  // Traitement du paramètre `sort` JSON
  if (sort) {
    try {
      const [field, order] = JSON.parse(sort);
      sortField = field;
      sortOrder = order;
    } catch (error) {
      console.error("Erreur lors du parsing du champ de tri :", error);
    }
  }

  // Traitement du paramètre `range` JSON pour la pagination
  let offset = 0;
  let limit = 1000; // Nombre par défaut
  if (range) {
    try {
      const [start, end] = JSON.parse(range);
      offset = start;
      limit = end - start + 1;
    } catch (error) {
      console.error("Erreur lors du parsing du champ range :", error);
    }
  }

  // Filtrage de base avec `filter`
  let whereClause = "";
  if (filter) {
    try {
      const filters = JSON.parse(filter);
      if (filters.q) {
        whereClause = `WHERE NomImpServeur LIKE '%${filters.q}%' OR 
        Lieux LIKE '%${filters.q}%' OR 
        Model LIKE '%${filters.q}%' OR 
        AdresseIp LIKE '%${filters.q}%' OR 
        NomInfolog LIKE '%${filters.q}%'`;
      }
    } catch (error) {
      console.error("Erreur lors du parsing du champ filter :", error);
    }
  }

  // Construire la requête SQL avec tri et pagination
  let sql = `SELECT * FROM imp_copieurs ${whereClause} ORDER BY ${sortField} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête SQL :", err);
      res.status(500).send(err);
      return;
    }

    const totalResults = results.length;

    const mappedResults = results.map((result) => ({
      ...result,
      id: result.id, // Assurez-vous d'utiliser le bon champ pour l'identifiant
    }));

    // Ajouter l'en-tête Content-Range pour la pagination
    res.setHeader(
      "Content-Range",
      `imp_copieurs ${offset}-${offset + totalResults - 1}/${totalResults}`
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    res.json(mappedResults);
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
  const { NomImpServeur, AdresseIp, SN, Lieux, Model, NomInfolog } = req.body;

  const sql = `
    UPDATE imp_copieurs 
    SET NomImpServeur = ?, AdresseIp = ?, SN = ?, Lieux = ?, Model = ?, NomInfolog = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [NomImpServeur, AdresseIp, SN, Lieux, Model, NomInfolog, id],
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
app.post("/api/imp_copieurs", (req, res) => {
  const { NomImpServeur, AdresseIp, SN, Lieux, Model, NomInfolog } = req.body;

  const sql = `
    INSERT INTO imp_copieurs (NomImpServeur, AdresseIp, SN, Lieux, Model, NomInfolog)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [NomImpServeur, AdresseIp, SN, Lieux, Model, NomInfolog],
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
app.delete("/api/imp_copieurs/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM imp_copieurs WHERE id = ?";
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

------------------------------------- API PC GLPI -------------------------------------
_______________________________________________________________________________________


*/

/*
{-----------------------API GET Complete List-----------------------}
*/
app.get("/api/pc_glpi", (req, res) => {
  const { sort, range, filter } = req.query;

  // Définir les valeurs par défaut pour le tri
  let sortField = "Nom_PC";
  let sortOrder = "ASC";

  // Traitement du paramètre `sort` JSON
  if (sort) {
    try {
      const [field, order] = JSON.parse(sort);
      sortField = field;
      sortOrder = order;
    } catch (error) {
      console.error("Erreur lors du parsing du champ de tri :", error);
    }
  }

  // Traitement du paramètre `range` JSON pour la pagination
  let offset = 0;
  let limit = 10000; // Nombre par défaut
  if (range) {
    try {
      const [start, end] = JSON.parse(range);
      offset = start;
      limit = end - start + 1;
    } catch (error) {
      console.error("Erreur lors du parsing du champ range :", error);
    }
  }

  // Filtrage de base avec `filter`
  let whereClause = "";
  if (filter) {
    try {
      const filters = JSON.parse(filter);
      if (filters.q) {
        whereClause = `WHERE Nom_PC LIKE '%${filters.q}%' OR 
        ID_GLPI LIKE '%${filters.q}%' OR 
        SN LIKE '%${filters.q}%' OR 
        IP_Wifi LIKE '%${filters.q}%' OR 
        Prise LIKE '%${filters.q}%' OR 
        IP_Filaire LIKE '%${filters.q}%'`;
      }
    } catch (error) {
      console.error("Erreur lors du parsing du champ filter :", error);
    }
  }

  // Construire la requête SQL avec tri et pagination
  let sql = `SELECT * FROM pc_glpi ${whereClause} ORDER BY ${sortField} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête SQL :", err);
      res.status(500).send(err);
      return;
    }

    const totalResults = results.length;

    const mappedResults = results.map((result) => ({
      ...result,
      id: result.ID, // Assurez-vous d'utiliser le bon champ pour l'identifiant
    }));

    // Ajouter l'en-tête Content-Range pour la pagination
    res.setHeader(
      "Content-Range",
      `pc_glpi ${offset}-${offset + totalResults - 1}/${totalResults}`
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    res.json(mappedResults);
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
app.put("/api/pc_glpi/:ID", (req, res) => {
  const { id } = req.params;
  const { Nom_PC, SN, IP_Wifi, IP_Filaire, Prise, ID_GLPI } = req.body;

  const sql = `
    UPDATE pc_glpi 
    SET Nom_PC = ?, SN = ?, IP_Wifi = ?, IP_Filaire = ?, Prise = ?, ID_GLPI = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [Nom_PC, SN, IP_Wifi, IP_Filaire, Prise, ID_GLPI, id],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).send(err);
      }

      // Utiliser le résultat pour envoyer une réponse plus informative
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Aucun PC trouvée avec cet ID" });
      }

      res.json({
        success: true,
        message: "PC mis à jour avec succès",
        id,
      });
    }
  );
});

/*
{-----------------------API POST-----------------------}
*/
app.post("/api/pc_glpi", (req, res) => {
  const { Nom_PC, SN, IP_Wifi, IP_Filaire, Prise, ID_GLPI } = req.body;

  const sql = `
    INSERT INTO pc_glpi (Nom_PC, SN, IP_Wifi, IP_Filaire, Prise, ID_GLPI)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [Nom_PC, SN, IP_Wifi, IP_Filaire, Prise, ID_GLPI],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return res.status(500).send(err);
      }

      res.status(201).json({
        success: true,
        message: "PC créé avec succès",
        id: result.insertId, // Retourner l'ID généré par l'insertion
      });
    }
  );
});

/*
{-----------------------API DELETE-----------------------}
*/
app.delete("/api/pc_glpi/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM pc_glpi WHERE ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      return res.status(500).send(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Aucun PC trouvée avec cet ID" });
    }

    res.json({ success: true, message: "PC supprimée avec succès" });
  });
});

/*

_______________________________________________________________________________________

----------------------------------- Ping Adresse IP -----------------------------------
_______________________________________________________________________________________


*/

/*
{----------------------- Récupération des IP -----------------------}
*/

// Route pour récupérer toutes les adresses IP et les noms d'imprimantes
app.get("/api/ips", (req, res) => {
  const query1 = "SELECT NomImpServeur, AdresseIp FROM imp_copieurs";
  const query2 = "SELECT Nom_IMP, AdresseIp FROM imp_support";

  // Exécuter plusieurs requêtes pour récupérer les IP et noms d'imprimantes de différentes tables
  db.query(query1, (err, results1) => {
    if (err) {
      return res.status(500).json({
        error:
          "Erreur lors de la récupération des adresses IP et noms (Table 1)",
      });
    }

    db.query(query2, (err, results2) => {
      if (err) {
        return res.status(500).json({
          error:
            "Erreur lors de la récupération des adresses IP et noms (Table 2)",
        });
      }

      // Fusionner les résultats des deux tables et envoyer la réponse
      const allImpData = [...results1, ...results2];
      res.json({ devices: allImpData });
    });
  });
});

/*
{----------------------- Ping des IP -----------------------}
*/

// Stocker les imprimantes non accessibles
let offlineDevices = [];

// Fonction pour effectuer un ping et mettre à jour les imprimantes non accessibles
async function monitorIPs() {
  try {
    // Récupérer les IPs et noms d'imprimantes depuis l'API
    const response = await axios.get("http://localhost:5000/api/ips");
    const devices = response.data.devices;

    offlineDevices = []; // Réinitialiser la liste des imprimantes non accessibles

    // Faire un ping sur chaque IP
    for (const device of devices) {
      const { AdresseIp, NomImpServeur, Nom_IMP } = device;
      const result = await ping.promise.probe(AdresseIp);

      if (!result.alive) {
        // Ajouter l'imprimante à la liste si l'IP ne répond pas
        const name = NomImpServeur || Nom_IMP; // Utiliser le nom disponible
        offlineDevices.push({ ip: AdresseIp, name });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la surveillance des IPs :", error);
  }
}

// Tâche cron pour faire des pings toutes les minutes
cron.schedule("*/30 * * * *", () => {
  console.log("Vérification des IPs...");
  monitorIPs();
  console.log("Vérification des IPs terminées !");
});

/*
{----------------------- API des IP inaccessibles -----------------------}
*/

// Ajouter cette route dans ton serveur Node.js pour récupérer les imprimantes hors ligne
app.get("/api/offline-ips", (req, res) => {
  res.json({ offlineDevices });
});

// Démarrer le serveur sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
