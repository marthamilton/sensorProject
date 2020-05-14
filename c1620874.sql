-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: csmysql.cs.cf.ac.uk
-- Generation Time: May 14, 2020 at 04:08 PM
-- Server version: 10.3.21-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c1620874`
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
(2315, '98.00', '23.74', '2020-04-09 14:23:00'),
(3968, '98.00', '23.74', '2020-04-09 14:23:00'),
(7919, '98.00', '23.74', '2020-04-09 14:23:00'),
(2917, '98.00', '23.74', '2020-04-09 14:23:00'),
(7658, '98.00', '23.74', '2020-04-09 14:23:00'),
(2315, '48.62', '24.55', '2020-04-09 14:33:04'),
(3968, '48.62', '24.55', '2020-04-09 14:33:04'),
(7919, '48.62', '24.55', '2020-04-09 14:33:04'),
(2917, '48.62', '24.55', '2020-04-09 14:33:04'),
(7658, '48.62', '24.55', '2020-04-09 14:33:04'),
(2315, '38.79', '24.27', '2020-04-09 14:43:07'),
(3968, '38.79', '24.27', '2020-04-09 14:43:07'),
(7919, '38.79', '24.27', '2020-04-09 14:43:07'),
(2917, '38.79', '24.27', '2020-04-09 14:43:07'),
(7658, '38.79', '24.27', '2020-04-09 14:43:07'),
(2315, '36.10', '23.69', '2020-04-09 14:53:10'),
(3968, '36.10', '23.69', '2020-04-09 14:53:10'),
(7919, '36.10', '23.69', '2020-04-09 14:53:10'),
(2917, '36.10', '23.69', '2020-04-09 14:53:10'),
(7658, '36.10', '23.69', '2020-04-09 14:53:10'),
(2315, '36.87', '23.73', '2020-04-09 15:03:14'),
(3968, '36.87', '23.73', '2020-04-09 15:03:14'),
(7919, '36.87', '23.73', '2020-04-09 15:03:14'),
(2917, '36.87', '23.73', '2020-04-09 15:03:14'),
(7658, '36.87', '23.73', '2020-04-09 15:03:14'),
(2315, '99.03', '24.07', '2020-04-12 23:29:35'),
(3968, '99.03', '24.07', '2020-04-12 23:29:35'),
(7919, '99.03', '24.07', '2020-04-12 23:29:35'),
(2917, '99.03', '24.07', '2020-04-12 23:29:35'),
(7658, '99.03', '24.07', '2020-04-12 23:29:35'),
(2315, '98.98', '23.98', '2020-04-12 23:36:31'),
(3968, '98.98', '23.98', '2020-04-12 23:36:31'),
(7919, '98.98', '23.98', '2020-04-12 23:36:31'),
(2917, '98.98', '23.98', '2020-04-12 23:36:31'),
(7658, '98.98', '23.98', '2020-04-12 23:36:31'),
(2315, '32.10', '19.77', '2020-04-12 23:46:36'),
(3968, '32.10', '19.77', '2020-04-12 23:46:36'),
(7919, '32.10', '19.77', '2020-04-12 23:46:36'),
(2917, '32.10', '19.77', '2020-04-12 23:46:36'),
(7658, '32.10', '19.77', '2020-04-12 23:46:36'),
(2315, '31.17', '20.93', '2020-04-12 23:56:40'),
(3968, '31.17', '20.93', '2020-04-12 23:56:40'),
(7919, '31.17', '20.93', '2020-04-12 23:56:40'),
(2917, '31.17', '20.93', '2020-04-12 23:56:40'),
(7658, '31.17', '20.93', '2020-04-12 23:56:40'),
(2315, '27.94', '21.90', '2020-04-13 00:06:45'),
(3968, '27.94', '21.90', '2020-04-13 00:06:45'),
(7919, '27.94', '21.90', '2020-04-13 00:06:45'),
(2917, '27.94', '21.90', '2020-04-13 00:06:45'),
(7658, '27.94', '21.90', '2020-04-13 00:06:45'),
(2315, '27.82', '23.10', '2020-04-13 00:16:50'),
(3968, '27.82', '23.10', '2020-04-13 00:16:50'),
(7919, '27.82', '23.10', '2020-04-13 00:16:50'),
(2917, '27.82', '23.10', '2020-04-13 00:16:50'),
(7658, '27.82', '23.10', '2020-04-13 00:16:50'),
(2315, '91.53', '16.53', '2020-04-13 15:52:14'),
(3968, '91.53', '16.53', '2020-04-13 15:52:14'),
(7919, '91.53', '16.53', '2020-04-13 15:52:14'),
(2917, '91.53', '16.53', '2020-04-13 15:52:14'),
(7658, '91.53', '16.53', '2020-04-13 15:52:14'),
(2315, '39.60', '17.54', '2020-04-13 16:02:18'),
(3968, '39.60', '17.54', '2020-04-13 16:02:18'),
(7919, '39.60', '17.54', '2020-04-13 16:02:18'),
(2917, '39.60', '17.54', '2020-04-13 16:02:18'),
(7658, '39.60', '17.54', '2020-04-13 16:02:18'),
(2315, '32.86', '17.37', '2020-04-13 16:12:21'),
(3968, '32.86', '17.37', '2020-04-13 16:12:21'),
(7919, '32.86', '17.37', '2020-04-13 16:12:21'),
(2917, '32.86', '17.37', '2020-04-13 16:12:21'),
(7658, '32.86', '17.37', '2020-04-13 16:12:21'),
(2315, '29.57', '16.82', '2020-04-13 16:22:25'),
(3968, '29.57', '16.82', '2020-04-13 16:22:25'),
(7919, '29.57', '16.82', '2020-04-13 16:22:25'),
(2917, '29.57', '16.82', '2020-04-13 16:22:25'),
(7658, '29.57', '16.82', '2020-04-13 16:22:25'),
(2315, '26.64', '16.94', '2020-04-13 16:32:29'),
(3968, '26.64', '16.94', '2020-04-13 16:32:29'),
(7919, '26.64', '16.94', '2020-04-13 16:32:29'),
(2917, '26.64', '16.94', '2020-04-13 16:32:29'),
(7658, '26.64', '16.94', '2020-04-13 16:32:29'),
(2315, '26.47', '16.57', '2020-04-13 16:42:32'),
(3968, '26.47', '16.57', '2020-04-13 16:42:32'),
(7919, '26.47', '16.57', '2020-04-13 16:42:32'),
(2917, '26.47', '16.57', '2020-04-13 16:42:32'),
(7658, '26.47', '16.57', '2020-04-13 16:42:32'),
(2315, '91.13', '16.18', '2020-04-13 16:55:25'),
(3968, '91.13', '16.18', '2020-04-13 16:55:25'),
(7919, '91.13', '16.18', '2020-04-13 16:55:25'),
(2917, '91.13', '16.18', '2020-04-13 16:55:25'),
(7658, '91.13', '16.18', '2020-04-13 16:55:25'),
(2315, '45.59', '16.96', '2020-04-13 17:05:28'),
(3968, '45.59', '16.96', '2020-04-13 17:05:28'),
(7919, '45.59', '16.96', '2020-04-13 17:05:28'),
(2917, '45.59', '16.96', '2020-04-13 17:05:28'),
(7658, '45.59', '16.96', '2020-04-13 17:05:28'),
(2315, '27.48', '17.46', '2020-04-13 17:15:31'),
(3968, '27.48', '17.46', '2020-04-13 17:15:31'),
(7919, '27.48', '17.46', '2020-04-13 17:15:31'),
(2917, '27.48', '17.46', '2020-04-13 17:15:31'),
(7658, '27.48', '17.46', '2020-04-13 17:15:31'),
(2315, '91.44', '16.73', '2020-04-13 17:24:28'),
(3968, '91.44', '16.73', '2020-04-13 17:24:28'),
(7919, '91.44', '16.73', '2020-04-13 17:24:28'),
(2917, '91.44', '16.73', '2020-04-13 17:24:28'),
(7658, '91.44', '16.73', '2020-04-13 17:24:28'),
(2315, '91.05', '16.72', '2020-04-13 17:34:31'),
(3968, '91.05', '16.72', '2020-04-13 17:34:31'),
(7919, '91.05', '16.72', '2020-04-13 17:34:31'),
(2917, '91.05', '16.72', '2020-04-13 17:34:31'),
(7658, '91.05', '16.72', '2020-04-13 17:34:31'),
(2315, '27.79', '17.25', '2020-04-13 17:44:36'),
(3968, '27.79', '17.25', '2020-04-13 17:44:36'),
(7919, '27.79', '17.25', '2020-04-13 17:44:36'),
(2917, '27.79', '17.25', '2020-04-13 17:44:36'),
(7658, '27.79', '17.25', '2020-04-13 17:44:36'),
(2315, '23.81', '17.20', '2020-04-13 17:54:40'),
(3968, '23.81', '17.20', '2020-04-13 17:54:40'),
(7919, '23.81', '17.20', '2020-04-13 17:54:40'),
(2917, '23.81', '17.20', '2020-04-13 17:54:40'),
(7658, '23.81', '17.20', '2020-04-13 17:54:40'),
(2315, '24.36', '17.29', '2020-04-13 18:04:45'),
(3968, '24.36', '17.29', '2020-04-13 18:04:45'),
(7919, '24.36', '17.29', '2020-04-13 18:04:45'),
(2917, '24.36', '17.29', '2020-04-13 18:04:45'),
(7658, '24.36', '17.29', '2020-04-13 18:04:45'),
(2315, '23.32', '17.30', '2020-04-13 18:14:50'),
(3968, '23.32', '17.30', '2020-04-13 18:14:50'),
(7919, '23.32', '17.30', '2020-04-13 18:14:50'),
(2917, '23.32', '17.30', '2020-04-13 18:14:50'),
(7658, '23.32', '17.30', '2020-04-13 18:14:50'),
(2315, '22.33', '17.30', '2020-04-13 18:24:54'),
(3968, '22.33', '17.30', '2020-04-13 18:24:54'),
(7919, '22.33', '17.30', '2020-04-13 18:24:54'),
(2917, '22.33', '17.30', '2020-04-13 18:24:54'),
(7658, '22.33', '17.30', '2020-04-13 18:24:54'),
(2315, '22.81', '17.24', '2020-04-13 18:34:57'),
(3968, '22.81', '17.24', '2020-04-13 18:34:57'),
(7919, '22.81', '17.24', '2020-04-13 18:34:57'),
(2917, '22.81', '17.24', '2020-04-13 18:34:57'),
(7658, '22.81', '17.24', '2020-04-13 18:34:57'),
(2315, '22.56', '17.39', '2020-04-13 18:45:01'),
(3968, '22.56', '17.39', '2020-04-13 18:45:01'),
(7919, '22.56', '17.39', '2020-04-13 18:45:01'),
(2917, '22.56', '17.39', '2020-04-13 18:45:01'),
(7658, '22.56', '17.39', '2020-04-13 18:45:01'),
(2315, '21.97', '17.49', '2020-04-13 18:55:04'),
(3968, '21.97', '17.49', '2020-04-13 18:55:04'),
(7919, '21.97', '17.49', '2020-04-13 18:55:04'),
(2917, '21.97', '17.49', '2020-04-13 18:55:04'),
(7658, '21.97', '17.49', '2020-04-13 18:55:04'),
(2315, '22.43', '17.49', '2020-04-13 19:05:07'),
(3968, '22.43', '17.49', '2020-04-13 19:05:07'),
(7919, '22.43', '17.49', '2020-04-13 19:05:07'),
(2917, '22.43', '17.49', '2020-04-13 19:05:07'),
(7658, '22.43', '17.49', '2020-04-13 19:05:07'),
(2315, '22.29', '17.50', '2020-04-13 19:15:11'),
(3968, '22.29', '17.50', '2020-04-13 19:15:11'),
(7919, '22.29', '17.50', '2020-04-13 19:15:11'),
(2917, '22.29', '17.50', '2020-04-13 19:15:11'),
(7658, '22.29', '17.50', '2020-04-13 19:15:11'),
(2315, '95.81', '20.81', '2020-04-14 14:24:52'),
(3968, '95.81', '20.81', '2020-04-14 14:24:52'),
(7919, '95.81', '20.81', '2020-04-14 14:24:52'),
(2917, '95.81', '20.81', '2020-04-14 14:24:52'),
(7658, '95.81', '20.81', '2020-04-14 14:24:52'),
(2315, '43.65', '21.93', '2020-04-14 14:35:04'),
(3968, '43.65', '21.93', '2020-04-14 14:35:04'),
(7919, '43.65', '21.93', '2020-04-14 14:35:04'),
(2917, '43.65', '21.93', '2020-04-14 14:35:04'),
(7658, '43.65', '21.93', '2020-04-14 14:35:04'),
(2315, '37.35', '21.83', '2020-04-14 14:45:14'),
(3968, '37.35', '21.83', '2020-04-14 14:45:14'),
(7919, '37.35', '21.83', '2020-04-14 14:45:14'),
(2917, '37.35', '21.83', '2020-04-14 14:45:14'),
(7658, '37.35', '21.83', '2020-04-14 14:45:14'),
(2315, '33.90', '21.84', '2020-04-14 14:55:21'),
(3968, '33.90', '21.84', '2020-04-14 14:55:21'),
(7919, '33.90', '21.84', '2020-04-14 14:55:21'),
(2917, '33.90', '21.84', '2020-04-14 14:55:21'),
(7658, '33.90', '21.84', '2020-04-14 14:55:21'),
(2315, '30.09', '21.57', '2020-04-14 15:05:30'),
(3968, '30.09', '21.57', '2020-04-14 15:05:30'),
(7919, '30.09', '21.57', '2020-04-14 15:05:30'),
(2917, '30.09', '21.57', '2020-04-14 15:05:30'),
(7658, '30.09', '21.57', '2020-04-14 15:05:30'),
(2315, '29.92', '21.59', '2020-04-14 15:15:38'),
(3968, '29.92', '21.59', '2020-04-14 15:15:38'),
(7919, '29.92', '21.59', '2020-04-14 15:15:38'),
(2917, '29.92', '21.59', '2020-04-14 15:15:38'),
(7658, '29.92', '21.59', '2020-04-14 15:15:38'),
(2315, '30.54', '21.61', '2020-04-14 15:25:51'),
(3968, '30.54', '21.61', '2020-04-14 15:25:51'),
(7919, '30.54', '21.61', '2020-04-14 15:25:51'),
(2917, '30.54', '21.61', '2020-04-14 15:25:51'),
(7658, '30.54', '21.61', '2020-04-14 15:25:51'),
(2315, '28.38', '21.31', '2020-04-14 15:35:54'),
(3968, '28.38', '21.31', '2020-04-14 15:35:54'),
(7919, '28.38', '21.31', '2020-04-14 15:35:54'),
(2917, '28.38', '21.31', '2020-04-14 15:35:54'),
(7658, '28.38', '21.31', '2020-04-14 15:35:54'),
(2315, '28.21', '21.07', '2020-04-14 15:45:58'),
(3968, '28.21', '21.07', '2020-04-14 15:45:58'),
(7919, '28.21', '21.07', '2020-04-14 15:45:58'),
(2917, '28.21', '21.07', '2020-04-14 15:45:58'),
(7658, '28.21', '21.07', '2020-04-14 15:45:58'),
(2315, '29.10', '20.81', '2020-04-14 15:56:01'),
(3968, '29.10', '20.81', '2020-04-14 15:56:01'),
(7919, '29.10', '20.81', '2020-04-14 15:56:01'),
(2917, '29.10', '20.81', '2020-04-14 15:56:01'),
(7658, '29.10', '20.81', '2020-04-14 15:56:01'),
(2315, '27.60', '20.85', '2020-04-14 16:06:04'),
(3968, '27.60', '20.85', '2020-04-14 16:06:04'),
(7919, '27.60', '20.85', '2020-04-14 16:06:04'),
(2917, '27.60', '20.85', '2020-04-14 16:06:04'),
(7658, '27.60', '20.85', '2020-04-14 16:06:04'),
(2315, '27.82', '21.02', '2020-04-14 16:16:07'),
(3968, '27.82', '21.02', '2020-04-14 16:16:07'),
(7919, '27.82', '21.02', '2020-04-14 16:16:07'),
(2917, '27.82', '21.02', '2020-04-14 16:16:07'),
(7658, '27.82', '21.02', '2020-04-14 16:16:07'),
(2315, '28.95', '21.02', '2020-04-14 16:26:11'),
(3968, '28.95', '21.02', '2020-04-14 16:26:11'),
(7919, '28.95', '21.02', '2020-04-14 16:26:11'),
(2917, '28.95', '21.02', '2020-04-14 16:26:11'),
(7658, '28.95', '21.02', '2020-04-14 16:26:11'),
(2315, '27.37', '20.92', '2020-04-14 16:36:14'),
(3968, '27.37', '20.92', '2020-04-14 16:36:14'),
(7919, '27.37', '20.92', '2020-04-14 16:36:14'),
(2917, '27.37', '20.92', '2020-04-14 16:36:14'),
(7658, '27.37', '20.92', '2020-04-14 16:36:14'),
(2315, '27.38', '20.82', '2020-04-14 16:46:17'),
(3968, '27.38', '20.82', '2020-04-14 16:46:17'),
(7919, '27.38', '20.82', '2020-04-14 16:46:17'),
(2917, '27.38', '20.82', '2020-04-14 16:46:17'),
(7658, '27.38', '20.82', '2020-04-14 16:46:17'),
(2315, '28.80', '20.80', '2020-04-14 16:56:21'),
(3968, '28.80', '20.80', '2020-04-14 16:56:21'),
(7919, '28.80', '20.80', '2020-04-14 16:56:21'),
(2917, '28.80', '20.80', '2020-04-14 16:56:21'),
(7658, '28.80', '20.80', '2020-04-14 16:56:21'),
(2315, '27.46', '21.02', '2020-04-14 17:06:24'),
(3968, '27.46', '21.02', '2020-04-14 17:06:24'),
(7919, '27.46', '21.02', '2020-04-14 17:06:24'),
(2917, '27.46', '21.02', '2020-04-14 17:06:24'),
(7658, '27.46', '21.02', '2020-04-14 17:06:24'),
(2315, '26.89', '20.96', '2020-04-14 17:16:27'),
(3968, '26.89', '20.96', '2020-04-14 17:16:27'),
(7919, '26.89', '20.96', '2020-04-14 17:16:27'),
(2917, '26.89', '20.96', '2020-04-14 17:16:27'),
(7658, '26.89', '20.96', '2020-04-14 17:16:27'),
(2315, '28.88', '20.94', '2020-04-14 17:26:32'),
(3968, '28.88', '20.94', '2020-04-14 17:26:32'),
(7919, '28.88', '20.94', '2020-04-14 17:26:32'),
(2917, '28.88', '20.94', '2020-04-14 17:26:32'),
(7658, '28.88', '20.94', '2020-04-14 17:26:32'),
(2315, '28.14', '21.92', '2020-04-14 17:36:36'),
(3968, '28.14', '21.92', '2020-04-14 17:36:36'),
(7919, '28.14', '21.92', '2020-04-14 17:36:36'),
(2917, '28.14', '21.92', '2020-04-14 17:36:36'),
(7658, '28.14', '21.92', '2020-04-14 17:36:36'),
(2315, '27.66', '22.00', '2020-04-14 17:46:41'),
(3968, '27.66', '22.00', '2020-04-14 17:46:41'),
(7919, '27.66', '22.00', '2020-04-14 17:46:41'),
(2917, '27.66', '22.00', '2020-04-14 17:46:41'),
(7658, '27.66', '22.00', '2020-04-14 17:46:41'),
(2315, '29.14', '21.88', '2020-04-14 17:56:44'),
(3968, '29.14', '21.88', '2020-04-14 17:56:44'),
(7919, '29.14', '21.88', '2020-04-14 17:56:44'),
(2917, '29.14', '21.88', '2020-04-14 17:56:44'),
(7658, '29.14', '21.88', '2020-04-14 17:56:44'),
(2315, '27.97', '22.01', '2020-04-14 18:06:48'),
(3968, '27.97', '22.01', '2020-04-14 18:06:48'),
(7919, '27.97', '22.01', '2020-04-14 18:06:48'),
(2917, '27.97', '22.01', '2020-04-14 18:06:48'),
(7658, '27.97', '22.01', '2020-04-14 18:06:48'),
(2315, '27.49', '22.00', '2020-04-14 18:16:52'),
(3968, '27.49', '22.00', '2020-04-14 18:16:52'),
(7919, '27.49', '22.00', '2020-04-14 18:16:52'),
(2917, '27.49', '22.00', '2020-04-14 18:16:52'),
(7658, '27.49', '22.00', '2020-04-14 18:16:52'),
(2315, '28.89', '22.02', '2020-04-14 18:26:59'),
(3968, '28.89', '22.02', '2020-04-14 18:26:59'),
(7919, '28.89', '22.02', '2020-04-14 18:26:59'),
(2917, '28.89', '22.02', '2020-04-14 18:26:59'),
(7658, '28.89', '22.02', '2020-04-14 18:26:59'),
(2315, '27.68', '21.86', '2020-04-14 18:37:03'),
(3968, '27.68', '21.86', '2020-04-14 18:37:03'),
(7919, '27.68', '21.86', '2020-04-14 18:37:03'),
(2917, '27.68', '21.86', '2020-04-14 18:37:03'),
(7658, '27.68', '21.86', '2020-04-14 18:37:03'),
(2315, '26.20', '20.71', '2020-04-14 18:47:08'),
(3968, '26.20', '20.71', '2020-04-14 18:47:08'),
(7919, '26.20', '20.71', '2020-04-14 18:47:08'),
(2917, '26.20', '20.71', '2020-04-14 18:47:08'),
(7658, '26.20', '20.71', '2020-04-14 18:47:08'),
(1234, '94.16', '19.16', '2020-05-13 09:07:38'),
(1234, '94.09', '19.09', '2020-05-13 09:22:39'),
(1234, '94.05', '19.05', '2020-05-13 09:37:40'),
(1234, '94.00', '19.00', '2020-05-13 09:52:41'),
(1234, '94.02', '19.02', '2020-05-13 10:07:42'),
(1234, '93.92', '18.92', '2020-05-13 10:22:43'),
(1234, '93.42', '18.42', '2020-05-13 10:37:44'),
(1234, '93.55', '18.55', '2020-05-13 10:52:45'),
(1234, '93.76', '18.76', '2020-05-13 11:07:46'),
(1234, '93.84', '18.84', '2020-05-13 11:22:47'),
(1234, '93.76', '18.76', '2020-05-13 11:37:48'),
(1234, '93.41', '18.41', '2020-05-13 11:52:49'),
(1234, '93.51', '18.51', '2020-05-13 12:07:49'),
(1234, '93.51', '18.51', '2020-05-13 12:22:50'),
(1234, '93.40', '18.40', '2020-05-13 12:37:51'),
(1234, '93.71', '18.71', '2020-05-13 12:52:52'),
(1234, '93.92', '18.92', '2020-05-13 13:07:53'),
(1234, '93.96', '18.96', '2020-05-13 13:22:53'),
(1234, '94.09', '19.09', '2020-05-13 13:37:59'),
(1234, '94.09', '19.09', '2020-05-13 13:53:00'),
(1234, '93.95', '18.95', '2020-05-13 14:08:01'),
(1234, '93.87', '18.87', '2020-05-13 14:23:02'),
(1234, '93.95', '18.95', '2020-05-13 14:38:03'),
(1234, '93.95', '18.95', '2020-05-13 14:53:08'),
(1234, '93.82', '18.82', '2020-05-13 15:08:09'),
(1234, '94.11', '19.11', '2020-05-13 15:23:10'),
(1234, '94.22', '19.22', '2020-05-13 15:38:10'),
(1234, '93.69', '18.69', '2020-05-13 15:53:11'),
(1234, '93.98', '18.98', '2020-05-13 16:08:12'),
(1234, '93.98', '18.98', '2020-05-13 16:23:14'),
(1234, '99.73', '24.73', '2020-05-13 16:38:14'),
(1234, '96.25', '21.25', '2020-05-13 16:53:15'),
(1234, '97.01', '22.01', '2020-05-13 17:08:16'),
(1234, '96.97', '21.97', '2020-05-13 17:23:17'),
(1234, '95.21', '20.21', '2020-05-13 17:38:17'),
(1234, '94.53', '19.53', '2020-05-13 17:53:18'),
(1234, '94.56', '19.56', '2020-05-13 18:08:19'),
(1234, '94.52', '19.52', '2020-05-13 18:23:20'),
(1234, '94.51', '19.51', '2020-05-13 18:38:21'),
(1234, '94.59', '19.59', '2020-05-13 18:53:22'),
(1234, '94.24', '19.24', '2020-05-13 19:08:22'),
(1234, '94.23', '19.23', '2020-05-13 19:23:23'),
(1234, '94.26', '19.26', '2020-05-13 19:38:24'),
(1234, '94.15', '19.15', '2020-05-13 19:53:25'),
(1234, '94.27', '19.27', '2020-05-13 20:08:25'),
(1234, '94.10', '19.10', '2020-05-13 20:23:26'),
(1234, '94.20', '19.20', '2020-05-13 20:38:27'),
(1234, '94.24', '19.24', '2020-05-13 20:53:28'),
(1234, '94.99', '19.99', '2020-05-13 21:08:30'),
(1234, '94.66', '19.66', '2020-05-13 21:23:31'),
(1234, '94.60', '19.60', '2020-05-13 21:38:32'),
(1234, '94.48', '19.48', '2020-05-13 21:53:32'),
(1234, '94.38', '19.38', '2020-05-13 22:08:33'),
(1234, '94.32', '19.32', '2020-05-13 22:23:34'),
(1234, '94.23', '19.23', '2020-05-13 22:38:40'),
(1234, '94.25', '19.25', '2020-05-13 22:53:41'),
(1234, '94.27', '19.27', '2020-05-13 23:08:43'),
(1234, '94.26', '19.26', '2020-05-13 23:23:44'),
(1234, '94.18', '19.18', '2020-05-13 23:38:45'),
(1234, '94.21', '19.21', '2020-05-13 23:53:46'),
(1234, '94.18', '19.18', '2020-05-14 00:08:47'),
(1234, '94.02', '19.01', '2020-05-14 00:23:47'),
(1234, '94.06', '19.06', '2020-05-14 00:38:49'),
(1234, '97.81', '22.81', '2020-05-14 00:53:51'),
(1234, '96.15', '21.15', '2020-05-14 01:08:51'),
(1234, '95.08', '20.08', '2020-05-14 01:23:52'),
(1234, '94.43', '19.43', '2020-05-14 01:38:53'),
(1234, '94.44', '19.44', '2020-05-14 01:53:54'),
(1234, '94.24', '19.24', '2020-05-14 02:08:55'),
(1234, '94.19', '19.19', '2020-05-14 02:23:55'),
(1234, '94.01', '19.01', '2020-05-14 02:38:56'),
(1234, '94.02', '19.02', '2020-05-14 02:53:57'),
(1234, '94.23', '19.23', '2020-05-14 03:08:58'),
(1234, '94.19', '19.19', '2020-05-14 03:23:58'),
(1234, '93.88', '18.88', '2020-05-14 03:38:59'),
(1234, '93.91', '18.91', '2020-05-14 03:54:01'),
(1234, '93.89', '18.89', '2020-05-14 04:09:02'),
(1234, '94.01', '19.01', '2020-05-14 04:24:02'),
(1234, '93.87', '18.87', '2020-05-14 04:39:03'),
(1234, '93.71', '18.71', '2020-05-14 04:54:04'),
(1234, '93.65', '18.65', '2020-05-14 05:09:05'),
(1234, '93.65', '18.65', '2020-05-14 05:24:06'),
(1234, '93.67', '18.67', '2020-05-14 05:39:06'),
(1234, '93.63', '18.63', '2020-05-14 05:54:07'),
(1234, '93.66', '18.66', '2020-05-14 06:09:08'),
(1234, '93.74', '18.74', '2020-05-14 06:24:09'),
(1234, '93.63', '18.63', '2020-05-14 06:39:10'),
(1234, '93.21', '18.21', '2020-05-14 06:54:11'),
(1234, '93.35', '18.35', '2020-05-14 07:09:12'),
(1234, '93.21', '18.21', '2020-05-14 07:24:13'),
(1234, '93.26', '18.26', '2020-05-14 07:39:14'),
(1234, '93.34', '18.34', '2020-05-14 07:54:14'),
(1234, '93.34', '18.34', '2020-05-14 08:09:15'),
(1234, '93.45', '18.45', '2020-05-14 08:24:16'),
(1234, '93.46', '18.46', '2020-05-14 08:39:17'),
(1234, '93.56', '18.56', '2020-05-14 08:54:18'),
(1234, '93.53', '18.53', '2020-05-14 09:09:18'),
(1234, '93.51', '18.51', '2020-05-14 09:24:19'),
(1234, '93.10', '18.10', '2020-05-14 09:39:20'),
(1234, '92.87', '17.87', '2020-05-14 09:54:21');

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
