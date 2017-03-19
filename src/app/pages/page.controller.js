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
		this.$http.post('http://localhost:5000/api/message',{msg: this.message ? this.message : ""});
	}
	getMessages(){
		var vm = this;
		this.$http.get('http://localhost:5000/api/establishments').then(function(result){
			vm.messages = result.data;
		});
	}
	getEstablishment(){
		var vm = this;
		this.$http.get('http://localhost:5000/api/establishments').then(function(result){
			vm.messages = result.data;
		});
	}
	properValue( value ){
		return typeof value != 'undefined' ? value : '';
	}
	testGenerator(){
		this.username = "test";
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
		this.contact = "test";
		this.address = "test";
		this.note = "test";

		this.ioe_name = "test";
		this.ioe_relation = "test";
		this.ioe_address = "test";
		this.ioe_contact = "test";
		this.ioe_establishment = "test";
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
			birthday : this.properValue( this.birthday ),
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
            date_expired_number:""
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
		if (this.nickname == "") { message = "Nick-name is empty!" }
		if (this.gender == "") { message = "Gender is empty!" }
		if (this.birthday == "") { message = "Birthday is empty!" }
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
		this.$http.post('http://localhost:5000/auth/register', data).success(function(){
			location.href = location.origin + "/#/registration-process"
		}).error(function(err){
			alert( err['message'] );
		});
	}
	verify_account( code ){
		this.$http.post('http://localhost:5000/auth/registration-confirmation',{code: code});
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
			birthday : this.properValue( this.birthday ),
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
            date_expired_number:""
		};

		return this.validateData(data)['valid'];
	}
}
