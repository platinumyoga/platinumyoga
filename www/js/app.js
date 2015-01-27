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



app.factory('classesService', function($http,$ionicPopup,userScheduleService,waitlistService) {
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
						returnMsg = "Unsuccessful! " + JSON.stringify(data.AddClientsToClassesResult.Classes.Class.Clients.Client.Messages.string);
					}
					 var alertPopup = $ionicPopup.alert({
						 title: 'Book Class',
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
					var returnMsg ="";
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
				//alert(JSON.stringify(data));
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
app.factory('userService', function($http,$localstorage,$state,$ionicPopup,userScheduleService,historyService,purchaseHistoryService,userDetailsService,waitlistService,classesService,workshopsService,eventsService,challengesService,sessionService) {
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
					userID = userDatabase.ValidateLoginResult.Client.ID;
					userScheduleService.getUserSchedule(userID);
					waitlistService.getWaitlist(userID);
					historyService.getUserHistory(userID);
					purchaseHistoryService.getPurchaseHistory(userID);
					userDetailsService.getUserDetails(userID);
					
					classesService.getClassesDatabase();
					workshopsService.getWorkshopsDatabase();
					eventsService.getEventsDatabase();
					challengesService.getChallengesDatabase();
					sessionService.getSession();
					
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
    console.log("namenull");
  }else{
	  var userInfo = {};	
	  userInfo.username = $localstorage.get('name');
	  userInfo.password = $localstorage.get('password');
	  
	  userService.authentication(userInfo);
  }
});

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
				//alert(JSON.stringify(apptDatabase.ScheduleItems.ScheduleItem));
				//alert(JSON.stringify(apptDatabase));
			})
			//not working
			request.error(function (data) {
            })
		},
		getApptResponse:function(chosenDate){
			var availSlots = [];
			var j=0;
			
			for(var i=0;i<apptDatabase.length;i++){
				if(apptDatabase[i].StartDateTime.slice(0,10)==chosenDate){
					//alert("Start date:"+apptDatabase[i].StartDateTime);
					//alert("End date:"+apptDatabase[i].EndDateTime);
					availSlots[j]=apptDatabase[i];
					j++;
				}
			}
			
			var timeslots = [];
			var k=0;
			
			for(var a=0;a<availSlots.length;a++){
				//alert(availSlots[a].StartDateTime.slice(0,19).toString());
				//alert(availSlots[a].EndDateTime.slice(0,19).toString());
				
				var startDate = new Date(availSlots[a].StartDateTime.slice(0,19).toString());
				var hr1 = startDate.getHours();
				startDate.setHours(hr1-8);
				
				var endDate = new Date(availSlots[a].EndDateTime.slice(0,19).toString());
				var hr2 = endDate.getHours();
				endDate.setHours(hr2-8);
				//alert("new start: "+startDate);
				//alert("new end: "+endDate);
				
				//the new dates are malaysian times, converted from the api string by sun system.
					
					while(startDate.getTime()<endDate.getTime()){
						//alert(startDate.getTime());
						//alert(endDate.getTime());
						timeslots[k]=chosenDate+" "+startDate.toString().slice(16,24);
						//alert("save"+startDate);
						//alert("1: "+startDate);
						
						var newValue = startDate.getMinutes()+30;
						startDate.setMinutes(newValue);
						//alert("2: "+startDate);
						k++;
					}
					
			}
			return timeslots;
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
				//console.log(JSON.stringify(data));
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
		getSessionStaff: function(SessionTypeID){
			var request = $http({
			method: "post",
			url: "http://platinumyoga-rerawan.rhcloud.com/getStaff.php",
			data: {
				SessionTypeID: SessionTypeID,
			},
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


app.controller('loginCtrl', function($scope, $state,userService,userScheduleService,classesService,workshopsService,eventsService,challengesService,sessionService) {
	$scope.signIn = function(user) {
		userService.authentication(user);
		classesService.getClassesDatabase();
		workshopsService.getWorkshopsDatabase();
		eventsService.getEventsDatabase();
		challengesService.getChallengesDatabase();
		sessionService.getSession();
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
	
	
	$scope.goBack = function() {
		window.history.back();
	};
})


app.controller('sidebarCtrl',function($scope,$state,$ionicActionSheet,$localstorage){
	
	$scope.logout = function(){
		$localstorage.set('name', '');
		$localstorage.set('password', '');
	};
	
	
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

app.controller('homeCtrl',function($scope,$state,$ionicPopup,$ionicViewService,$timeout,$ionicLoading,$interval,userService,userScheduleService,removeBookingService,waitlistService,removeWaitlistService,historyService,purchaseHistoryService,$ionicModal,feedbackDb,$firebase){

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
	  
	  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
	  $timeout(function () {
	  $ionicLoading.hide();
		retrieveScheduledClasses();
	  }, 2900);
	  
	  $timeout(function () {
	  $ionicLoading.hide();
		retrieveWaitlist();
	  }, 2900);
	  
	  $timeout(function () {
		$ionicLoading.hide();
		retrieveUserHistory();
	  }, 2900);
	  
	  $timeout(function () {
		$ionicLoading.hide();
		retrievePurchaseHistory();
	  }, 2900);
	  
	
	var upcoming = document.getElementById('showUpcoming');
	var history = document.getElementById('showHistory');
	upcoming.style.cssText ="background-color:#f8f8f8;color:#e67e22; border-bottom: thick solid #e67e22;border-bottom-width:2px;";
	history.style.cssText ="background-color:#f8f8f8";
	
	
	$scope.showUpcomingView = true;
	$scope.showUpcoming = function(){
		$scope.showUpcomingView = true;
		$scope.showHistoryView = false;
		$scope.showPurchase = false;
		$scope.showWaitlist = false;
		upcoming.style.cssText="background-color:#f8f8f8;color:#e67e22; border-bottom: thick solid #e67e22;border-bottom-width:2px;";
		history.style.cssText ="background-color:#f8f8f8";
	};	
	
	$scope.showHistory = function(){
		$scope.showUpcomingView = false;
		$scope.showWaitlist = false;
		$scope.showPurchase = false;
		$scope.showHistoryView = true;
		history.style.cssText ="background-color:#f8f8f8;color:#e67e22; border-bottom: thick solid #e67e22;border-bottom-width:2px;";
		upcoming.style.cssText ="background-color:#f8f8f8";
	};
	
	$scope.showWaitingList = function(){
		$scope.showUpcomingView = false;
		$scope.showWaitlist = true;
		$scope.showPurchase = false;
		$scope.showHistoryView = false;
	};
	
	$scope.showEnrolled = function(){
		$scope.showUpcomingView = true;
		$scope.showWaitlist = false;
		$scope.showPurchase = false;
		$scope.showHistoryView = false;
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
				//alert("nope");
			 }
		   })
	};
	
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
	};
	
	  
	  //saving to feedback database
	   $scope.addReview = function(review) {
		
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
           feedback:review.feedback
			});
			//review.booking = "";
			review.feedback = "";
			
			//alert
			var alertPopup = $ionicPopup.alert({
			 title: 'Review',
			 template: "Review has been posted!"
		   });
		   alertPopup.then(function(res) {});
		}
	  	
		
		if(save) {
		  $scope.closeModal();
		} else {
			review.feedback = "";
		  var alert1 = $ionicPopup.alert({
			 title: 'Review',
			 template: "Sorry, you can only review once per class."
		   });
		   alert1.then(function(res) {});
		   $scope.closeModal();
		}
		
    };
	  
})

app.controller('classesCtrl', function($scope,$stateParams,$ionicPopup,classesService,userService,feedbackDb,$ionicModal) {
	$scope.totalClasses = classesService.getClasses();
	$scope.selectedclass = classesService.getSelectedClass($stateParams.classID);
	$scope.userID = userService.getUserID();
	//loading the feedback/review DB
	 $scope.feedbacks = feedbackDb.getFeedbackData();
	 
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
						classesService.bookClass(selectedClassID,userID);
					 }else{
						//press cancel
						//alert("nope");
					 }
				   });
	};
	
	$scope.selectedStaff = classesService.getClassStaff($stateParams.classStaffID);
	
	$scope.options = [{ name: "Beginner", value: "Beginner"}, { name: "Intermediate", value: "Intermediate"}, { name: "Advanced", value: "Advanced"}, {name: "All", value: ""}];
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

app.controller('workshopCtrl',function($scope,$stateParams,$ionicPopup,userService,workshopsService){
	$scope.workShopsData = workshopsService.getWorkshops();
	$scope.selectedWorkshop = workshopsService.getSelectedWorkshop($stateParams.workshopID);
	$scope.selectedWorkshopStaff = workshopsService.getWorkshopStaff($stateParams.workshopStaffID);
	$scope.userID = userService.getUserID();
	
	$scope.bookSelectedWorkshop = function(workshopId,userId){
		var confirmBookingPopup = $ionicPopup.confirm({
			 title: 'Book Workshop',
			 template: 'Are you sure you want to book this workshop?',
			 okText: 'Confirm'
		   });
		   confirmBookingPopup.then(function(res) {
			 if(res){
				//click on confirm
				workshopsService.bookWorkshop(workshopId,userId);
			 }else{
				//press cancel
				//alert("nope");
			 }
		   });
	};
})

app.controller('eventsCtrl',function($scope,$stateParams,$ionicPopup,userService,eventsService){
	$scope.eventsData = eventsService.getEvents();
	$scope.selectedEvent = eventsService.getSelectedEvent($stateParams.eventID);
	$scope.selectedEventStaff = eventsService.getEventStaff($stateParams.eventStaffID);
	$scope.userID = userService.getUserID();
	
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
	};
})

app.controller('challengesCtrl',function($scope,$stateParams,$ionicPopup,userService,challengesService){
	$scope.challengesData = challengesService.getChallenges();
	$scope.selectedChallenge = challengesService.getSelectedChallenge($stateParams.challengeID);
	$scope.userID = userService.getUserID();
	
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

app.controller('appointmentCtrl',function($scope,$rootScope,appointmentService,sessionService,$stateParams,sessionStaffService,$ionicModal,$ionicPopup,userService,bookApptService){
	$scope.sessionTypes = sessionService.getSessionResponse();
	$scope.sessionID = $stateParams.sessionTypeID;
	//$scope.displayTime = false;
	$scope.displayDate = true;
	
	$scope.selectedInstructor = function(){
		sessionStaffService.getSessionStaff($scope.sessionID);
		$scope.instructors = sessionStaffService.getSessionStaffResponse();
	};
	
	$scope.showDate = function(){
		$scope.displayTime = false;
		$scope.displayDate = true;
	};
	
	$scope.showTime = function(){
		$scope.displayTime = true;
		$scope.displayDate = false;
	};   
	
	
	$scope.bookInstructor = function(sessionID,instructor){
		$scope.instructorVar = instructor;
		$scope.sessionName = sessionService.getSessionName(sessionID);
		//call this earlier to attain the timeslots faster
		appointmentService.getAppointments($scope.sessionID,$scope.instructorVar.ID);
			for(var i=0;i<$scope.instructors.length;i++){
				if($scope.instructors[i].ID==instructor.ID){
					$scope.instructorName = $scope.instructors[i].Name;
				}
			}
		$scope.openModal();
	};
	   
	   $scope.initSelectDate=function(){
			//calendar start
		  var today = new Date();
		  var dd = today.getDate();
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
			$scope.schedules = appointmentService.getApptResponse($scope.dateDefault);
		//$scope.displayDate = false;
	   };
	   
	   
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
	
	
	
	
	//when a date is selected
	$scope.selectedDate=function(date){
		$scope.schedules = appointmentService.getApptResponse(date);
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

app.controller('promotionsCtrl',function($scope,healthTipDb,$firebase){
	//$scope.healthtips = healthTipDb.getHealthTipsData();
	
	var arrayList = new Array();
	$scope.test = function(){
		var healthtipsLink = new Firebase("https://healthtipstinkertest.firebaseio.com/");
		healthtipsLink.once('value', function(allMessagesSnapshot) {
			allMessagesSnapshot.forEach(function(messageSnapshot) {
				 // Will be called with a messageSnapshot for each message under message_list.
					var message = messageSnapshot.child('tips').val();
					arrayList.push(message);
			});
			  
		   var randomnumber = Math.floor(Math.random() * (arrayList.length));
		   alert(arrayList[randomnumber]);
			  
		});
	};
})


app.controller('DateCtrl', function($scope,appointmentService) {
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


