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
  

  router.get('/Mouvement', function(req, res) {
    const sql = 'SELECT * FROM mouvements left join materiels on mouvements.idmateriels=materiels.idMateriels left join services on materiels.idservice=services.idservices order by idmouvements DESC'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results); 
    });
  });


  router.post('/Mouvement/retour', function(req, res) {

    const data2 =req.body;
    console.log(data2);
    let Date=data2.Date,id=data2.id;
    const sql = 'UPDATE mouvements SET dateretour=?,statutretour=? WHERE idmouvements=?'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [Date,'',id], function(err, results) {
      if (err) throw err;
    }
    )
        connection.query('UPDATE mouvements set statututilisation=? where idmouvements=?', ["retourné",id], function(err, results) {
      if (err) {
       
        throw err;
      }
      
    });

    
  });
  router.post('/Mouvement/comretour', function(req, res) {

    const data2 =req.body;
    console.log(`${data2.com} et ${data2.id}`);
    let com=data2.com,id=data2.id;
    const sql = 'UPDATE mouvements SET commentaireretour=? WHERE idmouvements=?'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [com,id], function(err, results) {
      if (err) throw err;
      res.send(results); 
      return ;
    });
  })
  
  router.post('/Mouvement/valider', function(req, res) {

    const data2 =req.body;
    console.log(data2.id);
   
    const sql = 'UPDATE mouvements SET statututilisation=? WHERE idmouvements=?'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, ["utilisé",data2.id], function(err, results) {
      if (err) throw err;
      res.send(results); 
      return ;
    });
  });
  
  router.get('/Mouvement/statut', function(req, res) {
    const sql = 'SELECT COUNT(*) as statut FROM `mouvements` WHERE statutretour=1'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results); 
    });
  });
  
  router.post('/Mouvement/changerstatutretour', function(req, res) {

    const data2 =req.body;
    console.log(data2.id);
   
    const sql = 'UPDATE mouvements SET statutretour=? WHERE idmouvements=?'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [1,data2.id], function(err, results) {
      if (err) throw err;
      res.send(results); 
      return ;
    });
  });


  router.post('/Mouvement/changerstatutmateriel', function(req, res) {

    const data=req.body;
    console.log(data.code);
   
    const sql = 'UPDATE materiels SET statuse=? WHERE codemateriel=?'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [data.statut,data.code], function(err, results) {
      if (err) throw err;
      
      console.log("ok")
      return ;
    });
  });

  router.post('/Mouvement/supprimer', function(req, res) {

    const data2 =req.body;
    console.log(data2.id);
   
    const sql = 'delete from mouvements  WHERE idmouvements=?'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [data2.id], function(err, results) {
      if (err) throw err;
      res.send(results); 
      return ;
    });
  });

  router.post('/Mouvement/ajouthistoriques', function(req, res) {

    const data =req.body;
    console.log(data);
   if(data.nom && data.prenom && data.action)
   {
    const sql = 'insert into historiques (idhistoriques,idutilisateur,action, date) values (NULL,COALESCE((SELECT idutilisateurs FROM utilisateurs WHERE nomutilisateur = ? AND prenomutilisateur = ?), NULL),?,NOW())  '
    //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
     connection.query(sql, [data.nom,data.prenom,data.action], function(err, results) {
       if (err) 
          throw err;
       else  
        return ;
     });
   }
  

  });
  router.get('/Mouvement/affichehistoriques', function(req, res) {

    const sql = 'SELECT * FROM historiques join utilisateurs on historiques.idutilisateur=utilisateurs.idutilisateurs order by idhistoriques desc'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results); 
      return ;
    });
  })

  router.get('/Mouvement/nbrdemande', function(req, res) {

    const data2 =req.body;
    console.log(data2.id);
   
    const sql = 'select count(*) as nbr from mouvements WHERE statututilisation="demandé"'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [data2.id], function(err, results) {
      if (err) throw err;
      res.send(results); 
      return ;
    });
  })
  

                                              
   
  module.exports = router;