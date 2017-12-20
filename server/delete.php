<?php
include('jwt.php');
include('validate_token.php');

$response = array();

if(
  isset($_POST['id'])
) {

  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
  $id = $connect->real_escape_string($_POST['id']);
  $delete = "DELETE FROM `".PREFIX."foo` WHERE id=$id";

  if($connect->query($delete) === TRUE) {

    $response['status'] = true;
    $response['payload'] = ['data' => 'deleted'];
    $response['jwt'] = $payload;

  } else {
    $response['status'] = false;
    $response['payload'] = array('message' => $connect->error);
  }

} else {
  $response['status'] = false;
	$response['payload'] = array('message' => 'failed to delete');
}

header("Content-Type: application/json");
echo json_encode($response);
/*
$response = array();
$response['status'] = true;
$response['payload'] = ['data' => $data];
$response['jwt'] = $payload;

header("Content-Type: application/json");
echo json_encode($response);
*/
$connect->close();