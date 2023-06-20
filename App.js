import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
let id=0;

function App() {
  const [taskList, setTaskList] = useState([
  ]);

  function getTaskList(taskList) {
    return taskList.map(task => {
      taskList.taskCompleted === true ? 
       (
        <div key={task.taskID} className='Task'>
          <div>{task.taskName}</div>
          <div><input type="checkbox"></input></div>
          <div>{task.taskDeadline}</div>
        </div>
      );
    });
  }

  function TaskForm() {
    const [taskName, setTaskName] = useState(" ");
    const [taskPriority, setTaskPriority] = useState(" ")

    const handleAddTask = () => {
      const newTask = {
        taskID: id++,
        taskName: taskName,
        taskPriority: 1,
        taskCompleted: false,
        taskDeadline: "2023-06-20"
      };
      
      setTaskList([...taskList, newTask]);

    };

    return (
      <div>
        <input
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
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
