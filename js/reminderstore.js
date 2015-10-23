angular.module('myreminders.reminderstore', [])

  .factory('ReminderStore', function(){

    var reminders = angular.fromJson(window.localStorage['reminders'] || '[]');

 	function persist(){
 		window.localStorage['reminders'] = angular.toJson(reminders);
 	}

    return {
      
      list: function(){
        return reminders;
      },

      get: function(reminderId){
        for (var i = 0; i<reminders.length; i++){
          if (reminders[i].id === reminderId){
            return reminders[i];
          }
        }
        return undefined;
      },

      add: function(reminder){
        reminders.push(reminder);
        persist();
      },

      update: function(reminder){
        for (var i = 0; i<reminders.length; i++){
          if (reminders[i].id === reminder.id){
            reminders[i] = reminder;
            persist();
            return;
          }
        }
      },

      remove: function(reminderId){
      	console.log("here"+reminderId);
      	for (var i = 0; i<reminders.length; i++){
          if (reminders[i].id === reminderId){
            reminders.splice(i, 1);
            persist();
            return;
          }
        }
      }

    };

  });

