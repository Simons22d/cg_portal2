<?php
session_start();

if(!isset($_SESSION["user"])){
    header("location:login.php");
}

error_reporting(0);
//require the database connection
require_once("./partials/db.php");

//require the header
require_once("./partials/header.php");

if($_POST){
	if(isset($_POST["user_login"])){
		if(isset($_SESSION["user"])){
			// user can login
			echo json_encode(["user"=>$_SESSION["user"]]);
		}else{
			// log the user out
			echo json_encode(["user"=>false]);
		}
	}
}
?>
    <script> 
        // $("#spinner").show();
        $("#data").hide();
        $("#buttons").hide();
    </script>
    <style>
        #location{
            color : #09f;
        }
        .wrapper_div{
            background: #fcfcfc;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2000;
        }
        .loader,
        .loader:after {
            border-radius: 50%;
            width: 10em;
            height: 10em;
        }
        .loader {
            margin: 60px auto;
            font-size: 10px;
            position: relative;
            text-indent: -9999em;
            border-top: 1.1em solid rgba(0,116,255, 0.2);
            border-right: 1.1em solid rgba(0,116,255, 0.2);
            border-bottom: 1.1em solid rgba(0,116,255, 0.2);
            border-left: 1.1em solid #0074ff;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-animation: load8 1.1s infinite linear;
            animation: load8 1.1s infinite linear;
        }
        @-webkit-keyframes load8 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        @keyframes load8 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        .space{
            padding-top:200px;
        }
        #spinner{
            margin-top :10px;
        }
        #beta{
            font-size:10px;
            background-color: #09f;
            color : #fff;
            padding : 2px 5px;
            border-radius :5px;
        }
        #username{
            font-size : 12px;
            margin-bottom : 15px;
            color : #fff;
            font-weight : 900;
            background-color: #fe5363;
            padding : 4px 10px 5px 15px;
            width : 75%;
            border-radius : 15px;
            letter-spacing: .5px;
        }
        #spinner{
            padding-left:55px;
        }
        #back{
            padding-top:5px;
            cursor : pointer;
        }
        #back_btn{
            border-radius:20px;
            width:90px
            /* font-size:18px; */
        }
    </style>
    <div class="wrapper_div">
        <div class="space"></div>
        <div class="loader"></div>
    </div>
<body>
<div id="container" style="font-family:Muli">
    <div id="sidebar" >
        <div id="sidebar-content" style="height:600px;font-weight: 600;">
		<img src="./logo.jpg" id="logo" alt="">
		<link rel="stylesheet" href="./style/sidebar.css">
	<!-- drop down -->
		<div class=" link option" id="home" style="margin-left :20px; font-size :16px;">Home</div>
		<div class=" link option clicked" id="overview" style="margin-left :20px; margin-top:3px; font-size :16px;">Overview</div>
<!-- end drop downs -->
    <!-- adding product options -->
	<p id="space"></p>
	<p class="header sidebar_items" style="margin-top:-10px">Requests</p>
	<div class="sidebar_items items sidebar">
	<div class="item link option"  id="new" style="padding-top: 5px;"><span><img class="icon"src="./images/new.png"  height="19px" ></span  id="new" >New Requests</div><p></p>
		<div class="item link option" id="pending" style="margin-top : -2px"><span><img  style="margin-top : -3px" class="icon" src="./images/pending.png"  height="20px"></span>Assigned Requests</div><p></p>
        <div class="item link option" id="resolved" style="margin-top : -3px"><span><img style="margin-top : -3px" class="icon" src="./images/resolved.png"  height="20px"></span>Resolved Requests</div><p></p>
        <div class="item link option" id="escalated" style="margin-top : -3px"><span><img style="margin-top : -3px" class="icon" src="./images/escalated.png"  height="20px"></span>Escalated Requests</div><p></p>
        <div class="item link option" id="closed" style="margin-top : -3px"><span><img style="margin-top : -3px" class="icon" src="./images/closed.png"  height="20px"></span>Closed Requests</div><p></p>
	</div>
	<!-- end of products  -->
    <p class="header sidebar_items">Utilities</p>
    <div class="sidebar_items items sidebar ">
        <div class="item link option" id="change" style="margin-top : -3px"><span><img style="margin-top : -3px" class="icon" src="./images/notConfirmed.png"  height="20px"></span>Change Management</div><p></p>
        <div class="item link option" id="project"><span><img  style="margin-top : -2px" class="icon"src="./images/mgmt.png"  height="10px" style="padding-left:-7px"></span>Project Utility</div><p></p>

    </div>

            <!-- kbs -->
	<p class="header sidebar_items">Knowledge Database</p>
	<div class="sidebar_items items sidebar ">
		<!-- <div class="item link option" id="solution"><span><img style="margin-top : -6px" class="icon"src="./images/solution.png"  height="19px" style="padding-left:3px"></span>Add Solution</div><p></p> -->
		<div class="item link option" id="viewSolution"><span><img  style="margin-top : -8px" class="icon"src="./images/viewSolution.png"  height="16px" style="padding-left:-7px"></span>View Solutions</div><p></p>
		<div class="item link option" id="routine"><span><img  style="margin-top : -2px" class="icon"src="./images/routine.png"  height="16px" style="padding-left:-7px"></span>Routines</div><p></p>
    </div>
        <p class="header sidebar_items">Tools</p>
	<div class="sidebar_items items sidebar">
		<div class="item link option" id="backups"><span><img style="margin-top : -6px" class="icon"src="./images/backups.png"  height="19px" style="padding-left:3px"></span>Backups</div><p></p>
		<div class="item link option" id="asset"><span><img style="margin-top : -6px" class="icon"src="./images/assets.png"  height="19px" style="padding-left:3px"></span>Asset Management</div><p></p>
    </div>
<!-- end kbs -->
	<!-- members -->
	<p class="header sidebar_items">Members</p>
	<div class="sidebar_items items sidebar ">
		<div class="item link option" id="addMember"><span><img style="margin-top : -6px" class="icon"src="./images/addMember.png"  height="19px" style="padding-left:3px"></span>Add Members</div><p></p>
		<div class="item link option" id="removeMember"><span><img  style="margin-top : -8px" class="icon"src="./images/removeMember.png"  height="16px" style="padding-left:-7px"></span>Manage Members</div><p></p>
    </div>
            <br>
            <span class="btn btn-outline-secondary btn-sm disabled" id='loggedEmail'><?=$_SESSION['user']?></span>
            <br>
            <div class="logout" id="logout">
            <span class="btn btn-warning btn-sm mt-3 col-lg-5">Logout</span>
        </div><p></p>
            <!-- end of members -->
    <br></div>
    </div><!--
 --><div id="content">
	<div id="main-content" style="height: 400px">
		<!-- the container to the display page -->
		<div class="container">
			<div id="space"></div><br>
            <!-- BACK BUTTON <div class="back btn btn-secondary btn-sm" style="margin-left:35px; width:80px; border-radius: 20px;display :hidden;background-color:#ccc; border-color:#ccc;"><i class="fas fa-arrow-left"></i><span id='i_space'>&nbsp;</span> Back</div> -->
            <!-- <span id="beta">beta</span> -->
			<div class="row col-lg-12">
                <div class="col-lg-6" style="margin-left:-15px"><h5 id="theDisplay">IT Support Platform </h5></div>
                <div class="col-lg-4" style=""><input class="form-control"  type="search" id="search"  placeholder="Search" aria-label="Search"></div>
                <div class="col-lg-1" id="back"><span id='back_btn' class="btn btn-secondary btn-sm btn-block"> <i class="fas fa-long-arrow-alt-left"></i>&nbsp;&nbsp;Back</span></div>
                <div class="col-lg-1" id="spinner"><span class="spinner spinner-bounce-middle"></span></div>
            </div>
			<h5 id="section">Overview</h5>
				<div id='location'>/&nbsp;<span>Home</span>&nbsp;/&nbsp;<span id="currentPath" style="font-family:'Muli'">Overview &nbsp;</span></div>
				<br>
				<div id="display" >

				</div>
		</div>
    </div>
	</div>
</div>
<?php
require_once("./partials/footer.php");
?>