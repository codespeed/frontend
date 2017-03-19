export class ProfileUploaderController {
	constructor (Upload, $log, $scope, $timeout, $auth, $http) {
		'ngInject';

		var vm = this;

		this.$log = $log;
		this.$auth = $auth;
		this.$http = $http;

		this.getToken = this.$auth.getToken();
		this.username = this.getToken;

		this.uploadPic = function(file) {
			file.upload = Upload.upload({
				url: 'http://localhost:5000/api/profile-picture-upload',
				data: {username: vm.username, file: file}
			}).then(function (response) {
				$timeout(function () {
					file.result = response.data;
				});
			}, function (response) {
				if (response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				/*Math.min is to fix IE which reports 200% sometimes*/ 
				file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		this.$http.post('http://localhost:5000/api/profile-picture',{token:this.getToken}).then(function(result){
			vm.profilePicture = "http://localhost:5000/api/profile-picture-img?src=" + result.data.profile_picture;
		});
	}
	getprofilePicture(){
	}
}
