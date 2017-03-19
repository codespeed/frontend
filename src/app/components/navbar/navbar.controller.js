export class NavbarController{
	constructor($auth, $location){
		'ngInject';
		
		this.$auth = $auth;
		this.isAuthenticated = $auth.isAuthenticated;
		this.$location = $location;
	}
	logout(){
		this.$auth.logout();
		this.$location.path('/login');
	}
}