create database messaging_website;
use messaging_website;

DROP TABLE  if exists message_receiver;
DROP TABLE  if exists user_login;
CREATE TABLE `user_login` (
  `user_id` varchar(24) NOT NULL DEFAULT '',
  `login_name` varchar(24) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `email_id` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login_name` (`login_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE  if exists message;
CREATE TABLE `message` (
  `id` varchar(24) NOT NULL DEFAULT '',
  `sender_id` varchar(24) NOT NULL DEFAULT '',
  `thread_id` varchar(24) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `message_receiver` (
  `id` varchar(24) NOT NULL DEFAULT '',
  `message_id` varchar(24) NOT NULL DEFAULT '',
  `receiver_id` varchar(24) NOT NULL DEFAULT '',
  `thread_id` varchar(24) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `ForeignKey` (`receiver_id`),
  KEY `ForeignKeyMessages` (`message_id`),
  CONSTRAINT `ForeignKeyMessages` FOREIGN KEY (`message_id`) REFERENCES `message` (`id`),
  CONSTRAINT `ForeignKey` FOREIGN KEY (`receiver_id`) REFERENCES `user_login` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
