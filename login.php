<?php
session_start();
// check if we have a database connection
require_once("./partials/header.php");
?>
<title>Login : IT Support</title>
</head>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<style>
</style>
<body style='font-family:"Muli"'>
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
            <h5>Login : IT Support</h5>
            </div>
             <br><br>
        </div>
    <!-- form -->
<form id="name" style='font-family:"Muli"'>
    <!-- userid -->
    <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id='userId' class="form-control" name="userId" placeholder='john.doe@cargen.com' required>
    </div>
    <!-- password -->
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" class="form-control">
    </div>
    <!-- buttons -->

</form>
    <br>
    <div>
        <button class="btn btn-secondary col-lg-4" type="button" onclick="to_login()" id="user_login">Signup</button>
            <button class="btn btn-primary col-lg-7 " style="margin-left:23px" type="button" onclick="login()"id="user_login">Login</button>
    </div><br>
    <div class="form-group">
        <a href="./password.php"><button type="button" id="forgotPassword" class="btn btn-link btn-block">Forgot Password ?</button></a>
    </div>
</div>

</body>
<script>

    function login(){
        let formData = $("#name").serialize().split("&");
        let email = unescape(formData[0].split("=")[1]);
        let password = formData[1].split("=")[1];
        if(email.length) {
            if (validateEmail(email)) {
                $.ajax({
                    url: "./partials/proc2.php",
                    method: "POST",
                    data: {
                        "user_login": {
                            email: email,
                            password: password
                        },
                    },
                    success: function (result) {
                        console.log(result);
                        let userData = JSON.parse(result);
                        if (userData.message === 200) {
                            //    means we have user data
                            let currentUser = userData.userdata;
                            let user = {
                                "user": currentUser.email,
                                "userType": parseInt(currentUser.role),
                                "userId": parseInt(currentUser.id)
                            };
                            sessionStorage.setItem("user", JSON.stringify(user));
                            window.location = "index.php";
                        } else if (userData.message === 404) {
                            swal({
                                title: "Invalid Credatials",
                                text: "Email and Password Must Be Valid",
                                timer: 5000,
                                icon: "error"
                            })
                        }
                    },
                    error : (error)=>{
                        console.log(error)
                    }
                });
            } else {
                swal({
                    title: "Error!",
                    text: "Email Not Valid",
                    icon: "error",
                    button: "Okay",
                });
            }
        }else{
            swal({
                title: "Error!",
                text: "Email Empty",
                icon: "error",
                button: "Okay",
            });
        }

    }
    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    // function validateEmail(email) {
    //     let re = /^((?!\.)[\w-_.]*[^.])@cargen\.com$/;
    //     return re.test(email);
    // }
    function to_login(){
        window.location.href = "signup.php";
    }
</script>

