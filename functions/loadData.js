const mongoose = require("mongoose");
const Teachers = require('../models/teachers');
const Marks = require('../models/marks')

// Función para insertar datos
// Se ha utilizado async / await para asegurar que los datos que tienen dependencia de otros están
async function insertData() {
  try {
    const teachers = [
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "one"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "two"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "three"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "four"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "five"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "six"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "seven"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "eight"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "nine"}),
      new Teachers({teacher_first_name: "teacher", teacher_last_name: "ten"}),
    ];

    for (const t of teachers) {
      await t.save();
    }

    const marks = [
      new Marks({date: "2023-01-01", mark: 4, student_first_name: "student", student_last_name: "one", group_name: "morning", subject_name: "mates", teachers: [teachers[0], teachers[1]]}),
      new Marks({date: "2023-02-01", mark: 5, student_first_name: "student", student_last_name: "two", group_name: "morning", subject_name: "historia", teachers: [teachers[2], teachers[3]]}),
      new Marks({date: "2022-03-01", mark: 8, student_first_name: "student", student_last_name: "three", group_name: "afternoon", subject_name: "mates", teachers: [teachers[0], teachers[1]]}),
      new Marks({date: "2023-04-01", mark: 7, student_first_name: "student", student_last_name: "four", group_name: "morning", subject_name: "historia", teachers: [teachers[2], teachers[3]]}),
      new Marks({date: "2023-05-01", mark: 3, student_first_name: "student", student_last_name: "five", group_name: "morning", subject_name: "filosofia", teachers: [teachers[4], teachers[5]]}),
      new Marks({date: "2023-06-01", mark: 5, student_first_name: "student", student_last_name: "six", group_name: "afternoon", subject_name: "filosofia", teachers: [teachers[4], teachers[5]]}),
      new Marks({date: "2023-07-01", mark: 2, student_first_name: "student", student_last_name: "seven", group_name: "morning", subject_name: "mates", teachers: [teachers[0], teachers[1]]}),
      new Marks({date: "2022-08-01", mark: 9, student_first_name: "student", student_last_name: "eight", group_name: "afternoon", subject_name: "mates", teachers: [teachers[0], teachers[1]]}),
      new Marks({date: "2023-09-01", mark: 6, student_first_name: "student", student_last_name: "nine", group_name: "morning", subject_name: "mates", teachers: [teachers[0], teachers[1]]}),
      new Marks({date: "2023-10-01", mark: 7, student_first_name: "student", student_last_name: "ten", group_name: "morning", subject_name: "mates", teachers: [teachers[0], teachers[1]]}),
    ];

    for (const m of marks) {
      await m.save();
    }

    console.log('Registros insertados correctamente');
    mongoose.disconnect(); // Cerrar la conexión a la base de datos
  } catch (error) {
    console.error('Error al insertar los registros', error);
    mongoose.disconnect(); // Cerrar la conexión a la base de datos en caso de error
  }
}

module.exports = insertData;
