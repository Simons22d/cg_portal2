<?php
//making the db conneciton
try{
    $conn = new PDO("mysql:host=localhost;dbname=site","root","");
}catch(Exeption $e){
    echo "error : ".$e->getMessage();
}
