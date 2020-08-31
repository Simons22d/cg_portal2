<?php
require_once("./partials/header.php");
?>
</head>
<!-- end -->
<div id="container">
    <div id="sidebar" style="font-size:10px;">
        <div id="sidebar-content" style="height:600px;font-weight: 600;">
		<img src="./logo.jpg" id="logo" alt="">
		<title>Asset Management</title>
<body>
	<!-- custom styles -->
	<link rel="stylesheet" href="./style/sidebar.css">
	<!-- drop down -->
	<!-- <div class="header" style="margin-left:20px;">All Departments</div>
	<div class="custom-control custom-switch mt-2" id="switch">
		<input type="checkbox" class="custom-control-input" id="alldept">
		<label class="custom-control-label header" for="alldept" id=""></label>
	</div> -->
		<p class="header sidebar_items mt-2">Choose Departments</p>
        <!-- test -->
        <!-- flag start -->
        <div class="sidebar_items items">
        	<div class="item" style="margin-left:5px;padding-bottom:5px;"><img id="flag" data-placement="right" class="icon" src="./images/flags/null.png"  height="25px" ></div>
    	</div>
    	<!-- end flag -->
    	<!-- start drop down -->
        <div class="styled-select slate">
            <select id="country" style="font-weight: 600; color:#6b6b6b">
                <option selected value="null">Country</option>
            </select>
        </div>
<div class="styled-select slate">
    <select id="branch" style="font-weight: 600; color:#6b6b6b">
        <option id="null" selected >Branch</option>
    </select>
</div>
<!-- end drop downs -->
	<!-- adding product options -->
	<p id="space"></p>
	<p class="header sidebar_items">Product Options</p>
	<div class="sidebar_items items sidebar">
		<div class="item"  style="margin-top:-7px;"id="overview"><span></span>Overview</div><p></p>
		<div class="item " style="margin-top:-7px;" id="add"><span></span>Add Item</div><p></p>
		<div class="item"  style="margin-top:-7px;"id="store" ><span></span>Track Items</div><p></p>
		<div class="item"  style="margin-top:-7px;"id="settings" ><span></span>Other Actions</div><p></p>
	</div>

	<!-- the logout details button -->
	<div class=" items logout">
		<div class="item ">
			<div class="container">
				<span class="btn btn-outline-secondary btn-sm disabled mb-3" id='toSupport'>Go To Support</span>

				<span class="btn btn-outline-secondary btn-sm disabled" id='loggedEmail'></span>

                <div class="btn btn-warning btn-block btn-sm mt-4" id="assetLogout" >Logout</div>
			</div>
		</div>

			<p></p>
	</div>
	<!-- end of the logout button -->
	<!--  -->
	 <!-- end test -->
	 
        <!-- TEMP DIV END -->
        </div>
    </div><!--
 --><div id="content">
    <div id="main-content" style="height:400px ">
		<!-- the container to the display page -->
		<div class="container">
			<div id="space"></div><br>
			<h5 id="" class="mb-3">Asset Management &nbsp;<span id="beta">beta</span></h5> 
			<h5 id="theDisplay" class="mb-3"></h5> 
			<div id="display" style='font-size:12px;'>
				<!-- start -->

				<!-- <div class="row col-lg-12">
				<div class="col-lg-5" id="graphs">
						<canvas id="doughnut" width="120" height="75"></canvas>
						<script>
							var ctx = document.getElementById('doughnut').getContext('2d');
							var doughnut = new Chart(ctx, {
								type: 'doughnut',
								data: {
									labels: ["New","Assigned","Resolved","Closed"],
									datasets: [
										{
											label: "Population (millions)",
											backgroundColor: ["Red","Orange","Yellow","Green"],
											data: [0,0,2,0]
										}
									]
								},
								options: {
									title: {
										display: true,
										text: 'Summary Of Done And Pending Tasks'
									}
								}
							});
						</script>
					</div>
					<div class="col-lg-6 offset-lg-1" id="graphs">
					<canvas id="myChart" width="110" height="65"></canvas>
					<script>

						var ctx = document.getElementById('myChart').getContext('2d');
						var myChart = new Chart(ctx, {
							type: 'line',
							data: {
								labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
								datasets: [{
									steppedLine : "after",
									label:"Requests Serviced",
									data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
									backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(54, 162, 235, 0.2)',
										'rgba(255, 206, 86, 0.2)',
										'rgba(75, 192, 192, 0.2)',
										'rgba(153, 102, 255, 0.2)',
										'rgba(255, 159, 64, 0.2)'
									],
									borderColor: [
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)'
									],
									borderWidth: 1
								}]
							},
							options: {
								title: {
									display: true,
									text: 'Task Lists for The Last 15 Days'
								},
								scales: {
									yAxes: [{
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					</script>
					</div>
				</div> -->
			<style>
				.widget_card{
					border-radius:10px;
					padding :15px 10px 20px 20px;
					background-color : #efefef;
					height : 120px;
					margin-bottom : 20px;
					cursor : pointer;
				}
				.header{
					font-size : 16px;
					font-weight : 600;
					color : #999;
				}

				.body {
					font-size : 14px;
					color : #555;
				}
				span.time{
					color :#aaa;
					font-size : 12px;
				}
				.urgent{
					color : red;
					font-weight : 600;
					margin-left : 130px;
					font-size : 10px;
					border : 2px solid red;
					padding : 2px 4px;
					border-radius : 4px;
				}
				.medium{
					border : 2px solid blue;
					color : blue;
				}
				.inHeaders{
					font-size : 16px;
					font-weight : 600;
					text-align:center;
					color : #777;
				}
				.reports{
					margin-left : 0px;
				}
				.reports{
					margin-left:-30px;
					margin-top:-10px;
				}
			</style>
			<br>
				<div class=""><br>
					<h5 id="section">Reports</h5>
					<div class="text-muted">Please Select Either of the links to generete reports.</div><br>
					<!-- <div class="alert alert-danger col-lg-5 alert-dismissible" role="alert" id="error" style="display:none;"> 
						Sorry, Data For This Kind Of Report Does Not Exists Yet.
					</div> -->
					<div class="alert alert-info col-lg-5" style="display:none" role="alert" id="generating">
						Generating Report. 
					</div>
					<!-- <div class="alert alert-success col-lg-5" style="display:none" role="alert" id="done">
						&#128076; Report Successfully Generated.
					</div> -->
					<div class="alert alert-success col-lg-5" style="display:none;color:green" role="alert" id="error">
						&#128076; Report Successfully Generated.
					</div>
					<div class="reports row col-lg-12">
					<!-- Report Type -->
					<div class="col-lg-3">
							<label for="datePickerStart">Country</label>
							<select class="form-control form-control-sm" id="report_country" name="country">
								<option id="periodOne"  selected value="null">Please Select Country</option>
							</select>
					</div>
						
					
					<div class="col-lg-3" >
						<label for="datePickerStart">Branch</label>
						<select class="form-control form-control-sm" id="report_branch" name="branch" >
							<option id="periodOne"  selected value="null">Please Select Branch</option>            
						</select>
					</div>


					 <div class="col-lg-3">
						<label for="datePickerStart">Status</label>
						<select class="form-control form-control-sm" id="report_type" name="type">
							<option id="periodOne"  selected value="null">Select Status</option>
							<option class="period" id="all" value="all">All Assets</option>
							<option class="period" id="allocated" value="allocated">Assigned Assets</option>
							<option class="period" id="unallocated" value="unallocated">Not Assigned Assets</option>
							<option class="period" id="disposed" value="disposed">Disposed Assets</option>
							<option class="period" id="repaired" value="repaired">Repaired Assets</option>
						</select>
					</div>

					</div>
					<br><br>
					<button class="btn btn-primary btn-sm col-lg-2" id="generate" onclick="print_reports()">Generate Report</button>
				</div>
				<br><br>
				<div class="repoDiv">
					<!-- report container -->
					<table class="table table-striped table-bordered table-hover" style="display:none" id="repoDiv">
						<thead>
						<tr>
							<tr style="font-size:12px;">
							<th scope="col" id="serialNo">Asset Code</th>
							<th scope="col" id="name">S/No</th>
							<th scope="col" id="make">Make</th>
							<th scope="col" id="model">Model</th>
							<th scope="col" id="color">Specs</th> 
							<th scope="col" id="location">Location</th> 
							<th scope="col" id="assignedto">Catogory</th>
							<th scope="col" id="condition">Supplier</th>
							<th scope="col" id="l_status">Warranty</th>
						</tr>
						</thead>
						<tbody id="reportBody" >
						</tbody>
					</table>
				</div>


				<!-- end -->
			</div>
				<!-- modal : lvl 2 -->
				<div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close" style="text-align:right">&times;</span>                  
                        <div id="pop" class="col-lg-12">
							<h5  id="action">Manage Item</h5>
							<!-- body start -->
							<!-- top card  -->
							<div class="row details">
								<div class="col-lg-4">
									<div class="info">Serial Number : <span id="modal_sn"></span></div>
									<div class="info">Color : <span id="modal_color"></span></div>
									<div class="info">id : <span id="modal_id"></span></div>
									<div class="info">Manufacturer : <span id="modal_manu"></span></div>
									<div class="info">Model : <span id="modal_model"></span></div>
									<div class="info">Cost : <span id="modal_val"></span></div>
									
								</div>
								<div class="col-lg-4">
									<div class="info">Category : <span id="modal_category"></span></div>
									<div class="info">purchased : <span id="modal_date"></span></div>
									<div class="info">Warranty : <span id="modal_warranty"></span></div>
									<div class="info">Supplier : <span id="modal_supplier"></span></div>
									<div class="info">Branch : <span id="modal_branch"></span></div>
									<div class="info">Country : <span id="modal_country"></span></div>
								</div>

								<div class="col-lg-4">
									<div class="info">Screen Size : <span id="modal_screen"></span></div>
									<div class="info">Disk Capacity : <span id="modal_dskcapacity"></span></div>
									<div class="info">Processor : <span id="modal_proc"></span></div>
									<div class="info">Est. Value : <span id="modal_value"><span>34000Ksh </span></span></div>
									<div class="info">Attachments : <span id="modal_attachments"></span></div>
								</div>
	
								<!-- test -->
								<div class="col mt-3 " style="font-size:12px">
								<hr>
								<h5  id="action">Actions</h5>
								<div class="row">
									<div class="col-lg-4 mb-3"  id="allocated">
									<p class="actions">Currently allocated</p>
										<small>This item currently allocated to <br><strong>NAN.</strong></small> <br>
										<div class="btn btn btn-light btn-sm col-lg-5 modalInfo mt-2"  id="moreInfo">More Info</div>
									</div>
									<div class="col-lg-4" id="acquire">
										<p class="actions">Acquire Back</p>
										<small>Take back the Asset from the employee. Required for clearance.</small><br>
										<div class="btn btn btn-light btn-sm col-lg-6 modalInfo mt-2" id="return">Fill Return Form</div>
									</div>
									<div class="col-lg-4" id="disposed">
										<p class="actions">Dispose</p>
										<small>You will Have to fill out a form which will be used to <b>Track</b> the Asset Disposal In The Required Manner.</small><br>
										<div class="btn btn btn-light btn-sm col-lg-5 modalInfo mt-2"  id="dispose">initiate Disposal</div>
									</div>
								</div>

								<div class="row mt-3">
									<div class="col-lg-4" id="repair">
										<p class="actions">Book For Repair.</p>
										<small>Last Repair : Monday, February 21 2019.</small><br>
										<div class="btn btn-light btn-sm col-lg-5 modalInfo mt-2" id='repair'>View More</div>
									</div>
									<div class="col-lg-4" id="edit">
									<p class="actions">Edit Content.</p>
										<small>Edit Asset Details.</small><br>
										<div class="btn btn-light btn-sm col-lg-5 modalInfo mt-2" id='edit' onclick="edit()">Edit Details</div>
									</div>
									<div class="col-lg-4" id="reallocate">
                                    <p class="actions">Reallocated Item.</p>
                                        <small>Allows you to reassign the item to another user.</small><br>
                                        <div class="btn btn-light btn-sm col-lg-5 modalInfo mt-2" id='reallocated'>Reallocate Item.</div>
                                    </div>
								</div>
								</div>
							</div>
							<!-- body end -->
					<br><br>			
				</div>
				<div id="popup" class="popup">
				<div class="modal-content_popup">
					<span id="closePop" class='close_pop' style="text-align:right">&times;</span>
					<div id="pop" class="col-lg-12">
							<h5  id="action">Manage Item</h5>
							<!-- body start -->
							<div id="modalHandle">
							</div>
							<!-- body end -->
					<br><br>
				</div>
				<!-- modal: lvl 2 : end -->
		</div>
    </div>
	</div>
</div>


<?php
require_once("./partials/footer.php");
?>