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
}