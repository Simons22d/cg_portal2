
<link href="https://fonts.googleapis.com/css?family=Sarabun&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Montserrat:600,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<body>
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
</style>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<div id="container">
    <div class="col-lg-12"><img src="../logo.jpg" id="logo" alt="" class=""></div><p></p><br>
    <div class="col-lg-6 offset-lg-3">
        <div >
            <u><h5 class="offset-lg-3">IT Support System : Issue Page</h5></u><br>
            <kbd>*</kbd> all fields are required
            <p></p>
        </div>
        <form id="userData">
            <div class="form-group">
                <label for="email">Email address * </label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter Work Email">
                <small id="emailHelp" class="form-text text-muted">This Should Be You Work email. Example ... <kbd>john.doe@cargen.com</kbd></small>
            </div>
            <div class="form-group">
                <label for="subject">Issue Subject *</label>
                <input type="email" class="form-control" id="subject" name="subject"aria-describedby="subjectDesc" placeholder="Enter Issue Subject">
            </div>

            <div class='form-group'>
                <label for='issueDescription'>Issue Description  * </label><small id="emailHelp" class="form-text text-muted">A Detailed Explanation Of The Issue.</small>
                <textarea class='form-control col-lg-12' name='issueDescription' id='issueDescription' placeholder="Enter the issue description here"  rows='4'></textarea>
            </div>
            <br>
            <button type="submit" class="btn btn-primary btn-block" id="sendIssue">Send The Issue</button>
            <br>
        </form>
    </div>
</div>
</body>



<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script>

$(()=>{

    $("#sendIssue").on("click",(e)=>{
        e.preventDefault();
        let formData = $("#userData").serialize().split("&");
        let email = unescape(formData[0].split("=")[1]);
        let subject = formData[1].split("=")[1];
        let issueDescription = formData[2].split("=")[1];
        if(email.length > 0 && subject.length > 0 && issueDescription.length > 0){
            if(validateEmail(email)){
            //    send the aja request
                console.log("valid Email and Files Not empty")
            }else{
                swal({
                    title: "Error!",
                    text: "Email Not Allowed. Only cargen.com Email Allowed.",
                    icon: "error",
                    button: "Okay",
                });
            }
        }else{
            swal({
                title: "Error!",
                text: "All Fields Must Be Filled",
                icon: "error",
                button: "Okay",
            });
        }
    });
    function validateEmail(email) {
        let re = /^((?!\.)[\w-_.]*[^.])@cargen\.com$/;
        return re.test(email);
    }
});

</script>