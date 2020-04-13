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
         $stmt->close();
         $this->deleteSensorData($token);     
    }

    function deleteSensorData($token) {
        $stmt1 = $GLOBALS['dblink']->prepare("SELECT COUNT(*) as quantity FROM tblsensordata WHERE sensorID = ?");
        $stmt1->bind_param("i", $token);
        if ($stmt1->execute() === TRUE) {
            $result = mysqli_stmt_get_result($stmt1);
            $row = mysqli_fetch_assoc($result);
            $quantity = $row['quantity'];
            if($row['quantity'] > 100){
                $rowsToDelete =  $quantity - 100;
                $stmt2 = $GLOBALS['dblink']->prepare("DELETE FROM tblsensordata WHERE sensorID=? ORDER BY dateTime ASC LIMIT ? ");
                $stmt2->bind_param("ii", $token, $rowsToDelete);
                if ($stmt2->execute() === TRUE) {
                    echo " & successfully deleted";
                } else {
                    echo " & database failed to delete";
                }$stmt2->close();
        } else {
            echo "data entry fail " . "Error: " ."<br>" . $GLOBALS['dblink']->error;
        }
        $GLOBALS['dblink']->close();
        $stmt1->close();
    }
 }}