import { GroupModel } from '../models/user.models.js';

export const groupMiddleware = async (req, res, next) => {
  try {
    const group = await GroupModel.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    req.group = group; // Attach the group to the request object
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error fetching group' });
  }
};