if (Meteor.isClient) {

  Template.settings.helpers({
    types: function() {
      return Settings.find().fetch();
    }
  });

  Template.settingsItem.events({
    'click .settings-modify': function(event, template) {
      event.preventDefault();
      var type = template.find('.settings-type').value.trim();
      var color = template.find('.settings-color').value.trim();

      Settings.update({
        _id: this._id
      }, {
        $set: {
          type: type,
          color: color
        }
      }, {
        multi: true
      });

      Meteor.call('pomodoroUpdate', this.type, type, color);
    },
    'click .settings-delete': function(event) {
      event.preventDefault();

      Settings.remove({
        _id: this._id
      }, function(err) {
        if (err) console.log(err);
      });
    },
    'click .settings-find': function(event, template) {
      event.preventDefault();

      Session.set('lastTitle', template.find('.settings-type').value.trim());
    }
  });

  Template.settings.events({
    'click #new-settings-add': function(event, template) {
      event.preventDefault();
      var type = template.find('#new-settings-type').value.trim(),
        color = template.find('#new-settings-color').value.trim();

      var match = Match.test(Settings.findOne({
        type: type
      }), type);
      if (!match) {
        Settings.insert({
          type: type,
          color: color
        });
        Meteor.call('pomodoroUpdate', this.type, type, color);

        type.value = '';
        color.value = '';
      } else {
        type.value = 'Type is not unique!';
      }


    }
  });
}
