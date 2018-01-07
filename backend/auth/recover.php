<?php
require __DIR__ . '/../config.php';

if( isset($_POST['email']) ) {
  
  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
  $email = $connect->real_escape_string($_POST['email']);

  $check_query = "SELECT * FROM `".PREFIX."users` WHERE email='$email'";
  $check_result = $connect->query($check_query) or die($connect->error);
  $check_row = $check_result->fetch_assoc();

  $confirm = $check_row['confirm'];
  $ts = date('U');
  $pass = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(10 / strlen($x)) )), 1, 10);
  $safepass = safepass($email, $pass, $confirm);

  $update = "UPDATE `".PREFIX."users` SET pass='$safepass', lastseen='$ts' WHERE email='$email'";

  if($connect->query($update)) {
    $response['status'] = true;
    $response['payload'] = array('message' => 'password updated');
    // TODO: send email with $pass
  } else {
    $response['status'] = false;
    $response['payload'] = array('message' => $connect->error);
  }

} else {
  $response['status'] = false;
  $response['payload'] = array('message' => 'Confirm key not matching any id');
}

header("Content-Type: application/json");
echo json_encode($response);

$connect->close();