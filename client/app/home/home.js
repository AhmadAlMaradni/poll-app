angular.module('WebTerminal.home', [])
.controller('homeController', function ($scope, $webSql, $location, $window, $rootScope) {

	$scope.user = {};
	$scope.ShowpassVali = null;
	$scope.loginVali = null;
	$scope.db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 4 * 1024 * 1024); 

	$scope.db.createTable('user', {
		"id":{
			"type": "INTEGER",
		    "null": "NOT NULL", 
		    "primary": true, 
		    "auto_increment": true // auto increment
		},
		"created":{
			"type": "TIMESTAMP",
			"null": "NOT NULL",
		    "default": "CURRENT_TIMESTAMP" // default value
		},
		"username":{
			"type": "TEXT",
			"null": "NOT NULL"
		},
		"password": {
			"type": "TEXT",
			"null": "NOT NULL"
		},
		"email":{
			"type": "TEXT",
			"null": "NOT NULL"
		},
		"city": {
			"type": "TEXT"
		}
	})

	$scope.login = function () {
		
		$scope.db.select("user", {
			"password": {
				"value":$scope.user.password,
				"union":'AND'
			},
			"username":$scope.user.username
		}).then(function(results) {
			console.log(results)
			if(results.rows.length ==0){
				$scope.loginValidation = "invalid E-mail or password";
				$scope.loginVali = true;
			}else{
				$window.location.href = '/#!/home/poll';
				$rootScope.userInfo = results.rows[0];
			}

		})
		$rootScope.navBtn = true;
	};

	$scope.register = function () {

		if($scope.user.password.length < 7){
			$scope.passwordValidation = "password must be at least 8 character";
			$scope.ShowpassVali = true;
			return;
		}

		$scope.db.select("user", {
			"username": {
				"value":$scope.user.username
			}
		}).then(function(results) {
			if(results.rows.length != 0){
				$scope.passwordValidation = "username already taken";
				$scope.ShowpassVali = true;
			}else {
				$scope.db.insert('user', {"username": $scope.user.username,
					"email": $scope.user.email,
					"password": $scope.user.password,
					'city': $scope.user.city})
				.then(function(results) {
					$scope.db.select("user", {
							"password": {
								"value":$scope.user.password,
								"union":'AND'
							},
							"email":$scope.user.email
						}).then(function(results) {
								$rootScope.userInfo = results.rows[0];
								$window.location.href = '/#!/home/poll';
					})

				})

			}
		})
		$rootScope.navBtn = true;
	};


	$scope.editProfile = function() {
		if($scope.user.password.length < 7){
			$scope.passwordValidation = "password must be at least 8 character";
			$scope.ShowpassVali = true;
			return;
		}
		$scope.db.update("user", {	  "username": $scope.user.username,
			"email": $scope.user.email,
			"password": $scope.user.password,
			'city': $scope.user.city}, {
				'id': $rootScope.userInfo.id
			});

		$scope.db.select("user", {
			"password": {
				"value":$scope.user.password,
				"union":'AND'
			},
			"username":$scope.user.username
		}).then(function(results) {
			$rootScope.userInfo = results.rows[0];
		})
		$scope.Prof=false;
	}



})