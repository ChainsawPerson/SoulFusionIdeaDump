-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2024 at 02:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

SET FOREIGN_KEY_CHECKS = 0;

--
-- Database: `soulfusion`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `className` varchar(256) NOT NULL,
  `classDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_skill_pairs`
--

CREATE TABLE IF NOT EXISTS `class_skill_pairs` (
  `pair_index` int(11) NOT NULL,
  `className` varchar(256) NOT NULL,
  `skillName` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE IF NOT EXISTS `skill` (
  `skillName` varchar(256) NOT NULL,
  `skillDescription` text DEFAULT NULL,
  `skillType` text DEFAULT NULL,
  `skillBaseDamage` text DEFAULT NULL,
  `skillBaseCost` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `primaryMagic`
--

CREATE TABLE IF NOT EXISTS `primaryMagic` (
  `primaryMagicName` varchar(256) NOT NULL,
  `primaryMagicDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `secondaryMagic`
--
CREATE TABLE IF NOT EXISTS `secondaryMagic` (
  `secondaryMagicName` varchar(256) NOT NULL,
  `secondaryMagicDescription` text DEFAULT NULL,
  `secondaryMagicType` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `primary_secondary_pairs`
--
CREATE TABLE IF NOT EXISTS `primary_secondary_pairs` (
  `pair_index` int(11) NOT NULL,
  `primaryMagicName` varchar(256) NOT NULL,
  `secondaryMagicName` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY IF NOT EXISTS (`className`);

--
-- Indexes for table `class_skill_pairs`
--
ALTER TABLE `class_skill_pairs`
  ADD PRIMARY KEY IF NOT EXISTS (`pair_index`),
  ADD KEY IF NOT EXISTS `class_pair` (`className`),
  ADD KEY IF NOT EXISTS `skill_pair` (`skillName`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY IF NOT EXISTS (`skillName`),
  ADD KEY IF NOT EXISTS `skillName` (`skillName`);

--
-- Indexes for table `primaryMagic`
--
ALTER TABLE `primaryMagic`
  ADD PRIMARY KEY IF NOT EXISTS (`primaryMagicName`),
  ADD KEY IF NOT EXISTS `primaryMagicName` (`primaryMagicName`);

--
-- Indexes for table `secondaryMagic`
--
ALTER TABLE `secondaryMagic`
  ADD PRIMARY KEY IF NOT EXISTS (`secondaryMagicName`),
  ADD KEY IF NOT EXISTS `secondaryMagicName` (`secondaryMagicName`);

--
-- Indexes for table `primary_secondary_pairs`
--
ALTER TABLE `primary_secondary_pairs`
  ADD PRIMARY KEY IF NOT EXISTS (`pair_index`),
  ADD KEY IF NOT EXISTS `primary_pair` (`primaryMagicName`),
  ADD KEY IF NOT EXISTS `secondary_pair` (`secondaryMagicName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class_skill_pairs`
--
ALTER TABLE `class_skill_pairs`
  MODIFY `pair_index` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `primary_secondary_pairs`
--
ALTER TABLE `primary_secondary_pairs`
  MODIFY `pair_index` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class_skill_pairs`
--
ALTER TABLE `class_skill_pairs`
  ADD CONSTRAINT `class_pair` FOREIGN KEY (`className`) REFERENCES `class` (`className`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `skill_pair` FOREIGN KEY (`skillName`) REFERENCES `skill` (`skillName`);
COMMIT;

--
-- Constraints for table `primary_secondary_pairs`
ALTER TABLE `primary_secondary_pairs`
  ADD CONSTRAINT `primary_pair` FOREIGN KEY (`primaryMagicName`) REFERENCES `primaryMagic` (`primaryMagicName`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `secondary_pair` FOREIGN KEY (`secondaryMagicName`) REFERENCES `secondaryMagic` (`secondaryMagicName`);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
