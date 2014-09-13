"use strict";

if (Meteor.isClient) {
  Template.login.events({
    'clibk #login-button': function(event, template) {
      event.preventDefault();
      // retrieve the input field values
      var password = template.find('#login-password').value.trim(),
        login = template.find('#login-login').value.trim();

      Meteor.loginWithPassword(login, password, function(err) {
        if (err) console.log(err);
      });
      $(this).modal('hide');
    }
  });
}
