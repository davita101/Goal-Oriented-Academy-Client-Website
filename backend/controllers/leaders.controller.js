import mongoose from 'mongoose';
import { UserModel } from '../models/user.models.js';
import { StudentModel } from '../models/student.models.js';

// Get all leaders
export const getAllLeaders = async (req, res) => {
  try {
    const leaders = await UserModel.find({ role: 'leader' });
    if (!leaders || leaders.length === 0) {
      return res.status(404).json({ error: 'No leaders found' });
    }
    res.status(200).json(leaders);
  } catch (error) {
    console.error('Error fetching leaders:', error);
    res.status(500).json({ error: 'Error fetching leaders' });
  }
};

// Get all students of a specific leader
export const leaderStudents = async (req, res) => {
  try {
    const students = await StudentModel.find({ leaderId: req.params.leaderId });
    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'No students found for this leader' });
    }
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// Get one student of a specific leader
export const leaderOneStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOne({
      leaderId: req.params.leaderId,
      _id: req.params.studentId,
    });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
};

// Update a student's data (without deleting fields)
export const updateLeaderStudent = async (req, res) => {
  try {
    const { leaderId, studentId } = req.params;
    const updateData = { ...req.body };

    // Find the leader
    const leader = await UserModel.findById(leaderId);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }

    // Ensure the student exists
    const student = await StudentModel.findOne({ leaderId, _id: studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update only the fields provided
    Object.keys(updateData).forEach((key) => {
      if (student[key] !== undefined) {
        student[key] = updateData[key];
      }
    });

    // Save updated student
    await student.save();
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error updating student' });
  }
};

export const deleteLeaderStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOneAndDelete({
      leaderId: req.params.leaderId,
      _id: req.params.studentId,
    });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};

// Get a leader by ID
export const getLeaderById = async (req, res) => {
  try {
    const leader = await UserModel.findById(req.params.leaderId);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.status(200).json(leader);
  } catch (error) {
    console.error('Error fetching leader:', error);
    res.status(500).json({ error: 'Error fetching leader' });
  }
};

// Update a leader by ID
export const updateLeaderById = async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id; // Ensure _id is not updated

    const leader = await UserModel.findByIdAndUpdate(
      req.params.leaderId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }

    res.status(200).json(leader);
  } catch (error) {
    console.error('Error updating leader:', error);
    res.status(500).json({ error: 'Error updating leader' });
  }
};
// Delete a leader by ID
export const deleteLeaderById = async (req, res) => {
  try {
    const leader = await UserModel.findByIdAndDelete(req.params.leaderId);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.status(200).json({ message: 'Leader deleted successfully', leader });
  } catch (error) {
    console.error('Error deleting leader:', error);
    res.status(500).json({ error: 'Error deleting leader' });
  }
};
