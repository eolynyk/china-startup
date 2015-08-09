Meteor.publish('cards', function() {
  return Cards.find();
});

Meteor.publish('users', function() {
  return Users.find();
});

Meteor.publish("chats", function () {
  return Chats.find();
});

Meteor.publish("messages", function () {
  return Messages.find({}, {sort: {submitted: -1}});
});