console.log('sourced');
var toDos = [];

//all button clicks in doc ready
$(document).ready(function(){
  //console.log('doc ready');
  //get all to dos in db and display
  getAll();
  //get onlick from insert todo
  $('.addToDoButton').on('click', function () {
    //console.log('in addToDoButton');
    //add input box
    var submitToDo = '<input id="newToDoIn" type="text" placeholder="Add to do message"><button id="submitToDoButton">Submit</button>';
    $('.addInput').html(submitToDo);
    on = false;

  });//end .addToDoButton

  //submit click button
  $('.addToDo').on('click', '#submitToDoButton', function () {
    //console.log('in addToDo');
    //run through add to server function
    addToDoText();
  });

  $('.currentToDoList').on('click', '#done', function () {
    //console.log('in finishedToDoList button');
    //get data attribute for which todo needs to be updated to not active
    var whichToDo = $(this).attr('data');
    console.log('whichToDo', whichToDo);
    //run updateActive
    updateActive(whichToDo);
  });

  $('.notepad').on('click', "#delete", function () {
    //console.log('in delete button');
    var whichToDelete = $(this).attr('data');
    //run delete function
    deleteToDo(whichToDelete);
  });
});//end docReady


//add new todo to table
var addToDoText = function () {

  var newToDo = $('#newToDoIn').val();
  console.log('newToDo: ', newToDo);
  //clearn addInput
    $('.addInput').html('');
  // create object for todo
  var toDoToSend= {
    toDo : newToDo,
    active : true
  }; // end object
  console.log('toDoToSend', toDoToSend);
  //ajax call new employee
  $.ajax({
    url: '/newtodotext',
    type: 'POST',
    data: toDoToSend,
    success: function (data) {
      console.log('ajax gets back:', data);

      //getAll();
      getAll();
    }//end success
  });//end ajax
};


//get all from todo table
var getAll = function () {
  $.ajax({
      url: '/getalltodos',
      type: 'GET',
      success: function (data) {
        console.log('getalltodos', data);
        toDos = data;
        console.log('toDos = ', toDos);
        //displayAll
        displayAll();
      }//end success
    });//end ajax getemployees
};//end getAll

//display all from table
var displayAll = function () {
  //clear both
  $('#currentToDoList').html('');
  $('#finishedToDoList').html('');
  for (var i = 0; i < toDos.length; i++) {
    if(toDos[i].active){
      $('#currentToDoList').append('<li><button id="done" data="' + i + '">Done</button>' + toDos[i].todotext + '<button id="delete" data=' + i + '>x</button></li>');
    }else{
      $('#finishedToDoList').append('<li>' + toDos[i].todotext + '<button id="delete" data=' + i + '>x</button></li>');
    }
  }
};//end displayAll

//update todo from active to not active
var updateActive = function (thisToDo) {
  console.log('in updateActive');
  var toDoToUpdate = {
    updateToDoText: toDos[thisToDo].todotext
  };//end toDoToUpdate object
  //send to db
  $.ajax({
    url: '/updatetodo',
    type: 'POST',
    data: toDoToUpdate,
    success: function (data) {
      console.log('ajax gets back:', data);

      //getAll();
      getAll();
    }//end success
  });//end aja
};//end updateActive

//delete todo from table
var deleteToDo = function (thisToDo) {
  console.log('in deleteTodo');
  var toDoToDelete = {
    toDelete: toDos[thisToDo].todotext
  };//end object
  $.ajax({
    url: '/deletetodo',
    type: 'POST',
    data: toDoToDelete,
    success: function (data) {
      console.log('ajax delete gets back', data);
      getAll();
    }//end success
  });//end ajax
};//end deleteToDo
