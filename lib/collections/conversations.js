Chats = new Mongo.Collection('chats');
Participants = new Mongo.Collection('participants');
Messages = new Mongo.Collection('messages');

Meteor.methods({
  chatInsert: function(chatAttributes, initiatorAttributes, inviteeAttributes) {
    check(Meteor.userId(), String);
    
    check(chatAttributes, {
      initiator: String,
      initiatorId: String,
      invitee: String,
      inviteeId: String,
      cardId: String,
    });
    
    check(initiatorAttributes, {
      userId: String,
      name: String,
      skypeId: String, 
    });
    
    check(inviteeAttributes, {
      userId: String,
      name: String,
      skypeId: String,  
    });

    //var postWithSameLink = Posts.findOne({url: postAttributes.url});
    var chatWithSameParticipants = 
        Chats.findOne({
          $or: [
            {$and: [
              {inviteeId: chatAttributes.inviteeId}, 
              {initiatorId: chatAttributes.initiatorId}
            ]}, 
            {$and: [
              {initiatorId: chatAttributes.inviteeId}, 
              {inviteeId: chatAttributes.initiatorId}
            ]}
          ]
        });
    //Chats.findOne({$or: [{$and: [{inviteeId: inviteeId}, {initiatorId: initiatorId}]}, {$and: [{initiatorId: inviteeId}, {inviteeId: initiatorId}]}]});
    if (chatWithSameParticipants) {
      
      var updateAccepted = Chats.update({_id: chatWithSameParticipants._id}, {$set: {accepted: true}});
      
      return {
        //chatExists: true,
        _id: chatWithSameParticipants._id
      }
    }

    var chat = _.extend(chatAttributes, {
      accepted: false,
    });

    var chatId = Chats.insert(chat);

    //console.log("the chatId is " + chatId);

        var initiator = _.extend(initiatorAttributes, {
      userType: "initiator",
      chatId: chatId,
    });

    var initiator = Participants.insert(initiator);

    //console.log("the initiator is" + initiator);

       var invitee = _.extend(inviteeAttributes, {
      userType: "invitee",
      chatId: chatId,
    });

    var invitee = Participants.insert(invitee);

    //console.log("the invitee is" + invitee);


    return {
      _id: chatId
    };
  },
  messageInsert: function(messageAttributes) {
    check(this.userId, String);
    check(messageAttributes, {
      chatId: String,
      msg: String
    });
    var user = Meteor.user();
    var chat = Chats.findOne(messageAttributes.chatId);
    //if (!chat)
    //  throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    message = _.extend(messageAttributes, {
      userId: user._id,
      name: user.profile.name,
      submitted: new Date()
    });
    return Messages.insert(message);
  }
});