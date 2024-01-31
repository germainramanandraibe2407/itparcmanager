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

//set upp public directory to serve static files

// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'itparcmanager'
  });
  
  // Middleware pour parser les requêtes en JSON


router.post('/', function(req, res) {
  const data =req.body;
  console.log(data);
  let code=data.groupe+data.famille.slice(0,4)+data.categorie.slice(0,4)+data.fournisseur.slice(0,4)+'-'+data.region.slice(1,4)+data.numero
    code=code.toUpperCase()
/*NULL,req.body.status,req.body.etat,req.body.groupe,req.body.user,req.body.famille,req.body.categorie,
  req.body.marque,req.body.consommable,req.body.service,
  req.body.numero,req.body.fournisseur,req.body.nfact,req.body.dfact */

 // Ajouter materiel à la base de données
 connection.query('INSERT INTO materiels (idMateriels,codemateriel,groupe,famille,categorie,marque,statuse,etat,fournisseur,prixmateriel,dateinventaire,idcommande,idconsommable,idservice,numero,commentaireMateriel) values (NULL,?,?,?,?,?,?,?,?,?,?,(SELECT commandes.idcommandes FROM commandes WHERE commandes.numerofacture=?) ,(SELECT consommables.idconsommables FROM consommables WHERE consommables.nomconsommable=?),(SELECT services.idservices FROM services WHERE services.region=?),?,?)',
  [code,data.groupe,data.famille,data.categorie,
  data.marque,data.status,data.etat,data.fournisseur,data.prixmateriel,data.dateinventaire,data.numerofacture,data.nomconsommable,data.region,data.numero,data.texte], function(err, results) {
  if (err) {

    
    return ;
  }
  return res.status(201).json({ message: 'materiel créé avec succès' });
       
});

})

router.post('/edit', function(req, res) {
  const data =req.body;
  console.log(data);
  let code=data.groupe+data.famille.slice(0,4)+data.categorie.slice(0,4)+data.fournisseur.slice(0,4)+'-'+data.region.slice(1,4)+data.numero
    code=code.toUpperCase()

 connection.query('UPDATE materiels SET codemateriel = COALESCE(?, codemateriel), groupe = COALESCE(?, groupe), famille = COALESCE(?, famille), categorie = COALESCE(?, categorie), marque = COALESCE(?, marque), statuse = COALESCE(?, statuse), etat = COALESCE(?, etat), fournisseur = COALESCE(?, fournisseur),prixmateriel = NULLIF(?, ""), idcommande = COALESCE((SELECT commandes.idcommandes FROM commandes WHERE commandes.numerofacture = ?), idcommande), idconsommable = COALESCE((SELECT consommables.idconsommables FROM consommables WHERE consommables.nomconsommable = ?), idconsommable), idservice = COALESCE((SELECT services.idservices FROM services WHERE services.region = ?), idservice), numero = COALESCE(?, numero), commentaireMateriel = COALESCE(?, commentaireMateriel) WHERE idMateriels = ?',
  [code,data.groupe,data.famille,data.categorie,
  data.marque,data.status,data.etat,data.fournisseur,data.prixmateriel,data.numerofacture,data.nomconsommable,data.region,data.numero,data.texte,data.id], function(err, results) {
  if (err) {
    res.status(500).json({ message: 'erreur serveur' });
    console.log(err)
    return ;
  }
  return res.status(201).json({ message: 'materiel créé avec succès' });
       
});

})

router.post('/supprimer', function(req, res) {
  const data =req.body;
    const sql = 'DELETE FROM materiels WHERE idMateriels=?'
   //JOIN commandes ON materiels.idcommande=commandes.idcommandes JOIN consommables ON materiels.idconsommable=consommables.idconsommables JOIN services ON materiels.idservice=services.idservices 
    connection.query(sql, [data.idsup], function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  }); 



  module.exports = router;