CREATE TABLE `jwt-users` (
  `id` int(9) NOT NULL,
  `email` varchar(256) NOT NULL DEFAULT '',
  `user` varchar(256) NOT NULL DEFAULT '',
  `pass` text NOT NULL,
  `timestamp` varchar(64) NOT NULL DEFAULT '',
  `bio` varchar(1024) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;