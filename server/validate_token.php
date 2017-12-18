<?php
include('../config.php');

$payload = array();

if(
  isset($_SERVER['HTTP_X_ACCESS_TOKEN'])
) {

	try {	
		
		$token = $_SERVER['HTTP_X_ACCESS_TOKEN'];
		$jwt_payload = JWT::decode($token, JWT_SECRET, JWT_SIGNING_ALG);
		
    $new_token = $jwt_payload;
    $new_token->iat = time();
    $new_token->exp = time()+JWT_TOKEN_LIFETIME;
    $new_token = JWT::encode($new_token, JWT_SECRET);

    $payload = array(
      'payload' => $jwt_payload,
      'token' => $new_token
    );

	} catch(\Exception $e) {
    $response['status'] = false;
    $response['payload'] = ['message' => $e->getMessage()];
    header("Content-Type: application/json");
    echo json_encode($response);
    exit();
  }
  
} else {
  $response['status'] = false;
  $response['payload'] = ['message' => 'token is required'];
  header("Content-Type: application/json");
  echo json_encode($response);
  exit();
}