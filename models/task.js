// task.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String // Assuming projectId is a string in your schema
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
