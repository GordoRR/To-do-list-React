import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
let id = 0;


function App() {
  const [taskList, setTaskList] = useState([]);

  function getTaskList(taskList) {
    return taskList.filter((task) => task.taskCompleted != true).map(task => (
      <div key={task.taskID} className='Task'>
        <div>{task.taskName}</div>
        <div><input type="checkbox"></input></div>
        <div>{task.taskDeadline}</div>
      </div>
    ));
  }

  function getCurrentDate(space="-"){
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();
    return `${year}${space}${month<10?`0${month}`:`${month}`}${space}${date}`
  }

  function TaskForm() {
    const [taskName, setTaskName] = useState("");
    //const [taskPriority, setTaskPriority] = useState("")
    let [taskDeadline, setTaskDeadline] = useState()


    const handleAddTask = () => {
      if(taskDeadline == getCurrentDate()){
        taskDeadline = "Today"
      }
      const newTask = {
        taskID: ++id,
        taskName: taskName,
        taskPriority: 1,
        taskCompleted: false,
        taskDeadline: taskDeadline
      };
      setTaskList([...taskList, newTask]);

    };

    return (
      <div>
        <input
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />

        <input
          value={taskDeadline}
          type="date"
          onChange={e => setTaskDeadline(e.target.value)}
        />
        <button onClick={handleAddTask}>ADD</button>
      </div>
    );
  }




  return (
    <div className="App">
      <h1>TO-DO LIST</h1>
      <TaskForm />
      {getTaskList(taskList)}
    </div>
  );
}

export default App;
