const mongoose = require('mongoose');
const todoScema = mongoose.Schema({
    todo_title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required :true
    },
    status:{
        type:Boolean,
        require:true
    }
});
const Todo = mongoose.model('Todo',todoScema);
module.exports = Todo