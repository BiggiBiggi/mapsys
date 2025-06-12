const bcrypt = require("bcryptjs");

const password = "Trrdcmj10.";
const hash = bcrypt.hashSync(password, 10);

console.log("Hash pour le mdp demandé :", hash);
