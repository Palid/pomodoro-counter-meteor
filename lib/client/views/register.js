"use strict";

Template.register.events({
  'click #register-button': function (event, template) {
    event.preventDefault();
    // retrieve the input field values
    var email = template.find('#register-email').value.trim(),
      password = template.find('#register-password').value.trim(),
      login = template.find('#register-login').value.trim();

    Accounts.createUser({
      username: login,
      password: password,
      email: email
    }, function (err) {
      if (err) console.log(err);
    });
    $('#modal-register').modal('hide');

  }
});
