<?php
error_reporting(0);
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../mail-capture/vendor/phpmailer/phpmailer/src/Exception.php';
require '../mail-capture/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../mail-capture/vendor/phpmailer/phpmailer/src/SMTP.php';

require_once("db.php");
require_once("db2.php");
function  post($value,$main="manage_user"){
    return isset($_POST[$main][$value]);
}

if($_POST){
    if(isset($_POST["user_login"])){
            $userData = $_POST["user_login"];
            $email = $userData["email"];
            $password = hash("sha224",$userData["password"]);
            // user can login
            $stmt = $conn->prepare("SELECT * FROM users WHERE email =:email AND password = :password");
            $stmt->bindParam(":password",$password);
            $stmt->bindParam(":email",$email);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute();
            $data= $stmt->fetchAll();
            if(count($data)){
                $user = $data[0];
                $realUser = $conn2->prepare("SELECT * FROM users WHERE email = :email");
                $realUser->bindParam(":email",$email);
                $realUser->setFetchMode(PDO::FETCH_ASSOC);
                $realUser->execute();
                $final = $realUser->fetchAll();
                if($final){
                    $_SESSION["user"] = $final[0]["email"];
                    $_SESSION["userType"] = $final[0]["role"];
                    $_SESSION["userId"] = $final[0]["id"];
                    echo json_encode(["message"=>200,"userdata"=>$final[0]]);
                }else{
                    echo json_encode(["message"=>404]);
                }
            }else{
                // log the user out
                echo json_encode(["message"=>404]);
            }
    }else if(isset($_POST["user_signup"])){
        $userData = $_POST["user_signup"];
        if($userData){
            $email = $userData["email"];
            $password = hash("sha224",$userData["password"]);
            // we can add the user data
            $realUser = $conn2->prepare("SELECT * FROM users WHERE email = :email");
            $realUser->bindParam(":email",$email);
            $realUser->setFetchMode(PDO::FETCH_ASSOC);
            $realUser->execute();
            $final = $realUser->fetchAll();
                if($final){
                    $stmt=$conn->prepare("INSERT INTO users VALUES(null,:email,:password,NULL)");
                    $stmt->bindParam(":email",$email);
                    $stmt->bindParam(":password",$password);
                    $stmt->execute();
                    $data = $stmt->rowCount();
                    if($data){
                        $realUser = $conn2->prepare("SELECT * FROM users WHERE email = :email");
                        $realUser->bindParam(":email",$email);
                        $realUser->setFetchMode(PDO::FETCH_ASSOC);
                        $realUser->execute();
                        $final = $realUser->fetchAll();
                        $_SESSION["user"] = $final;
                        echo(json_encode(["message"=>100,"userdata"=>$final[0]]));
                    }else{
                        echo(json_encode(["message"=>400]));
                    }
                }else{
                    echo json_encode(["message"=>500]);
                }
        }
    }else if(isset($_POST["logout"])){
        session_unset();
        $_SESSION = [];
        echo json_encode(["message"=> 200]);
    }else if(isset($_POST["manage_user"])){
        // we are going to manager the user 
        if(post("firstname") && post("lastname") && post("phone") && post("password") && post("role")){
            // all fields are set 
            // hash the password and add it to user_logins
            // add the rest o the details to wambuine_cargen
            // hash the password to update the user database 
            $data = $_POST["manage_user"];

            // // update the login table
            $password = hash("sha224",$data["password"]);
            $email = $data["email"];
            $stmt=$conn->prepare("UPDATE users SET password = :password WHERE email = :email");
            $stmt->bindParam(":password",$password);
            $stmt->bindParam(":email",$email);
            $stmt->execute();
            $modified_login = $stmt->rowCount();

            // update the membership table 
            $names = $data["firstname"]." ".$data["lastname"];
            $phone = $data["phone"];
            $role = $data["role"];
            $id = $data["id"];
            //  phone = :phone, role = :user_role
            $member = $conn2->prepare("update users set name=:names, role=:role,phone=:phone where id=:id");
            $member->bindParam(":id",$id);
            $member->bindParam(":names",$names);
            $member->bindParam(":phone",$phone);
            $member->bindParam(":role",$role);
            $member->execute();
            $modified_member = $member->rowCount();

            if($modified_member || $modified_login){
                echo json_encode(["message"=>201]);
            }else{
                echo json_encode(["message"=>500]);
            }
        }
    }else if(isset($_POST["get_user"])){
        if(isset($_POST["get_user"]["user_id"])){
            $id = $_POST["get_user"]["user_id"];
            $realUser = $conn2->prepare("SELECT * FROM users WHERE id = :id");
            $realUser->bindParam(":id",$id);
            $realUser->setFetchMode(PDO::FETCH_ASSOC);
            $realUser->execute();
            $final = $realUser->fetchAll();
            echo  json_encode($final);
        }else{
            json_encode(["message" => "Invalid user"]);
        }
    }else if(isset($_POST["changePassword"])){
        $email = $_POST["changePassword"]["email"];
        if($email){
            if(filter_var($email,FILTER_VALIDATE_EMAIL)){
                // email valid
                // check if the user exists
                $exists = $conn->prepare("select * from users where email = :email");
                $exists->bindParam(":email",$email);
                $exists->setFetchMode(PDO::FETCH_ASSOC);
                $exists->execute();
                $data = $exists->fetchAll();
                if($data){
                    // user exists
                    // we are going to append a key to the table that  will be emailed to the user to reset their password
                    
                    $token = hash("joaat",uniqid());
                    $update = $conn->prepare("UPDATE users SET token=:token WHERE email=:email");
                    $update->bindParam(":token",$token);
                    $update->bindParam(":email",$email);
                    $update->execute();
                    $data = $update->rowCount();
                    if($data){
                        // added the key successfully
                        $subject = "Password Recovery Link";
                        $body = "Hello There,<br> Please Find the link below to recover your password.<br>Thanks, IT Support.<br><br> Link : http://192.168.12.200:81/recovery.php?token=$token";
                        $mail = new PHPMailer();
                        $mail->SMTPSecure = 'tls';
                        // to be changed
                        $mail->Username = "itsupport@cargen.com";
                        $mail->Password = "Support2019";
                        $mail->AddAddress($email);
                        $mail->isHTML(true);
                        $mail->FromName = "IT Support";
                        $mail->Subject = $subject;
                        $mail->Body = $body;
                        $mail->Host = "mail.cargen.com";
                        $mail->Port = 587;
                        $mail->IsSMTP();
                        $mail->SMTPAuth = true;
                        $mail->From = $mail->Username;
                        if(!$mail->Send()) {
                            echo json_encode(["message"=>501]);
                        } else {
                            echo json_encode(["message"=>200]);
                        }      
                    }else{
                        // an error occured
                        echo json_encode(["message"=>500]);
                    }
                }else{  
                    echo json_encode(["message"=>404]);
                }
            }else{
                // bad email
                echo json_encode(["message"=>500]);
            }
        }else{
            // email empty
            echo json_encode(["message"=>500]);
        }
    }else if(isset($_POST["updatePassword"])){
        $submitted_pass = $_POST["updatePassword"]["password"];
        if(!strlen($submitted_pass) < 4){
            // good length passowrd
            $token = $_POST["updatePassword"]["token"];
            $password = hash("sha224",$submitted_pass);
            // get user data 
            $user_data = $conn->prepare("SELECT * FROM users WHERE token =:token ");
            $user_data->bindParam(":token",$token);
            $user_data->setFetchMode(PDO::FETCH_ASSOC);
            $user_data->execute();
            $final = $user_data->fetchAll();
            $email = $final[0]["email"];

            $change = $conn->prepare("UPDATE users SET password = :password WHERE token = :token");
            $change->bindParam(":password",$password);
            $change->bindParam(":token",$token);
            $change->execute();
            $data = $change->rowCount();
            if($email){
                $change = $conn->prepare("UPDATE users SET token = NULL WHERE email = :email");
                $change->bindParam(":email",$email);
                $change->execute();

                $subject = "Password Succefully Changed.";
                $body = "Hello There,<br> You Have succefully recovered your password.<br> IT Support";
                $mail = new PHPMailer();
                $mail->SMTPSecure = 'tls';
                // to be changed
                $mail->Username = "itsupport@cargen.com";
                $mail->Password = "iTCargen2019";
                $mail->AddAddress($email);
                $mail->isHTML(true);
                $mail->FromName = "IT Support";
                $mail->Subject = $subject;
                $mail->Body = $body;
                $mail->Host = "mail.cargen.com";
                $mail->Port = 4050;
                $mail->IsSMTP();
                $mail->SMTPAuth = true;
                $mail->From = $mail->Username;

                if(!$mail->Send()) {
                    echo json_encode(["message"=>501]);
                } else {
                    echo json_encode(["message"=>200]);
                }      
            }else{
                // error occured
                echo json_encode(["message"=>502]);
            }
            // end block
        }else{
            echo json_encode(["message"=>503]);
        }
        
    }
}


