<?php
require_once("./partials/header.php");
?>
<style>
    .page{
        margin :  0 auto ;
        display : block;
        text-align: center;
    }
    #logo{
            padding-top : 20px;
            display: block;
            margin : 0px auto;
            height:100px;
        }
</style>
<div class="page">
<div class="col-lg-12"><img src="./logo.jpg" id="logo" alt="" class=""></div><p></p><br>
    <div class="row"></div>
    <br>
    <div class="row col-lg-12">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
            <img src="./images/user_error.png" alt="NotFound" height="100">
        </div>
        <div class="col-lg-4"></div>
    </div>
    <br>
    <div class="row col-lg-12">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
            <h5>ERROR!</h5><br>
            <p>This Issue has Already Been Reviewed Or Token Invalid. <br>
                An issue can only be reviewed once.
            </p>
            <br>
            <span class="btn btn-success" id="toHome">Go To The Portal</span>
        </div>
        <div class="col-lg-1"></div>
    </div>
</div>
<script>
    let btn = document.getElementById("toHome");
    btn.addEventListener("click",(e)=>{
        window.location.href = "http://192.168.12.200";
        console.log("clicked");
    });

</script>