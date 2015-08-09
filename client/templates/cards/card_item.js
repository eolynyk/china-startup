Template.cardItem.helpers({
  ownCard: function() {
    return this.userId === Meteor.userId();
  },
});