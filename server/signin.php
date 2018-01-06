<?php 
require __DIR__ . './../config.php';
require __DIR__ . '/jwt.php';

if( isset($_POST['user']) && isset($_POST['pass']) ) {

	$user = $_POST['user'];
  $pass = $_POST['pass'];
  $safepass = safepass($user, $pass);
  
  $response = array();

  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
  $query = "SELECT * FROM `".PREFIX."users` WHERE user='$user' AND pass='$safepass'";
  $result = $connect->query($query) or die($connect->error);
  $row = $result->fetch_assoc();

	if(
    $user == $row['user'] &&
    $safepass == $row['pass']
  ) {

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
		$response['payload'] = array('message' => 'invalid username and password');
	}

} else {
	$response['status'] = false;
	$response['payload'] = array('message' => 'username & password is required');
}

header("Content-Type: application/json");
echo json_encode($response);

$connect->close();