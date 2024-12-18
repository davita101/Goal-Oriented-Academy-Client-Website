import express from 'express';
import { getGroups, getStudentGroups, deleteGroup } from '../controllers/groups.controller.js';

const router = express.Router();

// ! all groups
router.get('/', getGroups);
// ! one group
router.get('/:groupId', getStudentGroups);
// ! delete group
router.delete('/:groupId', deleteGroup);

export default router;