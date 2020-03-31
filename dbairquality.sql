-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 31, 2020 at 04:19 PM
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
-- Database: `dbairquality`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblregion`
--

CREATE TABLE `tblregion` (
  `regionID` int(11) NOT NULL,
  `regionName` varchar(100) NOT NULL,
  `regionCountry` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblregion`
--

INSERT INTO `tblregion` (`regionID`, `regionName`, `regionCountry`) VALUES
(1264, 'Yorkshire and The Humber', 'England'),
(1587, 'South West', 'England'),
(1865, 'Eastern', 'England'),
(2857, 'North East', 'England'),
(2958, 'North Wales', 'Wales'),
(3857, 'Mid and West Wales', 'Wales'),
(4859, 'South Wales Central', 'Wales'),
(5431, 'West Midlands', 'England'),
(6758, 'South East', 'England'),
(7657, 'East Midlands', 'England'),
(8675, 'North West', 'England'),
(9185, 'South Wales West', 'Wales'),
(9275, 'South Wales East', 'Wales'),
(9783, 'London', 'England');

-- --------------------------------------------------------

--
-- Table structure for table `tblsensordata`
--

CREATE TABLE `tblsensordata` (
  `sensorID` int(11) NOT NULL,
  `airQuality` decimal(5,2) NOT NULL,
  `humidity` decimal(5,2) NOT NULL,
  `dateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblsensordata`
--

INSERT INTO `tblsensordata` (`sensorID`, `airQuality`, `humidity`, `dateTime`) VALUES
(1234, '66.66', '57.76', '2020-02-21 22:22:45'),
(1234, '55.55', '55.55', '2020-03-22 21:06:55'),
(3456, '78.98', '67.98', '2020-03-24 13:42:50'),
(1243, '75.98', '34.66', '2020-03-24 13:42:50'),
(2917, '56.34', '76.56', '2020-03-25 11:38:58'),
(3456, '34.56', '23.45', '2020-03-24 13:42:50'),
(5467, '76.78', '56.78', '2020-03-25 11:39:40'),
(7917, '34.78', '78.90', '2020-03-24 13:42:50'),
(7919, '65.78', '34.67', '2020-03-24 13:42:50'),
(2315, '67.88', '65.99', '2020-03-30 19:16:36'),
(2354, '98.77', '67.88', '2020-03-30 19:17:37');

-- --------------------------------------------------------

--
-- Table structure for table `tblsensorinformation`
--

CREATE TABLE `tblsensorinformation` (
  `sensorID` int(11) NOT NULL,
  `regionID` int(11) NOT NULL,
  `sensorLatitude` float NOT NULL,
  `sensorLongitude` float NOT NULL,
  `sensorDeploymentDate` date NOT NULL,
  `sensorType` enum('Air Quality','Temperature') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblsensorinformation`
--

INSERT INTO `tblsensorinformation` (`sensorID`, `regionID`, `sensorLatitude`, `sensorLongitude`, `sensorDeploymentDate`, `sensorType`) VALUES
(1234, 5431, 52.1116, -2.3261, '2020-03-09', 'Air Quality'),
(1243, 1264, 53.8008, -1.5491, '2020-03-25', 'Air Quality'),
(2315, 8675, 53.1396, -4.2739, '2020-03-01', 'Air Quality'),
(2354, 4859, 51.3998, -3.2826, '2020-03-04', 'Air Quality'),
(2917, 6758, 51.2787, 0.5217, '2020-03-25', 'Air Quality'),
(3456, 5431, 52.4862, -1.8904, '2020-02-29', 'Air Quality'),
(3968, 9185, 51.7929, -3.9885, '2020-03-07', 'Air Quality'),
(5467, 1865, 52.6309, 1.2974, '2020-03-04', 'Air Quality'),
(5468, 9275, 51.8117, -2.7163, '2020-03-09', 'Air Quality'),
(5847, 4859, 51.4816, -3.1791, '2020-03-11', 'Air Quality'),
(7657, 3857, 52.5121, -3.3131, '2020-03-19', 'Air Quality'),
(7658, 1587, 50.266, -5.0527, '2020-03-24', 'Air Quality'),
(7917, 2857, 54.7753, -1.5849, '2020-03-07', 'Air Quality'),
(7918, 7657, 53.1047, -1.5624, '2020-03-07', 'Air Quality'),
(7919, 8675, 53.2326, -2.6103, '2020-03-25', 'Air Quality'),
(8576, 9783, 51.5074, -0.1278, '2020-03-25', 'Air Quality');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblregion`
--
ALTER TABLE `tblregion`
  ADD PRIMARY KEY (`regionID`);

--
-- Indexes for table `tblsensordata`
--
ALTER TABLE `tblsensordata`
  ADD KEY `sensorID` (`sensorID`);

--
-- Indexes for table `tblsensorinformation`
--
ALTER TABLE `tblsensorinformation`
  ADD PRIMARY KEY (`sensorID`),
  ADD KEY `regionID` (`regionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblregion`
--
ALTER TABLE `tblregion`
  MODIFY `regionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9785;

--
-- AUTO_INCREMENT for table `tblsensorinformation`
--
ALTER TABLE `tblsensorinformation`
  MODIFY `sensorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8577;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblsensordata`
--
ALTER TABLE `tblsensordata`
  ADD CONSTRAINT `tblsensordata_ibfk_1` FOREIGN KEY (`sensorID`) REFERENCES `tblsensorinformation` (`sensorID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblsensorinformation`
--
ALTER TABLE `tblsensorinformation`
  ADD CONSTRAINT `tblsensorinformation_ibfk_1` FOREIGN KEY (`regionID`) REFERENCES `tblregion` (`regionID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
