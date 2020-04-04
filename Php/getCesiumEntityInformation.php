<?php
include('DBConnect.php');
include('Validation.php');

$stmt = $GLOBALS['dblink']->prepare("SELECT s.sensorID, s.sensorLatitude, s.sensorLongitude, s.sensorDeploymentDate, s.sensorType, r.regionName FROM tblsensorinformation AS s INNER JOIN tblregion as r ON s.regionID=r.regionID");
if ($stmt->execute() === TRUE) {
  $result = mysqli_stmt_get_result($stmt);
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  };
}
validateResult($data);
$stmt->close();
$GLOBALS['dblink']->close();
