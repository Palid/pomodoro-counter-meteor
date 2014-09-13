"use strict";

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false
});

if (Meteor.isClient){
  Session.setDefault('lastTitle', undefined);
}
