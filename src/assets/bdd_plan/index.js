const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const cron = require("node-cron");
const ping = require("ping");
const axios = require("axios");
const bcrypt = require("bcryptjs");

// Configuration centralisée des API endpoints
// Cette configuration peut être exportée pour être utilisée par le frontend
const API_BASE_URL = "http://localhost:5000/api";

// Définition des endpoints disponibles
const API_ENDPOINTS = {
  // Tous les types d'équipements utilisent la même table "equipements"
  equipements: `${API_BASE_URL}/equipements`,
  // Les routes spécifiques pour filtrer par type
  pc_portables: `${API_BASE_URL}/equipements/type/PC%20Portable`,
  pc_fixes: `${API_BASE_URL}/equipements/type/PC%20Fixe`,
  imprimantes_copieurs: `${API_BASE_URL}/equipements/type/Imprimante%20Copieur`,
  imprimantes_support: `${API_BASE_URL}/equipements/type/Imprimante%20Support`,
  // Autres endpoints
  positionne: `${API_BASE_URL}/positionne`,
  lieux: `${API_BASE_URL}/lieux`,
  users: `${API_BASE_URL}/users`,
};

// Fonction utilitaire pour vérifier si une API est disponible
async function checkApiAvailability(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`API non disponible: ${url}`, error);
    return false;
  }
}

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "Content-Range, X-Total-Count");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const db = mysql.createConnection({
  host: "192.168.1.153",
  port: 3306,
  user: "root",
  password: "root",
  database: "mapsys",
  charset: "utf8mb4",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

db.connect((err) => {
  if (err) {
    console.error("❌ ERREUR DE CONNEXION À LA BASE DE DONNÉES:", err);
    console.error("Détails de l'erreur:", err.message);
    console.error("Code d'erreur:", err.code);
    return;
  }
  console.log("✅ Connecté à la base de données MySQL sur", db.config.host);

  // Test de la table users
  db.query(
    "SELECT nom, LENGTH(password) as pwd_length FROM users LIMIT 1",
    (err, results) => {
      if (err) {
        console.error("❌ Erreur test table users:", err);
      } else {
        console.log("✅ Test table users réussi:", results);
      }
    }
  );
});

// Exposer ces configurations pour le frontend si nécessaire
// Si vous utilisez Express pour servir votre frontend, vous pouvez ajouter une route:
app.get("/api/config", (req, res) => {
  res.json({
    API_BASE_URL,
    API_ENDPOINTS,
  });
});

// Fonction générique pour gérer les requêtes API avec tri, pagination, et filtres
const handleApiRequest = (
  baseQuery,
  countQuery,
  req,
  res,
  tableName = "equipements"
) => {
  const { sort, range, filter } = req.query;

  let sortField = "e.id_eqts"; // Champ de tri par défaut
  let sortOrder = "ASC"; // Ordre de tri par défaut

  if (sort) {
    try {
      const [field, order] = JSON.parse(sort);
      // Mappage des champs de l'API aux champs de la base de données pour le tri
      const fieldMap = {
        id: "e.id_eqts",
        nom: "e.nom",
        sn: "e.sn",
        model: "e.model",
        type: "e.type",
      };
      sortField = fieldMap[field] || `e.${field}` || "e.id_eqts";
      sortOrder = order || "ASC";
    } catch (error) {
      console.error("Erreur lors du parsing du champ de tri :", error);
    }
  }

  let offset = 0; // Début de la plage pour la pagination
  let limit = 100; // Nombre d'éléments par page

  if (range) {
    try {
      const [start, end] = JSON.parse(range);
      offset = start;
      limit = end - start + 1;
    } catch (error) {
      console.error("Erreur lors du parsing du champ range :", error);
    }
  }

  const whereClauses = []; // Tableau pour stocker les conditions WHERE des filtres
  const queryParams = []; // Tableau pour stocker les paramètres des requêtes préparées

  if (filter) {
    try {
      const filters = JSON.parse(filter);
      if (filters.q) {
        // Filtre de recherche générale
        whereClauses.push(
          `(e.nom LIKE ? OR e.sn LIKE ? OR e.model LIKE ? OR ai.ip LIKE ?)`
        );
        const searchTerm = `%${filters.q}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
      }
      if (filters.type) {
        // Filtre par type d'équipement
        whereClauses.push(`e.type = ?`);
        queryParams.push(filters.type);
      }
      if (filters.nom) {
        // Filtre par nom d'équipement (commençant par)
        whereClauses.push(`e.nom LIKE ?`);
        queryParams.push(`${filters.nom}%`);
      }
      // Ajoutez d'autres filtres spécifiques ici si nécessaire
    } catch (error) {
      console.error("Erreur lors du parsing du champ filter :", error);
    }
  }

  // Construction de la clause WHERE
  const whereString =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  // Requête pour récupérer le nombre total d'enregistrements (pour la pagination)
  const finalCountQuery = `${countQuery} ${whereString}`;
  // Requête pour récupérer les données paginées et triées
  const finalDataQuery = `${baseQuery} ${whereString} ORDER BY ${sortField} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;

  // Exécution de la requête de comptage
  db.query(finalCountQuery, queryParams, (err, countResult) => {
    if (err) {
      console.error("Erreur lors de la requête SQL (count):", err);
      return res.status(500).json({
        error: "Erreur lors de la requête SQL (count)",
        details: err.message,
      });
    }
    const totalCount = countResult[0].total;

    // Exécution de la requête de données
    db.query(finalDataQuery, [...queryParams], (err, results) => {
      if (err) {
        console.error("Erreur lors de la requête SQL (data):", err);
        return res.status(500).json({
          error: "Erreur lors de la requête SQL (data)",
          details: err.message,
        });
      }

      // Mappage des résultats pour s'assurer que l'ID est exposé comme 'id'
      const mappedResults = results.map((r) => ({ ...r, id: r.id_eqts }));

      // Configuration des headers pour React Admin (ou similaire)
      res.setHeader(
        "Content-Range",
        `${tableName} ${offset}-${
          offset + mappedResults.length - 1
        }/${totalCount}`
      );
      res.setHeader("X-Total-Count", totalCount);
      res.json(mappedResults);
    });
  });
};

// --- API pour les ÉQUIPEMENTS ---

// GET /api/equipements - Récupérer la liste de tous les équipements avec leurs détails
app.get("/api/equipements", (req, res) => {
  // Requête de base pour sélectionner les équipements et joindre les tables associées
  const baseQuery = `
    SELECT 
      e.*,  -- Toutes les colonnes de la table equipement
      ai.ip, -- Adresse IP de l'équipement
      p.id_glpi, -- ID GLPI pour les PCs
      ic.nom_infolog, ic.type_edition AS copieur_type_edition, -- Infos spécifiques aux copieurs
      isup.id AS id_imp_sup_specifique -- ID spécifique pour les imprimantes support
    FROM equipement e
    LEFT JOIN adresse_ip ai ON e.id_eqts = ai.id_eqts
    LEFT JOIN pc p ON e.id_eqts = p.id_eqts AND e.type IN ('PC Portable', 'PC Fixe')
    LEFT JOIN imp_cop ic ON e.id_eqts = ic.id_eqts AND e.type = 'Imprimante Copieur'
    LEFT JOIN imp_sup isup ON e.id_eqts = isup.id_eqts AND e.type = 'Imprimante Support'
  `;
  // Requête de base pour compter le nombre total d'équipements distincts
  const countQuery = `
    SELECT COUNT(DISTINCT e.id_eqts) as total
    FROM equipement e
    LEFT JOIN adresse_ip ai ON e.id_eqts = ai.id_eqts
    LEFT JOIN pc p ON e.id_eqts = p.id_eqts AND e.type IN ('PC Portable', 'PC Fixe')
    LEFT JOIN imp_cop ic ON e.id_eqts = ic.id_eqts AND e.type = 'Imprimante Copieur'
    LEFT JOIN imp_sup isup ON e.id_eqts = isup.id_eqts AND e.type = 'Imprimante Support'
  `;
  handleApiRequest(baseQuery, countQuery, req, res, "equipements");
});

// GET /api/equipements/:id_eqts - Récupérer un équipement spécifique par son ID
app.get("/api/equipements/:id_eqts", (req, res) => {
  const { id_eqts } = req.params;
  // Sélectionne un équipement spécifique et ses détails joints
  const sql = `
    SELECT 
      e.*, 
      ai.ip, 
      p.id_glpi, 
      ic.nom_infolog, ic.type_edition AS copieur_type_edition,
      isup.id AS id_imp_sup_specifique
    FROM equipement e
    LEFT JOIN adresse_ip ai ON e.id_eqts = ai.id_eqts
    LEFT JOIN pc p ON e.id_eqts = p.id_eqts AND e.type IN ('PC Portable', 'PC Fixe')
    LEFT JOIN imp_cop ic ON e.id_eqts = ic.id_eqts AND e.type = 'Imprimante Copieur'
    LEFT JOIN imp_sup isup ON e.id_eqts = isup.id_eqts AND e.type = 'Imprimante Support'
    WHERE e.id_eqts = ? -- Condition pour l'ID spécifique
  `;
  db.query(sql, [id_eqts], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      return res.status(500).json({ error: "Erreur lors de la requête SQL" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Element does not exist" });
    }
    // Renvoie l'équipement trouvé, en s'assurant que l'ID est 'id'
    res.json({ ...results[0], id: results[0].id_eqts });
  });
});

app.get("/api/equipements/type/:type", (req, res) => {
  const { type } = req.params;

  console.log(`Récupération des équipements de type: ${type}`);

  // Utiliser db.query avec callback au lieu de db.execute avec promesses
  db.query("SELECT * FROM equipement WHERE type = ?", [type], (err, rows) => {
    if (err) {
      console.error(`Erreur pour le type ${type}:`, err);
      return res.status(500).json({
        error: "Erreur serveur",
        details: err.message,
      });
    }

    console.log(`${rows.length} équipements de type ${type} trouvés`);
    res.json(rows);
  });
});

// POST /api/equipements - Créer un nouvel équipement
app.post("/api/equipements", (req, res) => {
  const {
    nom,
    sn,
    prise,
    model,
    type,
    ip,
    id_glpi,
    nom_infolog,
    type_edition,
  } = req.body;

  db.beginTransaction((err) => {
    // Début de la transaction
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to start transaction", details: err.message });
    }

    // 1. Insérer dans la table principale 'equipement'
    const equipementSql =
      "INSERT INTO equipement (nom, sn, prise, model, type) VALUES (?, ?, ?, ?, ?)";
    db.query(
      equipementSql,
      [nom, sn, prise, model, type],
      (err, equipResult) => {
        if (err) {
          return db.rollback(() => {
            // Annuler la transaction en cas d'erreur
            console.error("Erreur insertion equipement:", err);
            res.status(500).json({
              error: "Erreur insertion equipement",
              details: err.message,
            });
          });
        }
        const newEquipementId = equipResult.insertId; // Récupérer l'ID du nouvel équipement

        let specificSql = ""; // Requête pour la table spécialisée (pc, imp_cop, imp_sup)
        let specificParams = [];
        let ipSql = ""; // Requête pour la table adresse_ip
        let ipParams = [];

        if (ip) {
          // 2a. Insérer l'adresse IP si fournie
          ipSql = "INSERT INTO adresse_ip (id_eqts, ip) VALUES (?, ?)";
          ipParams = [newEquipementId, ip];
        }

        // 2b. Préparer l'insertion dans la table spécialisée en fonction du type d'équipement
        if (type === "PC Portable" || type === "PC Fixe") {
          specificSql = "INSERT INTO pc (id_eqts, id_glpi) VALUES (?, ?)";
          specificParams = [newEquipementId, id_glpi];
        } else if (type === "Imprimante Copieur") {
          specificSql =
            "INSERT INTO imp_cop (id_eqts, nom_infolog, type_edition) VALUES (?, ?, ?)";
          specificParams = [newEquipementId, nom_infolog, type_edition];
        } else if (type === "Imprimante Support") {
          specificSql = "INSERT INTO imp_sup (id_eqts) VALUES (?)";
          specificParams = [newEquipementId];
        }

        const tasks = []; // Tableau de promesses pour les insertions dépendantes
        if (ipSql) {
          tasks.push(
            new Promise((resolve, reject) => {
              db.query(ipSql, ipParams, (err) => {
                if (err) return reject(err);
                resolve();
              });
            })
          );
        }
        if (specificSql) {
          tasks.push(
            new Promise((resolve, reject) => {
              db.query(specificSql, specificParams, (err) => {
                if (err) return reject(err);
                resolve();
              });
            })
          );
        }

        // Exécuter toutes les insertions dépendantes
        Promise.all(tasks)
          .then(() => {
            db.commit((err) => {
              // Valider la transaction si tout s'est bien passé
              if (err) {
                return db.rollback(() =>
                  res
                    .status(500)
                    .json({ error: "Commit failed", details: err.message })
                );
              }
              res.status(201).json({
                success: true,
                message: "Equipement créé avec succès",
                id: newEquipementId,
                id_eqts: newEquipementId,
              });
            });
          })
          .catch((err) => {
            // En cas d'erreur dans les insertions dépendantes
            db.rollback(() => {
              // Annuler la transaction
              console.error("Erreur insertion details equipement:", err);
              res.status(500).json({
                error: "Erreur insertion details equipement",
                details: err.message,
              });
            });
          });
      }
    );
  });
});

// PUT /api/equipements/:id_eqts - Mettre à jour un équipement existant
app.put("/api/equipements/:id_eqts", (req, res) => {
  const { id_eqts } = req.params;
  const {
    nom,
    sn,
    prise,
    model,
    type,
    ip,
    id_glpi,
    nom_infolog,
    type_edition,
  } = req.body;

  db.beginTransaction((err) => {
    // Début de la transaction
    if (err) {
      return res.status(500).json({
        error: "Failed to start transaction for update",
        details: err.message,
      });
    }

    // 1. Mettre à jour la table principale 'equipement'
    const equipementSql =
      "UPDATE equipement SET nom = ?, sn = ?, prise = ?, model = ?, type = ? WHERE id_eqts = ?";
    db.query(
      equipementSql,
      [nom, sn, prise, model, type, id_eqts],
      (err, equipResult) => {
        if (err) {
          return db.rollback(() => {
            // Annuler en cas d'erreur
            console.error("Erreur MAJ equipement:", err);
            res
              .status(500)
              .json({ error: "Erreur MAJ equipement", details: err.message });
          });
        }

        if (equipResult.affectedRows === 0) {
          // Vérifier si l'équipement existait
          return db.rollback(() =>
            res.status(404).json({ error: "Equipement non trouvé" })
          );
        }

        const tasks = []; // Tableau de promesses pour les mises à jour dépendantes

        if (ip !== undefined) {
          // Si une IP est fournie (même vide, pour la supprimer)
          tasks.push(
            new Promise((resolve, reject) => {
              // 2a. Mettre à jour ou insérer l'adresse IP (UPSERT)
              const ipUpdateSql =
                "INSERT INTO adresse_ip (id_eqts, ip) VALUES (?, ?) ON DUPLICATE KEY UPDATE ip = ?";
              db.query(ipUpdateSql, [id_eqts, ip, ip], (err) => {
                if (err) return reject(err);
                resolve();
              });
            })
          );
        }

        let specificUpdateSql = ""; // Requête pour la table spécialisée
        let specificUpdateParams = [];

        // 2b. Préparer la mise à jour/insertion dans la table spécialisée
        if (type === "PC Portable" || type === "PC Fixe") {
          specificUpdateSql =
            "INSERT INTO pc (id_eqts, id_glpi) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_glpi = ?";
          specificUpdateParams = [id_eqts, id_glpi, id_glpi];
        } else if (type === "Imprimante Copieur") {
          specificUpdateSql =
            "INSERT INTO imp_cop (id_eqts, nom_infolog, type_edition) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nom_infolog = ?, type_edition = ?";
          specificUpdateParams = [
            id_eqts,
            nom_infolog,
            type_edition,
            nom_infolog,
            type_edition,
          ];
        } else if (type === "Imprimante Support") {
          // Pour imp_sup, on s'assure juste que l'entrée existe si le type est correct
          specificUpdateSql = "INSERT IGNORE INTO imp_sup (id_eqts) VALUES (?)";
          specificUpdateParams = [id_eqts];
        }
        // Potentiellement, il faudrait supprimer les entrées des autres tables spécialisées si le type change.
        // Par exemple, si un PC devient un copieur, il faut supprimer l'entrée de la table 'pc'.
        // Cette logique n'est pas implémentée ici pour garder l'exemple concis.

        if (specificUpdateSql) {
          tasks.push(
            new Promise((resolve, reject) => {
              db.query(specificUpdateSql, specificUpdateParams, (err) => {
                if (err) return reject(err);
                resolve();
              });
            })
          );
        }

        Promise.all(tasks)
          .then(() => {
            db.commit((err) => {
              // Valider la transaction
              if (err) {
                return db.rollback(() =>
                  res.status(500).json({
                    error: "Commit failed for update",
                    details: err.message,
                  })
                );
              }
              res.json({
                success: true,
                message: "Equipement mis à jour",
                id: id_eqts,
                id_eqts: id_eqts,
              });
            });
          })
          .catch((err) => {
            db.rollback(() => {
              // Annuler en cas d'erreur
              console.error("Erreur MAJ details equipement:", err);
              res.status(500).json({
                error: "Erreur MAJ details equipement",
                details: err.message,
              });
            });
          });
      }
    );
  });
});

// DELETE /api/equipements/:id_eqts - Supprimer un équipement
app.delete("/api/equipements/:id_eqts", (req, res) => {
  const { id_eqts } = req.params;

  db.beginTransaction((err) => {
    // Début de la transaction
    if (err) {
      return res.status(500).json({
        error: "Failed to start transaction for delete",
        details: err.message,
      });
    }

    // Ordre de suppression pour respecter les contraintes de clé étrangère
    const deleteOrder = [
      "DELETE FROM adresse_ip WHERE id_eqts = ?", // Supprimer l'IP associée
      "DELETE FROM pc WHERE id_eqts = ?", // Supprimer l'entrée PC spécialisée
      "DELETE FROM imp_cop WHERE id_eqts = ?", // Supprimer l'entrée copieur spécialisée
      "DELETE FROM imp_sup WHERE id_eqts = ?", // Supprimer l'entrée imprimante support spécialisée
      "DELETE FROM positionne WHERE id_eqts = ?", // Supprimer les enregistrements de positionnement
      "DELETE FROM equipement WHERE id_eqts = ?", // Enfin, supprimer l'équipement principal
    ];

    let completedTasks = 0;
    const totalTasks = deleteOrder.length;
    let errorOccurred = false;

    // Exécuter chaque requête de suppression en séquence (ou en parallèle si géré correctement)
    deleteOrder.forEach((sql) => {
      if (errorOccurred) return;
      db.query(sql, [id_eqts], (err, result) => {
        if (errorOccurred) return; // Si une erreur a déjà eu lieu, ne rien faire
        if (err) {
          errorOccurred = true;
          return db.rollback(() => {
            // Annuler la transaction
            console.error("Erreur suppression equipement:", err);
            res.status(500).json({
              error: "Erreur suppression equipement",
              details: err.message,
            });
          });
        }
        completedTasks++;
        // Si toutes les suppressions sont terminées et sans erreur
        if (completedTasks === totalTasks && !errorOccurred) {
          // Vérifier si l'équipement principal a bien été supprimé
          if (
            sql.startsWith("DELETE FROM equipement") &&
            result.affectedRows === 0 &&
            totalTasks > 1
          ) {
            // Ce cas peut arriver si l'équipement n'existait pas mais que les tables enfants ont été testées
            // Si c'est la seule requête (totalTasks === 1), alors c'est un 404 normal.
          }
          db.commit((commitErr) => {
            // Valider la transaction
            if (commitErr) {
              return db.rollback(() =>
                res.status(500).json({
                  error: "Commit failed for delete",
                  details: commitErr.message,
                })
              );
            }
            res.json({
              success: true,
              message: "Equipement supprimé avec succès",
            });
          });
        }
      });
    });
  });
});

// --- SURVEILLANCE IP ---

let offlineDevices = []; // Stocke les appareils hors ligne

// Fonction pour récupérer les IPs à surveiller
async function getIPsToPing() {
  return new Promise((resolve, reject) => {
    // Sélectionne le nom de l'équipement et son IP depuis les tables 'equipement' et 'adresse_ip'
    const sql =
      "SELECT e.nom AS Nom_Equipement, ai.ip AS AdresseIp FROM equipement e JOIN adresse_ip ai ON e.id_eqts = ai.id_eqts WHERE ai.ip IS NOT NULL AND ai.ip != ''";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Erreur récupération IPs à surveiller:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function monitorIPs() {
  try {
    const devices = await getIPsToPing(); // Utilise la nouvelle fonction
    const currentOffline = [];

    for (const device of devices) {
      const { AdresseIp, Nom_Equipement } = device;
      if (!AdresseIp) continue; // Ignore si pas d'IP

      // Ping l'adresse IP
      const result = await ping.promise.probe(AdresseIp, { timeout: 2 });

      if (!result.alive) {
        // Si l'appareil ne répond pas
        currentOffline.push({ ip: AdresseIp, name: Nom_Equipement });
      }
    }
    offlineDevices = currentOffline; // Met à jour la liste des appareils hors ligne
    // console.log("Appareils hors ligne:", offlineDevices); // Pour débogage
  } catch (error) {
    console.error("Erreur lors de la surveillance des IPs :", error.message);
  }
}

// Exécute monitorIPs au démarrage puis toutes les 5 minutes
monitorIPs();
cron.schedule("*/5 * * * *", () => {
  // Toutes les 5 minutes
  console.log("Exécution de la surveillance planifiée des IPs...");
  monitorIPs();
});

// GET /api/offline-ips - Récupérer la liste des appareils actuellement hors ligne
app.get("/api/offline-ips", (req, res) => {
  res.json({ offlineDevices });
});

// --- AUTHENTIFICATION ---

// POST /login - Gérer la connexion des utilisateurs
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("=== TENTATIVE DE CONNEXION ===");
  console.log("Username reçu:", username);
  console.log("Password reçu (longueur):", password ? password.length : 0);
  console.log("Body complet:", JSON.stringify(req.body));

  // Validation des données d'entrée
  if (!username || !password) {
    console.log("❌ Données manquantes");
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur et mot de passe requis" });
  }

  // Sélectionne l'utilisateur par son nom (identifiant)
  const sql = "SELECT id, nom, password, role FROM users WHERE nom = ?";

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("❌ Erreur SQL lors du login:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    console.log("Nombre d'utilisateurs trouvés:", results.length);

    if (results.length === 0) {
      console.log("❌ Utilisateur introuvable pour:", username);
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const user = results[0];
    console.log("Utilisateur trouvé:", user.nom);
    console.log(
      "Hash en base (10 premiers caractères):",
      user.password ? user.password.substring(0, 10) + "..." : "NULL"
    );

    try {
      console.log("Tentative de comparaison bcrypt...");
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      console.log("Résultat de la comparaison bcrypt:", passwordIsValid);

      if (!passwordIsValid) {
        console.log("❌ Mot de passe incorrect pour:", username);
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      console.log("✅ Authentification réussie pour:", username);
      res.json({
        id: user.id,
        username: user.nom,
        name: user.nom,
        role: user.role,
      });
    } catch (bcryptError) {
      console.error("❌ Erreur bcrypt:", bcryptError);
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification du mot de passe" });
    }
  });
});

// --- API pour les UTILISATEURS ---

// GET /api/users - Récupérer la liste de tous les utilisateurs
app.get("/api/users", (req, res) => {
  console.log("📊 Requête GET /api/users reçue");

  // Vérifier d'abord si la table users existe
  db.query("SHOW TABLES LIKE 'users'", (err, tables) => {
    if (err) {
      console.error(
        "❌ Erreur lors de la vérification de la table users:",
        err
      );
      return res.status(500).json({
        error: "Erreur serveur lors de la vérification de la table",
        details: err.message,
      });
    }

    if (tables.length === 0) {
      console.error("❌ La table 'users' n'existe pas dans la base de données");
      return res.status(500).json({
        error: "La table 'users' n'existe pas dans la base de données",
        solution: "Veuillez créer la table users avec la structure appropriée",
      });
    }

    // La table existe, vérifions sa structure
    db.query("DESCRIBE users", (err, columns) => {
      if (err) {
        console.error(
          "❌ Erreur lors de la vérification de la structure de la table users:",
          err
        );
        return res.status(500).json({
          error: "Erreur lors de la vérification de la structure de la table",
          details: err.message,
        });
      }

      console.log(
        "✅ Structure de la table users:",
        columns.map((c) => c.Field)
      );

      // Maintenant, récupérons les utilisateurs
      const sql = "SELECT id, nom, username, email, role, active FROM users";
      db.query(sql, (err, results) => {
        if (err) {
          console.error(
            "❌ Erreur lors de la récupération des utilisateurs:",
            err
          );
          return res.status(500).json({
            error: "Erreur lors de la récupération des utilisateurs",
            details: err.message,
          });
        }

        console.log(`✅ ${results.length} utilisateurs récupérés avec succès`);
        res.json(results);
      });
    });
  });
});

// GET /api/users/:id - Récupérer un utilisateur spécifique
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT id, nom, username, email, role, active FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(results[0]);
  });
});

// POST /api/users - Créer un nouvel utilisateur
app.post("/api/users", async (req, res) => {
  try {
    const { nom, username, email, password, role, active } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const checkSql = "SELECT id FROM users WHERE username = ? OR email = ?";
    db.query(checkSql, [username, email], async (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification de l'utilisateur:", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (results.length > 0) {
        return res
          .status(409)
          .json({ error: "Nom d'utilisateur ou email déjà utilisé" });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer le nouvel utilisateur
      const insertSql =
        "INSERT INTO users (nom, username, email, password, role, active) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(
        insertSql,
        [nom, username, email, hashedPassword, role, active],
        (err, result) => {
          if (err) {
            console.error("Erreur lors de la création de l'utilisateur:", err);
            return res.status(500).json({ error: "Erreur serveur" });
          }

          res.status(201).json({
            id: result.insertId,
            nom,
            username,
            email,
            role,
            active,
          });
        }
      );
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT /api/users/:id - Mettre à jour un utilisateur
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, username, email, role, active } = req.body;

    // Vérifier si l'utilisateur existe
    const checkSql = "SELECT id FROM users WHERE id = ?";
    db.query(checkSql, [id], async (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification de l'utilisateur:", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      // Vérifier si le nom d'utilisateur ou l'email est déjà utilisé par un autre utilisateur
      const duplicateCheckSql =
        "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?";
      db.query(
        duplicateCheckSql,
        [username, email, id],
        async (err, results) => {
          if (err) {
            console.error("Erreur lors de la vérification des doublons:", err);
            return res.status(500).json({ error: "Erreur serveur" });
          }

          if (results.length > 0) {
            return res
              .status(409)
              .json({ error: "Nom d'utilisateur ou email déjà utilisé" });
          }

          // Mettre à jour l'utilisateur
          const updateSql =
            "UPDATE users SET nom = ?, username = ?, email = ?, role = ?, active = ? WHERE id = ?";
          db.query(
            updateSql,
            [nom, username, email, role, active, id],
            (err, result) => {
              if (err) {
                console.error(
                  "Erreur lors de la mise à jour de l'utilisateur:",
                  err
                );
                return res.status(500).json({ error: "Erreur serveur" });
              }

              if (result.affectedRows === 0) {
                return res
                  .status(404)
                  .json({ error: "Utilisateur non trouvé" });
              }

              res.json({
                id,
                nom,
                username,
                email,
                role,
                active,
              });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PATCH /api/users/:id/password - Changer le mot de passe d'un utilisateur
app.patch("/api/users/:id/password", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe
    const updateSql = "UPDATE users SET password = ? WHERE id = ?";
    db.query(updateSql, [hashedPassword, id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du mot de passe:", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      res.json({ message: "Mot de passe mis à jour avec succès" });
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PATCH /api/users/:id/status - Changer le statut d'un utilisateur (actif/inactif)
app.patch("/api/users/:id/status", (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  if (active !== 0 && active !== 1) {
    return res
      .status(400)
      .json({ error: "Le statut doit être 0 (inactif) ou 1 (actif)" });
  }

  const sql = "UPDATE users SET active = ? WHERE id = ?";
  db.query(sql, [active, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du statut:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ message: "Statut mis à jour avec succès" });
  });
});

// DELETE /api/users/:id - Supprimer un utilisateur
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  });
});

// --- API pour les LIEUX --- (La table 'lieux' n'est pas modifiée par les scripts de seed)

// GET /api/lieux - Récupérer la liste de tous les lieux
app.get("/api/lieux", (req, res) => {
  const { sort, range, filter } = req.query;

  let sortField = "nom"; // Champ de tri par défaut
  let sortOrder = "ASC";
  if (sort) {
    try {
      const [field, order] = JSON.parse(sort);
      sortField = field === "id" ? "id" : "nom"; // Tri par 'id' ou 'nom'
      sortOrder = order || "ASC";
    } catch (e) {
      console.error("Sort parse error:", e);
    }
  }

  let offset = 0;
  let limit = 100; // Limite par défaut pour la pagination
  if (range) {
    try {
      const [start, end] = JSON.parse(range);
      offset = start;
      limit = end - start + 1;
    } catch (e) {
      console.error("Range parse error:", e);
    }
  }

  let whereClause = "";
  const queryParams = [];
  if (filter) {
    // Gestion simple du filtre 'q' pour la recherche
    try {
      const filters = JSON.parse(filter);
      if (filters.q) {
        whereClause = "WHERE nom LIKE ? OR type LIKE ?"; // Recherche sur nom ou type
        queryParams.push(`%${filters.q}%`, `%${filters.q}%`);
      }
    } catch (e) {
      console.error("Filter parse error:", e);
    }
  }

  // Requête pour compter le nombre total de lieux (avec filtre)
  const countSql = `SELECT COUNT(*) as total FROM lieux ${whereClause}`;
  db.query(countSql, queryParams, (err, countResults) => {
    if (err) {
      console.error("Lieux count error:", err);
      return res.status(500).json({ error: "SQL Error" });
    }
    const total = countResults[0].total;

    // Requête pour récupérer les lieux (avec filtre, tri, pagination)
    const dataSql = `SELECT * FROM lieux ${whereClause} ORDER BY ${sortField} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;
    db.query(dataSql, queryParams, (err, results) => {
      if (err) {
        console.error("Lieux data error:", err);
        return res.status(500).json({ error: "SQL Error" });
      }
      // Headers pour React Admin
      res.setHeader(
        "Content-Range",
        `lieux ${offset}-${offset + results.length - 1}/${total}`
      );
      res.setHeader("X-Total-Count", total);
      res.json(results.map((r) => ({ ...r, id: r.id }))); // S'assurer que 'id' est présent
    });
  });
});

// GET /api/lieux/:id - Récupérer un lieu spécifique par son ID
app.get("/api/lieux/:id", (req, res) => {
  const { id } = req.params;
  // Sélectionne un lieu par son ID
  const sql = "SELECT * FROM lieux WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Lieu by ID error:", err);
      return res.status(500).json({ error: "SQL Error" });
    }
    if (results.length === 0) {
      // Si aucun lieu trouvé
      return res.status(404).json({ error: "Lieu not found" });
    }
    res.json({ ...results[0], id: results[0].id }); // S'assurer que 'id' est présent
  });
});

// Routes pour la table positionne
app.post("/api/positionne", (req, res) => {
  const { id_eqts, id_poste_de_travail } = req.body;

  console.log("📦 Received data:", { id_eqts, id_poste_de_travail });

  // Vérifier que l'ID de l'équipement est fourni
  if (!id_eqts) {
    return res.status(400).json({ error: "ID de l'équipement requis" });
  }

  // IMPORTANT: Requête SQL avec SEULEMENT les 3 colonnes qui existent
  const query =
    "INSERT INTO positionne (id_eqts, id, date_position) VALUES (?, ?, NOW())";
  const values = [id_eqts, id_poste_de_travail];

  console.log("🔍 SQL Query:", query);
  console.log("🔍 SQL Values:", values);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Erreur lors de l'insertion dans positionne :", err);
      return res.status(500).json({
        error: "Erreur lors du positionnement de l'équipement",
        details: err.message,
      });
    }

    console.log("✅ Position ajoutée avec succès:", result);
    res.status(201).json({
      message: "Position ajoutée avec succès",
      insertId: result.insertId,
      id_eqts: id_eqts,
      id: id_poste_de_travail,
    });
  });
});

// Route GET pour récupérer les positions
app.get("/api/positionne", (req, res) => {
  const query = "SELECT * FROM positionne";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la récupération des positions:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    console.log("📍 Positions fetched:", results.length, "records");
    res.json(results);
  });
});

// Route DELETE pour supprimer une position
app.delete("/api/positionne/:id_eqts", (req, res) => {
  const { id_eqts } = req.params;

  const query = "DELETE FROM positionne WHERE id_eqts = ?";

  db.query(query, [id_eqts], (err, result) => {
    if (err) {
      console.error("❌ Erreur lors de la suppression de la position:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression de la position" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Position non trouvée" });
    }

    console.log("✅ Position deleted for device:", id_eqts);
    res.json({ message: "Position supprimée avec succès" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur API MapSys démarré sur le port ${PORT}`);
});
