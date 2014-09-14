Meteor.publish('pomodoro', function () {
  return Pomodoro.find({
    owner: this.userId
  });
});
