<?php 
include('../config.php');
include('jwt.php');

function safepass($user, $pass, $salt_1, $salt_2) {
  return hash('sha512', 'lily' . $user . $salt_1 . $pass . $salt_2);
}

if(
  isset($_POST['email']) && 
  isset($_POST['user']) &&
  isset($_POST['pass']) &&
  isset($_POST['repass'])
) {
  
  $email = $_POST['email'];
  $user = $_POST['user'];
  $pass = $_POST['pass'];
  $repass = $_POST['repass'];
  $bio = 'Hello, world.';

  $response = array();

	if(
    $pass == $repass
  ) {

    $safepass = safepass($user, $pass, SALT_1, SALT_2);
    $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
    
    $now = date('U');
    $insert = "INSERT INTO `".PREFIX."users` (`id`, `email`, `user`, `pass`, `timestamp`, `bio`, `level`)
    VALUES('', '".$email."', '".$user."', '".$safepass."', '".$now."', '".$bio."', '1')";

    if($connect->query($insert) === TRUE) {
    
      $payload = array(
        'user' => $user,
        'iat' => time(),
        'exp' => time() + JWT_TOKEN_LIFETIME
      );
  
      $jwt = JWT::encode($payload, JWT_SECRET);
  
      $response['status'] = true;
      $response['jwt'] = array(
        'payload' => $payload,
        'token' => $jwt
      );

    } else {
      $response['status'] = false;
      $response['payload'] = array('message' => $connect->error;);
    }

	} else {
		$response['status'] = false;
		$response['payload'] = array('message' => 'Your passwords doesnt match.');
	}

} else {
	$response['status'] = false;
	$response['payload'] = array('message' => 'Username & password is required');
}

header("Content-Type: application/json");
echo json_encode($response);

$connect->close();