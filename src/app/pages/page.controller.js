export class PageController {
	constructor ($http, $location, $log) {
		'ngInject';
		this.$http = $http;
		this.location = location;
		this.$log = $log;

		this.fieldset = false;

		var verification_code_here = this.getParameterByName('confirmation-code', $location.absUrl());

		if (verification_code_here) {
			this.verify_account(verification_code_here);
		}else{
			this.testGenerator();
		}

		this.getEstablishment();
	}
	getParameterByName(name, url) {
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	postMessage(){
		this.$http.post('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/api/message',{msg: this.message ? this.message : ""});
	}
	getMessages(){
		var vm = this;
		this.$http.get('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/api/establishments').then(function(result){
			vm.messages = result.data;
		});
	}
	getEstablishment(){
		var vm = this;
		this.$http.get('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/api/establishments').then(function(result){
			vm.messages = result.data;
		});
	}
	properValue( value ){
		return typeof value != 'undefined' ? value : '';
	}
	testGenerator(){
		/*this.username = "test";
		this.password = "test";
		this.password_confirm = "test";

		this.firstname = "test";
		this.lastname = "test";
		this.email = "testuser@127.0.0.1";
		this.nickname = "test";
		this.gender = "male";
		this.birthday = "test";
		this.status = "single";
		this.nationality = "test";
		this.contact = "1234";
		this.address = "test";
		this.note = "test";

		this.ioe_name = "test";
		this.ioe_relation = "test";
		this.ioe_address = "test";
		this.ioe_contact = "1234";
		this.ioe_establishment = "test";*/

		this.username = "na";
		this.password = "";
		this.password_confirm = "";

		this.firstname = "";
		this.lastname = "";
		this.email = "";
		this.nickname = "";
		this.gender = "male";
		//this.birthday = "";
		this.status = "single";
		this.nationality = "";
		this.contact = "";
		this.address = "";
		this.note = "";
		this.month ="0";
		this.day ="0";
		this.year ="0";

		this.ioe_name = "";
		this.ioe_relation = "";
		this.ioe_address = "";
		this.ioe_contact = "";
		this.ioe_establishment = "n/a";

	}
	submit(){
		var data = {
			username : this.properValue( this.username ),
			password : this.properValue( this.password ),
			password_confirm : this.properValue( this.password_confirm ),

			firstname : this.properValue( this.firstname ),
			lastname : this.properValue( this.lastname ),
			email : this.properValue( this.email ),
			nickname : this.properValue( this.nickname ),
			gender : this.properValue( this.gender ),
			//birthday : this.properValue( this.birthday ),
			birthday : this.month+"-"+this.day+"-"+this.year,
			status : this.properValue( this.status ),
			nationality : this.properValue( this.nationality ),
			contact : this.properValue( this.contact ),
			address : this.properValue( this.address ),
			note : this.properValue( this.note ),

			ioe_name : this.properValue( this.ioe_name ),
			ioe_relation : this.properValue( this.ioe_relation ),
			ioe_address : this.properValue( this.ioe_address ),
			ioe_contact : this.properValue( this.ioe_contact ),
			ioe_establishment : this.properValue( this.ioe_establishment ),
			type:"Online",
			date_expired_text: "",
            date_expired_number:"",
            d:"",
		};

		var validation = this.validateData(data);

		if (!validation['valid']) {
			alert(validation['message']);
		}else{
			this.postSubmitApplication(data);
		}

	}
	validateData( data ){
		var valid = true;
		var message = "Validated!";

		if (this.username == "") { message = "Username is empty!" }
		if (this.password == "") { message = "Password is empty!" }
		if (this.password_confirm == "") { message = "Re-type Passowrd" }
		if (this.firstname == "") { message = "Firstname is empty!" }
		if (this.lastname == "") { message = "Lastname is empty!" }
		if (this.email == "") { message = "Middle Name is empty!" }
		if (!this.isValidEmailAddress(this.email)) { message = "Invalid Email Address" }
		if (this.nickname == "") { message = "Nick-name is empty!" }
		if (this.gender == "") { message = "Gender is empty!" }
		//if (this.birthday == "") { message = "Birthday is empty!" }
		if (this.status == "") { message = "Status is empty!" }
		if (this.nationality == "") { message = "Nationality is empty!" }
		if (this.contact == "") { message = "Contact is empty!" }
		if (this.address == "") { message = "Address is empty!" }
		if (this.ioe_name == "") { message = "IOE field is empty!" }
		if (this.ioe_relation == "") { message = "IOE field is empty!" }
		if (this.ioe_address == "") { message = "IOE field is empty!" }
		if (this.ioe_contact == "") { message = "IOE field is empty!" }
		if (this.ioe_establishment == "") { message = "IOE field is empty!" }

		valid = message != "Validated!" ? false : valid;
		return {valid:valid,message:message};
	}
	postSubmitApplication(data){
		var location = this.location;
		var vm = this;
		this.$http.post('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/auth/register', data).success(function(){
			location.href = location.origin + "/#/registration-process"
		}).error(function(err){
			alert( err['message'] );
		});
	}
	verify_account( code ){
		this.$http.post('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/auth/registration-confirmation',{code: code});
	}
	validFields(){
		var data = {
			username : this.properValue( this.username ),
			password : this.properValue( this.password ),
			password_confirm : this.properValue( this.password_confirm ),
			firstname : this.properValue( this.firstname ),
			lastname : this.properValue( this.lastname ),
			email : this.properValue( this.email ),
			nickname : this.properValue( this.nickname ),
			gender : this.properValue( this.gender ),
			//birthday : this.properValue( this.birthday ),
			status : this.properValue( this.status ),
			nationality : this.properValue( this.nationality ),
			contact : this.properValue( this.contact ),
			address : this.properValue( this.address ),
			note : this.properValue( this.note ),
			ioe_name : this.properValue( this.ioe_name ),
			ioe_relation : this.properValue( this.ioe_relation ),
			ioe_address : this.properValue( this.ioe_address ),
			ioe_contact : this.properValue( this.ioe_contact ),
			ioe_establishment : this.properValue( this.ioe_establishment ),
			type:"Online",
			date_expired_text: "",
            date_expired_number:"",
            d:"",
		};

		return (this.validateData(data)['valid'])?false:true;
	}
	isValidEmailAddress(emailAddress){
		   var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
              return pattern.test(emailAddress);
	}
	 
}
