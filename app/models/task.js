import mongoose, { models, Schema } from "mongoose";

const taskSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
});

const Task = models.Task || mongoose.model("Task", taskSchema);
export default Task;
