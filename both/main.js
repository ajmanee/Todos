Todos = new Mongo.Collection('todos');
Lists = new Meteor.Collection('lists');


Router.configure({
    layoutTemplate : 'main'
});
Router.route('/',{
    name: 'home',
    template: 'home'
});
Router.route('/register');
Router.route('/login',{
    name : 'login',
    template: 'login'
});

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPageTemp',
    data: function(){
        var currentListVar = this.params._id;
        return Lists.findOne({ _id : currentListVar});
    }
});