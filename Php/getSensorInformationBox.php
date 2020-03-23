<?php
include('DBConnect.php');
include('Validation.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  // collect value of input field
  $token = $_REQUEST['id'];
  if (empty($token)) {
      echo "Invalid Request";
  } else {
      validateRequest($token);
  };
};

//Checks token passed validation
function validateRequest($token)
{
  if (validateToken($token) == true) {
     $getInfo = new getInformation($token);
  } else {
      echo "Validation Failed";
  };
};

class getInformation{

function __construct($token)
    {
        $stmt = $GLOBALS['dblink']->prepare("
        SELECT s.sensorLatitude, s.sensorLongitude, s.sensorDeploymentDate, r.regionName, d.airQuality AS currentAQ, MAX(d.dateTime) AS currentDT, MAX(d.airQuality) AS maxAQ, MIN(d.airQuality) AS minAQ 
        FROM tblsensorinformation AS s 
        INNER JOIN tblregion as r ON s.regionID=r.regionID 
        INNER JOIN tblsensordata as d on s.sensorID = d.sensorID WHERE s.sensorID = ?");
        $stmt->bind_param("i", $token);
        if ($stmt->execute() === TRUE) {
            $result = mysqli_stmt_get_result($stmt);
            while ($row = $result->fetch_assoc()) {
                $rN[] = $row['regionName'];
                $sLat[] = $row['sensorLatitude'];
                $sLon[] = $row['sensorLongitude'];
                $sDD[] = $row['sensorDeploymentDate'];
                $aq[] = $row['currentAQ'];
                $cDT[] = $row['currentDT'];
                $maxAQ[] = $row['maxAQ'];
                $minAQ[] = $row['minAQ'];
            };
            $this->regionName = $rN;
            $this->sensorLatitude = $sLat;
            $this->sensorLongitude = $sLon;
            $this->sensorDeploymentDate = $sDD;
            $this->airQuality = $aq;
            $this->dateTime = $cDT;
            $this->maxAQ = $maxAQ;
            $this->minAQ = $minAQ;
            $resultJSON = json_encode($this);
            echo $resultJSON;
        }
        $stmt->close();
        $GLOBALS['dblink']->close();
    }
  }