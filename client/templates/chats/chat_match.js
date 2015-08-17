Template.chatMatch.helpers({
  nextCard: function() {
    var currentCard = Cards.findOne(this._id).submitted;
    return Cards.findOne({submitted:{$gt:currentCard}},{sort:{submitted:1}})._id;
    //return currentCard;
  },
  prevCard: function() {
    var currentCard = Cards.findOne(this._id).submitted;
    return Cards.findOne({submitted:{$lt:currentCard}},{sort:{submitted:-1}})._id;
  }
});

Template.chatMatch.events({
  'click .steve': function(e) {
    e.preventDefault();

    console.log("click worked");

    //var card = {
    //  card_name: $(e.target).find('[name=card_name]').val(),
    //  card_profile_pic: $(e.target).find('[name=card_profile_pic]').val(),
    //  card_description: $(e.target).find('[name=card_description]').val(),
    //};
    //
    // var errors = validateCard(card);
    // if (errors.card_name || errors.card_profile_pic || errors.card_description)
    //   return Session.set('cardCreateErrors', errors);
    //
    Meteor.call('chatInsert', chat, function(error, result) {
      if (error)
        return throwError(error.reason);

      ////show this result but route anyway
      //if (result.cardExists)
      //  throwError('This card has already been posted');

      Router.go('chatPage', {_id: result._id});
    });
  }
});