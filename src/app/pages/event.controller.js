export class EventController {
	constructor ($http, $location, $log, $stateParams, $state,$sce) {
		'ngInject';
		this.$http = $http;
		this.location = location;
		this.$log = $log;
		this.events= this.getEvents();

		var url_slug = this.location.hash;
		if(url_slug.split("/").length == 3){
			this.evnt= this.getEvent($state.params.slug);

			//console.log(this.evnt);
		
		}


		
		
		
		

	}
	
	getEvents(){
		var vm = this;
		this.$http.get('http://localhost:5000/events').then(function(result){
			vm.events = result.data;
		});
	}

	getEvent(slug){
		var vm = this;
		this.$http.get('http://localhost:5000/events/'+slug).then(function(result){
			vm.evnt = result.data;
		});
	}
	

}
