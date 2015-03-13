angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

var app = angular.module('ionicApp', ['ionic','ionic.utils','firebase','ui.router', 'pickadate'])

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
	.state('yoga-app.review', {
      url: '/review',
      views: {
        'menuContent' :{
          templateUrl: "templates/review.html",
		  controller: "reviewCtrl"
        }
      }
    })
    .state('yoga-app.classes', {
      url: '/CLASSES',
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
      url: '/WORKSHOPS',
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
	.state('yoga-app.retreats', {
      url: '/RETREATS/TT',
      views: {
        'menuContent' :{
          templateUrl: "templates/retreats.html",
		  controller:"retreatCtrl"
        }
      }
    })
	.state('yoga-app.selectedRetreat', {
      url: '/selectedRetreat/:retreatID',
      views: {
        'menuContent' :{
          templateUrl: "templates/selectedRetreat.html",
		  controller: "retreatCtrl"
        }
      }
    })
	.state('yoga-app.retreatStaff', {
      url: '/retreatStaff/:retreatStaffID',
      views: {
        'menuContent' :{
          templateUrl: "templates/retreatStaff.html",
		  controller: "retreatCtrl"
        }
      }
    })
	.state('yoga-app.events', {
      url: "/SPECIAL EVENTS",
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
      url: "/APPOINTMENTS",
      views: {
        'menuContent' :{
          templateUrl: "templates/appointments.html",
		  controller:"appointmentCtrl"
        }
      }
    })
	.state('yoga-app.appointmentType', {
      url: "/appointmentType/:sessionTypeID",
      views: {
        'menuContent' :{
          templateUrl: "templates/appointmentType.html",
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
	.state('yoga-app.yogapedia', {
      url: "/yogapedia",
      views: {
        'menuContent' :{
          templateUrl: "templates/yogapedia.html",
		  controller: "yogapediaCtrl"
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



app.factory('classesService', function($http,$ionicPopup,userScheduleService,waitlistService,$localstorage,bookingDb) {
var availClasses = [];
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

				$localstorage.set('classesDb', JSON.stringify(data.Classes.Class));
				classesDatabase = JSON.parse($localstorage.get('classesDb'));

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
			//console.log(JSON.stringify(data));
					var returnMsg = "";
					if (data.AddClientsToClassesResult.ErrorCode===200){
						if(JSON.stringify(data).indexOf("Added to Waitlist") > -1){
							returnMsg = "You have been added to waitlist.";
						}else{
							returnMsg = "Success!"
						};
						userScheduleService.getUserSchedule(userId);
						waitlistService.getWaitlist(userId);
					}else{
						if(JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string).indexOf("payments") > -1){
							returnMsg = "You have no Platinum Yoga membership. Please call or visit Platinum Yoga to sign up for membership.";
						}else if(JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string).indexOf("already booked this class") > -1){
							returnMsg = "You have already booked this class.";
							
						}else if(JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string).indexOf("Client is already booked at this time") > -1){
							returnMsg = "You have a booking at this time.";
						}else if(JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string).indexOf("full") > -1){
							returnMsg = "This class is full.";
						}else if(JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string).indexOf("outside scheduling window") > -1){
							returnMsg = "This class is not for booking.";
						}else{
							returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string);
						}
						
						
					}
					 var alertPopup = $ionicPopup.alert({
						 title: 'Book Class',
						 template: returnMsg
					   });
					   alertPopup.then(function(res) {});
					   
					   //counting how many successful bookings each user has, store into database
					   var bookingDB = bookingDb.getBookingData();
							
							var save = bookingDB.$add({
							   userid:userId
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
			//console.log(JSON.stringify(data));
					var returnMsg ="";
					if (data.AddClientsToEnrollmentsResult.Status=="Success"){
						returnMsg = "Success!";
						userScheduleService.getUserSchedule(userId);
					}else{
						if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("capacity has been reached")>-1){
							returnMsg = "This workshop is full";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("full")>-1){
							returnMsg = "This workshop is full.";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("has no available payments")>-1){
							returnMsg = "You have no Platinum Yoga membership. Please call or visit Platinum Yoga to sign up for membership.";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("Client is already booked at this time")>-1){
							returnMsg = "You have a booking at this time.";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("already started")>-1){
							returnMsg = "This workshop is not for booking.";
						}else{
							returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string);
						}	
						
					}
					 var alertPopup = $ionicPopup.alert({
						 title: 'Book Workshop',
						 template: returnMsg
					   });
					   alertPopup.then(function(res) {});
			});
			//not working
			request1.error(function (data) {})
		}
	}
})


app.factory('retreatsService',function($http,$ionicPopup,userScheduleService){
	return {
		getRetreatsDatabase: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getRetreatsTT.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				retreatsDatabase = data;
				//console.log(JSON.stringify(retreatsDatabase));
			})
		},
		getRetreats:function(){
			return retreatsDatabase;
		},
		getSelectedRetreat:function(retreatID){
			for(var i=0;i<retreatsDatabase.length;i++){
				if(retreatsDatabase[i].ID==retreatID){
					return retreatsDatabase[i];
				}
			}
		},
		getRetreatStaff:function(retreatStaffID){
			for(var i=0;i<retreatsDatabase.length;i++){
				if(retreatsDatabase[i].Staff.ID==retreatStaffID){
					return retreatsDatabase[i].Staff;
				}
			}
		},
		bookRetreat:function(retreatId,userId){
			var request1 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/bookClientIntoWorkshop.php",
			data: {
				workshopID: retreatId,
				userID: userId
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request1.success(function (data) {
			//console.log(JSON.stringify(data));
					var returnMsg ="";
					if (data.AddClientsToEnrollmentsResult.Status=="Success"){
						returnMsg = "Success!";
						userScheduleService.getUserSchedule(userId);
					}else{
					
						if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("capacity has been reached")>-1){
							returnMsg = "This retreat/TT is full";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("full")>-1){
							returnMsg = "This retreat/TT is full.";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("has no available payments")>-1){
							returnMsg = "You have no Platinum Yoga membership. Please call or visit Platinum Yoga to sign up for membership.";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("already started")>-1){
							returnMsg = "This retreat/TT is not for booking";
						}else if(JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string).indexOf("Client is already booked at this time")>-1){
							returnMsg = "You have a booking at this time.";
						}else{
							returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToEnrollmentsResult.Enrollments.ClassSchedule.Clients.Client.Messages.string);
						}	
					}
					 var alertPopup = $ionicPopup.alert({
						 title: 'Book Retreat/TT',
						 template: returnMsg
					   });
					   alertPopup.then(function(res) {});
			});
			//not working
			request1.error(function (data) {})
		}
	}
})



app.factory('eventsService',function($http,$ionicPopup,userScheduleService){
	return {
		getEventsDatabase: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getEvents.php",
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
			url: "http://platinumyoga-rerawan.rhcloud.com/getChallenges.php",
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
			})
			//not working
			request1.error(function (data) {})
		}
	}
})


app.factory('sessionService',function($http){
	return {
		getSession: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getSessionType.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				sessionDatabase = data;
			})
			
			//not working
			request.error(function (data) {
            })
		},
		getSessionResponse:function(){
			return sessionDatabase.SessionTypes.SessionType;
		},
		getSessionName:function(sessionID){
			for(var i=0;i<sessionDatabase.SessionTypes.SessionType.length;i++){
				if(sessionDatabase.SessionTypes.SessionType[i].ID==sessionID){
					return sessionDatabase.SessionTypes.SessionType[i].Name;
				}
			}
		}
	}
})





//services
app.factory('userService', function($http,$localstorage,$state,$ionicPopup,userScheduleService,historyService,purchaseHistoryService,userDetailsService,waitlistService,classesService,workshopsService,eventsService,retreatsService,challengesService,sessionService,sessionStaffService,$ionicLoading,$timeout) {
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

					
					
					$localstorage.set('name', user.username);
					$localstorage.set('password', user.password);
					//console.log(JSON.stringify(userDatabase.ValidateLoginResult));
					userID = userDatabase.ValidateLoginResult.Client.ID;
					userScheduleService.getUserSchedule(userID);
					waitlistService.getWaitlist(userID);
					historyService.getUserHistory(userID);
					purchaseHistoryService.getPurchaseHistory(userID);
					userDetailsService.getUserDetails(userID);
					
					classesService.getClassesDatabase();
					workshopsService.getWorkshopsDatabase();
					eventsService.getEventsDatabase();
					retreatsService.getRetreatsDatabase();
					challengesService.getChallengesDatabase();
					sessionService.getSession();
					sessionStaffService.getSessionStaff();
					
			
					
					$state.go("yoga-app.home");
				}else{
					var alertPopup = $ionicPopup.alert({
					 title: 'Error',
					 template: userDatabase.ValidateLoginResult.Message
				   });
				   alertPopup.then(function(res) {});
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


.run(function($localstorage,userService){
   if($localstorage.get('name')==null){
    //console.log("namenull");
  }else{
	  var userInfo = {};	
	  userInfo.username = $localstorage.get('name');
	  userInfo.password = $localstorage.get('password');
	  
	  userService.authentication(userInfo);
  }
});



app.factory('resetService', function($http,$ionicPopup) {
	return {
		resetInfo: function(reset){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/sendUserNewPassword.php",
			data: {
				email: reset.email,
				firstname: reset.firstName,
				lastname: reset.lastName
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				if(data.SendUserNewPasswordResult.ErrorCode === 200){	
					var alertPopup = $ionicPopup.alert({
					 title: 'Success',
					 template: 'Password reset email sent!'
				   });
				   alertPopup.then(function(res) {});

				}else{
					var alertPopup = $ionicPopup.alert({
					 title: 'Error',
					 template: 'Could not find based on information given.'
				   });
				   alertPopup.then(function(res) {});
				}	
			})
			
			request.error(function (data) {
            })
		}
	}
})


//filter for stars
app.filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=0; i<range; i++)
      val.push(i);
    return val;
  };
});

//firebase DATABASE
app.factory('feedbackDb', function($firebase) {
    var feedbackLink = new Firebase("https://feedbacktinkertest.firebaseio.com/");
	var dataArr = $firebase(feedbackLink).$asArray();
    return {
        getFeedbackData: function() {
			return dataArr;
        }
    }
})

app.factory('hallOfFameDb', function($firebase) {
    var fameLink = new Firebase("https://halloffametinkertest.firebaseio.com/");
	var dataArr = $firebase(fameLink).$asArray();
    return {
        getHallOfFameData: function() {
			return dataArr;
        }
    }
})

app.factory('faqDb', function($firebase) {
    var faqLink = new Firebase("https://faqtinkertest.firebaseio.com/");
	var faqDataArr = $firebase(faqLink).$asArray();
	
    return {
        getFaqData: function() {
			return faqDataArr;
        }
    }
})

app.factory('bookingDb', function($firebase) {
    var bookingLink = new Firebase("https://tinkerfyptest.firebaseio.com/");
	var bookDataArr = $firebase(bookingLink).$asArray();
    return {
        getBookingData: function() {
			return bookDataArr;
        }
    }
})

app.factory('yogapediaDb', function($firebase) {
    var yogapediaLink = new Firebase("https://yogapediatinkertest.firebaseio.com/");
	var yogapediaArr = $firebase(yogapediaLink).$asArray();
    return {
        getYogapediaData: function() {
			return yogapediaArr;
        }
    }
})
//firebase retrieval ends

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
		},
		getUserEmerName:function(){
			return userDetailsData.GetClientsResult.Clients.Client.EmergencyContactInfoName;
		},
		getUserEmerRelation:function(){
			return userDetailsData.GetClientsResult.Clients.Client.EmergencyContactInfoRelationship;
		},
		getUserEmerPhone:function(){
			return userDetailsData.GetClientsResult.Clients.Client.EmergencyContactInfoPhone;
		},
		getUserEmerEmail:function(){
			return userDetailsData.GetClientsResult.Clients.Client.EmergencyContactInfoEmail;
		}
	}
})


app.factory('updateUserDetailsService', function($http,$ionicPopup) {
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
				postalCode: user.postalCode,
				emerName: user.emerName,
				emerRelation: user.emerRelation,
				emerPhone: user.emerPhone,
				emerEmail: user.emerEmail
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				updateData = data;
			
				if(updateData.AddOrUpdateClientsResult.ErrorCode === 200){
					var alertPopup = $ionicPopup.alert({
					 title: 'Setting',
					 template: "Update Success!"
				   });
				   alertPopup.then(function(res) {});
				}else{
					var alertPopup = $ionicPopup.alert({
					 title: 'Setting',
					 template: updateData.AddOrUpdateClientsResult.Clients.Client.Messages.string
				   });
				   alertPopup.then(function(res) {});
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
			//console.log(JSON.stringify(userScheduleDatabase.GetClientScheduleResult.Visits.Visit));
			if(JSON.stringify(userScheduleDatabase.GetClientScheduleResult.Visits.Visit).charAt(0)!="["){
				return JSON.parse("["+JSON.stringify(userScheduleDatabase.GetClientScheduleResult.Visits.Visit)+"]"); 
			}else{
				return userScheduleDatabase.GetClientScheduleResult.Visits.Visit;
			}
		}
	}
})


app.factory('waitlistService', function($http) {
	return {
		getWaitlist: function(userId){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getClientWaitlist.php",
			data: {
				userID: userId,
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				waitlistDatabase = data;
			})
			
			//not working
			request.error(function (data) {
            })
		},
		getWaitlistOutput:function(){	
			
			if(JSON.stringify(waitlistDatabase.GetWaitlistEntriesResult.WaitlistEntries.WaitlistEntry).charAt(0)!="["){
				return JSON.parse("["+JSON.stringify(waitlistDatabase.GetWaitlistEntriesResult.WaitlistEntries.WaitlistEntry)+"]"); 
			}else{
				return waitlistDatabase.GetWaitlistEntriesResult.WaitlistEntries.WaitlistEntry; 
			}
			
		}
	}
})


app.factory('removeBookingService',function($http,userScheduleService,$ionicPopup){
	return{
		removeScheduledClass:function(classInfo,userId){
			var request2 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/removeClientFromClass.php",
			data: {
				classID: classInfo.ClassID,
				userID: userId
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request2.success(function (data) {
					  
				if(data.RemoveClientsFromClassesResult.ErrorCode===200){
					 userScheduleService.getUserSchedule(userId);
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


app.factory('removeAppointmentService',function($http,userScheduleService,$ionicPopup){
	return{
		removeScheduledAppt:function(classInfo,userId){
			var request2 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/removeClientFromAppointment.php",
			data: {
				appointmentID: classInfo.AppointmentID,
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request2.success(function (data) {
				//console.log(data);
					  
				if(data.AddOrUpdateAppointmentsResult.ErrorCode===200){
					 userScheduleService.getUserSchedule(userId);
					var successRemovePopUp = $ionicPopup.alert({
						 title: 'Cancel Appointment',
						 template: 'You have successfully cancelled this appointment!'
					   });
					   alertPopup.then(function(res){});
				}else{
					var unSuccessRemovePopUp = $ionicPopup.alert({
						 title: 'Cancel Appointment',
						 template: 'You cannot cancel this appointment!'
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


app.factory('removeWaitlistService',function($http,$ionicPopup,waitlistService,userService){
	return{
		removeWaitlistClass:function(classID){
			var request2 = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/removeClientFromWaitlist.php",
			data: {
				waitlistID: classID
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request2.success(function (data) {
				waitlistService.getWaitlist(userService.getUserID());
				
				/*if(data.RemoveClientsFromClassesResult.ErrorCode===200){
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
				}*/
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
			if(JSON.stringify(historyDatabase.GetClientVisitsResult.Visits.Visit).charAt(0)=="["){
				 return historyDatabase.GetClientVisitsResult.Visits.Visit;
			}else{
				return JSON.parse("["+JSON.stringify(historyDatabase.GetClientVisitsResult.Visits.Visit)+"]");
			}	
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
		if(JSON.stringify(purchaseHistoryDatabase.GetClientPurchasesResult.Purchases.SaleItem).charAt(0)=="["){
				 return purchaseHistoryDatabase.GetClientPurchasesResult.Purchases.SaleItem;
			}else{
				return JSON.parse("["+JSON.stringify(purchaseHistoryDatabase.GetClientPurchasesResult.Purchases.SaleItem)+"]");
			}
		}
	}
})


app.factory('appointmentService',function($http,$ionicLoading,$timeout){
var timeslots = [];
var check = "";
	return {
		getAppointments: function(sessionTypeID,instructorID){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getAppointments.php",
			data: {
				staffID:instructorID,
				sessionTypeID:sessionTypeID
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
			
			apptDatabase = data.ScheduleItems.ScheduleItem;
		
			var availSlots = [];
			var j=0;
			
			for(var i=0;i<apptDatabase.length;i++){
				if(apptDatabase[i].StartDateTime.slice(0,10)==chosenDate){
					availSlots[j]=apptDatabase[i];
					j++;
				}
			}

			var k=0;
			
			for(var a=0;a<availSlots.length;a++){

				var startDate = new Date(availSlots[a].StartDateTime.slice(0,19).toString());
				var hr1 = startDate.getHours();
				startDate.setHours(hr1-8);
				
				var endDate = new Date(availSlots[a].EndDateTime.slice(0,19).toString());
				var hr2 = endDate.getHours();
				endDate.setHours(hr2-9);

				
				//the new dates are malaysian times, converted from the api string by sun system.
					
					while(startDate.getTime()<=endDate.getTime()){

						timeslots[k]=chosenDate+" "+startDate.toString().slice(16,24);

						var newValue = "";
						if(startDate.getMinutes()==15 || startDate.getMinutes()==45){
							newValue = startDate.getMinutes()+15;
						}else{
							newValue = startDate.getMinutes()+30;
						}
						
						startDate.setMinutes(newValue);
						//alert("2: "+startDate);
						k++;
					}
			}	
			})
			//not working
			request.error(function (data) {
            })
		},
		getApptResponse:function(){
		
				if(timeslots.length == 0){
				// Setup the loader
				  $ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				  });

				  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
				  //alert("slow");
				  $timeout(function () {
				  $ionicLoading.hide();
					retrieveScheduledClasses();
				  }, 14500);
			}
		
			return timeslots;
		},
		getApptResponse1:function(chosendate){

			//alert(apptDatabase);
		if(typeof apptDatabase == 'undefined'){
				// Setup the loader
				  $ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				  });

				  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
				  //alert("slow");
				  $timeout(function () {
				  $ionicLoading.hide();
					retrieveScheduledClasses();
				  }, 14500);
			}

		
			var availSlots = [];
			var j=0;
			
			for(var i=0;i<apptDatabase.length;i++){
				if(apptDatabase[i].StartDateTime.slice(0,10)==chosendate){
					availSlots[j]=apptDatabase[i];
					j++;
				}
			}
			//console.log(availSlots);
			
			var timeSlots=[];
			var k=0;
			
			for(var a=0;a<availSlots.length;a++){			
				var startDate = new Date(availSlots[a].StartDateTime.slice(0,19).toString());
				var hr1 = startDate.getHours();
				startDate.setHours(hr1-8);
				
				var endDate = new Date(availSlots[a].EndDateTime.slice(0,19).toString());
				var hr2 = endDate.getHours();
				endDate.setHours(hr2-9);
				
					while(startDate.getTime()<=endDate.getTime()){
						timeSlots[k]=chosendate+" "+startDate.toString().slice(16,24);
						
						var newValue = "";
						if(startDate.getMinutes()==15 || startDate.getMinutes()==45){
							newValue = startDate.getMinutes()+15;
						}else{
							newValue = startDate.getMinutes()+30;
						}
						
						startDate.setMinutes(newValue);
						k++;
					}
			}
			//console.log(timeSlots);
			return timeSlots;
		}	
	}
})


app.factory('bookApptService',function($http,userScheduleService,$ionicPopup,$state){
	return {
		bookAppointment: function(isMale,instructorID,sessionID,userID,startDateTime,notesStr){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/bookClientIntoAppointment.php",
			data: {
				isMale:isMale,
				instructorId:instructorID,
				sessionId:sessionID,
				userId:userID,
				startdatetime:startDateTime,
				notes:notesStr
			},
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				//alert(JSON.stringify(data));
				//alert(data.AddOrUpdateAppointmentsResult.ErrorCode);
				if(data.AddOrUpdateAppointmentsResult.ErrorCode==200){
					userScheduleService.getUserSchedule(userID);
					var alertPopup = $ionicPopup.alert({
					 title: 'Book Appoinment',
					 template: "Success!"
				   });
				   alertPopup.then(function(res) {});
					$state.go("yoga-app.home");
				}else{
					var alertPopup = $ionicPopup.alert({
					 title: 'Book Appoinment',
					 template:data.Appointments.Appointment.Messages.string
				   });
				   alertPopup.then(function(res) {});
				}
				
				apptdatabase = data;
			})
			//not working
			request.error(function (data) {
            })
		}
	}
})


app.factory('sessionStaffService',function($http){
	return {
		getSessionStaff: function(){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getStaff.php",
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded' 
			}
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				instructors = data.StaffMembers.Staff;
			})
			
			//not working
			request.error(function (data) {
            })
		},
		getSessionStaffResponse:function(){
			return instructors;
		}
	}
})


app.controller('loginCtrl', function($scope, $state,userService,userScheduleService,classesService,workshopsService,eventsService,retreatsService,challengesService,sessionService,$ionicModal,resetService) {
	$scope.signIn = function(user) {
		userService.authentication(user);
		classesService.getClassesDatabase();
		workshopsService.getWorkshopsDatabase();
		eventsService.getEventsDatabase();
		retreatsService.getRetreatsDatabase();
		challengesService.getChallengesDatabase();
		sessionService.getSession();
	};
	
	$scope.next = function(){
		$state.go('yoga-app.home');
	};
	
	$scope.passwordReset = function(reset){
		resetService.resetInfo(reset);
	};
	
	//MODAL START
	$ionicModal.fromTemplateUrl('password-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  $scope.openModal = function() {
		$scope.modal.show();
	  };
	  $scope.closeModal = function() {
		$scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		// Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
		// Execute action
	  });
	  //MODAL END
})

//$ionicSideMenuDelegate is the dependency for menu
app.controller('MainCtrl', function($scope,$state,$http, $ionicSideMenuDelegate,classesService,$ionicLoading,$timeout,faqDb,$localstorage,hallOfFameDb,yogapediaDb) {
	
	//left menu
	$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
	};
	
	$scope.loadContact = function(){
		window.open('http://www.platinumyoga.com/pages/location-map', '_blank', 'location=yes','closebuttoncaption=back');
	};
	
	$scope.loadPromotions = function(){
		window.open('http://www.platinumyoga.com/pages/promotion', '_blank', 'location=yes','closebuttoncaption=back');
	};
	
	$scope.loadPrivileges = function(){
		window.open('http://www.platinumyoga.com/pages/platinum-yoga-rewards', '_blank', 'location=yes','closebuttoncaption=back');
	};
	
	$scope.loadRegister = function(){
		window.open('http://www.platinumyoga.com/', '_blank', 'location=yes','closebuttoncaption=back');
	};
	
	//loading the hall of fame list from firebase (no saving to localstorage)
	$scope.loadHallOfFameList = function(){
		$scope.halloffameList = hallOfFameDb.getHallOfFameData();
		$localstorage.set('hallofFameList',JSON.stringify($scope.halloffameList));
	};
	
	$scope.loadYogapediaList = function(){
		$scope.yogapediaList = yogapediaDb.getYogapediaData();
		//$localstorage.set('hallofFameList',JSON.stringify($scope.yogapediaList));
	};
	
	
	//loading the info/etiquette (FAQ) firebase (saving to localstorage but gets updated when when method called in homeCtrl)
 	$scope.loadRegulations = function(){
		$scope.faqDataArr = faqDb.getFaqData();
		var bef=0;
		var dur=0;
		var beforeArr = [];
		var durArr = [];
	
		for(var i=0;i<$scope.faqDataArr.length;i++){
			if($scope.faqDataArr[i].classType==="Before"){
				beforeArr[bef]=(bef+1)+". "+$scope.faqDataArr[i].faq;
				bef++;
			}else{
				durArr[dur]=(dur+1)+". "+$scope.faqDataArr[i].faq;
				dur++;
			}
		}
		
		$scope.beforeClass = beforeArr;
		$scope.duringClass = durArr;
		
		$localstorage.set('beforeClassRules',JSON.stringify($scope.beforeClass));
		$localstorage.set('duringClassRules',JSON.stringify($scope.duringClass));
	};
	
	/*$scope.goBack = function() {
		window.history.back();
	};*/
})

app.controller('settingCtrl', function($scope,$ionicPopup,userService,userDetailsService,updateUserDetailsService) {
	
	
	$scope.renew =function(){	
		$scope.user = {};
		$scope.user.id = userService.getUserID();
		userDetailsService.getUserDetails($scope.user.id);
		$scope.user.address = userDetailsService.getUserAddress();
		$scope.user.email = userDetailsService.getUserEmail();
		$scope.user.postalCode = userDetailsService.geUserPostalCode();
		$scope.user.mobile = userDetailsService.getUserMobile();
		$scope.user.birthDate = userDetailsService.getUserBirth();
		$scope.user.gender = userDetailsService.getUserGender();
		$scope.user.emerName = userDetailsService.getUserEmerName();
		$scope.user.emerRelation = userDetailsService.getUserEmerRelation();
		$scope.user.emerPhone = userDetailsService.getUserEmerPhone();
		$scope.user.emerEmail = userDetailsService.getUserEmerEmail();
	};

	
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
				userDetailsService.getUserDetails($scope.user.id);
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
				userDetailsService.getUserDetails($scope.user.id);
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
				userDetailsService.getUserDetails($scope.user.id);
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
				userDetailsService.getUserDetails($scope.user.id);
			  }
			}
		  }
		]
	  });
	};
	
	
	$scope.editEmergencyName = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup3 = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.emerName">',
		title: 'Enter new emergency contact name',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.emerName) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.user.emerName = $scope.editData.emerName;
				updateUserDetailsService.updateUserDetails($scope.user);
				userDetailsService.getUserDetails($scope.user.id);
			  }
			}
		  }
		]
	  });
	};
	
	
	
	$scope.editEmergencyRelationship = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup3 = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.emerRelation">',
		title: 'Enter new emergency contact relationship',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.emerRelation) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.user.emerRelation = $scope.editData.emerRelation;
				updateUserDetailsService.updateUserDetails($scope.user);
				userDetailsService.getUserDetails($scope.user.id);
			  }
			}
		  }
		]
	  });
	};
	
	
	
	$scope.editEmergencyPhone = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup3 = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.emerPhone">',
		title: 'Enter new emergency contact phone number',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.emerPhone) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.user.emerPhone = $scope.editData.emerPhone;
				updateUserDetailsService.updateUserDetails($scope.user);
				userDetailsService.getUserDetails($scope.user.id);
			  }
			}
		  }
		]
	  });
	};
	
	
	$scope.editEmergencyEmail = function() {
	  $scope.editData = {};
	  // An elaborate, custom popup
	  var myPopup3 = $ionicPopup.show({
		template: '<input type="text" ng-model="editData.emerEmail">',
		title: 'Enter new emergency contact email address',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-energized',
			onTap: function(e) {
			  if (!$scope.editData.emerEmail) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.user.emerEmail = $scope.editData.emerEmail;
				updateUserDetailsService.updateUserDetails($scope.user);
				userDetailsService.getUserDetails($scope.user.id);
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


app.controller('sidebarCtrl',function($scope,$state,$ionicActionSheet,$localstorage){
	
	$scope.logout = function(){
		$localstorage.set('name', '');
		$localstorage.set('password', '');
		$localstorage.set('classesDb', '');
		$localstorage.set('beforeClassRules','');
		$localstorage.set('duringClassRules','');
		$localstorage.set('hallofFameList','');
	};
	
	
	/*ACCORDION START*/
		$scope.groups = [];
	  for (var i=0; i<3; i++) {
		if(i==0){
			$scope.groups[i] = {
			name: 'BOOK',
			items: []
			};
			/*loop through all the classes*/
			for (var j=0; j<5; j++) {
				if(j==0){
					$scope.groups[i].items.push('CLASSES');
				}else if(j==1){
					$scope.groups[i].items.push('APPOINTMENTS');
				}else if(j==2){
					$scope.groups[i].items.push('WORKSHOPS');
				}else if(j==3){
					$scope.groups[i].items.push('SPECIAL EVENTS');
				}else if(j==4){
					$scope.groups[i].items.push('RETREATS/TT');
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
			{ text: 'Appointments' },
			{ text: 'Workshops' },
			{ text: 'Special Events' },
			{ text: 'Retreats/TT' }
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
					$state.go('yoga-app.appointments');
					break;
				case 2:
					$state.go('yoga-app.workshops');
					break;
				case 3:
					$state.go('yoga-app.events');
					break;
				case 4:
					$state.go('yoga-app.retreats');
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


app.controller('homeCtrl',function($scope,$state,$ionicPopup,$timeout,$ionicLoading,userService,userScheduleService,removeBookingService,waitlistService,removeWaitlistService,historyService,purchaseHistoryService,$ionicModal,feedbackDb,$firebase,removeAppointmentService,$localstorage,classesService,$stateParams){
	$scope.userId = userService.getUserID();;
	$scope.username = userService.getUsername();
	
	var retrieveScheduledClasses = function(){
		//retrieve user's scheduled classes
		userScheduleService.getUserSchedule($scope.userId);
		$scope.scheduledClasses = userScheduleService.getUserScheduleOutput();
	};
	
	var retrieveWaitlist = function(){
		//retrieve user's scheduled classes
		waitlistService.getWaitlist($scope.userId);
		$scope.waitlist = waitlistService.getWaitlistOutput();
	};
	
	//calling the classes 
	var retrieveClasses = function(){
		$scope.totalClasses = classesService.getClasses();
		$scope.selectedclass = classesService.getSelectedClass($stateParams.classID);	
	};
	
	// Setup the loader
	  $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	  });
	  
	  if($localstorage.get('classesDb')==""||$localstorage.get('classesDb')==null){
			  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
			  $timeout(function () {
			  $ionicLoading.hide();
				retrieveClasses();
			  }, 6000);
			  
			  $timeout(function () {
			  $ionicLoading.hide();
				retrieveScheduledClasses();
			  }, 6000);
			  
			  $timeout(function () {
			  $ionicLoading.hide();
				retrieveWaitlist();
			  }, 6000);
			  	  			  
			  $timeout(function () {
			  $ionicLoading.hide();
				//loading of info/etiquette here
				$scope.loadRegulations();
			  }, 6000);
			  
			  $timeout(function () {
			  $ionicLoading.hide();
				//loading of hall of fame list here
				$scope.loadHallOfFameList();
			  }, 6000);		
			  
			  $timeout(function () {
			  $ionicLoading.hide();
				//loading of hall of fame list here
				$scope.loadYogapediaList();
			  }, 6000);

			  
	  }else{
		//alert("fast");
			$timeout(function () {
			  $ionicLoading.hide();
				retrieveClasses();
			  }, 4000);
			  
			$timeout(function () {
			  $ionicLoading.hide();
				retrieveScheduledClasses();
			  }, 4000);
			  
			  $timeout(function () {
			  $ionicLoading.hide();
				retrieveWaitlist();
			  }, 4000);
			  
			  $timeout(function () {
			  $ionicLoading.hide();
			  //loading of info/etiquette here
				$scope.loadRegulations();
			  }, 4000);
			    
			  $timeout(function () {
			  $ionicLoading.hide();
				//loading of hall of fame list here
				$scope.loadHallOfFameList();
			  }, 4000);
			  
			  $timeout(function () {
			  $ionicLoading.hide();
				$scope.loadYogapediaList();
			  }, 4000);
			  
	  }
	
	var upcoming = document.getElementById('showUpcoming');
	var waiting = document.getElementById('showWaitingList');
	var allClasses = document.getElementById('showClasses');
	
	upcoming.style.cssText = "background-color:#f8f8f8";
	waiting.style.cssText = "background-color:#f8f8f8";
	allClasses.style.cssText = "background-color:#e87722; color:#ffffff;";
	
	$scope.displayClasses = true;
	
	$scope.showUpcoming = function(){
		$scope.showUpcomingView = true;
		$scope.showWaitlist = false;
		$scope.displayClasses = false;
		upcoming.style.cssText = "background-color:#e87722; color:#ffffff;";
		waiting.style.cssText ="background-color:#f8f8f8";
		allClasses.style.cssText = "background-color:#f8f8f8";
	};
	
	$scope.showWaitingList = function(){
		$scope.showUpcomingView = false;
		$scope.showWaitlist = true;
		$scope.displayClasses = false;
		
		upcoming.style.cssText="background-color:#f8f8f8;";
		waiting.style.cssText="background-color:#e87722; color:#ffffff;";
		allClasses.style.cssText = "background-color:#f8f8f8";
	};
	
	$scope.showClasses = function(){
		$scope.displayClasses = true;
		$scope.showUpcomingView = false;
		$scope.showWaitlist = false;
		
		upcoming.style.cssText="background-color:#f8f8f8;";
		waiting.style.cssText="background-color:#f8f8f8;";
		allClasses.style.cssText = "background-color:#e87722; color:#ffffff;";
	};

	$scope.removeClass = function(classInfo,userId){
		 // A confirm dialog
		   var confirmPopup = $ionicPopup.confirm({
			 title: 'Cancel Class',
			 template: 'Are you sure you want to cancel this class?',
			 okText: 'Confirm'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				if(classInfo.ClassID==0){
					removeAppointmentService.removeScheduledAppt(classInfo,$scope.userId);
				}else{
					removeBookingService.removeScheduledClass(classInfo,$scope.userId);
				}
				
				$state.go($state.current, {}, {reload: true});
			 } else {
				//press cancel
			 }
		   });   
	};
	
	$scope.removeWaitClass = function(classID){
		 // A confirm dialog
		   var confirmPopup = $ionicPopup.confirm({
			 title: 'Cancel Class',
			 template: 'Are you sure you want to cancel this class?',
			 okText: 'Confirm'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				removeWaitlistService.removeWaitlistClass(classID);
				$state.go($state.current, {}, {reload: true});
			 } else {
				//press cancel
			 }
		   })
	};
	
	
	//classes logic (start)	
	if($scope.selectedclass!=null){
		var str = $scope.selectedclass.ClassDescription.Description;
			str = str.replace(/<div>/g,"");
			str = str.replace(/<\/div>/g,"");
			str = str.replace(/&nbsp;/g,"");
		$scope.updatedClassDescription = str;
	}
	
	$scope.userID = userService.getUserID();
	//loading the feedback/review DB
	 $scope.feedbacks = feedbackDb.getFeedbackData();
	 
	 $scope.bookClassInHome = function(selectedClassID,userID){
		$scope.selectedClassId = selectedClassID;
		//classesService.bookClass(selectedClassID,userID);
		var confirmBookingPopup = $ionicPopup.confirm({
					 title: 'Book Class',
					 template: 'Are you sure you want to book this class?',
					 okText: 'Confirm'
				   });
				   confirmBookingPopup.then(function(res) {
					 if(res){
						//click on confirm
						classesService.bookClass(selectedClassID,$scope.userID);
						$state.go($state.current, {}, {reload: true});
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
	};
	
	//$scope.selectedStaff = classesService.getClassStaff($stateParams.classStaffID);
	
	if($scope.selectedStaff!=null){
			var str1 = $scope.selectedStaff.Bio;
			 str1 = str1.replace(/&lsquo;/g,"");
			 str1 = str1.replace(/&rsquo;/g,"");
			 str1 = str1.replace(/<br\/>/g,"");
			 str1 = str1.replace(/<\/p>/g,"");
			 str1 = str1.replace(/<p>/g,"");
			 str1 = str1.replace(/<div>/g,"");
			 str1 = str1.replace(/<\/div>/g,"");
			 str1 = str1.replace(/&nbsp;/g,"");
			 $scope.updatedClassStaffDesc = str1;
	}
	
	
	//MODAL START
	$ionicModal.fromTemplateUrl('classReviews_modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  
	  $scope.openModal = function() {
		
		var userFeedbacks = [];
		var a=0;
		  for(var b=0;b<$scope.feedbacks.length;b++){
			if($scope.feedbacks[b].staff==$scope.selectedclass.Staff.Name && $scope.feedbacks[b].lesson==$scope.selectedclass.ClassDescription.Name){
				userFeedbacks[a] = $scope.feedbacks[b];
				a++;
			}
		  }
		$scope.classReviews = userFeedbacks;  
		$scope.modal.show();	
	  };
	  $scope.closeModal = function() {
		$scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		// Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
		// Execute action
	  });
	  //MODAL END
	//classes logic (end)
	
	
})


app.controller('reviewCtrl',function($scope,$state,$ionicPopup,$timeout,$ionicLoading,userService,userScheduleService,purchaseHistoryService,historyService,$ionicModal,feedbackDb,$firebase,$localstorage){
	
	$scope.userId = userService.getUserID();
	$scope.username = userService.getUsername();
	$scope.displayReviews = false;

	var retrieveUserHistory = function(){
		//retrieve user's history
		historyService.getUserHistory($scope.userId);
		$scope.userHistory = historyService.getUserHistoryResponse();
	};
	
	var retrievePurchaseHistory = function(){
		//retrieve user's purchase history
		purchaseHistoryService.getPurchaseHistory($scope.userId);
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
	  
	   if($localstorage.get('classesDb')==""||$localstorage.get('classesDb')==null){
			  $timeout(function () {
				$ionicLoading.hide();
				retrieveUserHistory();
			  }, 6000);
			  
			  $timeout(function () {
				$ionicLoading.hide();
				retrievePurchaseHistory();
			  }, 6000);
	   }else{
			$timeout(function () {
				$ionicLoading.hide();
				retrieveUserHistory();
			  }, 4000);
			  
			  $timeout(function () {
				$ionicLoading.hide();
				retrievePurchaseHistory();
			  }, 4000);
	   }
	  
		  
	//var historyBtn = document.getElementById('showHistoryButton');
	//var purchaseBtn = document.getElementById('showPurchaseHistory');
	
	//historyBtn.style.cssText ="background-color:#e87722; color:#ffffff;";
	//purchaseBtn.style.cssText ="background-color:#f8f8f8";
	
	$scope.showHistoryView = true;
	
	
	$scope.showHistory = function(){
		$scope.showPurchase = false;
		$scope.showHistoryView = true;
		//historyBtn.style.cssText ="background-color:#e87722; color:#ffffff;";
		//purchaseBtn.style.cssText ="background-color:#f8f8f8";
	};
	
	$scope.showPurchaseHistory = function(){
		$scope.showHistoryView = false;
		$scope.showPurchase = true;
		//purchaseBtn.style.cssText="background-color:#e87722; color:#ffffff;";
		//historyBtn.style.cssText ="background-color:#f8f8f8";
	};
	
	
	//pull from healhtips DB (start)
	var arrayList = new Array();
	$scope.healthtip = function(){
		var healthtipsLink = new Firebase("https://healthtipstinkertest.firebaseio.com/");
		healthtipsLink.once('value', function(allMessagesSnapshot) {
			allMessagesSnapshot.forEach(function(messageSnapshot) {
				 // Will be called with a messageSnapshot for each message under message_list.
					var message = messageSnapshot.child('tips').val();
					arrayList.push(message);
			});
			  
		   var randomnumber = Math.floor(Math.random() * (arrayList.length));
			
			   var alertPopup2 = $ionicPopup.alert({
				 title: 'Health Tip',
				 subTitle: 'Thank you for your review!',
				 template: arrayList[randomnumber]
			   });
			   alertPopup2.then(function(res) {});
			   
		});
	};
	//pull from healhtips DB (end)
	
	
    //MODAL START
	$ionicModal.fromTemplateUrl('review-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  $scope.openModal = function() {
		$scope.modal.show();
	  };
	  $scope.closeModal = function() {
		$scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		// Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
		// Execute action
	  });
	  //MODAL END
	  
	  
	  $scope.writeReview = function(history){
	  $scope.displayReviews = false;
		//alert(JSON.stringify(history));
		$scope.historyId = history.ID;
		$scope.lessonName = history.Name;
		$scope.staffName = history.Staff.Name;
		$scope.classID = history.ClassID;
		//alert("class ID:"+$scope.classID);
		$scope.appointmentID = history.AppointmentID;
		//alert("appt ID:"+$scope.appointmentID);
		$scope.openModal();
		
		//loading the feedback/review DB
	  $scope.feedbacks = feedbackDb.getFeedbackData();
	  var a=0;
	  $scope.userFeeds="";
	  for(var b=0;b<$scope.feedbacks.length;b++){
		if($scope.feedbacks[b].userid==$scope.userId && $scope.feedbacks[b].historyid==$scope.historyId){
			$scope.userFeeds = $scope.feedbacks[b];
			break;
		}
	  }

	  if($scope.userFeeds!=""){
		$scope.displayReviews = true;
	  }
	};
	
	  
	  //saving to feedback database
	   $scope.addReview = function(review) {
		//alert(review.stars);
		var result = 0;
		
		if(review.feedback==""){
			result = 1;
		}
		
		//alert(review.booking);
	 for(var b=0;b<$scope.feedbacks.length;b++){
		if($scope.feedbacks[b].userid==$scope.userId && $scope.feedbacks[b].historyid==$scope.historyId){
		   result = 1;
		   break;
		}
	  }
		
		if(result==0){
		
			var save = $scope.feedbacks.$add({
           // booking:review.booking,
		   historyid:$scope.historyId,
		   userid:$scope.userId,
		   username:$scope.username,
		   classid:$scope.classID,
		   appointmentid:$scope.appointmentID,
		   lesson:$scope.lessonName,
		   staff:$scope.staffName,
           feedback:review.feedback,
		   stars:review.stars
			});
			
			//review.booking = "";
			review.feedback = "";
			review.stars = 0;
			
			//alert
			/*var alertPopup = $ionicPopup.alert({
			 title: 'Review',
			 template: "Review has been posted!"
		   });
		   alertPopup.then(function(res) {});
		   alertPopup.close();*/
		   $scope.healthtip();
		}
	  	
		
		if(save) {
		  $scope.closeModal();
		  review.feedback = "";
		  review.stars = 0;
		} else {
			review.feedback = "";
			review.stars = 0;
		  var alert1 = $ionicPopup.alert({
			 title: 'Review',
			 template: "Sorry, you can only review once per class."
		   });
		   alert1.then(function(res) {});
		   $scope.closeModal();
		}
    };	  
})




app.controller('classesCtrl', function($scope,$stateParams,$ionicPopup,classesService,userService,feedbackDb,$ionicModal,$timeout,$ionicLoading) {
	$scope.totalClasses = classesService.getClasses();
	$scope.selectedclass = classesService.getSelectedClass($stateParams.classID);	
	
	//date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//jan is 0
	var yyyy = today.getFullYear();
	
	if(mm<10){
		mm="0"+mm;
	}
	
	if(dd<10){
		dd="0"+dd;
	}
	$scope.datex = yyyy+"-"+mm+"-"+dd;
	$scope.ricky="asd";
	
	
	if($scope.selectedclass!=null){
			var str = $scope.selectedclass.ClassDescription.Description;
				str = str.replace(/<div>/g,"");
				str = str.replace(/<\/div>/g,"");
				str = str.replace(/&nbsp;/g,"");
			$scope.updatedClassDescription = str;
	}
	
	$scope.userID = userService.getUserID();
	//loading the feedback/review DB
	 $scope.feedbacks = feedbackDb.getFeedbackData();
	 
	 
	//pull to refresh classes(start)
	$scope.refreshClasses = function() {
		$timeout( function() {
		  //simulate async response
		  classesService.getClassesDatabase();
		  $scope.totalClasses = classesService.getClasses();
		  //Stop the ion-refresher from spinning
		  $scope.$broadcast('scroll.refreshComplete');
		
		}, 2000);
	};
	//pull to refresh end classes(end)
	 
	 
	$scope.bookClass = function(selectedClassID,userID){
		$scope.selectedClassId = selectedClassID;
		//classesService.bookClass(selectedClassID,userID);
		var confirmBookingPopup = $ionicPopup.confirm({
					 title: 'Book Class',
					 template: 'Are you sure you want to book this class?',
					 okText: 'Confirm'
				   });
				   confirmBookingPopup.then(function(res) {
					 if(res){
						//click on confirm
						classesService.bookClass(selectedClassID,$scope.userID);
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
	};
	
	$scope.selectedStaff = classesService.getClassStaff($stateParams.classStaffID);
	
	if($scope.selectedStaff!=null){
			var str1 = $scope.selectedStaff.Bio;
			 str1 = str1.replace(/&lsquo;/g,"");
			 str1 = str1.replace(/&rsquo;/g,"");
			 str1 = str1.replace(/<br\/>/g,"");
			 str1 = str1.replace(/<\/p>/g,"");
			 str1 = str1.replace(/<p>/g,"");
			 str1 = str1.replace(/<div>/g,"");
			 str1 = str1.replace(/<\/div>/g,"");
			 str1 = str1.replace(/&nbsp;/g,"");
			 $scope.updatedClassStaffDesc = str1;
	}
	
	
	$scope.options = [{ name: "Beginner", value: "Beginner"}, { name: "Advanced", value: "Advanced"},{ name: "Multi-level", value: "Multi-level"},{name: "All", value: ""}];
	$scope.selectedOption = $scope.options[0].value;	
	
	
	//MODAL START
	$ionicModal.fromTemplateUrl('classReviews_modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  $scope.openModal = function() {
		
		var userFeedbacks = [];
		var a=0;
		  for(var b=0;b<$scope.feedbacks.length;b++){
			/*alert($scope.feedbacks[b].staff);
			alert($scope.selectedclass.Staff.Name);
			alert($scope.feedbacks[b].lesson);
			alert($scope.selectedclass.ClassDescription.Name);*/
			if($scope.feedbacks[b].staff==$scope.selectedclass.Staff.Name && $scope.feedbacks[b].lesson==$scope.selectedclass.ClassDescription.Name){
				userFeedbacks[a] = $scope.feedbacks[b];
				a++;
			}
		  }
		$scope.classReviews = userFeedbacks;  
		$scope.modal.show();	
	  };
	  $scope.closeModal = function() {
		$scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		// Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
		// Execute action
	  });
	  //MODAL END
	
	
});

app.filter('contains', function () {
  return function (totalClasses, search) {
	//var searchValue = document.getElementById('searchClass');
	var filtered = [];
	var letterMatch = new RegExp(search, 'i');
	
    for (var i = 0; i < totalClasses.length; i++) {
      var item = totalClasses[i];
      if (letterMatch.test(item.ClassDescription.Name.substring(0,item.ClassDescription.Name.length))||letterMatch.test(item.Staff.Name.substring(0,item.Staff.Name.length))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});

app.controller('workshopCtrl',function($scope,$stateParams,$ionicPopup,userService,workshopsService,$timeout){
	$scope.workShopsData = workshopsService.getWorkshops();
	$scope.selectedWorkshop = workshopsService.getSelectedWorkshop($stateParams.workshopID);
	console.log($scope.selectedWorkshop);
	$scope.userID = userService.getUserID();
	
	
	if($scope.selectedWorkshop!=null){
		var str1 = $scope.selectedWorkshop.ClassDescription.Description;
		str1 = str1.replace(/<div>/g,"");
		str1 = str1.replace(/<\/div>/g,"");
		str1 = str1.replace(/&nbsp;/g,"");
		str1 = str1.replace(/<br\/>/g,"");
		str1 = str1.replace(/<p>/g,"");
		str1 = str1.replace(/<\/p>/g,"");
		$scope.updatedWorkshopDescription = str1;
	}
	
	$scope.selectedWorkshopStaff = workshopsService.getWorkshopStaff($stateParams.workshopStaffID);
	


	if($scope.selectedWorkshopStaff!=null){
		var str2 = $scope.selectedWorkshopStaff.Bio;
		 str2 = str2.replace(/&lsquo;/g,"");
		 str2 = str2.replace(/&rsquo;/g,"");
		 str2 = str2.replace(/<br\/>/g,"");
		 str2 = str2.replace(/<\/p>/g,"");
		 str2 = str2.replace(/<p>/g,"");
		 str2 = str2.replace(/<div>/g,"");
		 str2 = str2.replace(/<\/div>/g,"");
		 str2 = str2.replace(/&nbsp;/g,"");
		 $scope.updatedWkspStaffDesc = str2;
	}
	
	
	//pull to refresh workshops(start)
	$scope.refreshWorkshops = function() {
		$timeout( function() {
		  //simulate async response
		  workshopsService.getWorkshopsDatabase();
		  $scope.workShopsData = workshopsService.getWorkshops();
		  //Stop the ion-refresher from spinning
		  $scope.$broadcast('scroll.refreshComplete');
		
		}, 2000);
	};
	//pull to refresh end workshops(end)
	
	
	$scope.bookSelectedWorkshop = function(workshopId,userId){
		var confirmBookingPopup = $ionicPopup.confirm({
			 title: 'Book Workshop',
			 template: 'Are you sure you want to book this workshop?',
			 okText: 'Confirm'
		   });
		   confirmBookingPopup.then(function(res) {
			 if(res){
				//click on confirm
				workshopsService.bookWorkshop(workshopId,$scope.userID);
			 }else{
				//press cancel
				//alert("nope");
			 }
		   });
	};
})


app.controller('retreatCtrl',function($scope,$stateParams,$ionicPopup,userService,retreatsService,$timeout){
	$scope.retreatsData = retreatsService.getRetreats();
	
	$scope.selectedRetreat = retreatsService.getSelectedRetreat($stateParams.retreatID);
	
	$scope.userID = userService.getUserID();
	
	
	if($scope.selectedRetreat!=null){
			var str = $scope.selectedRetreat.ClassDescription.Description;
			str = str.replace(/<div>/g,"");
			str = str.replace(/<\/div>/g,"");
			str = str.replace(/&nbsp;/g,"");
			str = str.replace(/&bull;/g,"");
			str = str.replace(/<br\/>/g,"");
			$scope.updatedRetreatDescription = str;
	}
	
	$scope.selectedRetreatStaff = retreatsService.getRetreatStaff($stateParams.retreatStaffID);
	
	if($scope.selectedRetreatStaff!=null){
			var str2 = $scope.selectedRetreatStaff.Bio;
			 str2 = str2.replace(/&lsquo;/g,"");
			 str2 = str2.replace(/&rsquo;/g,"");
			 str2 = str2.replace(/<br\/>/g,"");
			 str2 = str2.replace(/<\/p>/g,"");
			 str2 = str2.replace(/<p>/g,"");
			 str2 = str2.replace(/<div>/g,"");
			 str2 = str2.replace(/<\/div>/g,"");
			 str2 = str2.replace(/&nbsp;/g,"");
			 $scope.updatedRetreatStaffDesc = str2;
	}
	
	
	
	//pull to refresh retreats(start)
	$scope.refreshRetreats = function() {
		$timeout( function() {
		  //simulate async response
		  retreatsService.getRetreatsDatabase();
		  $scope.retreatsData = retreatsService.getRetreats();
		  //Stop the ion-refresher from spinning
		  $scope.$broadcast('scroll.refreshComplete');
		}, 2000);
	};
	//pull to refresh end retreats(end)
	
	
	$scope.bookRetreatNow = function(retreatId,userId){
		var confirmBookingPopup = $ionicPopup.confirm({
			 title: 'Book Retreat/TT',
			 template: 'Are you sure you want to book this retreat/TT?',
			 okText: 'Confirm'
		   });
		   confirmBookingPopup.then(function(res) {
			 if(res){
				//click on confirm
				retreatsService.bookRetreat(retreatId,$scope.userID);
			 }else{
				//press cancel
				//alert("nope");
			 }
		   });
	};
})



app.controller('eventsCtrl',function($scope,$stateParams,$ionicPopup,userService,eventsService,$timeout,$state){

	//load this method on initialisation
	$scope.loadSpecialEvents = function(){
			window.open('http://www.platinumyoga.com/pages/special-events', '_blank', 'location=yes');
			$state.go("yoga-app.classes");
	};

	/*
	$scope.eventsData = eventsService.getEvents();
	$scope.selectedEvent = eventsService.getSelectedEvent($stateParams.eventID);
	$scope.selectedEventStaff = eventsService.getEventStaff($stateParams.eventStaffID);
	$scope.userID = userService.getUserID();
	
	//pull to refresh events(start)
	$scope.refreshEvents = function() {
		$timeout( function() {
		  //simulate async response
		  eventsService.getEventsDatabase();
		  $scope.eventsData = eventsService.getEvents();
		  //Stop the ion-refresher from spinning
		  $scope.$broadcast('scroll.refreshComplete');
		}, 2000);
	};
	//pull to refresh end events(end)
	
	$scope.bookEvent = function(eventId,userID){
		var confirmBookingPopup = $ionicPopup.confirm({
					 title: 'Book Event',
					 template: 'Are you sure you want to book this event?',
					 okText: 'Confirm'
				   });
				   confirmBookingPopup.then(function(res) {
					 if(res){
						//click on confirm
						eventsService.bookEvent(eventId,userID);
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
	};*/
})

app.controller('challengesCtrl',function($scope,$stateParams,$ionicPopup,userService,challengesService,$timeout){
	$scope.challengesData = challengesService.getChallenges();
	$scope.selectedChallenge = challengesService.getSelectedChallenge($stateParams.challengeID);
	$scope.userID = userService.getUserID();
	
	
	//pull to refresh challenges(start)
	$scope.refreshChallenges = function() {
		$timeout( function() {
		  //simulate async response
		  challengesService.getChallengesDatabase();
		  $scope.challengesData = challengesService.getChallenges();
		  //Stop the ion-refresher from spinning
		  $scope.$broadcast('scroll.refreshComplete');
		}, 2000);
	};
	//pull to refresh end challenges(end)
	
	$scope.bookChallenge = function(challengeId,userID){
		var confirmBookingPopup = $ionicPopup.confirm({
			 title: 'Book Challenge',
			 template: 'Are you sure you want to book this challenge?',
			 okText: 'Confirm'
		});
		
	   confirmBookingPopup.then(function(res) {
		 if(res){
			//click on confirm
			challengesService.bookChallenge(challengeId,userID);
		 }else{
			//press cancel
			//alert("nope");
		 }
	   });
	};
})

app.controller('faqCtrl',function($scope,faqDb,$ionicLoading,$timeout,$state,$localstorage){


	
	if($localstorage.get('beforeClassRules')==null || $localstorage.get('duringClassRules')==null){
		   $ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		  });
		  
		  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide() method whenever everything is ready or loaded.
		  $timeout(function () {
		  $ionicLoading.hide();
		  }, 9000);
	  }  
	  
	  if($localstorage.get('beforeClassRules')!=null && $localstorage.get('beforeClassRules')!==""){
		$scope.beforeClass = JSON.parse($localstorage.get('beforeClassRules'));
	}
	
	if($localstorage.get('duringClassRules')!=null && $localstorage.get('duringClassRules')!==""){
		$scope.duringClass = JSON.parse($localstorage.get('duringClassRules'));
	 }
	  

	
	  
	//$state.go($state.current, {}, {reload: true});
	$scope.displayBeforeClass = true;
	$scope.showBeforeClass = function(){
		$scope.displayBeforeClass = true;
		$scope.displayDuringClass = false;	 
	};
	
	$scope.showDuringClass = function(){
		$scope.displayBeforeClass = false;
		$scope.displayDuringClass = true;
	};
	
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

app.controller('appointmentCtrl',function($scope,$rootScope,appointmentService,sessionService,$stateParams,sessionStaffService,$ionicModal,$ionicPopup,userService,bookApptService,$ionicLoading,$timeout){
	$scope.sessionTypes = sessionService.getSessionResponse();
	$scope.sessionID = $stateParams.sessionTypeID;
	//$scope.displayDate = true;
	$scope.displayTime = false;
	
	$scope.selectedInstructor = function(){
		//sessionStaffService.getSessionStaff($scope.sessionID);
		$scope.instructors = sessionStaffService.getSessionStaffResponse();
	};
	
	//calendar start
		  var today = new Date();
		  var dd = today.getDate()+1;
		  var mm = today.getMonth()+1;	  //January is 0!
		  if(mm<10){
			mm = "0"+mm;
		  }
		  var yyyy = today.getFullYear();
		  var todayString = yyyy + "-" + mm + "-" + dd;
		  $scope.dateDefault = todayString;
		  $scope.date = todayString;
		  $scope.minDate = todayString;
		  $scope.maxDate = '2015-12-04';
		  $scope.disabledDates = ['2014-11-19'];
		   //calender end
		   
		   
    //MODAL START
	$ionicModal.fromTemplateUrl('my-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  $scope.openModal = function() {
		$scope.modal.show();
	  };
	  $scope.closeModal = function() {
		$scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		// Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
		// Execute action
	  });
	  //MODAL END
	
	
	$scope.bookInstructor = function(sessionID,instructor){
		$scope.instructorVar = instructor;
		$scope.sessionName = sessionService.getSessionName(sessionID);
		//call this earlier to attain the timeslots faster
		appointmentService.getAppointments($scope.sessionID,$scope.instructorVar.ID,$scope.date);
			for(var i=0;i<$scope.instructors.length;i++){
				if($scope.instructors[i].ID==instructor.ID){
					$scope.instructorName = $scope.instructors[i].Name;
				}
			}

			$scope.schedules = appointmentService.getApptResponse();
			$scope.openModal();
	};	
	
	//when a date is selected
	$scope.selectedDate=function(date){
		$scope.schedules = appointmentService.getApptResponse1(date);
		
		//$scope.displayDate = false;
		$scope.displayTime = true;

		// Triggered on a button click, or some other target
		$scope.showPopup = function(schedule) {
		   $scope.data = {}
		   // An elaborate, custom popup
		   var myPopup = $ionicPopup.show({
			 template: '<textarea type="text" ng-model="data.notes">',
			 title: 'BOOKING',
			 subTitle: 'Notes:',
			 scope: $scope,
			 buttons: [
			   { text: 'Cancel' },
			   {
				 text: '<b>Book</b>',
				 type: 'button-assertive',
				 onTap: function(e) {
					//method trigger here

				   if ($scope.data.notes!=null) {
						bookApptService.bookAppointment($scope.instructorVar.isMale,$scope.instructorVar.ID,$scope.sessionID,userService.getUserID(),schedule,$scope.data.notes);
						$scope.data.notes=null;
						//return $scope.data.notes;
				   }else{
						$scope.data.notes="";
						bookApptService.bookAppointment($scope.instructorVar.isMale,$scope.instructorVar.ID,$scope.sessionID,userService.getUserID(),schedule,$scope.data.notes);
						$scope.data.notes=null;
				   }
				 }
			   },
			 ]
		   });
		   myPopup.then(function(res) {
		   });
		};
		
	};
})

app.controller('halloffameCtrl',function($scope,hallOfFameDb,$timeout,$ionicLoading,$localstorage){
	
	
	  // Setup the loader
	  if($localstorage.get('hallofFameList')==null){
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
		  }, 4000);
	  }
})


app.controller('yogapediaCtrl',function($scope,$ionicModal){
	$scope.poseOptions = [{ name: "Standing", value: "Standing"}, { name: "Seated", value: "Seated"},{ name: "Inversions", value: "Inversions"},{name: "Backbends", value: "Backbends"},{name: "Arm Balances", value: "Arm Balances"}];
	$scope.poseOption = $scope.poseOptions[1].value;
	
	$scope.poseInfo = function(pose){
		$scope.selectedPose = pose;
		 $scope.openModal();
	};
	
	$scope.completedPose = function(chosenPose){
	 $scope.completedPoseName = chosenPose.pose;
		$localstorage.set(JSON.stringify($scope.completedPoseName),JSON.stringify($scope.completedPoseName));
	};
	
	//MODAL START
	$ionicModal.fromTemplateUrl('yogapedia-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  $scope.openModal = function() {
		$scope.modal.show();
	  };
	  $scope.closeModal = function() {
		$scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		// Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
		// Execute action
	  });
	  //MODAL END
})

app.controller('promotionsCtrl',function($scope,$firebase){
})


app.controller('DateCtrl', function($scope,$ionicPopup, $timeout,appointmentService) {
		  var today = new Date();
		  var dd = today.getDate();
		  var mm = today.getMonth()+1; //January is 0!
		  var yyyy = today.getFullYear();
		  var todayString = yyyy + "-" + mm + "-" + dd;
		  $scope.dateDefault = todayString;
          $scope.date = todayString;
          $scope.minDate = todayString;
          $scope.maxDate = '2015-12-04';
          $scope.disabledDates = ['2014-11-19', todayString];
		  
		   $scope.test=function(){
				alert($scope.date);
			  };
			  
		$scope.showDate = function() {
		   $scope.data = {}

		   var myPopup = $ionicPopup.show({
			 template: '<div pickadate id="classDate" ng-model="date" min-date="minDate" disabled-dates="disabledDates" week-starts-on="0" default-date="dateDefault" date="selectedDate" no-extra-rows>',
			 title: 'Select a date',
			 scope: $scope,
			 buttons: [
			   { text: 'Cancel'},
			   {
				 text: '<b>Confirm</b>',
				 type: 'button-positive',
				 onTap: function(e) {
					 //$scope.date = selectedDate;
					 
					 
					 //alert($scope.selectedDate);
				 }
			   },
			 ]
		   });
		   myPopup.then(function(res) {
			 console.log('Tapped!', res);
		   });
		  };

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


