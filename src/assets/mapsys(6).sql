-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 172.17.238.52:3306
-- Généré le : jeu. 12 juin 2025 à 13:46
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mapsys`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse_ip`
--

DROP TABLE IF EXISTS `adresse_ip`;
CREATE TABLE IF NOT EXISTS `adresse_ip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(15) NOT NULL,
  `id_eqts` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `adresse_ip_equipement0_FK` (`id_eqts`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `adresse_ip`
--

INSERT INTO `adresse_ip` (`id`, `ip`, `id_eqts`) VALUES
(1, '192.168.200.1', 1),
(2, '192.168.200.2', 2),
(3, '192.168.200.3', 3),
(4, '192.168.200.4', 4),
(5, '10.10.0.10', 5);

-- --------------------------------------------------------

--
-- Structure de la table `affecte`
--

DROP TABLE IF EXISTS `affecte`;
CREATE TABLE IF NOT EXISTS `affecte` (
  `id` int NOT NULL,
  `id_poste_de_travail` int NOT NULL,
  PRIMARY KEY (`id`,`id_poste_de_travail`),
  KEY `affecte_poste_de_travail1_FK` (`id_poste_de_travail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `affecte`
--

INSERT INTO `affecte` (`id`, `id_poste_de_travail`) VALUES
(15, 1),
(14, 2),
(16, 3);

-- --------------------------------------------------------

--
-- Structure de la table `equipement`
--

DROP TABLE IF EXISTS `equipement`;
CREATE TABLE IF NOT EXISTS `equipement` (
  `id_eqts` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `sn` varchar(30) NOT NULL,
  `prise` varchar(15) NOT NULL,
  `model` varchar(50) NOT NULL,
  `type` enum('PC Portable','PC Fixe','Imprimante Support','Imprimante Copieur') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_eqts`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `equipement`
--

INSERT INTO `equipement` (`id_eqts`, `nom`, `sn`, `prise`, `model`, `type`) VALUES
(1, 'PC-PORT-TEST01', 'SNPCTEST01', 'Prise-PTEST1', 'Dell XPS 13 Test', 'PC Portable'),
(2, 'PC-FIXE-TEST01', 'SNFIXTEST01', 'Prise-FTEST1', 'HP Envy Desktop Test', 'PC Fixe'),
(3, 'IMP-SUP-TEST01', 'SNSUPTEST01', 'Prise-STEST1', 'Epson EcoTank Test', 'Imprimante Support'),
(4, 'IMP-COP-TEST01', 'SNCOPTEST01', 'Prise-CTEST1', 'Xerox WorkCentre Test', 'Imprimante Copieur'),
(5, 'PC-PORT-DEVTEST', 'SNDEVTEST01', 'Dock-DevTest1', 'MacBook Pro 16 Test', 'PC Portable');

-- --------------------------------------------------------

--
-- Structure de la table `imp_cop`
--

DROP TABLE IF EXISTS `imp_cop`;
CREATE TABLE IF NOT EXISTS `imp_cop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_infolog` varchar(10) NOT NULL,
  `type_edition` varchar(20) NOT NULL,
  `id_eqts` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `imp_cop_equipement0_AK` (`id_eqts`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `imp_cop`
--

INSERT INTO `imp_cop` (`id`, `nom_infolog`, `type_edition`, `id_eqts`) VALUES
(1, 'INF-LOG-TE', 'A4/A3 Test', 4);

-- --------------------------------------------------------

--
-- Structure de la table `imp_sup`
--

DROP TABLE IF EXISTS `imp_sup`;
CREATE TABLE IF NOT EXISTS `imp_sup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_eqts` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `imp_sup_equipement0_AK` (`id_eqts`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `imp_sup`
--

INSERT INTO `imp_sup` (`id`, `id_eqts`) VALUES
(1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `lieux`
--

DROP TABLE IF EXISTS `lieux`;
CREATE TABLE IF NOT EXISTS `lieux` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `type` enum('Cellule','Bureau','Étage') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_lieux` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lieux_lieux0_FK` (`id_lieux`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `lieux`
--

INSERT INTO `lieux` (`id`, `nom`, `type`, `id_lieux`) VALUES
(1, 'Cellule 6', 'Cellule', NULL),
(2, 'Cellule 7', 'Cellule', NULL),
(3, 'Cellule 8', 'Cellule', NULL),
(4, 'Cellule 9', 'Cellule', NULL),
(5, 'Cellule 10', 'Cellule', NULL),
(6, 'Cellule 11', 'Cellule', NULL),
(7, 'Cellule 12', 'Cellule', NULL),
(8, 'Cellule 13', 'Cellule', NULL),
(9, 'Aire Palettes', 'Cellule', NULL),
(10, 'Zone Contenants', 'Cellule', NULL),
(11, 'FFL', 'Cellule', NULL),
(12, 'Meca', 'Cellule', NULL),
(13, 'Gel Cellule 1', 'Cellule', NULL),
(14, 'Gel Cellule 2', 'Cellule', NULL),
(15, 'Administratif', 'Bureau', NULL),
(16, 'Poste de Garde', 'Bureau', NULL),
(17, 'Chef de Quai', 'Bureau', 6),
(18, 'Préparation SEC', 'Bureau', 6),
(19, 'REX Sec', 'Bureau', 6),
(20, 'RH Sec', 'Bureau', 6),
(21, 'Réception SEC', 'Bureau', 4),
(22, 'Stocks', 'Bureau', 4),
(23, 'REX CIBE', 'Bureau', 4),
(24, 'Interbase', 'Bureau', 4),
(25, 'Contenants', 'Bureau', 10),
(26, 'ENTA', 'Bureau', 1),
(27, 'Postier', 'Bureau', 1),
(28, 'CE FFL', 'Bureau', 11),
(29, 'Murisserie', 'Bureau', 11),
(30, 'Ordonnancement', 'Bureau', 12),
(31, 'CE Prépa Frais', 'Bureau', 12),
(32, 'Reception Frais', 'Bureau', 12),
(33, 'REX Frais', 'Bureau', 12),
(34, 'Salle Repos', 'Bureau', 14),
(35, 'Préparation GEL', 'Bureau', 13),
(36, 'Réception GEL', 'Bureau', 13),
(37, 'Étage 1 Admin', 'Étage', 15);

-- --------------------------------------------------------

--
-- Structure de la table `pc`
--

DROP TABLE IF EXISTS `pc`;
CREATE TABLE IF NOT EXISTS `pc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_glpi` int NOT NULL,
  `id_eqts` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pc_equipement0_AK` (`id_eqts`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pc`
--

INSERT INTO `pc` (`id`, `id_glpi`, `id_eqts`) VALUES
(1, 5001, 1),
(2, 5002, 2),
(3, 5003, 5);

-- --------------------------------------------------------

--
-- Structure de la table `positionne`
--

DROP TABLE IF EXISTS `positionne`;
CREATE TABLE IF NOT EXISTS `positionne` (
  `id_eqts` int NOT NULL,
  `id` int NOT NULL,
  `date_position` datetime NOT NULL,
  PRIMARY KEY (`id_eqts`,`id`),
  KEY `positionne_poste_de_travail1_FK` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `positionne`
--

INSERT INTO `positionne` (`id_eqts`, `id`, `date_position`) VALUES
(1, 0, '2025-06-12 15:28:41');

-- --------------------------------------------------------

--
-- Structure de la table `possede`
--

DROP TABLE IF EXISTS `possede`;
CREATE TABLE IF NOT EXISTS `possede` (
  `id` int NOT NULL,
  `id_telephone` int NOT NULL,
  PRIMARY KEY (`id`,`id_telephone`),
  KEY `possede_telephone1_FK` (`id_telephone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `possede`
--

INSERT INTO `possede` (`id`, `id_telephone`) VALUES
(13, 1),
(14, 2),
(15, 3);

-- --------------------------------------------------------

--
-- Structure de la table `poste_de_travail`
--

DROP TABLE IF EXISTS `poste_de_travail`;
CREATE TABLE IF NOT EXISTS `poste_de_travail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `id_lieux` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `poste_de_travail_lieux0_FK` (`id_lieux`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `poste_de_travail`
--

INSERT INTO `poste_de_travail` (`id`, `nom`, `id_lieux`) VALUES
(1, 'Poste Test Alpha', 15),
(2, 'Poste Test Beta', 26),
(3, 'Poste Test Gamma', 37),
(4, 'Poste Test Delta', 1);

-- --------------------------------------------------------

--
-- Structure de la table `telephone`
--

DROP TABLE IF EXISTS `telephone`;
CREATE TABLE IF NOT EXISTS `telephone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `telephone`
--

INSERT INTO `telephone` (`id`, `numero`) VALUES
(1, '05.58.58.51.50'),
(2, '05.58.58.51.51'),
(3, '06.11.22.33.44');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `service` enum('ADMINISTRATIFS','CALOG','CHEF DE QUAI JOUR','CHEF DE QUAI NUIT','CONTENANT','DE','DEX','ENTA','EXPEDITION','INFORMATIQUE','ITB','MURISSERIE','ORDO','POSTE DE GARDE','POSTIER','PREPA FFL','PREPA FRAIS','PREPA GEL','PREPA SEC','QHSE','RECEPTION FFL','RECEPTION FRAIS','RECEPTION GEL','RECEPTION SEC','REGION','REX','RH','SCAFRUIT','SCAMER','SPDV','STOCKS','TECHNIQUE','ZONE CASSE') NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('utilisateur','admin','','') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_user0_FK` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `service`, `password`, `role`, `id_user`) VALUES
(14, 'support01', 'INFORMATIQUE', '$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'utilisateur', 23),
(15, 'logistique01', 'CALOG', '$2b$10$yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', 'utilisateur', NULL),
(16, 'dev01', 'INFORMATIQUE', '$2b$10$zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 'admin', 23),
(23, 'admin01', 'ADMINISTRATIFS', '$2b$10$eZxKJ0m.9x.0qr.QQtF9a.5.XERdT7ANO0EnBX/CsJztW8DENhMWS', 'admin', NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `adresse_ip`
--
ALTER TABLE `adresse_ip`
  ADD CONSTRAINT `adresse_ip_equipement0_FK` FOREIGN KEY (`id_eqts`) REFERENCES `equipement` (`id_eqts`);

--
-- Contraintes pour la table `affecte`
--
ALTER TABLE `affecte`
  ADD CONSTRAINT `affecte_poste_de_travail1_FK` FOREIGN KEY (`id_poste_de_travail`) REFERENCES `poste_de_travail` (`id`),
  ADD CONSTRAINT `affecte_user0_FK` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `imp_cop`
--
ALTER TABLE `imp_cop`
  ADD CONSTRAINT `imp_cop_equipement0_FK` FOREIGN KEY (`id_eqts`) REFERENCES `equipement` (`id_eqts`);

--
-- Contraintes pour la table `imp_sup`
--
ALTER TABLE `imp_sup`
  ADD CONSTRAINT `imp_sup_equipement0_FK` FOREIGN KEY (`id_eqts`) REFERENCES `equipement` (`id_eqts`);

--
-- Contraintes pour la table `lieux`
--
ALTER TABLE `lieux`
  ADD CONSTRAINT `lieux_lieux0_FK` FOREIGN KEY (`id_lieux`) REFERENCES `lieux` (`id`);

--
-- Contraintes pour la table `pc`
--
ALTER TABLE `pc`
  ADD CONSTRAINT `pc_equipement0_FK` FOREIGN KEY (`id_eqts`) REFERENCES `equipement` (`id_eqts`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
