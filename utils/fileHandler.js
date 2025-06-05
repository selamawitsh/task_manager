import fs from 'fs';

const FILE_PATH = './tasks.json';

export const loadTasks = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

export const saveTasks = (tasks) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};
