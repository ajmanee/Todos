Todos = new Mongo.Collection('todos');
Lists = new Meteor.Collection('lists');


Router.configure({
    layoutTemplate : 'mainTemp'
});
Router.route('/',{
    name: 'home',
    template: 'home'
});
Router.route('/register');
Router.route('/login',{
    name : 'login',
    template: 'loginTemp'
});

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPageTemp',
    data: function(){
        var currentListVar = this.params._id;
        var currentUser = Meteor.userId();
        return Lists.findOne({ _id : currentListVar, createdBy: currentUser});
    },
    onRun: function(){
        console.log("You triggered 'onRun' for 'listPage' route.");
        this.next();
    },
    onRerun: function(){
        console.log("You triggered 'onRerun' for 'listPage' route.");
    },
    onBeforeAction : function () {
        var currentUserVar = Meteor.userId();
        if (currentUserVar){
            this.next();
        }else {
            this.render("login")
        }


    },
    onAfterAction: function(){
        console.log("You triggered 'onAfterAction' for 'listPage' route.");
    },
    onStop: function(){
        console.log("You triggered 'onStop' for 'listPage' route.");
    }
});