const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

//erreur json nety
app.use (express.urlencoded({extended : false}));
// For parsing application/json
/*app.use(express.json());*/
 
// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'itparcmanager'
  });
  
  router.post('/', function(req, res) {
    const data2 =req.body;
    console.log(data2.id);
    let nom=data2.Nom,
        prenom=data2.Prenom,
        occupation=data2.occupation,
        categorie=data2.Categorie,
        marque=data2.Marque,
        id=data2.IdentifiantMat,
        idmouv=data2.id,
        utilisation=data2.dateutilisation
       
         // Ajouter le mouvement à la base de données
      connection.query('INSERT INTO mouvements (idmouvements,idmateriels,nompreneur,prenompreneur,dateutilisation,dateretour,statututilisation) VALUES (NULL, (SELECT idMateriels FROM materiels WHERE codemateriel=? ) ,?,?,?, NULL,?)', [id,nom,prenom,utilisation,"demandé"], function(err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        
        return res.status(201).json({ message: 'mouvement créé avec succès' });
        
      });
     

  })




module.exports = router;