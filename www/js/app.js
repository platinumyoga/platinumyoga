var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login')
	
  $stateProvider	
	.state('login', {
			url:"/login",
			templateUrl:"templates/login.html",
			controller:"loginCtrl"
	})
	.state('forgot-password', {
			url:"/forgot-password",
			templateUrl:"templates/forgot-password.html",
	})
    .state('yoga-app', {
	  //this is the parent list, cannot link here (treat as header)	, only link to child
      url: "/yoga-app",
	  //abstract enable nesting (certain parts of the page retained)
      abstract: true,
      templateUrl: "templates/yoga-app.html"
    })
    .state('yoga-app.profile', {
      url: '/profile',
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
        }
      }
    })
    .state('yoga-app.classes', {
      url: '/classes',
      views: {
        'menuContent' :{
          templateUrl: "templates/classes.html",
        }
      }
    })
	.state('yoga-app.workshops', {
      url: "/workshops",
      views: {
        'menuContent' :{
          templateUrl: "templates/workshops.html",
        }
      }
    })
	.state('yoga-app.events', {
      url: "/events",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
        }
      }
    })
	.state('yoga-app.appointments', {
      url: "/appointments",
      views: {
        'menuContent' :{
          templateUrl: "templates/appointments.html",
        }
      }
    })
	.state('yoga-app.challenges', {
      url: "/challenges",
      views: {
        'menuContent' :{
          templateUrl: "templates/challenges.html",
        }
      }
    })
	.state('yoga-app.posetree', {
      url: "/posetree",
      views: {
        'menuContent' :{
          templateUrl: "templates/posetree.html",
        }
      }
    })
	.state('yoga-app.luckydraw', {
      url: "/luckydraw",
      views: {
        'menuContent' :{
          templateUrl: "templates/luckydraw.html",
        }
      }
    })
	.state('yoga-app.halloffame', {
      url: "/halloffame",
      views: {
        'menuContent' :{
          templateUrl: "templates/halloffame.html",
        }
      }
    })
})


app.controller('loginCtrl', function($scope, $state) {
	$scope.signIn = function(user) {
		console.log('login', user);
		$state.go('yoga-app.profile');
	};
})

//$ionicSideMenuDelegate is the dependency for menu
app.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
	//left menu
	$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('classesCtrl', function($scope, $ionicLoading, $timeout) {
  $scope.classesData = {
    "filter" : 'beginner',
    "classes": [
      {
        type : "beginner",
        name : "beginner class",
		date : "12-12-14",
		time : "12:30pm",
		instructor: "Mrs Yuna"
      },
      {
        type : "intermediate",
        name : "intermediate class",
		date : "12-12-14",
		time : "12:30pm",
		instructor: "Mrs Yuka"
      },
      {
        type : "advance",
        name : "advance class",
		date : "12-12-14",
		time : "12:30pm",
		instructor: "Mrs Yuka"
      }
    ]
  };
})