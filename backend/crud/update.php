<?php
include('jwt.php');
include('validate_token.php');

$response = array();

if(
  isset($_POST['id']) && 
  isset($_POST['val'])
) {

  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
  $id = $connect->real_escape_string($_POST['id']);
  $val = $connect->real_escape_string($_POST['val']);
  $update = "UPDATE `".PREFIX."foo` SET data='$val' WHERE id=$id";

  if($connect->query($update) === TRUE) {

    $response['status'] = true;
    $response['payload'] = ['data' => 'updated'];
    $response['jwt'] = $payload;

  } else {
    $response['status'] = false;
    $response['payload'] = array('message' => $connect->error);
  }

} else {
  $response['status'] = false;
	$response['payload'] = array('message' => 'failed to update');
}

header("Content-Type: application/json");
echo json_encode($response);

$connect->close();