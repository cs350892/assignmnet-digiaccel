import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    dateTime: {
      type: Date,
      required: [true, 'Date and time are required'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', ''],
      default: '',
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed'],
      default: 'In Progress',
    },
    weekStart: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ title: 'text', description: 'text' });

export const Task = mongoose.model('Task', taskSchema);
