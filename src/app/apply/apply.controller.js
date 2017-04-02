export class ApplyController {
	constructor ($http, $auth, $location) {
		'ngInject';
		this.$http = $http;
		this.$auth = $auth;
		this.$location = $location;
		this.location = location;

		this.Step1 = 0;
		this.ApplicationStatus = "no";
		//this.hc_job_category = "Non-Food";
		this.getprofile();
	}
	getStep(stem_counter){
		return stem_counter == this.Step1;
	}
	next(){
		return this.Step1++;
	}
	prev(){
		return this.Step1--;
	}
	getprofile(){
		var vm = this;
		var token = this.$auth.getToken();
		vm.$http.post('http://localhost:5000/api/health-card-data',{token: token}).then(function(result){
			var data = result.data;
			if (!data) {
				vm.$http.post('http://localhost:5000/api/profile',{token: token}).then(function(result){
					var data = result.data;
					vm.displayProfle(data)
				});
			}else{
				vm.displayProfle(data)
			}
		});
	}
	displayProfle(data){
		this.hc_lastname = data.hc_lastname ? data.hc_lastname : data.lastname;
		this.hc_firstname = data.hc_firstname ? data.hc_firstname : data.firstname;
		this.hc_middlename = data.hc_middlename ? data.hc_middlename : "";
		//this.hc_age = data.hc_age ? data.hc_age : "";
		this.hc_sex = data.hc_sex ? data.hc_sex : data.gender;
		this.hc_civilstatus = data.hc_civilstatus ? data.hc_civilstatus : data.status;
		this.hc_nationality = data.hc_nationality ? data.hc_nationality : data.nationality;
		this.hc_cedula = data.hc_cedula ? data.hc_cedula : "";
		this.hc_cedula_date_issued = data.hc_cedula_date_issued ? data.hc_cedula_date_issued : "";
		this.hc_OR_fee_number = data.hc_OR_fee_number ? data.hc_OR_fee_number : "";
		this.hc_OR_fee_number_date_issued = data.hc_OR_fee_number_date_issued ? data.hc_OR_fee_number_date_issued : "";
		this.hc_icoe_name = data.hc_icoe_name ? data.hc_icoe_name : data.ioe_name;
		this.hc_icoe_relation = data.hc_icoe_relation ? data.hc_icoe_relation : data.ioe_relation;
		this.hc_icoe_address = data.hc_icoe_address ? data.hc_icoe_address : data.ioe_address;
		this.hc_icoe_contact_number = data.hc_icoe_contact_number ? data.hc_icoe_contact_number : data.ioe_contact;
		this.ApplicationStatus = data.request_status ? data.request_status : "no";

		this.hc_business_employment = data.hc_business_employment ? data.hc_business_employment : "";
		this.hc_job_category = data.hc_job_category ? data.hc_job_category : "";
		this.hc_position = data.hc_position ? data.hc_position : "";
		this.hc_ethnic_group = data.hc_ethnic_group ? data.hc_ethnic_group : "";
		this.verification_code = data.verification_code ? data.verification_code : "";
	}
	applicationStatus(status){
		return this.ApplicationStatus == status;
	}


	submit(){
		if (this.hc_contact == "") {
			alert("Contact Number is required*");
			return;
		}

		var token = this.$auth.getToken();

		var data = {
			hc_lastname : this.properValue( this.hc_lastname ),
			hc_firstname : this.properValue( this.hc_firstname ),
			hc_middlename : this.properValue( this.hc_middlename ),
			//hc_age : this.properValue( this.hc_age ),
			hc_sex : this.properValue( this.hc_sex ),
			hc_civilstatus : this.properValue( this.hc_civilstatus ),
			hc_nationality : this.properValue( this.hc_nationality ),
			hc_cedula : this.properValue( this.hc_cedula ),
			hc_cedula_date_issued : this.properValue( this.hc_cedula_date_issued ),
			hc_OR_fee_number : this.properValue( this.hc_OR_fee_number ),
			hc_OR_fee_number_date_issued : this.properValue( this.hc_OR_fee_number_date_issued ),
			hc_icoe_name : this.properValue( this.hc_icoe_name ),
			hc_icoe_relation : this.properValue( this.hc_icoe_relation ),
			hc_icoe_address : this.properValue( this.hc_icoe_address ),
			hc_icoe_contact_number : this.properValue( this.hc_icoe_contact_number ),

			hc_business_employment : this.properValue( this.hc_business_employment ),
			hc_job_category : this.properValue( this.hc_job_category ),
			hc_position : this.properValue( this.hc_position ),
			hc_ethnic_group : this.properValue( this.hc_ethnic_group ),
			d : "",
			m : "",
			y : "",
			hid : ""
		};

		var validation = this.validateData(data);

		if (!validation['valid']) {
			// alert("Invalid");
			// alert(validation['message']);
		}else{
			// alert("Unable to Proceed. Encountered");
		}

		this.postSubmitApplication(data, this.hc_contact, token);
	}
	update(){
		if (this.hc_contact == "") {
			alert("Contact Number is required*");
			return;
		}

		var token = this.$auth.getToken();

		var data = {
			hc_lastname : this.properValue( this.hc_lastname ),
			hc_firstname : this.properValue( this.hc_firstname ),
			hc_middlename : this.properValue( this.hc_middlename ),
			//hc_age : this.properValue( this.hc_age ),
			hc_sex : this.properValue( this.hc_sex ),
			hc_civilstatus : this.properValue( this.hc_civilstatus ),
			hc_nationality : this.properValue( this.hc_nationality ),
			hc_cedula : this.properValue( this.hc_cedula ),
			hc_cedula_date_issued : this.properValue( this.hc_cedula_date_issued ),
			hc_OR_fee_number : this.properValue( this.hc_OR_fee_number ),
			hc_OR_fee_number_date_issued : this.properValue( this.hc_OR_fee_number_date_issued ),
			hc_icoe_name : this.properValue( this.hc_icoe_name ),
			hc_icoe_relation : this.properValue( this.hc_icoe_relation ),
			hc_icoe_address : this.properValue( this.hc_icoe_address ),
			hc_icoe_contact_number : this.properValue( this.hc_icoe_contact_number ),
			hc_business_employment : this.properValue( this.hc_business_employment ),
			hc_job_category : this.properValue( this.hc_job_category ),
			hc_position : this.properValue( this.hc_position ),
			hc_ethnic_group : this.properValue( this.hc_ethnic_group )
		};

		var validation = this.validateData(data);

		if (!validation['valid']) {
			alert( validation['message'] );
		}else{
			this.postUpdateApplication(data, this.hc_contact, token);
		}

	}
	properValue( value ){
		return typeof value != 'undefined' ? value : '';
	}
	validateData( data ){
		var valid = true;
		var message = "Validated!";

		if (data['hc_lastname'] == "") { message = "Empty Firstname!"; }
		if (data['hc_lastname'] == "") { message = "Empty Lastname!"; }
		if (data['hc_middlename'] == "") { message = "Empty Middle!"; }
		if (data['gender'] == "") { message = "Select Gender!"; }
		if (data['status'] == "") { message = "Empty Status!"; }
		if (data['nationality'] == "") { message = "No Nationality"; }

		if (data['hc_lastname'] == "") { message = "Lastname is empty!"; }
		if (data['hc_firstname'] == "") { message = "Firstname is empty!"; }
		if (data['hc_middlename'] == "") { message = "Middle Name is empty!"; }
		//if (data['hc_age'] == "") { message = "Age is empty!"; }
		if (data['hc_sex'] == "") { message = "Sex is empty!"; }
		if (data['hc_civilstatus'] == "") { message = "Civil Status is empty!"; }
		if (data['hc_nationality'] == "") { message = "Nationality is empty!"; }
		if (data['hc_cedula'] == "") { message = "Cedula is empty!"; }
		if (data['hc_cedula_date_issued'] == "") { message = "Cedula Issued Date is empty!"; }
		if (data['hc_OR_fee_number'] == "") { message = "OR Number is empty!"; }
		if (data['hc_OR_fee_number_date_issued'] == "") { message = "OR Number Date Issued is empty!"; }
		if (data['hc_icoe_name'] == "") { message = "ICOE Field is empty!"; }
		if (data['hc_icoe_relation'] == "") { message = "ICOE Field is empty!"; }
		if (data['hc_icoe_address'] == "") { message = "ICOE Field is empty!"; }
		if (data['hc_icoe_contact_number'] == "") { message = "ICOE Field is empty!"; }
		if (data['hc_business_employment'] == "") { message = "Business Employment is empty!"; }
		if (data['hc_job_category'] == "") { message = "Job Category is empty!"; }
		if (data['hc_position'] == "") { message = "Position is empty!"; }
		if (data['hc_ethnic_group'] == "") { message = "Ethnic Group is empty!"; }


	    valid = message != "Validated!" ? false : valid;
		return {valid:valid,message:message};
	}
	validFields(){
		var data = {
			hc_lastname : this.properValue( this.hc_lastname ),
			hc_firstname : this.properValue( this.hc_firstname ),
			hc_middlename : this.properValue( this.hc_middlename ),
			//hc_age : this.properValue( this.hc_age ),
			hc_sex : this.properValue( this.hc_sex ),
			hc_civilstatus : this.properValue( this.hc_civilstatus ),
			hc_nationality : this.properValue( this.hc_nationality ),
			hc_cedula : this.properValue( this.hc_cedula ),
			hc_cedula_date_issued : this.properValue( this.hc_cedula_date_issued ),
			hc_OR_fee_number : this.properValue( this.hc_OR_fee_number ),
			hc_OR_fee_number_date_issued : this.properValue( this.hc_OR_fee_number_date_issued ),
			hc_icoe_name : this.properValue( this.hc_icoe_name ),
			hc_icoe_relation : this.properValue( this.hc_icoe_relation ),
			hc_icoe_address : this.properValue( this.hc_icoe_address ),
			hc_icoe_contact_number : this.properValue( this.hc_icoe_contact_number ),
			hc_business_employment : this.properValue( this.hc_business_employment ),
			hc_job_category : this.properValue( this.hc_job_category ),
			hc_position : this.properValue( this.hc_position ),
			hc_ethnic_group : this.properValue( this.hc_ethnic_group ), 
			d : "",
			m : "",
			y : "",
			hid : ""
		};

		return this.validateData(data)['valid'];
	}
	postSubmitApplication(data, contact, token){
		var location = this.location;
		this.$http.post('http://localhost:5000/api/health-card-application', {data:data, contact:contact, token:token}).success(function(){
			location.href = location.origin + "/#/apply-submitted"
		}).error(function(err){
			alert("Unable to Proceed. " + err);
		});
	}
	postUpdateApplication(data, contact, token){
		var location = this.location;
		this.$http.post('http://localhost:5000/api/health-card-application-update', {data:data, contact:contact, token:token}).success(function(){
			location.href = location.origin + "/#/apply-updated"
		}).error(function(err){
			alert("Unable to Proceed. " + err);
		});
	}

	resendCode(){
		var cno = this.cno;
		var verification_code = this.verification_code;
		//var location = this.location;
		
		
		if(cno == ""){
			alert("Please enter Phone Number");
		}else{
			 if(cno.length  == 10){
			 	var location = this.location;
			 	$('#resend-code').modal("hide");
			 	location.href = location.origin + "/#/apply-resend";
			 	this.$http.post('http://localhost:5000/api/health-card-resend', {cno:cno, verification_code:verification_code}).success(function(){
					
				}).error(function(err){
					alert("Unable to Proceed. " + err);
				});

			}else{
				alert("Invalid Phone Number");
			}
		}
	}
}
