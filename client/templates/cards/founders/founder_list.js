Template.founderList.helpers({
  cards: function() {
    return Cards.find({}, {sort: {submitted: -1}});
  }
});