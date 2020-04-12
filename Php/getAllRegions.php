<?php
include('DBConnect.php');
include('Validation.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Collect value of input field
    $token = $_REQUEST['rc'];
    if (empty($token)) {
        echo "Invalid Request";
    } else {
        validateRequest($token);
    };
};

// Checks token passed validation
function validateRequest($token) {
    if (validateToken($token) == true) {
        switch ($token) {
            case "1":
                $token = "Wales";
            break;
            case "2":
                $token = "England";
            break;
            default: echo "Nope";
        }
        $getInfo = new getInformation($token);
    } else {
        echo "Validation Failed";
    };
};

class getInformation {
    function __construct($token) {
        $stmt = $GLOBALS['dblink']->prepare("SELECT regionID from tblregion where regionCountry = ?");
        $stmt->bind_param("s", $token);
        if ($stmt->execute() === TRUE) {
            $result = mysqli_stmt_get_result($stmt);
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            };
        }
        $this->regions = $data;
        validateResult($this);
        $stmt->close();
        $GLOBALS['dblink']->close();
    }
}
