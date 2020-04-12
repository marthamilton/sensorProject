<?php

include('DBConnect.php');
include('Validation.php');
// On receipt of request take params and send them to validation

 if ($_SERVER["REQUEST_METHOD"] == "POST") {
     // Collect value of input field
     $token = $_REQUEST['t'];
     $airQuality = $_REQUEST['aq'];
     $humidity = $_REQUEST['h'];
     $date_time = $_REQUEST['dt'];
     if (empty($token) or empty($airQuality) or empty($humidity) or empty($date_time)) {
         echo "Invalid Request";
     } else {
         validateRequest($token, $airQuality, $humidity, $date_time);
     };
 };

 // Checks all parameters pass validation 
 function validateRequest($token, $airQuality, $humidity, $date_time) {
     if (validateToken($token) == true && validateAirQuality($airQuality) == true && validateAirQuality($humidity) == true && validateDate($date_time) == true) {
         $sensorObj = new sensorDataIn($token, $airQuality, $humidity, $date_time);
     } else {
         echo "Validation Failed";
     };
 };

 class sensorDataIn {
     function __construct($token, $airQuality, $humidity, $date_time) {
         $stmt = $GLOBALS['dblink']->prepare("insert into tblsensordata (sensorID, airQuality, humidity, dateTime) values (?, ?, ?, ?)");
         $stmt->bind_param("isss", $token, $airQuality, $humidity, $date_time);
         if ($stmt->execute() === TRUE) {
             echo "data entry success";
         } else {
             echo "data entry fail " . "Error: " . $stmt . "<br>" . $GLOBALS['dblink']->error;
         }
         $GLOBALS['dblink']->close();
         $stmt->close();
         $deleteSensorData = new deleteSensorData($token);     
    }
 };

 class deleteSensorData {
    function __construct($token) {
        $stmt = $GLOBALS['dblink']->prepare("SELECT COUNT(*) FROM tblsensordata WHERE sensorID = ?");
        $stmt->bind_param("i", $token,);
        if ($stmt->execute() === TRUE) {
            $result = mysqli_stmt_get_result($stmt);
            if($result > 100){
                $rowsToDelete = $result - 100;
                $stmt2 = $GLOBALS['dblink']->prepare("DELETE FROM tblsensordata WHERE sensorID=? ORDER BY dateTime ASC LIMIT ? ");
                $stmt2->bind_param("ii", $token, $rowsToDelete);
                if ($stmt2->execute() === TRUE) {
                    echo "successfully deleted";
                } else {
                    echo "database failed to delete";
                }
            }

            } else {
                echo "database up to date";
            }
        } else {
            echo "data entry fail " . "Error: " . $stmt . "<br>" . $GLOBALS['dblink']->error;
        }
        $GLOBALS['dblink']->close();
        $stmt->close();
        $stmt2->close();
    }