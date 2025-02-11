-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: employee_attendance
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance_logs`
--

DROP TABLE IF EXISTS `attendance_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_logs` (
  `username` varchar(255) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `logout_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_logs`
--

LOCK TABLES `attendance_logs` WRITE;
/*!40000 ALTER TABLE `attendance_logs` DISABLE KEYS */;
INSERT INTO `attendance_logs` VALUES ('','2025-01-16 08:00:00','2025-01-16 16:30:00'),(NULL,'2025-01-22 18:48:27',NULL),(NULL,'2025-01-22 18:49:19',NULL),('ceewy','2025-01-23 08:24:36','2025-01-27 14:17:25'),('chipolopolo','2025-01-23 09:55:47','2025-01-23 11:31:36'),('tk','2025-01-23 12:10:01','2025-01-23 12:10:15'),('tk','2025-01-23 12:38:07','2025-01-23 12:38:21'),('ceewy','2025-01-23 13:38:35','2025-01-27 14:17:02'),('ceewy','2025-01-23 14:39:50','2025-01-23 14:41:07'),('Rue','2025-01-23 15:04:32','2025-01-23 15:05:27'),('Rue','2025-01-23 22:07:26','2025-01-23 22:07:35'),('ceewy','2025-01-27 12:20:23','2025-01-27 12:24:09'),('kevy','2025-01-27 12:23:12','2025-01-27 12:23:15'),('Rue','2025-01-27 12:27:01','2025-01-27 12:57:18'),('Rue','2025-01-30 14:31:57','2025-01-30 16:11:11'),('Rue','2025-02-03 08:24:12','2025-02-05 10:56:24'),('kevy','2025-02-04 12:51:27','2025-02-06 15:17:11'),('chipolopolo','2025-02-04 16:10:39','2025-02-04 16:10:52'),('Rue','2025-02-06 11:36:29','2025-02-06 12:03:11'),('Rue','2025-02-06 12:03:03','2025-02-06 12:03:07'),('Rue','2025-02-06 12:49:25','2025-02-06 12:49:39'),('Rue','2025-02-06 12:49:44',NULL),('Rue','2025-02-06 14:29:18',NULL),('Olivia','2025-02-06 14:48:09','2025-02-06 14:52:47');
/*!40000 ALTER TABLE `attendance_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `position` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Christwish','cmusekiwa@petrotrade.co.zw','ICT Technician','2025-01-15 06:44:06'),(2,'Takudzwa','tmukaro@petrotrade.co.zw','ICT Intern','2025-01-15 06:44:06'),(3,'Forward','ftuvarave','ICT Intern','2025-01-15 06:44:06'),(4,'Emmanuel','emmanuel@gmail.com','ICT Intern','2025-01-16 13:10:58'),(5,'Tatenda','tatenda@petrotrade.co.zw','ICT Technician','2025-01-16 13:24:22');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_requests`
--

DROP TABLE IF EXISTS `leave_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_requests`
--

LOCK TABLES `leave_requests` WRITE;
/*!40000 ALTER TABLE `leave_requests` DISABLE KEYS */;
INSERT INTO `leave_requests` VALUES (1,'Rue','2025-02-10','2025-02-12','Honeymoon','Rejected','2025-01-29 13:49:05'),(2,'Rue','2025-02-10','2025-02-12','Honeymoon','Rejected','2025-01-29 14:18:01'),(3,'Rue','2025-02-03','2025-03-03','Martenity','Rejected','2025-02-03 12:17:02'),(4,'chipolopolo','2025-02-04','2025-03-04','Sick Leave','Rejected','2025-02-04 10:52:56'),(5,'Rue','2025-02-12','2025-04-16','Trip to Dubai','Rejected','2025-02-05 08:56:15'),(6,'chipolopolo','2025-02-20','2025-02-26','Holiday','Approved','2025-02-05 10:54:51'),(7,'manu','2025-02-05','2025-03-05','Trip to Mumbai','Rejected','2025-02-05 13:00:19'),(8,'manu','2025-04-05','2025-07-05','Farming Season','Approved','2025-02-05 13:02:23'),(9,'Rue','2025-02-20','2025-06-20','out','Pending','2025-02-06 10:51:05'),(10,'Olivia','2025-02-06','2025-03-14','Martenity','Approved','2025-02-06 13:01:30');
/*!40000 ALTER TABLE `leave_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaverequests`
--

DROP TABLE IF EXISTS `leaverequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaverequests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `reason` text NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequests`
--

LOCK TABLES `leaverequests` WRITE;
/*!40000 ALTER TABLE `leaverequests` DISABLE KEYS */;
INSERT INTO `leaverequests` VALUES (1,'ceewy','2025-02-10 00:00:00','2025-02-12 00:00:00','Martenity','Pending','2025-01-29 06:51:02'),(2,'Rue','2025-02-10 00:00:00','2025-02-12 00:00:00','Marriage','Pending','2025-01-29 09:05:56');
/*!40000 ALTER TABLE `leaverequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','employee') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'testuser','placeholder_1@example.com','testpassword','admin','2025-01-21 19:27:04',NULL,NULL),(2,NULL,'employee1','placeholder_2@example.com','password123','employee','2025-01-21 19:27:04',NULL,NULL),(3,NULL,'chipolopolo','placeholder_3@example.com','$2b$10$OHSqD1rrgRoJcmk81O0fJuLkLl/qCc447jg1wSbZBHHlVOwTdhaiK','employee','2025-01-21 19:27:04',NULL,NULL),(4,'takudzwa','taku','placeholder_4@example.com','$2b$10$8Mja8TZVwBsgPzmGQQ8JrugbQOGtyt4v7nSBungXBGNwAv/ck0u.6','admin','2025-01-21 19:27:04',NULL,NULL),(5,'Rutendo','ceewy','christwishrue@gmail.com','$2b$10$cn38dphTCwVJCqKht4EVAOJylbLQbATE5s.VFQDJ17YJG2jJtnSpe','employee','2025-01-21 19:27:04','af34550dfd9e9bb86adb701392b569ae716f173b6d583736722306ebbd186696','2025-02-11 11:30:27'),(6,'kelvin','kevy','takukelvin01@gmail.com','$2b$10$9nxlEbDs6/pQOByNnB0kAOrTVaqn/roltdSv0e3LQ3d0OsKmN9sym','admin','2025-01-21 20:03:49',NULL,NULL),(7,'tk','tk','tk@gmail.com','$2b$10$x2o/etLJ4GELwTNy1ysZ8OBZWYq37bAsffAPnfcRYwl2PKMhv4Nh6','employee','2025-01-23 10:03:01',NULL,NULL),(8,'Rutendo','Rue','rue@takudzwa.com','$2b$10$ezLP7lrFlx/imdXqE6PRxemINi9Uv.cvb4NeN5MbMnqa9/BsrXzAK','employee','2025-01-23 13:04:00',NULL,NULL),(9,'Tatenda','tatenda','tate@gmail.com','$2b$10$inw8fCNMfIGmmF9R/hRKdORag2TnEkzeaDEAAwSgR/Xmu5/IKDnJS','employee','2025-01-30 11:42:44',NULL,NULL),(11,'emmanuel','manu','manu@gmail.com','$2b$10$jFSmx0xg/0O5nm1dlq2hG.RlKypa/wqUJawldUq0NwbSxyxG.jeJW','employee','2025-01-30 11:50:44',NULL,NULL),(12,'Mai Taku','Sarudzai','sarudzaimukaro@gmail.com','$2b$10$llqxUkONHyoEUfu60OZGLerfpDHo93mRPVgDhmgFAhS18CcGUlB9K','employee','2025-02-05 16:59:26',NULL,NULL),(13,'Kelvin','Kelvin','kelvinmukaro@gmail.com','$2b$10$8WAFJlas2K64wSIpZCbpdOaJH.ohd2JiwthJA9vpp6Dx64.cjXJNa','admin','2025-02-05 20:05:23',NULL,NULL),(14,'Rumbidzai','Rudo','rumbidzai@gmail.com','$2b$10$Vv/2GCU5ojezWBaAV1GatOGrYcrvIfqKvnzJH7xMCv9MliYzv8Ek6','employee','2025-02-06 10:48:00',NULL,NULL),(15,'Chief','Chief','chief@gmail.com','$2b$10$cBPBHoI/F5BvzpWEgylccutqmBfGYff5t3guvtMVO3Cckbq1IbEKm','admin','2025-02-06 10:53:32',NULL,NULL),(16,'Olivia','Olivia','olivia@gmail.com','$2b$10$SscSoR8tOS3mQLKFsGH1yOgrf9Q6g3K5BCVQBzDVRS/WHc0YZX8Dm','employee','2025-02-06 12:42:38','be713030b7d85f8fc232843d262aee364a5bce76d27640fa39a8f4f1d4bc80f6','2025-02-10 17:27:16'),(17,'GoodHope','Hope','goodhope@gmail.com','$2b$10$n.QJJKafCu8iLn608qs6euqBqdEufDSblfByuzC85s94HVgd/I5nK','admin','2025-02-11 13:33:10',NULL,NULL);
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

-- Dump completed on 2025-02-11 16:07:43
