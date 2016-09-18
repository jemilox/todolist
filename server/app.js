var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded( {extended: false});
var portDecision = process.env.PORT || 3000;
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/todoproject';

app.listen( portDecision, function () {
  console.log("3000 is up!");
});//end server up

app.get('/', urlencodedParser, function (req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});

app.use(express.static('public'));

app.post('/newtodotext', urlencodedParser, function (req, res) {
  console.log('in .post newEmployee');
  console.log('req.body', req.body);
  //create variables from req
  var toDo = req.body.toDo;
  var active = req.body.active;
  console.log('toDo and active:', toDo, active);
  //connect to database
  pg.connect( connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else {
      console.log('connected to database');
      var queryResults = client.query('INSERT INTO todolist(todotext, active) VALUES($1, $2)', [toDo, active]);
    }//end else
    queryResults.on('end', function () {
      done();
      res.send({success: true});
    });
  });//end pg connect
});//end app.post

app.get('/getalltodos', function (req, res) {
  console.log('in /getalltodos');
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      var allToDos = [];
      var queryResults = client.query('SELECT * FROM todolist');
      console.log(queryResults);
      queryResults.on('row', function (row) {
        allToDos.push(row);
      });
      console.log('alltoDos', allToDos[0]);
      queryResults.on('end', function () {
        done();
         return res.json(allToDos);
      });//end queryResults function
    }//end else
  });//end pg connect
});//end app.get

//update todo to inactive
app.post('/updatetodo', urlencodedParser, function (req, res) {
  console.log('in updatetodo');
  console.log('req.body', req.body);
  //create variables from req
  // var updateToDo = req.body.updateToDoText;
  var updateActiveWhich = req.body.updateToDoText;
  console.log('updateActive:', updateActiveWhich);
  //connect to database
  pg.connect( connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else {
      console.log('connected to database in update');
      var queryResults = client.query('UPDATE todolist SET active=false WHERE todotext= $1', [updateActiveWhich]);

    }//end else
    queryResults.on('end', function () {
      done();
      res.send({success: true});
    });

  });//end pg connect
});//end app.post

//delete todo item
app.post('/deletetodo', urlencodedParser, function (req, res) {
  console.log('in deletetodo');
  console.log('req.body', req.body);
  //create variables from req

  var deleteWhich = req.body.toDelete;
  console.log('deleteWhich:', deleteWhich);
  //connect to database
  pg.connect( connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else {
      console.log('connected to database in delete');
      var queryResults = client.query('DELETE FROM todolist WHERE todotext= $1', [deleteWhich]);

    }//end else
    queryResults.on('end', function(){
    done();
    return res.send({success: true});
  });//end queryResults on end
  });//end pg connect
});//end app.post
