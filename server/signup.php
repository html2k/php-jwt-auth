<?php 
require __DIR__ . './../config.php';

if( isset($_POST['email']) && isset($_POST['user']) && isset($_POST['pass']) ) {
  
  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

  $email = $connect->real_escape_string($_POST['email']);
  $user = $connect->real_escape_string($_POST['user']);
  $pass = $connect->real_escape_string($_POST['pass']);
  $bio = $connect->real_escape_string('Hello, world.');

  $safepass = safepass($user, $pass);
  $insert = "INSERT INTO `".PREFIX."users` (`id`, `email`, `user`, `pass`, `bio`, `timestamp`)
  VALUES('', '".$email."', '".$user."', '".$safepass."', '".$bio."', '".date('U')."')";

  if($connect->query($insert)) {
    $response['status'] = true;
    // TODO: Send confirm email
  } else {
    $response['status'] = false;
    $response['payload'] = array('message' => $connect->error);
  }

} else {
	$response['status'] = false;
	$response['payload'] = array('message' => 'Username & password is required');
}

header("Content-Type: application/json");
echo json_encode($response);

$connect->close();