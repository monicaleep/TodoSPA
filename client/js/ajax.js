'use strict';

$(document).ready(function () {
  // get and render all list items
  $.get('http://localhost:3000/todos', function (todos) {
    todos.forEach(function (todo) {
      $('#todo-list').append('\n \t\t\t<li class="list-group-item">\n \t\t\t\t<form action="/todos/' + todo._id + '" method="POST" class="edit-item-form">\n \t\t\t\t\t<div class="form-group">\n \t\t\t\t\t\t<label for="' + todo._id + '">Item Text</label>\n \t\t\t\t\t\t<input type="text" value="' + todo.text + '" name="todo[text]" class="form-control" id="' + todo._id + '">\n \t\t\t\t\t</div>\n \t\t\t\t\t<button class="btn btn-primary">Update Item</button>\n \t\t\t\t</form>\n \t\t\t\t<span class="lead">\n \t\t\t\t\t' + todo.text + '\n \t\t\t\t</span>\n \t\t\t\t<div class="pull-right">\n \t\t\t\t\t<button class="edit btn btn-sm btn-warning">Edit</button>\n \t\t\t\t\t<form style="display: inline" method="POST" action="/todos/' + todo._id + '" class="delete-button">\n \t\t\t\t\t\t<button type="submit" class="btn btn-sm btn-danger">Delete</button>\n \t\t\t\t\t</form>\n \t\t\t\t</div>\n \t\t\t\t<div class="clearfix"></div>\n \t\t\t</li>\n \t\t\t');
    });
  });

  $(".search").keyup(function (e) {
    var search = $(this).val();
    var todos = $(".list-group-item");
    todos.each(function () {
      var text = $(this).children('span').text();
      if (!text.includes(search)) {
        $(this).css("display", "none");
      } else {
        $(this).css("display", "block");
      }
    });
  });

  // in order to make the post request, we need to listen for a submission on the form!
  $('#new-todo-form').submit(function (e) {
    //prevent the form from carrying out default behavoir
    e.preventDefault();
    //collect form data and serialize
    var formData = $(this).serialize();
    // send the formData to the server, the response is what we get back from the server
    $.post('http://localhost:3000/todos', formData, function (response) {
      $("#todo-list").append('\n        <li class="list-group-item">\n        <form class="edit-item-form" action="/todos/' + response._id + '" method="POST">\n          <div class="form-group">\n            <label for="' + response._id + '">Item Text</label>\n            <input id="' + response._id + '" type="text" value="' + response.text + '" name="todo[text]" class="form-control">\n          </div>\n          <button class="btn btn-primary">Update Item</button>\n        </form>\n          <span class="lead">\n            ' + response.text + '\n          </span>\n          <div class="pull-right">\n            <button class="edit btn btn-sm btn-warning">Edit</button>\n            <form class="delete-button" style="display: inline" method="POST" action="/todos/' + response._id + '">\n              <button type="submit" class="btn btn-sm btn-danger">Delete</button>\n            </form>\n          </div>\n          <div class="clearfix"></div>\n        </li>\n         ');
      $("#new-todo-form").find('input').val("");
    });
  });

  $('#todo-list').on('click', '.edit', function (e) {
    $(this).parent().siblings('.edit-item-form').toggle();
  });

  //PUT request
  $('#todo-list').on('submit', '.edit-item-form', function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    var formAction = "http://localhost:3000" + $(this).attr('action');
    var $originalItem = $(this).parent('.list-group-item');
    $.ajax({
      url: formAction,
      data: formData,
      type: 'PUT',
      //pass in originalItem
      originalItem: $originalItem,
      success: function success(data) {

        this.originalItem.html('\n            <form class="edit-item-form" action="/todos/' + data._id + '" method="POST">\n              <div class="form-group">\n                <label for="' + data._id + '">Item Text</label>\n                <input id="' + data._id + '" type="text" value="' + data.text + '" name="todo[text]" class="form-control">\n              </div>\n              <button class="btn btn-primary">Update Item</button>\n            </form>\n            <span class="lead">\n              ' + data.text + '\n            </span>\n            <div class="pull-right">\n              <button class="edit btn btn-sm btn-warning">Edit</button>\n              <form class="delete-button" style="display: inline" method="POST" action="/todos/' + data._id + '">\n                <button type="submit" class="btn btn-sm btn-danger">Delete</button>\n              </form>\n            </div>\n            <div class="clearfix"></div>\n            ');
      }
    });
  });

  //DELETE request
  $('#todo-list').on('submit', '.delete-button', function (e) {
    //prevent the form from carrying out default behavoir
    e.preventDefault();
    var confirmResponse = confirm('Are you sure?');
    if (confirmResponse) {
      var actionUrl = "http://localhost:3000" + $(this).attr('action');
      var $itemToDelete = $(this).parents('.list-group-item');
      $.ajax({
        url: actionUrl,
        type: 'DELETE',
        itemToDelete: $itemToDelete,
        success: function success(data) {
          this.itemToDelete.remove();
        }
      });
    } else {
      $(this).find('button').blur();
    }
  });
});