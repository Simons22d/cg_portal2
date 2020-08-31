<?php
session_start();
// check if we have a database connection
require_once("./partials/header.php");
?>
<title>Recovery Password : IT Support</title>
</head>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<style>
    #spinner, #loading{
    display: none;
}
</style>
<body>
<div class="container center col-lg-4">
        <div class="row offset-by-150">
        <!-- logo -->
            <div class="logo center">
                <img src="logo.jpg" alt="Car And General">
            </div>
        </div>
        <br><br>
        <!-- login Header -->
         <div class="row justify-content-center">
            <div class="">
            <h5>Recover Password : IT Support</h5>
            </div>
             <br><br>
        </div>
        <br>
    <!-- form -->
<form id="name">
    <!-- userid -->
    <div class="form-group">
    <div class="row">
            <div class="col-lg-4 offset-lg-5">
            <div id="spinner"><span class="spinner spinner-bounce-middle"></span></div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
            <div id="loading">Loading ...</div>
            </div>
        </div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" class="form-control">
    </div>
    <!-- password -->
    <div class="form-group">
        <label for="Repeat Password">Repeat Password</label>
        <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" class="form-control">
    </div>
    <!-- buttons -->

</form>
    <br>
    <div>
        <a href="./login.php"><button class="btn btn-link col-lg-4" type="button" id="user_login">Login</button></a>
            <button class="btn btn-primary col-lg-7 " style="margin-left:23px" type="button" onclick="changePassword()"id="user_login">Submit New Password</button>
    </div><br>
</div>
</body>
<script src="./scripts/utility.js"></script>

