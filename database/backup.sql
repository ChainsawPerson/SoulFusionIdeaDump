/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: soulfusion
-- ------------------------------------------------------
-- Server version	10.11.13-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `className` varchar(256) NOT NULL,
  `classDescription` text NOT NULL,
  PRIMARY KEY (`className`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES
('Archer','The Archer hits enemies from long range.'),
('Mage','The Mage excels in magic.'),
('Priest','The Priest excels in holy damage.'),
('Tank','The Tank excels in defence.'),
('Thief','The Thief excels in speed and agility.'),
('Warrior','The Warrior excels in physical damage.');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_skill_pairs`
--

DROP TABLE IF EXISTS `class_skill_pairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_skill_pairs` (
  `pair_index` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(256) NOT NULL,
  `skillName` varchar(256) NOT NULL,
  PRIMARY KEY (`pair_index`),
  KEY `class_pair` (`className`),
  KEY `skill_pair` (`skillName`),
  CONSTRAINT `class_pair` FOREIGN KEY (`className`) REFERENCES `class` (`className`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `skill_pair` FOREIGN KEY (`skillName`) REFERENCES `skill` (`skillName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_skill_pairs`
--

LOCK TABLES `class_skill_pairs` WRITE;
/*!40000 ALTER TABLE `class_skill_pairs` DISABLE KEYS */;
INSERT INTO `class_skill_pairs` VALUES
(1,'Mage','Clarity'),
(2,'Mage','Fireball'),
(3,'Mage','Watergun'),
(4,'Warrior','Axe Throw'),
(5,'Warrior','Battle Cry');
/*!40000 ALTER TABLE `class_skill_pairs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `skillName` varchar(256) NOT NULL,
  `skillDescription` text DEFAULT NULL,
  `skillType` text DEFAULT NULL,
  `skillBaseDamage` text DEFAULT NULL,
  `skillBaseCost` text DEFAULT NULL,
  PRIMARY KEY (`skillName`),
  KEY `skillName` (`skillName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES
('Axe Throw','Throw an axe.\r\nThat\'s it.\r\n\r\nLiterally.','Active','1','1'),
('Battle Cry','Roar to increase damage','Active','0','1'),
('Clarity','Reduce Mana Consumption','Passive','0','1'),
('Fireball','Throw fireball','Active','1','1'),
('Watergun','Spray water','Active','1','1');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14  4:20:39
