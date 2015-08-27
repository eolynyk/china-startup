Template.advisorList.helpers({
  cards: function() {
    return Cards.find({}, {sort: {submitted: -1}});
  }
});