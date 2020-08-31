-- MySQL dump 10.13  Distrib 5.7.27, for osx10.13 (x86_64)
--
-- Host: localhost    Database: user_logins
-- ------------------------------------------------------
-- Server version	5.7.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sys_back`
--

DROP TABLE IF EXISTS `sys_back`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_back` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_back`
--

LOCK TABLES `sys_back` WRITE;
/*!40000 ALTER TABLE `sys_back` DISABLE KEYS */;
INSERT INTO `sys_back` VALUES (1,'bckp_5d540042_Thursday+28th-Nov-2019+05.07.27.zip','2019-11-28 05:07:41',24350295),(2,'bckp_57336b0a_Thursday+28th-Nov-2019+09.42.24.zip','2019-11-28 09:42:39',24351374),(3,'bckp_fe64433c_Thursday+28th-Nov-2019+09.43.34.zip','2019-11-28 09:43:47',24351378),(4,'bckp_69c4e3c4_Thursday+28th-Nov-2019+09.56.22.zip','2019-11-28 09:56:36',24352448),(5,'bckp_5a8d559e_Thursday+28th-Nov-2019+11.47.25.zip','2019-11-28 11:47:41',24352494),(6,'bckp_36278cf5_Thursday+28th-Nov-2019+11.50.25.zip','2019-11-28 11:50:39',24352500),(7,'bckp_c6fa036e_Thursday+28th-Nov-2019+11.52.12.zip','2019-11-28 11:52:25',24352508),(8,'bckp_423b33ec_Thursday+28th-Nov-2019+11.52.53.zip','2019-11-28 11:53:04',24352503),(9,'bckp_4eb4bbcf_Thursday+28th-Nov-2019+11.53.54.zip','2019-11-28 11:54:12',24352507),(10,'bckp_a0a4d410_Thursday+28th-Nov-2019+11.55.37.zip','2019-11-28 11:55:50',24352492),(11,'bckp_1257683f_Thursday+28th-Nov-2019+11.56.52.zip','2019-11-28 11:57:05',24352499),(12,'bckp_408b0a93_Thursday+28th-Nov-2019+11.58.07.zip','2019-11-28 11:58:18',24352507),(13,'bckp_f8a03774_Thursday+28th-Nov-2019+12.00.11.zip','2019-11-28 12:00:25',24352509),(14,'bckp_27d20308_Thursday+28th-Nov-2019+12.05.31.zip','2019-11-28 12:05:46',24352538),(15,'bckp_b37f3fed_Thursday+28th-Nov-2019+12.05.49.zip','2019-11-28 12:06:00',24352538),(16,'bckp_7ec868a4_Thursday+28th-Nov-2019+12.06.29.zip','2019-11-28 12:06:43',24352536),(17,'bckp_0aed9c73_Thursday+28th-Nov-2019+12.06.46.zip','2019-11-28 12:06:56',24352536),(18,'bckp_98a1cf8d_Thursday+28th-Nov-2019+12.08.12.zip','2019-11-28 12:08:28',24352536),(19,'bckp_798c5573_Thursday+28th-Nov-2019+12.08.19.zip','2019-11-28 12:08:33',32566472),(20,'bckp_2198e8b9_Thursday+28th-Nov-2019+12.08.33.zip','2019-11-28 12:08:59',24352536),(21,'bckp_2f982be4_Thursday+28th-Nov-2019+12.08.34.zip','2019-11-28 12:09:03',25606691),(22,'bckp_3f1aca8f_Thursday+28th-Nov-2019+12.08.37.zip','2019-11-28 12:09:10',28827094),(23,'bckp_1612f95c_Thursday+28th-Nov-2019+12.08.39.zip','2019-11-28 12:09:11',30937568),(24,'bckp_f683b10d_Thursday+28th-Nov-2019+12.09.14.zip','2019-11-28 12:09:37',24352547),(25,'bckp_505d94a6_Thursday+28th-Nov-2019+12.09.17.zip','2019-11-28 12:09:40',26340472),(26,'bckp_0560a3d5_Thursday+28th-Nov-2019+12.09.17.zip','2019-11-28 12:09:40',26625630),(27,'bckp_a89fc63c_Thursday+28th-Nov-2019+12.09.59.zip','2019-11-28 12:10:18',24352547),(28,'bckp_f25d455d_Thursday+28th-Nov-2019+12.10.08.zip','2019-11-28 12:10:26',34264300),(29,'bckp_6ecfb439_Thursday+28th-Nov-2019+12.10.09.zip','2019-11-28 12:10:27',35160260),(30,'bckp_a45c5201_Thursday+28th-Nov-2019+12.11.14.zip','2019-11-28 12:11:27',24352550),(31,'bckp_2b4aa42d_Thursday+28th-Nov-2019+12.11.30.zip','2019-11-28 12:11:42',24352550),(32,'bckp_278db8de_Thursday+28th-Nov-2019+14.53.02.zip','2019-11-28 14:53:17',24352541),(33,'bckp_205e6b80_Thursday+28th-Nov-2019+14.56.07.zip','2019-11-28 14:56:25',24352569),(34,'bckp_95486b5f_Thursday+28th-Nov-2019+14.56.33.zip','2019-11-28 14:56:51',24352572),(35,'bckp_a0898f08_Thursday+28th-Nov-2019+14.57.26.zip','2019-11-28 14:57:46',28330802),(36,'bckp_859bdfa8_Thursday+28th-Nov-2019+15.01.11.zip','2019-11-28 15:01:31',28330802);
/*!40000 ALTER TABLE `sys_back` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'denis@gmail.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4','a2a1d485'),(2,'mark@gmail.com','e25388fde8290dc286a6164fa2d97e551b53498dcbf7bc378eb1f178',NULL),(3,'denniskiruku@gmail.com','f8cdb04495ded47615258f9dc6a3f4707fd2405434fefc3cbf4ef4e6','1733d029'),(4,'gilbert.mutai@cargen.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(5,'deniswambui@gmail.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(7,'mallec.wick@gmail.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(8,'denis@cargen.com','a7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057',NULL),(9,'peter@cargen.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4','6e07b774'),(10,'mark@cargen.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(15,'mike@cargen.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(17,'denniswambui@hotmail.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-28 18:04:37
