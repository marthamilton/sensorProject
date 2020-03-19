-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2020 at 11:37 PM
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
  MODIFY `regionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblsensorinformation`
--
ALTER TABLE `tblsensorinformation`
  MODIFY `sensorID` int(11) NOT NULL AUTO_INCREMENT;

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
