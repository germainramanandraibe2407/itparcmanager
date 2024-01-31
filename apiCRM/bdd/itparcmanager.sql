-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 19 juin 2023 à 09:10
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `itparcmanager`
--

-- --------------------------------------------------------

--
-- Structure de la table `besoins`
--

DROP TABLE IF EXISTS `besoins`;
CREATE TABLE IF NOT EXISTS `besoins` (
  `idbesoins` int(11) NOT NULL AUTO_INCREMENT,
  `idmateriels` int(11) DEFAULT NULL,
  PRIMARY KEY (`idbesoins`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `besoins`
--

INSERT INTO `besoins` (`idbesoins`, `idmateriels`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `idcommandes` int(11) NOT NULL AUTO_INCREMENT,
  `datecommande` date DEFAULT NULL,
  `numerofacture` int(11) DEFAULT NULL,
  `datefacture` date DEFAULT NULL,
  `numeroBL` int(11) DEFAULT NULL,
  `dateBL` date DEFAULT NULL,
  PRIMARY KEY (`idcommandes`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`idcommandes`, `datecommande`, `numerofacture`, `datefacture`, `numeroBL`, `dateBL`) VALUES
(1, '2023-06-17', 111, '2023-06-17', 114, '2023-06-18'),
(2, '2023-06-17', 112, '2023-06-17', 115, '2023-06-18');

-- --------------------------------------------------------

--
-- Structure de la table `consommables`
--

DROP TABLE IF EXISTS `consommables`;
CREATE TABLE IF NOT EXISTS `consommables` (
  `idconsommables` int(11) NOT NULL AUTO_INCREMENT,
  `nomconsommable` varchar(45) DEFAULT NULL,
  `marqueconsommable` varchar(45) DEFAULT NULL,
  `reference` varchar(45) DEFAULT NULL,
  `dateremplacement` date DEFAULT NULL,
  PRIMARY KEY (`idconsommables`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `consommables`
--

INSERT INTO `consommables` (`idconsommables`, `nomconsommable`, `marqueconsommable`, `reference`, `dateremplacement`) VALUES
(1, 'encre', 'inconnue', 'rouge', '2023-06-18');

-- --------------------------------------------------------

--
-- Structure de la table `immobilisations`
--

DROP TABLE IF EXISTS `immobilisations`;
CREATE TABLE IF NOT EXISTS `immobilisations` (
  `idimmobilisations` int(11) NOT NULL AUTO_INCREMENT,
  `libellé` varchar(45) DEFAULT NULL,
  `idmateriel` int(11) DEFAULT NULL,
  `iddetenteur` int(11) DEFAULT NULL,
  `iddemandeur` int(11) DEFAULT NULL,
  `fraisimmobilisation` int(11) DEFAULT NULL,
  `statusimmobilisation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idimmobilisations`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `immobilisations`
--

INSERT INTO `immobilisations` (`idimmobilisations`, `libellé`, `idmateriel`, `iddetenteur`, `iddemandeur`, `fraisimmobilisation`, `statusimmobilisation`) VALUES
(1, 'demande matériel', 1, 2, 1, 0, 'éffectué');

-- --------------------------------------------------------

--
-- Structure de la table `materiels`
--

DROP TABLE IF EXISTS `materiels`;
CREATE TABLE IF NOT EXISTS `materiels` (
  `idMateriels` int(11) NOT NULL AUTO_INCREMENT,
  `groupe` varchar(45) DEFAULT NULL,
  `famille` varchar(45) DEFAULT NULL,
  `categorie` varchar(45) DEFAULT NULL,
  `fournisseur` varchar(45) DEFAULT NULL,
  `prixmateriel` int(11) DEFAULT NULL,
  `dateinventaire` date DEFAULT NULL,
  `idcommande` int(11) DEFAULT NULL,
  `idconsommable` int(11) DEFAULT NULL,
  `idservice` int(11) DEFAULT NULL,
  PRIMARY KEY (`idMateriels`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `materiels`
--

INSERT INTO `materiels` (`idMateriels`, `groupe`, `famille`, `categorie`, `fournisseur`, `prixmateriel`, `dateinventaire`, `idcommande`, `idconsommable`, `idservice`) VALUES
(1, 'C', 'ordinateur', 'écran', 'don chine', 0, '2023-06-18', 1, 0, 1),
(2, 'C', 'ordinateur', 'souris', 'don chine', 0, '2023-06-18', 2, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `mouvements`
--

DROP TABLE IF EXISTS `mouvements`;
CREATE TABLE IF NOT EXISTS `mouvements` (
  `idmouvements` int(11) NOT NULL AUTO_INCREMENT,
  `idmateriels` int(11) DEFAULT NULL,
  `idpreneur` int(11) DEFAULT NULL,
  `iddepot` int(11) DEFAULT NULL,
  `dateutilisation` date DEFAULT NULL,
  `dateretour` date DEFAULT NULL,
  PRIMARY KEY (`idmouvements`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `mouvements`
--

INSERT INTO `mouvements` (`idmouvements`, `idmateriels`, `idpreneur`, `iddepot`, `dateutilisation`, `dateretour`) VALUES
(1, 1, 1, 2, '2023-06-17', '2023-06-18');

-- --------------------------------------------------------

--
-- Structure de la table `requettes`
--

DROP TABLE IF EXISTS `requettes`;
CREATE TABLE IF NOT EXISTS `requettes` (
  `idrequettes` int(11) NOT NULL AUTO_INCREMENT,
  `typerequette` varchar(45) DEFAULT NULL,
  `idutilisateurs` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `materieldemandé` int(11) DEFAULT NULL,
  PRIMARY KEY (`idrequettes`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `requettes`
--

INSERT INTO `requettes` (`idrequettes`, `typerequette`, `idutilisateurs`, `status`, `materieldemandé`) VALUES
(1, 'demande', 1, 'en cours', 2),
(2, 'demande', 1, 'en cours', 2);

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `idservices` int(11) NOT NULL AUTO_INCREMENT,
  `region` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idservices`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`idservices`, `region`) VALUES
(1, 'RANA'),
(2, 'RALM');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `idutilisateurs` int(11) NOT NULL AUTO_INCREMENT,
  `nomutilisateur` varchar(45) DEFAULT NULL,
  `idservice` int(11) DEFAULT NULL,
  `occupation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idutilisateurs`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`idutilisateurs`, `nomutilisateur`, `idservice`, `occupation`) VALUES
(1, 'naivo', 1, 'stagiaire'),
(2, 'rakoto', 1, 'logisticien');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
