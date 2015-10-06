Template.chatMatch.helpers({
  nextCard: function() {
    var currentCard = this.submitted;
    var nextCard = Cards.findOne({submitted:{$gt:currentCard}},{sort:{submitted:1}});
    if (nextCard === undefined) {
      var initCard = Cards.findOne({},{sort:{submitted:1}})._id;
      return initCard;
    } else {
      return nextCard._id;
    }
    return nextCard;
  },
  prevCard: function() {
    //var currentCard = Cards.findOne(this._id).submitted;
    //var currentCardType = Cards.findOne(this._id).userType;
    //return Cards.findOne({$and: [{submitted:{$lt:currentCard}}, {userType: currentCardType}]},{sort:{submitted: -1}})._id;
    var currentCard = this.submitted;
    var prevCard = Cards.findOne({submitted:{$lt:currentCard}},{sort:{submitted:-1}});
    if (prevCard === undefined) {
      //console.log("no prevcard");
      var initCard = Cards.findOne({},{sort:{submitted:-1}})._id;
      //console.log("initcard is " + initCard);
      //console.log(this._id);
    return initCard;
    } else {
      return prevCard._id;
    }
  }
});

Template.chatMatch.events({
  'click .steve': function(e) {
    e.preventDefault();

    console.log("click worked");
    var initiator = Meteor.user();
    var invitee = Cards.findOne(this._id);

    var chat = {
      initiator: initiator.profile.name,
      initiatorId: initiator._id,
      invitee: invitee.author,
      inviteeId: invitee.userId,
      cardId: invitee._id,
    };

    var initiator = {
      userId: initiator._id,
      //userType: "initiator",
      //chatId: chat._id,
      name: initiator.profile.name,
      //skypeId: initiator.profile.SkypeId,
      skypeId: "echo123"
    };

    console.log(initiator);

    //initiator._id = Participants.insert(initiator);

    var invitee = {
      userId: invitee.userId,
      //userType:"invitee",
      //chatId: chat._id,
      name: invitee.author,
      //skypeId: invitee.SkypeId, 
      skypeId: "echo1234",
    };

    console.log(invitee);


    //
    // var errors = validateCard(card);
    // if (errors.card_name || errors.card_profile_pic || errors.card_description)
    //   return Session.set('cardCreateErrors', errors);
    //
    //chat._id = Chats.insert(chat);
    Meteor.call('chatInsert', chat, initiator, invitee, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('chatPage', {_id: result._id});
      console.log("result id " + result._id);

    });

    //invitee._id = Participants.insert(invitee);
    //Router.go('chatPage', chat);
  }
});