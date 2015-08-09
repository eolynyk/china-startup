//Configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return 
    [
      Meteor.subscribe('cards'),
      Meteor.subscribe('chats'),
      Meteor.subscribe('messages'),
    ];
  }
});

//Routes
Router.route('/', {name: 'cardsList'});

Router.route('/cards/:_id', {
  name: 'cardPage',
  data: function() { 
    //console.log(this.params._id);
    return Cards.findOne(this.params._id);
  }
});

Router.route('/cards/:_id/edit', {
  name: 'cardEdit',
  data: function() { return Cards.findOne(this.params._id); }
});

Router.route('/create', {name: 'cardCreate'});

Router.route('/chats', {
  name: 'chatList'
});

Router.route('/chats/:_id', {
  name: 'chatPage',
  data: function() { 
    //console.log(this.params._id);
    return Chats.findOne(this.params._id);
  }
});

//OnBeforeAction Functions
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'cardCreate'});