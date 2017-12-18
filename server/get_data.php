<?php
include('../config.php');
include('jwt.php');
include('validate_token.php');

$data = array();
$connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
$query = "SELECT * FROM `".PREFIX."foo` ORDER BY `id`";
$result = $connect->query($query);

while($row = $result->fetch_assoc()) {
  $data[] = array(
    'data' => $row['data'],
    'added' => $row['added']
  );
}

$response = array();
$response['status'] = true;
$response['payload'] = ['data' => $data];
$response['jwt'] = $payload;

header("Content-Type: application/json");
echo json_encode($response);