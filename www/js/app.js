var app = angular.module('ionicApp', ['ionic','firebase','ui.router'])

//CONFIGURATION+ROUTE
//CONFIGURATION+ROUTE
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
    .state('yoga-app.home', {
      url: '/home',
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
		  controller: "homeCtrl"
        }
      }
    })
    .state('yoga-app.classes', {
      url: '/Classes',
      views: {
        'menuContent' :{
          templateUrl: "templates/classes.html",
		  controller: "classesCtrl"
        }
      }
    })
	.state('yoga-app.selectedClass', {
      url: '/selectedClass/:classID',
      views: {
        'menuContent' :{
          templateUrl: "templates/selectedClass.html",
		  controller: "classesCtrl"
        }
      }
    })
	.state('yoga-app.classStaff', {
      url: '/classStaff/:classStaffID',
      views: {
        'menuContent' :{
          templateUrl: "templates/classStaff.html",
		  controller: "classesCtrl"
        }
      }
    })
	.state('yoga-app.workshops', {
      url: '/Workshops',
      views: {
        'menuContent' :{
          templateUrl: "templates/workshops.html",
		  controller:"workshopCtrl"
        }
      }
    })
	.state('yoga-app.selectedWorkshop', {
      url: '/selectedWorkshop/:workshopID',
      views: {
        'menuContent' :{
          templateUrl: "templates/selectedWorkshop.html",
		  controller: "workshopCtrl"
        }
      }
    })
	.state('yoga-app.workshopStaff', {
      url: '/workshopStaff/:workshopStaffID',
      views: {
        'menuContent' :{
          templateUrl: "templates/workshopStaff.html",
		  controller: "workshopCtrl"
        }
      }
    })
	.state('yoga-app.events', {
      url: "/Events",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
		  controller: "eventsCtrl"
        }
      }
    })
	.state('yoga-app.selectedEvent', {
      url: "/selectedEvent/:eventID",
      views: {
        'menuContent' :{
          templateUrl: "templates/selectedEvent.html",
		  controller: "eventsCtrl"
        }
      }
    })
	.state('yoga-app.eventStaff', {
      url: '/eventStaff/:eventStaffID',
      views: {
        'menuContent' :{
          templateUrl: "templates/eventStaff.html",
		  controller: "eventsCtrl"
        }
      }
    })
	.state('yoga-app.appointments', {
      url: "/Appointments",
      views: {
        'menuContent' :{
          templateUrl: "templates/appointments.html",
		  controller:"appointmentCtrl"
        }
      }
    })
	.state('yoga-app.challenges', {
      url: "/Challenges",
      views: {
        'menuContent' :{
          templateUrl: "templates/challenges.html",
		  controller: "challengesCtrl"
        }
      }
    })
	.state('yoga-app.selectedChallenge', {
      url: "/selectedChallenge/:challengeID",
      views: {
        'menuContent' :{
          templateUrl: "templates/selectedChallenge.html",
		  controller: "challengesCtrl"
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
	.state('yoga-app.promotions', {
      url: "/promotions",
      views: {
        'menuContent' :{
          templateUrl: "templates/promotions.html",
		  controller: "promotionsCtrl"
        }
      }
    })
	.state('yoga-app.contactus', {
      url: "/contactus",
      views: {
        'menuContent' :{
          templateUrl: "templates/contactus.html",
        }
      }
    })
	.state('yoga-app.faq', {
      url: "/faq",
      views: {
        'menuContent' :{
          templateUrl: "templates/faq.html",
        }
      }
    })
	.state('yoga-app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html",
        }
      }
    })
	.state('yoga-app.barcode', {
      url: "/barcode",
      views: {
        'menuContent' :{
          templateUrl: "templates/barcode.html",
		  controller:"barcodeCtrl"
        }
      }
    })
	.state('yoga-app.setting', {
      url: "/setting",
      views: {
        'menuContent' :{
          templateUrl: "templates/setting.html",
		  controller:"settingCtrl"
        }
      }
    })
})

//services
app.factory('userService', function($http,$state,userScheduleService,historyService,purchaseHistoryService,userDetailsService) {
	var users = [];
	var userDatabase = "";
	
	return {
		authentication: function(user){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/login.php",
			data: {
				username: user.username,
				password: user.password
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				userDatabase = data;
				if(userDatabase.ValidateLoginResult.ErrorCode === 200){
					userID = userDatabase.ValidateLoginResult.Client.ID;
					alert("Successful Login!");
					userScheduleService.getUserSchedule(userID);
					historyService.getUserHistory(userID);
					purchaseHistoryService.getPurchaseHistory(userID);
					userDetailsService.getUserDetails(userID);
					$state.go("yoga-app.home");
				}else{
					alert(userDatabase.ValidateLoginResult.Message);
				}	
			})
			
			//not working
			request.error(function (data) {
				//alert(data);
                loginFail();
            })
		},
		getUserID: function(){
			return userDatabase.ValidateLoginResult.Client.ID;
		},
		getUsername: function(){
			return userDatabase.ValidateLoginResult.Client.FirstName+" "+userDatabase.ValidateLoginResult.Client.LastName;
		}
	}
})


//firebase
app.factory('healthTipDb', function($firebase) {
    var healthtipsLink = new Firebase("https://healthtipstinkertest.firebaseio.com/");
	var dataArr = $firebase(healthtipsLink).$asArray();
    return {
        getHealthTipsData: function() {
			return dataArr;
        },
		getTip:function(tipId){
			//healthtipsLink.child('-JekEefgbGTQq_JdneAC').on('value', function(snapshot) { alert(snapshot.val().details); })
			return 1;
		}
    }
})

app.factory('feedbackDb', function($firebase) {
    var feedbackLink = new Firebase("https://feedbacktinkertest.firebaseio.com/");
	var dataArr = $firebase(feedbackLink).$asArray();
    return {
        getFeedbackData: function() {
			return dataArr;
        }
    }
})


app.factory('userDetailsService', function($http) {
	return {
		getUserDetails: function(userId){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getClientDetails.php",
			data: {
				userID: userId,
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				userDetailsData = data;
			})
			//not working
			request.error(function (data) {
            })
		},
		getUserDetailsResponse:function(){
			return userDetailsData;
		},
		getUserEmail:function(){
			return userDetailsData.GetClientsResult.Clients.Client.Email;
		},
		getUserAddress:function(){
			return userDetailsData.GetClientsResult.Clients.Client.AddressLine1;
		},
		geUserPostalCode:function(){
			return userDetailsData.GetClientsResult.Clients.Client.PostalCode;
		},
		getUserMobile:function(){
			return userDetailsData.GetClientsResult.Clients.Client.MobilePhone;
		},
		getUserBirth:function(){
			return userDetailsData.GetClientsResult.Clients.Client.BirthDate;
		},
		getUserGender:function(){
			return userDetailsData.GetClientsResult.Clients.Client.Gender;
		}
	}
})


app.factory('updateUserDetailsService', function($http) {
	return {
		updateUserDetails: function(user){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/updateClientDetails.php",
			data: {
				userID:	user.id,
				address: user.address,
				email: user.email,
				mobilePhone: user.mobile,
				birthDate: user.birthDate,
				gender: user.gender,
				postalCode: user.postalCode
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				updateData = data;
				/*alert(user.id);
				alert(user.address);
				alert(user.mobile);
				alert(user.birthDate);
				alert(user.gender);
				alert(user.postalCode);
				alert(JSON.stringify(updateData));*/
				
				if(updateData.AddOrUpdateClientsResult.ErrorCode === 200){
					alert("Update Success!");
				}else{
					alert(updateData.AddOrUpdateClientsResult.Clients.Client.Messages.string);
				}
			})
			
			//not working
			request.error(function (data) {
				//alert("fail");
            })
		},
		checkValidity:function(){
			if(updateData.AddOrUpdateClientsResult.ErrorCode === 200){
					return true;
			}else{
					return false;
			}
		}
	}
})




app.factory('classesService', function($http,$ionicPopup,userScheduleService) {
	return {
		getClassesDatabase: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getClasses.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				classesDatabase = data.Classes.Class;
			})
		},
		getClasses:function(){
			return classesDatabase;
		},
		getSelectedClass:function(classID){	
			for(var i=0;i<classesDatabase.length;i++){
				if(classesDatabase[i].ID==classID){
					return classesDatabase[i];
				}
			}
		},
		getClassStaff:function(classStaffID){
			for(var i=0;i<classesDatabase.length;i++){
				if(classesDatabase[i].Staff.ID==classStaffID){
					return classesDatabase[i].Staff;
				}
			}
		},
		bookClass:function(classId,userId){
			var request1 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/bookClientIntoClass.php",
			data: {
				classID: classId,
				userID: userId
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request1.success(function (data) {
				var confirmBookingPopup = $ionicPopup.confirm({
					 title: 'Book Class',
					 template: 'Are you sure you want to book this class?',
					 okText: 'Confirm'
				   });
				   confirmBookingPopup.then(function(res) {
					 if(res){
						//click on confirm
						var returnMsg = "";
						if (data.AddClientsToClassesResult.ErrorCode===200){
							returnMsg = "Success!";
							userScheduleService.getUserSchedule(userId);
						}else{
							returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string);
						}
						 var alertPopup = $ionicPopup.alert({
							 title: 'Book Class',
							 template: returnMsg
						   });
						   alertPopup.then(function(res) {});
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
			})
			//not working
			request1.error(function (data) {
            })
		}
	}
})

app.factory('workshopsService',function($http,$ionicPopup,userScheduleService){
	return {
		getWorkshopsDatabase: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getWorkshops.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				workshopsDatabase = data;
			})
		},
		getWorkshops:function(){
			return workshopsDatabase;
		},
		getSelectedWorkshop:function(workshopID){
			for(var i=0;i<workshopsDatabase.length;i++){
				if(workshopsDatabase[i].ID==workshopID){
					return workshopsDatabase[i];
				}
			}
		},
		getWorkshopStaff:function(workshopStaffID){
			for(var i=0;i<workshopsDatabase.length;i++){
				if(workshopsDatabase[i].Staff.ID==workshopStaffID){
					return workshopsDatabase[i].Staff;
				}
			}
		},
		bookWorkshop:function(workshopId,userId){
			var request1 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/bookClientIntoWorkshop.php",
			data: {
				workshopID: workshopId,
				userID: userId
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request1.success(function (data) {
				var confirmBookingPopup = $ionicPopup.confirm({
					 title: 'Book Workshop',
					 template: 'Are you sure you want to book this workshop?',
					 okText: 'Confirm'
				   });
				   confirmBookingPopup.then(function(res) {
					 if(res){
						//click on confirm
						var returnMsg = "";
						if (data.AddClientsToEnrollmentsResult.ErrorCode===200){
							returnMsg = "Success!";
							userScheduleService.getUserSchedule(userId);
						}else{
							returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string);
						}
						 var alertPopup = $ionicPopup.alert({
							 title: 'Book Workshop',
							 template: returnMsg
						   });
						   alertPopup.then(function(res) {});
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
			})
			//not working
			request1.error(function (data) {
            })
		}
	}
})


app.factory('eventsService',function($http,$ionicPopup,userScheduleService){
	return {
		getEventsDatabase: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getWorkshops.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				eventsDatabase = data;
			})
		},
		getEvents:function(){
			return eventsDatabase;
		},
		getSelectedEvent:function(eventID){
			for(var i=0;i<eventsDatabase.length;i++){
				if(eventsDatabase[i].ID==eventID){
					return eventsDatabase[i];
				}
			}
		},
		getEventStaff:function(eventStaffID){
			for(var i=0;i<eventsDatabase.length;i++){
				if(eventsDatabase[i].Staff.ID==eventStaffID){
					return eventsDatabase[i].Staff;
				}
			}
		},
		bookEvent:function(eventId,userId){
			var request1 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/bookClientIntoWorkshop.php",
			data: {
				workshopID: eventId,
				userID: userId
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request1.success(function (data) {
				var confirmBookingPopup = $ionicPopup.confirm({
					 title: 'Book Event',
					 template: 'Are you sure you want to book this event?',
					 okText: 'Confirm'
				   });
				   confirmBookingPopup.then(function(res) {
					 if(res){
						//click on confirm
						var returnMsg = "";
						if (data.AddClientsToEnrollmentsResult.ErrorCode===200){
							returnMsg = "Success!";
							userScheduleService.getUserSchedule(userId);
						}else{
							returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string);
						}
						 var alertPopup = $ionicPopup.alert({
							 title: 'Book Event',
							 template: returnMsg
						   });
						   alertPopup.then(function(res) {});
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
			})
			//not working
			request1.error(function (data) {
            })
		}
	}
})


app.factory('challengesService',function($http,$ionicPopup,userScheduleService){
	return {
		getChallengesDatabase: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getWorkshops.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				challengesDatabase = data;
			})
		},
		getChallenges:function(){
			return challengesDatabase;
		},
		getSelectedChallenge:function(challengeID){
			for(var i=0;i<challengesDatabase.length;i++){
				if(challengesDatabase[i].ID==challengeID){
					return challengesDatabase[i];
				}
			}
		},
		getChallengeStaff:function(challengeID){
			for(var i=0;i<challengesDatabase.length;i++){
				if(challengesDatabase[i].Staff.ID==challengeID){
					return challengesDatabase[i].Staff;
				}
			}
		},
		bookChallenge:function(challengeID,userId){
			var request1 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/bookClientIntoWorkshop.php",
			data: {
				workshopID: challengeID,
				userID: userId
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request1.success(function (data) {
				var confirmBookingPopup = $ionicPopup.confirm({
					 title: 'Book Challenge',
					 template: 'Are you sure you want to book this challenge?',
					 okText: 'Confirm'
				   });
				   confirmBookingPopup.then(function(res) {
					 if(res){
						//click on confirm
						var returnMsg = "";
						if (data.AddClientsToEnrollmentsResult.ErrorCode===200){
							returnMsg = "Success!";
							userScheduleService.getUserSchedule(userId);
						}else{
							returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string);
						}
						 var alertPopup = $ionicPopup.alert({
							 title: 'Book Challenge',
							 template: returnMsg
						   });
						   alertPopup.then(function(res) {});
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
			})
			//not working
			request1.error(function (data) {
            })
		}
	}
})



app.factory('userScheduleService', function($http,$state) {
	return {
		getUserSchedule: function(userId){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getClientSchedule.php",
			data: {
				userID: userId,
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				 userScheduleDatabase = data;
				 //alert("delete trigger database!=)");
			})
			
			//not working
			request.error(function (data) {
            })
		},
		getUserScheduleOutput:function(){
			if(JSON.stringify(userScheduleDatabase.GetClientScheduleResult.Visits.Visit).charAt(0)!="["){
				return JSON.parse("["+JSON.stringify(userScheduleDatabase.GetClientScheduleResult.Visits.Visit)+"]"); 
			}else{
				return userScheduleDatabase.GetClientScheduleResult.Visits.Visit; 
				
			}
		}
	}
})

app.factory('removeBookingService',function($http,userScheduleService,$ionicPopup){
	return{
		removeScheduledClass:function(classId,userId){
			var request2 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/removeClientFromClass.php",
			data: {
				classID: classId,
				userID: userId
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request2.success(function (data) {
					   userScheduleService.getUserSchedule(userId);
				if(data.RemoveClientsFromClassesResult.ErrorCode===200){
					//alert(data.RemoveClientsFromClassesResult.Classes.Class.Clients.Client.ID);
					var successRemovePopUp = $ionicPopup.alert({
						 title: 'Cancel Class',
						 template: 'You have successfully cancelled this class!'
					   });
					   alertPopup.then(function(res){});
					   
				}else{
					var unSuccessRemovePopUp = $ionicPopup.alert({
						 title: 'Cancel Class',
						 template: 'You cannot cancel this class!'
					   });
					   alertPopup.then(function(res){
					   });
				}
			})
			//not working
			request2.error(function (data) {
            })
		}
	}
})


app.factory('historyService', function($http) {
	return {
		getUserHistory: function(userId){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getClientHistory.php",
			data: {
				userID: userId,
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				historyDatabase = data;
			})
			
			//not working
			request.error(function (data) {
            })
		},
		getUserHistoryResponse:function(){
			return historyDatabase.GetClientVisitsResult.Visits.Visit;
		}
	}
})


app.factory('purchaseHistoryService', function($http) {
	return {
		getPurchaseHistory: function(userId){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getClientPurchases.php",
			data: {
				userID: userId,
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				purchaseHistoryDatabase = data;
			})
			
			//not working
			request.error(function (data) {
            })
		},
		getPurchaseResponse:function(){
		//alert(purchaseHistoryDatabase.GetClientPurchasesResult.Purchases.SaleItem[0].Description);
			return purchaseHistoryDatabase.GetClientPurchasesResult.Purchases.SaleItem;
		}
	}
})


app.factory('appointmentService',function($http){
	return {
		getAppointments: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getAppointments.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				apptDatabase = data;
			})
			
			//not working
			request.error(function (data) {
            })
		}
	}
})



app.controller('loginCtrl', function($scope, $state,userService,userScheduleService,classesService,workshopsService,eventsService,challengesService) {
	$scope.signIn = function(user) {
		userService.authentication(user);
		classesService.getClassesDatabase();
		workshopsService.getWorkshopsDatabase();
		eventsService.getEventsDatabase();
		challengesService.getChallengesDatabase();
	};
	
	$scope.next = function(){
		$state.go('yoga-app.home');
	};
})

//$ionicSideMenuDelegate is the dependency for menu
app.controller('MainCtrl', function($scope,$state,$http, $ionicSideMenuDelegate) {

	//left menu
	$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
	};
  
	// function to submit the form after all validation has occurred			
	//$scope.submitForm = function(user) {
		//alert(user.email);
		
		// check to make sure the form is completely valid
		//if ($scope.userForm.$valid) {
		//	alert('our form is amazing');
		//}
//	};
	
	/*$scope.goBack = function() {
		window.history.back();
	};*/
})

app.controller('settingCtrl', function($scope,$ionicPopup,userService,userDetailsService,updateUserDetailsService) {
	$scope.user = {};
	$scope.user.id = userService.getUserID();
	$scope.user.address = userDetailsService.getUserAddress();
	$scope.user.email = userDetailsService.getUserEmail();
	$scope.user.postalCode = userDetailsService.geUserPostalCode();
	$scope.user.mobile = userDetailsService.getUserMobile();
	$scope.user.birthDate = userDetailsService.getUserBirth();
	$scope.user.gender = userDetailsService.getUserGender();
	
	$scope.editAddress = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.address">',
		title: 'Enter new address',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.address) {
				//don't allow the user to save unless he enters something
				e.preventDefault();
			  } else {
				$scope.backup = $scope.user.address;
				$scope.user.address = $scope.editData.address;
				updateUserDetailsService.updateUserDetails($scope.user);
				/*if(!updateUserDetailsService.checkValidity()){
					$scope.user.address = $scope.backup;
				}*/
			  }
			}
		  }
		]
	  });
	};
	
	
	$scope.editEmail = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup1 = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.email">',
		title: 'Enter new email',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.email) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.user.email = $scope.editData.email;
				updateUserDetailsService.updateUserDetails($scope.user);
			  }
			}
		  }
		]
	  });
	};
	
	
	$scope.editPostal = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup2 = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.postal">',
		title: 'Enter new postal code',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.postal) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.user.postalCode = $scope.editData.postal;
				updateUserDetailsService.updateUserDetails($scope.user);
			  }
			}
		  }
		]
	  });
	};
	
	
	$scope.editMobile = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup3 = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.mobile">',
		title: 'Enter new mobile number',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.mobile) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.user.mobile = $scope.editData.mobile;
				updateUserDetailsService.updateUserDetails($scope.user);
			  }
			}
		  }
		]
	  });
	};
	
	
	$scope.goBack = function() {
		window.history.back();
	};
})


app.controller('sidebarCtrl',function($scope,$state,$ionicActionSheet){
	
	/*ACCORDION START*/
		$scope.groups = [];
	  for (var i=0; i<3; i++) {
		if(i==0){
			$scope.groups[i] = {
			name: 'Book',
			items: []
			};
			/*loop through all the classes*/
			for (var j=0; j<5; j++) {
				if(j==0){
					$scope.groups[i].items.push('Classes');
				}else if(j==1){
					$scope.groups[i].items.push('Workshops');
				}else if(j==2){
					$scope.groups[i].items.push('Events');
				}else if(j==3){
					$scope.groups[i].items.push('Appointments');
				}else if(j==4){
					$scope.groups[i].items.push('Challenges');
				}
				
			}
		}
	  }
	  
	  /*
	   * if given group is the selected group, deselect it
	   * else, select the given group
	   */
	  $scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
		  $scope.shownGroup = null;
		} else {
		  $scope.shownGroup = group;
		}
	  };
	  $scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	  };
	/*ACCORDION END*/
	
	
	/*booking pop up start*/
	$scope.showActionsheet = function() {
		$ionicActionSheet.show({
		  titleText: 'BOOKINGS',
		  buttons: [
			{ text: 'Classes' },
			{ text: 'Workshops' },
			{ text: 'Events' },
			{ text: 'Appointments' },
			{ text: 'Challenges' }
		  ],
		  cancelText: 'Cancel',
		  cancel: function() {
			console.log('CANCELLED');
		  },
		buttonClicked: function (index) {
			switch (index) {
				case 0:
					$state.go('yoga-app.classes');
					break;
				case 1:
					$state.go('yoga-app.workshops');
					break;
				case 2:
					$state.go('yoga-app.events');
					break;
				case 3:
					$state.go('yoga-app.appointments');
					break;
				case 4:
					$state.go('yoga-app.challenges');
					break;
			}
			return true;
		},
		destructiveButtonClicked: function() {
			console.log('DESTRUCT');
			return true;
		  }
		});
	};
	/*booking pop up end*/
	
})

app.controller('barcodeCtrl',function($scope,userService){
	$scope.userId = userService.getUserID();
})

app.controller('homeCtrl',function($scope,$state,$ionicPopup,$ionicViewService,$timeout,$ionicLoading,$interval,userService,userScheduleService,removeBookingService,historyService,purchaseHistoryService){

	$scope.userId = userService.getUserID();;
	$scope.username = userService.getUsername();
	
	var retrieveUserInfo = function(){
		//retrieve user's scheduled classes
		$scope.scheduledClasses = userScheduleService.getUserScheduleOutput();
		//retrieve user's history
		$scope.userHistory = historyService.getUserHistoryResponse();
		//retrieve user's purchase history
		$scope.saleItems = purchaseHistoryService.getPurchaseResponse();
	};

	// Setup the loader
	  $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	  });
	  
	  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
	  $timeout(function () {
		$ionicLoading.hide();
		retrieveUserInfo();
	  }, 2800);

	
	var upcoming = document.getElementById('showUpcoming');
	var history = document.getElementById('showHistory');
	upcoming.style.cssText ="background-color:#f8f8f8;color:#e67e22; border-bottom: thick solid #e67e22;border-bottom-width:2px;";
	history.style.cssText ="background-color:#f8f8f8";
	
	
	$scope.showUpcomingView = true;
	$scope.showUpcoming = function(){
		$scope.showUpcomingView = true;
		$scope.showHistoryView = false;
		$scope.showPurchase = false;
		upcoming.style.cssText="background-color:#f8f8f8;color:#e67e22; border-bottom: thick solid #e67e22;border-bottom-width:2px;";
		history.style.cssText ="background-color:#f8f8f8";
	};	
	
	$scope.showHistory = function(){
		$scope.showUpcomingView = false;
		$scope.showPurchase = false;
		$scope.showHistoryView = true;
		history.style.cssText ="background-color:#f8f8f8;color:#e67e22; border-bottom: thick solid #e67e22;border-bottom-width:2px;";
		upcoming.style.cssText ="background-color:#f8f8f8";
	};
	
	$scope.showBookingHistory = function(){
		$scope.showHistoryView = true;
		$scope.showPurchase = false;
	};
	
	$scope.showPurchaseHistory = function(){
		$scope.showHistoryView = false;
		$scope.showPurchase = true;
	};
	
	$scope.removeClass = function(classId,userId){
		 // A confirm dialog
		   var confirmPopup = $ionicPopup.confirm({
			 title: 'Cancel Class',
			 template: 'Are you sure you want to cancel this class?',
			 okText: 'Confirm'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				removeBookingService.removeScheduledClass(classId,userId);
				$state.go($state.current, {}, {reload: true});
			 } else {
				//press cancel
				//alert("nope");
			 }
		   });
		   
	}
	
	
	
	/*ACCORDION START*/
	$scope.groups = [];
	  for (var i=0; i<3; i++) {
		if(i==0){
			$scope.groups[i] = {
			name: 'Classes',
			items: []
			};
			/*loop through all the classes*/
			for (var j=0; j<3; j++) {
				//var id = $scope.scheduledClasses[j].ID;
				$scope.groups[i].items.push('item '+j);
			}
		}else if(i==1){
			$scope.groups[i] = {
			name: 'Appointments',
			items1: []
			};
			/*loop through all the appts*/
			for (var j=0; j<3; j++) {
				$scope.groups[i].items1.push('item '+j);
			}
		}else{
			$scope.groups[i] = {
			name: 'Others',
			items2: []
			};
			/*loop through all the classes*/
			for (var j=0; j<3; j++) {
				$scope.groups[i].items2.push('item '+j);
			}
		}
	  }
	  
	  /*
	   * if given group is the selected group, deselect it
	   * else, select the given group
	   */
	  $scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
		  $scope.shownGroup = null;
		} else {
		  $scope.shownGroup = group;
		}
	  };
	  $scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	  };
	/*ACCORDION END*/
})

app.controller('classesCtrl', function($scope,$stateParams,classesService,userService) {
	$scope.totalClasses = classesService.getClasses();
	$scope.selectedclass = classesService.getSelectedClass($stateParams.classID);
	$scope.userID = userService.getUserID();
	
	$scope.bookClass = function(selectedClassID,userID){
		classesService.bookClass(selectedClassID,userID);
	};
	
	$scope.selectedStaff = classesService.getClassStaff($stateParams.classStaffID);
	
	var byDate = document.getElementById('byDate');
	var byInstructor = document.getElementById('byInstructor');
	var byLevel = document.getElementById('byLevel');	
	
	$scope.showClassByDateView = true;
	$scope.showClassByInstructorView = false;
	$scope.showClassByLevelView = false;
		
	$scope.showClassByDate = function(){
		$scope.showClassByDateView = true;
		$scope.showClassByInstructorView = false;
		$scope.showClassByLevelView = false;
	};	
	
	$scope.showClassByInstructor = function(){
		$scope.showClassByDateView = false;
		$scope.showClassByInstructorView = true;
		$scope.showClassByLevelView = false;
	};
	
	$scope.showClassByLevel = function(){
		$scope.showClassByDateView = false;
		$scope.showClassByInstructorView = false;
		$scope.showClassByLevelView = true;
	};
	
})

app.controller('workshopCtrl',function($scope,$stateParams,userService,workshopsService){
	$scope.workShopsData = workshopsService.getWorkshops();
	$scope.selectedWorkshop = workshopsService.getSelectedWorkshop($stateParams.workshopID);
	$scope.selectedWorkshopStaff = workshopsService.getWorkshopStaff($stateParams.workshopStaffID);
	$scope.userID = userService.getUserID();
	
	$scope.bookSelectedWorkshop = function(workshopId,userId){
		workshopsService.bookWorkshop(workshopId,userId);
	};
})

app.controller('eventsCtrl',function($scope,$stateParams,userService,eventsService){
	$scope.eventsData = eventsService.getEvents();
	$scope.selectedEvent = eventsService.getSelectedEvent($stateParams.eventID);
	$scope.selectedEventStaff = eventsService.getEventStaff($stateParams.eventStaffID);
	$scope.userID = userService.getUserID();
	
	$scope.bookEvent = function(eventId,userID){
		eventsService.bookEvent(eventId,userID);
	};
})

app.controller('challengesCtrl',function($scope,$stateParams,userService,challengesService){
	$scope.challengesData = challengesService.getChallenges();
	$scope.selectedChallenge = challengesService.getSelectedChallenge($stateParams.challengeID);
	$scope.userID = userService.getUserID();
	
	$scope.bookChallenge = function(challengeId,userID){
		challengesService.bookChallenge(challengeId,userID);
	};
})

app.controller('faqCtrl',function($scope){
	
	/*ACCORDION START*/
	  $scope.groups = [];
	  for (var i=0; i<2; i++) {
		if(i==0){
			$scope.groups[i] = {
			name: 'During Class',
			items: []
			};
			
			for (var j=0; j<10; j++) {
				if(j==0){
					$scope.groups[i].items.push('Come well hydrated and eat lightly 2-3 hours prior to your practice.');
				}else if(j==1){
					$scope.groups[i].items.push('Please arrive at least 15 minutes early to find parking, sign in and familiarize yourself with our facilities. Classes begin promptly & are subject to room capacity.');
				}else if(j==2){
					$scope.groups[i].items.push('Please remove your shoes in the designated area when you enter the center. Classes are practiced barefoot and in lightweight clothing.');
				}else if(j==3){
					$scope.groups[i].items.push('Be sure to advise your teacher before class if you are new (first 10 classes), or if you have an injury/medical condition or are pregnant.');
				}else if(j==4){
					$scope.groups[i].items.push('Please keep your voices low in the center as classes may be in session.');
				}else if(j==5){
					$scope.groups[i].items.push('Please leave valuables and personal belongings at home. Avoid wearing jewelry in classes, especially the ones which make noise or makes your practice uncomfortable.');
				}else if(j==6){
					$scope.groups[i].items.push('Ensure cell phones are turned off while in the center.');
				}else if(j==7){
					$scope.groups[i].items.push('On your first visit you will be required to fill out a new student registration form. Please be sure to sign a waiver and indicate any physical injuries or special health conditions.');
				}else if(j==8){
					$scope.groups[i].items.push('Please be mindful that others may be meditating in the yoga room prior to class and refrain from talking.');
				}else if(j==9){
					$scope.groups[i].items.push('Ask questions and clear your doubts regarding the choice of classes. we are always here to help you in best possible ways.');
				}
			}
		}
		
		if(i==1){
			$scope.groups[i] = {
			name: 'Before Class',
			items: []
			};
			
			for (var j=0; j<7; j++) {
				if(j==0){
					$scope.groups[i].items.push('Once the instructor begins class, refrain from talking to others in the yoga room.');
				}else if(j==1){
					$scope.groups[i].items.push('Remember to pick up and neatly put away props used during the class.');
				}else if(j==2){
					$scope.groups[i].items.push('To maximize benefits from your practice, stay for a full Savasana, the final relaxation pose.');
				}else if(j==3){
					$scope.groups[i].items.push('For hygienic purpose use your yoga mat and a towel if possible, especially in a Hot yoga class where you will sweat. Though we provide mats and all other yoga props needed for the practice.');
				}else if(j==4){
					$scope.groups[i].items.push('Go at your own pace. Be gentle and respectful towards your body, never moving to the point of extreme pain.');
				}else if(j==5){
					$scope.groups[i].items.push('Drink plenty of water before and after each class, especially if you are practicing hot yoga.');
				}else if(j==6){
					$scope.groups[i].items.push('If you must leave early, tell the instructor in advance, place your mat near the door and leave quietly before everyone gets into savasana, the final relaxation pose.');
				}
			}
		}
	  }
	  
	  /*
	   * if given group is the selected group, deselect it
	   * else, select the given group
	   */
	  $scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
		  $scope.shownGroup = null;
		} else {
		  $scope.shownGroup = group;
		}
	  };
	  $scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	  };
	/*ACCORDION END*/
	
})

app.controller('aboutCtrl',function($scope){
	
	/*ACCORDION START*/
	  $scope.groups = [];
	  for (var i=0; i<3; i++) {
		if(i==0){
			$scope.groups[i] = {
			name: 'About Us',
			items: []
			};
			for (var j=0; j<1; j++) {
				if(j==0){
					$scope.groups[i].items.push('Platinum Yoga is an authentic yoga centre offering all levels and styles of Yoga in Singapore, with hundreds of classes available 7 days a week.Our yoga instructors and guest instructors are the best in the industry, and represent the full spectrum of yoga disciplines. Be it classical Iyengar yoga, Ashtanga yoga or Flow yoga, or specialized classes in Prenatal, Athletic, Yin Yoga Rehabilitative, Yoga for Kids or Power Yoga, you will find it all at Platinum yoga.');
				}
			}
		}
		
		if(i==1){
			$scope.groups[i] = {
			name: 'Our Mission',
			items: []
			};
			for (var j=0; j<7; j++) {
				if(j==0){
					$scope.groups[i].items.push('It is our mission to honor and embrace each student’s search for personal growth, wellbeing, and fulfillment by offering the highest quality yoga programs to people of all ages and from all walks of life. We do this with love, compassion, a sense of humor, and with respect for what each individual can accomplish through Yoga and throughout their lives. Acknowledging that there are many types of people, and therefore more than one way to practice yoga, we bring it all together just for you!');
				}
			}
		}
		
		if(i==2){
			$scope.groups[i] = {
			name: 'Our Values',
			items: []
			};
			for (var j=0; j<7; j++) {
				if(j==0){
					$scope.groups[i].items.push((j+1)+'. Yoga is a Way of Life');
				}
				if(j==1){
					$scope.groups[i].items.push((j+1)+'. Yoga is for Everyone');
				}
				if(j==2){
					$scope.groups[i].items.push((j+1)+'. In Listening');
				}
				if(j==3){
					$scope.groups[i].items.push((j+1)+'. In Supporting and Respecting Each Other');
				}
				if(j==4){
					$scope.groups[i].items.push((j+1)+'. Yoga Keeps the Body Healthy and the Mind Clear');
				}
				
			}
		}
	}
	  
	  /*
	   * if given group is the selected group, deselect it
	   * else, select the given group
	   */
	  $scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
		  $scope.shownGroup = null;
		} else {
		  $scope.shownGroup = group;
		}
	  };
	  $scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	  };
	/*ACCORDION END*/
	
})

app.controller('appointmentCtrl',function($scope,appointmentService){
	$scope.showAppt = function(){
		appointmentService.getAppointments();
	};
})

app.controller('halloffameCtrl',function($scope){
	
	$scope.winnersData = {
		"filter" : 'current',
		"winners": [
		  {
			type : "current",
			title : "Best Attendance",
			name: "Mr Khan"
		  },
		  {
			type : "current",
			title : "Youngest at Heart",
			name: "Mrs Kee"
		  },
		  {
			type : "past",
			title : "Best Attendance",
			name: "Mr Singh"
		  },
		  {
			type : "past",
			title : "Youngest at Heart",
			name: "Mrs Cheryl"
		  }
		]
	};
})

app.controller('promotionsCtrl',function($scope,healthTipDb,feedbackDb){
	$scope.healthtips = healthTipDb.getHealthTipsData();
	$scope.feedbacks = feedbackDb.getFeedbackData();
	//alert(feedbacks[0].booking);
	//$scope.tip = healthTipDb.getTip(2);
	
	 $scope.addBooking = function(review) {
			//alert(review.booking);
        var save = $scope.feedbacks.$add({
            booking:review.booking,
            feedback:review.feedback
        });
        review.booking = "";
        review.feedback = "";
		
		if(save) {
		  alert("Submitted successfully");
		} else {
		  alert("Cannot Submit");
		}
		
    };
})


app.controller('DateCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
})


//search filter
.directive('ionSearch', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                getData: '&source',
                model: '=?',
                search: '=?filter'
            },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};

                if (attrs.class)
                    element.addClass(attrs.class);

                if (attrs.source) {
                    scope.$watch('search.value', function (newValue, oldValue) {
                        if (newValue.length > attrs.minLength) {
                            scope.getData({str: newValue}).then(function (results) {
                                scope.model = results;
                            });
                        } else {
                            scope.model = [];
                        }
                    });
                }

                scope.clearSearch = function() {
                    scope.search.value = '';
                };
            },
            template: '<div class="item-input-wrapper">' +
                        '<i class="icon ion-android-search"></i>' +
                        '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                        '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                      '</div>'
        };
})
