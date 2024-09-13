-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 13 sep. 2024 à 14:49
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

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
-- Structure de la table `imp_copieurs`
--

DROP TABLE IF EXISTS `imp_copieurs`;
CREATE TABLE IF NOT EXISTS `imp_copieurs` (
  `Nom_IMP_Serveur` varchar(50) DEFAULT NULL,
  `Lieux` varchar(50) DEFAULT NULL,
  `Model` varchar(20) DEFAULT NULL,
  `Adresse_IP` varchar(15) DEFAULT NULL,
  `SN` varchar(20) DEFAULT NULL,
  `Type_Edition` varchar(20) DEFAULT NULL,
  `Nom_Infolog` varchar(20) DEFAULT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `imp_copieurs`
--

INSERT INTO `imp_copieurs` (`Nom_IMP_Serveur`, `Lieux`, `Model`, `Adresse_IP`, `SN`, `Type_Edition`, `Nom_Infolog`, `Id`) VALUES
('IMP_Poste_de_Garde', 'POSTE DE GARDE', 'IM350', '172.27.238.44', '3383P453615', 'A4', '', 1),
('IMP_RH_Couleur', 'COULEUR RH (Chloé)', 'IM C300', '172.27.238.43', '3932P850251', 'A4 Couleur', '', 2),
('IMP_Resp_Technique', 'TECHNIQUE (Cathy Cambos)', 'IM C300', '172.27.238.105', '3931P850680', 'A4', '', 3),
('IMP_Personnel_Couleur', 'PERSONNEL (Bureau Valérie)', 'IMC3000', '172.27.238.108', '3100R211199', 'A4 Couleur', '', 4),
('IMP_Adm_NB_2', 'BUREAU N&B  2', 'MP 4055', '172.27.238.54', 'C378J600038', 'NB', 'I06820A8', 5),
('IMP_Pole_admin', 'POLE ADMINISTRATIF', 'MP 4055', '172.27.238.46', 'C379P600117', 'A4 - FAX', 'I06820A5', 6),
('IMP_SPDV', 'SPDV', 'MP4055', '172.27.238.52', 'C370P700389', 'A4 - FAX', 'I06820A3', 7),
('IMP_Adm_Couleur_1', 'BUREAU COULEUR 1', 'IMC3000', '172.27.238.53', '3102RC18658', 'COULEUR', '', 8),
('IMP_DE', 'DE', 'SP 4510 DN', '172.27.238.47', 'T576H603265', 'A4', '', 9),
('', 'COULEUR DS', 'SP C340DN', 'pas sur le rése', 'Y187PC00220', 'A4 Couleur', '', 10),
('IMP_TELEVENTE_FFL', 'TELEVENTE FRUIT ST PAUL', 'MPC5504', '172.27.238.62', 'C748MB00140', 'A4', '', 11),
('IMP_Poste_1', 'SECOURS POSTIER', 'MP 7503SP', '172.27.238.41', 'G668J600116', 'A4 - FAX', 'I06820T8', 12),
('IMP_Poste_2', 'POSTIER ', 'IM 8000', '172.27.238.42', 'W3670C830015', 'A4', 'I06820T9', 13),
('IMP_Technique', 'ATELIER TECHNIQUE', 'SP 4510 DN', '172.27.238.49', 'T575H200576', 'A4', '', 14),
('IMP_ERT', 'ERT / ENTA', 'MP 4055', '172.27.238.48', 'C378J100487', 'A4', '', 15),
('IMP_Preparation_Allee_48', 'POSTE AVANCE SEC Allée 48', 'SP 4310 DN', '172.27.238.112', 'T576H603270', 'A4', 'I06821R3', 16),
('IMP_Stock', 'STOCK', 'IM C300', '172.27.238.40', '3932P850190', 'A4', 'I06820P3', 17),
('IMP_Reception_SEC', 'RECEPTION SEC', 'MP 4054', '', 'G176R750154', 'A4 - FAX', 'I06820R1', 18),
('IMP_Reception_SEC', 'RECEPTION SEC', 'IM4000', '172.27.238.51', '4443R140080', 'A4', 'I06820R1', 19),
('IMP_Resp_Exploitation', 'BUREAU QUAI FLOTTANT', 'SP 4510 DN', '172.27.238.56', 'T575H200547', 'A4', '', 20),
('IMP_Poste_3', 'Quai Jour ', 'MP 4055', '172.27.238.106', 'C370PB00150', 'A4', 'I06820T5', 21),
('IMP_Preparation', 'PREPARATION SEC', 'MP 4055', '172.27.238.50', 'C377P800020', 'A4', 'I06820A7', 22),
('IMP_Entrepot_couleur', 'Bureau RH Proximité', 'PC301', '172.27.238.55', '5430P800081', 'A4 Couleur', '', 23),
('', 'GEODE', 'SP 4310 DN', '172.27.238.110', 'T1129461813', 'A4', 'I06821R1', 24),
('IMP_Preparation_Allee_18', 'POSTE AVANCE SEC Allée 18', 'SP 4510 DN', '172.27.238.111', 'T578H908893', 'A4', 'I06821R2', 25),
('IMP_Resp_Reception', 'CELLULE 13 : GROTTE', 'SP 4510 DN', '172.27.238.39', 'T576H603259', 'A4', 'I06820R5', 26),
('IMP_Contenants', 'CONTENANT', 'MP 7503SP', '172.27.238.38', 'G669C370013', 'A4', 'I06820T6', 27),
('', 'ZONE CASSE', 'SP 4310 DN', 'pas sur le rése', 'T1148660872', 'A4', '', 28),
('IMP_Reception_FFL', 'Prepa/Récep  FRUIT', 'IM350', '172.27.238.60', '3380P200660', 'A4', 'I06820R6', 29),
('IMP_Murisserie', 'MURISSERIE', 'SP 4510 DN', '172.27.238.61', 'T578H701366', 'A4', 'I068MU01', 30),
('IMP_REX_Nuit', 'CHEF EQUIPE MECA', 'IM350', '172.27.238.104', '3380P800555', 'A4', 'I06820P1', 31),
('IMP_Ordonnancement', 'ORDONNANCEUR', 'MP 305+', '172.27.238.102', 'G588P200515', 'A4', 'I06820A6', 32),
('IMP_Preparation_Frais + Fax_reception_frais', 'RECEPTION FRAIS RDC', 'MP 4055', '172.27.238.101', 'C370PB00044', 'A4', 'I06820P2', 33),
('IMP_REX_Frais', 'RECEPTION FRAIS ETAGE', 'IM C300', '172.27.238.100', '3933P850695', 'A4 Couleur', 'I06820A2', 34),
('IMP_admin_recept_frais', 'Récep FRAIS (Sandrine)', 'P501', '172.27.238.114', '5212P704144', 'A4', 'I06820R8', 35),
('IMP_Reception_Quai_Frais', 'RECEPTION QUAI FRAIS', 'P501', '172.27.238.107', '5212P704180', 'A4', 'I06820R7', 36),
('IMP_Reception_Gel', 'RECEPTION GEL', 'SP 4510 DN', '172.27.238.57', 'T578H500306', 'A4', 'I06820R4', 37),
('IMP_PREPARATION_GEL_COULEUR', 'PREPARATION GEL', 'IM C3000', '172.27.238.58', '3102RB10287', 'COULEUR', 'I06820T7', 38);

-- --------------------------------------------------------

--
-- Structure de la table `imp_support`
--

DROP TABLE IF EXISTS `imp_support`;
CREATE TABLE IF NOT EXISTS `imp_support` (
  `Nom_IMP` varchar(10) NOT NULL,
  `Adresse_IP` varchar(15) NOT NULL,
  `SN` varchar(20) NOT NULL,
  `Lieux_Affectation` varchar(50) NOT NULL,
  `Type` varchar(10) NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Listes Imprimantes Supports';

--
-- Déchargement des données de la table `imp_support`
--

INSERT INTO `imp_support` (`Nom_IMP`, `Adresse_IP`, `SN`, `Lieux_Affectation`, `Type`, `ID`) VALUES
('I068ME01', '172.17.238.10', 'D2J211300638', 'Méca sortie 005', 'ZD420', 1),
('I068ME21', '172.17.238.100', 'D2J184704530', 'Méca sortie 146', 'ZD420', 2),
('I068ME22', '172.17.238.101', 'D2J213802800', 'Méca sortie 154', 'ZD420', 3),
('I068ME23', '172.17.238.102', 'D2J213802792', 'Méca Sortie 161', 'ZD420', 4),
('I068ME24', '172.17.238.103', 'D2J213802853', 'Mécas Sortie 169', 'ZD420', 5),
('I068ME02', '172.17.238.11', 'D2J211300628', 'Méca sortie 015', 'ZD420', 6),
('I068ME03', '172.17.238.12', 'D2J211300639', 'Méca sortie 023', 'ZD420', 7),
('I068ME04', '172.17.238.13', 'D2J211300643', 'Méca sortie 030', 'ZD420', 8),
('I068ME05', '172.17.238.14', 'D2J211300636', 'Méca sortie 040', 'ZD420', 9),
('I068ME07', '172.17.238.16', 'D2J184404554', 'Méca sortie 055', 'ZD420', 10),
('I068ME08', '172.17.238.17', 'D2J211300632', 'Méca sortie 062', 'ZD420', 11),
('I068ME09', '172.17.238.18', 'D2J211300648', 'Méca sortie 069', 'ZD420', 12),
('I068ME10', '172.17.238.19', 'D2J211300635', 'Méca sortie 077', 'ZD420', 13),
('I068ME11', '172.17.238.20', 'D2J211300649', 'Méca sortie 087', 'ZD420', 14),
('I068ME12', '172.17.238.21', 'D2J211300631', 'Méca sortie 095', 'ZD420', 15),
('I068ME13', '172.17.238.22', 'D2J211300640', 'Méca sortie 100', 'ZD420', 16),
('I068ME14', '172.17.238.23', 'D2J183006172', 'Méca sortie 108', 'ZD420', 17),
('I068ME15', '172.17.238.24', 'D2J184704525', 'Méca sortie 115', 'ZD420', 18),
('I068ME16', '172.17.238.25', 'D2J183006178', 'Méca sortie 123', 'ZD420', 19),
('I068ME17', '172.17.238.28', 'D2J200204182', 'Méca sortie 133', 'ZD420', 20),
('I068ME18', '172.17.238.29', 'D2J211300626', 'Méca sortie 141', 'ZD420', 21),
('I068ME20', '172.17.238.31', 'D2J211300642', 'Méca sortie 049', 'ZD420', 22),
('I068MU02', '172.17.238.33', 'D2J183006179', 'Murisserie', 'ZD420', 23),
('I06820V1', '172.17.238.34', 'D2J184704531', 'Ventil Cellule 5', 'ZD420', 24),
('I068MA01', '172.17.238.35', 'D2J211300641', 'MEA SEC 1', 'ZD420', 25),
('I068MA02', '172.17.238.36', 'D2J213802816', 'MEA SEC 2', 'ZD420', 26),
('I068FS01', '172.17.238.37', 'D2J200203271', 'Frais Stocké', 'ZD420', 27),
('I06820P6', '172.17.238.38', 'D2J211300633', 'Scamer', 'ZD420', 28),
('I068FS02', '172.17.238.39', 'D2J184704528', 'pupitre expe', 'ZD420', 29),
('I06820T2', '172.17.238.40', 'D2J211300637', 'Pupitre itb', 'ZD420', 30),
('I06825P1', '172.27.238.134', '52J181903027', 'Cellule 8/Allée 58', 'ZT230', 31),
('I06825P1', '172.27.238.134', '52J223702426', 'Cellule 8/Allée 58', 'ZT230', 32),
('I06825P2', '172.27.238.135', '52J204301244', 'Cellule 9/Allée 48', 'ZT230', 33),
('I06825P3', '172.27.238.136', '52J211400826', 'Cellule 10/ Allée 38', 'ZT230', 34),
('I06826P1', '172.27.238.137', '52J161401114', 'Cellule 09/Allée 44', 'ZT230', 35),
('I06826P2', '172.27.238.138', '52J162300482', 'Cellule 10/Allée 34', 'ZT230', 36),
('I06826P3', '172.27.238.139', '52J215001716', 'Expédition', 'ZT230', 37),
('I06827P1', '172.27.238.140', '52J201201106', 'Cellule 7A/Allée 72', 'ZT230', 38),
('I06827P2', '172.27.238.141', '52J220302198', 'Cellule 11/Allée 24', 'ZT230', 39),
('I06827P3', '172.27.238.142', '52J211602046', 'Cellule 12/Allée 18', 'ZT230', 40),
('I06828P1', '172.27.238.143', '52J211502510', 'Cellule 11/Allée 28', 'ZT230', 41),
('I06828P2', '172.27.238.144', '03J124900886', 'Cellule 12/Allée 14', 'S4M', 42),
('I06828P3', '172.27.238.145', '52J161401113', 'Cellule 8/Allée 54', 'ZT230', 43),
('I06820A1', '172.27.238.146', '03J130900293', 'Zone casse', 'S4M', 44),
('I06820T1', '172.27.238.147', '03J09490241', 'Bureau préparation', 'S4M', 45),
('I06820T1', '172.27.238.147', '52J181903027', 'Bureau préparation', 'ZT230', 46),
('I06821P2', '172.27.238.149', '52J173903891', 'Gel/Allée 86', 'ZT230', 47),
('I06822P1', '172.27.238.150', '52J173903930', 'Gel/Allée 93', 'ZT230', 48),
('I06822P2', '172.27.238.151', '52J173903936', 'Gel/Allée 96', 'ZT230', 49),
('I06829P1', '172.27.238.152', '52J181903022', 'GEL/Allée 82', 'ZT230', 50),
('I06829P2', '172.27.238.153', '52J172404740', 'FFL 002', 'ZT230', 51),
('I06829P3', '172.27.238.154', '52J191204179', 'FFL 003', 'ZT230', 52),
('I06829P4', '172.27.238.155', '52J181903039', 'Bureau FL', 'ZT230', 53),
('I06820P4', '172.27.238.156', '52J183408195', 'Bureau Ordo', 'ZT230', 54),
('I06820P5', '172.27.238.157', '03J11501822', 'Vocale Cellule FFL - Côté MECA', 'S4M', 55),
('I06820P7', '172.27.238.158', '52J173702368', 'Frais Stocké', 'ZT230', 56);

-- --------------------------------------------------------

--
-- Structure de la table `pc_glpi`
--

DROP TABLE IF EXISTS `pc_glpi`;
CREATE TABLE IF NOT EXISTS `pc_glpi` (
  `Nom_PC` varchar(11) DEFAULT NULL,
  `SN` varchar(10) DEFAULT NULL,
  `ID_GLPI` int DEFAULT NULL,
  `IP_Wifi` varchar(14) DEFAULT NULL,
  `IP_Filaire` varchar(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `pc_glpi`
--

INSERT INTO `pc_glpi` (`Nom_PC`, `SN`, `ID_GLPI`, `IP_Wifi`, `IP_Filaire`) VALUES
('GTB_PDG', 'JG2BSP2', 174, '', ''),
('PC-SPARE', '8T7T0V2', 173, '', ''),
('S068163AO03', '8HMW9D3', 103, '', '172.27.38.78'),
('S068163AO04', 'JR2WHT3', 102, '', '172.27.38.210'),
('S068163AO05', 'FR2WHT3', 97, '172.17.238.146', '172.27.38.209'),
('S068163CN02', 'CBCY3Z2', 74, '', '172.27.38.130'),
('S068163CO01', '3SHKK24', 166, '172.17.238.63', '172.27.38.75'),
('S068163CO02', 'JRTHBS2', 23, '', '172.27.38.89'),
('S068163CO04', 'FSYLFS2', 107, '172.17.238.135', ''),
('S068163CO05', '5LWDQ04', 22, '172.17.238.158', '172.27.38.77'),
('S068163EX01', 'D8CY3Z2', 86, '172.17.238.7', ''),
('S068163EX03', 'G9CY3Z2', 90, '172.17.238.46', '172.17.238.46'),
('S068163EX05', 'G7CY3Z2', 60, '', '172.27.38.147'),
('S068163EX06', 'FBCY3Z2', 59, '', '172.27.38.158'),
('S068163EX09', 'C5L3703', 69, '', '172.27.38.133'),
('S068163EX15', '82VW9Q3', 119, '', '172.27.38.85'),
('S068163EX16', 'HTTHBS2', 67, '', '172.27.38.137'),
('S068163EX17', '72VW9Q3', 51, '', '172.27.38.192'),
('S068163EX18', '92VW9Q3', 20, '172.17.238.139', '172.27.38.39'),
('S068163EX19', 'HWWZCN3', 30, '', '172.27.38.124'),
('S068163EX20', 'J2XZCN3', 52, '', '172.27.38.76'),
('S068163EX23', 'HZWZCN3', 65, '', '172.27.38.92'),
('S068163EX26', 'B7L3703', 64, '', '172.27.38.182'),
('S068163EX56', 'DF5Z1S3', 142, '', '172.27.38.224'),
('S068163EX57', '1610VX3', 39, '', '172.17.238.125'),
('S068163EX58', 'JN8DMW3', 79, '', '172.27.38.226'),
('S068163EX59', 'HN8DMW3', 37, '', '172.27.38.227'),
('S068163EX62', 'JL8DMW3', 71, '', '172.27.38.228'),
('S068163EX66', '8JH7ZX2', 62, '', '172.27.38.144'),
('S068163EX67', 'HJH7ZX2', 61, '', '172.27.38.105'),
('S068163EX68', '8HH7ZX2', 73, '', '172.27.38.94'),
('S068163EX69', 'CGH7ZX2', 110, '', '172.27.38.131'),
('S068163EX71', '7CH7ZX2', 43, '', '172.27.38.57'),
('S068163EX72', 'F8H7ZX2', 85, '', '172.27.38.109'),
('S068163EX73', '78H7ZX2', 144, '', '172.27.38.17'),
('S068163EX75', 'GR2WHT3', 81, '172.17.238.42', '172.27.38.218'),
('S068163EX77', 'JM8DMW3', 143, '172.17.238.145', '172.27.38.240'),
('S068163EX78', 'HGH7ZX2', 27, '', '172.27.38.7'),
('S068163EX79', 'HR305G3', 66, '', '172.17.238.164'),
('S068163EX80', '7HMW9D3', 57, '', '172.27.38.50'),
('S068163EX81', '6VYLFS2', 28, '', '172.27.38.98'),
('S068163EX82', 'FZYLFS2', 47, '', '172.17.238.64'),
('S068163EX83', '4ZZLFS2', 63, '', '172.27.38.236'),
('S068163EX84', 'JSTHBS2', 40, '', '172.27.38.69'),
('S068163EX85', 'BCH7ZX2', 36, '', '172.27.38.72'),
('S068163EX86', 'JKSHBS2', 35, '', '172.27.38.125'),
('S068163EX87', 'JFH7ZX2', 70, '', '172.27.38.121'),
('S068163EX89', '8LWDQ04', 58, '', '172.27.38.253'),
('S068163EX91', 'F7CY3Z2', 72, '', '172.27.38.120'),
('S068163EX92', 'G6CY3Z2', 42, '', '172.27.38.26'),
('S068163EX93', '7LWDQ04', 165, '172.17.238.89', '172.27.38.83'),
('S068163IQ01', '2MY1TZ3', 4, '172.17.238.157', '172.27.38.249'),
('S068163IQ02', '6MY1TZ3', 138, '', '172.27.38.46'),
('S068163IQ04', '4MY1TZ3', 3, '172.17.238.159', '172.27.38.247'),
('S068163IQ06', 'C6L3703', 124, '', '172.27.38.65'),
('S068163IQ08', 'DHH7ZX2', 106, '', '172.27.38.33'),
('S068163IQ13', '5MY1TZ3', 2, '', '172.17.238.155'),
('S068163IQ14', '7NHJ1M2', 26, '', '172.27.38.93'),
('S068163IQ15', '9LWDQ04', 49, '', '172.17.238.41'),
('S068163ME03', 'GR305G3', 50, '', '172.27.38.52'),
('S068163ME04', 'HR2WHT3', 48, '', '172.27.38.213'),
('S068163PG01', 'JRSHBS2', 130, '', '172.27.38.21'),
('S068163PG03', '98H7ZX2', 129, '', '172.27.38.87'),
('S068163QT01', 'FCCY3Z2', 132, '', '172.27.38.132'),
('S068163QT04', 'D5L3703', 41, '', '172.17.238.68'),
('S068163QT05', '8KH7ZX2', 78, '', '172.27.38.67'),
('S068163QT07', 'J1XZCN3', 112, '', '172.27.38.195'),
('S068163QT08', '1810VX3', 141, '172.17.238.151', '172.27.38.234'),
('S068163QT09', '6LWDQ04', 11, '172.17.238.162', '172.27.38.251'),
('S068163QT10', '4SHKK24', 167, '', '172.27.38.20'),
('S068163RA03', '6HMW9D3', 121, '', '172.27.38.47'),
('S068163RA04', 'JZWZCN3', 15, '', '172.27.38.29'),
('S068163RA05', 'HSWZCN3', 146, '', '172.27.38.193'),
('S068163RA06', 'J0XZCN3', 16, '172.17.238.171', '172.27.38.42'),
('S068163RA07', 'FF5Z1S3', 14, '', '172.27.38.96'),
('S068163RA08', 'GF5Z1S3', 120, '', '172.27.38.32'),
('S068163RA14', 'CFH7ZX2', 17, '', '172.27.38.117'),
('S068163RH02', 'JP8DMW3', 19, '', '172.17.238.154'),
('S068163RH03', 'HP8DMW3', 7, '', '172.27.38.239'),
('S068163SF01', '11XLFS2', 153, '', '172.27.38.127'),
('S068163SF11', 'B2XLFS2', 38, '', '172.27.38.53'),
('S068163SF12', 'BMZLFS2', 126, '', '172.27.38.38'),
('S068163SF13', 'C1ZLFS2', 128, '', '172.27.38.146'),
('S068163SF14', '1VDN034', 164, '', '172.17.238.66'),
('S068163SF15', 'DVDN034', 175, '', '172.27.38.95'),
('S068163SG03', 'DR2WHT3', 45, '', '172.27.38.223'),
('S068163SG04', 'GBCY3Z2', 46, '', '172.27.38.136'),
('S068163SG06', 'DWYLFS2', 44, '', '172.27.38.13'),
('S068163TP01', 'J9H7ZX2', 56, '', '172.17.238.96'),
('S068163TP02', '3MY1TZ3', 75, '', '172.27.38.71'),
('S068163TP07', '1710VX3', 68, '172.17.238.128', '172.27.38.229'),
('S068163TP08', 'JJH7ZX2', 84, '', '172.27.38.106'),
('S068163TQ02', 'CDH7ZX2', 139, '', '172.27.38.22'),
('S068163TQ03', 'HM8DMW3', 111, '', '172.27.38.241'),
('S068163TQ05', 'BDH7ZX2', 76, '', '172.27.38.27'),
('S068163TQ09', 'DGH7ZX2', 77, '', '172.27.38.80'),
('S068163TQ10', 'CHH7ZX2', 125, '', '172.27.38.118'),
('S068164AM01', '6RSFNX3', 158, '', ''),
('S068164DE02', '5SWK9S3', 161, '', '172.17.238.131'),
('S068164DR02', 'DWC19K3', 115, '', '172.27.38.183'),
('S068164DR04', '1NW9HX3', 133, '172.20.10.5', ''),
('S068164EX14', 'C3JBDS3', 105, '172.17.238.140', ''),
('S068164EX15', '7CZJGL3', 98, '172.17.238.45', '172.27.38.91'),
('S068164EX16', '4VK4JX3', 9, '172.17.238.8', ''),
('S068164EX18', 'F6ZCPX3', 5, '172.17.238.57', '172.27.38.97'),
('S068164EX19', '85WL214', 157, '172.17.238.65', '172.27.38.84'),
('S068164EX20', 'HSLGQ04', 171, '', ''),
('S068164FO01', 'DZCCPV2', 95, '172.17.238.93', ''),
('S068164FO02', 'DJKHPV2', 96, '172.17.238.85', '172.27.38.152'),
('S068164FO03', 'DPDCPV2', 82, '172.17.238.134', ''),
('S068164FO04', 'F011PV2', 83, '172.17.238.130', ''),
('S068164FO05', '32DCPV2', 109, '172.17.238.77', '172.27.38.216'),
('S068164FO06', '6WXR6Y2', 34, '172.17.238.80', '172.27.38.79'),
('S068164IQ01', '401LFB3', 156, '172.17.238.52', '172.27.38.49'),
('S068164IQ02', 'F545NG3', 29, '172.17.238.98', ''),
('S068164IQ06', 'HFLF163', 1, '172.17.238.87', '172.27.38.8'),
('S068164ME01', '5CG731067P', 54, '172.17.238.62', ''),
('S068164ME02', '4SWK9S3', 114, '172.17.238.122', ''),
('S068164ME04', '5JNG1N2', 104, '172.17.238.83', ''),
('S068164QT01', 'JB9S6Y2', 12, '', ''),
('S068164QT05', '6XDS893', 134, '172.17.238.81', ''),
('S068164QT06', '7WDS893', 87, '172.17.238.88', ''),
('S068164QT07', '64MJ693', 113, '172.17.238.47', ''),
('S068164QT08', 'J258Q04', 172, '172.17.238.141', ''),
('S068164RA01', 'GBLF163', 122, '172.17.238.75', '172.27.38.164'),
('S068164RA02', '482HQ04', 163, '172.17.238.58', '172.27.38.62'),
('S068164RH01', '5458Q04', 169, '172.17.238.91', ''),
('S068164RH03', '5JM4JX3', 55, '172.17.238.150', ''),
('S068164RH04', 'D3JBDS3', 160, '172.17.238.160', ''),
('S068164RH06', 'CKK8693', 8, '172.17.238.97', '172.27.38.64'),
('S068164RH08', '6345NG3', 13, '172.17.238.117', '172.27.38.44'),
('S068164RH09', 'CDHBDS3', 176, '172.17.238.168', ''),
('S068164SF01', 'CWBTNV2', 149, '', '172.27.38.30'),
('S068164SF02', '849JZ33', 137, '', '172.27.38.159'),
('S068164SF03', 'B7GHZ33', 159, '', ''),
('S068164SF04', 'CDLKZ33', 147, '', ''),
('S068164SF05', '8LC9Z33', 151, '', ''),
('S068164SF06', 'CDXJZ33', 150, '', ''),
('S068164SF07', '889BZ33', 136, '172.17.238.6', '172.27.38.56'),
('S068164SF08', '8W2HZ33', 148, '', ''),
('S068164SF09', '8Q5BZ33', 135, '172.17.238.86', '172.27.38.25'),
('S068164SF10', '9KNBZ33', 145, '172.17.238.82', '172.27.38.18'),
('S068164SF11', '4Q05NG3', 127, '172.17.238.118', ''),
('S068164SF12', '11GS0Z2', 152, '', ''),
('S068164SP02', '5CG6475J47', 6, '', ''),
('S068164SP03', '5CG739476J', 123, '172.17.238.53', '172.27.38.59'),
('S068164SP04', '1RKMSN2', 25, '172.17.238.92', ''),
('S068164SP05', 'JLVQ6Y2', 21, '172.17.238.76', '172.27.38.176'),
('S068164SP06', 'DD2KPH2', 53, '172.17.238.50', ''),
('S068164SP07', 'FYKDPQ2', 24, '', ''),
('S068164SP08', '5CG739476D', 31, '172.17.238.123', ''),
('S068164SP10', '5CCCPN2', 32, '172.17.238.51', ''),
('S068164SP11', 'GYYHPN2', 116, '', '172.27.38.36'),
('S068164TQ01', 'GX4P6M3', 140, '172.17.238.121', ''),
('S068164TQ02', '9K1CPV2', 33, '172.17.238.78', ''),
('S068164TQ04', '5N7CPV2', 18, '172.17.238.73', '172.27.38.128'),
('S068164TQ08', '58X9HX3', 154, '172.17.238.69', ''),
('S068164TQ09', 'J54HQ04', 170, '172.17.238.54', '172.27.38.86'),
('S973163TP01', '6SHKK24', 168, '172.17.238.163', '172.27.38.28'),
('S973163TP03', 'FM8DMW3', 89, '172.17.238.136', '172.27.38.221'),
('S973163TP04', 'DP8DMW3', 80, '172.17.238.133', '172.27.38.219'),
('S973164TP01', 'JXX6VL3', 99, '', ''),
('S973164TP02', 'DLN8VN2', 88, '172.17.238.43', ''),
('S973164TP05', '755TNV2', 100, '', '172.27.38.11'),
('S973164TP06', '372HQ04', 108, '172.17.238.49', '172.27.38.73'),
('S973164TP07', 'CKJBDS3', 101, '172.17.238.144', ''),
('S973164TP08', '4Z1KPV2', 131, '172.17.238.59', '172.27.38.64');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
