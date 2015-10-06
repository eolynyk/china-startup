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
Meteor.publish('investorCards', function() {
  return Cards.find({userType: "investor"});
});

Meteor.publish('founderCards', function() {
  return Cards.find({userType: "founder"});
});

//Meteor.publish('singleChat', function(chatId) {
//  check(chatId, String);
//  return Chats.findOne({_id: chatId});
//});

Meteor.publish('chats', function(me) {
  check(me, String);
  return Chats.find({$and: [{accepted: true},{$or: [{inviteeId: me},{initiatorId: me}]}]});
});

Meteor.publish('messages', function (chat) {
  check(chat, String);
  //return Messages.find({}, {sort: {submitted: -1}});
  return Messages.find({chatId: chat});
});

Meteor.publish('participants', function (chat) {
  check(chat, String);
  //return Messages.find({}, {sort: {submitted: -1}});
  return Participants.find({chatId: chat});
});