Template.chatList.helpers({
  chats: function() {
    return Chats.find();
  }
});