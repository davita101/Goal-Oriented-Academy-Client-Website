import express from 'express';
import { getStudentById, getLeaderAllStudentById, updateStudent } from '../controllers/students.controller.js';
import { canLeaderDeleteStudentMiddleware, canLeaderEditStudentMiddleware, canViewLeaderStudentsMiddleware } from '../middleware/studentMiddleware.js';
import { createStudent, deleteStudent, getAllStudent } from '../controllers/students.controller.js';

const router = express.Router();
// ! all leader student
router.get('/all-students/:leaderId',canViewLeaderStudentsMiddleware, getLeaderAllStudentById);

// ! one student
router.get('/:leaderId/:studentId',canViewLeaderStudentsMiddleware, getStudentById);

// ! studnets for github Controller minleaderContrtoller
router.put('/:leaderId/:studentId', canLeaderEditStudentMiddleware, updateStudent)

// ! create student
router.post('/create-student', canLeaderDeleteStudentMiddleware, createStudent);

// ! delete student
router.delete('/delete-student/:studentId', canLeaderDeleteStudentMiddleware, deleteStudent);

// ! All students
router.get("/all-students", canViewLeaderStudentsMiddleware, getAllStudent);

export default router;