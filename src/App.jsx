import { useState, useEffect } from 'react';
import axios from 'axios';
import './shared/style.css';

const API_URL = "https://jsonplaceholder.typicode.com/todos"; // ✅ Base URL for API

const App = () => {
    const [value, setValue] = useState("");
    const [editValue, setEditValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [data, setData] = useState([]);

    // ✅ Fetch data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);  // ✅ Axios GET request
                const formattedData = response.data.map(user => ({
                    id: user.id,
                    title: user.title  // ✅ Use 'name' as 'title'
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // ✅ Add a new task
    const newTask = async () => {
        if (!value.trim()) return; // Prevent empty input

        const newUser = { id: data.length + 1, title: value };

        try {
            await axios.post(API_URL, newUser); // ✅ Simulate API call
            setData([newUser, ...data]); // ✅ Update state locally
            setValue(""); 
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // ✅ Delete a task
    const deleteTask = async (id, title) => {
        try {
            await axios.delete(`${API_URL}/${id}`); // ✅ DELETE request
            setData(data.filter(item => item.id !== id)); // ✅ Update UI
            window.alert(`The task is deleted with a title of ${title},Deleted task with ID: ${id}`);

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // ✅ Handle edit
    const handleEdit = (id) => {
        const taskToEdit = data.find(item => item.id === id);
        if (!taskToEdit) return;
        setEditValue(taskToEdit.title);
        setIsEditing(true);
        setEditId(id);
    };

    // ✅ Save edited task
    const saveEdit = async () => {
        if (!editValue.trim()) return; 

        const updatedTask = { id: editId, title: editValue };

        try {
            await axios.put(`${API_URL}/${editId}`, updatedTask); // ✅ PUT request
            setData(data.map(item => item.id === editId ? { ...item, title: editValue } : item));
            setIsEditing(false);
            setEditId(null);
            setEditValue("");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // ✅ Cancel editing
    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setEditValue("");
    };

    return (
        <div className="container">
            <div style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "center" }}>
                <input
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder="Add new task here"
                    className="input-bar"
                />
                <button onClick={newTask} className="add-btn">Add Task</button>
            </div>

            {isEditing && (
                <div style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "center", marginTop: 20 }}>
                    <input
                        type="text"
                        onChange={(e) => setEditValue(e.target.value)}
                        value={editValue}
                        placeholder="Edit task title"
                        className="input-bar"
                        required
                    />
                    <button onClick={saveEdit} className="add-btn">Save</button>
                    <button onClick={cancelEdit} className="add-btn">Cancel</button>
                </div>
            )}

            <div>
                <h2>My Todo List</h2>
                <table border="1" style={{ width: "100%", textAlign: "left" }}>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td><input type="checkbox" /></td>
                                <td>{item.title}</td>  {/* ✅ Correctly displaying title */}
                                <td style={{ display: "flex", gap: 10 }}>
                                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                                    <button onClick={() => deleteTask(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
