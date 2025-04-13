// https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/todo-list

import { FormEvent, useState } from "react";

type Task = {
  id: string;
  title: string;
};

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");

  function addTask(): void {
    if (!title.trim()) {
      return;
    }

    const task: Task = {
      id: Math.random().toString().substring(0, 4), // in real world we would use a library or let the BE handle the ID generation
      title,
    };
    setTasks((t) => [...t, task]);
    setTitle("");
  }

  function removeTask(id: string): void {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    addTask();
  }

  const isButtonDisabled = !title.trim();

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>
      <form onSubmit={onSubmit} className="flex gap-2 mb-4">
        <label htmlFor="task-input" className="sr-only">Add new task</label>
        <input
          id="task-input"
          type="text"
          placeholder="Add your task"
          onChange={(v) => setTitle(v.target.value)}
          value={title}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No tasks yet</div>
      ) : (
        <ul className="list-none p-0 mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-2 border-b border-gray-200">
              <p className="flex-grow mr-2">{task.title}</p>
              <button
                onClick={() => removeTask(task.id)}
                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
