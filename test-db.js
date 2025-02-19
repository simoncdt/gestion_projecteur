const db = require('./db');

db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            console.error("Erreur lors de la récupération des tables :", err.message);
        } else {
            console.log("Tables dans la base de données :", tables);
        }
    });
});

db.close();