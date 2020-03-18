<?php
include('DBConnect.php');
include('Validation.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // collect value of input field
    $token = $_REQUEST['t'];
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
        $sensorObj = new sensorDataOut($token);
    } else {
        echo "Validation Failed";
    };
};

class sensorDataOut
{

    function __construct($token)
    {
        $this->token = $token;
        //still need to export as json object
        $stmt = $GLOBALS['conn']->prepare("select airQuality, date_time from readings where sensor_id = ? order by date_time desc");
        $stmt->bind_param("s", $token);
        if ($stmt->execute() === TRUE) {
            $result = mysqli_stmt_get_result($stmt);
            while ($row = $result->fetch_assoc()) {
                $aq[] = $row['airQuality'];
                $dt[] = $row['date_time'];
            };
            $this->airQuality = $aq;
            $this->date_time = $dt;
            $resultJSON = json_encode($this);
        };
        $stmt->close();
        $GLOBALS['conn']->close();
    }
};
