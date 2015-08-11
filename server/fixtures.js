if (Cards.find().count() === 0) {
  Cards.insert({
    card_name: 'Jay Depp',
    card_profile_pic: 'http://organicthemes.com/demo/profile/files/2012/12/profile_img.png',
    card_description: 'Bacon ipsum dolor amet ham brisket short ribs meatball drumstick. Capicola ground round beef ribs cupim tongue short loin ham hock pork belly venison. Filet mignon porchetta flank t-bone. Cow pork frankfurter cupim. Biltong ribeye pancetta prosciutto shankle spare ribs tri-tip leberkas hamburger ground round picanha shoulder tail brisket short ribs. Chicken flank alcatra, pork loin picanha sausage ribeye tenderloin chuck.',
    author: 'some rando',
    submitted: new Date()
  });
  Cards.insert({
    card_name: 'Trippy Go Go',
    card_profile_pic: 'http://www.likecool.com/Gear/Pic/One%20Trippy%20Profile%20Pic/One-Trippy-Profile-Pic.jpg',
    card_description: 'Bacon ipsum dolor amet ham brisket short ribs meatball drumstick. Capicola ground round beef ribs cupim tongue short loin ham hock pork belly venison. Filet mignon porchetta flank t-bone. Cow pork frankfurter cupim. Biltong ribeye pancetta prosciutto shankle spare ribs tri-tip leberkas hamburger ground round picanha shoulder tail brisket short ribs. Chicken flank alcatra, pork loin picanha sausage ribeye tenderloin chuck.',
    author: 'some rando',
    submitted: new Date()
  });
  Cards.insert({
    card_name: 'Drew Barrymore',
    card_profile_pic: 'https://s-media-cache-ak0.pinimg.com/736x/49/ec/1f/49ec1ff3e3716e0c0753966cea5b046e.jpg',
    card_description: 'Bacon ipsum dolor amet ham brisket short ribs meatball drumstick. Capicola ground round beef ribs cupim tongue short loin ham hock pork belly venison. Filet mignon porchetta flank t-bone. Cow pork frankfurter cupim. Biltong ribeye pancetta prosciutto shankle spare ribs tri-tip leberkas hamburger ground round picanha shoulder tail brisket short ribs. Chicken flank alcatra, pork loin picanha sausage ribeye tenderloin chuck.',
    author: 'some rando',
    submitted: new Date()
  });
};
if (Chats.find().count() === 0) {
  var now = new Date().getTime();
  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);
  var telescopeId = Chats.insert({
    name: sacha.profile.name,
    submitted: new Date(now - 7 * 3600 * 1000)
  });
  Messages.insert({
    chatId: telescopeId,
    userId: tom._id,
    user: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    msg: 'Interesting project Sacha, can I get involved?'
  });
  Messages.insert({
    chatId: telescopeId,
    userId: sacha._id,
    user: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    msg: 'You sure can Tom!'
  });
  Chats.insert({
    userId: tom._id,
    name: tom.profile.name,
    submitted: new Date(now - 10 * 3600 * 1000)
  });
};