import { StudentModel } from '../models/student.models.js'




export const getGroups = async (req, res) => {
  try {
    const groups = await StudentModel.aggregate([
      {
        $group: {
          _id: "$group",
          students: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          group: "$_id",
          students: 1
        }
      }
    ])
    res.status(200).json(groups)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' })
  }
}
export const getStudentGroups = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const groups = await StudentModel.aggregate([
      {
        $match: { group: groupId }
      },
      {
        $group: {
          _id: "$group",
          students: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          group: "$_id",
          students: 1
        }
      }
    ]);

    if (!groups || groups.length === 0) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json(groups[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching group' });
  }
}

export const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const result = await StudentModel.deleteMany({ group: groupId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting group' });
  }
}
