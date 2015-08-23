Template.chatPage.helpers({
  messages: function() {
    return Messages.find({chatId: this._id});
  },
  //chatId: function() {
  //  console.log(this._id);
  //  //var chatId = Chats.findOne({_id: this._id}).chatId.valueOf();
  //  //return chatId;
  //}
  //p2: function() {
  //  var chat = Chats.findOne({_id: this._id});
  //  var p2Id = Cards.find({userId: chat.participants.p2.userId});
  //  console.log(this.participants.p2.userId);
    //var card = Cards.find({userId: p2Id })
    //console.log(card);
  //  return p2Id.author
  //}
  //skypeId: function() {
  //  var skypeId = "echo123";
  //  //var user = Meteor.user();
  //  //var skypeId =  user.skypeId;
  //  return skypeId;
  //}
});

Template.messageSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var $msg = $(e.target).find('[name=msg]');
    var message = {
      msg: $msg.val(),
      chatId: template.data._id
    };
    var errors = {};
    //if (! comment.body) {
    //  errors.body = "Please write some content";
    //  return Session.set('commentSubmitErrors', errors);
    //}
    Meteor.call('messageInsert', message, function(error, messageId) {
      if (error){
        throwError(error.reason);
      } else {
        $msg.val('');
      }
    });
  },
});