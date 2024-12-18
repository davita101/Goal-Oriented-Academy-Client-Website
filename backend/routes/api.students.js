import express from 'express';
import { getStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/students.controller.js';

const router = express.Router();

// ! one student
router.get('/:studentId', getStudentById);
// ! create student
router.post('/create-student', createStudent);
// ! update student
router.put('/:studentId', updateStudent);
// ! delete student
router.delete('/:studentId', deleteStudent);

export default router;