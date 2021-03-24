import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const duplicity = tasks.find(task => task.title === newTaskTitle);
    if(!duplicity && !!newTaskTitle) {
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      const newTask = {id: rand, title: newTaskTitle, isComplete: false};
      setTasks([...tasks, newTask])
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskExists = tasks.find(task => task.id === id);
    if(!!taskExists){
      const tasksModified = Object.assign(taskExists,  { isComplete: !taskExists.isComplete });
      const newTasks = tasks.map(task => {
        if(task.id === id){
          return Object.assign(task, tasksModified)
        }
        return task;
      })
      console.log(newTasks);
      setTasks(newTasks);
    }
  }

  function handleRemoveTask(id: number) {
    const taskExists = tasks.find(task => task.id === id);
    if(!!taskExists) {
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}