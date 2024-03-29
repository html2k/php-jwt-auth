<?php
define('DBHOST', 'localhost');
define('DBUSER', 'root');
define('DBPASS', 'root');
define('DBNAME', 'jwt');

define('PREFIX', 'jwt-');
define('SALT_1', '}!6?|yn/TslJ&{}=@zY(!.+<Kh0J[$c9Vm{=#_#Q{nDovF|XE)-O~7E(InYss.y@');
define('SALT_2', 'iF>P(9k7>]Uk@04U9sQAe3H|F/rHSVeGi#%k}==/V|!tzFD2H/FV$,lC*UwW2XG|');
define('AES_SECRET', 'kP+#yy[|y=n0PgVJde|SZOwx|_}>fftuJBr&F:<-6u!s9;=fqcfV?~|S[6/P]vwX');

define('JWT_SECRET', '_/QNgj*DDF|AA:b[)q5eLd-+grM-x6b8L.gO#/nGny<1(:Ls%&E%|wniv?0>By+X');
define('JWT_SIGNING_ALG', 'HS256');
define('JWT_TOKEN_LIFETIME', 3600);

function safepass($pass, $confirm) {
  return hash('sha512', PREFIX . SALT_1 . $confirm . $pass . SALT_2);
}

function encrypt($plaintext, $pass) {
  $method = "AES-256-CBC";
  $key = hash('sha256', $pass, true);
  $iv = openssl_random_pseudo_bytes(16);

  $ciphertext = openssl_encrypt($plaintext, $method, $key, OPENSSL_RAW_DATA, $iv);
  $hash = hash_hmac('sha256', $ciphertext, $key, true);

  return $iv . $hash . $ciphertext;
}

function decrypt($ivHashCiphertext, $pass) {
  $method = "AES-256-CBC";
  $iv = substr($ivHashCiphertext, 0, 16);
  $hash = substr($ivHashCiphertext, 16, 32);
  $ciphertext = substr($ivHashCiphertext, 48);
  $key = hash('sha256', $pass, true);

  if (hash_hmac('sha256', $ciphertext, $key, true) !== $hash) return null;

  return openssl_decrypt($ciphertext, $method, $key, OPENSSL_RAW_DATA, $iv);
}