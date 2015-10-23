(function(){

  var app = angular.module('myreminders', ['ionic', 'myreminders.reminderstore', 'ngCordova']);

  app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    });

    $stateProvider.state('edit', {
      url: '/edit/:reminderId',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    });

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: 'AddCtrl'
    });

    $urlRouterProvider.otherwise('/list');

  });//end of config


  app.controller('ListCtrl', function($scope, ReminderStore, $cordovaLocalNotification){
    $scope.reminders = ReminderStore.list();

    $scope.remove = function(reminderId){
      ReminderStore.remove(reminderId);
    };

    $scope.set = function(reminderId) {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: reminderId,
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            icon: 'file://img/r3.png',
            smallIcon: 'notification_icon.png',
            sound: 'file://resources/ding.mp3',
            led: 'FFFF00'
        }).then(function () {
            alert("The notification "+reminderId+" has been set");
        });
    };

    $scope.isScheduled = function(reminderId) {
        $cordovaLocalNotification.isScheduled(reminderId).then(function(isScheduled) {
            alert("Notification "+reminderId+" is scheduled");
        });
    };

    $scope.cancel = function(reminderId) {
        $cordovaLocalNotification.cancel(reminderId).then(function() {
            alert("Notification "+reminderId+" cancelled");
        });
    };

  });

  app.controller('EditCtrl', function($scope, $state, ReminderStore){
    $scope.reminder = angular.copy(ReminderStore.get($state.params.reminderId));
    $scope.save = function(){
      ReminderStore.update($scope.reminder);
      $state.go('list');
    };
  });

  app.controller('AddCtrl', function($scope, $state, ReminderStore){

    $scope.reminder = {
      id: new Date().getTime().toString(),
      title: '',
      description: '',
      days:'',
      startTime: '8',
      stopTime: '22',
      numAlerts: '10',
      minTime: '15',
      dist: '1',
      active: '1'
    };

    $scope.save = function(){
      ReminderStore.add($scope.reminder);
      $state.go('list');
    };

  });

  app.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

  });

})();