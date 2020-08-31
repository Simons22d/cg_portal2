//checking if the user is logged in
let process = "./mail-capture/process.php";
let proc = "./partials/proc.php";
let proc2 = "./partials/proc2.php";
let htmlSubpath = "./partials/html/";
let link = "192.168.12.200"
const address = "192.168.12.200";
const lnk = "http://192.168.12.200:81/"
// test creds
// let link = "localhost"
// const address = "localhost";
// const lnk = "http://localhost:8080/"

if(!sessionStorage.getItem("user")){
    window.location = "login.php";
}


function resizeImages(){
    /**
     * function that will resize images in the dom for all
     * attachments to a width of 500px and also remove the 
     * attribute
     * @params null
     * @return null
     */
    
    setTimeout(()=>{
        let x = $('#email_body').find("img");
        let index = 0;
        for( index=0; index < x.length; index++ ) { 
            x[index].className = "modingway";
            $(".modingway").removeAttr("height");
            $(".modingway").removeAttr("width");
            $(".modingway").width(650);
        };
    },500);
}

function getUser(handleData){
/**
 * gets user and sets thier data in session
 * @params callback(@param string:JSON)
 */
    $.ajax({
        url: proc,
        method: "POST",
        beforeSend : ()=>{
            $(".wrapper_div").show();
        },
        data: {
            "user_login": true,
        },
        success: function (result) {
            handleData(JSON.parse(sessionStorage.getItem("user")));
        },
        complete : ()=>{
            $(".wrapper_div").hide();
        }
    });
}

// hiding the spinner 
$("#spinner").hide();
var pageData ="";
// adding event listeners for nav items
// grabbing the display section
let display_header = $("#section");
let display = $("#display");
let currentPath = $("#currentPath");
//chart vars
let months = ['January',"February","March","April","May","June","July","August","September","October","November","December"]

let now = new Date();
let thismonth = months[now.getMonth()];
let thisYear = now.getFullYear();
// adding tooltips to the html pages
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
// end tooltip
// function to make ajax : JSON calls
function getJson(data,handleData){
    $.ajax({
        url: process,
        method: "POST",
        data: {
            category: data,
        },
        beforeSend: ()=>{
            $("#spinner").show();
        },
        success: function (result) {
            handleData(result);
        },
        complete : ()=>{
            setTimeout(()=>{ $("#spinner").hide()} ,1000)
        }
    });
}
function getUserInfo(category,data,handleData){
    $.ajax({
        url: process,
        method: "POST",
        data: {
            category: category,
            user_id : data
        },
        beforeSend : ()=>{
            $("#spinner").show();
        },
        success: function (result) {
            handleData(result);
        },
        complete :()=>{
            setTimeout(()=>{ $("#spinner").hide()} ,1000)
        }
    });
}
function getIssues(status,handleData){
    $.ajax({
        url: process,
        method: "POST",
        data: {
            category: "get_user_issues",
            status : status,
            user_id : JSON.parse(sessionStorage.getItem("userLoggedIn")).id
        },
        beforeSend : ()=>{
            $("#spinner").show();
        }
        ,
        success: function (result) {
            handleData(result);
        },
        complete : ()=>{
            setTimeout(()=>{ $("#spinner").hide()} ,1000)
        }
    });
}
// setting user login  details
getUser((userData)=>{
    $("#overview").trigger("click");
    if(userData.userType === 1){
        // admin
        getInfo("get_employees","",(infoData)=> {
            infoData.map((value,index)=>{
                if(userData.user === value.email){
                    sessionStorage.setItem("userLoggedIn",JSON.stringify(value));
                }
            })
        });
    }else{
        // not admin
        $("#new").remove();
        $("#addMember").remove();
        $("#removeMember").remove();
        $("#escalated").remove();
        getInfo("get_employees","",(infoData)=> {
            infoData.map((value,index)=>{
                if(userData.user === value.email){
                    sessionStorage.setItem("userLoggedIn",JSON.stringify(value));
                }
            })
        });
    }
});
// get info
// function to make ajax : JSON calls
function getInfo(category,data,handleData){
     $.ajax({
        url: process,
        method: "POST",
        data: {
            category: category,
            issue_id : data
        },
         beforeSend : ()=>{
             $("#spinner").show();
         },
        success: function (result) {
            handleData(result);
        },
         complete : ()=>{
             setTimeout(()=>{ $("#spinner").hide()} ,1000)
         }
    });
}
// search 
function search(category,query,data,handleData){
    $.ajax({
       url: process,
       method: "POST",
       data: {
        category: category,
        q : query,
        issue_id : data
       },
        beforeSend : ()=>{
            $("#spinner").show();
        },
       success: function (result) {
           handleData(result);
       },
        complete : ()=>{
            setTimeout(()=>{ $("#spinner").hide()} ,1000)
        }
   });
}
// function to make ajax: Text calls
function getData(cat,data,handleData){
    $.ajax({
        url: `./partials/proc.php`,
        method: "POST",
        data: {
            category: cat,
            user_id : data
        },
        success: function (result) {
            handleData(result);
        }
    });
}
// Dealing with the info page 
// getting the info data nad a adding it to the page
function deleteIssue(me) {
    var id = $(me).attr("id");
    // console.log(id)
    getInfo("mark_removed",id,(data)=>{

        $("#new").trigger("click");
        // weer eaare the going to trigger and event for the new requests
    }) 

}
const getChangeIdNotAmdin = (me) =>{
    console.log(">><><><")
    var id = $(me).attr("id");
    $.ajax({
        url :  process,
        method : "POST",
        data : {
            category : "get_single_change",
            change_id : id
        },
        beforeSend : ()=>{
            $("#spinner").show()
        },
        success : (data)=>{

            console.log("workflow >>>",data.workflow_attachments)
            console.log("attachments",data)
            display.load(`${ htmlSubpath }changeInfoNotAdmin.html`,()=>{
                // get vars 
                $("#requestor").html(data.employee);
                $("#department").html(data.department);
                // $("#date").html(data.dateAdded);
                badge_mapper = [
                    "<td  id=\"solution\"><span class=\"badge badge-primary\">Pending</span></td>",
                    "<td  id=\"solution\"><span class=\"badge badge-success\">Approved</span></td>",
                    "<td  id=\"solution\"><span class=\"badge badge-danger\">Rejected</span></td>"
                ]

                $("#approved").html(badge_mapper[data.approved]);
                getJson("get_employees_with_departments_and_tasks_count",(data)=>{
                    data.map((value,index)=>{
                        if(value.employee_id == Number(16)){
                            // console.log(value.employee)
                            $("#assigned").html(value.employee);
                        }
                    })
                })

                $("#description").html(data.description);
                if (data.attachments && data.attachments.length > 0) {
                    let str = ""
                    data.attachments.map((file,index)=>{
                        // console.log(file)
                        str += `<span class="attachment"><a target="_blank" href="./mail-capture/change_attachments/${file.attachment}">${index+1}—${file.attachment}</a></span><br>`
                    })
                    // console.log(str)
                    $("#change_attachments").html(str)
                }else{
                    // replace the text with no attchments
                     $("#change_attachments").html("<small class='text-muted'>Empty</small>")
                }
                 //end of single attachement
                if(data.workflow_attachments && data.workflow_attachments.length >0){
                    let str = ""
                    data.workflow_attachments.map((file,index)=>{
                        console.log("workflow attachments",file)
                        str += `<span class="attachment"><a target="_blank" href="./mail-capture/change_attachments/${file.attachment}">${index+1}—${file.attachment}</a></span><br>`
                    })
                    // console.log(str)
                    $("#workflow_attachments").html(str)
                }else{
                   $("#workflow_attachments").html("<small class='text-muted'>Empty</small>")
                }
                // end of multiple attachment
            });
        },
        error : (error)=>{
            // console.log(error)
        },
        complete : ()=>{
            $("#spinner").hide()
        }
    })
}

function getChangeId(me) {
    print
    var id = $(me).attr("id");
    $.ajax({
        url :  process,
        method : "POST",
        data : {
            category : "get_single_change",
            change_id : id
        },
        beforeSend : ()=>{
            $("#spinner").show()
        },
        success : (data)=>{
            console.log(">>>>>>",data)
            // console.log("single issue data.....",data)
            display.load(`${ htmlSubpath }changeInfo.html`,()=>{
                if (data.attachments && data.attachments.length > 0) {
                    let str = ""
                    data.attachments.map((file,index)=>{
                        // console.log(file)
                        str += `<span class="attachment"><a target="_blank" href="./mail-capture/change_attachments/${file.attachment}">${index+1}—${file.attachment}</a></span><br>`
                    })
                    // console.log(str)
                    $("#change_attachments").html(str)
                }else{
                    // replace the text with no attchments
                     $("#change_attachments").html("<small class='text-muted'>Empty</small>")
                }
                 //end of single attachement
                if(data.workflow_attachments && data.workflow_attachments.length >0){
                    let str = ""
                    data.attachments.map((file,index)=>{
                        // console.log(file)
                        str += `<span class="attachment"><a target="_blank" href="./mail-capture/change_attachments/${file.attachment}">${index+1}—${file.attachment}</a></span><br>`
                    })
                    // console.log(str)
                    $("#workflow_attachments").html(str)
                }else{
                   $("#workflow_attachments").html("<small class='text-muted'>Empty</small>")
                }
                // end of multiple attachment


                let approved = data.approved ? "Approved" : "Not Approved";
                // console.log("this issues data",data)
                // get vars 
                $("#requestor").html(data.employee);
                $("#department").html(data.gdepartment);
                $("#date").html(data.dateAdded);
                $("#approved").html(approved);
                $("#title").html(data.title);
                $("#description").html(data.description);

                let roles = ["SAP","Software","Hardware"];

            getInfo("get_employees","",(data)=>{
                let selectHandle = $("#employee");
                data.map( (value,index) =>{
                    let userLoggedIn = JSON.parse(sessionStorage.getItem("userLoggedIn"));
                    let thisRole = roles[value.role];
                    if(userLoggedIn.email === value.email){
                        selectHandle.append(` <option id=${value.id} value="${value.id}">Myself ( ${unescape(value.name)} )</option>`);
                    }else{
                        selectHandle.append(` <option id=${value.id} value="${value.id}"> ${unescape(value.name)} • ${thisRole}</option>`);
                    }
                })
            });

            $("#assignIssue").on("click",()=>{
                // console.log("Assigned");
                let change_id = id ;
                let assigned_to = $("#employee").val();
                let approved = 1;
                let duration = 3600*24;
                if(assigned_to !== "null"){
                    $.ajax({
                        url: process,
                        method : "POST",
                        data : {
                            category : "approve_change",
                            change_id : change_id,
                            assigned_to : assigned_to,
                            approved : approved,
                            duration : duration
                        },
                        beforeSend : ()=>{
                            $("#spinner").show();
                        },
                        success : (data)=>{
                            // console.log(data)
                            $("#change").trigger("click");
                        },
                        error : (error)=>{
                            // console.log(error)
                        },
                        complete : ()=>{
                            $("#spinner").hide();
                        }
                    })
                }else{
                    // console.log("make sure that field is not empty")
                }
            })
            $("#cancel").on("click",()=>{
                // console.log("rejected");
                let change_id = id ;
                let assigned_to = $("#employee").val();
                let approved = 2;
                let duration = 3600*24;
                $.ajax({
                    url : process,
                    method : "POST",
                    data : {
                        category : "approve_change",
                        change_id : change_id,
                        assigned_to : assigned_to,
                        approved : approved,
                        duration : duration
                    },
                    beforeSend : ()=>{
                        $("#spinner").show();
                    },
                    success : (data)=>{
                        // console.log(data)
                        $("#change").trigger("click");
                    },
                    error : (error)=>{
                        // console.log(error)
                    },
                    complete : ()=>{
                        $("#spinner").hide();
                    }
                })
            })
            });
        },
        error : (error)=>{
            // console.log(error)
        },
        complete : ()=>{
            $("#spinner").hide()
        }
    })

}
// Dealing with the info page 
// getting the info data nad a adding it to the page
function getId(me) {
    var id = $(me).attr("id");
    getInfo("get_single_issue",id,(pageData)=>{
        $("#currentPath").append(` / ${pageData.ticket}`);
        // here we have access to the data that we got from the ajax call
        display.load(`${ htmlSubpath }info.html`,(data)=>{
            // hiding the button
            $("#countdown").hide();
            // formate page data
            let issue = pageData.email_subject;
            let from = pageData.email_from;
            let issueId = pageData.ticket;
            let date = pageData.dateAdded;
            let body = pageData.email_body;
            const id = parseInt(pageData.id);
            //get the info id
            // get from the db if the task has been escaleted
            // if escaled // show __else__ hide
            let escalated = $("#escalated");
            // successfully loaded data
            if(data){   
                $("#issue").html(issue);
                $("#from").html(from);
                $("#issueId").html(issueId).attr("id","thisIssueID").attr("value",id);
                $("#date").html(date);
                if($(".clicked").attr("id") === "escalated"){
                    getInfo("track_issue",id,(trackData)=>{
                        let statusName = ["New","Assigned","Resolved","Closed"]
                        let priority = ["","Low","Meduim","High"]
                        $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-2">Status</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${statusName[pageData.status]}</div></div>`);
                        $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-2">Escalated</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${unescape(trackData[0].user)}</div></div>`);
                        $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-2">Priority</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${priority[pageData.priority]}</div></div>`);
                    })
                }
                let thisBody = pageData.email_body;
                // check if after a split there is still html index [1]
                // loading the html body
                let isHTML = thisBody.split(".")[1]
                if(isHTML === "html"){
                    $("#email_body").load(`/email/mails/${thisBody}`);
                }else{
                    $("#email_body").html(thisBody);
                } 
                
                let attachmentsHandle = $("#attachments");
                // get attachments
                getInfo("get_issue_attachments",id,(attachments)=>{
                    // assuming the body has already been loaded
                    resizeImages();
                    if(attachments.length>0){
                        attachmentsHandle.append(`<button type="button" class="btn btn-sm btn-primary">Attachments <span class="badge badge-light">${attachments.length}</span></button><hr>`);
                        index= 1;
                        attachments.map((attachment,key)=>{
                            let link = `<div><a href="/email/files/${attachment.attachment}" class="attachment" target="_blank">${index} — ${attachment.attachment}</a></div>`
                            attachmentsHandle.append(link);
                            index++;
                        });
                    }else{
                        attachmentsHandle.remove();
                    }
                })
            }
            let roles = ["SAP","Software","Hardware"];

            getInfo("get_employees","",(data)=>{
                let selectHandle = $("#employee");
                data.map( (value,index) =>{
                    let userLoggedIn = JSON.parse(sessionStorage.getItem("userLoggedIn"));
                    let thisRole = roles[value.role];
                    if(userLoggedIn.email === value.email){
                        selectHandle.append(` <option id=${value.id} value="${value.id}">Myself ( ${unescape(value.name)} )</option>`);
                    }else{
                        selectHandle.append(` <option id=${value.id} value="${value.id}"> ${unescape(value.name)} • ${thisRole}</option>`);
                    }
                })
            });

            getInfo("get_departments","",(data)=>{
                let selectHandle = $("#issueType");
                data.map( (value,index) =>{
                    selectHandle.append(` <option id=${value.id} value="${value.id}"> ${value.name} </option>`);
                })
            });

            $("#cancel").click(()=>{
                $("#spinner").show()
                $("#new").trigger("click");
                $("#spinner").hide();
            });
            // after loading data to the page we are are going to show detect the post data for the form
            $("#assignIssue").click(()=>{
                let issueData = $("#issueHandle").serialize();
                let lvlOneData = issueData.split("&");
                //user data
                let employee = lvlOneData[0].split("=")[1];
                let priority = lvlOneData[1].split("=")[1];
                let issueType = lvlOneData[2].split("=")[1];
                let duration = 3600*24;
                let userLoggedIn = JSON.parse(sessionStorage.getItem("user")).userId;
                let issueId =$("#thisIssueID").attr("value");
            //    db call
                $.ajax({
                    url : process,
                    method : "POST",
                    data : {
                        category : "manage_issue" ,
                        expires_in : duration ,
                        issue_id : issueId ,
                        category_id : issueType,
                        priority : priority ,
                        assigned_to : employee,
                        assigned_by : userLoggedIn
                    },
                    beforeSend : ()=>{
                       $("#spinner").show();
                       display.html("<div class=\"col-lg-1\" id=\"spinner\"><span class=\"spinner spinner-bounce-middle\"></span></div>\n");
                        // should show a loadsing page 
                    },
                    success : (data)=>{
                            Swal.fire({
                                type: 'success',
                                title: 'Success!',
                                text: 'Assignment Success!',
                                timer: 15000
                            });
                        $( "#new" ).trigger( "click" );
                    },
                    error : (jqXHR,error, errorThrown)=>{
                            Swal.fire({
                                type: 'error',
                                title: 'Error!',
                                text: 'Make Sure All Details Are Correctly Entered!',
                                timer: 15000
                             });
                    },
                    complete : ()=>{
                        $("#spinner").hide();
                    }
                });

            })
        })
    });
}

function getEscalated(me) {
    var id = $(me).attr("id");
    getInfo("get_single_issue",id,(pageData)=>{
        $("#currentPath").append(` / ${pageData.ticket}`);
        // here we have access to the data that we got from the ajax call
        display.load(`${ htmlSubpath }info_ecs.html`,(data)=>{
            // hiding the button
            $("#countdown").hide();
            // formate page data
            let issue = pageData.email_subject;
            let from = pageData.email_from;
            let issueId = pageData.ticket;
            let date = pageData.dateAdded;
            let body = pageData.email_body;
            let id = pageData.id;
            //get the info id
            // get from the db if the task has been escaleted
            // if escaled // show __else__ hide
            let escalated = $("#escalated");
            // successfully loaded data
            if(data){
                $("#issue").html(issue);
                $("#from").html(from);
                $("#issueId").html(issueId).attr("id","thisIssueID").attr("value",id);
                $("#date").html(date);
                if($(".clicked").attr("id") === "escalated"){
                    getInfo("track_issue",id,(trackData)=>{
                        let statusName = ["New","Assigned","Resolved","Closed"]
                        let priority = ["","Low","Meduim","High"]
                        $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-2">Status</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${statusName[pageData.status]}</div></div>`);
                        $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-2">Escalated</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${unescape(trackData[0].user)}</div></div>`);
                        $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-2">Priority</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${priority[pageData.priority]}</div></div>`);
                    })
                }
                let thisBody = pageData.email_body;
                // check if after a split there is still html index [1]
                // loading the html body
                let isHTML = thisBody.split(".")[1]
                if(isHTML === "html"){
                    $("#body").load(`/email/mails/${thisBody}`);
                }else{
                    $("#body").html(thisBody);
                } 
                
                let attachmentsHandle = $("#attachments");
                // get attachments
                getInfo("get_issue_attachments",id,(attachments)=>{
                    // resizing images
                    resizeImages();
                    if(attachments.length>0){
                        attachmentsHandle.append(`<div class='attachment_count btn btn-sm btn-info'>${attachments.length} Attachments</div>`);
                        index= 1;
                        attachments.map((attachment,key)=>{
                            let link = `<div><a href="/email/files/${attachment.attachment}" class="attachment" target="_blank">${index} — ${attachment.attachment}</a></div>`
                            attachmentsHandle.append(link);
                            index++;
                        });
                    }else{
                        attachmentsHandle.remove();
                    }
                })
                        // end attachments
            }
            let roles = ["SAP","Software","Hardware"];

            getInfo("get_employees","",(data)=>{
                let selectHandle = $("#employee");
                data.map( (value,index) =>{
                    let userLoggedIn = JSON.parse(sessionStorage.getItem("userLoggedIn"));
                    let thisRole = roles[value.role];
                    if(userLoggedIn.email === value.email){
                        selectHandle.append(` <option id=${value.id} value="${value.id}">Myself ( ${unescape(value.name)} )</option>`);
                    }else{
                        selectHandle.append(` <option id=${value.id} value="${value.id}"> ${unescape(value.name)} • ${thisRole}</option>`);
                    }
                })
            });

            getInfo("get_departments","",(data)=>{
                let selectHandle = $("#issueType");
                data.map( (value,index) =>{
                    selectHandle.append(` <option id=${value.id} value="${value.id}"> ${value.name} </option>`);
                })
            });
            $("#cancel").click(()=>{
                $("#spinner").show()
                $("#escalated").trigger("click");
                $("#spinner").hide();
            });
            // after loading data to the page we are are going to show detect the post data for the form
            $("#reassignIssue").click(()=>{
                let issueData = $("#issueHandle").serialize();
                let lvlOneData = issueData.split("&");

                //user data
                let employee = lvlOneData[0].split("=")[1];

                let duration = 30*60;
                let issueId =$("#thisIssueID").attr("value");
            //    db call
                $.ajax({
                    url : process,
                    method : "POST",
                    data : {
                        category : "reassign_issue" ,
                        issue_id : issueId ,
                        reassigned_to : employee,
                        assigned_by : JSON.parse(sessionStorage.getItem("userLoggedIn")).id
                    },
                    beforeSend : ()=>{
                       $("#spinner").show();
                       display.append("<div id='load'></div>");
                       $("#load").html("<div class=\"col-lg-1\" id=\"spinner\"><span class=\"spinner spinner-bounce-middle\"></span></div>\n");
                       display.hide();
                    },
                    success : (data)=>{
                            Swal.fire({
                                type: 'success',
                                title: 'Success!',
                                text: 'Assignment Success!',
                                timer: 15000
                            });
                        $( "#new" ).trigger( "click" );
                    },
                    error : (jqXHR,error, errorThrown)=>{
                            Swal.fire({
                                type: 'error',
                                title: 'Error!',
                                text: 'Make Sure All Details Are Correctly Entered!',
                                timer: 15000
                             });
                    },
                    complete : ()=>{
                        $("#spinner").hide();
                        $("#load").hide();
                        display.show();
                    }
                });

            })
        })
    });
}
let thisUser;
// select get user issues on the info page 
function getUserIssues(item){
    thisUser =  item.value;
    $.ajax({
        url: process,
        method: "POST",
        data: {
            category: "get_user_issues",
            status : 1,
            user_id : thisUser
        },
        beforeSend : ()=>{
            $("#spinner").show();
        },
        success: function (result) {
            sessionStorage.setItem("userTo",JSON.stringify(result))
            $("#countdown").show();
            $("#countdown").html(`${result.length} Pending Tasks`);
        },
        complete : ()=>{
            setTimeout(()=>{ $("#spinner").hide()} ,1000)
        }
    });
}
function getEscalationInfo(){
    let issueId = $("#thisIssueID").attr("value");
    if(issueId){
    //    we have an id thus load a file
        display.load(`${ htmlSubpath }trackEscalaton.html`,()=>{
        })
    }
}
function manageIssue(me){
    let thisId = me.id;
    if(thisId === "resolve"){
        $("#spinner").show();
        display.load(`${ htmlSubpath }resolve.html`,()=>{
            $("#currentPath").append(` / Resolve Issue`);
            if(globalPageData){
                //    not empty
                let issue = globalPageData.email_subject;
                let from = globalPageData.email_from;
                let ticket = globalPageData.ticket;
                let date = globalPageData.dateAdded;
                let issueId = globalPageData.id;
                let assign = globalPageData.dateUpdated;

                // //adding to the DOM
                $("#issue").html(issue);
                $("#from").html(from);
                $("#issueId").html(ticket).attr("id",ticket).attr("value",issueId);
                $("#date").html(date);
                $("#assigned").html(assign);
            }
            // adding the issues 
        });
    }else if(thisId === "escalete"){
        $("#currentPath").append(` / Escalate Issue`);
        // !
        //    call manage issue
        // but we are going to need to email the user to with the link
        display.load(`${ htmlSubpath }escalate.html`,()=>{
            if(globalPageData){
                //    not empty
                let issue = globalPageData.email_subject;
                let from = globalPageData.email_from;
                let issueId = globalPageData.ticket;
                let date = globalPageData.dateAdded;
                let id = globalPageData.id;
                let assign = globalPageData.dateUpdated;

                //adding to the DOM
                $("#issue").html(issue);
                $("#from").html(from);
                $("#issueId").html(issueId).attr("id","thisIssueID").attr("value",id);
                $("#date").html(date);
                $("#assigned").html(assign);
                
                // resolve
                $("#escalate").on("click",(e)=>{
                    let formData = $("#escalationForm").serialize();
                    let reason = formData.split("=")[1];
                    let thisUser = JSON.parse(sessionStorage.getItem("userLoggedIn")).id;
                    let issueId = globalPageData.id;

                    if(reason.length > 10){
                    //    valid reason
                    $.ajax({
                        url : process,
                        method : "POST",
                        data : {
                            category :  "request_escalation",
                            issue_id : issueId,
                            escalator_id : thisUser,
                            reason : unescape(reason)
                        },
                        beforeSend :()=>{
                            $("#spinner").show();
                            display.html("<div class=\"col-lg-1\" id=\"spinner\"><span class=\"spinner spinner-bounce-middle\"></span></div>\n")
                        },
                        success : (result)=>{
                            Swal.fire({
                                type: 'success',
                                title: 'Success!',
                                text: 'Issue Escalated SuccessFully!',
                                timer: 5000
                            });
                            $("#pending").trigger("click");
                        },
                        complete : ()=>{
                            setTimeout(()=>{ $("#spinner").hide()} ,1000)
                        },
                        error : (jqXHR,textStatus,errorThrown) => {
                            let userName = JSON.parse(sessionStorage.getItem("userLoggedIn")).name.split(" ")[0]
                            Swal.fire({
                                type: 'error',
                                title: "Escalate Error!",
                                text: "Sorry "+userName+", Issue Already Escalated!",
                                timer: 500000,
                                allowOutsideClick: false,
                            });
                        }
                    });
                    }else{
                    //    not valid reason
                        swal.fire({
                            type : "error",
                            title : "Data Error",
                            text : "Please make Sure That All Fields Are Properly Filled. They Should Have More Than Ten Characaters.",
                            timer : 50000,
                            allowOutsideClick : false
                        })
                    }

                })
            }
        });
    }
}
function resolvedIssue(me){
    let id = me.id;
    getInfo("get_single_issue",id,(data)=>{
        display.load(`${ htmlSubpath }infoResolved.html`,()=>{
            $("#escalated").remove();
            $(".card-body").html("");
            let issue = data.email_subject;
            let from = data.email_from;
            let issueId = data.ticket;
            let date = data.dateAdded;
            let body = data.email_body;
            let id = data.id;
            
            $(()=>{
                if(data){
                    
                    $("#issue").html(issue);
                    $("#from").html(from);
                    $("#issueId").html(issueId).attr("id","thisIssueID").attr("value",id);
                    $("#date").html(date);
                    
                    let thisBody = $("<div/>").html(body).text();
                    $("#body").html(thisBody);
                }
                
            });
        })
    })
}
let globalPageData = "";
//get getIssueInfo
function getIssueInfo(me){
    let id = $(me).attr("id");
    // gettig issue info
    getInfo("track_issue",id,(data)=>{
        let issuesData = data;
        let value = parseInt($(me).attr("value"));
        getInfo("get_single_issue",id,(pageData)=>{
            globalPageData = pageData;
            //update page path
            $("#currentPath").append(` / ${pageData.ticket}`);
            // here we have access to the data that we got from the ajax call
            display.load(`${ htmlSubpath }infoNotAdmin.html`,(data)=>{
                let user = JSON.parse(sessionStorage.getItem("userLoggedIn"));
                if(user){
                    let userId  = parseInt(user.id);
                }
                // remove the side bar card
                // formate page data
                /*Solving the issue with the overdues and stuff */
                let deadline = new Date(pageData.deadline)/1000;
                // let assigned  = new Date(pageData.dateUpdated)/1000;
                let now = Math.floor(Date.now() / 1000);
                let slack = deadline - now;
                $("#notOverDue").remove();
                // $("#card").hide();
                if(value === 1001){
                    let userAssigned;
                    thisIssueData.forEach((value)=>{
                        userAssigned = value.user;
                    })
                    // not admin issues
                    let card = $("#notAdminBody");
                    card.remove();
                    card.html("task Escalation goes here.")
                    $(".buttons").remove();
                    $("#overDue").remove()
                    $("#notOverDue").remove();
                    let statusName = ["New","Assigned","Resolved","Closed"]
                    let priority = ["","Low","Meduim","High"]
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Status</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${statusName[pageData.status]}</div></div>`);
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Priority</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${priority[pageData.priority]}</div></div>`);
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Assigned To</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${unescape(userAssigned)}</div></div>`);
                }else{
                    $("#userInfo").remove();
                    // else admin issues
                    // here we should curate user issues;
                }
                // giving 30 for every issue
                let dueTime = now - deadline;
                if(slack>=1){
                    // not over due
                    let duration = Math.floor(slack/60);
                    $("button#overDue").hide();
                    if(duration >= 60){
                        let hours = parseInt(duration/60);
                        let minutes = duration%60;
                        badgeText = ``;
                        $("span#duration").html(`${hours} Hours : ${minutes} Minutes Left Minutes For Completion`);
                    }else{
                        $("span#duration").html(duration+" Minutes Left For Completion");
                    }
                }else{
                    //over due
                    let duration = Math.floor(dueTime/60);
                    $("button#notOverDue").hide();
                    $("button#overDue").show();
                }

                let issue = pageData.email_subject;
                let from = pageData.email_from;
                let issueId = pageData.ticket;
                let date = pageData.dateAdded;
                let body = pageData.email_body;
                let id = pageData.id;
                let assign = pageData.dateUpdated;

                // successfully loaded data
                if(data){
                    $("#issue").html(issue);
                    $("#from").html(from);
                    $("#issueId").html(issueId).attr("id","thisIssueID").attr("value",id);
                    $("#date").html(date);
                    $("#assigned").html(assign);
                    // $("#body").load(`/email/mails/${body}`);
                }
                let thisBody = pageData.email_body;
                // check if after a split there is still html index [1]
                // loading the html body
                let isHTML = thisBody.split(".")[1]
                if(isHTML === "html"){
                    $("#body").load(`/email/mails/${thisBody}`);
                }else{
                    $("#body").html(thisBody);
                } 
                
                let attachmentsHandle = $("#attachments");
                // get attachments
                getInfo("get_issue_attachments",id,(attachments)=>{
                    resizeImages();
                    if(attachments.length>0){
                        attachmentsHandle.append(`<div class='attachment_count btn btn-sm btn-info'>${attachments.length} Attachments</div>`);
                        index= 1;
                        attachments.map((attachment,key)=>{
                            let link = `<div><a href="/email/files/${attachment.attachment}" class="attachment" target="_blank">${index} — ${attachment.attachment}</a></div>`
                            attachmentsHandle.append(link);
                            index++;
                        });
                    }else{
                        attachmentsHandle.remove();
                    }
                })
                // end attachment


                $("#reassignIssue").click(()=>{
                    // console.log(JSON.parse(sessionStorage.getItem("userTo"))[0].id)
                    let duration = 30*60;
                    let issueId =$("#thisIssueID").attr("value");
                    //    db call
                    $.ajax({
                        url : process,
                        method : "POST",
                        data : {
                            category : "forward_issue" ,
                            issue_id : issueId ,
                            assign_to : Number($("#employee").val())
                        },
                        beforeSend : ()=>{
                           $("#spinner").show();
                           display.append("<div id='load'></div>");
                           $("#load").html("<div class=\"col-lg-1\" id=\"spinner\"><span class=\"spinner spinner-bounce-middle\"></span></div>\n");
                           display.hide();
                        },
                        success : (data)=>{
                                Swal.fire({
                                    type: 'success',
                                    title: 'Success!',
                                    text: 'Assignment Success!',
                                    timer: 15000
                                });
                            $( "#new" ).trigger( "click" );
                        },
                        error : (jqXHR,error, errorThrown)=>{
                                Swal.fire({
                                    type: 'error',
                                    title: 'Error!',
                                    text: 'Make Sure All Details Are Correctly Entered!',
                                    timer: 15000
                                 });
                        },
                        complete : ()=>{
                            $("#spinner").hide();
                            $("#load").hide();
                            display.show();
                        }
                    });
    
                })


                
            });
        });
    });


    // new info 

    let roles = ["SAP","Software","Hardware"];

    setTimeout(()=>{
        getInfo("get_employees","",(data)=>{
            console.log(data)
            let selectHandle = $("#employee");
            data.map( (value,index) =>{
                let userLoggedIn = JSON.parse(sessionStorage.getItem("userLoggedIn"));
                let thisRole = roles[value.role];
                if(userLoggedIn.email === value.email){
                    selectHandle.append(` <option id=${value.id} value="${value.id}">Myself ( ${unescape(value.name)} )</option>`);
                }else{
                    selectHandle.append(` <option id=${value.id} value="${value.id}"> ${unescape(value.name)} • ${thisRole}</option>`);
                }
            })
        });
    },500)

    getInfo("get_departments","",(data)=>{
        let selectHandle = $("#issueType");
        data.map( (value,index) =>{
            selectHandle.append(` <option id=${value.id} value="${value.id}"> ${value.name} </option>`);
        })
    });

    $("#cancel").click(()=>{
        $("#spinner").show()
        $("#new").trigger("click");
        $("#spinner").hide();
    });
    // after loading data to the page we are are going to show detect the post data for the form
    $("#assignIssue").click(()=>{
        let issueData = $("#issueHandle").serialize();
        let lvlOneData = issueData.split("&");
        //user data
        let employee = lvlOneData[0].split("=")[1];
        let priority = lvlOneData[1].split("=")[1];
        let issueType = lvlOneData[2].split("=")[1];
        let duration = 3600*24;
        let userLoggedIn = JSON.parse(sessionStorage.getItem("user")).userId;
        let issueId =$("#thisIssueID").attr("value");
    //    db call
        $.ajax({
            url : process,
            method : "POST",
            data : {
                category : "manage_issue" ,
                expires_in : duration ,
                issue_id : issueId ,
                category_id : issueType,
                priority : priority ,
                assigned_to : employee,
                assigned_by : userLoggedIn
            },
            beforeSend : ()=>{
               $("#spinner").show();
               display.html("<div class=\"col-lg-1\" id=\"spinner\"><span class=\"spinner spinner-bounce-middle\"></span></div>\n");
                // should show a loadsing page 
            },
            success : (data)=>{
                    Swal.fire({
                        type: 'success',
                        title: 'Success!',
                        text: 'Assignment Success!',
                        timer: 15000
                    });
                $( "#new" ).trigger( "click" );
            },
            error : (jqXHR,error, errorThrown)=>{
                    Swal.fire({
                        type: 'error',
                        title: 'Error!',
                        text: 'Make Sure All Details Are Correctly Entered!',
                        timer: 15000
                     });
            },
            complete : ()=>{
                $("#spinner").hide();
            }
        });

    })
    // get new info more
}
function getIssueInfoOthers(me){
    let id = $(me).attr("id");
    // gettig issue info
    getInfo("track_issue",id,(data)=>{
        let issuesData = data;
        let value = parseInt($(me).attr("value"));
        getInfo("get_single_issue",id,(pageData)=>{
            globalPageData = pageData;
            //update page path
            $("#currentPath").append(` / ${pageData.ticket}`);
            // here we have access to the data that we got from the ajax call
            display.load(`${ htmlSubpath }infoNotAdminOthers.html`,(data)=>{
                let user = JSON.parse(sessionStorage.getItem("userLoggedIn"));
                if(user){
                    let userId  = parseInt(user.id);
                }
                // remove the side bar card
                // formate page data
                /*SOlving the issue with the overdues and stuff */
                let deadline = new Date(pageData.deadline)/1000;
                // let assigned  = new Date(pageData.dateUpdated)/1000;
                let now = Math.floor(Date.now() / 1000);
                let slack = deadline - now;
                $("#notOverDue").remove();
                // $("#card").hide();

                if(value === 1001){
                    let userAssigned;
                    thisIssueData.forEach((value)=>{
                        userAssigned = value.user;
                    })
                    // not admin issues
                    let card = $("#notAdminBody");
                    card.remove();
                    card.html("task Escalation goes here.")
                    $(".buttons").remove();
                    $("#overDue").remove()
                    $("#notOverDue").remove();
                    let statusName = ["New","Assigned","Resolved","Closed"]
                    let priority = ["","Low","Meduim","High"]
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Status</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${statusName[pageData.status]}</div></div>`);
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Priority</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${priority[pageData.priority]}</div></div>`);
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Assigned To</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${unescape(userAssigned)}</div></div>`);
                }else{
                    $("#userInfo").remove();
                    // else admin issues
                    // here we should curate user issues;
                }
                // giving 30 for every issue
                let dueTime = now - deadline;
                if(slack>=1){
                    //not over due
                
                    let duration = Math.floor(slack/60);
                    $("button#overDue").hide();
                    if(duration >= 60){
                        let hours = parseInt(duration/60);
                        let minutes = duration%60;
                        badgeText = ``;
                        $("span#duration").html(`${hours} Hours : ${minutes} Minutes Left Minutes For Completion`);
                    }else{
                        $("span#duration").html(duration+" Minutes Left For Completion");
                    }
                }else{
                    //over due
                    let duration = Math.floor(dueTime/60);
                    $("button#notOverDue").hide();
                    $("button#overDue").show();
                }
                let issue = pageData.email_subject;
                let from = pageData.email_from;
                let issueId = pageData.ticket;
                let date = pageData.dateAdded;
                let body = pageData.email_body;
                let id = pageData.id;
                let assign = pageData.dateUpdated;

                // successfully loaded data
                if(data){
                    $("#issue").html(issue);
                    $("#from").html(from);
                    $("#issueId").html(issueId).attr("id","thisIssueID").attr("value",id);
                    $("#date").html(date);
                    $("#assigned").html(assign);
                    // $("#body").load(`/email/mails/${body}`);
                }
                let thisBody = pageData.email_body;
                // check if after a split there is still html index [1]
                // loading the html body
                let isHTML = thisBody.split(".")[1]
                if(isHTML === "html"){
                    $("#body").load(`/email/mails/${thisBody}`);
                }else{
                    $("#body").html(thisBody);
                } 
                
                let attachmentsHandle = $("#attachments");
                // get attachments
                getInfo("get_issue_attachments",id,(attachments)=>{
                    resizeImages();
                    if(attachments.length>0){
                        attachmentsHandle.append(`<div class='attachment_count btn btn-sm btn-info'>${attachments.length} Attachments</div>`);
                        index= 1;
                        attachments.map((attachment,key)=>{
                            let link = `<div><a href="/email/files/${attachment.attachment}" class="attachment" target="_blank">${index} — ${attachment.attachment}</a></div>`
                            attachmentsHandle.append(link);
                            index++;
                        });
                    }else{
                        attachmentsHandle.remove();
                    }
                })
                // end attachment
            });
        });
    });
}
function getResolvedInfo(me){
    let id = $(me).attr("id");
    let thisIssueData="";
    // getting issue info
    getInfo("track_issue",id,(data)=>{
        thisIssueData = data;
        //  we need to get the user id
    });
    let value = parseInt($(me).attr("value"));
        getInfo("get_single_issue",id,(pageData)=>{
            globalPageData = pageData;
            
            $("#currentPath").append(`/ ${pageData.ticket}`);
            // here we have access to the data that we got from the ajax call
            display.load(`${ htmlSubpath }resolved.html`,(data)=>{
                // not admin issues
                if($(".clicked").attr("id") === "closed"){
                    $("#notOverDue").remove();
                    $("#overDue").remove();
                }
                let card = $("#notAdminBody");
                card.remove();
                $(".buttons").remove();
                //coming soon button
                $("#moreInfo").click(()=>{
                    swal.fire({
                        type : "info",
                        title : "comming Soon",
                        text : "This Feature Is Coming Soon",
                        timer : 5000
                    });
                })
                // remove the side bar card
                // formate page data
                /*SOlving the issue with the overdues and stuff */
                let deadline = new Date(pageData.deadline)/1000;
                // let assigned  = new Date(pageData.dateUpdated)/1000;
                let now = Math.floor(Date.now() / 1000);
                let slack = deadline - now;
                let thisIssueId = pageData.id;

                
                // if(value === 1001){
                    let userAssigned='';

                    thisIssueData.forEach((value)=>{
                        userAssigned = value.user;
                    })
                    let statusName = ["New","Assigned","Resolved","Closed"]
                    let priority = ["","Low","Meduim","High"]
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Status</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${statusName[pageData.status]}</div></div>`);
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Priority</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${priority[pageData.priority]}</div></div>`);
                    $("#issueInfo").append(`<div class="infoSpace row"><div class="infoHeads col-lg-3">Assigned To</div><div class="col-lg-1">:</div><div id="status"  class="col-lg-8">${unescape(userAssigned)}</div></div>`);

                // giving 30 for every issue
                let dueTime = now - deadline;
                if(slack>=1){
                    //not over due
                    let duration = Math.floor(slack/60);
                    $("button#overDue").hide();
                    if(duration >= 60){
                        let hours = parseInt(duration/60);
                        let minutes = duration%60;
                        badgeText = ``;
                        $("span#duration").html(`${hours} Hours : ${minutes} Minutes Left Minutes For Completion`);
                    }else{
                        $("span#duration").html(duration+" Minutes Left For Completion");
                    }

                }else{
                    //over due
                    let duration = Math.floor(dueTime/60);
                    $("button#notOverDue").hide();
                    $("button#overDue").show();
                }

                let issue = pageData.email_subject;
                let from = pageData.email_from;
                let issueId = pageData.ticket;
                let date = pageData.dateAdded;
                let body = pageData.email_body;
                let id = pageData.id;
                let assign = pageData.dateUpdated;
                // successfully loaded data
                if(data){
                    $("#issue").html(issue);
                    $("#from").html(from);
                    $("#issueId").html(issueId).attr("id","thisIssueID").attr("value",id);
                    $("#date").html(date);
                    $("#assigned").html(assign);

                    let thisBody = pageData.email_body;
                        // check if after a split there is still html index [1]
                        // loading the html body
                        let isHTML = thisBody.split(".")[1]
                        if(isHTML === "html"){
                            $("#body").load(`/email/mails/${thisBody}`);
                        }else{
                            $("#body").html(thisBody);
                        } 
                        
                        let attachmentsHandle = $("#attachments");
                        // get attachments
                        getInfo("get_issue_attachments",id,(attachments)=>{
                            // resizing attachment images
                            resizeImages();
                            if(attachments.length>0){
                                attachmentsHandle.append(`<div class='attachment_count btn btn-sm btn-info'>${attachments.length} Attachments</div>`);
                                index= 1;
                                attachments.map((attachment,key)=>{
                                    let link = `<div><a href="/email/files/${attachment.attachment}" class="attachment" target="_blank">${index} — ${attachment.attachment}</a></div>`
                                    attachmentsHandle.append(link);
                                    index++;
                                });
                            }else{
                                attachmentsHandle.remove();
                            }
                        })
                    let sol =  unescape(pageData.solution);
                    let prob = unescape(pageData.problem);
                    let reco = unescape(pageData.recommendation)
                        // end attachments
                    // adding the solution and the other user details
                    $("#problem").html(prob);
                    $("#sol").html(sol);
                    $("#reco").html(reco);

                    
                    // adding the user details count 
                    // gett the current user    
                    let userLoggedIn = JSON.parse(sessionStorage.getItem("user"));
                    getUserInfo("get_user_issues_count",userLoggedIn.userId, (userIssuesCount)=>{
                        $("#pending_info").append(userIssuesCount.assigned);                            
                        $("#resolved_info").append(userIssuesCount.resolved);
                        $("#reassigned-info").append(userIssuesCount.reassigned);
                        $("#closed_info").append(userIssuesCount.closed);
                    })
                    
                }
            });
        });
}
function manageUser(me){
    let thisId = me.id;
    getJson("get_employees_with_departments_and_tasks_count",(data)=>{
        data.map((employee)=>{
            if(employee.employee_id === thisId){
                let thisUser = employee;
                // setting the suer details
                sessionStorage.setItem("userDetails",JSON.stringify(thisUser));

                display.load(`${ htmlSubpath }manageUser.html`,()=>{
                    let names = $("#names");
                    let tasks = $("#tasks");
                    names.html(unescape(thisUser.employee));
                    tasks.html(thisUser.tasks);
                    
                    // getting form data 
                    getJson("get_departments",(departments)=>{
                        let handle = $("#department");
                        departments.map((department)=>{
                            handle.append(`<option id="${department.id}" value="${department.id}.${thisId}">${department.name}</option>`)
                        })
                    })
                })
            }
        })
    })
}
function addDepartment(){
    //getting the field name 
    let dept = $("#thisDept").val();
    if(dept.length > 2){
        $.ajax({
            url : process,
            method : "POST",
            data : {
                category : "add_department",
                name : unescape(dept),
            },beforeSend: ()=>{
                $("#spinner").show()
            },
            success : (data)=>{
                Swal.fire({
                    type: 'success',
                    title: 'success!',
                    text: 'Department Successfully Added!',
                    timer: 5000,
                    allowOutsideClick: false
                });

            //    we need to get the newly added dept and add it to the select;
            //     $("#userDept")
                getJson("get_departments",(data)=>{
                    let optionHandle = $("#userDept");
                    optionHandle.empty();
                    data.map((value,index)=>{
                        optionHandle.append(`<option value="${value.id}">${value.name}</option>`);
                    });
                });


            },
            error : (jqXHR, textStatus, errorThrown)=>{
                Swal.fire({
                    type: 'error',
                    title: 'Error!',
                    text: 'Sorry, Internal Error Occurred!',
                    timer: 1500000000,
                    allowOutsideClick: false,
                });
            },
            complete : ()=>{
                $("#thisDept").val("");
                setTimeout(()=>{$("#spinner").hide();},1000);
            }
        })
    }else{
        swal.fire({
            type : "error",
            title : "Department Empty/Too Short",
            text : "Please Enter A Department Name",
            timer : 50000,
            allowOutsideClick : false,
        })
    }
}
/**
 * setting user dept : for adding him to the dept
 */
let thisDept;
function setDept(me){
    thisDept =  me.value;
}
function manageUserInfo(me){
    if(sessionStorage.getItem("userDetails")){
        $("#section").html("Manage User.")

        // we have the data
        let user  = JSON.parse(sessionStorage.getItem("userDetails"));
        let userId =  user.employee_id;
        $.ajax({
            url : proc2,
            method : "POST",
            data: {
                get_user: {
                    user_id: userId
                },
            },
            beforeSend : ()=>{
                $("#spinner").show();
            },
            success : (data)=>{
                if(data){
                    display.load(`${ htmlSubpath }editUser.html`,()=>{
                        // edit user data
                        $("#currentPath").append(" / Manager User")
                        let dbData = JSON.parse(data)[0];
                        let dbEmail = dbData.email;
                        $("#firstname").val(dbData.name.split(" ")[0]);
                        $("#lastname").val(dbData.name.split(" ")[1]);
                        $("#email").val(dbData.email);
                        $("#phone").val(dbData.phone);

                        // load the data from above
                        $("#addUserSubmit").on("click",()=>{
                            let form = $("#managerUser").serialize().split("&");
                            let firstname = form[0].split("=")[1]
                            let lastname = form[1].split("=")[1]
                            let password = form[3].split("=")[1]
                            let phone    = form[2].split("=")[1]
                            let role = form[4].split("=")[1]
                            if(firstname.length > 1 && lastname.length > 1 && password.length > 1 && phone.length > 1 && role){
                                $.ajax({
                                    url : proc2,
                                    method : "POST",
                                    data: {
                                        manage_user: {
                                            firstname: firstname,
                                            lastname : lastname,
                                            phone : phone,
                                            password : password,
                                            role : role,
                                            email : dbEmail,
                                            id : userId
                                        },
                                    },
                                    beforeSend : ()=>{
                                        $("#spinner").show()
                                    },
                                    success : (data)=>{
                                        // get the status of teh request
                                        if(data){
                                            let res = JSON.parse(data);
                                            if(res.message === 201){
                                                Swal.fire({
                                                    type: 'success',
                                                    title: 'Success!',
                                                    text: 'User Details Updated Successfully!',
                                                    timer: 5000
                                                });
                                            }else if(res.message === 500){
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'error!',
                                                    text: 'Could Not Change User Details!',
                                                    timer: 5000
                                                });
                                            }
                                        }
                                    },
                                    complete : ()=>{
                                        setTimeout(()=>{
                                            $("#spinner").hide();
                                        },5000)
                                    },
                                    error : (jqXHR) =>{
                                        Swal.fire({
                                            type: 'error',
                                            title: 'error!',
                                            text: 'Could Not Change User Details!',
                                            timer: 5000
                                        });
                                    }
                                })
                            }else{
                                Swal.fire({
                                    type: 'error',
                                    title: 'error!',
                                    text: 'Make Sure All the Field Are Filled!',
                                    timer: 5000
                                });
                            }
                        })
                    });
                }
            },
            complete : ()=>{
                setTimeout(()=>{
                    $("#spinner").hide();
                },1001);
            },
            error : (jqXHR,errorThrown,errorText)=>{
                Swal.fire({
                    type: 'error',
                    title: 'error!',
                    text: 'Internal Error Occurred!',
                    timer: 5000
                });
                setTimeout(()=>{
                    $("#removeMember").trigger("click");
                },5000)
            }

        })
    }
}
function addUserDept(me){
    if(thisDept){
        let userIssue = thisDept.split(".");
        let department = userIssue[0];
        let userId = userIssue[1];
        // adding user to department
        $.ajax({
            url : process,
            method : "POST",
            data : {
                category : "add_user_to_department",
                user_id : userId,
                department_id : department
            },
            beforeSend : ()=>{
                $("#spinner").show();
            },
            success : (data)=>{
                Swal.fire({
                    type: 'success',
                    title: 'Success!',
                    text: 'Department Added SuccessFully!',
                    timer: 5000
                });
            },
            error : (jqXHR, textStatus, errorThrown) =>{
                Swal.fire({
                    type: 'error',
                    title: 'error!',
                    text: 'Internal Error Occurred!',
                    timer: 5000
                });
            },
            complete : ()=>{
               setTimeout(()=>{
                   $("#spinner").hide();
                },1000)
            }
        })
    }else{
        swal({
            type : "info",
            title : "Department Issue",
            text : "Select Department Please",
            timer : 5000
        })
    }
}
/**
 * 
 * @param {*} me DOM Field
 */

function search(me){
    let id = me.id;

    getInfo("get_single_issue",id,(data)=>{
        let status = parseInt(data.status); 
        // 0 - assigned
        // 1 - reassigned
        // 2 - resolved
        // 3 - closed
        // 4 - not closed
        if(status === 0){
            $("#new").trigger("click");
        } else if( status === 1 ){
            $("#pending").trigger("click");
        }else if(status === 2){
            $("#resolved").trigger("click");
        }else if(status === 3){
            $("#closed").trigger("click");
        }else{
            // some other exceptional condition
            // this might be new issue
            $("#new").trigger("click");
        }
    });
}
/**
 * Function tom validate email
 * @param {*} email string 
 */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const generateReport = (data,title="") => {
    // get the table handle 
    let handle = $("#reportBody");
    if(title !== ""){
        handle.append(`<tr><td>${title}</td></tr>`)
    }

    // working with the report data
    // mappiong begins
    data.map((value,index)=>{
            // getting the status 
            let issueId = value.ticket;
            let requestor = value.email_from;
            let subject = value.email_subject;
            let dateRecieved =  new Date(value.email_date).toLocaleString("en-GB",{year: '2-digit', month: '2-digit', day: 'numeric',hour:"2-digit",minute: "2-digit"});
            let assingedTo = (value.assignedTo ? value.assignedTo : '--------');
            let assignedToDate = (value.assignmentTime ? new Date(value.assignmentTime).toLocaleString("en-GB",{year: '2-digit', month: '2-digit', day: 'numeric',hour:"2-digit",minute: "2-digit"}) : "--------");
            let resolvedBy = (value.assignedTo ? value.assignedTo : "--------" );
            let resolvedByDate = (value.completeTime ?  value.completeTime : "--------");
            let closedByDate = (value.closureTime ? value.closureTime : "--------");
            let solution = (value.solution ? value.solution : "--------");
            let reason = (value.problem ? value.problem : "--------");

            handle.append(
                    `<tr>
                        <td id="id">${issueId}</td>
                        <td  id="email" >${requestor}</td>
                        <td  id="issue">${subject}</td>
                        <td  id="dateRevieved">${dateRecieved}</td>
                        <td  id="assignedTo">${assingedTo}</td>
                        <td  id="assignedDate">${assignedToDate}</td>
                        <td  id="resolvedBy">${resolvedBy}</td>
                        <td  id="resolvedByDate">${resolvedByDate}</td>
                        <td  id="closedByDate">${closedByDate}</td>
                        <td  id="solution">${unescape(solution)}</td>
                        <td  id="reason">${unescape(reason)}</td>
                    </tr>`);          
                // end map
            
            // let statusMapper = ["New Issues","Assigned Issues","Resolved Issues","Closed Issues","","Escalated Issues","All Issues — {New, Assigned, Resolved,Escalated,Closed}"];
            

            // description = `Report sdfsdf`;
            // setTimeout(()=>{
            // //     // excel gen
            //       excel = new ExcelGen({
            // 	     "src_id": "report",
            // 		 "show_header": true,
            // 		"format": "xlsx",
            // 		});
                
            //        excel.generate(description);
            // //     //end excel gen

            // 	 setTimeout(()=>{
            // 	        $("#statusOne").prop("selected",true);
            //          $('#periodOne').prop("selected",true);
            //         //  generating.hide();
            //         //  done.show()
            //      },500)
            //      $("#done").hide()
            //     //  generate.prop("disabled",false);
            //     //  $("#reportBody").html("");
            //  },5000);
    })
}
// refresh
// working progess
// later upgrades
// feature 
/**
 * 
 * @param {*} context string
 *  
 */
function refresh(context="new"){
    let contexts = {
        "new" : "get_new_issues",
        "assigned" : ["get_pending_issues",1],
        "resolved" : ["get_resolved_issues",2],
        "escalated" : "get_escalation_requested_issues",
        "closed": "get_closed_issues"
    };
    $(document).ready(function() {
        setTimeout(()=>{
            setInterval(()=>{
                getJson("get_new_issues",(tableData)=>{
                    if(tableData.length){
                        getUser((userData)=>{
                            //admin
                            if(userData.userType === 1){
                                // ADMIN
                                    let tableHandle = $("#tableBody");
                                    tableData.map(item => {
                                        tableHandle.append(`<tr>
                                            <th  id="id" scope=row>${item.ticket}</th>
                                            <td  id="email" >${unescape(item.email_from)}</td>
                                            <td  id="issue">${unescape(item.email_subject.substr(0,15))}</td>
                                            <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                            <td   class="btn btn-link btn-sm col links" onclick="getId(this)" id='${item.id}'>View Issue</td>
                                            </tr>`);
                                    });

                            }else{
                                //not admin; thus should not show new issues
                            }
                        });
                    }else{
                        display.load(`${ htmlSubpath }notFound.html`);
                    }
                });

            },3000)
        },5000);
    });
}
//the search function

// function to deal with generating reports 
/** 
 * Utiliy functions */
function getFrequency(item){
    thisVal =  item.value;
    if(thisVal === "null"){
        $("#type").prop("disabled",true);
        $("#statusOne").prop("selected",true);
    }else if(thisVal === 'day'){
        $("#type").removeAttr("disabled");
        $("#dateCont").show();
        $("#monthCont").hide();
        $("#weekCont").hide();
    }else if(thisVal === "week"){
        $("#type").removeAttr("disabled");
        $("#dateCont").hide();
        $("#monthCont").show();
        $("#weekCont").show();
        
    }else if(thisVal === 'month'){
        $("#type").removeAttr("disabled");
        $("#dateCont").hide();
        $("#monthCont").show();
        $("#weekCont").hide();
    }
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function updateWeek(item){
    let month = $("#month").val()
    if(month !== ""){
        let daysInMonths = new Date(month);
        let yearDate = daysInMonths.getFullYear();
        let monthDate = daysInMonths.getMonth()+1;
        var days = daysInMonth(monthDate,yearDate);
        let weeks = Math.floor(days/7);
        let extraDays = days%7;
        if(extraDays > 0){
            // five weeks
            $("#five").show();
        }else{
            // four weeks
            $("#five").hide();
        }
    }else{
        let error = $("#error");
        let monthHandle = $("#month");
        error.html("Month Required. Please Select Select A Month")
        error.show();
        monthHandle.addClass("is-invalid")
        setTimeout(()=>{
            error.hide()
            monthHandle.removeClass("is-invalid")
        },5000);
    }
}

$("#search").on("focus",(e)=>{
    // getJson("",(data)=>{parse data && load page add data to page});
    //get the user type  first
    let userLoggedIn = JSON.parse(sessionStorage.getItem("user"));
    if(userLoggedIn.userType === 1){
        display.load(`${ htmlSubpath }search.html`,()=>{
            $("#othersHeader").hide();
            $("#newIssues").hide();

            // if(searchLength){
                $("#spinner").show();
               $("#search").on("keyup",()=>{
                $("#tableBody").html("");

                let searchString = document.getElementById('search').value;
                if(searchString.length === 0){
                    $("#othersHeader").hide();
                    $("#newIssues").hide();
                }else{
                    $("#othersHeader").show();
                    $("#newIssues").show();
                }
                $.ajax({
                    url :process,
                    method : "POST",
                    data : {
                        category : "search_issues",
                        q : searchString,
                        user_id : userLoggedIn.userId
                    },
                    beforeSend : ()=>{
                        $("#spinner").show();
                    },
                    success : (data)=>{
                        if(data.length){
                            display.load(`${ htmlSubpath }search.html`,()=>{
                                let tableHandle = $("#tableBody");
                                data.map(item => {
                                    tableHandle.append(`<tr>
                                        <th  id="id" scope=row>${item.ticket}</th>
                                        <td  id="email" >${item.email_from}</td>
                                        <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                        <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                        <td   class="btn btn-link btn-sm col links" onclick="search(this)" id='${item.id}'>View Issue</td>
                                        </tr>`);
                                });
                            });

                        }else{
                            display.load(`${ htmlSubpath }notFound.html`);
                        }
                    },
                    complete : ()=>{
                        setTimeout(()=>{$("#spinner").hide()},1000)
                    },
                    error :(jqXHR,error, errorThrown)=>{
                    }
                })
               });
               $("#search").on("blur",()=>{
                     $("#spinner").hide();
               });
           })
    }else{
        display.load(`${ htmlSubpath }search.html`,()=>{
            $("#othersHeader").hide();
            $("#newIssues").hide();

            // if(searchLength){
            $("#spinner").show();
            $("#search").on("keyup",()=>{
                $("#tableBody").html("");

                let searchString = document.getElementById('search').value;
                if(searchString.length === 0){
                    $("#othersHeader").hide();
                    $("#newIssues").hide();
                }else{
                    $("#othersHeader").show();
                    $("#newIssues").show();
                }
                $.ajax({
                    url :process,
                    method : "POST",
                    data : {
                        category : "search_issues",
                        q : searchString,
                        user_id : userLoggedIn.userId
                    },
                    beforeSend : ()=>{
                        $("#spinner").show();
                    },
                    success : (data)=>{
                        if(data.length){
                            display.load(`${ htmlSubpath }search.html`,()=>{
                                let tableHandle = $("#tableBody");
                                data.map(item => {
                                    tableHandle.append(`<tr>
                                        <th  id="id" scope=row>${item.ticket}</th>
                                        <td  id="email" >${item.email_from}</td>
                                        <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                        <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                        <td   class="btn btn-link btn-sm col links" onclick="search(this)" id='${item.id}'>View Issue</td>
                                        </tr>`);
                                });
                            });

                        }else{
                            display.load(`${ htmlSubpath }notFound.html`);
                        }
                    },
                    complete : ()=>{
                        setTimeout(()=>{$("#spinner").hide()},1000)
                    },
                    error :(jqXHR,error, errorThrown)=>{
                    }
                })
            });
            $("#search").on("blur",()=>{
                $("#spinner").hide();
            });
        })
    }
});
// add item
// listing for sidebar events
$("#overview").on("click",(e)=>{
    // getting graph data
    $("#overview").addClass("clicked");
    // managing images on click
    $( "div.item" ).each(function (index){
        if($(this).find("img").attr("src").split("/")[2].split("_").length === 2){
            // has the filename
            let path = $(this).find("img").attr("src").split("/")[2].split("_")[0];
            $("#"+path).removeClass("clicked");
            $(this).find("img").attr("src","./images/"+path+".png");
        }
    });
        // checking if the dom is ready 
        $(()=>{
            // working the date picket 
            var start = new Date(),
            prevDay,
            startHours = 8;
            // 09:00 AM
            start.setHours(8);
            start.setMinutes(0);
            // If today is Saturday or Sunday set 10:00 AM
            if ([6, 0].indexOf(start.getDay()) !== -1) {
                start.setHours(10);
                startHours = 10
            }
            // var minHours =;
            // var minDate = ; 
            // minDate : today;
            setTimeout(() => {
                $('#date').datepicker({
                    language: 'en',
                    startDate: start,
                    maxDate : start,
                    minDate: new Date("08/01/2019"),
                    range:true,
                    position: "top left",
                    multipleDatesSeparator : " •• ",
                    clearButton : true  ,
                    view : "years",
                    showOtherMonths : true
                });

                //  working with generate
                $('#generate').on("click",()=>{
                    console.log("email data tests")
                    // generics
                    let email = $("#emailfilter").val();
                    let status = $("#type").val();
                    let date = $("#date").val();
                    console.log(email,status,date)
                    // getting the date info

                    if(status !== "null" && date !== ""){
                        // date variables
                        let errorHandle = $("#error");
                        let generate = $("#generate");
                        let generating = $("#generating");
                        let done = $("#done");
                        let dt = date.split(" •• ")
                        // get new date
                        try{
                            let start_ = dt[0].split("/").join("-").split("-");
                            let end_ = dt[1].split("/").join("-").split("-")
                        }catch(e) {
                            console.log("error")
                            generating.show();
                            $("#generating").text("Please Select A Range. Single Day selected.")
                        }

                        let start_ = dt[0].split("/").join("-").split("-");
                        let end_ = dt[1].split("/").join("-").split("-")
                        // let unformattedTime = date.split("/").join("-").split("-");
                        let start = start_[2]+"-"+start_[0]+"-"+start_[1];
                        let end = end_[2]+"-"+end_[0]+"-"+end_[1];

                        // console.log("2nd level",date.split(" •• "))




                        // we are going to make an ajax request based on the data
                        $.ajax({
                            url: "http://192.168.12.200:8000/reports",
                            method: "POST",
                            data: JSON.stringify({
                                status : status,
                                start : start,
                                end : end,
                                email : email
                            }),
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            beforeSend: ()=>{
                                $("#spinner").show();
                                done.hide();
                                generating.show();
                                generate.prop("disabled",true)
                            },
                            success: function (result) {
                                if(result){
                                    if(result.msg){
                                        $("#generating").text("👌 Report Successfully Generated.")
                                        generate.prop("disabled",false)
                                        console.log('data',result)
                                        window.location.href = (`http://192.168.12.200:8000/reports/download/${result.msg}`)
                                    }else{
                                        $("#generating").text("No Data In Date Range Selected.")
                                        generate.prop("disabled",false)
                                    }
                                }
                            },
                            complete : ()=>{
                                setTimeout(()=>{ $("#spinner").hide()} ,1000)
                            }
                        });
                    }else{
                        $("#done").hide()
                        function error(id,msg){
                            let handle = $("#error");
                            handle.html(msg)
                            handle.show();
                            $(`#${id}`).addClass("is-invalid")
                            setTimeout(()=>{
                                handle.hide()
                                $(`#${id}`).removeClass("is-invalid")
                            },5000);
                        }
                        // some data is not set
                        if(period === "null"){
                            error("frequency","Duration Is Required.");
                        } else if(status === "null"){
                            error("type","Issue Type Is Required");
                        }else if(!date){
                            error("date","Date is Required");
                        }
                    }
                });

            }, 1000);
            
           
            // end report genereation
    });



    display_header.html("Overview");
    currentPath.html("Overview");
    display.load(`${ htmlSubpath }overview.html`,()=>{
        getJson("graph2",(data)=>{
            data.map((value,index)=>{
                myChart.data.datasets[0].data[index+1] =  value.issuesCount;
            });
            myChart.update();
        });

        getJson("graph1",(data)=>{
            doughnut.data.datasets[0].data[0] =  data.new_issues;
            doughnut.data.datasets[0].data[1] =  data.assigned_issues;
            doughnut.data.datasets[0].data[2] =  data.resolved_issues;
            doughnut.data.datasets[0].data[3] =  data.closed_issues;
            doughnut.update();
        });
    });
    //getting the last four post
    // adding the report generation 
    

});
$("#home").on("click",(e)=>{
    $("#overview").addClass("clicked");
    $( "div.item" ).each(function (index){
        if($(this).find("img").attr("src").split("/")[2].split("_").length === 2){
        //     // has the filename
            let path = $(this).find("img").attr("src").split("/")[2].split("_")[0];
            $("#"+path).removeClass("clicked");
            $(this).find("img").attr("src","./images/"+path+".png");
        }
    });
    window.location = "http://192.168.12.200";
});
// requests
$("#new").on("click",(e)=>{
    display_header.html("New Requests");
    currentPath.html("Requests / New Requests");
    getJson("get_new_issues",(tableData)=>{
        if(tableData.length){
            getUser((userData)=>{
                //admin
                if(userData.userType === 1){
                    // ADMIN
                    display.load(`${ htmlSubpath }new.html`,()=>{
                        $("#othersHeade").hide();
                        $("#adminIssues").hide();
                        $("#adminHeader").hide();
                        $("#othersHeader").hide();

                        let tableHandle = $("#tableBody");
                        tableData.map(item => {
                            tableHandle.append(`<tr>
                            <th  id="id" scope=row>${item.ticket}</th>
                            <td  id="email" >${unescape(item.email_from)}</td>
                            <td  id="issue">${unescape(item.email_subject.substr(0,15))}</td>
                            <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                            <td   class="btn btn-link btn-sm col links" onclick="getId(this)" id='${item.id}'><i class="far fa-eye"></i></td>
                            <td   class="centeredButton" onclick="deleteIssue(this)" id='${item.id}' ><i class="fas fa-backspace"></td>
                            </tr>`);
                        });   
                    });
                }else{
                    //not admin; thus should not show new issues
                }
            });
            // <td   class="btn btn-secondary btn-sm col" onclick="deleteIssue(this)" id='${item.id}'><i class="fas fa-backspace"></i></td>
        }else{
            display.load(`${ htmlSubpath }notFound.html`);
        }
    });
});
// assigned
$("#pending").on("click",(e)=>{
    let context = 1;
    display_header.html("Assigned Requests");
    currentPath.html("Requests / Assigned Requests")
    //get user data  ...
    // if true ... load page else do not load page
    // while getting userdata show loading ...
    getUser((userData)=>{
        // check if user is admin
        if(userData.userType === 1){
            // admin
            getJson("get_pending_issues",(data)=>{
                if(data.length){
                    display.load(`${ htmlSubpath }pending.html`,()=>{
                        let adminHeader = $("#adminHeader");
                        let adminIssues = $("#adminIssues");
                        let othersHeader = $("#othersHeade");
                        let othersBody = $("#newIssues");
                        adminHeader.hide();
                        adminIssues.hide();
                        othersBody.hide();
                        othersHeader.hide();
                        getIssues(1,(userData)=>{
                            let escalatedItems  = [];
                            //getting admin issues
                            if(userData.length){
                                $(()=>{
                                    let tableHandle = $("#adminTableBody");
                                    userData.map(item => {
                                        let deadline = new Date(item.deadline)/1000;
                                        // let assigned  = new Date(pageData.dateUpdated)/1000;
                                        let now = Math.floor(Date.now() / 1000);
                                        let slack = deadline - now;
                                        // giving 30 for every issue
                                        let dueTime = now - deadline;
                                        let className = "";
                                        let badgeText = "";
                                        if(slack>=1){
                                            //not over due
                                            let duration = Math.floor(slack/60);
                                            className = "badge badge-success";
                                            if(duration >= 60){
                                                let hours = parseInt(duration/60);
                                                let minutes = duration%60;
                                                badgeText = `${hours} Hrs : ${minutes} Mins Left`;
                                            }else{
                                                badgeText = `${duration} Minutes Left`;
                                            }
                                        }else{
                                            //over due
                                            className = "badge badge-danger";
                                            badgeText = "Overdue";
                                        }
                                        getInfo("track_issue",item.id,(data)=>{
                                            //  we need to get the user id
                                            tableHandle.append(`<tr>
                                                <th  id="id" scope=row>${item.ticket}</th>
                                                <td  id="email" >${item.email_from}</td>
                                                <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                                <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                                <td  id="issue"><span class="${className}" style="padding-bottom:5px;">${badgeText}</span></td> 
                                                <td  id="issue"><span class="userAssigned" style="padding-bottom:5px;">${data[0].user}</span></td> 
                                                <td   class="btn btn-link btn-sm col links" onclick="getIssueInfo(this)" id='${item.id}'>View Issue</td>
                                            </tr>`);
                                        });
                                    });
                                });
                                adminHeader.show();
                                adminIssues.show();
                            }else{
                                // no issues
                                // should be handled globally
                            }
                        });
                        // hide the new others body
                        // all users issues
                        $.ajax({
                            url : process,
                            method : "POST",
                            data : {
                                category : "get_non_user_issues",
                                status : 0,
                                user_id : JSON.parse(sessionStorage.getItem("userLoggedIn")).id
                            },
                            success : (thisData)=>{
                                // show the other body
                                let tableHandle = $("#tableBody");
                                if(thisData.length){
                                    thisData.map(otherUser =>{
                                        let deadline = new Date(otherUser.deadline)/1000;
                                        // let assigned  = new Date(pageData.dateUpdated)/1000;
                                        let now = Math.floor(Date.now() / 1000);
                                        let slack = deadline - now;
                                        // giving 30 for every issue
                                        let dueTime = now - deadline;
                                        let className = "";
                                        let badgeText = "";
                                        if(slack>=1){
                                            //not over due
                                            let duration = Math.floor(slack/60);
                                            className = "badge badge-success";
                                            if(duration >= 60){
                                                let hours = parseInt(duration/60);
                                                let minutes = duration%60;
                                                badgeText = `${hours} Hrs : ${minutes} Mins Left`;
                                            }else{
                                                badgeText = `${duration} Minutes Left`;
                                            }
                                        }else{
                                            //over due
                                            className = "badge badge-danger";
                                            badgeText = "Overdue";
                                        }
                                        getInfo("track_issue",otherUser.id,(data)=>{
                                            //  we need to get the user id
                                            tableHandle.append(`<tr>
                                                <th  id="id" scope=row>${otherUser.ticket}</th>
                                                <td  id="email" >${otherUser.email_from}</td>
                                                <td  id="issue">${otherUser.email_subject.substr(0,15)}</td>
                                                <td  id="date">${new Date(otherUser.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                                <td  id="issue"><span class="${className}" style="padding-bottom:5px;">${badgeText}</span></td> 
                                                <td  id="issue"><span class="userAssigned" style="padding-bottom:5px;">${data[0].user}</span></td> 
                                                <td   class="btn btn-link btn-sm col links" onclick="getIssueInfoOthers(this)" id='${otherUser.id}'>View Issue</td>
                                            </tr>`);
                                        });
                                    });
                                    othersBody.show();
                                    othersHeader.show();
                                }else{
                                    $("#othersHeade").remove();
                                    $("#newIssues").remove();
                                }
                            }
                        })
                    });

                }else{
                    display.load(`${ htmlSubpath }notFound.html`,()=>{
                    })
                }
            });
        }else{
            // not admin
                getIssues(1,(data)=>{
                    if(data.length) {
                        display.load(`${ htmlSubpath }pending.html`,()=>{
                            let adminHeader = $("#adminHeader");
                            let adminIssues = $("#adminIssues");
                            let othersHeader = $("#othersHeade");
                            let othersBody = $("#newIssues");
                            adminHeader.hide();
                            adminIssues.hide();
                            othersBody.remove();
                            othersHeader.remove();
                            // $("#newIssues").remove();
                            // $("#othersHeade").remove();
                            $(() => {
                                let tableHandle = $("#adminTableBody");
                                data.map(item => {
                                    let deadline = new Date(item.deadline)/1000;
                                    // let assigned  = new Date(pageData.dateUpdated)/1000;
                                    let now = Math.floor(Date.now() / 1000);
                                    let slack = deadline - now;
                                    // giving 30 for every issue
                                    let dueTime = now - deadline;
                                    let className = "";
                                    let badgeText = "";
                                    if(slack>=1){
                                        //not over due
                                        let duration = Math.floor(slack/60);
                                        className = "badge badge-success";
                                            if(duration >= 60){
                                                let hours = parseInt(duration/60);
                                                let minutes = duration%60;
                                                badgeText = `${hours} Hrs : ${minutes} Mins Left`;
                                            }else{
                                                badgeText = `${duration} Minutes Left`;
                                            }
                                    }else{
                                        //over due
                                        className = "badge badge-danger";
                                        badgeText = "Overdue";
                                    }
                                    tableHandle.append(`<tr>
                                        <th  id="id" scope=row>${item.ticket}</th>
                                        <td  id="email" >${item.email_from}</td>
                                        <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                        <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                        <td  id="issue"><span class="${className}" style="padding-bottom:5px;">${badgeText}</span></td> 
                                        <td   class="btn btn-link btn-sm col links" onclick="getIssueInfo(this)" id='${item.id}'>View Issue</td>
                                    </tr>`);
                                })
                                adminHeader.show();
                                adminIssues.show();
                            });
                    });
                    }else{
                        display.load(`${ htmlSubpath }notFound.html`,()=>{
                        })
                    }
                });
            }
        });
});
$("#resolved").on("click",(e)=>{
    let context = 2;
    display_header.html("Resolved Requests");
    currentPath.html("Requests / Resolved Requests");
    // getting all the resolved issues
        // check if the user is admin
        getUser((userData)=>{
            if(userData.userType === 1){
                getJson("get_resolved_issues",(data)=>{
                    if(data.length) {
                        display.load(`${ htmlSubpath }resolve_issues.html`, () => {
                            let adminHeader = $("#adminHeader");
                            let adminIssues = $("#adminIssues");
                            let othersHeader = $("#othersHeade");
                            let othersBody = $("#newIssues");
                            adminHeader.hide();
                            adminIssues.hide();
                            othersBody.hide();
                            othersHeader.hide();
                            getIssues(2, (userData) => {
                               if(userData.length){
                                   $(() => {
                                       let tableHandle = $("#adminTableBody");
                                       userData.map(item => {
                                            getInfo("track_issue",item.id,(trackData)=>{
                                                tableHandle.append(`<tr>
                                                    <th  id="id" scope=row>${item.ticket}</th>
                                                    <td  id="email" >${item.email_from}</td>
                                                    <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                                    <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                                    <td  id="assignedto" >${trackData[0].user}</td>
                                                    <td  id="resolvedBy" >${trackData[1].user}</td>
                                                    <td   class="btn btn-link btn-sm col links" onclick="getResolvedInfo(this)" id='${item.id}'>View Issue</td>
                                                    
                                                </tr>`);
                                            });
                                       });
                                       adminHeader.show();
                                       adminIssues.show();
                                   });
                               }
                            });

                            // all users issues
                            $.ajax({
                                url: process,
                                method: "POST",
                                data: {
                                    category: "get_non_user_issues",
                                    status: 2,
                                    user_id: JSON.parse(sessionStorage.getItem("userLoggedIn")).id
                                },
                                beforeSend : ()=>{
                                    $("#spinner").show();
                                },
                                success: (thisData) => {
                                    let tableHandle = $("#tableBody");
                                    if (thisData.length) {
                                        thisData.map(otherUser => {
                                            getInfo("track_issue",otherUser.id,(trackData)=>{
                                                tableHandle.append(`<tr>
                                                    <th  id="id" scope=row>${otherUser.ticket}</th>
                                                    <td  id="email" >${otherUser.email_from}</td>
                                                    <td  id="issue">${otherUser.email_subject.substr(0,15)}</td>
                                                    <td  id="date">${new Date(otherUser.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                                    <td  id="assignedto" >${trackData[0].user}</td>
                                                    <td  id="resolvedBy" >${trackData[1].user}</td>
                                                    <td   class="btn btn-link btn-sm col links" onclick="getResolvedInfo(this)" id='${otherUser.id}'>View Issue</td>
                                                    
                                                </tr>`);
                                            });
                                       });

                                        othersHeader.text("Issues Resolved By Other Employees");
                                        othersBody.show();
                                        othersHeader.show();
                                    } else {
                                        $("#othersHeade").remove();
                                        $("#newIssues").remove();
                                    }
                                },
                                complete : ()=>{
                                    $("#spinner").hide();
                                }
                        })
                    });
                    }else{
                        display.load(`${ htmlSubpath }notFound.html`,()=>{
                        })
                    }
                });
            }else{
                // not admin
                getIssues(2,(data)=>{
                    if(data.length){
                        display.load(`${ htmlSubpath }new.html`,()=> {
                            let adminHeader = $("#adminHeader");
                            let adminIssues = $("#adminIssues");
                            let othersHeader = $("#othersHeade");
                            let othersBody = $("#newIssues");
                            adminHeader.hide();
                            adminIssues.hide();
                            othersBody.remove();
                            othersHeader.remove();
                            $(() => {
                                let tableHandle = $("#adminTableBody");
                                data.map(item => {
                                    tableHandle.append(`<tr>
                                <th  id="id" scope=row>${item.ticket}</th>
                                <td  id="email" >${item.email_from}</td>
                                <td  id="issue">${item.email_subject}</td>
                                <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                <td   class="btn btn-link btn-sm col links" onclick="getResolvedInfo(this)" id='${item.id}'>View Issue</td>
                            </tr>`);
                                })
                                adminHeader.show();
                                adminIssues.show();
                            });
                        });
                    }else{
                        display.load(`${ htmlSubpath }notFound.html`,()=>{
                        })
                    }

                });
            }
        });

});
$("#escalated").on("click",(e)=>{
    display_header.html("Escalated Requests");
    currentPath.html("Requests / Escalated Requests");
    // getting all the resolved issues
    // check if the user is admin
    getUser((userData)=>{
        if(userData.userType === 1){
            getJson("get_escalation_requested_issues",(escalated)=>{
                if(escalated.length) {
                    display.load(`${ htmlSubpath }escalated.html`, () => {
                        let adminHeader = $("#adminHeader");
                        let adminIssues = $("#adminIssues");
                        let othersHeader = $("#othersHeade");
                        let othersBody = $("#newIssues");
                        adminHeader.hide();
                        adminIssues.hide();
                        othersBody.hide();
                        othersHeader.hide();
                        $(() => {
                            let tableHandle = $("#adminTableBody");
                            escalated.map(item => {

                                tableHandle.append(`<tr>
                                <th  id="id" scope=row>${item.ticket}</th>
                                <td  id="email" >${item.email_from}</td>
                                <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                <td  id="escalator">${unescape(item.employee)}</td>
                                <td   class="btn btn-link btn-sm col links" onclick="getEscalated(this)" id='${item.id}'>View Issue</td>
                            </tr>`);
                            });
                            // adminHeader.show();
                            adminIssues.show();
                        });
                        // all users issues
                    });
                }else{
                    display.load(`${ htmlSubpath }notFound.html`,()=>{
                    })
                }
            });
        }else{
            // not admin
            getIssues(2,(data)=>{
                if(data.length){
                    display.load(`${ htmlSubpath }new.html`,()=> {
                        let adminHeader = $("#adminHeader");
                        let adminIssues = $("#adminIssues");
                        let othersHeader = $("#othersHeade");
                        let othersBody = $("#newIssues");
                        adminHeader.hide();
                        adminIssues.hide();
                        othersBody.remove();
                        othersHeader.remove();
                        $(() => {
                            let tableHandle = $("#adminTableBody");
                            data.map(item => {
                                tableHandle.append(`<tr>
                                <th  id="id" scope=row>${item.ticket}</th>
                                <td  id="email" >${item.email_from}</td>
                                <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                <td   class="btn btn-link btn-sm col links" onclick="getIssueInfo(this)" id='${item.id}'>View Issue</td>
                            </tr>`);
                            })
                            adminHeader.show();
                            adminIssues.show();
                        });
                    });
                }else{
                    display.load(`${ htmlSubpath }notFound.html`,()=>{
                    })
                }

            });
        }
    });

});
$("#closed").on("click",(e)=>{

    let context = 3;
    display_header.html("Closed Requests");
    currentPath.html("Requests / Closed Requests");
    getJson("get_closed_issues",(data)=>{
        if(data.length){
                getUser((userData)=>{
                    if(userData.userType === 1){
                        getJson("get_closed_issues",(allClosed)=>{
                            if(data.length){
                                display.load(`${ htmlSubpath }closed.html`,()=>{
                                    let adminHeader = $("#adminHeader");
                                    let adminIssues = $("#adminIssues");
                                    let othersHeader = $("#othersHeade");
                                    let othersBody = $("#newIssues");
                                    adminHeader.hide();
                                    adminIssues.hide();
                                    othersBody.hide();
                                    othersHeader.hide();
                                getIssues(3,(userData)=>{
                                    if(userData.length > 0){
                                        $(()=>{
                                            let tableHandle = $("#adminTableBody");
                                            userData.map(item => {
                                                
                                                getInfo("track_issue",item.id,(trackData)=>{
                                                    tableHandle.append(`<tr>
                                                        <th  id="id" scope=row>${item.ticket}</th>
                                                        <td  id="email" >${item.email_from}</td>
                                                        <td  id="issue">${item.email_subject.substr(0,15)}</td>
                                                        <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                                        <td  id="assignedTo" >${trackData[0].user}</td>
                                                        <td  id="resolvedTo" >${trackData[1].user}</td>
                                                        <td   class="btn btn-link btn-sm col links" onclick="getResolvedInfo(this)" id='${item.id}'>View Issue</td>
                                                    </tr>`);
                                                });
                                            });
                                            adminHeader.show();
                                            adminIssues.show();
                                        });
                                    }
                                });

                                // all users issues
                                $.ajax({
                                    url : process,
                                    method : "POST",
                                    data : {
                                        category : "get_non_user_issues",
                                        status : 3,
                                        user_id : JSON.parse(sessionStorage.getItem("userLoggedIn")).id
                                    },
                                    success : (thisData)=>{
                                        let tableHandle = $("#tableBody");
                                        if(thisData.length){
                                            thisData.map(otherUser =>{
                                                getInfo("track_issue",otherUser.id,(trackData)=>{
                                                    tableHandle.append(`<tr>
                                                        <th  id="id" scope=row>${otherUser.ticket}</th>
                                                        <td  id="email" >${otherUser.email_from}</td>
                                                        <td  id="issue">${otherUser.email_subject}</td>
                                                        <td  id="date">${new Date(otherUser.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                                        <td  id="resolvedBy">${trackData[0].user}</td>
                                                        <td  id="ClosedBy">${trackData[1].user}</td>
                                                        <td   class="btn btn-link btn-sm col links" value="1001" onclick="getResolvedInfo(this)" id='${otherUser.id}'>View Issue</td>
                                                    </tr>`);
                                                });
                                            });
                                            othersBody.show();
                                            othersHeader.show();
                                        }else{
                                            $("#othersHeade").remove();
                                            $("#newIssues").remove();
                                        }
                                    }
                                })
                                });
                            }else{
                                display.load(`${ htmlSubpath }notFound.html`,()=>{
                                })
                            }
                        });
                    }else{
                        // not admin
                        getIssues(3,(data)=>{
                            if(data.length){
                                display.load(`${ htmlSubpath }new.html`,()=> {
                                    let adminHeader = $("#adminHeader");
                                    let adminIssues = $("#adminIssues");
                                    let othersHeader = $("#othersHeade");
                                    let othersBody = $("#newIssues");
                                    adminHeader.hide();
                                    adminIssues.hide();
                                    othersBody.remove();
                                    othersHeader.remove();
                                    $(() => {
                                        let tableHandle = $("#adminTableBody");
                                        data.map(item => {
                                            tableHandle.append(`<tr>
                                                <th  id="id" scope=row>${item.ticket}</th>
                                                <td  id="email" >${item.email_from}</td>
                                                <td  id="issue">${item.email_subject}</td>
                                                <td  id="date">${new Date(item.email_date).toLocaleString("en-US",{weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"2-digit",minute: "2-digit"})}</td>
                                                <td   class="btn btn-link btn-sm col links" onclick="getResolvedInfo(this)" id='${item.id}'>View Issue</td>
                                            </tr>`);
                                        })
                                        adminHeader.show();
                                        adminIssues.show();
                                    });
                                });
                            }else{
                                display.load(`${ htmlSubpath }notFound.html`,()=>{
                                })
                            }
                        });
                    }
                });

        }else{
            display.load(`${ htmlSubpath }notFound.html`,()=>{
            })
        }
    });

});
// chenge management 
$("#change").on("click",(e)=>{
    let context = 3;
    display_header.html("Change Management");
    currentPath.html("Utility / Change_Management");
    getUser((userData)=>{
        if(userData.userType === 1  && (userData.user === "gilbert.mutai@cargen.com"|| userData.user === "joel@cargen.com" || userData.user ==="titus.murage@cargen.com")){
            display.load(`${ htmlSubpath }change.html`,()=>{
                // setting users_id for the form
                $("#user_id").val(JSON.parse(sessionStorage.getItem("userLoggedIn")).id);

                getInfo("get_departments","",(data)=>{
                    let selectHandle = $("#issueType");
                    data.map( (value,index) =>{
                        selectHandle.append(` <option id=${value.id} value="${value.id}"> ${value.name} </option>`);
                    })
                });

                let form = $("#changeForm");

                $("#changeForm").on("submit",(e)=>{
                    e.preventDefault()
                    let thisForm = new FormData(form[0]);
                    fetch(process,{
                        method: 'POST',
                        body : thisForm
                    }).then( data => {
                        // console.log(data)
                        $("#change").trigger("click");
                    });
                });

                let handle = $("#reportBody");

                // adding data to the table
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "0"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("not approved", data)
                        if(data){
                            // console.log(data)
                            data.map((value,index)=>{
                                /*
                                    <td  id="date_added">${value.dateAdded}</td>

                                * */
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(`<tr>
                                                            <td  id="id" scope=row>${value.employee}</td>
                                                            <td  id="email" >${value.description.substring(0,12)} ...</td>
                                                            <td  id="dept" >${value.gdepartment}</td>
                                                            <td  id="solution"><span class="badge badge-primary">Pending</span></td>
                                                            <td  id="dateRevieved">${assigned}</td>
                                                            <td  id="">${requestor}</td>
                                                            <td onclick="getChangeId(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                        </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                });

                // ading data to the table
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "1"
                    },
                    method :"POST",
                    success : (data)=>{
                        console.log("approved",data)
                        if(data){
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                            <td  id="id" scope=row>${value.employee}</td>
                                                            <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                            <td  id="dpt">${value.gdepartment}</td>
                                                            <td  id="solution"><span class="badge badge-success">Approved</span></td>
                                                            <td  id="dateRevieved">${assigned}</td>
                                                            <td  id="">${requestor}</td>
                                                            <td onclick="getChangeId(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                        </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
                // adding more data to the table
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "2"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("rejected",data)
                        if(data){
                            // console.log("data exists",data.length)
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                            <td  id="id" scope=row>${value.employee}</td>
                                                            <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                            <td  id="dpt">${value.typem}</td>
                                                            <td  id="solution"><span class="badge badge-danger">Rejected</span></td>
                                                            <td  id="dateRevieved">${assigned}</td>
                                                            <td  id="">${requestor}</td>
                                                            <td onclick="getChangeId(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                        </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
            });
        }else{
            // not admin && not gilbert or admin && not gilbert
            display.load(`${ htmlSubpath }change.html`,()=>{
                // setting users_id for the form
                $("#user_id").val(JSON.parse(sessionStorage.getItem("userLoggedIn")).id);
                getInfo("get_departments","",(data)=>{
                    let selectHandle = $("#issueType");
                    data.map( (value,index) =>{
                        selectHandle.append(` <option id=${value.name} value="${value.name}"> ${value.name} </option>`);
                    })
                });
                let form = $("#changeForm");
                $("#changeForm").on("submit",(e)=>{
                    e.preventDefault()
                    let thisForm = new FormData(form[0]);
                    fetch(process,{
                        method: 'POST',
                        body : thisForm
                    }).then( data =>{
                        // console.log(data);
                        $("#change").trigger("click");
                    });
                });
                let handle = $("#reportBody");

                // adding data to the database
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "0"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("not approved", data)
                        if(data){
                            data.map((value,index)=>{
                                // console.log("Pending ...",value)
                                // requestor
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                let dept = value.typem ? value.typem : "-----";
                                let dateAdded = value.dateAdded ? value.dateAdded : "------"
                                handle.append(`<tr>
                                                    <td  id="id" scope=row>${value.employee}</td>
                                                    <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                    <td  id="dpt">${dept}</td>
                                                    <td  id="solution"><span class="badge badge-primary">Pending</span></td>
                                                    <td  id="dateRevieved">${assigned}</td>
                                                    <td  id="dateRevieved">${requestor}</td>
                                                    <td onclick="getChangeIdNotAmdin(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                });
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "1"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("approved",data)
                        if(data){
                            // console.log("data exists",data.length)
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                    <td  id="id" scope=row>${value.employee}</td>
                                                    <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                    <td  id="dpt">${value.typem}</td>
                                                    <td  id="solution"><span class="badge badge-success">Approved</span></td>
                                                    <td  id="dateRevieved">${assigned}</td>
                                                     <td  id="dateRevieved">${requestor} </td>
                                                    <td onclick="getChangeIdNotAmdin(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "2"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("approved",data)
                        if(data){
                            // console.log("data exists",data.length)
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                    <td  id="id" scope=row>${value.employee}</td>
                                                    <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                    <td  id="dpt">${value.typem}</td>
                                                    <td  id="solution"><span class="badge badge-danger">Rejected</span></td>
                                                    <td  id="dateRevieved">${assigned}</td>
                                                     <td  id="dateRevieved"> ${requestor} </td>
                                                    <td onclick="getChangeIdNotAmdin(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
            });
        }
    });
});


$("#project").on("click",(e)=>{
    display_header.html("Project Utility");
    currentPath.html("Utility / Project Utility");
    getUser((userData)=>{
        // userData.userType === 1  && (userData.user === "gilbert.mutai@cargen.com"|| userData.user === "joel@cargen.com" || userData.user ==="titus.murage@cargen.com"
        if(userData.userType){
            // admins
            display.load(`${ htmlSubpath }project.html`,()=>{
                // setting users_id for the form
                $("#user_id").val(JSON.parse(sessionStorage.getItem("userLoggedIn")).id);

                getInfo("get_departments","",(data)=>{
                    let selectHandle = $("#issueType");
                    data.map( (value,index) =>{
                        selectHandle.append(` <option id=${value.id} value="${value.id}"> ${value.name} </option>`);
                    })
                });

                let form = $("#changeForm");

                $("#changeForm").on("submit",(e)=>{
                    e.preventDefault()
                    let thisForm = new FormData(form[0]);
                    fetch(process,{
                        method: 'POST',
                        body : thisForm
                    }).then( data => {
                        // console.log(data)
                        $("#change").trigger("click");
                    });
                });

                let handle = $("#reportBody");

                // adding data to the table
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "0"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("not approved", data)
                        if(data){
                            // console.log(data)
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(`<tr>
                                                            <td  id="id" scope=row>${value.employee}</td>
                                                            <td  id="email" >${value.description.substring(0,12)} ...</td>
                                                            <td  id="dept" >${value.gdepartment}</td>
                                                            <td  id="date_added">${value.dateAdded}</td>
                                                            <td  id="solution"><span class="badge badge-primary">Pending</span></td>
                                                            <td  id="dateRevieved">${assigned}</td>
                                                            <td  id="">${requestor}</td>
                                                            <td onclick="getChangeId(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                        </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                });

                // ading data to the table
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "1"
                    },
                    method :"POST",
                    success : (data)=>{
                        console.log("approved",data)
                        if(data){
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                            <td  id="id" scope=row>${value.employee}</td>
                                                            <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                            <td  id="dpt">${value.gdepartment}</td>
                                                            <td  id="date_added">${value.dateAdded}</td>
                                                            <td  id="solution"><span class="badge badge-success">Approved</span></td>
                                                            <td  id="dateRevieved">${assigned}</td>
                                                            <td  id="">${requestor}</td>
                                                            <td onclick="getChangeId(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                        </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
                // adding more data to the table
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "2"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("rejected",data)
                        if(data){
                            // console.log("data exists",data.length)
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                            <td  id="id" scope=row>${value.employee}</td>
                                                            <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                            <td  id="dpt">${value.typem}</td>
                                                            <td  id="date_added">${value.dateAdded}</td>
                                                            <td  id="solution"><span class="badge badge-danger">Rejected</span></td>
                                                            <td  id="dateRevieved">${assigned}</td>
                                                            <td  id="">${requestor}</td>
                                                            <td onclick="getChangeId(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                        </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
            });
        }else{
            // not admin && not gilbert or admin && not gilbert
            display.load(`${ htmlSubpath }project.html`,()=>{
                // setting users_id for the form
                $("#user_id").val(JSON.parse(sessionStorage.getItem("userLoggedIn")).id);
                getInfo("get_departments","",(data)=>{
                    let selectHandle = $("#issueType");
                    data.map( (value,index) =>{
                        selectHandle.append(` <option id=${value.name} value="${value.name}"> ${value.name} </option>`);
                    })
                });
                let form = $("#changeForm");
                $("#changeForm").on("submit",(e)=>{
                    e.preventDefault()
                    let thisForm = new FormData(form[0]);
                    fetch(process,{
                        method: 'POST',
                        body : thisForm
                    }).then( data =>{
                        // console.log(data);
                        $("#change").trigger("click");
                    });
                });
                let handle = $("#reportBody");

                // adding data to the database
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "0"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("not approved", data)
                        if(data){
                            data.map((value,index)=>{
                                // console.log("Pending ...",value)
                                // requestor
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                let dept = value.typem ? value.typem : "-----";
                                let dateAdded = value.dateAdded ? value.dateAdded : "------"
                                handle.append(`<tr>
                                                    <td  id="id" scope=row>${value.employee}</td>
                                                    <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                    <td  id="dpt">${dept}</td>
                                                    <td  id="date_added">${dateAdded}</td>
                                                    <td  id="solution"><span class="badge badge-primary">Pending</span></td>
                                                    <td  id="dateRevieved">${assigned}</td>
                                                    <td  id="dateRevieved">${requestor}</td>
                                                    <td onclick="getChangeIdNotAmdin(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                });
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "1"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("approved",data)
                        if(data){
                            // console.log("data exists",data.length)
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                    <td  id="id" scope=row>${value.employee}</td>
                                                    <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                    <td  id="dpt">${value.typem}</td>
                                                    <td  id="date_added">${value.dateAdded}</td>
                                                    <td  id="solution"><span class="badge badge-success">Approved</span></td>
                                                    <td  id="dateRevieved">${assigned}</td>
                                                     <td  id="dateRevieved">${requestor} </td>
                                                    <td onclick="getChangeIdNotAmdin(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
                $.ajax({
                    url : process,
                    data : {
                        category : "get_changes",
                        approved : "2"
                    },
                    method :"POST",
                    success : (data)=>{
                        // console.log("approved",data)
                        if(data){
                            // console.log("data exists",data.length)
                            data.map((value,index)=>{
                                let requestor = value.requestor ? value.requestor : "-----";
                                let assigned = value.assignee ? value.assignee : "Not Assigned"
                                handle.append(
                                    `<tr>
                                                    <td  id="id" scope=row>${value.employee}</td>
                                                    <td  id="email" >${value.description.substring(0,12)} ... </td>
                                                    <td  id="dpt">${value.typem}</td>
                                                    <td  id="date_added">${value.dateAdded}</td>
                                                    <td  id="solution"><span class="badge badge-danger">Rejected</span></td>
                                                    <td  id="dateRevieved">${assigned}</td>
                                                     <td  id="dateRevieved"> ${requestor} </td>
                                                    <td onclick="getChangeIdNotAmdin(this)" class="centeredButton" style='color: #09f;;' id="${value.id}"><i id="42" class="far fa-eye"></i></td>  
                                                </tr>`
                                )
                            })
                        }else{
                            // console.log("data does not exists")
                        }
                    },
                    error : (error)=>{
                        // console.log(error)
                    }
                })
            });
        }
    });
});
// dealing wth solutgetChangeIdNotAmdin(this)ions
$("#solution").on("click",(e)=>{
    display_header.html("Add Solution");
    currentPath.html("Solutions / Add Solution");
    // display.html("This is the Add Solution Section");
    display.load(`${ htmlSubpath }addSolution.html`,()=>{
    });
});

$("#viewSolution").on("click",(e)=>{
    display_header.html("View Solutions");
    currentPath.html("Solutions / View Solutions");
    display.load(`${ htmlSubpath }viewSolutions.html`,()=>{
        // show solutions 
        // make ana ajax call
        $.ajax({
            url: process,
            method: "POST",
            data: {
                category: "report",
                status : 2,
                period : "month",
                time : "2019-08-07"
            },
            beforeSend: ()=>{
                $("#spinner").show(); 
            },
            success: function (result) {
                if(result.length > 0){
                // get the table handle 
                let handle = $("#report");
                // mappiong begins
                result.map((data,index)=>{
                    // getting the status 
                    /** 
                     * all - 6
                     * new - 0
                     * assigned - 1 
                     * resolved - 2
                     * escalated - 5
                     * closed - 3
                    */
                    let issueId = data.ticket;
                    let requestor = data.email_from;
                    let subject = data.email_subject;
                    let dateRecieved =  new Date(data.email_date).toLocaleString("en-GB",{year: '2-digit', month: '2-digit', day: 'numeric',hour:"2-digit",minute: "2-digit"});
                    let assingedTo = (data.assignedTo ? data.assignedTo : '--------');
                    let assignedToDate = (data.assignmentTime ? new Date(data.assignmentTime).toLocaleString("en-GB",{year: '2-digit', month: '2-digit', day: 'numeric',hour:"2-digit",minute: "2-digit"}) : "--------");
                    let resolvedBy = (data.email_from ? data.email_from : "--------" );
                    let resolvedByDate = (data.completeTime ?  data.completeTime : "--------");
                    let closedByDate = (data.closureTime ? data.closureTime : "--------");
                    let solution = (data.solution ? data.solution : "--------");
                    let reason = (data.problem ? data.problem : "--------");

                    handle.append(
                        `<tr>
                            <th  id="id" scope=row>${issueId}</th>
                            <td  id="email" >${requestor}</td>
                            <td  id="issue">${subject}</td>
                            <td  id="dateRevieved">${dateRecieved}</td>
                            <td  id="solution">${unescape(solution)}</td>
                            <td  id="reason">${unescape(reason)}</td>
                        </tr>`);
                        // end map
                    });
                }else{
                    // generating reports
                }
                // end report gen
            },
            complete : ()=>{
                setTimeout(()=>{ $("#spinner").hide()} ,1000)
            }
        });
    });
});
$("#routine").on("click",(e)=>{
    display_header.html("Routines");
    currentPath.html("Solutions / Routunes");
        display.load(`${ htmlSubpath }routine.html`,()=>{
            $("#radio").click((e)=>{
                let thisId = parseInt(e.target.id);
                let handle = $("#endDateDiv");
                handle.hide();
                if(thisId){
                    handle.hide();
                }else{
                    handle.show();
                }
            });

            $("#addRoutineSubmit").on("click", e => {
                e.preventDefault();
                let formData = $("#addRoutine").serialize();

                items = formData.split("&");
                let title = items[0].split("=")[1];
                let condition = items[1].split("=")[1];
                let startDate = items[1].split("=")[1];
            });

        let start = new Date(),
        prevDay,
        startHours = 9;
        // 09:00 AM
        start.setHours(9);
        start.setMinutes(0);
        // If today is Saturday or Sunday set 10:00 AM
        if ([6, 0].indexOf(start.getDay()) !== -1) {
            start.setHours(10);
            startHours = 10
        }
        $('#startDate').datepicker({
            timepicker: true,
            language: 'en',
            startDate: start,
            minHours: startHours,
            maxHours: 18,
            position: "top left",
            onSelect: function (fd, d, picker) {
                // Do nothing if selection was cleared
                if (!d) return;

                var day = d.getDay();

                // Trigger only if date is changed
                if (prevDay !== undefined && prevDay === day) return;
                prevDay = day;

                // If chosen day is Saturday or Sunday when set
                // hour value for weekends, else restore defaults
                if (day === 6 || day === 0) {
                    picker.update({
                        minHours: 10,
                        maxHours: 16
                    })
                } else {
                    picker.update({
                        minHours: 9,
                        maxHours: 18
                    })
                }
            }
        });
        $('#endDate').datepicker({
            timepicker: true,
            language: 'en',
            startDate: start,
            minHours: startHours,
            maxHours: 18,
            position: "top left",
            onSelect: function (fd, d, picker) {
                // Do nothing if selection was cleared
                if (!d) return;

                var day = d.getDay();

                // Trigger only if date is changed
                if (prevDay != undefined && prevDay == day) return;
                prevDay = day;

                // If chosen day is Saturday or Sunday when set
                // hour value for weekends, else restore defaults
                if (day == 6 || day == 0) {
                    picker.update({
                        minHours: 10,
                        maxHours: 16
                    })
                } else {
                    picker.update({
                        minHours: 9,
                        maxHours: 18
                    })
                }
            }
        })
        });
});
// daily Routines
$("#addMember").on("click",(e)=>{
    display_header.html("Add Members");
    currentPath.html("Members/Add Members");
    display.load(`${ htmlSubpath }addUser.html`,()=>{
        // gettig the userDepartments
        getJson("get_departments",(data)=>{
            let optionHandle = $("#userDept");
            data.map((value,index)=>{
                optionHandle.append(`<option value="${value.id}">${value.name}</option>`);
            });
        });

        $("#addUserSubmit").on("click", e => {
            e.preventDefault();
            let formData = $("#adduserForm").serialize();
            items = formData.split("&");
            let firstname = items[0].split("=")[1];
            let lastname = items[1].split("=")[1];
            let name = (firstname)+" "+(lastname);
            let email = (items[2].split("=")[1].replace("%40","@"));
            let phone = (items[3].split("=")[1]);
            let userDept = (items[4].split("=")[1]);
            let userType = (items[5].split("=")[1]);
            if(firstname.length > 0 && lastname.length > 0 && email.length > 0 && phone.length > 0){
                if(phone.length === 10){
                    // phone number valid
                    if(validateEmail(email)){
                        //    valid email
                        // all data is valid
                        //    we are going to make an ajax request to the back end
                        if(userDept == "null"){
                            swal.fire({
                                type : "error",
                                title : "Invalid Department!",
                                text : "Please Select A Department.",
                                timer : 5000,
                                allowOutsideClick : false
                            })
                        }else{
                            $.ajax({
                                url: process,
                                method: "POST",
                                data: {
                                    category: "add_employee",
                                    name : name,
                                    email : email,
                                    phone : phone,
                                    role  : parseInt(userType)
                                },
                                success: function (result) {
                                    Swal.fire({
                                        type: 'success',
                                        title: 'Success!',
                                        text: 'UserAddedd SuccessFully!',
                                        timer: 5000
                                    });
                                },
                                error : (jqXHR,textStatus,errorThrown)=>{
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Error!',
                                        text: 'User Already Exists!',
                                        timer: 5000
                                    });
                                }
                            });
                        }
                    }else{
                    //    invalid email
                        swal.fire({
                            type : "error",
                            title : "Email Invalid",
                            text : "Valid Email Required",
                            timer : 5000,
                            allowOutsideClick : false
                        })
                    }
                }else{
                    // phone is invalid
                    swal.fire({
                        type : "error",
                        title : "Phone Number Invalid",
                        text : "Valid Phone Number Required",
                        timer : 5000,
                        allowOutsideClick : false
                    })
                }
            }else{
                swal.fire({
                    type : "error",
                    title : "Data Invalid",
                    text : "All Fields Are Required",
                    timer : 5000000,
                    allowOutsideClick : false,
                    background : "#fff"
                })
            }
        });
        
    });
});
$("#removeMember").on("click",(e)=>{
    display_header.html("Remove Members");
    currentPath.html("Members / Manage Members");
    getJson("get_employees",(data)=>{
    if(data.length){
            display.load(`${ htmlSubpath }users.html`,()=>{
                let tableHandle = $("#adminTableBody");
                        data.map(item => {
                            tableHandle.append(`<tr>
                            <th  id="id" scope=row>${item.id}</th>
                            <td  id="email" >${unescape(item.email)}</td>
                            <td  id="name">${unescape(item.name)}</td>
                            <td  id="phone">${unescape(item.phone)}</td>
                            <td   class="btn btn-link btn-sm col links" onclick="manageUser(this)" id='${item.id}'>Manage User</td>
                            </tr>`);
                        });  
        });
            }else{
                display.load(`${ htmlSubpath }notFound.html`,()=>{
                })
            }
        });
});
$("#backups").on("click",(e)=>{
    display_header.html("Backups");
    currentPath.html("Tools / Backups");
    display.load(`${ htmlSubpath }backups.html`,()=>{
        // console.log("backups")
        populate_backups();
    });
});
$("#logout").on("click",(e)=>{
    $.ajax({
        url : "./partials/proc2.php",
        data : {
            logout : true
        },
        method : "POST",
        beforeSend : ()=>{
            $("#spinner").show();
        },
        success : (data)=>{
            let logoutData = JSON.parse(data);
            if(logoutData.message === 200){
               setTimeout(()=>{
                sessionStorage.clear()
                 window.location.href = "login.php";
               },1000)
            }
        },
        complete : ()=>{
            setTimeout(()=>{ $("#spinner").hide()},1000)
        }
    })
})
// back button  styling 
// back
$("#back").on("click",()=>{
    //  get the clicked class 
    let currentElement = $(".clicked").attr("id");
    $(`#${currentElement}`).trigger("click")
})
// ::SIDEBAR
// adding a toggle class for item sidebar
let items = $(".item");
// resetting the clicked elements due to the none iconed elements
items.click(e => {
    $( "#overview" ).removeClass("clicked");
    $( "div.item" ).each(function (index){
            if($(this).find("img").attr("src").split("/")[2].split("_").length === 2){
                // has the filename
                let path = $(this).find("img").attr("src").split("/")[2].split("_")[0];
                $(this).find("img").attr("src","./images/"+path+".png");
            }
    });

    // checking if the class exists
    $( "div.item" ).each(function (index){
        $(this).removeClass("clicked");
        $(this).removeClass("hovered");
    });

    let this_id = $(e.target);
    this_id.toggleClass("clicked");
    let fileName = this_id.find("img").attr("src").split("/")[2].split(".")[0];

    let newPath = "./images/"+fileName+"_clicked.png";
    // resetting the elements once more due to the iconed elements
    $( "div.item" ).each(function (index){
            if($(this).find("img").attr("src").split("/")[2].split("_").length === 2){
                // has the filename
                let path = $(this).find("img").attr("src").split("/")[2].split("_")[0];
                $(this).find("img").attr("src","./images/"+path+".png");
            }
    });
    // adding the clicked class and changing the image location path
    if(this_id.hasClass("clicked")){
        let fileName = this_id.find("img").attr("src");
        if(this_id.find("img").attr("src").split("/")[2].split(".")[0].split("_").length === 1) {
            this_id.find("img").attr("src",newPath);
        }
    }
});

$("#asset").on("click",()=>{
    display.load(`${ htmlSubpath }asset_verify.html`, () => {
        $("#section").html("")
        $("#location").html("")
        let user = JSON.parse(sessionStorage.getItem("userLoggedIn"))
        
        $("#user_email").html(user.email)
        $("#btn_asset").on("click",()=>{
            let password = $("#inputPassword").val();
            // console.log(user.email, password)
            // make a request to the database
            $.ajax({
                url: `http://${address}:4800/admins/login`,
                method : "POST",
                data : {
                    "username": user.email,
                    "password": password

                },beforeSend : ()=>{
                    // console.log("loading ...")
                },
                success : (data) =>{
                    // console.log("Data ... ",data)
                    // log the data form the backend
                    if(data){
                        if(data.jwt){
                            sessionStorage.setItem("userSessionData",JSON.stringify(data));
                            setTimeout(()=>{
                                // "http://192.168.12.200:81/asset/"
                                window.location.href = "http://192.168.12.200:81/asset/";
                            },500)
                        }
                    }
                },
                error : ()=>{
                    notify(0)
                }

            })
        })
    });
})


const notify = (msg) => {
    if (msg === 0) {
        // error
        swal.fire({
            type: "error",
            title: "error",
            text: "An error Occcured.",
            timer: 4000,
            allowOutsideClick: false,
            showConfirmButton: true
        });
    } else if (msg == 1) {
        //  success
        swal.fire({
            type: "success",
            title: "Success",
            text: "Action performed Successfully.",
            timer: 4000,
            allowOutsideClick: false,
            showConfirmButton: true
        });
    } else if (msg === 2) {
        // info
        swal.fire({
            type: "info",
            title: "Warning",
            text: "Double Check Everything. Then Try Again.",
            timer: 4000,
            allowOutsideClick: false,
            showConfirmButton: true
        });
    }
}

// change reports
const changeReports = ()=>{
    let tableData = $("#report")
    let body = $("#reportBody").html()
    if (body.trim()){
        console.log(tableData)
        let name = `Change management Report ${new Date().toLocaleString()}`;
        //  excel gen
        excel = new ExcelGen({
            "src_id": "report",
            "show_header": true,
            "format": "xlsx",
        });

        excel.generate(name);
    }else{
        Swal.fire({
            type: 'error',
            title: 'Error!',
            text: 'Cannot Export An Empty Form!',
            timer: 15000
        });
    }

}

const  backupRequest = () =>{
    // console.log("request");
    $.ajax({
        url: "./backup.php",
        method : "POST",
        data : {backup : true},
        beforeSend : ()=>{
            // show spinner
            console.log("here we are ... ")
            $("#progress").show();
            $("#generate").hide();
            $("#notify").html("<button class=\"btn mb-3 btn-info btn-sm\" disabled>BackUp in progress ...</button>");
        },
        success : (data) =>{
            console.log(data);

            let handle = $("#notify");
            if(data){
                if(data.res === 1111 && data.affectRows === 1){
                    console.log("successs")
                    // success
                    $msg = `<button class="btn mb-3 btn-success btn-sm" disabled>Backup performed successfully. size : ${Math.round(parseInt(data.filesize)/(1024*1024))} MegaBytes</button>`;
                    // make ajax call. for the sidebar 
                    populate_backups()
                    
                }else if(data.res === 2222){
                    // error
                    $msg = `<button class="btn mb-3 btn-warning btn-sm" disabled>Error Occured! Backup Failed</button>`
                }else{
                    //error
                    $msg = `<button class="btn mb-3 btn-warning btn-sm" disabled>Error Occured! Backup Failed</button>`
                }
            }
            handle.html($msg);
            populate_backups();
            $("#generate").show();
            // hide spinner
            $("#progress").hide()
            $("#generate").prop("disabled",false)
        },
        error : (error,jqXHR)=>{
            // console.log(error,jqXHR)
        }

    })
}

const populate_backups = () =>{
    $.ajax({
        url : "./backup.php",
        method : "POST",
        data : {all_backups : true},
        beforeSend : ()=>{
            // show loader
            $("#progress").show();
        },
        success : (data) =>{
            // console.log(data);
            // put data if data else empty
            handle = $("#previous_backups");
            let msg = "";
            data.map((item,index)=>{
                console.log(item)
                let status = "";
                if(parseInt(item.status) === 1){
                    status = `<span id="type">MANUAL</span>`;
                }else{
                    status = `<span id="type" style="color:purple;">AUTOMATIC</span>`;
                }
                msg += ` <!-- card -->
                        <div class="row" id="mini-card">
                            <div class="col-lg-10">
                                <p class='card-subtitle mb-2 text-muted'>${item.name} — <span class='card-subtitle mb-2 prop'>${Math.round(item.size/(1024*1024))} Mb</span> • ${status} </p>
                                
                            </div>
                            <div class="col-lg-2"><a href="./Backups/${item.name}"><img id="${item.id}"src="./images/download.png" alt="Backup Icon" height="25" onclick="downloadBack(this)"></a></div>
                        </div><br>
                        <!-- end card -->`
            })
            handle.html(msg);
        },
        complete : ()=>{
            // hide loader
            $("#progress").hide();

        },
        error : () =>{
            // get backup list handle the add error occured
            $("#progress").hide();
        }
    })
}



setTimeout(()=>{
    $("#home2").trigger("click")
    $("#home-tab").trigger("click")
},1000)



const tabOut = (me) => {
    let id = me.id;
    if(id){
        if(Number(id) === 1){
            console.log("Active Tracts")
            addToTabs(`active tracks`)
        }else if( Number(id) === 2){
            console.log("Create Tracts")
            addToTabs(`
<br>
                        <h6>Create A Task</h6>
                        <form id="project" style="width:900px">
    <div class="addDept">
        
    <p></p><p></p>
    <!-- userid -->
    <h6>Who are you creating a task for ? </h6>
    <div class="form-group row">
        <div class="col-lg-5">
          <label for="firstname">Firstname</label>
          <input type="text" id='firstname' class="form-control form-control-sm" name="firstname" placeholder='John'>
          <small class="form-text text-muted"></small>
        </div>

        <div class="col-lg-5">
          <label for="lastname">Lastname</label>
          <input type="text" id='lastname' class="form-control form-control-sm" name="lastname" placeholder='Doe'>
          <small class="form-text text-muted"></small>
        </div>
    </div>
    <!-- password -->
    <div class="form-group row">
      <!-- email -->
        <div class="col-lg-5">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="john.doe@cargen.com" class="form-control form-control-sm ">
        </div>
        
        <!-- phone -->
        <div class="col-lg-5">
            <label for="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" placeholder="0712345678" class="form-control form-control-sm">
        </div>



    </div>
    <!-- password -->
    <div class='form-group'>
      <label for='reason'>Comment/Description</label>
      <h6 class='card-subtitle mb-2 text-muted'>Provide a short description for the task</h6>
      <textarea class='form-control col-lg-10' name='description' id='reason'   rows='3' required></textarea>
    </div>

    <!-- buttons -->
    <button class="btn btn-sm btn-primary offset-lg-3 col-lg-4" type="button" id="addTask">Add Task To Track</button>
</form>
                        

                `)
        }else if(Number(id) === 3){
            console.log("Active Tracts")
            addToTabs(`history`)
        }
    }
}



const addToTabs = (data) => {
    $("#myTabContent2").html(data)
}


