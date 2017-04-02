export class MainController {
	constructor ($http) {
		'ngInject';
		this.$http = $http;
	}
	postMessage(){
		this.$http.post('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/api/message',{msg: this.message ? this.message : ""});
	}
	getMessages(){
		var vm = this;
		this.$http.get('http://ec2-54-186-5-126.us-west-2.compute.amazonaws.com:5000/api/message').then(function(result){
			vm.messages = result.data;
		});
	}
}
