const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const todoModel = new Schema({
    complete: {type: Boolean},
    message: {type: String, required: true}

});

exports.Todo = mongoose.model('todos', todoModel);