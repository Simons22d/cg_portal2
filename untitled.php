<?php 
 try{
        $conn = new PDO("mysql:host=localhost;dbname=user_logins","root","");
    }catch(Exeption $e){
        return null;
    }