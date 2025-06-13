const mysql = require("mysql2")

// Configuration de la base de données
const db = mysql.createConnection({
  host: "192.168.1.153",
  port: 3306,
  user: "root",
  password: "root",
  database: "mapsys",
  charset: "utf8mb4",
})

async function adaptUsersTable() {
  try {
    console.log("🔍 Adaptation de la table users existante...")

    // Vérifier la structure actuelle
    const [columns] = await db.promise().query("DESCRIBE users")
    const existingColumns = columns.map((col) => col.Field)
    console.log("📋 Colonnes existantes:", existingColumns)

    // Ajouter la colonne username si elle n'existe pas
    if (!existingColumns.includes("username")) {
      console.log("➕ Ajout de la colonne username...")
      await db.promise().query("ALTER TABLE users ADD COLUMN username VARCHAR(100) UNIQUE AFTER nom")

      // Remplir la colonne username avec les valeurs de nom
      console.log("📝 Remplissage de la colonne username avec les valeurs de nom...")
      await db.promise().query("UPDATE users SET username = nom WHERE username IS NULL")

      console.log("✅ Colonne username ajoutée et remplie")
    }

    // Ajouter la colonne email si elle n'existe pas
    if (!existingColumns.includes("email")) {
      console.log("➕ Ajout de la colonne email...")
      await db.promise().query("ALTER TABLE users ADD COLUMN email VARCHAR(255) UNIQUE AFTER username")

      // Remplir avec des emails par défaut basés sur le nom et service
      console.log("📝 Remplissage de la colonne email avec des valeurs par défaut...")
      await db.promise().query(`
        UPDATE users 
        SET email = CONCAT(LOWER(nom), '@', LOWER(REPLACE(service, ' ', '')), '.local') 
        WHERE email IS NULL
      `)

      console.log("✅ Colonne email ajoutée et remplie")
    }

    // Ajouter la colonne active si elle n'existe pas
    if (!existingColumns.includes("active")) {
      console.log("➕ Ajout de la colonne active...")
      await db.promise().query("ALTER TABLE users ADD COLUMN active TINYINT(1) DEFAULT 1 AFTER role")
      console.log("✅ Colonne active ajoutée")
    }

    // Ajouter les colonnes de timestamp si elles n'existent pas
    if (!existingColumns.includes("created_at")) {
      console.log("➕ Ajout de la colonne created_at...")
      await db.promise().query("ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
      console.log("✅ Colonne created_at ajoutée")
    }

    if (!existingColumns.includes("updated_at")) {
      console.log("➕ Ajout de la colonne updated_at...")
      await db
        .promise()
        .query(
          "ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        )
      console.log("✅ Colonne updated_at ajoutée")
    }

    // Vérifier la structure finale
    const [finalColumns] = await db.promise().query("DESCRIBE users")
    console.log("📋 Structure finale de la table users:")
    finalColumns.forEach((col) => {
      console.log(
        `   - ${col.Field}: ${col.Type} ${col.Null === "NO" ? "NOT NULL" : "NULL"} ${col.Key ? `(${col.Key})` : ""}`,
      )
    })

    // Afficher les utilisateurs existants
    const [users] = await db.promise().query("SELECT id, nom, username, email, service, role, active FROM users")
    console.log("\n👥 Utilisateurs existants:")
    users.forEach((user) => {
      console.log(`   - ${user.nom} (${user.username}) - ${user.email} - ${user.service} - ${user.role}`)
    })

    console.log("\n✅ Adaptation de la table users terminée avec succès!")
  } catch (error) {
    console.error("❌ Erreur lors de l'adaptation de la table users:", error)
  } finally {
    db.end()
  }
}

// Exécuter le script
adaptUsersTable()
