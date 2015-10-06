Template.chatPage.helpers({
  messages: function() {
    return Messages.find();
  },
  them: function() {
    var me = Meteor.userId();
    //console.log(me);
    var them = Participants.findOne({userId: {$not: me}});
    //console.log(them);
    return them.name;
  },
});

Template.messageItem.helpers({
  participant: function() {
    var messageUserId= this.userId;
    var participant = Participants.findOne({userId: messageUserId});
    return participant.name;
  },
  whoIs: function() {
    var messageUserId= this.userId;
    var me = Meteor.userId();
    if (messageUserId === me) {
      return "me";
    } else {
      return "them";
    }
  }


});

Template.messageSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var $msg = $(e.target).find('[name=msg]');
    var message = {
      msg: $msg.val(),
      chatId: template.data._id
    };
    //console.log(template.data._id);
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