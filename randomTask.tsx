"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function RandomTaskPicker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
      setNewTask('')
    }
  }

  const pickRandomTask = () => {
    const incompleteTasks = tasks.filter(task => !task.completed)
    if (incompleteTasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * incompleteTasks.length)
      setSelectedTask(incompleteTasks[randomIndex])
    } else {
      setSelectedTask(null)
    }
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
    if (selectedTask?.id === id) {
      setSelectedTask(null)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Random Task Picker</h1>
      
      <form onSubmit={addTask} className="mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-grow"
          />
          <Button type="submit">Add Task</Button>
        </div>
      </form>

      <Button onClick={pickRandomTask} className="w-full mb-6">Pick Random Task</Button>

      {selectedTask && (
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Selected Task:</h2>
          <p>{selectedTask.text}</p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-2">All Tasks:</h2>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center space-x-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
