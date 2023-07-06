const Teachers = require('../models/teachers');
const Marks = require('../models/marks');
const moment = require('moment');

// Calcular la nota media de los alumnos de una asignatura concreta.
function getAverageMarkBySubject(subjectName) {
  Marks.aggregate([
    { $match: { subject_name: subjectName } },
    { $group: { _id: null, average: { $avg: '$mark' } } }
  ]).then((result) => {
      if (result.length > 0) {
        const average = result[0].average;
        console.log(`La nota media de la asignatura ${subjectName} es: ${average}`);
      } else {
        console.log(`No se encontraron alumnos en la asignatura ${subjectName}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Calcular el número total de alumnos que hay en el bootcamp incluyendo repetidos.
function getCountStudentsRepeated() {
  Marks.countDocuments({}, (error, count) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`El número total de alumnos, incluyendo repetidos, es: ${count}`);
    }
  });
}


// Listar el nombre y los apellidos de todos los alumnos incluyendo repetidos.
function getAllStudentsRepeated() {
  Marks.aggregate([
    {
      $project: {
        _id: 0,
        student_first_name: 1,
        student_last_name: 1
      }
    }
  ]).then((marks) => {
    marks.forEach((mark) => {
      console.log(`${mark.student_first_name} ${mark.student_last_name}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
}

// Listar el nombre y los apellidos de todos los profesores incluyendo repetidos.
function getAllTeachersRepeated() {
  Teachers.aggregate([
    {
      $project: {
        _id: 0,
        teacher_first_name: 1,
        teacher_last_name: 1
      }
    }
  ]).then((teachers) => {
      teachers.forEach((teacher) => {
        console.log(`Nombre y appelidos: ${teacher.teacher_first_name} ${teacher.teacher_last_name}`);
      });
    }).catch((error) => {
      console.error(error);
    });
}

// Mostrar el número total de alumnos por grupo ordenados por grupo en orden inverso al alfabeto.
function getTotalStudentsByGroup() {
  Marks.aggregate([
    {
      $group: {
        _id: '$group_name',
        totalStudents: { $sum: 1 }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]).then((result) => {
    console.log(result);
      result.forEach((group) => {
        console.log(`Group Name: ${group._id} Total: ${group.totalStudents}`);
      });
    }).catch((error) => {
      console.error(error);
    });
}

// Obtén el top 5 de los nombres de las asignaturas cuya nota media sea mayor que 5.
function getTop5SubjectAvgMoreThan5() {
  Marks.aggregate([
    {
      $group: {
        _id: '$subject_name',
        averageMark: { $avg: '$mark' }
      }
    },
    {
      $match: {
        averageMark: { $gt: 5 }
      }
    },
    {
      $sort: {
        averageMark: -1
      }
    },
    {
      $limit: 5
    }
  ]).then((result) => {
      result.forEach((subject) => {
        console.log(`Subject Name: ${subject._id} Average Mark: ${subject.averageMark}`);
      });
    }).catch((error) => {
      console.error(error);
    });
}

// Calcular el numero de profesores que hay por cada asignatura incluyendo repetidos.
function getAllTeachersBySubject() {
  Marks.aggregate([
    {
      $unwind: '$teachers'
    },
    {
      $group: {
        _id: '$subject_name',
        totalTeachers: { $sum: 1 }
      }
    }
  ]).then((result) => {
      result.forEach((subject) => {
        console.log(`Subject: ${subject._id} Total Teachers: ${subject.totalTeachers}`);
      });
    }).catch((error) => {
      console.error(error);
    });
}

// ------------------------------- RETO 2 -------------------------------

// Obtén el nombre, apellido y la nota de los alumnos que tengan una nota mayor de 8 o la nota tenga fecha del año pasado o anterior.
function getAllStudentsMarkMoreThan8LastYear() {
  const currentYear = moment().year();
  const previousYear = currentYear - 1;

  const fromDate = moment(`${previousYear}-01-01`).startOf('year').toDate();
  const toDate = moment(`${previousYear}-12-31`).endOf('year').toDate();

  Marks.find({
    date: {
      $gte: fromDate,
      $lte: toDate
    },
    mark: { $gt: 8 }
  }, 'student_first_name student_last_name').then((marks) => {
      marks.forEach((mark) => {
        console.log(`Nombre y apellidos: ${mark.student_first_name} ${mark.student_last_name}`);
      });
    }).catch((error) => {
      console.error(error);
    });
}

// Obtén la media de las notas que se han dado en el último año por asignatura.
function getAvgMarksBySubjectLastYear() {
  const currentDate = new Date();
  const lastYearStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const lastYearEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  Marks.aggregate([
    {
      $match: {
        date: {
          $gte: lastYearStartDate,
          $lte: lastYearEndDate,
        },
      },
    },
    {
      $group: {
        _id: "$subject_name",
        averageMark: { $avg: "$mark" },
      },
    },
  ]).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.error(error);
    });
}

// Obtén la media aritmética de las notas que se han dado en el último año por nombre de alumno.
function getAvgMarksByStudentLastYear() {
  const currentDate = new Date();
  const lastYearStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const lastYearEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  Marks.aggregate([
    {
      $match: {
        date: {
          $gte: lastYearStartDate,
          $lte: lastYearEndDate,
        },
      },
    },
    {
      $group: {
        _id: {
          student_name: "$student_first_name",
          student_last_name: "$student_last_name",
        },
        averageMark: { $avg: "$mark" },
      },
    },
  ]).then((result) => {
      result.forEach((item) => {
        console.log(`Nombre y apellidos: ${item._id.student_name}  ${item._id.student_last_name} Average Mark: ${item.averageMark}`);
      });
    }).catch((error) => {
      console.error(error);
    });
}

// Obtén los nombres de los alumnos y la cantidad total de asignaturas por alumno cuyo profesor sea uno que elijáis.
function getAllStudentsTotalSubjectsByTeacher(teacherFirstName, teacherLastName) {
  Marks.aggregate([
    {
      $lookup: {
        from: "teachers",
        localField: "teachers",
        foreignField: "_id",
        as: "teachersData"
      }
    },
    {
      $match: {
        "teachersData.teacher_first_name": teacherFirstName,
        "teachersData.teacher_last_name": teacherLastName
      }
    },
    {
      $group: {
        _id: {
          student_name: "$student_first_name",
          student_last_name: "$student_last_name"
        },
        totalSubjects: { $sum: 1 }
      }
    }
  ]).then((result) => {
      result.forEach((data) => {
        console.log("Student Name:", data._id.student_name);
        console.log("Student Last Name:", data._id.student_last_name);
        console.log("Total Subjects:", data.totalSubjects);
        console.log("---");
      });
    }).catch((error) => {
      console.error(error);
    });
}


module.exports = {
  getAverageMarkBySubject,
  getCountStudentsRepeated,
  getAllStudentsRepeated,
  getAllTeachersRepeated,
  getTotalStudentsByGroup,
  getTop5SubjectAvgMoreThan5,
  getAllTeachersBySubject,
  getAllStudentsMarkMoreThan8LastYear,
  getAvgMarksBySubjectLastYear,
  getAvgMarksByStudentLastYear,
  getAllStudentsTotalSubjectsByTeacher
}
