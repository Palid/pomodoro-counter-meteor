if (Meteor.isClient) {
  Template.table.helpers({
    pomodoro: function() {
      var title = Session.get('lastTitle');
      if (title) {
        return Pomodoro.find({
          title: title
        }).fetch();
      } else {
        return Pomodoro.find().fetch();
      }
    }
  });
  Template.table.events({
    'keydown #pomodoro-type-search': function(event, template) {
      var val = template.find('#pomodoro-type-search').value.trim();
      if (event.which === 13) {
        Session.set('lastTitle', val === '' ? undefined : val);
      }
    },
    'click #pomodoro-search': function(event, template) {
      var val = template.find('#pomodoro-type-search').value.trim();
        Session.set('lastTitle', val === '' ? undefined : val);
    }
  });
  Template.pomodoroSettings.events({
    'click #new-pomodoro-add': function(event, template) {
      var type = template.find('#new-pomodoro-type').value.trim();
      var setting = Settings.findOne({
        type: type
      });
      Pomodoro.insert({
        type: type,
        title: template.find('#new-pomodoro-title').value.trim(),
        description: template.find('#new-pomodoro-description').value.trim(),
        date: template.find('#new-pomodoro-date').value.trim(),
        color: setting ? setting.color : 'white'
      }, function(err) {
        if (err) console.log(err);
      });
    }
  });
}
