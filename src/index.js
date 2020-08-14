const express = require('express');
const mongoose = require('mongoose');

const { todoRouter } = require('./routes/todo.routes');

mongoose.connect('mongodb://localhost:27017/my_mongo_db', 
{useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on('error', err => {
    console.log(err);
    process.exit(1);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the todo API!' });
});

app.use('/todos', todoRouter);

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

