import { useEffect, useState } from "react";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(-1);
    const [message, setMessage] = useState("");
    const apiUrl = "http://localhost:8000";

    const [edittitle, setEditTitle] = useState("");
    const [editdescription, setEditDescription] = useState("");

    const handleSubmit = () => {
        setError("");
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(apiUrl + "/todos", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            })
                .then((res) => {
                    if (res.ok) {
                        // Fetch the updated list of todos to get the correct _id for the new item
                        getItems();
                        setMessage("Item added successfully");
                        setTitle(""); // Reset the title input field
                        setDescription(""); // Reset the description input field
                        setTimeout(() => setMessage(""), 3000);
                    } else {
                        setError("Unable to create a todo item");
                    }
                })
                .catch(() => setError("Unable to create a todo item"));
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch(apiUrl + "/todos")
            .then((res) => res.json())
            .then((res) => setTodos(res));
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description);
    };

    const handleUpdate = () => { /* Your update code here */ };

    const handleDelete = (id) => {
        fetch(`${apiUrl}/todos/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    setTodos(todos.filter((todo) => todo._id !== id));
                } else {
                    setError("Failed to delete todo item");
                }
            })
            .catch(() => setError("Failed to delete todo item"));
    };

    return (
        <>
            <div className="row p-3 bg-success text-light">
                <h1>My ToDo</h1>
            </div>
            <div>
                <h3>Add Items</h3>
                {message && <p className="text-success">Item Added Successfully</p>}
                <div className="form-group d-flex gap-2">
                    <input placeholder="title" onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" value={title} />
                    <input placeholder="description" onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" value={description} />
                    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>
            <div className="row mt-3">
                <h3>Tasks</h3>
                <ul className="list-group">
                    {todos.map((item) => (
                        <li key={item._id} className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                            <div className="d-flex flex-column me-2">
                                {editId === -1 || editId !== item._id ? (
                                    <>
                                        <span className="fw-bold">{item.title}</span>
                                        <span className="fw-bold">{item.description}</span>
                                    </>
                                ) : (
                                    <div className="form-group d-flex gap-2">
                                        <input placeholder="title" onChange={(e) => setEditTitle(e.target.value)} className="form-control" type="text" value={edittitle} />
                                        <input placeholder="description" onChange={(e) => setEditDescription(e.target.value)} className="form-control" type="text" value={editdescription} />
                                    </div>
                                )}
                            </div>
                            <div className="d-flex gap-2">
                                {editId === -1 || editId !== item._id ? (
                                    <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                ) : (
                                    <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
                                )}
                                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
