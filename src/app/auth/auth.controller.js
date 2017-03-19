export class AuthController{
	constructor ($auth, $location) {
		'ngInject';
		this.$auth = $auth;
		this.$location = $location;
		this.invalidAccount = false;
	}
	login(){
		if (this.email == '') {
			alert("Enter email address");
			return;
		}
		if (this.password == '') {
			alert("Enter password");
			return;
		}

		var vm = this;

		this.$auth.login(this.login.user).then(function(token){
			vm.$auth.setToken(token);
			vm.redirectHomepage();
		}).catch(function(response){
			vm.invalidAccount = true;
			console.log(response);
		});
	}
	resetAccountValidation(){
		this.invalidAccount = false;
	}
	redirectHomepage() {
		this.$location.path('/');
	}
}