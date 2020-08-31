<?php
//making the db conneciton
try{
    $conn2 = new PDO("mysql:host=localhost;dbname=wambuine_cargen","root","");
}catch(Exeption $e){
    echo "error : ".$e->getMessage();
}
