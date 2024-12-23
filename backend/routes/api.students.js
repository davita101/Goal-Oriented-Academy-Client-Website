import express from 'express';
import { getStudentById, getLeaderAllStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/students.controller.js';
import { canLeaderEditStudentMiddleware } from '../middleware/studentMiddleware.js';
const router = express.Router();
// ! all student
router.get('/', getLeaderAllStudentById);
// ! one student
router.get('/:studentId', getStudentById);
// ! update student
router.put('/:studentId', canLeaderEditStudentMiddleware, updateStudent);

// ! create student
router.post('/create-student', createStudent);

// ! delete student
router.delete('/:studentId', deleteStudent);

export default router;