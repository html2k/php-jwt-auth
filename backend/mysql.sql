CREATE TABLE `jwt-users` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `pass` varchar(256) NOT NULL,
  `bio` varbinary(4096) NOT NULL,
  `active` varchar(64) NOT NULL,
  `confirm` varchar(64) NOT NULL,
  `timestamp` varchar(64) NOT NULL,
  `lastseen` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;