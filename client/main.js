

Template.todosMainTemp.helpers({

    'todoF': function () {
        var currentListVar =  this._id;
        return Todos.find({ listId: currentListVar }, {sort: {createdAt: -1}})
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
            return Lists.find({}, {sort: {name : 1}});
        }

});



//////////////////////////// EVENT section

Template.addTaskTemp.events({
    'submit form' : function(event){
        event.preventDefault()
        //Map from field name with variable
        var todoNameVar = event.target.todoName.value;
        var currentListVar = this._id;
        //mongo insert sttment
        Todos.insert({
            name: todoNameVar,
            done: false,
            createdAt : new Date(),
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
        Lists.insert({
            name: listNameVar
        }, function (error , results) {

           Router.go('listPage', {_id: results});

        });
         event.target.listName.value = '';
    }


});



