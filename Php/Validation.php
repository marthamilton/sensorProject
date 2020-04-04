<?php
//Regex check on token
function validateToken($token)
{
    if (preg_match('/^[0-9]{1,4}?$/', $token)) {
        return true;
    };
};
//Regex check on Air Quality
function validateAirQuality($airQuality)
{
    if (preg_match('/^[0-9]+(\.[0-9]{1,2})?$/', $airQuality)) {
        return true;
    };
};
//Regex check on date
function validateDate($date_time)
{
    if (preg_match('/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/', $date_time)) {
        return true;
    };
};

function validateResult($result)
{
    $error = NULL;

    $key = true;
    while ($key) {
        foreach ($result as $property => $value) {
            if (is_null($value)) {
                echo json_encode($error);
                $key = false;
                break;
            } else {
                $resultJSON = json_encode($result);
                echo $resultJSON;
                $key = false;
                break;
            }
        }
    }
};
