-- MySQL dump 10.13  Distrib 5.7.26, for Linux (i686)
--
-- Host: localhost    Database: user_logins
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

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
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_back`
--

LOCK TABLES `sys_back` WRITE;
/*!40000 ALTER TABLE `sys_back` DISABLE KEYS */;
INSERT INTO `sys_back` VALUES (5,'bckp_16b0fec8_Tuesday+3rd-Dec-2019+09.18.31.zip','2019-12-03 07:18:59',125180054,0),(6,'bckp_cd998d9c_Tuesday+3rd-Dec-2019+09.39.46.zip','2019-12-03 07:40:14',125180054,0),(7,'bckp_97538375_Tuesday+3rd-Dec-2019+10.01.56.zip','2019-12-03 08:02:23',125180460,1),(8,'bckp_f71448d8_Tuesday+3rd-Dec-2019+10.03.31.zip','2019-12-03 08:03:57',125180460,2),(9,'bckp_c526a2fc_Tuesday+3rd-Dec-2019+10.05.05.zip','2019-12-03 08:05:31',125180460,2),(10,'bckp_57e3cacb_Tuesday+3rd-Dec-2019+10.26.24.zip','2019-12-03 08:26:51',125184831,1),(11,'bckp_5283db97_Tuesday+3rd-Dec-2019+11.04.44.zip','2019-12-03 09:05:10',125185333,2),(12,'bckp_42a64b5f_Tuesday+3rd-Dec-2019+11.17.21.zip','2019-12-03 09:17:48',125185334,1),(13,'bckp_e38fb9ff_Tuesday+3rd-Dec-2019+11.24.10.zip','2019-12-03 09:24:38',125185131,1),(14,'bckp_48cd01f0_Tuesday+3rd-Dec-2019+13.42.00.zip','2019-12-03 11:42:26',125543679,1),(15,'bckp_026b86cf_Tuesday+3rd-Dec-2019+15.55.24.zip','2019-12-03 13:55:51',125633218,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'denis@gmail.com','cc356dbc91efc9fdc3fb298e73512fd3908042cc284097cd91a1f284',NULL),(2,'mark@gmail.com','e25388fde8290dc286a6164fa2d97e551b53498dcbf7bc378eb1f178',NULL),(3,'denniskiruku@gmail.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4','c770f56a'),(4,'gilbert.mutai@cargen.com','a7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057',NULL),(5,'deniswambui@gmail.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(7,'mallec.wick@gmail.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(8,'denis@cargen.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(9,'peter@cargen.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4','85a66a66'),(10,'mark@cargen.com','3c794f0c67bd561ce841fc6a5999bf0df298a0f0ae3487efda9d0ef4',NULL),(11,'eolwande@cargen.com','a7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057',NULL),(12,'myrina.alivitsa@cargen.com','fa3b66f67821ccfe6f143c02d77c25b2242ab96bdcbd43cb13d7e2b2',NULL),(13,'laura.irungu@cargen.com','2958108b53eface3c633eeedd8bf19ec0e3eec2a5fd8ae5bc306ec3b',NULL),(14,'joseph.kimani@cargen.com','e86d91ea9f785b5d35d57aec2e6ccb015ccded0b7431d293c24126f1',NULL),(15,'gamaliel.ambuka@cargen.com','c9a2f5d2d923b4ce105ee3e1943ff5bff91ecd4c15960054752eb2f0','97d83767'),(16,'joel@cargen.com','2477c47531c0edcbe754e36c282e8f423ea6b9661dea083346b7d6aa',NULL),(17,'godfrey.langat@cargen.com','fdc99ed3ba6aff3ed489edd6308cff8266ed4495ff39e214bb09f98d',NULL),(18,'simon.kanyiri@cargen.com','1cbd7cf97190b3c993d32a1c549416619f3132f431d7ae5b4474e25d',NULL);
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

-- Dump completed on 2020-08-12 16:06:43
