const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration de la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'itparcmanager'});

//erreur json nety

app.use(express.urlencoded({extended: false}))  


// Route pour l'API de sign up
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour la validation de l'email

router.post('/', function(req,results) {
    
    
    const data =req.body;
        let firstname=data.firstname,lastname=data.lastname,email=data.email,role=data.role,reg=data.region,occupation=data.occupation,pass=data.pass,phone=data.phone;    

         
// Vérifier que tous les champs ont été fournis
  if(!firstname || !lastname || !reg || !occupation || !pass || !phone) {
    return results.status(400).json({ message: `Veuillez fournir tous les champs` })
  }

  // Vérifier la longueur des champs nom et prénom
  const minNameLength = 2;
  const maxNameLength = 50;
  if (firstname.length < minNameLength || firstname.length > maxNameLength || lastname.length < minNameLength || lastname.length > maxNameLength) {
    return res.status(400).json({ message: 'Le nom et le prénom doivent contenir entre 2 et 50 caractères' })
   
  }

   // Vérifier les caractères valides pour les champs nom et prénom
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/; // Permet les lettres (avec accents), les tirets et les espaces
  if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
    return res.status(400).json({ message: 'Le nom et le prénom doivent contenir uniquement des lettres, des tirets et des espaces' });
  } 
 
  // Vérifier si l'utilisateur existe déjà
  connection.query('SELECT * FROM utilisateurs WHERE ((nomutilisateur=? && prenomutilisateur=?)||(email=?) )', [firstname, lastname,email], function(err,res) {
    if (err) {
      // Gérer l'erreur
      console.error(err);
      return;
    }
    if (res.length>0) {
   
    results.send({erreur:'utilisateur non créé '});
    } else {
      console.log("La réponse n'existe pas."),
       // La réponse n'existe pas
     // console.log("La réponse n'existe pas.");
    

   //Crypter le mot de passe
    bcrypt.hash(pass, 10, function(err, hash) {
        if (err) {
          console.error(err);
          return results.status(500).json({ message: 'Erreur serveur' });
        }
     
         //Ajouter l'utilisateur à la base de données
        connection.query('INSERT INTO utilisateurs(nomutilisateur,prenomutilisateur,email,role,idservice,occupation,telephone,motdepasse)VALUES(?,?,?,?,(SELECT idservices FROM services WHERE region=?),?,?,?)', [firstname, lastname,email,role,reg, occupation,phone, hash], function(resu ) 
        {
          if (err) {
            console.error(err);
            return ;
          }
          
      
           results.send({succes:'utilisateur créé avec succes'});
        });


       });

     
    }

    
  
    
     
      });
    })
     
    





module.exports = router;