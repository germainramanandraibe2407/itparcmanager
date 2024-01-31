const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
app.use(cors());

//erreur json nety
app.use (express.urlencoded({extended : true}));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'itparcmanager'
  });

  // Middleware pour parser les requêtes en JSON
app.use(express.json());

// Middleware pour gérer la session
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));
// Route pour la racine de l'application
app.get('/', function(req, res) {
  res.send('Bienvenue sur l\'API');
});

// Routes pour l'API materiels
const materielsRoutes = require('./routes/materiels');
app.use('/api/materiels', materielsRoutes);

// Routes pour l'API d ajout materiel
const ajoutMaterielRoutes = require('./routes/ajoutmateriels');
app.use('/api/ajoutmateriel', ajoutMaterielRoutes);


 // Routes pour l'API de signup
const signUpRoutes = require('./routes/signup');
app.use('/api/signup', signUpRoutes);

// Routes pour l'API de login
const AfficheUserRoutes = require('./routes/AfficheUser');
app.use('/api/AfficheUser', AfficheUserRoutes);

// Routes pour l'API de login
const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);

// Routes pour l'API de mouvement de sortie
const MouvementRoutes = require('./routes/Mouvement');
app.use('/api/Mouvement', MouvementRoutes);


// Routes pour l'API de mouvement de sortie
const AfficheMouvementRoutes = require('./routes/AfficheMouvement');
app.use('/api/AfficheMouvement', AfficheMouvementRoutes);  

  // Démarrage du serveur
  app.listen(3000, function() {
    console.log('Serveur démarré sur le port 3000');
  });

  /* Routes pour l'API de Ajout
const AjoutMaterielsRoutes = require('./routes/ajoutmateriel');
app.use('/api/ajoutmateriel', AjoutMaterielsRoutes);
*/
 

