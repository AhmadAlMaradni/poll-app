angular.module('SmartWay', [
	// 'ngRoute',
  'ui.router',
  'ui.bootstrap',
  'WebTerminal.home',
  'WebTerminal.poll',
  'ngMaterial',
  'angular-websql',
  'ngMdIcons'
  ])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home/main');

  $stateProvider
		.state('home', {
			abstract : true,
			url : "/home",
			templateUrl : "app/common/content.html",
     		 controller: 'homeController'
		})
		.state('home.main', {
			url : "/main",
			templateUrl : "app/home/home.html",
			controller: 'homeController'

		})
	    .state('home.poll', {
	      url : "/poll",
	      templateUrl : "app/poll/poll.html",
	      controller: 'pollController'
	    })
	    .state('home.profile', {
	      url : "/profile",
	      templateUrl : "app/home/profile.html",
	      controller: 'homeController'
	    })
})