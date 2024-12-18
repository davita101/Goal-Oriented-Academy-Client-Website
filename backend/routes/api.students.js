import express from 'express';
import { getStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/students.controller.js';

const router = express.Router();

// ! one student
router.get('/:groupId/student/:studentId', getStudentById);
// ! create student
router.post('/:groupId/student/create-student', createStudent);
// ! update student
router.put('/:groupId/student/:studentId', updateStudent);
// ! delete student
router.delete('/:groupId/student/:studentId', deleteStudent);

export default router;