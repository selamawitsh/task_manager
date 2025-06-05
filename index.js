import express from 'express';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// // Routes
// app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('<h1> API is running</h1>');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
