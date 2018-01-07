CREATE TABLE `jwt-users` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `user` varchar(256) NOT NULL,
  `pass` varchar(256) NOT NULL,
  `bio` varchar(256) NOT NULL,
  `timestamp` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `jwt-users` (`id`, `email`, `user`, `pass`, `bio`, `timestamp`) VALUES
(1, 'hej@hej.se', 'hej', 'd48e2323b41ef6f1833330449e32b5416ebef76b62d593dee4f49cbc71063de9c5847e7b07d32bf6cc85676b5bf4a78a98494a85cf2b4abeb595d0100f18374a', 'Hello, world.', '1515237044');





CREATE TABLE `jwt-users` (
  `id` int(9) NOT NULL,
  `email` varchar(256) NOT NULL,
  `pass` varchar(256) NOT NULL,
  `bio` varchar(1024) NOT NULL,
  `active` varchar(64) NOT NULL,
  `confirm` varchar(64) NOT NULL,
  `timestamp` varchar(64) NOT NULL,
  `lastseen` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;