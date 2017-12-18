<?php 
include('jwt.php');
include('validate_token.php');

if(
  isset($_POST['data'])
) {

  $data = $_POST['data'];
  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
  
  $now = date('U');
  $insert = "INSERT INTO `".PREFIX."foo` (`id`, `data`, `added`)
  VALUES('', '".$data."', '".$now."')";

  if($connect->query($insert) === TRUE) {

    $response = array('data' => $data);
    header("Content-Type: application/json");
    echo json_encode($response);

  } else {
    echo $connect->error;
  }

} else {
	$response['status'] = false;
	$response['payload'] = array('message' => 'You must add some data');
}