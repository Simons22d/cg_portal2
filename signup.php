<?php
session_start();

// check if we have a database connection
require_once("./partials/header.php");
?>
<script>
//    init tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
</script>
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<style>
    .info_signup{
        color: #999;
    }
</style>
<title>SignUp</title>
</head>
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
            <h5>SignUp : IT Support &nbsp; <i class="fas fa-question-circle info_signup"data-toggle="tooltip" data-placement="right" title="Admin Must Add You To The System Before You Could SignUp."></i></h5>
        </div>
    </div>
    <!-- form -->
    <form id="name">
        <!-- userid -->
        <div class="form-group">
            <label for="Email">Email</label>
            <input type="text" id='Email' class="form-control" name="Email" placeholder='john.doe@cargen.com' required>
        </div>
        <!-- password -->
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Confirm Password</label>
            <input type="password" id="ConfirmPassword" name="ConfirmPassword" placeholder="Confirm Password" class="form-control">
        </div>
        <!-- buttons -->
    </form>
    <br>
    <div>
        <button class="btn btn-secondary col-lg-4" type="button" onclick="to_signup()" id="user_login">Login</button>
        <button class="btn btn-primary col-lg-7 " style="margin-left:23px" type="button" onclick="signUp()" id="signup" >SignUp</button>
    </div>
</div>
</body>
<script>
    function to_signup(){
        window.location.href = "login.php";
    }
    function signUp(){ 
            let formData = $("#name").serialize().split("&");
            let email = unescape(formData[0].split("=")[1]);
            let password = formData[1].split("=")[1];
            let confirm = formData[2].split("=")[1];
            console
            if(email.length > 0 && password.length > 0 && confirm.length > 0){
                if(validateEmail(email)){
                    //    email valid
                    if(password === confirm){
                        $.ajax({
                        url: "./partials/proc2.php",
                        method: "POST",
                        data: {
                            "user_signup": {
                                email : email,
                                password : password
                            },
                        },
                        success: function (result) {
                            let res = JSON.parse(result);
                            let message = res.message;
                            if(message === 100 ){
                                //    user addedd successfully
                                swal({
                                    title: "success",
                                    text: "User Added Successfully",
                                    timer: 5000,
                                    icon: "success"
                                })

                                let currentUser = res.userdata;
                                let user = {
                                    "user": currentUser.email,
                                    "userType" : parseInt(currentUser.role),
                                    "userId"  : parseInt(currentUser.id)
                                };
                                sessionStorage.setItem("user",JSON.stringify(user));
                                window.location = "login.php";
                            }else if(message === 400){
                                //    user could not be added
                                swal({
                                    title: "Account Already Exists",
                                    text: "Please Login",
                                    timer: 5000,
                                    icon: "error"
                                })
                            }else if(message === 500){
                                swal({
                                    title: "Forbidden",
                                    text: "User Not In The It Department",
                                    timer: 5000,
                                    icon: "error"
                                })
                            }
                        }
                    });
                    }else{
                        swal({
                            title: "Passwords Do Not Match",
                            text: "Please Make Sure The passwords Match",
                            timer: 5000,
                            icon: "error"
                        });
                    }   
                }else{
                    swal({
                        title: "Invalid Credentials",
                        text: "Email Is Not Valid",
                        timer: 5000,
                        icon: "error"
                    })

                }
            }else{
                swal({
                    title: "Invalid Credentials",
                    text: "Email/Password cannot be Empty",
                    timer: 5000,
                    icon: "error"
                });
            }

        }
    function validateEmail(email) {
        // let re = /^((?!\.)[\w-_.]*[^.])@cargen\.com$/;
        // return re.test(email);
        return email;
    }
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

