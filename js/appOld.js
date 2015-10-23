(function(){

  var app = angular.module('starter', ['ionic']);

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

  var reminders = [];

  function getReminder(reminderId){
    for (var i = 0; i<reminders.length; i++){
      if (reminders[i].id === reminderId){
        return reminders[i];
      }
    }
    return undefined;
  }//end getReminder

  function updateReminder(reminder){
    for (var i = 0; i<reminders.length; i++){
      if (reminders[i].id === reminder.id){
        reminders[i] = reminder;
        return;
      }
    }
    return undefined;
  }

  function createReminder(reminder){
    reminders.push(reminder);
  }

  app.controller('ListCtrl', function($scope){
    $scope.reminders = reminders;
  });

  app.controller('EditCtrl', function($scope, $state){
    $scope.reminder = angular.copy(getReminder($state.params.reminderId));
    $scope.save = function(){
      updateReminder($scope.reminder);
      $state.go('list');
    };
  });

  app.controller('AddCtrl', function($scope, $state){

    $scope.reminder = {
      id: new Date().getTime().toString(),
      title: '',
      description: '',
      days:'',
      startTime: '',
      stopTime: '',
      minTime: '',
      numAlerts: '',
      active: '',
      dist: ''
    };

    $scope.save = function(){
      createReminder($scope.reminder);
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
