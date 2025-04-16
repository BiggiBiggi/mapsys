# 🗺️ MapSys

**MapSys** est une application web full-stack en **React.js**, **Node.js** et **MySQL**, permettant la visualisation et la gestion des équipements informatiques sur un plan de la base.

---

## 🚀 Fonctionnalités

- Authentification par session
- Navigation sur plan interactif
- Gestion des imprimantes, PC et supports (React Admin)
- Backend Express connecté à MySQL
- Chargement rapide avec Vite

---

## 🛠️ Technologies

**Frontend** : React, React Router, React Admin, Vite  
**Backend** : Node.js, Express, MySQL, bcryptjs  
**Autres** : SCSS Modules, sessionStorage, CORS

---

## 📁 Structure simplifiée

```
MapSys/
├── src/
│   ├── components/     # Interface Admin, Plan, Header, Footer
│   ├── assets/         # Backend Express (bdd_plan)
│   ├── App.jsx, main.jsx
├── package.json, vite.config.js, index.html
```

---

## ⚙️ Installation rapide

```bash
npm install
npm run dev
```

Base MySQL requise avec une table `users`. Un utilisateur `admin` et un mot de passe haché avec bcryptjs.

---

## 🔐 Authentification

- Connexion obligatoire via `/login`
- Données stockées dans `sessionStorage` (réinitialisation à la fermeture de la fenêtre)
- Toutes les routes sont protégées par `PrivateRoute`

---

## 🧑‍💻 Auteur

[BiggiBiggi](https://github.com/BiggiBiggi)

---

## 📄 Licence

MIT
