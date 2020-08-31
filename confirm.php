<?php
session_start();
error_reporting(0);
//require the database connection
require_once("./partials/db.php");
//require the header
require_once("./partials/header.php");
// we just need to make aget request for the user issue_id
// what wea sill do get user details the check with the if if was comleted or not
// this link will only be available if the issue has bpt been submitted if the issue has been submitted
// he/she cannot access it
?>
    <style>
        #logo{
            padding-top : 20px;
            display: block;
            margin : 0px auto;
            height:100px;
        }
        #body{
            font-size : 17px;
            font-weight:600;
            color: #555;
        }
        #spinner{
            display : none;
        }
    </style>
<body>

    <div id="container">
        <div class="col-lg-12"><img src="./logo.jpg" id="logo" alt="" class=""></div><p></p><br>
            <div class="row col-lg-12" >
                    <!-- spacing -->
                    <div class="col-lg-4"></div>
                    <!-- display div -->
                    <p></p>
                    <div class="col-lg-5" id="data">
                    <div class="col-lg-1 offset-lg-6" id="spinner"><span class="spinner spinner-bounce-middle"></span></div><br>
                        <u><h5>IT Support System : Confirm Page</h5></u>
                        <h5>Issue Details</h5>
                        <br>
                        <div class="row "><div class="col-lg-4">Issue</div><div class="col-lg-1">:</div><div  id="issue"   class="col-lg-5">Description</div></div>
                        <div class="row "><div class="col-lg-4">Submitted By</div><div class="col-lg-1">:</div><div  id="submittedBy"   class="col-lg-5">Description</div></div>
                        <div class="row "><div class="col-lg-4">Issue Id</div><div class="col-lg-1">:</div><div  id="issueId"   class="col-lg-5">Description</div></div>
    <!--                    <div class="row "><div class="col-lg-4">Solved By</div><div class="col-lg-1">:</div><div  id="solvedBy"   class="col-lg-5">Description</div></div>-->
                        <br>
                        <div class="row "><div class="col-lg-5"><h5>Issue Description</h5></div></div><br>
                        <div class="row "><div class="col-lg-12" id="body">

                        </div

                    </div>
                    <div class='form-group'><br>
                        <label for='recommendation'>Comments (Optional) </label>
                        <h6 class='card-subtitle mb-2 text-muted'>Please Comment For Better Service.</h6>
                        <textarea class='form-control col-lg-12' style=' width :500px'name='recommendation' id='recommendation' rows='4'></textarea>
                    </div>
                    <br>
                    <!-- spacin div -->
                <div class="col-lg-3"></div>
                </div>

                <!-- button div -->
                <!-- we are goingto make ajax request on button click -->
                <p><br></p>
                <div class="row col-lg-12">
                <!-- <div class="col-lg-4"></div> -->
                <div class="col-lg-12 row" id="buttons">
                    <div class="col-lg-6">
                        <button class="btn btn-light btn-block reply" id="0">Issue Not Solved</button>
                    </div>
                    <div class="col-lg-6">
                        <button class="btn btn-primary btn-block reply" id="1">Issue Was Solved</button>
                    </div>
                </div>
                <!-- <div class="col-lg-3"></div> -->
                </div>
            </div>
</body>
<p></p>
<p></p>
<script>
    let path = window.location.pathname.split("/");
    if(path){
        let token = window.location.search.split("=")[1];
        let pathLen = path.length;
        let filename = path[pathLen-1];
        if(filename === 'confirm.php'){
            $.ajax({
                url: "./mail-capture/process.php",
                method: "POST",
                data: {
                    category: "get_to_confirm_issue",
                    token : token
                },
                beforeSend : ()=>{
                    $("#data").hide();
                    $("#buttons").hide();
                },
                success: function (result) {
                    console.log(result);
                    if(result){
                        if(parseInt(result.used) === 0){
                            let issue = $("#issue");
                            let submittedBy = $("#submittedBy");
                            let issueId = $("#issueId");
                            let body = $("#body");

                            issue.html(unescape($.parseHTML(result.email_subject)[0].nodeValue));
                            submittedBy.html(unescape(result.email_from));
                            issueId.html(result.ticket);
                            // solvedBy.html(result.);
                            // let parsedBody = ;
                            body.html($.parseHTML($.parseHTML(result.email_body)[0].nodeValue));
                            $(".reply").on("click",(e)=>{
                                //get the value from the comment
                                let recommendation = $("#recommendation").val();
                                let status = e.target.id;
                                //  get comments
                                $.ajax({
                                    url : "./mail-capture/process.php",
                                    method : "POST",
                                    data : {
                                        category : "close_issue",
                                        token : token,
                                        confirmed : status
                                    },
                                    beforeSend : ()=>{
                                        $("#spinner").show();
                                    },
                                    success : (data)=>{
                                        swal.fire({
                                            type : "success",
                                            title : "Success",
                                            text : "Response successfully Sent.",
                                            timer : 15000000,
                                            allowOutsideClick: false,
                                            showConfirmButton : false
                                        })
                                    },
                                    error : (jqXHR,errorText,errorThrown)=>{
                                        Swal.fire({
                                            type: 'error',
                                            title: 'Error!',
                                            text: 'Sorry, Internal Error Occured!',
                                            timer: 1500000000,
                                            allowOutsideClick: false,
                                            showConfirmButton : false
                                        });
                                    },
                                    complete : ()=>{
                                        setTimeout(() => {
                                            $("#spinner").hide();
                                        }, 3000);
                                    }
                                })
                            });
                        }else{
                            //    link has been used already thus forbidden
                            window.location.href = "http://192.168.12.200:81/confirmed.php";
                            }
                    }else {
                        // thrown error
                        window.location.href = "http://192.168.12.200:81/confirmed.php";
                    }
                },
                error : (jqXHR,errorText,errorThrown)=>{
                    Swal.fire({
                        type: 'error',
                        title: 'Error!',
                        text: 'Sorry, Internal Error Occured!',
                        timer: 1500000000,
                        allowOutsideClick: false,
                        showConfirmButton : false
                    });
                },
                complete : ()=>{
                    $("#data").show();
                    $("#buttons").show();
                }
            });
        }
    }
</script>