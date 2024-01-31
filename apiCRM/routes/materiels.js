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
  

  router.get('/materiels', function(req, res) {
    const sql = 'SELECT * FROM (( materiels left join services on services.idservices=materiels.idservice ) left join consommables on consommables.idconsommables=materiels.idconsommable left join commandes on commandes.idcommandes=materiels.idcommande) order by idMateriels DESC'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  router.post('/materiels/tri', function(req, res) {
    const data =req.body;
    console.log(data);
    const sql = 'SELECT * FROM (( materiels left join services on services.idservices=materiels.idservice ) left join consommables on consommables.idconsommables=materiels.idconsommable left join commandes on commandes.idcommandes=materiels.idcommande)  order by idMateriels DESC '
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  router.get('/marquemateriel', function(req, res) {
    const sql = 'SELECT distinct  marque,COUNT(marque) as nbrmarque FROM materiels GROUP BY marque ORDER BY nbrmarque DESC'
     connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  })
  
  router.get('/nbrmateriel', function(req, res) {
      const sql = 'SELECT COUNT(idMateriels) as nbr FROM materiels'
       connection.query(sql, [], function(err, results) {
        if (err) throw err;
        res.send(results);
      })});  

   router.get('/etatmateriel', function(req, res) {
        const sql = 'SELECT DISTINCT etat as etat,COUNT(*) as netat FROM materiels GROUP by etat'
         connection.query(sql, [], function(err, results) {
          if (err) throw err;
          res.send(results);
        })});      

  

  ;
 


  
  /*DELETE FROM `materiels` WHERE idMateriels=162 */
  /*SELECT distinct  marque,COUNT(marque)
FROM materiels
GROUP BY marque*/
   /*SELECT COUNT(idMateriels) FROM `materiels` */
  module.exports = router;