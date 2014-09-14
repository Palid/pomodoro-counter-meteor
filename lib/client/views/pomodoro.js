Meteor.subscribe('pomodoro');

var pomodoroDep = new Tracker.Dependency;

function getPomodoros() {
  pomodoroDep.depend();
  var query = {},
    title = Session.get('lastTitle');
  if (title) {
    query.title = title;
  }
  return Pomodoro.find(query).fetch();
}

Template.table.helpers({
  pomodoro: function () {
    var pomodoros = getPomodoros(),
      len = pomodoros.length;
    if (Session.get('pomodoroAmount') !== len) {
      Session.set('pomodoroAmount', len);
      pomodoroDep.changed();
    }
    return _.map(pomodoros, function (item) {
      var dupa = _.extend(item, {
        tooltip: Blaze.toHTMLWithData(Template.tooltip, item)
      });
      console.log(dupa);
      return dupa;
    });
  }
});
Template.table.events({
  'keydown #pomodoro-type-search': function (event, template) {
    var val = template.find('#pomodoro-type-search').value.trim();
    if (event.which === 13) {
      Session.set('lastTitle', val === '' ? undefined : val);
    }
  },
  'click #pomodoro-search': function (event, template) {
    var val = template.find('#pomodoro-type-search').value.trim();
    Session.set('lastTitle', val === '' ? undefined : val);
  }
});
Template.pomodoroSettings.events({
  'click #new-pomodoro-add': function (event, template) {
    var type = template.find('#new-pomodoro-type').value.trim();
    var setting = Settings.findOne({
      type: type
    });

    Pomodoro.insert({
      owner: Meteor.userId(),
      type: type,
      title: template.find('#new-pomodoro-title').value.trim(),
      description: template.find('#new-pomodoro-description').value.trim(),
      date: template.find('#new-pomodoro-date').value.trim(),
      color: setting ? setting.color : 'white'
    }, function (err) {
      if (err) console.log(err);
    });
  }
});

Tracker.autorun(function () {
  // FIXME!!!!!!
  Meteor.setTimeout(function () {
    var cells = $('.pomodoro-cell');
    cells.tooltip('destroy');
    cells.tooltip({
      animation: true,
      html: true
    });
  }, Session.get('pomodoroAmount')/10);

});
