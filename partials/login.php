<?php
//starting the session
session_start();
$_SESSION["user"] = 'samstills@gmail.com';

// we are going to require the db connection
require_once("db.php");
    if($_POST){
        // working with login data
        if($_POST["login"]){
            if(!empty($_POST["login"]["userId"] && !empty($_POST["login"]["password"]))){
                //user cred are  there
                //hashing the password
                $user_id= str_replace("%23","#",$_POST["login"]["userId"]);
                $password = trim($_POST["login"]["password"]);
                $stmt = $conn->prepare("SELECT * FROM user WHERE id = :id and designation = 'Manager'");
                $stmt->bindParam(":id",$user_id);
                $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $stmt->execute();
                $data = $stmt->fetchAll();
                // echo json_encode($data);
                if(count($data)){
                    // we should also check the count ? if more than one inform the admin
                    //getting  the first item
                    $first_user_password = $data[0]['password'];
                    // checking if the password if valid
                    if($first_user_password == $password){
                        //password valid
                        // setting the session for success ()
                        $session_key = hash("whirlpool",$first_user_password);
                        $time = time()+60*1000;
                        $session_id = hash("whirlpool",$first_user_password);
                        $stmt = $conn->prepare("INSERT INTO session Values(:user_Id,:session_key,:time)");
                        $stmt->bindParam(":user_Id",$user_id);
                        $stmt->bindParam(":session_key",$session_key);
                        $stmt->bindParam(":time",$time);
                        $data = $stmt->execute();
                        if($data){
                            // success
                            // new session  - no existing session
                            echo json_encode(["status" => 200,"session_id"=>$session_id]);
                        }else{
                            // we have an existing session
                            //select the session
                            $stmt = $conn->prepare("select time FROM session WHERE user_id = user_id");
                            $stmt->bindParam(":user_Id",$user_id);
                            $stmt->setFetchMode(PDO::FETCH_ASSOC);
                            $stmt->execute();
                            $data = $stmt->fetchAll();
                            // echo json_encode($data[0]);
                            if(count($data[0]) >= 1){
                                //getting the session validity time
                                // we have a user/time record
                                $db_time = $data[0]["time"];
                                if($db_time < time()){
                                    // session older than one hour
                                    // delete and create another one
                                    $statement = $conn->prepare("DELETE FROM `session` WHERE `user_id` = :userId");
                                    $statement->bindParam(':userId', $user_id);
                                    $delete = $statement->execute();
                                    if($delete){
                                        //we managed to delete
                                        //so...
                                        // we copy na new session
                                        //add a new session
                                        $stmt = $conn->prepare("INSERT INTO session VALUES(:user_Id,:session_key,:time)");
                                        $stmt->bindParam(":user_Id",$user_id);
                                        $stmt->bindParam(":session_key",$session_key);
                                        $stmt->bindParam(":time",$time);
                                        $data = $stmt->execute();

                                        echo json_encode(["status"=>201,"session_id"=>$session_id]);
                                    }else{
                                        // we did not manage to delete
                                        echo json_encode(['status'=>409]);
                                    }
                                }else{
                                    //session still valid
                                    echo json_encode(["status" => 202,"session_id"=>$session_id]);
                                }
                            }else{
                                // an error has occured / rare
                                // we could not get the session time
                                echo json_encode(["status" => 303]);
                            }
                        }
                    }else{
                        //password not valid
                        echo json_encode(["status" => 409]);
                    }
                }else{
                    // user not found in the db
                    echo json_encode(["status" => 404]);
                }
            }else{
                // no form data
                echo json_encode(["status" => 503]);
            }
        }
        // working with the ajax post after the session has been submitted
        if($_POST["session_id"]){
            // getting the session data
            $session_data = $_POST["session_id"];

            // get the connection
            $stmt = $conn->prepare("SELECT * FROM country_branch");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute();
            $data = $stmt->fetchAll();
            echo json_encode($data);

        }

    }

?>