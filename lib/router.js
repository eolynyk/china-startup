//Configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

//Routes

Router.route('/', {
  name: 'cardsList',
  waitOn: function() { 
    return Meteor.subscribe('cards'); 
  }
});

Router.route('/advisorList', {
  name: 'advisorList',
  waitOn: function() {
    return Meteor.subscribe('advisorCards');
  },
  //data: function() { 
  //  //console.log(this.params._id);
  //  return Cards.find({userType: "adviser"});
  //}
});

Router.route('/investorList', {
  name: 'investorList',
  waitOn: function() {
    return Meteor.subscribe('investorCards');
  },
  //data: function() { 
  //  //console.log(this.params._id);
  //  return Cards.find({userType: "adviser"});
  //}
});

Router.route('/founderList', {
  name: 'founderList',
  waitOn: function() {
    return Meteor.subscribe('founderCards');
  }
});

Router.route('/cards/:_id', {
  name: 'cardPage',
  waitOn: function() {
    return Meteor.subscribe('cards');
  },
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
  name: 'chatList',
  waitOn: function() {
    var userId = Meteor.userId();
    return Meteor.subscribe('chats', userId);
  }
});

Router.route('/chats/:_id', {
  name: 'chatPage',
  waitOn: function() {
    var userId = Meteor.userId();
    return [
      Meteor.subscribe('chats', userId),
      Meteor.subscribe('messages')
    ];
  },
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