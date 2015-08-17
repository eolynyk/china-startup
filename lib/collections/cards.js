Cards = new Mongo.Collection('cards');

Cards.allow({
  update: function(userId, card) { return ownsDocument(userId, card); },
  remove: function(userId, card) { return ownsDocument(userId, card); },
});

Cards.deny({
  update: function(userId, card, fieldNames, modifier) {
    var errors = validatecard(modifier.$set);
    return errors.card_profile_pic || errors.card_description;
  }
});

validateCard = function(card) {
  var errors = {};

  if (!card.card_name)
    errors.card_name = "Please fill in your full name";

  if (!card.card_profile_pic)
    errors.card_profile_pic = "Please fill in the URL for your Profile Pic";

  if (!card.card_description)
    errors.card_description = "Please write your bio";

  return errors;
}

Meteor.methods({
  cardInsert: function(cardAttributes) {
    check(Meteor.userId(), String);
    check(cardAttributes, {
      card_name: String,
      card_profile_pic: String,
      card_description: String,
    });

    var errors = validateCard(cardAttributes);
    if (errors.card_name || errors.card_profile_pic || errors.card_description)
      throw new Meteor.Error('invalid-card', "You must set a Name, Profile pic, and Description for your card");

    var cardWithSameName = Cards.findOne({card_name: cardAttributes.card_name});
    if (cardWithSameName) {
      return {
        cardExists: true,
        _id: cardWithSameName._id
      }
    }

    var user = Meteor.user();
    var card = _.extend(cardAttributes, {
      userId: user._id,
      author: user.profile.name,
      SkypeId: user.profile.SkypeID,
      submitted: new Date()
    });

    var cardId = Cards.insert(card);

    return {
      _id: cardId
    };
  }
});