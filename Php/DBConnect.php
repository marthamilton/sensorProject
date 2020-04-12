<?php
// Suppress error reporting, toggle for debugging
error_reporting(0);

// Initialize variable for database credentials
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'dbairquality';

// Create database connection
$dblink = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// Check connection was successful
if ($dblink->connect_errno) {
    printf("Failed to connect to database");
    exit();
}
