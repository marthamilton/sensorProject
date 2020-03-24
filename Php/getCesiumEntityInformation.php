<?php
include('DBConnect.php');

//Fetch 3 rows from actor table
  $result = $dblink->query("SELECT s.sensorID, s.sensorLatitude, s.sensorLongitude, s.sensorDeploymentDate, s.sensorType, r.regionName FROM tblsensorinformation AS s INNER JOIN tblregion as r ON s.regionID=r.regionID");

//Initialize array variable
  $dbdata = array();

//Fetch into associative array
  while ( $row = $result->fetch_assoc())  {
	$dbdata[]=$row;
  }

//Print array in JSON format
echo json_encode($dbdata);

