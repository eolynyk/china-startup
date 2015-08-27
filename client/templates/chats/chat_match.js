Template.chatMatch.helpers({
  nextCard: function() {
    var currentCard = Cards.findOne(this._id).submitted;
    var currentCardType = Cards.findOne(this._id).userType;
    //console.log(currentCardType);
    return Cards.findOne({$and: [{submitted:{$gt:currentCard}}, {userType: currentCardType}]},{sort:{submitted:1}})._id;
  },
  prevCard: function() {
    var currentCard = Cards.findOne(this._id).submitted;
    var currentCardType = Cards.findOne(this._id).userType;
    return Cards.findOne({$and: [{submitted:{$lt:currentCard}}, {userType: currentCardType}]},{sort:{submitted: -1}})._id;
  }
});

Template.chatMatch.events({
  'click .steve': function(e) {
    e.preventDefault();

    console.log("click worked");
    var initiator = Meteor.user();
    var invitee = Cards.findOne(this._id);

    var chat = {
      initiatorId: initiator._id,
      initiator: initiator.profile.name,
      initiatorSkype: initiator.profile.SkypeID,
      inviteeId: invitee.userId,
      invitee: invitee.author,
      inviteeSkype: invitee.SkypeId,
      accepted: true,
      cardId: invitee._id,
    };
    console.log(chat);
    //
    // var errors = validateCard(card);
    // if (errors.card_name || errors.card_profile_pic || errors.card_description)
    //   return Session.set('cardCreateErrors', errors);
    //
    chat._id = Chats.insert(chat);
    Router.go('chatPage', chat);
  }
});