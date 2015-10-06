Template.chatItem.helpers({
  them: function() {
    var me = Meteor.userId();
    
    if (this.initiatorId == me) {
      return this.invitee;
    } else {
      return this.initiator;
    }
  }
});