import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: {
    type: String,
    required: true, // Clerk's userId
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


export const ToDoModel = mongoose.models.ToDo || mongoose.model("ToDo", todoSchema);
