const express = require('express');
var app=express();
const bodyparser=require('body-parser');
const path=require('path');
const mysql = require('mysql');
const router = express.Router();


 
//ajout du middleware body-parser
app.use(bodyparser.json());    
 
//set upp public directory to serve static files
console.log(__dirname)
app.use(express.static('public'));
// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'itparcmanager'
  });
  
// Se connecter à la base de données
connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err);
      return;
    }
    console.log('Connexion à la base de données réussie');
  });
  

  router.get('/', function(req, res) {
    const sql = 'SELECT * FROM utilisateurs left join services on utilisateurs.idservice=services.idservices'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
 
  router.post('/supprimer', function(req, res) {
    const data =req.body;
    console.log(data);
    
  /*NULL,req.body.status,req.body.etat,req.body.groupe,req.body.user,req.body.famille,req.body.categorie,
    req.body.marque,req.body.consommable,req.body.service,
    req.body.numero,req.body.fournisseur,req.body.nfact,req.body.dfact */
  
   // Ajouter materiel à la base de données
   connection.query('DELETE FROM utilisateurs WHERE idutilisateurs=?',
    [data.id], function(err, results) {
    if (err) {
  
      
      return ;
    }
    return res.status(201).json({ message: 'user supprimé avec succès' });
  })
})


                                              
   
  module.exports = router;