const mongoose = require ("mongoose");

const teachers = new mongoose.Schema({
  teacher_first_name: String,
  teacher_last_name: String
});

const Teachers = mongoose.model('Teachers', teachers);

module.exports = Teachers;
