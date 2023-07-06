const mongoose = require ("mongoose");
const Teachers = require("./teachers");

const marks = new mongoose.Schema({
  date: Date,
  mark: Number,
  student_first_name: String,
  student_last_name: String,
  group_name: String,
  subject_name: String,
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teachers' }]
});

const Marks = mongoose.model('Marks', marks);

module.exports = Marks;
