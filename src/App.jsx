import { useState } from 'react'
import './shared/style.css';


const App = () => {
  // const [count, setCount] = useState(0);
    const [value, setValue] = useState("");
    const [data, setData] = useState([
      {id: 1, task: 1, title :'Fix the Error in the capstone'},
      {id: 2, task: 2, title :'Finish the activity 6'},
      {id: 3, task: 3, title :'Review the chapter 5/6 fo quiz tommorow'}
    ]);


    //PUSH
    //SPREAD OPERATOR

const newTask = () => {
  const newUser = {
    id: data.length + 1,
    task: data.length + 1,
    title: value
  };

  setData([ newUser, ...data]); // Correct way to update state in React
};

  return (
    <div className="container">  
    
        <div style={{display:"flex",flexDirection:"row",gap:10,justifyContent:"center"}} >
          <input type="text" onChange={(e)=> setValue(e.target.value)} 
          placeholder="Add new task here" className="input-bar"></input>
          <button onClick={()=> newTask() } className="add-btn">Add task</button>
          </div>

        <div >
              <h2>My Todo List V1</h2>
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
                      <td>
                        <button onClick={() => handleEdit(item.id)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "5px" }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>

    </div> 
  )
}

export default App;


