Template.cardEdit.onCreated(function() {
  Session.set('cardEditErrors', {});
});

Template.cardEdit.helpers({
  //card_username: function() {return Meteor.user().username},
  errorMessage: function(field) {
    return Session.get('cardEditErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('cardEditErrors')[field] ? 'has-error' : '';
  }
});

Template.cardEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    var currentCardId = this._id;
    var cardProperties = {
      card_profile_pic: $(e.target).find('[name=card_profile_pic]').val(),
      card_description: $(e.target).find('[name=card_description]').val(),
    }

    var errors = validateCard(cardProperties);
    if (errors.card_profile_pic || errors.card_description)
      return Session.set('cardEditErrors', errors);

    Cards.update(currentCardId, {$set: cardProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('cardPage', {_id: currentCardId});
      }
    });
  },
  'click .delete': function(e) {
    e.preventDefault();
    if (confirm("Delete this card?")) {
      var currentCardId = this._id;
      Cards.remove(currentCardId);
      Router.go('cardsList');
    }
  }
});