import { Task } from '../models/Task.js';
import { getWeekEnd, getWeekStart, weekKeyFromDate } from '../utils/week.js';

function withWeekMeta(task) {
  const obj = task.toObject ? task.toObject() : task;
  return {
    ...obj,
    weekKey: weekKeyFromDate(obj.dateTime),
  };
}

export async function getWeekSummaries(req, res, next) {
  try {
    const tasks = await Task.find().sort({ dateTime: 1 }).lean();
    const map = new Map();

    for (const task of tasks) {
      const key = weekKeyFromDate(task.dateTime);
      if (!map.has(key)) {
        const start = getWeekStart(task.dateTime);
        map.set(key, {
          weekKey: key,
          weekStart: start,
          weekEnd: getWeekEnd(start),
          openCount: 0,
          completedCount: 0,
          tasks: [],
        });
      }
      const bucket = map.get(key);
      bucket.tasks.push(task);
      if (task.status === 'Completed') {
        bucket.completedCount += 1;
      } else {
        bucket.openCount += 1;
      }
    }

    const weeks = [...map.values()].sort(
      (a, b) => new Date(b.weekStart) - new Date(a.weekStart)
    );

    res.json({ weeks });
  } catch (err) {
    next(err);
  }
}

export async function getTasks(req, res, next) {
  try {
    const { q, weekKey, status } = req.query;
    const filter = {};

    if (weekKey) {
      const start = new Date(weekKey);
      if (Number.isNaN(start.getTime())) {
        return res.status(400).json({ message: 'Invalid weekKey' });
      }
      filter.weekStart = start;
    }

    if (status) {
      filter.status = status;
    }

    if (q && q.trim()) {
      filter.$text = { $search: q.trim() };
    }

    const tasks = await Task.find(filter).sort({ dateTime: 1 });
    res.json({ tasks: tasks.map(withWeekMeta) });
  } catch (err) {
    next(err);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ task: withWeekMeta(task) });
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description, dateTime, priority, status } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!dateTime) {
      return res.status(400).json({ message: 'Date and time are required' });
    }

    const parsedDate = new Date(dateTime);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date and time' });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() ?? '',
      dateTime: parsedDate,
      priority: priority ?? '',
      status: status ?? 'In Progress',
      weekStart: getWeekStart(parsedDate),
    });

    res.status(201).json({ task: withWeekMeta(task) });
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, dateTime, priority, status } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (dateTime !== undefined) {
      const parsedDate = new Date(dateTime);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date and time' });
      }
      task.dateTime = parsedDate;
      task.weekStart = getWeekStart(parsedDate);
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (status !== undefined) {
      task.status = status;
    }

    await task.save();
    res.json({ task: withWeekMeta(task) });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
}
