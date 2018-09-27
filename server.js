const express = require('express');
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const app= express();

Tasks = require('./src/mongodata/tasks');

//Connect to Mongoose
mongoose.connect('mongodb://localhost/todotasks');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//Angular Dist output folder
app.use(express.static(path.join(__dirname, 'dist/ToDo')));

//Send all other requests to the Angular app
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'dist/ToDo/index.html'));
});

//Get all tasks
app.post('/tasks', (req, res)=>{
    var username = req.body;
    Tasks.getTasks(username, function(err, tasks){
        if(err){
            throw err;
        }
        res.send(tasks);
    });
});

//Add task
app.post('/addtask', function(req, res, next){
    var taskdata = req.body;
    Tasks.addTask(taskdata, function(err, task){
        if(err){
            console.log("Some error occurred while adding tasks");
            res.send("Some error occurred while getting tasks");
            next();
        }
        res.send("Task added");
    });
});

//Update task
app.put('/updatetask/:_id', function(req, res){
    var id = req.params._id;
    var taskdata = req.body;
    Tasks.updateTask(id, taskdata, {}, function(err, task){
        if(err){
            throw err;
        }
        res.json(task);
    });
});

//Delete task
app.delete('/deletetask/:id', function(req, res){
    var id = req.params.id;
    Tasks.deleteTask(id, function(err, task){
        if(err){
            throw err;
        }
        res.json("Success");
    });
});

//Set port
const port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));