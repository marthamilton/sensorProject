-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2020 at 08:08 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sensorDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `sensorInformation`
--

CREATE TABLE `sensorInformation` (
  `id` int(5) NOT NULL,
  `county` char(50) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `type` char(50) NOT NULL,
  `deploymentDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sensorInformation`
--

INSERT INTO `sensorInformation` (`id`, `county`, `latitude`, `longitude`, `type`, `deploymentDate`) VALUES
(1234, 'West Midlands', -2.3261, 52.116, 'Air Quality Sensor', '2020-02-18'),
(2154, 'South Wales', -3.1791, 51.4816, 'Air Quality Sensor', '2020-03-17');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
