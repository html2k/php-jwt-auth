<?php 
require __DIR__ . '/../config.php';

if( isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['confirm']) ) {
  
  $connect = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

  $email = $connect->real_escape_string($_POST['email']);
  $pass = $connect->real_escape_string($_POST['pass']);
  $bio = encrypt($connect->real_escape_string('Hello, world.'), AES_SECRET);
  $confirm = sha1($connect->real_escape_string($_POST['confirm']));
  $safepass = safepass($pass, $confirm);
  $ts = date('U');

  $insert = "INSERT INTO `".PREFIX."users` (`id`, `email`, `pass`, `bio`, `active`, `confirm`, `timestamp`, `lastseen`)
  VALUES('', '".$email."', '".$safepass."', '".$bio."', 'false', '".$confirm."', '".$ts."', '".$ts."')";

  if($connect->query($insert)) {
    $response['status'] = true;

    $subject = 'Activate your account';
    $message = 'Hi, your activation code is: ' . $confirm;
    $headers = 'From: webmaster@example.com' . "\r\n" .
               'Reply-To: webmaster@example.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    mail($email, $subject, $message, $headers);
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