<?php 
include('jwt.php');
include('validate_token.php');

$data = array('foo' => 'bar');

$response = array();
$response['status'] = true;
$response['payload'] = ['data' => $data];
$response['jwt'] = $payload;

header("Content-Type: application/json");
echo json_encode($response);