Template.cardCreate.onCreated(function() {
  Session.set('cardCreateErrors', {});
});

Template.cardCreate.helpers({
  card_username: function() {return Meteor.user().username},
  errorMessage: function(field) {
    return Session.get('cardCreateErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('cardCreateErrors')[field] ? 'has-error' : '';
  }
});

Template.cardCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var card = {
      card_name: $(e.target).find('[name=card_name]').val(),
      card_profile_pic: $(e.target).find('[name=card_profile_pic]').val(),
      card_description: $(e.target).find('[name=card_description]').val(),
    };
    
    var errors = validateCard(card);
    if (errors.card_name || errors.card_profile_pic || errors.card_description)
      return Session.set('cardCreateErrors', errors);

    Meteor.call('cardInsert', card, function(error, result) {
      if (error)
        return throwError(error.reason);

      //show this result but route anyway
      if (result.cardExists)
        throwError('This card has already been posted');

      Router.go('cardPage', {_id: result._id});
    });
  }
});