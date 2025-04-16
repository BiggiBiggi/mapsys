const bcrypt = require("bcryptjs");

const password = "Benji@mars032025";
const hash = bcrypt.hashSync(password, 10);

console.log("Hash pour le mdp demandé :", hash);
