<?php

ini_set('max_execution_time', 600);
ini_set('memory_limit','1024M');

//MySQL server and database
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'Devs2019c!?__';
$dbname = 'user_logins';
$tables = '*';

$no_zip = array("Backups");


$path = '/home/dev/support';
// $path = "/Users/denis/Documents/Coding/support";
$filename='db_bckp.'.'sql';
$folder_name='bckp_'.hash("joaat",uniqid())."_".date('l+jS-M-Y+H.i.s').'.zip';

$no_zip = array("Backups");
// Zip archive will be created only after closing object
if(zipData($path,$folder_name,$no_zip)){
    $backup_path =$path."/Backups/".$folder_name;
    // $backup_path ="/Users/denis/Documents/Coding/support/Backups/".$folder_name;
    rename($folder_name,$backup_path);
    $size = filesize($backup_path);
    $status = 2;
    // copy to the database
    $conn = db();
    // add to the db 
    $stmt = $conn->prepare("INSERT INTO sys_back VALUES(NULL,:name,NULL,:size,:status)");
    $stmt->bindParam(":name",$folder_name);
    $stmt->bindParam(":size",$size);
    $stmt->bindParam(":status",$status);
    $stmt->execute();
    $final = $stmt->rowCount();

    // get all the existing data
    $usr_data = $conn->prepare("SELECT * FROM sys_back");
    $usr_data->setFetchMode(PDO::FETCH_ASSOC);
    $usr_data->execute();
    $data = $usr_data->fetchAll();
    
}else{
    echo json_encode(["res" => 2222]);
}



function db(){
    global $dbpass;
    //making the db conneciton
    try{
        $conn = new PDO("mysql:host=localhost;dbname=wambuine_cargen","root",$dbpass);
        return $conn;
    }catch(Exeption $e){
        return null;
    }
}


// Here the magic happens :)
function zipData($source, $destination, $nozip = array()) {
    if (is_array($nozip) && extension_loaded('zip')) {
        if (file_exists($source)) {
            $zip = new ZipArchive();
            if ($zip->open($destination, ZIPARCHIVE::CREATE)) {
                $source = realpath($source);
                if (is_dir($source)) {
                    $iterator = new RecursiveDirectoryIterator($source);
                    // skip dot files while iterating 
                    $iterator->setFlags(RecursiveDirectoryIterator::SKIP_DOTS);
                    $files = new RecursiveIteratorIterator($iterator, RecursiveIteratorIterator::SELF_FIRST);
                    foreach ($files as $file) {
                        $file = realpath($file);
                        if(!match($file, $nozip)) //Check if it has to zip the file/folder
                        {
                            if (is_dir($file)) {
                                $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
                            } else if (is_file($file)) {
                                $zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
                            }
                        }
                    }
                } else if (is_file($source)) {
                    $zip->addFromString(basename($source), file_get_contents($source));
                }
            }
            return $zip->close();
        }
    }
    return false;
}


//Returns true if $item is matched once through $array by preg_match()
function match($item, $array){
    $matching = array("\\" => "[\/|\\\]", "/" => "[\/|\\\]");
    foreach($array as $i)
    {
        $str = strtr($i, $matching); //creates the regex
        if(preg_match("/".$str."/i", $item))
            return true;
    }
    return false;
}
// backing up the database 

//Core function


//Call the core function
backup_tables($dbhost, $dbuser, $dbpass, $dbname, $tables);

//Core function
//Core function
function backup_tables($host, $user, $pass, $dbname, $tables = '*') {
    $link = mysqli_connect($host,$user,$pass, $dbname);

    // Check connection
    if (mysqli_connect_errno())
    {
        exit;
    }
    mysqli_query($link, "SET NAMES 'utf8'");
    //get all of the tables
    if($tables == '*')
    {
        $tables = array();
        $result = mysqli_query($link, 'SHOW TABLES');
        while($row = mysqli_fetch_row($result))
        {
            $tables[] = $row[0];
        }
    }
    else
    {
        $tables = is_array($tables) ? $tables : explode(',',$tables);
    }

    $return = '';
    //cycle through
    foreach($tables as $table)
    {
        $result = mysqli_query($link, 'SELECT * FROM '.$table);
        $num_fields = mysqli_num_fields($result);
        $num_rows = mysqli_num_rows($result);

        $return.= 'DROP TABLE IF EXISTS '.$table.';';
        $row2 = mysqli_fetch_row(mysqli_query($link, 'SHOW CREATE TABLE '.$table));
        $return.= "\n\n".$row2[1].";\n\n";
        $counter = 1;

        //Over tables
        for ($i = 0; $i < $num_fields; $i++) 
        {   //Over rows
            while($row = mysqli_fetch_row($result))
            {   
                if($counter == 1){
                    $return.= 'INSERT INTO '.$table.' VALUES(';
                } else{
                    $return.= '(';
                }

                //Over fields
                for($j=0; $j<$num_fields; $j++) 
                {
                    $row[$j] = addslashes($row[$j]);
                    $row[$j] = str_replace("\n","\\n",$row[$j]);
                    if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; } else { $return.= '""'; }
                    if ($j<($num_fields-1)) { $return.= ','; }
                }

                if($num_rows == $counter){
                    $return.= ");\n";
                } else{
                    $return.= "),\n";
                }
                ++$counter;
            }
        }
        $return.="\n\n\n";
    }

    //save file
    $fileName = 'db_bckp.sql';
    $handle = fopen($fileName,'w+');
    fwrite($handle,$return);
    if(fclose($handle)){
        exit; 
    }
}