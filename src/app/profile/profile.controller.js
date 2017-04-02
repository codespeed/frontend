export class ProfileController {
	constructor ($http, $auth) {
		'ngInject';
		this.$http = $http;
		this.$auth = $auth;

		this.getprofile();
	}
	getprofile(){
		var vm = this;
		var token = this.$auth.getToken();
		this.$http.post('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/api/profile',{token: token}).then(function(result){
			var data = result.data;

			vm.displayProfle(data)
		});
	}
	updateProfile(){
		var data = {
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
			ioe_establishment : this.properValue( this.ioe_establishment )
		};

		var validation = this.validateData(data);

		if (!validation['valid']) {
			alert(validation['message']);
		}

		this.updateSubmitApplication(data);
	}
	properValue( value ){
		return typeof value != 'undefined' ? value : '';
	}
	validateData( data ){
		var valid = true;
		var message = "Validated!";

		if (data['username'] == "") { message = "Empty Username!"; }
		if (data['firstname'] == "") { message = "Empty Firstname!"; }
		if (data['lastname'] == "") { message = "Empty Lastname!"; }
		if (data['email'] == "") { message = "Empty Email Address!"; }
		if (data['gender'] == "") { message = "Empty Email Address!"; }
		if (data['birthday'] == "") { message = "Empty Birthday!"; }
		if (data['status'] == "") { message = "Empty Status!"; }
		if (data['nationality'] == "") { message = "No Nationality"; }
		if (data['contact'] == "") { message = "No Nationality"; }

		valid = message != "Validated!" ? false : valid;
		return {valid:valid,message:message};
	}
	updateSubmitApplication(data){
		var token = this.$auth.getToken();
		this.$http.post('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/api/profile-update', {data:data, token:token}).success(function(result){
			alert(result.message)
		}).error(function(){
			alert("Unable to Proceed. ");
		});
	}
	displayProfle(data){
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.email = data.email;
		this.nickname = data.nickname;
		this.gender = data.gender;
		this.birthday = data.birthday;
		this.status = data.status;
		this.nationality = data.nationality;
		this.contact = data.contact;
		this.address = data.address;
		this.note = data.note;

		this.ioe_name = data.ioe_name;
		this.ioe_relation = data.ioe_relation;
		this.ioe_address = data.ioe_address;
		this.ioe_contact = data.ioe_contact;
		this.ioe_establishment = data.ioe_establishment;
		
	}
}
