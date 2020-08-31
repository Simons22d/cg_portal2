<?php
session_start();
if($_POST){
	if(isset($_POST["user_login"])){
		if(isset($_SESSION["user"])){
			// user can login
			echo json_encode(["user"=>$_SESSION["user"],"userType"=>$_SESSION["userType"], "userId" =>$_SESSION["userId"]]);
		}else{
			// log the user out
			echo json_encode(["user"=>false]);
		}
	}
}
?>


