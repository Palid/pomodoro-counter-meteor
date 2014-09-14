Pomodoro = new Meteor.Collection('pomodoro');

Pomodoro.allow({
  insert: function (userId, doc) {
    return userId && doc.owner === userId;
  },
  update: function (userId, docs, fields) {
    return _.all(docs, function (doc) {
      if (userId !== doc.owner) {
        return false;
      }
      var allowed = ['type', 'title', 'description', 'date'];
      if (_.difference(fields, allowed).length) {
        return false;
      }
      return true;
    });
  },
  remove: function (userId, doc) {
    return userId && doc.owner === userId;
  },
  fetch: ['owner']
});
