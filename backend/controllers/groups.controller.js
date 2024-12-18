import { GroupModel } from '../models/user.models.js'




export const getGroups = async (req, res) => {
  try {
      const students = await GroupModel.find()
      res.status(200).json(students)
  } catch (error) {
      res.status(500).json({ error: 'Error fetching students' })
  }
}
export const getStudentGroups = async (req, res) => {
  try {
    const group = await GroupModel.findById(req.params.groupId)
    if (!group) {
      return res.status(404).json({ error: 'Group not found' })
    }
    res.status(200).json(group)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' })
  }
}
export const deleteGroup = async (req, res) => {
  try {
    const group = await GroupModel.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Delete the group document
    await GroupModel.findByIdAndDelete(req.params.groupId);

    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Error deleting group' });
  }
}
