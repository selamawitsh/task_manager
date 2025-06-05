import { v4 as uuidv4 } from 'uuid';
import { loadTasks, saveTasks } from '../utils/fileHandler.js';

export const getTasks = (req, res) => {
  let tasks = loadTasks();
  const { status } = req.query;

  if (status === 'completed') {
    tasks = tasks.filter(task => task.completed);
  } else if (status === 'pending') {
    tasks = tasks.filter(task => !task.completed);
  }

  res.json(tasks);
};

export const createTask = (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const tasks = loadTasks();
  const newTask = {
    id: uuidv4(),
    title,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(task => task.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = true;
  saveTasks(tasks);
  res.json(task);
};

export const deleteTask = (req, res) => {
  let tasks = loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  res.status(204).send();
};
