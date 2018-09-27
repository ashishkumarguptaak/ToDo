var mongoose = require('mongoose');

//Tasks Schema
var tasksSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    tasks:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Tasks = module.exports = mongoose.model('tasks', tasksSchema);


//Get Tasks
module.exports.getTasks = function(username, callback){
    Tasks.find(username, callback);
}

//Add Tasks
module.exports.addTask = function(task, callback){
    Tasks.create(task, callback);
}

//Update Tasks
module.exports.updateTask = function(id, task, options, callback){
    var query = {_id: id};
    var update = {
        username: task.username,
        tasks: task.tasks,
        description: task.description,
        type: task.type,
        status: task.status,
        create_date: task.create_date

    };
    Tasks.findOneAndUpdate(query, update, options, callback);
}

//Delete task
module.exports.deleteTask = function(id, callback){
    var query = {_id:id}
    Tasks.deleteOne(query, callback);
}