<?php

include('DBConnect.php');
include('Validation.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // collect value of input field
    $token = $_REQUEST['rid'];
    if (empty($token)) {
        echo "Invalid Request";
    } else {
        validateRequest($token);
    };
};

// Checks token passed validation
function validateRequest($token)
{
    if (validateToken($token) == true) {
        $getInfo = new getRegionAverage($token);
    } else {
        echo "Validation Failed";
    };
};

class getRegionAverage
{

    function __construct($token)
    {
        $stmt = $GLOBALS['dblink']->prepare("SELECT s.sensorID, r.regionName, r.regionCountry FROM tblsensorinformation AS s INNER JOIN tblregion as r ON s.regionID=r.regionID WHERE s.regionID =?");
        $stmt->bind_param("i", $token);
        if ($stmt->execute() === TRUE) {
            $result = mysqli_stmt_get_result($stmt);
            while ($row = $result->fetch_assoc()) {
                $sensors[] = $row['sensorID'];
                $regionName[] = $row['regionName'];
                $regionCountry[] = $row['regionCountry'];

            }
            $sensorCount = count($sensors);
            $airQuality = null;
            for ($i = 0; $i < $sensorCount; $i++) {

                $stmt2 = $GLOBALS['dblink']->prepare("SELECT airQuality FROM tblsensordata WHERE sensorID=? ORDER BY dateTime DESC LIMIT 1");
                $stmt2->bind_param("i", $sensors[$i]);
                if ($stmt2->execute() === TRUE) {
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row2 = $result2->fetch_assoc()) {
                        $airQuality[] = $row2['airQuality'];
                    }
                }
            }
        }
        $this->calcAverage($airQuality, $regionName, $regionCountry);
        $stmt->close();
        $GLOBALS['dblink']->close();
    }

    function calcAverage($airQuality, $regionName, $regionCountry)
    {
        $this->regionName = $regionName[0];
        $this->regionCountry = $regionCountry[0];
        if($airQuality === null){
            $this->averageAirQuality = null;
        } else {
            $airQuality = array_filter($airQuality);
            if (count($airQuality)) {
                $this->averageAirQuality = array_sum($airQuality) / count($airQuality);
            }
        }
        $resultJSON = json_encode($this);
        echo $resultJSON;
    }
}
