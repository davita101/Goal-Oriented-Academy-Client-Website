import express from 'express';
import { getStudentById, getLeaderAllStudentById, updateStudent } from '../controllers/students.controller.js';
import { canLeaderDeleteStudentMiddleware, canLeaderEditStudentMiddleware, canViewLeaderStudentsMiddleware } from '../middleware/studentMiddleware.js';
import { createStudent, deleteStudent, getAllStudent } from '../controllers/students.controller.js';

const router = express.Router();
// ! all student

router.get('/', getLeaderAllStudentById);
// ! one student

router.get('/:leaderId/:studentId',canViewLeaderStudentsMiddleware, getStudentById);
// ! update student

router.put('/:leaderId/:studentId', canLeaderEditStudentMiddleware, updateStudent)
// ! studnets for github Controller

// ! create student
router.post('/create-student', canLeaderDeleteStudentMiddleware, createStudent);

// ! delete student
router.delete('/delete-student/:studentId', canLeaderDeleteStudentMiddleware, deleteStudent);

// ! All students
router.get("/all-students", canViewLeaderStudentsMiddleware, getAllStudent);

export default router;