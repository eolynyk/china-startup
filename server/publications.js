//Meteor.publish('cardsList', function(options) {
//  check(options, {
//    sort: Object,
//    limit: Number
//  });
//  return Cards.find({}, options);
//});

Meteor.publish('cards', function () {
  //return Messages.find({}, {sort: {submitted: -1}});
  return Cards.find();
});

//Meteor.publish('singleCard', function(cardId) {
//  check(cardId, String);
//  //return Chats.find({initiatorId: me});
//  return Chats.findOne({_id: cardId});
//});

Meteor.publish('advisorCards', function() {
  return Cards.find({userType: "adviser"});
});

Meteor.publish('investorCards', function() {
  return Cards.find({userType: "investor"});
});

Meteor.publish('founderCards', function() {
  return Cards.find({userType: "founder"});
});

Meteor.publish('chats', function(me) {
  check(me, String);
  //return Chats.find({initiatorId: me});
  return Chats.find({ $or : [{initiatorId: me},{inviteeId: me}]});
});

Meteor.publish('messages', function () {
  //return Messages.find({}, {sort: {submitted: -1}});
  return Messages.find();
});