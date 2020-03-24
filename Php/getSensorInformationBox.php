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
        SELECT airQuality AS currentAQ, MAX(dateTime) AS currentDT, MAX(airQuality) AS maxAQ, MIN(airQuality) AS minAQ 
        FROM tblsensordata WHERE sensorID = ?");
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