const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  department: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Theory', 'Lab', 'Elective'], default: 'Theory' },
  credits: { type: Number, required: true },
  instructor: { type: String, required: true },
  schedule: { type: String, required: true },
  capacity: { type: Number, required: true },
  seatsLeft: { type: Number, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);