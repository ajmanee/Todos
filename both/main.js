Todos = new Mongo.Collection('todos');



if (Meteor.isClient){

    /////// Helper section

    Template.todosMainTemp.helpers({

        'todoF': function () {
            return Todos.find({}, {sort: {createdAt : -1}});
        }
    });

//// EVENT section

    Template.addTaskTemp.events({
       'submit form' : function(event){
            event.preventDefault()
           //Map from field name with variable
           var todoNameVar = event.target.todoName.value;
           //mongo insert sttment
            Todos.insert({
                name: todoNameVar,
                done: false,
                createdAt : new Date()
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
         'keyup [name=todoItem]' : function (event) {
            var documentId = this._id;
            var todoItemVar = event.target.value;
                 Todos.update({_id : documentId},{$set: {name: todoItemVar}} );
                 console.log("Task Changed to " + todoItemVar);
         }

    });





};

if (Meteor.isServer){

}