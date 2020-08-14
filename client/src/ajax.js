$(document).ready(function(){

  // get and render all list items
  $.get('http://localhost:3000/todos', function(todos) {
 	todos.forEach(function(todo){
 		$('#todo-list').append(
 			`
 			<li class="list-group-item">
 				<form action="/todos/${todo._id}" method="POST" class="edit-item-form">
 					<div class="form-group">
 						<label for="${todo._id}">Item Text</label>
 						<input type="text" value="${todo.text}" name="todo[text]" class="form-control" id="${todo._id}">
 					</div>
 					<button class="btn btn-primary">Update Item</button>
 				</form>
 				<span class="lead">
 					${todo.text}
 				</span>
 				<div class="pull-right">
 					<button class="edit btn btn-sm btn-warning">Edit</button>
 					<form style="display: inline" method="POST" action="/todos/${todo._id}" class="delete-button">
 						<button type="submit" class="btn btn-sm btn-danger">Delete</button>
 					</form>
 				</div>
 				<div class="clearfix"></div>
 			</li>
 			`
 			)
 	})
 });

  // in order to make the post request, we need to listen for a submission on the form!
  $('#new-todo-form').submit(function(e){
    //prevent the form from carrying out default behavoir
    e.preventDefault();
    //collect form data and serialize
    var formData = $(this).serialize();
    // send the formData to the server, the response is what we get back from the server
    $.post('http://localhost:3000/todos',formData,function(response){
      $("#todo-list").append(`
        <li class="list-group-item">
        <form class="edit-item-form" action="/todos/${response._id}" method="POST">
          <div class="form-group">
            <label for="${response._id}">Item Text</label>
            <input id="${response._id}" type="text" value="${response.text}" name="todo[text]" class="form-control">
          </div>
          <button class="btn btn-primary">Update Item</button>
        </form>
          <span class="lead">
            ${response.text}
          </span>
          <div class="pull-right">
            <button class="edit btn btn-sm btn-warning">Edit</button>
            <form class="delete-button" style="display: inline" method="POST" action="/todos/${response._id}">
              <button type="submit" class="btn btn-sm btn-danger">Delete</button>
            </form>
          </div>
          <div class="clearfix"></div>
        </li>
         `);
         $("#new-todo-form").find('input').val("")
    });
  });


  $('#todo-list').on('click','.edit',function(e){
    $(this).parent().siblings('.edit-item-form').toggle();
  });

  //PUT request
  $('#todo-list').on('submit','.edit-item-form',function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    var formAction = "http://localhost:3000"+$(this).attr('action');
    var $originalItem = $(this).parent('.list-group-item');
    $.ajax({
        url: formAction,
        data: formData,
        type: 'PUT',
        //pass in originalItem
        originalItem: $originalItem,
        success: function(data){

          this.originalItem.html(
            `
            <form class="edit-item-form" action="/todos/${data._id}" method="POST">
              <div class="form-group">
                <label for="${data._id}">Item Text</label>
                <input id="${data._id}" type="text" value="${data.text}" name="todo[text]" class="form-control">
              </div>
              <button class="btn btn-primary">Update Item</button>
            </form>
            <span class="lead">
              ${data.text}
            </span>
            <div class="pull-right">
              <button class="edit btn btn-sm btn-warning">Edit</button>
              <form class="delete-button" style="display: inline" method="POST" action="/todos/${data._id}">
                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
              </form>
            </div>
            <div class="clearfix"></div>
            `
          )
        }
      });
  })


  //DELETE request
  $('#todo-list').on('submit','.delete-button',function(e){
    //prevent the form from carrying out default behavoir
    e.preventDefault();
    var confirmResponse = confirm('Are you sure?');
    if (confirmResponse){
      var actionUrl = "http://localhost:3000"+ $(this).attr('action');
      var $itemToDelete = $(this).parents('.list-group-item');
      $.ajax({
          url: actionUrl,
          type: 'DELETE',
          itemToDelete: $itemToDelete,
          success: function(data){
            this.itemToDelete.remove();
          }
        });
    } else {
      $(this).find('button').blur();
    }
  });
})
