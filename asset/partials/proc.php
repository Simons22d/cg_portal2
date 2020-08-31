<?php
require_once("db.php");
require_once("functions.php");
if($_POST){
	// changing the side bar flag icon
	if(isset($_POST["flag"])){
		$country = $_POST["flag"]["country"];
		$stmt = $conn->prepare("SELECT * FROM country_branch WHERE code = :country");
		$stmt -> bindParam(":country",$country);
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$stmt->execute();
		$data = $stmt->fetchAll();
		echo json_encode($data);
	}
	// getting the post to add
	if(isset($_POST["category"])){
		$categories = ["add","store","leased","retired","addEmployee","employees","leaseItem","sales","managers","cashiers","mentainance",];
		//get the category
		$selected = $_POST["category"]["selected"];
		if(in_array($selected,$categories)){
			// we are going to return the category to the user
			if($selected == "add"){
				// db ->table

				$form = "
						
						";
						// print the for the to the dashboard
						echo $form;
			}else if($selected == "store"){
				$branch = $_POST["category"]["branch"];
				$countries = $conn->prepare("SELECT code FROM country_branch");
				$countries->setFetchMode(PDO::FETCH_ASSOC);
				$countries->execute();
				$all = $countries->fetchAll();
				$country = $_POST["category"]["country"];
				$name='';
				foreach($all as $code => $value){
					if($value['code'] == $country){
						$c_name = $conn->prepare("SELECT country FROM country_branch WHERE code=:code");
						$c_name ->bindParam(":code",$country);
						$c_name->setFetchMode(PDO::FETCH_ASSOC);
						$c_name->execute();
						$name = $c_name->fetchAll();
					}
				}
				$final_name = $name[0]['country'];
				// we are going to select everything form that department
				// or the country
				// db -> table
				$stmt = $conn->prepare("SELECT * FROM product WHERE branch = :branch");
				$stmt->bindParam(":branch",$branch);
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				$stmt->execute();
				$data = $stmt->fetchAll();

				if(!count($data)){
						$form = "<div class='row container-fluid'><div></div><br>
							<div class='alert alert-warning' role='alert'>
							There are no items in the $final_name / $branch.<br>To Add Items Select Add item to add item. <br>
							<br><span><img class='icon'src='./images/add.png'  height='15px' style='padding-left:3px'></span>Add Item &nbsp;&nbsp;&nbsp;<br>
							</div>
					</div>";
				}else{

					$form = "<div class='row container-fluid'>
										<table class='table' id='this_form'>
											<thead class='thead-light'>
												<tr>
													<th scope='col'>#</th>
													<th scope='col'>Id</th>
													<th scope='col'>Name</th>
													<th scope='col'>Price</th>
													<th scope='col'>State</th>
													<th scope='col'>Make</th>
													<th scope='col'>Year</th>
													<th scope='col'>Fuel Type</th>
													<th scope='col'>Units</th>
													<th scope='col'>Branch</th>
													<th scope='col'>Link</th>
												</tr>
											</thead>
												<tbody id='dataHandle'>
											";
										$i = 0;
										foreach($data as $value){
											$i++;
											$id = $value['id'];
											$name = $value['name'];
											$price = $value['price'];
											$state = $value['state'];
											$make = $value['make'];
											$year = $value['year'];
											$fuel_type = $value['fuel_type'];
											$units = $value['units'];
											$branch = $value['branch'];
											// if($value["leaseable"] == "allowed"){
											// 	continue;
											// }
											$form .= "
												<tr>
													<th scope='row'>$i</th>
													<td>$id</td>
													<td>$name</td>
													<td>$price</td>
													<td>$state</td>
													<td>$make</td>
													<td>$year</td>
													<td>$fuel_type</td>
													<td>$units</td>
													<td>$branch</td>
													<td class='btn btn-link btn-sm subber' id='$id'>Edit</td>
												</tr>";
										}
									$form .= "
										</tbody>
										<script>
											    $('.subber').on('click', (e) => {
												let this_id = e.target.id
												//make an ajax request to  the backend
												$.ajax({
													url: './partials/proc.php',
													method: 'POST',
													data: {
														editStore: this_id,
													},
													success: function (result) {
														let data = JSON.parse(result);
														sessionStorage.setItem('updateData',result);
														let display_header = $('#theDisplay').html('Edit Employee');
														let display = $('#display').load('updateItem.html');
													}
												});
											})
										</script>
									</table>
								</div>";
				}

				echo $form;

			}else if($selected == "leased"){
				// db -> table
				$branch = $_POST["category"]["branch"];
				// we are going to select everything form that department
				// or the country
				// db -> table
				$stmt = $conn->prepare("SELECT * FROM leased ");
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				$stmt->execute();
				$data = $stmt->fetchAll();

				$form = "<div class='row container-fluid'>
										<table class='table' id='this_form'>
											<thead class='thead-light'>
												<tr>
													<th scope='col'>#</th>
													<th scope='col'>Item Id</th>
													<th scope='col'>User Id</th>
													<th scope='col'>Status</th>
													<th scope='col'>Due Date</th>
													<th scope='col'>Reason</th>
													<th scope='col'>Link</th>
												</tr>
											</thead>";
										$i = 0;
										foreach($data as $value){
											$i++;
											$item_id = $value['item_id'];
											$user_id = $value['user_id'];
											$status = $value['status'];
											$due_date = $value['due_date'];
											$reason = substr(str_replace("%20"," ",$value['reason']),0,25);
											$form .= "
											<tbody id='dataHandle'>
												<tr>
													<th scope='row'>$i</th>
													<td>$item_id</td>
													<td>$user_id</td>
													<td>$status</td>
													<td>$due_date</td>
													<td>$reason</td>
													<td class='btn btn-link btn-sm subber' id='$item_id'>Edit</td>
												</tr>
												<script>
											    $('.subber').on('click', (e) => {
												let this_id = e.target.id
												//make an ajax request to  the backend
												$.ajax({
													url: './partials/proc.php',
													method: 'POST',
													data: {
														editLease: this_id,
													},
													success: function (result) {
														let data = JSON.parse(result);
														sessionStorage.setItem('leaseData',result);
														let display_header = $('#theDisplay').html('Edit Employee');
														let display = $('#display').load('leaseItem.html');
													}
												});
											})
										</script>

											</tbody>";
										}
									$form .= "
										</table>
								</div>";
				echo $form;
			}else if($selected == "addEmployee"){
				// form -> db
				$stmt = $conn->prepare("SELECT country,code FROM country_branch");
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				$stmt->execute();
				$data = $stmt->fetchAll();
				$form = "
				  	<form id='employ'>
							<div class='row container-fluid'>
								<div class='col-lg-5'>

									<div class='form-group'>
										<label for='Firstname'>Firstname</label>
										<input type='text' class='form-control' id='Firstname' name='firstname' placeholder='Firtsname'>
									</div>
									<div class='form-group'>
									<label for='phone'>Phone</label>
										<input type='text' name='phone' class='form-control' id='phone' placeholder='0712345678'>
									</div>

									<div class='form-group'>
										<label for='email'>Email</label>
										<input type='email' class='form-control' id='email' name='email' placeholder='john@domain.com'>
									</div>

								<div class='form-group'>
										<label for='branch'>Branch</label>
										<select class='form-control' id='branch' name='branch'>
											<option value='embakasi'>embakasi</option>
											<option value='kisumu'>kisumu</option>
										</select>
									</div>

								</div>

								<!--page division-->
								<div class='col-lg-6'>
								<div class='form-group'>
										<label for='lastname'>Lastname</label>
										<input type='text' name='lastname' class='form-control' id='lastname' placeholder='lastname'>
									</div>

									<div class='form-group'>
										<label for='designation'>Designation</label>
										<select class='form-control' id='designation' name='designation'>
											<option value='cashier'>Cashier</option>
											<option value='Mentainance'>Mentainance</option>
											<option value='Transport'>Transport</option>
											<option value='Manager'>Manager</option>
										</select>
									</div>

									<div class='form-group'>
										<label for='country'>Country</label>
										<select class='form-control' id='AddCountry' onchange='changeBranch()'name='country'>";
										foreach($data as $item){
											$country = $item["country"];
											$code = $item["code"];
											$form .="<option class='countryChoosen'value='$code'>$country</option>";
										}
										$form .="</select>
									</div>

								<div class='form-group'>
								<label for='fueltype'>Employee Status</label><br>
										<div class='btn-group btn-group-toggle' data-toggle='buttons'>
										<label class='btn btn-warning active'>
											<input type='radio' name='status' value='active' id='pertol' autocomplete='off' checked> active
										</label>
										<label class='btn btn-warning'>
											<input type='radio' name='status' value='notActive' id='electric' autocomplete='off'> not active
										</label>
									</div>
									</div>
									<br><button type='button' id='employee' onclick='employ()' class='offset-8 col-lg-4 btn btn-primary btn-block'>Submit</button>
								</div>
							</form>
            			</div>";
            			echo $form;
			}else if($selected == "employees"){
				// db -> table
				$country = $_POST["category"]["country"];
				// we are going to select everything form that department
				// or the country
				// db -> table
				$stmt = $conn->prepare("SELECT * FROM user WHERE country = :country");
				$stmt->bindParam(":country",$country);
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				$stmt->execute();
				$data = $stmt->fetchAll();

				$branch = $_POST["category"]["branch"];
				$countries = $conn->prepare("SELECT code FROM country_branch");
				$countries->setFetchMode(PDO::FETCH_ASSOC);
				$countries->execute();
				$all = $countries->fetchAll();
				$country = $_POST["category"]["country"];
				$name='';
				foreach($all as $code => $value){
					if($value['code'] == $country){
						$c_name = $conn->prepare("SELECT country FROM country_branch WHERE code=:code");
						$c_name ->bindParam(":code",$country);
						$c_name->setFetchMode(PDO::FETCH_ASSOC);
						$c_name->execute();
						$name = $c_name->fetchAll();
					}
				}
				$final_name = $name[0]['country'];

				if(!count($data)){
						$form = "<div class='row container-fluid'><div></div><br>
							<div class='alert alert-warning' role='alert'>
							There are no items in the $final_name / $branch.<br>To Add Items Select Add item to add item. <br>
							<br><span><img class='icon'src='./images/add.png'  height='15px' style='padding-left:3px'></span>Add Item &nbsp;&nbsp;&nbsp;<br>
							</div>
					</div>";
				}else{
						$form = "<div class='row container-fluid'>
										<table class='table'>
								<thead class='thead-light'>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>User Id</th>
										<th scope='col'>Names</th>
										<th scope='col'>Phone</th>
										<th scope='col'>Designation</th>
										<th scope='col'>Branch</th>
										<th scope='col'>Status</th>
										<th scope='col'>Password</th>
									</tr>
								</thead>
								<tbody>";

								$i = 0;
							foreach($data as $value){
								$i++;
								$id = $value['id'];
								$firstname = $value['firstname'];
								$lastname = $value['lastname'];
								$phone = $value['phone'];
								$designation = $value['designation'];
								$branch = $value['branch'];
								$status = $value['emp_status'];
								$secret = $value['password'];
								$form .= "
									<tr>
										<th scope='row'>$i</th>
										<td>$id</td>
										<td>$firstname.$lastname</td>
										<td>$phone</td>
										<td>$designation</td>
										<td>$branch</td>
										<td>$status</td>
										<td>$secret</td>
									</tr>";
								}

								$form .= "</tbody>
							</table>
					</div>";
				}

				echo $form;
			}else if($selected == "leaseItem"){
				// form-> db
				$branch = $_POST["category"]["branch"];
				$country = $_POST["category"]["country"];
				// getting the id
				$stmt = $conn ->prepare("SELECT * FROM product WHERE leaseable = 'allowed' AND branch =:branch");
				$stmt->bindParam(":branch",$branch);
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				$stmt->execute();
				$prod_data = $stmt->fetchAll();

				$user = $conn ->prepare("SELECT * FROM user WHERE country = :country	");
				$user -> bindParam(":country",$country);
				$user->setFetchMode(PDO::FETCH_ASSOC);
				$user->execute();
				$user_data = $user->fetchAll();

				$form = "<form id='lease'>
									<div class='row container-fluid'>
										<div class='col-lg-5'>
												<div class='form-group'>
													<label for='employeeId'>Employee Id</label>
													<select class='form-control' name='employeeId' id='employeeId'>
														<option value='Null'>Select employeed Id</option>";
														foreach($user_data as $usr){
															$this_id = $usr['id'];
															$this_name = $usr['firstname'].' '.$usr['lastname'];
															$this_branch = $usr["branch"];
															$this_designation = $usr["designation"];
															$form .= "<option value='$this_id' > $this_id - $this_name - $this_branch - $this_designation</option>";
														}
														$form .= "
													</select>
												</div>

												<div class='form-group'>
													<label for='condition'>Item Status</label><br>
													<div class='btn-group btn-group-toggle' data-toggle='buttons'>
														<label class='btn btn-warning active'>
															<input type='radio' name='condition' value='new' id='New' autocomplete='off'> New
														</label>
														<label class='btn btn-warning'>
															<input type='radio' name='condition' value='moderate' id='moderate' autocomplete='off' checked> Moderate
														</label>
														<label class='btn btn-warning'>
															<input type='radio' name='condition' value='fair' id='fair' autocomplete='off'> Fair
														</label>
													</div>
												</div>

										</div>

										<!--page division-->
										<div class='col-lg-6'>

											<div class='form-group'>
												<label for='itemId'>Item Id</label>
												<select class='form-control' name='itemId' id='itemId'>
													<option value='Null'>Select Item Id</option>";
													foreach($prod_data as $item){
														$this_id = $item['id'];
														$this_name = $item['name'];
														$this_color = $item['color'];
														$this_year = $item["year"];
														$form .= "<option value='$this_id' > $this_id - $this_name - $this_color - $this_year</option>";
													}
											$form .= "</select>
											</div>

											<div class='form-group'>
												<label for='dueDate'>Due Date</label>&nbsp;&nbsp;&nbsp;&nbsp;<span id='days'></span>
												<input type='range' name='duration' class='custom-range' min='0' max='5' step='0.25' id='dueDate'>
											</div>

											<div class='form-group'>
												<label for='reason'>Reason</label>
												<textarea name='reason' class='form-control' name='reason' id='reason' rows='3'></textarea>
											</div>

											<script>
											 // update the change bar
												function days(){
													var newval =  $('[type=range]').val();
													let days='';
													if(Math.floor(newval) <= 1){
														days = ' Day';
													}else{
														days = ' Days';
													}
													$('#days').text(newval+days);
												}
												days();
												$('[type=range]').change(function () {
														days();
												});
											</script>

											<br><button type='button' id='test' onclick='lease()' class='offset-8 col-lg-4 btn btn-primary btn-block'>Submit</button>
										</div>
									</div>
								</form>
								";
						echo $form;
			}else if($selected == "managers"){
				$country = $_POST["category"]["country"];
				// we are going to select everything form that department
				// or the country
				// db -> table
				$stmt = $conn->prepare("SELECT * FROM user WHERE country = :country and designation ='Manager'");
				$stmt->bindParam(":country",$country);
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				$stmt->execute();
				$data = $stmt->fetchAll();

				$branch = $_POST["category"]["branch"];
				$countries = $conn->prepare("SELECT code FROM country_branch");
				$countries->setFetchMode(PDO::FETCH_ASSOC);
				$countries->execute();
				$all = $countries->fetchAll();
				$country = $_POST["category"]["country"];
				$name='';
				foreach($all as $code => $value){
					if($value['code'] == $country){
						$c_name = $conn->prepare("SELECT country FROM country_branch WHERE code=:code");
						$c_name ->bindParam(":code",$country);
						$c_name->setFetchMode(PDO::FETCH_ASSOC);
						$c_name->execute();
						$name = $c_name->fetchAll();
					}
				}
				$final_name = $name[0]['country'];

				if(!count($data)){
						$form = "<div class='row container-fluid'><div></div><br>
							<div class='alert alert-warning' role='alert'>
							There are no items in the $final_name / $branch.<br>To Add Items Select Add item to add item. <br>
							<br><span><img class='icon'src='./images/add.png'  height='15px' style='padding-left:3px'></span>Add Item &nbsp;&nbsp;&nbsp;<br>
							</div>
					</div>";
				}else{
						$form = "<div class='row container-fluid'>
										<table class='table'>
								<thead class='thead-light'>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>User Id</th>
										<th scope='col'>Firstname</th>
										<th scope='col'>Lastname</th>
										<th scope='col'>Phone</th>
										<th scope='col'>Designation</th>
										<th scope='col'>Branch</th>
										<th scope='col'>Status</th>
										<th scope='col'>Link</th>
									</tr>
								</thead>
								<tbody>";

								$i = 0;
							foreach($data as $value){
								$i++;
								$id = $value['id'];
								$firstname = $value['firstname'];
								$lastname = $value['lastname'];
								$phone = $value['phone'];
								$designation = $value['designation'];
								$branch = $value['branch'];
								$status = $value['emp_status'];
								$form .= "
									<tr>
										<th scope='row'>$i</th>
										<td>$id</td>
										<td>$firstname</td>
										<td>$lastname</td>
										<td>$phone</td>
										<td>$designation</td>
										<td>$branch</td>
										<td>$status</td>
										<td class='btn btn-link' id='$id'>More</td>
									</tr>";
								}

								$form .= "</tbody>
							</table>
					</div>";
				}

				echo $form;
			}else if($selected == "mentainance"){
				$country = $_POST["category"]["country"];
				// we are going to select everything form that department
				// or the country
				// db -> table
				$stmt = $conn->prepare("SELECT * FROM user WHERE country = :country and designation ='Mentainance'");
				$stmt->bindParam(":country",$country);
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				$stmt->execute();
				$data = $stmt->fetchAll();

				$branch = $_POST["category"]["branch"];
				$countries = $conn->prepare("SELECT code FROM country_branch");
				$countries->setFetchMode(PDO::FETCH_ASSOC);
				$countries->execute();
				$all = $countries->fetchAll();
				$country = $_POST["category"]["country"];
				$name='';
				foreach($all as $code => $value){
					if($value['code'] == $country){
						$c_name = $conn->prepare("SELECT country FROM country_branch WHERE code=:code");
						$c_name ->bindParam(":code",$country);
						$c_name->setFetchMode(PDO::FETCH_ASSOC);
						$c_name->execute();
						$name = $c_name->fetchAll();
					}
				}
				$final_name = $name[0]['country'];

				if(!count($data)){
						$form = "<div class='row container-fluid'><div></div><br>
							<div class='alert alert-warning' role='alert'>
							There are no items in the $final_name / $branch.<br>To Add Items Select Add item to add item. <br>
							<br><span><img class='icon'src='./images/add.png'  height='15px' style='padding-left:3px'></span>Add Item &nbsp;&nbsp;&nbsp;<br>
							</div>
					</div>";
				}else{
						$form = "<div class='row container-fluid'>
										<table class='table'>
								<thead class='thead-light'>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>User Id</th>
										<th scope='col'>Firstname</th>
										<th scope='col'>Lastname</th>
										<th scope='col'>Phone</th>
										<th scope='col'>Designation</th>
										<th scope='col'>Branch</th>
										<th scope='col'>Status</th>
										<th scope='col'>Link</th>
									</tr>
								</thead>
								<tbody>";

								$i = 0;
							foreach($data as $value){
								$i++;
								$id = $value['id'];
								$firstname = $value['firstname'];
								$lastname = $value['lastname'];
								$phone = $value['phone'];
								$designation = $value['designation'];
								$branch = $value['branch'];
								$status = $value['emp_status'];
								$form .= "
									<tr>
										<th scope='row'>$i</th>
										<td>$id</td>
										<td>$firstname</td>
										<td>$lastname</td>
										<td>$phone</td>
										<td>$designation</td>
										<td>$branch</td>
										<td>$status</td>
										<td class='btn btn-link' id='$id'>More</td>
									</tr>";
								}

								$form .= "</tbody>
							</table>
					</div>";
				}

				echo $form;
			}
		}
	}
	// working with addItem
	if(isset($_POST["addItem"])){
		if(!isset($_POST['addItem']["branch"])){
			echo json_encode(["status" => 404]);
		}else{
				$data = $_POST["addItem"];
				$item_name = spacer($data['itemName']);
				$price = spacer($data["price"]);
				$color = spacer($data["color"]);
				$engine_size = spacer($data["engineSize"]);
				$item_state = spacer($data["state"]);
				$cover = spacer($data["cover"]);
				$make = spacer($data["make"]);
				$origin = spacer($data["origin"]);
				$item_year = spacer($data["year"]);
				$fuel_type = spacer($data['fuelType']);
				$fuel_capacity = spacer($data["fuelCapacity"]);
				$units = spacer($data["units"]);
				$lease = spacer($data["lease"]);
				$country = spacer($data["country"]);
				$branch = spacer($data["branch"]);
				$prod_id = prod_id();
				// echo json_encode($data);
				//db -> res
				$stmt = $conn->prepare("INSERT INTO product VALUES(:id,:item_name,:price,:color,:engine_size,:item_state,:cover,:make,:origin,:item_year,:fuel_type,:fuel_capacity,:units,:country,:branch,:lease)");
				$stmt->bindParam(":id",$prod_id);
				$stmt->bindParam(":item_name",$item_name);
				$stmt->bindParam(":price",$price);
				$stmt->bindParam(":color",$color);
				$stmt->bindParam(":engine_size",$engine_size);
				$stmt->bindParam(":item_state",$item_state);
				$stmt->bindParam(":cover",$cover);
				$stmt->bindParam(":make",$make);
				$stmt->bindParam(":origin",$origin);
				$stmt->bindParam(":item_year",$item_year);
				$stmt->bindParam(":fuel_type",$fuel_type);
				$stmt->bindParam(":fuel_capacity",$fuel_capacity);
				$stmt->bindParam(":units",$units);
				$stmt->bindParam(":country",$country);
				$stmt->bindParam(":branch",$branch);
				$stmt->bindParam(":lease",$lease);
				$stmt->execute();
				$data = $stmt->rowCount();
				if($data >= 1){
					echo json_encode(["status" => 201]);
				}else{
					echo json_encode(["status" => 404]);
				}

		}
	}
	//deal with the leasing
	if(isset($_POST["lease"])){

		$data = $_POST["lease"];
		$user_id = str_replace("%23","#",$data["empoyeedId"]);
		$status = $data["condition"];
		$item_id = str_replace("%23","#",$data["itemId"]);
		//-compute
		$duration = $data["duration"];
		$due = $duration*86400;
		//--compute
		$reason = str_replace("%20"," ",$data["reason"]);
		$due_date = date ('Y-n-d',time()+$due);

		$stmt = $conn->prepare("INSERT INTO leased VALUES (:item_id,:user_id,:item_status,:due_date,:reason)");
		$stmt->bindParam(":item_id",$item_id);
		$stmt->bindParam(":user_id",$user_id);
		$stmt->bindParam(":item_status",$status);
		$stmt->bindParam(":due_date",$due_date);
		$stmt->bindParam(":reason",$reason);
		$stmt->execute();
		$final = $stmt->rowCount();
		if($final){
			echo json_encode(['status' => 201]);
		}else{
			echo json_encode(['status' =>409]);
		}

	}
	//adding emplyees to
	if(isset($_POST['employ'])){
		$data = $_POST["employ"];
		$attribs = ['firstname','lastname','email','phone','branch','designation','country','status'];
		if(!is_empty($attribs,$data)){
			//some are empty
			echo json_encode(["status" => 600]);
			die();
		}else{

			// none is empty
			if(!filter_var(str_replace("%40","@",$data["email"]),FILTER_VALIDATE_EMAIL)){
				// email is valid
				echo json_encode(["status" => 601]);
				die();
			}else{
				if(strlen($data["phone"]) != 10){
					echo json_encode(["status" => 602]);
					die();
				}
			}
		}
		$id = "#".hash("joaat",uniqid());
		$firstname = $data["firstname"];
		$lastname =$data["lastname"];
		$email = $data["email"];
		$phone = $data["phone"];
		$branch = $data["branch"];
		$designation = $data["designation"];
		$country = $data["country"];
		$emp_status = $data["status"];
		$pass = mt_rand(40000,90000);

		$stmt = $conn->prepare("INSERT INTO user VALUES (:id,:firstname,:lastname,:email,:phone,:country,:branch,:designation,:emp_status,:pass)");
		$stmt->bindParam(":id",$id);
		$stmt->bindParam(":firstname",$firstname);
		$stmt->bindParam(":lastname",$lastname);
		$stmt->bindParam(":email",$email);
		$stmt->bindParam(":phone",$phone);
		$stmt->bindParam(":country",$country);
		$stmt->bindParam(":branch",$branch);
		$stmt->bindParam(":designation",$designation);
		$stmt->bindParam(":emp_status",$emp_status);
		$stmt->bindParam(":pass",$pass);
		$stmt->execute();
		$final = $stmt->rowCount();
		if($final){
			echo json_encode(["status"=> 201]);
		}else{
			echo json_encode(["status" => 404]);
		}
	}
	if(isset($_POST['getBranch'])){
		$code = $_POST["getBranch"]["country"];
		$stmt = $conn->prepare("SELECT branch FROM country_branch WHERE code = :code");
		$stmt->bindParam(":code",$code);
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$stmt->execute();
		$data = $stmt->fetchAll();
		$final_branch = explode(".", $data[0]["branch"]);
		echo json_encode($final_branch);
	}
	// data to ad to the session after we have had aclick on edit
	if(isset($_POST["editStore"])){
		$id = $_POST["editStore"];
		$stmt = $conn ->prepare("SELECT * FROM product WHERE id=:id");
		$stmt->bindParam(":id",$id);
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$stmt->execute();
		$value = $stmt->fetchAll();
		// print the for the to the dashboard
		echo json_encode($value);
	}
	//gtting the lease data the feeing to the repla
	if(isset($_POST["editLease"])){
		$id = $_POST["editLease"];
		$stmt = $conn ->prepare("SELECT * FROM leased WHERE item_id=:id");
		$stmt->bindParam(":id",$id);
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$stmt->execute();
		$value = $stmt->fetchAll();
		// print the for the to the dashboard
		echo json_encode($value);
		// echo $id;
	}

	//listening for an update post
	if(isset($_POST['updateItem'])){
		$data = $_POST["updateItem"];
		$item_name = spacer($data['itemName']);
		$price = spacer($data["price"]);
		$color = spacer($data["color"]);
		$engine_size = spacer($data["engineSize"]);
		$item_state = spacer($data["state"]);
		$cover = spacer($data["cover"]);
		$make = spacer($data["make"]);
		$origin = spacer($data["origin"]);
		$item_year = spacer($data["year"]);
		$fuel_type = spacer($data['fuelType']);
		$fuel_capacity = spacer($data["fuelCapacity"]);
		$units = spacer($data["units"]);
		$lease = spacer($data["lease"]);
		$prod_id = $data["id"];
		//db -> res
		$data = [
		'name' => $item_name,
		"id" => $prod_id,
		"price" =>$price,
		"color" =>$color,
		"engine_size" =>$engine_size,
		"item_state" =>$item_state,
		"cover" =>$cover,
		"make" =>$make,
		"origin" =>$origin,
		"item_year" =>$item_year,
		"fuel_type" =>$fuel_type,
		"fuel_capacity" =>$fuel_capacity,
		"units" =>$units,
		"lease" =>$lease
		];
		$sql = "UPDATE product SET name = :name, price=:price, color = :color, engine_size = :engine_size,state = :item_state, cover = :cover, make = :make, origin = :origin, year = :item_year, fuel_type = :fuel_type, fuel_capacity = :fuel_capacity, units = :units, leaseable = :lease WHERE id = :id";
		$stmt= $conn->prepare($sql);
		$stmt->execute($data);
		$final = $stmt->rowCount();
		if($final >= 1){
			echo json_encode(["status" => 201]);
		}else{
			echo json_encode(["status" => 404]);
		}
	}
	//updateing the lease data
	if(isset($_POST["updateLease"])){
		$data = $_POST["updateLease"];
		$item_id = $data["itemId"];
		$employee_id = $data['empoyeedId'];
		$condition = $data["condition"];
		$duration = date('Y-n-d',(time()+($data['duration']*86400)));
		$reason = str_replace("%20"," ",$data["reason"]);
		// db -> res
		$data = [
		'item_id' => $item_id,
		'condition' => $condition,
		'due_date' => $duration,
		'reason' => $reason,
		];
		$sql = "UPDATE leased SET status = :condition, due_date = :due_date, reason = :reason WHERE item_id = :item_id";
		$stmt= $conn->prepare($sql);
		$stmt->execute($data);
		$final = $stmt->rowCount();
		if($final >= 1){
			echo json_encode(["status" => 201]);
		}else{
			echo json_encode(["status" => 404]);
		}
	}
}

?>


