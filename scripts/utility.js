const url = "./partials/proc2.php";

function forgotPassword(){
    let form = $("#name").serialize();
    let email = unescape(form.split("=")[1]);
    $.ajax({
        url: url,
        method : "POST",
        data: {
            "changePassword": {
                email: email
            },
        },
        beforeSend : ()=>{
                $("#spinner").show();
                $("#loading").show();
                $("#forgot_password").attr("disabled", true);
                $("#user_login").attr("disabled", true);
        },
        success : (data)=>{
            console.log("pass data",data)
            let user = JSON.parse(data);
            if(user.message === 200){
                swal({
                    title: "success",
                    text: "A link Has Been Sent To The Email Provided. Please Check Your Email Now.",
                    timer: 20000,
                    icon: "success",
                    allowOutsideClick : false
                })
                setTimeout(()=>{
                    window.location.href = "./login.php";
                },10000);
                
            }else if(user.message === 404){
                    swal({
                        title: "error",
                        text: "Please Make Sure Details Are Correct",
                        timer: 5000,
                        icon: "error"
                    })
            }else{
                swal({
                    title: "error",
                    text: "An Error Has Occured",
                    timer: 5000,
                    icon: "error"
                })
            }
        },
        complete : ()=>{
            $("#spinner").hide();
            $("#loading").hide();
                $("#user_login").attr("disabled", false);
                $("#forgot_password").attr("disabled", false);

        },
        error : (jqXHR)=>{
            console.log(jqXHR);
        }
    })
}

function changePassword(){
    let path = window.location.pathname.split("/");
    if(path){
        let token = window.location.search.split("=")[1];
        let pathLen = path.length;
        let filename = path[pathLen-1];
        if(filename === 'recovery.php'){
            if(token){
                let form = $("#name").serialize().split("&");
                let password = form[0].split("=")[1];
                let repeatPassword = form[1].split("=")[1];
                console.log(password.length);
                if(password.length > 4){
                    if(password === repeatPassword){
                        $.ajax({
                            url : url,
                            method : "POST",
                            data: {
                                "updatePassword": {
                                    token: token,
                                    password : password
                                },
                            },beforeSend : ()=>{
                                $("#spinner").show();
                                $("#loading").show();
                                $("#user_login").attr("disabled", true);
                                $("#repeatPassword").attr("disabled", true);
                            },
                            success : (data)=>{
                                console.log(data);
                                let res = JSON.parse(data);
                                if(res.message === 200){
                                    swal({
                                        title: "success",
                                        text: "Password Successfully Changed.",
                                        timer: 20000,
                                        icon: "success"
                                    })
                                    setTimeout(()=>{
                                        window.location.href = "./login.php";
                                    },10000);
                                }else if (res.message === 501){
                                    swal({
                                        title: "Error",
                                        text: "An Internal Error Occured",
                                        timer: 20000,
                                        icon: "error"
                                    });
                                    setTimeout(()=>{
                                        window.location.href = "./login.php";
                                    },10000);
                                }else{
                                    swal({
                                        title: "Error",
                                        text: "Password Already Changed",
                                        timer: 20000,
                                        icon: "error"
                                    });
                                }
                            },
                            complete : ()=>{    
                                $("#spinner").hide();
                                $("#loading").hide();
                                $("#user_login").attr("disabled", false);
                                $("#repeatPassword").attr("disabled", false);
                            }
                        })
                    }else{
                        // paswords do not match
                        swal({
                            title: "Error",
                            text: "Passowords Do Not Match",
                            timer: 20000,
                            icon: "error"
                        }) 
                    }
                }else{
                    swal({
                        title: "Error",
                        text: "Passoword too short",
                        timer: 20000,
                        icon: "error"
                    }) 
                }  
            }else{
                // erro no token
                window.location.href = "./login.php";
            }
        }
    }
}
