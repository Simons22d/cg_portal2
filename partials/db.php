<?php
//making the db conneciton
try{
    $conn = new PDO("mysql:host=localhost;dbname=user_logins","root","");
}catch(Exeption $e){
    echo "error : ".$e->getMessage();
}
