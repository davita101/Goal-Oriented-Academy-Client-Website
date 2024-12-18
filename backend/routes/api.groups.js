import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getStudents } from '../controllers/groups.controller.js';

const router = express.Router();

router.get('/students', authMiddleware, getStudents);
// router.get('/students/:id', authMiddleware, getStudentById);
// router.post('/students', authMiddleware, createStudent);
// router.put('/students/:id', authMiddleware, updateStudent);
// router.delete('/students/:id', authMiddleware, deleteStudent);

// export default router;


export default router