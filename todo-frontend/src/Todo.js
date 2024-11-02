import { useState } from "react"

export default function Todo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState({});
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const apiUrl = "http://localhost:3000/";

    const handleSubmit = () => {
        //check inputs
        if (title.trim() != '' && description.trim() != '') {
            fetch(apiUrl + "/todos", {
                method: "POST",
                headers: {
                    'Content-Type': 'appilcation/json'
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if (res.ok) {
                    //add item to list
                    setTodos([...todos, { title, description }])
                    setMessage("Item added successfully")
                } else {
                    //set error
                    setError("Unable to create a todo item")
                }
            })
        }
    }


    return <><div className="row p-3 bg-success text-light">
        <h1>My ToDo</h1>
    </div>
        <div>
            <h3>Add Items</h3>
            {message && <p className="text-success">Item Added Successfully</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="title" onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" value={title}></input>
                <input placeholder="description" onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" value={description}></input>
                <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
    </>
} 