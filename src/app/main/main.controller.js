export class MainController {
	constructor ($http) {
		'ngInject';
		this.$http = $http;
	}
	postMessage(){
		this.$http.post('http://localhost:5000/api/message',{msg: this.message ? this.message : ""});
	}
	getMessages(){
		var vm = this;
		this.$http.get('http://localhost:5000/api/message').then(function(result){
			vm.messages = result.data;
		});
	}
}
