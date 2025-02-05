const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cron = require("node-cron");
const ping = require("ping");
const axios = require("axios");

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Expose-Headers", "Content-Range");
  next();
});

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mapsys",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

const handleApiRequest = (table, req, res) => {
  const { sort, range, filter, search } = req.query;

  let sortField;
  let sortOrder = "ASC";

  if (table === "pc_glpi") {
    sortField = "Nom_PC";
  } else if (table === "imp_support") {
    sortField = "Nom_IMP";
  } else {
    sortField = "NomImpServeur";
  }

  if (sort) {
    try {
      const [field, order] = JSON.parse(sort);
      sortField = field;
      sortOrder = order;
    } catch (error) {
      console.error("Erreur lors du parsing du champ de tri :", error);
    }
  }

  let offset = 0;
  let limit = 1000;
  if (range) {
    try {
      const [start, end] = JSON.parse(range);
      offset = start;
      limit = end - start + 1;
    } catch (error) {
      console.error("Erreur lors du parsing du champ range :", error);
    }
  }

  let whereClause = "";
  const whereConditions = [];

  if (search) {
    const searchTerm = mysql.escape(`%${search}%`);
    if (table === "pc_glpi") {
      whereConditions.push(`(Nom_PC LIKE ${searchTerm} OR 
                 SN LIKE ${searchTerm} OR 
                 IP_Wifi LIKE ${searchTerm} OR 
                 IP_Filaire LIKE ${searchTerm} OR 
                 Prise LIKE ${searchTerm})`);
    } else {
      whereConditions.push(`(Nom_IMP LIKE ${searchTerm} OR 
                 AdresseIp LIKE ${searchTerm} OR 
                 SN LIKE ${searchTerm} OR 
                 LieuxAffectation LIKE ${searchTerm} OR 
                 Type LIKE ${searchTerm})`);
    }
  } else if (filter) {
    try {
      const filters = JSON.parse(filter);
      if (filters.q) {
        if (table === "pc_glpi") {
          whereConditions.push(`(Nom_PC LIKE '%${filters.q}%' OR 
        SN LIKE '%${filters.q}%' OR 
        IP_Wifi LIKE '%${filters.q}%' OR 
        IP_Filaire LIKE '%${filters.q}%' OR 
        Prise LIKE '%${filters.q}%')`);
        } else {
          whereConditions.push(`(Nom_IMP LIKE '%${filters.q}%' OR 
        AdresseIp LIKE '%${filters.q}%' OR 
        SN LIKE '%${filters.q}%' OR 
        LieuxAffectation LIKE '%${filters.q}%' OR 
        Type LIKE '%${filters.q}%')`);
        }
      }
    } catch (error) {
      console.error("Erreur lors du parsing du champ filter :", error);
    }
  }

  // Ajout du filtre pour les PC portables et fixes
  if (table === "pc_glpi" && req.query.type) {
    const types = Array.isArray(req.query.type)
      ? req.query.type
      : [req.query.type];
    const prefixConditions = types
      .map((type) => {
        if (type === "S068164" || type === "S973164") {
          return `Nom_PC LIKE '${type}%'`;
        } else if (
          type === "S068163" ||
          type === "S973163" ||
          type === "GTB_PDG" ||
          type === "PC-SPARE"
        ) {
          return `Nom_PC LIKE '${type}%'`;
        }
        return null;
      })
      .filter(Boolean);

    if (prefixConditions.length > 0) {
      whereConditions.push(`(${prefixConditions.join(" OR ")})`);
    }
  }

  if (whereConditions.length > 0) {
    whereClause = `WHERE ${whereConditions.join(" AND ")}`;
  }

  let sql = `SELECT * FROM ${table} ${whereClause} ORDER BY ${sortField} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;

  console.log("Requête SQL exécutée :", sql);

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête SQL :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la requête SQL", details: err.message });
    }

    const totalResults = results.length;
    console.log(`Nombre de résultats pour ${table}: ${totalResults}`);

    const mappedResults = results.map((result) => ({
      ...result,
      id: result.id,
    }));

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Range",
      `${table} ${offset}-${offset + totalResults - 1}/${totalResults}`
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    console.log(`Envoi de la réponse JSON pour ${table}`);
    res.json(mappedResults);
  });
};

// API IMP SUPPORT
app.get("/api/imp_support", (req, res) => {
  console.log("Requête reçue pour /api/imp_support");
  handleApiRequest("imp_support", req, res);
});

app.get("/api/imp_support/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM imp_support WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      return res.status(500).json({ error: "Erreur lors de la requête SQL" });
    }

    if (results.length === 0) {
      console.log("Aucun élément trouvé pour l'id :", id);
      return res.status(404).json({ error: "Element does not exist" });
    }

    const result = {
      ...results[0],
      id: results[0].id,
    };

    res.json(result);
  });
});

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
        return res.status(500).json({ error: "Erreur lors de la mise à jour" });
      }

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
        return res.status(500).json({ error: "Erreur lors de l'insertion" });
      }

      res.status(201).json({
        success: true,
        message: "Imprimante créée avec succès",
        id: result.insertId,
      });
    }
  );
});

app.delete("/api/imp_support/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM imp_support WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      return res.status(500).json({ error: "Erreur lors de la suppression" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Aucune imprimante trouvée avec cet ID" });
    }

    res.json({ success: true, message: "Imprimante supprimée avec succès" });
  });
});

// API IMP COPIEUR
app.get("/api/imp_copieurs", (req, res) => {
  console.log("Requête reçue pour /api/imp_copieurs");
  handleApiRequest("imp_copieurs", req, res);
});

app.get("/api/imp_copieurs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM imp_copieurs WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      return res.status(500).json({ error: "Erreur lors de la requête SQL" });
    }

    if (results.length === 0) {
      console.log("Aucun élément trouvé pour l'id :", id);
      return res.status(404).json({ error: "Element does not exist" });
    }

    const result = {
      ...results[0],
      id: results[0].ID || results[0].id,
    };

    res.json(result);
  });
});

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
        return res.status(500).json({ error: "Erreur lors de la mise à jour" });
      }

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
        return res.status(500).json({ error: "Erreur lors de l'insertion" });
      }

      res.status(201).json({
        success: true,
        message: "Imprimante créée avec succès",
        id: result.insertId,
      });
    }
  );
});

app.delete("/api/imp_copieurs/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM imp_copieurs WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      return res.status(500).json({ error: "Erreur lors de la suppression" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Aucune imprimante trouvée avec cet ID" });
    }

    res.json({ success: true, message: "Imprimante supprimée avec succès" });
  });
});

// API PC GLPI
app.get("/api/pc_glpi", (req, res) => {
  console.log("Requête reçue pour /api/pc_glpi");
  const type = req.query.type; // 'portable' ou 'fixe'
  handleApiRequest("pc_glpi", { ...req, query: { ...req.query, type } }, res);
});

app.get("/api/pc_glpi/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM pc_glpi WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      return res.status(500).json({ error: "Erreur lors de la requête SQL" });
    }

    if (results.length === 0) {
      console.log("Aucun élément trouvé pour l'id :", id);
      return res.status(404).json({ error: "Element does not exist" });
    }

    const result = {
      ...results[0],
      id: results[0].ID || results[0].id,
    };

    res.json(result);
  });
});

app.put("/api/pc_glpi/:id", (req, res) => {
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
        return res.status(500).json({ error: "Erreur lors de la mise à jour" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Aucun PC trouvé avec cet ID" });
      }

      res.json({
        success: true,
        message: "PC mis à jour avec succès",
        id,
      });
    }
  );
});

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
        return res.status(500).json({ error: "Erreur lors de l'insertion" });
      }

      res.status(201).json({
        success: true,
        message: "PC créé avec succès",
        id: result.insertId,
      });
    }
  );
});

app.delete("/api/pc_glpi/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM pc_glpi WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      return res.status(500).json({ error: "Erreur lors de la suppression" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Aucun PC trouvé avec cet ID" });
    }

    res.json({ success: true, message: "PC supprimé avec succès" });
  });
});

// Ping Adresse IP
app.get("/api/ips", (req, res) => {
  const query1 = "SELECT NomImpServeur, AdresseIp FROM imp_copieurs";
  const query2 = "SELECT Nom_IMP, AdresseIp FROM imp_support";

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

      const allImpData = [...results1, ...results2];
      res.json({ devices: allImpData });
    });
  });
});

let offlineDevices = [];

async function monitorIPs() {
  try {
    const response = await axios.get("http://localhost:5000/api/ips");
    const devices = response.data.devices;

    offlineDevices = [];

    for (const device of devices) {
      const { AdresseIp, NomImpServeur, Nom_IMP } = device;
      const result = await ping.promise.probe(AdresseIp);

      if (!result.alive) {
        const name = NomImpServeur || Nom_IMP;
        offlineDevices.push({ ip: AdresseIp, name });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la surveillance des IPs :", error);
  }
}

cron.schedule("*/30 * * * *", () => {
  console.log("Vérification des IPs...");
  monitorIPs();
  console.log("Vérification des IPs terminées !");
});

app.get("/api/offline-ips", (req, res) => {
  res.json({ offlineDevices });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
