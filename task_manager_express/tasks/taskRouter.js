import express from 'express'
import { deleteTask, saveTask, tasksList, updateTaskPosition } from './taskController.js';

const taskRouter = express.Router();

taskRouter.get('/tasks', tasksList);
taskRouter.post('/task', saveTask);
taskRouter.post('/task/:id', saveTask);
taskRouter.delete('/task/:id', deleteTask);
taskRouter.post('/task/:id/move', updateTaskPosition);

export default taskRouter;