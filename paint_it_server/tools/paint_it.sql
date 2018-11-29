SET NAMES utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(32) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY (`username`),
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `user_canvas`;
CREATE TABLE `user_canvas` (
  `user_id` int(32) NOT NULL,
  `canvas_id` int(32) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_src` varchar(1000) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`user_id`,`canvas_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `canvases`;
CREATE TABLE `canvases` (
  `canvas_id` int(32) NOT NULL AUTO_INCREMENT,
  `trail_record` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`canvas_id`),
  KEY `canvas_id` (`canvas_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `covers`;
CREATE TABLE `covers` (
  `canvas_id` int(32) NOT NULL,
  `cover_record` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`canvas_id`),
  KEY `canvas_id` (`canvas_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
