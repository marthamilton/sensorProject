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
        $stmt = $GLOBALS['dblink']->prepare("SELECT airQuality, dateTime FROM tblsensordata WHERE sensorID=? ORDER BY dateTime DESC LIMIT 1");
        $stmt->bind_param("i", $token);
        if ($stmt->execute() === TRUE) {
            $result = mysqli_stmt_get_result($stmt);
            //Initialize array variable
            $dbdata = array();
            // while ( $row = $result->fetch_assoc())  {
            //     $dbdata[]=$row;
            // }
            $row = $result->fetch_assoc();
            $resultJSON = json_encode($row);
            echo $resultJSON;
        }
        $stmt->close();
        $GLOBALS['dblink']->close();
    }
  }