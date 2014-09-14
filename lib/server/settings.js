Meteor.methods({
  pomodoroUpdate: function (previousType, type, color) {
    Pomodoro.update({
      type: previousType
    }, {
      $set: {
        type: type,
        color: color
      }
    }, {
      multi: true
    });
  }
});


Meteor.publish('settings', function () {
  return Settings.find({
    owner: this.userId
  });
});
