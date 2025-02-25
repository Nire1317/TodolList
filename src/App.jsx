import { useState } from 'react';
import './shared/style.css';

const App = () => {
    const [value, setValue] = useState("");
    const [editValue, setEditValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [data, setData] = useState([
        { id: 1, task: 1, title: 'Fix the Error in the capstone' },
        { id: 2, task: 2, title: 'Finish the activity 6' },
        { id: 3, task: 3, title: 'Review the chapter 5/6 for quiz tomorrow' },
        { id: 4, task: 4, title: 'Create a simple test' },
        { id: 5, task: 5, title: 'Review the chapter 5/6 for quiz tomorrow' },
        { id: 6, task: 6, title: 'Review the chapter 5/6 for quiz tomorrow' },
        { id: 7, task: 7, title: 'Review the chapter 5/6 for quiz tomorrow' },
        { id: 8, task: 8, title: 'Review the chapter 5/6 for quiz tomorrow' },
       
    ]);

    const newTask = () => {
        const newUser = {
            id: data.length + 1,
            task: data.length + 1,
            title: value
        };

        setData([newUser, ...data]); // Correct way to update state in React
        setValue(""); // Clear the input field
    };

    const deleteTask = (id) => {
        const updatedTasks = data.filter(item => item.id !== id); // Remove item
        setData(updatedTasks); // ✅ Correctly update state
        console.log(`The task with ID ${id} has been deleted`);
    };

    const handleEdit = (id) => {
        const taskToEdit = data.find(item => item.id === id);
        setEditValue(taskToEdit.title);
        setIsEditing(true);
        setEditId(id);
    };

    const saveEdit = () => {
        const updatedTasks = data.map(item => {
            if (item.id === editId) {
                return { ...item, title: editValue };
            }
            return item;
        });
        setData(updatedTasks);
        setIsEditing(false);
        setEditId(null);
        setEditValue("");
    };

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
                <button onClick={newTask} className="add-btn">Add task</button>
            </div>

            {isEditing && (
                <div style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "center", marginTop: 20 }}>
                    <input
                        type="text"
                        onChange={(e) => setEditValue(e.target.value)}
                        value={editValue}
                        placeholder="Edit task title"
                        className="input-bar"
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
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{item.title}</td>
                                <td style ={{display:"flex",gap:10}}>
                                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                                    <button onClick={() => deleteTask(item.id)} style={{ marginLeft: "5px" }}>
                                        Delete
                                    </button>
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


