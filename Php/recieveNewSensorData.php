<?php
//TODOLIST:
//set mac address of pi and associate with location in database i.e. mac 1 = malvern
include('DBConnect.php');
include('Validation.php');
//On receipt of request take params and send them to validation
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // collect value of input field
    $sensorID = $_REQUEST['id'];
    $county = $_REQUEST['county'];   
    $latitude = $_REQUEST['latitude'];
    $longitude = $_REQUEST['longitude'];
    $type = $_REQUEST['type'];
    $deploymentDate = $_REQUEST['deploymentDate'];
    if (empty($sensorID) or empty($county) or empty($latitude) or empty($longitude) or empty($type) or empty($deploymentDate)) {
        echo "Invalid Request";
    } else {
        validateRequest($sensorID, $county, $latitude, $longitude, $type, $deploymentDate);
    };
};

//Checks all parameters pass validation 
function validateRequest($sensorID, $county, $latitude, $longitude, $type, $deploymentDate)
{
    if (validatesensorID($sensorID) == true && validatecounty($county) == true && validatecounty($latitude) == true && validatecounty($longitude) == true && validatecounty($type) == true && validateDate($deploymentDate) == true) {
        $sensorObj = new sensorDataIn($sensorID, $county, $latitude, $longitude, $type, $deploymentDate);
    } else {
        echo "Validation Failed";
    };
};

class sensorDataIn
{

    function __construct($sensorID, $county, $latitude, $longitude, $type, $deploymentDate)
    {
        $stmt = $GLOBALS['conn']->prepare("insert into readings (sensorID, county, latitude, longitude, type, deploymentDate) values (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iss", $sensorID, $county, $latitude, $longitude, $type, $deploymentDate);
        if ($stmt->execute() === TRUE) {
            echo "data entry success";
        } else {
            echo "data entry fail " . "Error: " . $stmt . "<br>" . $GLOBALS['conn']->error;
        }
        $stmt->close();
        $GLOBALS['conn']->close();
    }
}
