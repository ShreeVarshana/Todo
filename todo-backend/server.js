const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of express
const app = express();

app.use(express.json());
app.use(cors());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/mern-app')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
    });

// Defining the schema
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        type: String,
        default: '',
    },
});

// Creating a model
const TodoModel = mongoose.model('Todo', todoSchema);

// Create a new todo item
app.post('/todos', async (req, res) => {
    console.log('Request Body:', req.body); // Log request body for debugging

    const { title, description } = req.body;

    try {
        const newTodo = new TodoModel({ title, description });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error.message);
        res.status(500).json({ message: 'Failed to create todo. Please try again later.' });
    }
});


// Get all todo items
app.get('/todos', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        res.status(500).json({ message: 'Failed to retrieve todos. Please try again later.' });
    }
});

// Update a todo item
app.put('/todos/:id', async (req, res) => {
    const { title, description } = req.body;
    const id = req.params.id;

    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo item not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error.message);
        res.status(500).json({ message: 'Failed to update todo. Please try again later.' });
    }
});

// Delete a todo item
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo item not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        res.status(500).json({ message: 'Failed to delete todo. Please try again later.' });
    }
});

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});
