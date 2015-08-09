Template.cardPage.helpers({
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