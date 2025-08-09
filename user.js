const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/characters', (req, res) => {
  const filePath = path.join(__dirname, 'user.json');

  fs.readFile(filePath, 'utf8', (err, jsonString) => {
    if (err) {
      console.error('Erreur lecture fichier:', err);
      return res.status(500).json({ error: 'Erreur lecture fichier', details: err.message });
    }

    try {
      const users = JSON.parse(jsonString);
      return res.status(200).json(users); // ENVOIE les données lues
    } catch (parseErr) {
      console.error('Erreur parsing JSON:', parseErr);
      return res.status(500).json({ error: 'JSON invalide', details: parseErr.message });
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
