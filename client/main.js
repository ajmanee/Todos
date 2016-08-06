

Template.todosMainTemp.helpers({

    'todoF': function () {
        var currentListVar =  this._id;
        var currentUserVar = Meteor.userId();

        return Todos.find({ listId: currentListVar, createdBy: currentUserVar }, {sort: {createdAt: -1}})
    }
});

//below code will help you even if you refresh the page you still can see the checked
Template.todosItemTemp.helpers({
    'checked': function (){
        var isCompleted = this.done;
        if (isCompleted){
            return "checked";
        }
        else {
            return "";
        }
    }
});

Template.todosCountTemp.helpers({
    'totalTodos' : function () {
        var currentListVar = this._id;
        return Todos.find({listId: currentListVar}).count();

    },
    'completedTodos' : function (){
        var currentListVar = this._id;
        return Todos.find({listId : currentListVar,done: true}).count()

    }
});


Template.listsTemp.helpers({

        'list' : function (){
            var currentUserVar = Meteor.userId();
            return Lists.find({createdBy: currentUserVar}, {sort: {name : 1}});
        }

});



//////////////////////////// EVENT section

Template.navigateTemp.events({
    'click .logout' : function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }

});

Template.loginTemp.events({
    'submit Form': function(){
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                var currentRoute = Router.current().route.getName();
                if(currentRoute == "login") {
                    Router.go("home");
                }
            }
        });
    }
});


Template.addTaskTemp.events({
    'submit form' : function(event){
        event.preventDefault()
        //Map from field name with variable
        var todoNameVar = event.target.todoName.value;
        var currentUserVar = Meteor.userId();
        var currentListVar = this._id;
        //mongo insert sttment
        Todos.insert({
            name: todoNameVar,
            done: false,
            createdAt : new Date(),
            createdBy : currentUserVar,
            listId : currentListVar
        });
        //Clear the text box after insert
        $('[name = todoName]').val('');
    }
    //Click on delete link .delete_todo' from html
});

Template.todosItemTemp.events({
    'click .delete-todo' : function(event){
        event.preventDefault();
        var documentIdVar = this._id;
        //console.log(documentIdVar)

        //This to run an confirm window before delete
        var confirm = window.confirm (" Delete this task!");
        if (confirm){
            Todos.remove({_id: documentIdVar});
        }

    },
    'change [type=checkbox]': function (){

      var documentIdVar = this._id;
      var isCompleted = this.done;
        if(isCompleted){
            Todos.update({_id : documentIdVar}, {$set: {done: false}} );
            console.log("Task marked is incomplete")
        }
        else {
            Todos.update({_id : documentIdVar}, {$set: {done: true}});
            console.log("Task is done")
        }
    },

    'keyup [name=todoItem]' : function (event) {
        // 13 is Enter button and 27 is ESC
        if(event.which == 13 || event.which == 27){
            event.target.blur();
        }
        else {

            var documentId = this._id;
            var todoItemVar = event.target.value;
            Todos.update({_id : documentId},{$set: {name: todoItemVar}} );
            console.log("Task Changed to " + todoItemVar);}
    },



});

Template.addListTemp.events({
    'submit form' : function (event) {
        event.preventDefault();
        var listNameVar = event.target.listName.value;
        var currentUserVar = Meteor.userId();
        Lists.insert({
            name: listNameVar,
            createdBy: currentUserVar
        }, function (error , results) {
           Router.go('listPage', {_id: results});
        });
         event.target.listName.value = '';
    }


});

Template.register.events({
    'submit form': function () {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = $('[name=password]').val();
        Accounts.createUser({
            email : emailVar,
            password : passwordVar
        }, function(error) {
            if (error) {
                console.log(error.reason); // ouput error
            } else {
                    Router.go("home");
            }
        });
    }
});



