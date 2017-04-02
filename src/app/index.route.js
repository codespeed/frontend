export function routerConfig ($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'app/main/main.html',
		controller: 'MainController',
		controllerAs: 'main'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'app/auth/auth.html',
		controller: 'AuthController',
		controllerAs: 'auth'
	})
	.state('registration', {
		url: '/registration',
		templateUrl: 'app/pages/registration.html',
		controller: 'PageController',
		controllerAs: 'page'
	})
	.state('registration-confirmation', {
		url: '/registration-confirmation',
		templateUrl: 'app/pages/registration-success.html',
		controller: 'PageController',
		controllerAs: 'page'
	})
	.state('registration-process', {
		url: '/registration-process',
		templateUrl: 'app/pages/registration-process.html',
		controller: 'PageController',
		controllerAs: 'page'
	})
	.state('about', {
		url: '/about',
		templateUrl: 'app/pages/aboutus.html',
		controller: 'PageController',
		controllerAs: 'about'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: 'app/profile/profile.html',
		controller: 'ProfileController',
		controllerAs: 'profile'
	})
	.state('profile-picture', {
		url: '/profile-picture',
		templateUrl: 'app/profile/profile-picture-edit.html',
		controller: 'ProfileController',
		controllerAs: 'profileUploader'
	})
	.state('apply', {
		url: '/apply',
		templateUrl: 'app/apply/apply.html',
		controller: 'ApplyController',
		controllerAs: 'apply'
	})
	.state('apply-submitted', {
		url: '/apply-submitted',
		templateUrl: 'app/apply/apply-submitted.html',
		controller: 'ApplyController',
		controllerAs: 'apply'
	})
	.state('apply-resend', {
		url: '/apply-resend',
		templateUrl: 'app/apply/apply-resend.html',
		controller: 'ApplyController',
		controllerAs: 'apply'
	})
	.state('apply-updated', {
		url: '/apply-updated',
		templateUrl: 'app/apply/apply-updated.html',
		controller: 'ApplyController',
		controllerAs: 'apply'
	})
	.state('events', {
		url: '/events',
		templateUrl: 'app/pages/events.html',
		controller: 'EventController',
		controllerAs: 'event'
	})
	.state('event-selected', {
		url: '/events/:slug',
		templateUrl: 'app/pages/events-selected.html',
		controller: 'EventController',
		controllerAs: 'event'
	});

	/*$urlRouterProvider
         .when("/events/:slug", {
            templateUrl: 'app/pages/events-selected.html',
            controller: "EventController",
            controllerAs: 'event'
        });*/

	$urlRouterProvider.otherwise('/');
}
