// localhost:8080/support/
let link = "192.168.12.200:81/";
// let link = "localhost:8080/support";
const tkn = JSON.parse(sessionStorage.getItem("userSessionData"));
const user_data = JSON.parse(sessionStorage.getItem("userLoggedIn"))
if (sessionStorage.getItem("userSessionData") === "null" || sessionStorage.getItem("userSessionData") === "" || sessionStorage.getItem("userSessionData") === null) {
     window.location.href = `http://${link}`
}
// && user_data.email === tkn.email && user_data.role === 1
if (!(tkn && parseInt(user_data.role) === 1) && !(user_data.email === tkn.username)) {
    window.location.href = `http://${link}`
}
// global vars 
let address = "192.168.12.200";
// let address = "localhost";
let htmlSubpath = "./partials/html/";

token = tkn.jwt;
// function to change the flag a we swap the select
let country = $("#country");
let branch = $("#branch");



// adding tooltips to the html pages
$(function () {
$('[data-toggle="tooltip"]').tooltip()
});
// end tooltip

country.on("change",(e)=>{
    $('#flag').attr('src', './images/flags/' + $("#country").val() + ".png");
    let country = $("#country").val();
    let sessionCountryBranch = sessionStorage.getItem("countryBranch")
    if(sessionCountryBranch){
        sessionCountryBranch = JSON.parse(sessionCountryBranch)
        if(sessionCountryBranch[country]){
            branch.html("");
            branch.append(`<option value="null" selected >Branch</option>`);
            sessionCountryBranch[country].map((value,index)=>{
                branch.append(`<option value="${value.id}">${value.branch}</option>`)
            })
        }else{
        }
    }
})

fetch(`http://${address}:4800/branches`,{
    headers: { "Authorization": `Bearer ${token}` }
}).then( data => data.json() )
.then( data => {
    sessionStorage.setItem("countryBranch",JSON.stringify(data));
    let country_data="";
    Object.keys(data).map((key) => {
        // map thur the array 
        country_data += `<option value="${key}">${key}</option>`
    })
    country.append(country_data);
})

// getting flag data
$.ajax({
    url: "./partials/login.php",
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    data: {
        session_id: true,
    },
    success: function (result) {
        // get the country and branches avaible
        // json_parse it
        let country_branch = JSON.parse(result);
        //get the handle to the create the handle
        let country = $("#country");
        // we are going to loop thru the data
        $.each(country_branch,(index,value)=>{
            
        })
    }
});

// working with the coutires select boxes
function displayVals() {
            var singleValues = $("#country").val();
            var branch ='';
            if(singleValues == "null"){
                let infoButton = $("#flag");
                var branch = $("#branch");
                infoButton.attr("data-toggle","tooltip");
                infoButton.attr("title","Flags Show here");
                branch.attr('disabled', 'disabled');
                branch.css('color', '#bababa');
            }else{
                var branch = $("#branch").removeAttr("disabled");
                $("#flag").removeAttr("data-original-title");
                $("#flag").removeAttr("title");
            }
            if(singleValues != "null"){
                branch.css('color', '#000000');
            }
            // getting the attr
            let branch_button_attr = $('#dropUnit').is(':disabled');
}

$("#country").change(displayVals);
displayVals();


// adding event listeners for nav items
// grabbing the display section
let display_header = $("#theDisplay");
let display = $("#display");

// listen for a click event
// if clicked we should warn the user to select a branch
// get the sidebar

let currentBranch  = $("#branch").val();
let currentCountry = $("#country").val();

//function to deal with adding the items form the page
// make scalleds to the back end
function loadItem(cat, thisBranch, thisCountry){
    $.ajax({
        url: "./partials/proc.php",
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        data: {
            category: {
                selected : cat,
                country : thisCountry,
                branch : thisBranch
            }

        },
        success: function (result) {
            // let data = JSON.parse(result);
            //get the handle to append the file to
            display.html(result);
        }
    });
}
//modal styling
var modal = document.getElementById("myModal");

var popup = document.getElementById("popup");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var popClose = document.getElementById("closePop");

// // When the user clicks on the button, open the modal
const show = ()=>{
    modal.style.display = "block";
}


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
$('#userId').datepicker({
    timepicker: true,
    language: 'en',
    startDate: start,
    minHours: startHours,
    maxHours: 18,
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

// // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

popClose.onclick = function() {
    popup.style.display = "none";
};

const picker =  handle => {
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
    $(`#${handle}`).datepicker({
        language: 'en',
        startDate: start,
        autoClose: true,
        view: "years",
        maxDate: start,
        dataView: "months",
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
}

const getItem = (id)=>{
    return document.querySelector(`#${id}`)
}
// get value
const value = data =>  { return data.split("=")[1]; }

const modalMountData = (data)=>{
    //  get the elements from the dom
    let sn = getItem("modal_sn");
    let color = getItem("modal_color");
    let branch = getItem("modal_branch");
    let country = getItem("modal_country");
    let id = getItem("modal_id");
    let warranty = getItem("modal_warranty");
    let model = getItem("modal_model");
    let dop = getItem("modal_date");
    let supplier = getItem("modal_supplier");
    let category = getItem("modal_category");
    let manufacturer = getItem("modal_manu");
    let value = getItem("modal_val");
    let processor = getItem("modal_proc");
    let screenSIze = getItem("modal_screen")
    let disk = getItem("modal_dskcapacity");
    let attachments = getItem("modal_attachments");
    
    manufacturer.innerHTML = data.manufacturer;
    category.innerHTML = data.Category.name;
    supplier.innerHTML = data.supplier;
    sn.innerHTML = data.serial_number;
    color.innerHTML = data.Branch.branch;
    branch.innerHTML = data.Branch.branch;
    country.innerHTML = data.Branch.country;
    id.innerHTML = data.code;
    warranty.innerHTML = `${data.warranty_years} Year(s) ${data.warranty_months} Month(s)`;
    model.innerHTML = data.model;
    value.innerHTML = data.value;
    processor.innerHTML = data.processor;
    disk.innerHTML = data.disk_capacity;
    dop.innerHTML = moment(data.purchase_date).format("YYYY-MM-DD");
    screenSIze.innerHTML = data.screen_size;
    let attachmentFiles = data.Assetattachments;
    if (Array.isArray(attachmentFiles) && attachmentFiles.length > 0){
        if(attachmentFiles.length > 1){
            let data ='';
            attachmentFiles.map((value,index)=>{
                data += `<span><a href="./files/${value.attachment}" target="_blank">${value.attachment.substring(0, 7)}</a></span>&nbsp; &nbsp;`
            })
            attachments.innerHTML = data;
        }else{
            attachments.innerHTML = `<a href="./files/${data.Assetattachments[0].attachment}" target="_blank" >${data.Assetattachments[0].attachment.substring(0, 7)}</a><br>`
        }
    }// attachments
}
let staffNumberHandle = $("#staffNumber");
let listHandle = $("#staffNumberList");
const getStaffNumber = (me) =>{
    fetch(`http://${address}:4800/users/staffnumber/${me.value}`,{
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then( data => data.json() )
    .then( data => {
        if(data){
            $("#staffNumberList").html("");
            $("#staffNumberList").append(`<option value="${data.staff_number}">${data.name}</option>`)
        }else{
            $("#staffNumberList").html("");
            $("#staffNumberList").append(`<option style='color:#f00;' value="${me.value}">User Does Not Exist.</option>`)
        }
    })
}

const getstaffNumberUsers = (me) =>{
    fetch(`http://${address}:4800/users/staffnumber/${me.value}`,{
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(data => data.json())
    .then(data => {
        if (data) {
            $("#infoMessages").html("Not Available");
        } else {
            $("#infoMessages").html("Avaliable");
        }
    })
}

// we have valid branch
// add item
$("#add").on("click",(e)=>{
    //staff number handle 
    // end search
    display_header.html("Add Item");
    // ajax funtion whose response is the
    // we are going to return html.
    display.load(`${ htmlSubpath }add.html`,()=>{
        // populate the form 
        getData("GET",`http://${address}:4800/categories`,"",(data)=>{
            let handle = $("#category");
            data.map((value,key)=>{
                handle.append(`<option value="${value.id}">${value.name}</option>`)
            })
        })

        // getting the countries 
        getData("GET",`http://${address}:4800/branches`,"",(data)=>{
            let handle = $("#location")
            // getting all the countries 
            let str = "";
            Object.keys(data).map((key) => {
                // map thur the array 
                str += `<optgroup label="${key}">`
                data[key].map((value,key)=>{
                    str += `<option value='${value.id}'>${value.branch}</option>`
                })
                str += "</optgroup>"
            })
            handle.append(str);
        })

        //load the date picker
        picker("purchase_date")
        picker("warrantyExpires")
        
        let form = $("#addItem");
        form.on("submit",(e)=>{
            e.preventDefault();
            let thisForm = new FormData(form[0]);
            fetch(`http://${address}:4800/assets`,{
                method: 'POST',
                body : thisForm,
                headers: { "Authorization": `Bearer ${token}` }
            }).then( data => { 
                    if(parseInt(data.status) === 201){
                        swal.fire({
                            type: "success",
                            title: "Success",
                            text: "Data Added Successfully.",
                            timer: 4000,
                            allowOutsideClick: false,
                            showConfirmButton: false
                        });
                        setTimeout(() => {
                            $("#add").trigger("click");
                        },2000)
                        
                    }else{
                        swal.fire({
                            type: "error",
                            title: "error",
                            text: "Error.",
                            timer: 1500,
                            allowOutsideClick: false,
                            showConfirmButton: false
                        })
                    }          
            });
        })
    })
});


const getData = (method,endpoint,data={},handler,errorHandler=[]) => {
    $.ajax({
        url : endpoint,
        method : method,
        data : data,
        headers: { "Authorization": `Bearer ${token}` },
        beforeSend : (xhr)=>{
        },
        success : (data)=>{
            handler(data)
        },
        error : (error,jqXHR)=>{
            errorHandler(error)
        }
    })
}
// store
$("#store").on("click",(e)=>{
    display_header.html("Assets");
    display.load(`${ htmlSubpath }stock.html`,()=>{
        //getting the items
        branch.on("change", () => {
            let data = getOptionStatus();
            getStoreData(data.country, data.branch);
        });

        country.on("change", () => {
            getOptionStatus()
            let data = getOptionStatus();
            getStoreData(data.country, data.branch);
        });

        const getStoreData = (cntry, brnch) => {
            let country = cntry.toLowerCase();
            if (cntry === "null" && brnch === "Branch" || cntry === "null" && brnch === "null" ) {
                
                getData("GET", `http://${address}:4800/assets`, "", (data) => {
                    mountStoreData(data)
                    // checking if any of the catogories are set
                    // getting the subNav events 
                    $(".subNav").on("click", (e) => {
                        var count = -1;
                        var boxes = $('.subNav');
                        var boxLength = boxes.length - 1;
                        //Check if the actual item isn't more than the length then add 1 otherway restart to 0
                        count < boxLength ? count++ : count = 0;
                        boxes.removeClass('active').eq(count);
                        
                        
                        let id = e.target.id;
                        if(id){
                            $(`#${id}`).addClass("active");
                            // make the id request
                            getData("GET", `http://${address}:4800/assets/${id}`, "", (data) => {
                                mountStoreData(data)
                            })
                        }
                    })
                })
                
            } else if (cntry !== "null" && brnch === "Branch" || cntry !== "null" && brnch === "null" ) {
                getData("GET", `http://${address}:4800/assets/country/${country}`, "", (data) => {
                    mountStoreData(data)
                })
            } else if (cntry !== "null" && brnch !== "Branch") {
                getData("GET", `http://${address}:4800/assets/branch/${brnch}`, "", (data) => {
                    mountStoreData(data)
                })
            }
        }
        // first runn : to feed the form
        getOptionStatus()
        let data = getOptionStatus();
        getStoreData(data.country, data.branch);
        // end first run
    })
});

/**
 * 
 * @param {string} data 
 * mounts data to the DOM
 */



const mountStoreData = (data) =>{
    let handle = $("#reportBody");
    handle.html("");
    $("#report").show();
    $("#filter").show()
    $("#userMessages").html("");
    if(data.length > 0){
        data.map((value, key) => {
            let id = value.id;
            let kind = value.Category.name;
            let code = value.code;
            let location = `${value.Branch.branch}, ${value.Branch.code}`;
            let manufacturer = value.manufacturer;
            let model = value.model;
            let serialNumber = value.serial_number;
            let supplier = value.supplier;
            let warrantyMonths = value.warranty_months;
            let warrantyYears = value.warranty_years;
            let warranty = `${warrantyYears} Yrs ${warrantyMonths} Mths`
            let specs = `<b> ${value.processor}, ${value.screen_size}, ${value.disk_capacity}</b>`
            //  appending to the dom
            handle.append(
                `<tr class="asset" onclick="getModalData(this)" id="${id}">
                    <th data-id="${id}">${code.toUpperCase()}</th>
                    <td data-id="${id}">${serialNumber.toUpperCase()}</td>
                    <td data-id="${id}">${manufacturer}</td>
                    <td data-id="${id}">${model}</td>
                    <td data-id="${id}">${specs}</td>
                    <td data-id="${id}">${location}</td>
                    <td data-id="${id}">${kind}</td>
                    <td data-id="${id}">${supplier}</td>
                    <td data-id="${id}">${warranty}</td>
                </tr>`)
        })
    } else {
        loadNoDataPage()
    }
}
// utilities ----- 
const loadNoDataPage = () =>{
    let handle = $("#userMessages");
    // hide report form 
    $("#report").hide()
    $("#filter").hide()
    handle.load(`${htmlSubpath}notFound.html`)
}

const getOptionStatus = () => {
    //    get the inputs values
    let country = $("#country").val();
    let branch = $("#branch").val();
    let data = {
        country: country,
        branch: branch
    }
    return data;
}
// end utilities -----
// end store 
const getModalData = (me) => {
    fetch(`http://${address}:4800/assets/${me.id}`,
    {headers: { "Authorization": `Bearer ${token}` }})
    .then(data => data.json())
    .then(data =>{
        show();
        modalMountData(data);
        if (data.disposed === true) {
        }
        sessionStorage.setItem("thisItem","")
        // adding item data to the session
        sessionStorage.setItem("thisItem",JSON.stringify(data))
        // end edit
    })
    .catch(error =>{

    })
}
// model edits
$('#moreInfo').on("click", () => {
    pop();
    loadModal("moreInfo");
    // get the current item in the sessionStorage 
    let id   = getAssetId();
    getData("GET", `http://${address}:4800/assets/${id}`, "", (data) => {
        let info = data.Assetrepairs;
        if (Array.isArray(info) && info.length > 0){
            getData("GET", `http://${address}:4800/assets/${info[0].asset_id}`, "", assetInfo => {
                let handle = $("#tableBody");
                info.map((value, index) => {
                    let code = assetInfo.code;
                    let serial = assetInfo.serial_number;
                    let make = assetInfo.manufacturer;
                    let model = assetInfo.model;
                    let repairDate = info[index].createdAt;
                    let cost = info[index].cost;
                    let warranty = assetInfo.warranty_expiry_date;
                    let supplier = assetInfo.supplier

                    handle.append(`<tr>
                                <td  id='code' >${code}</td>
                                <td  id='supplier' >${supplier}</td>
                                <td  id='serial' >${serial}</td>
                                <td  id='make' >${make}</td>
                                <td  id='model' >${model}</td>
                                <td  id='repairdate' >${repairDate}</td>
                                <td  id='value' >${cost}</td>
                                <td  id='cost' >${cost}</td>

                            </tr>`);
                })
            })
        }else{  
            // no repairs for his item
            $("#modalHandle").innerHTML = "Not Items here";
        }
    })
});
// end modal edits 

$(".modal-btn").on("click", () => {
})

$("#return").on("click", () => {
    pop();
    loadModal("return");
})

$('#dispose').on("click", () => {
    pop();
    loadModal("dispose")
})
// start repair
$('#repair').on("click", () => {
    pop();
    loadModal("repair")

});
// end repair
// start edit
$("#edit").on("click", () => {
    pop();
    loadModal("edit")
getData("GET", `http://${address}:4800/categories`, "", (data) => {
    let handle = $("#pop_category");
    data.map((value, key) => {
        handle.append(`<option value="${value.id}">${value.name}</option>`)
    })
}, (error) => {
})

// getting the countries
getData("GET", `http://${address}:4800/branches`, "", (data) => {
    let handle = $("#pop_location")
    // getting all the countries
    let str = "";
    Object.keys(data).map((key) => {
        // map thur the array
        str += `<optgroup label="${key}">`
        data[key].map((value, key) => {
            str += `<option value='${value.id}'>${value.branch}</option>`
        })
        str += "</optgroup>"
    })
    handle.append(str);
}, (error) => {
})

    //load the date picker
    picker("purchase_date")
    picker("warrantyExpires")

    let form = $("#addItem");
    form.on("submit", (e) => {
        e.preventDefault();
        let thisForm = new FormData(form[0]);
        fetch(`http://${address}:4800/assets`, {
            method: 'POST',
            body: thisForm,
            headers: { "Authorization": `Bearer ${token}` }
        });
    })

})
const getAssetId = () =>{
    let item = sessionStorage.getItem("thisItem");
    let id = JSON.parse(item).id;
    return id;
}
// end edit 
// reallocate 
$("#reallocated").on("click", () => {
    pop()
    loadModal("reallocate");
    getData("GET", `http://${address}:4800/users`, "", (data) => {
        let handle = $("#userId");
        data.map((value, key) => {
            handle.append(`<option value="${value.id}">${value.name}</option>`)
        })
    })    
})
// end reallocate
// testing ... 
$(".asset").on("click",(e)=>{
    show();
    let id = e.target.getAttribute("data-id")
    //    filling up the modal with data
    //    get the data fror the server
    
})
// ?testing  ...
// assigned info 
$("#assignedInfo").on("click", () => {
    pop()
    loadModal("assignedInfo");
})
// assigned info end
$("#track").on("click",()=>{
    display_header.html("Track Assets");
    display.load(`${ htmlSubpath }track.html`,()=>{
    })
})
//leased
$("#leased").on("click",(e)=>{
    display_header.html("Leased Item");
    // we are going to send the dept and country
    display.load(`${ htmlSubpath }leased.html`,()=>{

    })
});

function pop(){
    popup.style.display = "block"
}
// function load_context to the modal
function loadModal(context){
    $("#modalHandle").load(`./partials/html/modals/${context}.html`)
}

const  settingModal = (context) => {
    $("#pop").load(`./partials/html/modals/${context}.html`)
}

// track items
$("#settings").on("click",(e)=>{
    display_header.html("Other Actions");
    // we are going to send the dept and country
    display.load(`${ htmlSubpath }settings.html`,()=>{
        var setModal = document.getElementById("setModal");
        const showSetModal  = ()=>{
            setModal.style.display = "block";
        }
        const hidesetModal = () =>{
            setModal.style.display = "none";
        }

        $("#modifySettings").on("click",()=>{
            showSetModal();
            $("#pop").load(`./partials/html/modals/countryBranch.html`);
            setTimeout(()=>{
                getBranch()
            },200)
            $(".close").on("click",()=>{hidesetModal()});

        })

        $("#policyOptions").on("click",()=>{
            showSetModal();
            settingModal("page");
            $("#pop").load(`./partials/html/modals/policy.html`)
            $(".close").on("click",()=>{hidesetModal()});
        })


        $("#viewMore").on("click",()=>{
            showSetModal();
            $("#pop").load(`./partials/html/modals/addUser.html`);
            $(".close").on("click",()=>{hidesetModal()});
            getAllAdmins();
        })

        $("#users").on("click", () => {
            showSetModal();
            $("#pop").load(`./partials/html/modals/users.html`);
            $(".close").on("click", () => { hidesetModal() });
            getUsers();
            userDepts();
            
        })

        // ManageDepartments
        $("#ManageDepartments").on("click", () => {
            showSetModal();
            $("#pop").load(`./partials/html/modals/manageDept.html`);
            updateDeptData();
            $(".close").on("click", () => { hidesetModal() });
        })
    })
});

// users handlers
const getUsers = () =>{
        getData("GET", `http://${address}:4800/users`, "", (data) => {
            let handle = $("#tableBody")
            // handle.html("");
            if (Array.isArray(data) && data.length > 0) {
                data.map((value, index) => {
                    handle.append(`
                    <tr class="user" id="${value.id}">
                        <th data-id="${value.id}">${index + 1}</th>
                        <td data-id="${value.id}">${value.id}</td>
                        <td data-id="${value.id}">${value.name}</td>
                        <td data-id="${value.id}">${value.email}</td>
                        <td data-id="${value.id}">${value.department_id}</td>
                        <td data-id="${value.id}">${value.createdAt}</td>
                    </tr>`)
                })
            } else {
                // empty array
            }
        }, (error) => {
        })
}

const userDepts = () =>{
    // get data 
    getData("GET", `http://${address}:4800/departments`, "", (data) => {
        let handle = $("#department");
        data.map((value, key) => {
            handle.append(`<option value="${value.id}">${value.name}</option>`)
        })
    }) 
}

const addUser = () =>{
    // check if all creds are filled
    let names = ` ${getItem("firstname").value} ${getItem("lastname").value}` 
    let staffNumber = getItem("staffNumberList").value;
    let dept = getItem("department").value
    let designation = getItem("designation").value;
    let email = getItem("email").value;
    // if true post data else  request the are fields
    if (email.length > 0 && designation.length > 0 && dept.length > 0 && staffNumber.length > 0 && names.length > 0){
        getData("POST",`http://${address}:4800/users`,{
                name : names,
                staff_number: staffNumber,
                email : email,
                department_id : dept
        },(data)=>{
            notify(1)
            getUsers()
        },(error)=>{
            notify(2)
        })
    }else{ 
        notify(2)
    }
}


// add dept handlers
const checkDept = (me) =>{
    let deptErrors = $("#deptMessages");
    let handle = $("#deptName")

    if (handle.val().length > 1){
        deptErrors.html("")
        fetch(`http://${address}:4800/departments`,{
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(data => data.json())
        .then(data => {
            // get depts
            data.map( (value,index)=>{
                if(value.name === handle.val()){
                    deptErrors.html("Departments With Such Name Exists.")
                }
            })
        })
    }else{
        deptErrors.html("Name Too Small.")
    }
}


const addDept = () => {
    let handle = $("#deptName")
    if(handle.val().length > 1){
        $.ajax({
            url: `http://${address}:4800/departments`,
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            data: {
                name: handle.val()
            },
            success: (data) => {
                notify(1)
                updateDeptData();
                dismissModal();
            },
            error: (error) => {
                notify(0)
            }
        })


    }else { 
        deptErrors.html("Name Too Small.")
    }
}
// adding the dept

//  function to update user data like the for depts
const updateDeptData = (error=[]) => { 
    fetch(`http://${address}:4800/departments`,{
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then( data => data.json() )
    .then( data => {
        // get dom handle 
        let handle = $("#tableBody");
        handle.html("")
        if(Array.isArray(data) && data.length >0 ){
            data.map((value, index) => {
                handle.append(
                    `<tr class="asset" id="${value.id}">
                    <th data-id="${value.id}">${index + 1}</th>
                    <td data-id="${value.id}">${value.id}</td>
                    <td data-id="${value.id}">${value.name}</td>
                    <td data-action="edit"><span id="${value.id}"class="btn btn-warning btn-sm btn-font" onclick="editDept(this)">Edit</span></td>
                    <td data-action="delete"><span id="${value.id}"class="btn btn-danger btn-sm btn-font" onclick="deleteDept(this)">Delete</span></td>
                </tr>`
                )
            })
        }else{
            handle.append(`<tr class="asset">
                    <th >Sorry, No Records Here. Please Add A Department Name Above</th>
                </tr>`) 
        }

    })
}

// dept management
const editDept = (me) => {
    // getData("DELETE", `http://${address}:4800/departments/${me.id}`, "", (data) => {
    // })
}

const deleteDept = (me) => {
    // localhost:4800/departments/2143a375-688f-4952-a403-e0a32cadb596
    getData("DELETE", `http://${address}:4800/departments/${me.id}`, "", (data) => {
        if(data){
            notify(1);
            updateDeptData();
        }
    },(error)=>{
        if(error){
            notify(0);
            updateDeptData();
        }
    })
}

// modal management for the setting s page 
$("#modalAddUser").on("click",()=>{
    // getStaffNumber()
})

//leaseItem
$("#leaseItem").on("click",(e)=>{
    display_header.html("Lease Item");
    loadItem("leaseItem",currentBranch,currentCountry);
});

//managers
$("#managers").on("click",(e)=>{
    display_header.html("Branch Managers");
    loadItem("managers",currentBranch,currentCountry);
});

//mentaince
$("#mentainance").on("click",(e)=>{
    display_header.html("Mentainance");
    loadItem("mentainance",currentBranch,currentCountry);
});
// end country branch click

// adding a toggle class for item sidebar
let items = $(".item");
    items.on("click",e => {
    // checking if the class exists
    $( "div.item" ).each(function (index){
        $(this).removeClass("clicked");
    });
    let this_id = $(e.target);
    this_id.toggleClass("clicked");
    
})
const moreInfoEmp = () => {
    display_header.html("Branch Managers");
    $("#display").load("../partials/html/addEmployee.html");
}
//function for add employee on branch change
const changeBranch = () => {
let this_country = $("#AddCountry option:selected").val();
    $.ajax({
        url: "../partials/proc.php",
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        data: {
            getBranch: {
                "country": this_country
            }
        },
        success: function (result) {
            let data = JSON.parse(result);
            if (data) {
                // get the item to ad item to
                let accum = '';
                for(let i = 0;i < data.length;i++){
                    accum += "<option value=" + data[i] + ">" + data[i] + "</option>";
                }
                $("#branch").html(accum);
                // resetting a from
                // $('form#addItem').trigger("reset");
            }
        }
    });
}
$("#add_branch").on("click",()=>{
});

$("#manage_account").on("click",()=>{

});
const getAssetData = ()=>{
    fetch(`http://${address}:4800/assets`,{
        headers: { "Authorization": `Bearer ${token}` }
    }).then(data => data.json());
}
const getCountryData = (country)=>{
    fetch(`http://${address}:4800/assets/country/${country}`,{
        headers: { "Authorization": `Bearer ${token}` }
    }).then( data => data.json());
}
const getCountryBranchData = (branch)=>{
    fetch(`http://${address}:4800/assets/branch/03419433-4a32-4966-8767-014852180c37`,{
        headers: { "Authorization": `Bearer ${token}` }
    }).then(data => data.json());
}
function pop(){
    popup.style.display = "block"
}
// function load_context to the modal
function loadModal(context){
    $("#modalHandle").load(`./partials/html/modals/${context}.html`)
}
const repair = () => {
    let cost = $("#cost").val()
    let description = $("#desc").val()
    let id =  JSON.parse(sessionStorage.getItem("thisItem")).id;
    $.ajax({
        url : `http://${address}:4800/asset-repairs/repair`,
        method : "POST",
        headers: { "Authorization": `Bearer ${token}` },

        data : {
            asset_id : id,
            cost : cost
        },
        success : (data)=>{
            notify(1)
            dismissModal();
        },
        error : (error)=>{
            notify(0)
        }
    })
}
const disposeItem = () => {
    let item = sessionStorage.getItem("thisItem");
    let desc = $("#desc").val();
    if(item && desc !== ""){
        let id = JSON.parse(item).id;
        $.ajax({
            url: `http://${address}:4800/assets/${id}/dispose`,
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            data : {
                disposal_reason : desc
            },
            success : (data)=>{
                if(Array.isArray(data) && data.length > 0){
                    notify(1);
                    dismissModal();
                }else{
                    notify(0);
                }
            },
            error : (error)=>{
            }
            
        })
    }
}
const edit = () => {
    let data = JSON.parse(sessionStorage.getItem("thisItem"))
    if(data){
       setTimeout(() => { 
         // $("#pop_name").val(data.name)
         $("#pop_price").val(data.value)
         $("#pop_color").val(data.color)
         $("#pop_warrantyExpires").val(moment(new Date(data.warranty_expiry_date)).format("YYYY-MM-DD"))
         $("#pop_category").val(data.Category.name)
         $("#pop_manufacturer").val(data.manufacturer)
         $("#pop_part_number").val(data.part_number)
         $("#pop_location").val(data.location)
         $("#pop_model").val(data.model)
         $("#pop_dop").val(moment(new Date(data.purchase_date)).format("YYYY-MM-DD"))
         $("#pop_supplier").val(data.supplier)
         $("#pop_serialnumber").val(data.serial_number)
         // $("#pop_processor").val(data.processor)
         // $("#pop_diskCapacity").val(data.disk_capacity)
         // $("#pop_serialnumber").val(data.serial_number)
       }, 500);
    }



}
const editItemData = () => {
    let item = sessionStorage.getItem("thisItem");
    let id = JSON.parse(item).id;
    let form = $("#pop_addItem");
    let data = new FormData(form[0]);
    notify(0)
    /*
    {
        "name": "Laptop",
        "category_id": "342bae58-f15e-4b7d-b0d8-f1034925997c",
        "branch_id": "1bd4985c-57f6-4fda-89a3-b1344cf2dee5",
        "serial_number": "24fdhdf",
        "model": "hp",
        "manufacturer": "hp",
        "purchase_date": "2017-08-02",
        "supplier": "quick suppliers",
        "value": "50000",
        "warranty": "2 years",
        "warranty_expiry_date": "2019-08-02",
        "depreciation": "20",
        "memory_capacity": "6GB",
        "disk_capacity": "500GB",
        "screen_size": "15\"",
        "processor": "core i3",
        "finance_netbook": "25"
    }
    */
    
}
const reallocateItem = ()=>{
    let assetId = getAssetId();
    let userId = $("#userId").val();
    let desc = $("#desc").val();
    let condition = $("#condition").val();

    $.ajax({
        url: `http://${address}:4800/asset-allocations/reallocate`,
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        data: {
            asset_id: assetId,
            user_id: userId,
            return_condition: desc,
            return_condition_description: condition
        },
        success: (data) => {
            if(data){
                notify(1)
                dismissModal();
            }
        },
        error: (error) => {
            notify(2)
        }
    })
}
const notify = (msg) =>{
    if(msg  === 0){
        // error
        swal.fire({
            type: "error",
            title: "error",
            text: "An error Occcured.",
            timer: 4000,
            allowOutsideClick: false,
            showConfirmButton: true
        });
    }else if(msg == 1){
        //  success
        swal.fire({
            type: "success",
            title: "Success",
            text: "Action performed Successfully.",
            timer: 4000,
            allowOutsideClick: false,
            showConfirmButton: true
        });
    }else if(msg === 2){
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
// $.ajax({
//     url: `http://${address}:4800/asset-allocations/allocate`,
//     method : "POST",
//     data : {
//         asset_id: "c9792468-a76e-4d1b-b42f-898e8d6100ee",
//         user_id: "3029a567-0fc9-4b02-bba8-15ac1cf264ac"
//     },
//     success : (data)=>{
//     },
//     error : (error)=>{
//     }
// })

const returnItem = () => {
    let id = getAssetId() 
    let condition = $("#fdfdfd").val();
    let description = $("#desc").val();

    if(description.length  && condition.length ){
        // data exists
        $.ajax({
            url: `http://${address}:4800/asset-allocations/return`,
            method : "POST",
            headers: { "Authorization": `Bearer ${token}` },
            data : {
                asset_id : id,
                return_condition : condition,
                return_condition_description : description
            },
            success : (data) => {
                if(data){
                    notify(1)
                    dismissModal();
                }
            },
            error : (error)=>{
            }
        })
    }else{
        notify(2)
    }
}
const dismissModal = () => { 
    popup.style.display = "None";
}  


const checkBranch = (me) =>{
    let handle = $("#messages")
    if(me.value.length > 0){
        getData("GET", `http://localhost:4800/branches/branch?branch=${me.value}`, "", (data) => {
            if (data) {
                handle.html("Branch Already Exists");
            } else {
                handle.html("Branch Available");
            }
        }, error => {
        })
    }else{
        handle.html("")
    }
}


const getBranch = () => {
    let handle = $("#tableBody")
    getData("GET", `http://${address}:4800/branches`, "", (data) => {
        if (data) {
            Object.keys(data).map((key) => {
                data[key].map((value, key) => {
                    handle.append(`
                        <tr class="asset">
                            <th>${key + 1}</th>
                            <td>${value.branch}</td>
                            <td>${value.country}</td>
                            <td>${value.code}</td>
                            <td>${value.createdAt}</td>
                            <td data-action="edit"><span id="${value.id}"class="btn btn-warning btn-sm btn-font" onclick="editCountryBranch(this)">Edit</span></td>
                        </tr>`)
                })
            })
        } else {
            handle.append("No Branch/Country Data");
        }
    }, error => {
    })
}


const addBranch = () =>{
    let branch = getItem("branchName").value;
    let country = getItem("countryName").value;
    if(branch.length > 0 && country.length > 0 ){
        getData("POST",`http://${address}:4800/branches`,{
            country : country,
            code : "KE",
            branch : branch
        }, data => {
            if(data){
                notify(1)
                getBranch()
            }
        }, error => {
            notitfy(0)
        })
    }else{
        notify(2)
    }
}

const editCountryBranch = () =>{
    notify(2)
}
// testing info 


// end testing info 

// overview event handlers 
$("#overview").on("click",()=>{
    display_header.html("Overview");
    // ajax funtion whose response is the
    // we are going to return html.
    display.load(`${htmlSubpath}overview.html`, () => {
        // getting the data 
        // pre filing the data
        // update report form 
        const updateReportForm = () => {
            let country = $("#report_country");
            //adding data to the session 
            getData("GET", `http://${address}:4800/branches`, "", (data) => {
                Object.keys(data).map((key) => {
                    // map thur the array 
                    country.append(` <option id="${Math.random()}" value="${key}">${key}</option>`)
                    // data[key].map((value, key) => {
                    //     branch.append(`<option id="statusOne" value="${value.id}">${value.branch}</option>`)
                    // })
                })
            })
        }
        updateReportForm();

        // listing for event in the country data
        // report section
        $("#report_country").on("change", (e) => {
            let country = $("#report_country").val();
            let branch = $("#report_branch");
            let sessionCountryBranch = sessionStorage.getItem("countryBranch")
            if (sessionCountryBranch) {
                sessionCountryBranch = JSON.parse(sessionCountryBranch)
                if (sessionCountryBranch[country]) {
                    branch.html("");
                    branch.append(`<option value="null" selected >Branch</option>`);
                    sessionCountryBranch[country].map((value, index) => {
                        branch.append(`<option value="${value.id}">${value.branch}</option>`)
                    })
                } else {
                }
            }
        })
        // overview :: data
    })
})

function getFrequency(item) {
    thisVal = item.value;
    if (thisVal === "null") {
        $("#type").prop("disabled", true);
        $("#statusOne").prop("selected", true);
    } else if (thisVal === 'day') {
        $("#type").removeAttr("disabled");
        $("#dateCont").show();
        $("#monthCont").hide();
        $("#weekCont").hide();
    } else if (thisVal === "week") {
        $("#type").removeAttr("disabled");
        $("#dateCont").hide();
        $("#monthCont").show();
        $("#weekCont").show();

    } else if (thisVal === 'month') {
        $("#type").removeAttr("disabled");
        $("#dateCont").hide();
        $("#monthCont").show();
        $("#weekCont").hide();
    }
}

// update report form 
const updateReportForm = () =>{
    let country = $("#report_country");
    //adding data to the session 
    getData("GET", `http://${address}:4800/branches`, "", (data) => {
        Object.keys(data).map((key) => {
            // map thur the array 
            country.append(` <option id="${Math.random()}" value="${key}">${key}</option>`)
            // data[key].map((value, key) => {
            //     branch.append(`<option id="statusOne" value="${value.id}">${value.branch}</option>`)
            // })
        })
    })
}
updateReportForm();

// listing for event in the country data
// report section
$("#report_country").on("change", (e) => {
    let country = $("#report_country").val();
    let branch = $("#report_branch");
    let sessionCountryBranch = sessionStorage.getItem("countryBranch")
    if (sessionCountryBranch) {
        sessionCountryBranch = JSON.parse(sessionCountryBranch)
        if (sessionCountryBranch[country]) {
            branch.html("");
            branch.append(`<option value="null" selected >Branch</option>`);
            sessionCountryBranch[country].map((value, index) => {
                branch.append(`<option value="${value.id}">${value.branch}</option>`)
            })
        } else {
        }
    }
})


// generate single report 
const generateReport = (data, title = "") => {
    // get the table handle 
    let handle = $("#repoDiv");
    if (title !== "") {
        handle.append(`<tr><td>${title}</td></tr>`)
    }

    // working with the report data
    // mappiong begins
    data.map((value, key) => {
        let id = value.id;
        let kind = value.Category.name;
        let code = value.code;
        let location = `${value.Branch.branch}, ${value.Branch.code}`;
        let manufacturer = value.manufacturer;
        let model = value.model;
        let serialNumber = value.serial_number;
        let supplier = value.supplier;
        let warrantyMonths = value.warranty_months;
        let warrantyYears = value.warranty_years;
        let warranty = `${warrantyYears} Yrs ${warrantyMonths} Mths`
        let specs = `<b> ${value.processor}, ${value.screen_size}, ${value.disk_capacity}</b>`
        //  appending to the dom
        handle.append(
            `<tr class="asset" onclick="getModalData(this)" id="${id}">
                    <th data-id="${id}">${code.toUpperCase()}</th>
                    <td data-id="${id}">${serialNumber.toUpperCase()}</td>
                    <td data-id="${id}">${manufacturer}</td>
                    <td data-id="${id}">${model}</td>
                    <td data-id="${id}">${specs}</td>
                    <td data-id="${id}">${location}</td>
                    <td data-id="${id}">${kind}</td>
                    <td data-id="${id}">${supplier}</td>
                    <td data-id="${id}">${warranty}</td>
                </tr>`)
    })
}

const print_reports = () =>{ 
    // get the input data
    let id = $("#report_branch").val()
    let status = $("#report_type").val();
    if (id !== "null" || id !== null || id !== undefined && status !== "null" || id !== null || status !== undefined){
        let month, week, date, newDay;
        let errorHandle = $("#error");
        let generate = $("#generate");
        let generating = $("#generating");
        let done = $("#done");
        if (status.toLowerCase() === "all") {
                //  all reports combined
                getData("GET", `http://${address}:4800/assets/repaired`, "", (data) => {
                    generateReport(data, "Repaired")
                }, error => {
                    notify(2)
                })
                getData("GET", `http://${address}:4800/assets/disposed`, "", (data) => {
                    generateReport(data, "Disposed")

                }, error => {
                    notify(2)

                })
                getData("GET", `http://${address}:4800/assets/allocated`, "", (data) => {
                    done = 1001;
                    generateReport(data, "Allocated")
                }, error => {
                    notify(2)
                })
                getData("GET", `http://${address}:4800/assets/unallocated`, "", (data) => {
                    generateReport(data, "Unallocated")
                }, error => {
                    notify(2)
                })
            status = "All Asset Report"
            $("#generating").show()
            setTimeout(() => {
                let name = `${status}_${new Date().toLocaleString()}.xlsx`;
                //  excel gen
                excel = new ExcelGen({
                    "src_id": "repoDiv",
                    "show_header": true,
                    "format": "xlsx",
                });

                excel.generate(name);
                // end excel gen

                $("#generating").hide()
                errorHandle.show();
                setTimeout(() => {
                    $('#error').hide();
                    $("#generate").prop("disabled", false)
                    $("#overview").trigger("click");
                }, 5000);
            }, 3000)
        }

        if (status === "allocated" || status === "unallocated" || status === "disposed" || status === "repaired"){
                getData("GET", `http://${address}:4800/assets/${status}`, "", (data) => {
                    generateReport(data, status)
                }, error => {
                    notify(2)
                }) 
            $("#generating").show()
            setTimeout(() => {
                let name = `${status}_${new Date().toLocaleString()}.xlsx`;
                //  excel gen
                excel = new ExcelGen({
                    "src_id": "repoDiv",
                    "show_header": true,
                    "format": "xlsx",
                });

                excel.generate(name);
                // end excel gen

                $("#generating").hide()
                errorHandle.show();
                setTimeout(() => {
                    $('#error').hide();
                    $("#generate").prop("disabled", false)
                    $("#overview").trigger("click");
                }, 5000);
            }, 3000)
        }
    }else{
        notify(2)
    }
    if(id === "null" || status === "null"){
        notify(2)
    }
}

let username = JSON.parse(sessionStorage.getItem("userLoggedIn")).email
$("#loggedEmail").html(username)

$("#toSupport").on("click",()=>{
    sessionStorage.setItem("userSessionData",null) 
    window.location.href = `http://${link}`
})


$("#assetLogout").on("click", () => {
    sessionStorage.clear()
    window.location.href = `http://${link}`
})

const getAllAdmins = () =>{
    getData("GET", `http://${address}:4800/admins`, "", (data) => {
        let handle = $("#tableBody")
        handle.html("")
        data.map((value,index)=>{
            let id = value.id
            let username = value.username 
            let createdAt = value.createdAt
            handle.append(
                `<tr class="asset" id="${id}">
                <td>${id}</td>
                <td>${username}</td>
                <td>${moment(createdAt).format("YYYY-MM-DD")}</td>
                </tr>`)

        })
    },(error)=>{
    })
}
const makeAmdin = () => {
    // get the dta from the first user field 
    let email = $("#newAdmin").val();
    let password = $("#password").val();

    if(email.length > 8 && password.length > 2 ){
        getData("POST", `http://${address}:4800/admins`, {
            "username": email,
            "password": password
        }, (data) => {
            if(data){
                notify(1)
                getAllAdmins();
            }else{
                notify(2)
                getAllAdmins();
            }
        },(error)=>{
            notify(2)
            getAllAdmins();
        })
    }else{
        // notify(0)
        getAllAdmins();
    }
    // get  the use by the staff number 
    // get the email 
    // get the password
    //add the user

}