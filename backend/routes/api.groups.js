import express from 'express';
import { getStudentById, getStudents, getStudentGroups, createStudent, updateStudent, deleteStudent } from '../controllers/groups.controller.js';

const router = express.Router();
// ! all groups
router.get('/', getStudents);
// ! one group
router.get('/group/:groupId', getStudentGroups);
// ! one student
router.get('/group/:groupId/student/:studentId', getStudentById);
// ! create student
router.post('/group/:groupId/students/create-student', createStudent);
// ! update student
router.put('/group/:groupId/students/:studentId', updateStudent);

// ! delete student
router.delete('/group/:groupId/students/:studentId', deleteStudent);


export default router