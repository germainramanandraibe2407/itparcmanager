const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration de la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'itparcmanager'
});

// Middleware pour parser les requêtes en JSON
router.use(express.json());

// Middleware pour vérifier l'en-tête d'autorisation
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'my-secret-key', function(err, decoded) {
      if (err) {
       // return res.status(401).send('Token invalide');
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    //res.status(401).send('Token non fourni');
  }
}

// Routes pour l'API de login   nom,prenom, password 
router.post('/', function(req, res) {
  const email= req.body.email,
    
    password=req.body.password; 
   console.log(email)
   console.log(password)

  const sql = 'SELECT * FROM utilisateurs WHERE email=? ';

  connection.query(sql, [email], function(err, results) {
    console.log(results)
    if (results && results.length==0) {
      res.send({err1:'veuillez verifier votre identité2'});
      console.log(`${email} k`);
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.motdepasse, function(err, result) {
      if (err) throw err;

      if (result === false) {
        res.send({err2:' Mot de passe incorrect'});
        console.log(`${user.motdepasse} l  Mot de passe incorrect`);
        return;
      }
      const role=user.role,nom=user.nomutilisateur,prenom=user.prenomutilisateur,occupation=user.occupation
      const token = jwt.sign({ userId: user.userId }, 'my-secret-key');
      
      res.send({ token,role,nom,prenom,occupation})
      
      console.log(`${email} m` );


    });
  });
});

module.exports = router;
