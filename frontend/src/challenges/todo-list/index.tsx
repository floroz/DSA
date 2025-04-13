// https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/todo-list

import { FormEvent, useState } from "react";

type Task = {
    id: string;
    title: string;
}

export function TodoList(){
    const [tasks, setTasks] = useState<Task[]>([])
    const [title, setTitle] = useState<string>("");

    function addTask():void{
        if (!title.trim()) {
            return;
        }

        const task: Task = {
            id: Math.random().toString().substring(0,4), // in real world we would use a library or let the BE handle the ID generation
            title
        }
        setTasks(t => [...t, task])
        setTitle("")
    }

    function removeTask(id: string): void{
        setTasks(prevTasks => prevTasks.filter(t => t.id !== id))
        
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        addTask()
    }

    const isButtonDisabled = !title.trim()

    return (
        <div>
          <h1>Todo List</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="task-input">Title</label>
            <input
              id="task-input"
              type="text"
              placeholder="Add your task"
              onChange={v => setTitle(v.target.value)}
              value={title}
            />
            <div>
              <button type="submit" disabled={isButtonDisabled}>Submit</button>
            </div>
          </form>
          {tasks.length === 0 ? (
            <div>No tasks yet</div>
          ) : (
            <ul>
            {tasks.map(task => (
                <li key={task.id}>
                <p>{task.title}</p>
                <button onClick={() => removeTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
          )}
        </div>
      );
}
