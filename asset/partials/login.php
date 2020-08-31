<?php
//starting the session
session_start();


// we are going to require the db connection
require_once("db.php");
if($_POST){
        // get the connection
        $stmt = $conn->prepare("SELECT * FROM country_branch");
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();
        $data = $stmt->fetchAll();
        echo json_encode($data);

    }



?>