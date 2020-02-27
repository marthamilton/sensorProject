<?php
//TODOLIST:
//set mac address of pi and associate with location in database i.e. mac 1 = malvern
include('DBConnect.php');
include('Validation.php');
//On receipt of request take params and send them to validation
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // collect value of input field
    $token = $_REQUEST['t'];
    $airQuality = $_REQUEST['aq'];
    $date_time = $_REQUEST['dt'];
    if (empty($token) or empty($airQuality) or empty($date_time)) {
        echo "Invalid Request";
    } else {
        validateRequest($token, $airQuality, $date_time);
    };
};

//Checks all parameters pass validation 
function validateRequest($token, $airQuality, $date_time)
{
    if (validateToken($token) == true && validateAirQuality($airQuality) == true && validateDate($date_time) == true) {
        $sensorObj = new sensorDataIn($token, $airQuality, $date_time);
    } else {
        echo "Validation Failed";
    };
};

class sensorDataIn
{

    function __construct($token, $airQuality, $date_time)
    {
        $stmt = $GLOBALS['conn']->prepare("insert into readings (sensor_id, airQuality, date_time) values (?, ?, ?)");
        $stmt->bind_param("iss", $token, $airQuality, $date_time);
        if ($stmt->execute() === TRUE) {
            echo "data entry success";
        } else {
            echo "data entry fail " . "Error: " . $stmt . "<br>" . $GLOBALS['conn']->error;
        }
        $stmt->close();
        $GLOBALS['conn']->close();
    }
}
