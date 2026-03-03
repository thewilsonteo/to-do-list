import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { Task } from './components/Task';

interface Task {
  id: string;
  description: string,
  done: boolean
}

function App() {
  
  // idk what's this paragraph
  const [list, setList] = useState<Task[]>(() => {
    const storedList = localStorage.getItem("toDoList");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [listTask, setListTask] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(list))
  }, [list]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListTask(e.target.value)
  }

  const addTask = () => {
    const task = {
      id: uuidv4(),
      description: listTask,
      done: false,
    }
    setList((prevList) => [...prevList, task]);
    setListTask("");
  }

  const checkTask = (id: string) => {
    setList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  const removeTask = (id: string) => {
    setList((prevList) => prevList.filter((task) => task.id !== id));
  }

  return (
    <div>
      <div>
        <h1>To Do List App</h1>
      </div>
      <div>
        <input
          value={listTask}
          onChange={handleChange}
          placeholder="Add task"
        />
        <button
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div>
        {list
          .slice()
          .map((task) => (
            <Task
              key={task.id}
              done={task.done}
              description={task.description}
              handleDelete={() => removeTask(task.id)}
              handleChange={() => checkTask(task.id)}
            />
          ))}
      </div>
    </div>
  )
}

export default App
