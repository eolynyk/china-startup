Template.chatPage.helpers({
  messages: function() {
    return Messages.find({chatId: this._id});
  },
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