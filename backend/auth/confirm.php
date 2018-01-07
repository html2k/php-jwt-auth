<?php 
require __DIR__ . '/../config.php';

if( isset($_POST['confirm']) ) {
  
  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

  $confirm = $connect->real_escape_string($_POST['confirm']);
  $ts = date('U');

  $update = "UPDATE `".PREFIX."users` SET active='true', lastseen='$ts' WHERE confirm='$confirm'";

  if($connect->query($update)) {
    $response['status'] = true;
    $response['payload'] = array('message' => 'account confirmed');
  } else {
    $response['status'] = false;
    $response['payload'] = array('message' => $connect->error);
  }

  $connect->close();

} else {
  $response['status'] = false;
  $response['payload'] = array('message' => 'Confirm key not matching any id');
}

header("Content-Type: application/json");
echo json_encode($response);