//Using Express
const express = require('express')
const mongoose = require('mongoose');


//create an instance of express
const app = express();
app.use(express.json())

//Sample in-memory storage for todo items
//let todos = [];



//connecting mongodb
mongoose.connect('mongodb://localhost/mern-app')
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
        console.log(err)
    })

//creating schema
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String
})


//creating a model
const todomodel = mongoose.model('Todo', todoSchema);

//Create a new todo item
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    // const newTodo = {
    //    id: todos.length + 1,
    //   title,
    //    description
    // };

    //todos.push(newTodo);
    // console.log(todos);

    try {
        const newTodo = new todomodel({ title, description });
        await newTodo.save()
        res.status(201).json(newTodo);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }

})

//Get All items
app.get('/todos', async (req, res) => {
    try {
        const todos = await todomodel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

})

//update a todo item
app.put("/todos/:id", async (req, res) => {

    try {
        const { title, description } = req.body;
        const id = req.params.id;
        const UpdatedTodo = await todomodel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        )

        if (!UpdatedTodo) {
            return res.status(404).json({ message: "Todo not found" })
        }
        res.json(UpdatedTodo)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }


})

//Delete an todo Item
app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await todomodel.findByIdAndDelete(id);
        res.status(204).end();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})


//Start the server
const port = 8000;
app.listen(port, () => {
    console.log("Server is listening to the port " + port);
})