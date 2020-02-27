<?php
//Regex check on token
function validateToken($token)
{
    if (preg_match('/^[0-9]{1,4}?$/', $token)) {
        #echo "token gud";
        return true;
    };
};
//Regex check on Air Quality
function validateAirQuality($airQuality)
{
    if (preg_match('/^[0-9]+(\.[0-9]{1,2})?$/', $airQuality)) {
        #echo "aq gud";
        return true;
    };
};
//Regex check on date
function validateDate($date_time)
{
    if (preg_match('/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/', $date_time)) {
        #echo "dategud";
        return true;
    };
};
