const mongoose = require("mongoose");

const insertData = require('./functions/loadData');
const {
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
} = require('./functions/testFunctions');

mongoose.connect('mongodb://localhost:27017/marksTeachers',
                {useNewUrlParser: true,
                useUnifiedTopology: true})
.then((db) => {
  console.log("database connected on " + db.connection.host);
  // DESCOMENTAR LAS FUNCIONES QUE SE QUIERAN PROBAR
  // insertData();
  // getAverageMarkBySubject('mates');
  // getCountStudentsRepeated();
  // getAllStudentsRepeated();
  // getAllTeachersRepeated();
  // getTotalStudentsByGroup();
  // getTop5SubjectAvgMoreThan5();
  // getAllTeachersBySubject();
  // getAllStudentsMarkMoreThan8LastYear();
  // getAvgMarksBySubjectLastYear();
  // getAvgMarksByStudentLastYear();
  // getAllStudentsTotalSubjectsByTeacher('teacher', 'one');
}).catch((error) => {
  console.log(error);
});
