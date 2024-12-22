import mongoose from 'mongoose'
import { UserModel } from '../models/user.models.js'
import { StudentModel } from '../models/student.models.js'
import { canLeaderEdit, canViewLeader } from '../permission/leader.js'

export const getAllLeaders = async (req, res) => {

  try {
    // ! can only view leaders if user is an admin or a leaderController
    const leaders = await UserModel.find({ role: 'leader' })
    if (!canViewLeader(req.user, req.params.leaderId)) {
      return res.status(401).json({ error: 'Not authorized to view this leader' })
    }

    if (!leaders || leaders.length === 0) {
      return res.status(404).json({ error: 'Leaders not found' })
    }
    res.status(200).json(leaders)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaders' })
  }
}
export const updateLeaderById = async (req, res) => {
  const allowedUpdatesForLeader = ['avatar', 'leaderGithubUrl', 'leaderCodewarsUrl'];
  try {
    const updateData = { ...req.body };
    const userId = req.user.id;
    const userRole = req.user.role;
    const leaderId = req.params.leaderId;

    // Remove fields that should not be updated
    const fieldsToDelete = [
      '_id', 'lastLogin', 'isVerified', 'clientId', 'verificationToken',
      'verificationTokenExpiresAt', 'createdAt', 'updatedAt', '_v', 'role'
    ];
    fieldsToDelete.forEach(field => delete updateData[field]);

    // Check if the user is authorized to update the leader
    if (!canLeaderEdit(req.user, leaderId)) {
      return res.status(401).json({ error: 'Not authorized to update leader' });
    }

    // If the user is a leader, restrict updates to allowed fields
    if (userRole.includes('leader') && userRole.length === 1 && userId !== leaderId) {
      Object.keys(updateData).forEach(key => {
        if (!allowedUpdatesForLeader.includes(key)) {
          delete updateData[key];
        }
      });
    }

    // Ensure only admins can modify the role
    if (req.body.role && userRole !== 'admin') {
      return res.status(403).json({ error: 'Only admin can modify role' });
    }

    const leader = await UserModel.findByIdAndUpdate(
      leaderId,
      updateData,
      { new: true }
    );

    if (!leader) {
      return res.status(404).json({ error: 'Leader not found or no updates made' });
    }

    res.status(200).json(leader);
  } catch (error) {
    console.error('Error updating leader:', error);
    res.status(500).json({ error: 'Error updating leader' });
  }
};
export const leaderStudents = async (req, res) => {
  try {
    const students = await StudentModel.find({ leaderId: req.params.leaderId })
    if (!canViewLeader(req.user)) {
      return res.status(401).json({ error: 'Not authorized to view this leader' })
    }
    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'No students found for this leader' })
    }
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' })
  }
}

export const leaderOneStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ leaderId: req.params.leaderId, _id: req.params.studentId })
    if (!canViewLeader(req.user)) {
      return res.status(401).json({ error: 'Not authorized to view this leader' })
    }
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.status(200).json(student)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' })
  }
}

export const deleteLeaderStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOneAndDelete({ leaderId: req.params.leaderId, _id: req.params.studentId })
    if (req.user.role.includes("admin")) {
      return res.status(401).json({ error: 'Only admin can delete' })
    }
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.status(200).json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error deleting student:', error)
    res.status(500).json({ error: 'Error deleting student' })
  }
}

export const updateLeaderStudent = async (req, res) => {
  const { studentId, leaderId, updateData } = req.params;

  const allowedUpdatesForLeader = [
    'email', 'githubLink', 'role', 'parentFbLink', 'githubToken',
    'githubLastUpdate', 'comment.leaderComment', 'comment.leaderProof'
  ];
  console.log(studentId)

  if (!canLeaderEdit(req.user, leaderId)) {
    return res.status(401).json({ error: 'Not authorized to update leader' });
  }
  try {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }

    // Restrict updates to allowed fields
    Object.keys(updateData).forEach(key => {
      if (!allowedUpdatesForLeader.includes(key)) {
        delete updateData[key];
      }
    });

    // Update the student with the allowed fields
    Object.assign(student, updateData);
    await student.save();

    // Return the student data, filtering out payedInfo for non-admin users
    const studentData = student.toJSONForUser(req.user.role);

    return res.status(200).json(studentData);
  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(500).send('Server error');
  }
};
export const deleteLeader = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ leaderId: req.params.leaderId })
    if (req.user.role.includes("admin")) {
      return res.status(401).json({ error: 'Only admin can delete' })
    }
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.status(200).json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error deleting student:', error)
    res.status(500).json({ error: 'Error deleting student' })
  }
}

export const deleteLeaderById = async (req, res) => {
  try {
    const leader = await UserModel.findByIdAndDelete(req.params.leaderId)
    if (req.user.role.includes("admin")) {
      return res.status(401).json({ error: 'Only admin can delete' })
    }
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' })
    }
    res.status(200).json(leader)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leader' })
  }
}

export const getLeaderById = async (req, res) => {
  try {
    // ! can only view leader if user is an admin or the leader themselves
    if (!canViewLeader(req.user, req.params.leaderId)) {
      return res.status(401).json({ error: 'Not authorized to view this leader' })
    }

    const leader = await UserModel.findById(req.params.leaderId)
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' })
    }
    res.status(200).json(leader)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leader' })
  }
}

