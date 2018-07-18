<?php

if (function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc()) {
    function strip_slashes($input) {
        if (!is_array($input)) {
            return stripslashes($input);
        }
        else {
            return array_map('strip_slashes', $input);
        }
    }
    $_GET = strip_slashes($_GET);
    $_POST = strip_slashes($_POST);
    $_COOKIE = strip_slashes($_COOKIE);
    $_REQUEST = strip_slashes($_REQUEST);
}

function customError($errno, $errstr) {
    echo "<b>Error:</b> [$errno] $errstr<br>";
    echo "Ending Script";
    die("Ending Script");
}
set_error_handler("customError");

$data = $_GET["data"];
$fileJSON = file_get_contents('form-reviews.json');

$dataDec = json_decode($data, true);
$jsonDec = json_decode($fileJSON, true);

array_push($jsonDec, $dataDec);
$json = json_encode($jsonDec);

file_put_contents('form-reviews.json', $json);

?>