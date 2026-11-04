import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getWeekSummaries,
  updateTask,
} from '../controllers/taskController.js';

const router = Router();

router.get('/weeks', getWeekSummaries);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
