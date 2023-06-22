import React, { useState, useEffect } from 'react';
import './App.css';

let id = 0;


function App() {
  let actualTime = TimeCheck();
  const [taskList, setTaskList] = useState([]);


  function getTaskList(taskList) {
    return taskList.filter((task) => !task.taskCompleted).map(task => (
      <div key={task.taskID} className={`Task ${checkDeadlineTime(actualTime, task.taskDeadlineTime, task.taskDeadline) ? "afterDeadline" : ""}`} >
        <div>
          <input
            type="checkbox"
            onChange={() =>
              setTimeout(() => {
                deleteCompletedTasks(task.taskID);
              }, 200)
            }
            className='completed'
          />
        </div>
        <div className={`${checkTaskPriority(task.taskPriority) ? "priority" : ""} ${task.taskPriority}`}>{checkTaskPriority(task.taskPriority)}</div>
        <div className="TaskName">{task.taskName}</div>
        <div className='DateTime'>
          <div className="Date">{task.taskDeadline}</div>
          <div className="Time">{task.taskDeadlineTime}</div>
        </div>
      </div>

    ));

  }
  function checkDeadlineTime(actualTime, taskDeadlineTime, taskDeadline) {
    if (!taskDeadlineTime && !taskDeadline) return false;
    let deadlineHours, deadlineMinutes, deadlineDays, deadlineMonth, deadlineYear;
    const newDate = new Date();
    const actualDays = newDate.getDate();
    const actualMonth = newDate.getMonth() + 1;
    const actualYear = newDate.getFullYear();
    const actualHours = parseInt(actualTime.slice(0, 2));
    const actualMinutes = parseInt(actualTime.slice(3, 5));
    if (taskDeadline === "Today") {
      if (taskDeadlineTime) {
        deadlineHours = parseInt(taskDeadlineTime.slice(0, 2));
        deadlineMinutes = parseInt(taskDeadlineTime.slice(3, 5));
        if (((deadlineHours === actualHours && deadlineMinutes <= actualMinutes) || (deadlineHours < actualHours))) return true;
      }
      else return true;
    }
    else if (taskDeadline && !taskDeadlineTime) {
      deadlineDays = parseInt(taskDeadline.slice(8, 10));
      deadlineMonth = parseInt(taskDeadline.slice(5, 7));
      deadlineYear = parseInt(taskDeadline.slice(0, 4));
      if ((deadlineYear < actualYear) || (deadlineMonth < actualMonth && deadlineYear === actualYear) || (deadlineDays <= actualDays && deadlineMonth === actualMonth && deadlineYear === actualYear)) return true;
    }
    else if (taskDeadlineTime && !taskDeadline) {
      deadlineHours = parseInt(taskDeadlineTime.slice(0, 2));
      deadlineMinutes = parseInt(taskDeadlineTime.slice(3, 5));

      if (((deadlineHours === actualHours && deadlineMinutes <= actualMinutes) || (deadlineHours < actualHours))) return true;
    }
    else {
      deadlineDays = parseInt(taskDeadline.slice(8, 10));
      deadlineMonth = parseInt(taskDeadline.slice(5, 7));
      deadlineYear = parseInt(taskDeadline.slice(0, 4));
      deadlineHours = parseInt(taskDeadlineTime.slice(0, 2));
      deadlineMinutes = parseInt(taskDeadlineTime.slice(3, 5));
      if ((deadlineYear < actualYear) || (deadlineMonth < actualMonth && deadlineYear === actualYear) || (deadlineDays < actualDays && deadlineMonth === actualMonth && deadlineYear === actualYear) || (deadlineHours < actualHours && deadlineDays === actualDays && deadlineMonth === actualMonth && deadlineYear === actualYear) || (deadlineMinutes <= actualMinutes && deadlineHours === actualHours && deadlineDays === actualDays && deadlineMonth === actualMonth && deadlineYear === actualYear)) return true;


    }
    return false;
  }

  function getCurrentDate(space = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    /*
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();
    */
    return `${year}${space}${month < 10 ? `0${month}` : `${month}`}${space}${date}`
  }

  function deleteCompletedTasks(taskID) {
    setTaskList((taskList) =>
      taskList.map((task) => {
        if (task.taskID === taskID) {
          return {
            ...task,
            taskCompleted: true
          };
        }
        return task;
      })
    );
  }

  function TimeCheck() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().toTimeString());
      }, 60000);

      return () => clearInterval(interval);
    }, []);
    return time.toString();
  }

  function TaskForm() {
    const [taskName, setTaskName] = useState("");
    //const [taskPriority, setTaskPriority] = useState("")
    const [taskDeadline, setTaskDeadline] = useState()
    const [taskDeadlineTime, setTaskDeadlineTime] = useState()
    const [priority, setPriority] = useState();


    const AddTask = () => {
      if (taskName) {
        const isToday = (taskDeadline == getCurrentDate() || !taskDeadline && taskDeadlineTime);

        const newTask = {
          taskID: ++id,
          taskName: taskName,
          taskPriority: priority,
          taskCompleted: false,
          taskDeadline: isToday ? "Today" : taskDeadline,
          taskDeadlineTime: taskDeadlineTime
        };
        setTaskList([...taskList, newTask]);
        console.log(taskDeadline)
        console.log(taskDeadlineTime)
      }
      else {
        alert("The field is empty.")
      }

    };
    return (
      <div className="InputContainer">
        <select className="PriorityInput" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="">-</option>
          <option value="high">!!!</option>
          <option value="mid">!!</option>
          <option value="low">!</option>
        </select>
        <input
          className="TaskNameInput"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
        <input
          className="DeadlineTime"
          value={taskDeadlineTime}
          type="time"
          onChange={e => setTaskDeadlineTime(e.target.value)}
        />
        <input
          className="DeadlineDate"
          value={taskDeadline}
          type="date"
          min={getCurrentDate()}
          onChange={e => setTaskDeadline(e.target.value)}
        />
        <button className='AddTaskBtn' onClick={AddTask}  >ADD</button>
      </div>
    );
  }
  function checkTaskPriority(taskPriority) {
    switch (taskPriority) {
      case "high":
        return "HIGH"
      case "mid":
        return "MID"
      case "low":
        return "LOW"
      default:
        return ""
    }
  }


  return (
    <div className="App">
      <div className='TodoApp'>
        <h1>TO-DO LIST</h1>
        <TaskForm />
        {getTaskList(taskList)}
      </div>
    </div>
  );
}

export default App;
