const express = require('express');

const router = express.Router();

const {Todo} = require('../models/todo.model');

router.get('/', (req, res) =>{
    Todo.find({}, (err, todos) => {
        if (err){
            console.error(err);
            return res.status(500).json(err);
        }
        res.json({list: todos});
});

});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        res.json(todo);
    });
});

router.post('/', (req, res) => {
    const todoToCreate = req.body;
    const todo = new Todo(todoToCreate);

    // Save the request
    todo.save().then(() => {
        res.json(todo);
    }).catch((err) => {
        console.error(err);
        res.status(500).json({message: err.message});
    })
    
});
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const todoToUpdate = req.body;
	
    Todo.findById(id, (err, todo) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
		
        todo.complete = todoToUpdate.complete;
        todo.message = todoToUpdate.message;
        todo.save();

        res.json(todo);
    });
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.status(500).end();
        }
        res.end();
    })    
});

exports.todoRouter = router;

