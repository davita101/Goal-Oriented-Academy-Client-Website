import express from 'express';
import {
  getAllLeaders,
  deleteLeaderById,
  getLeaderById,
  updateLeaderById,
} from '../controllers/leaders.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { canDelete, canLeaderEditMiddleware, canViewLeaderMiddleware } from '../middleware/leaderMiddleware.js';

const router = express.Router();
// Apply authentication middleware to all routes

// ! All leaders
router.get('/', canViewLeaderMiddleware, getAllLeaders);
// ! Get leader by ID
router.get('/:leaderId', canViewLeaderMiddleware, getLeaderById);
// ! Update leader by ID
router.put('/:leaderId', canLeaderEditMiddleware, updateLeaderById);
// ! Delete leader by ID
router.delete('/:leaderId', canDelete, deleteLeaderById);

export default router;
