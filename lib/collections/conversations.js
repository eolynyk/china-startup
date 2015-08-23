Chats = new Mongo.Collection('chats');
Messages = new Mongo.Collection('messages');

Messages.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Chats.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Meteor.methods({
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