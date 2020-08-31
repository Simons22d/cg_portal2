<?php 
require_once("./partials/header.php");
?>
<title>Login : IT Support</title>
</head>
<style>
#spinner, #loading{
    display: none;
}
</style>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
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
            <h5>Forgot Password : IT Support</h5>
            </div>
             <br><br>
        </div>
    <!-- form -->
    <br>
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
        <label for="email">Email</label>
        <input type="text" id='userId' class="form-control" name="userId" placeholder='Enter Email' required>
    </div>
</form>
    <br>
    <div>
        <a href="./login.php"><button class="btn btn-link col-lg-4" type="button" onclick="" id="user_login">Login</button></a>
            <button class="btn btn-primary col-lg-7 " style="margin-left:23px" type="button" onclick="forgotPassword()"id="forgot_password">Send Me the Link</button>
    </div><br>

</div>
</body>
<script src="./scripts/utility.js"></script>
