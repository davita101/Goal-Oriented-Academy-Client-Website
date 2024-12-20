import mongoose from 'mongoose';
import { UserModel } from '../models/user.models.js';
import { StudentModel } from '../models/student.models.js';

export const getAllLeaders = async (req, res) => {
  try {
    const leaders = await UserModel.find({ role: 'leader' });
    if (!leaders || leaders.length === 0) {
      return res.status(404).json({ error: 'Leaders not found' });
    }
    res.status(200).json(leaders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaders' });
  }
};

export const leaderStudents = async (req, res) => {
  try {
    const students = await StudentModel.find({ leaderId: req.params.leaderId });
    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'No students found for this leader' });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

export const leaderOneStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ leaderId: req.params.leaderId, _id: req.params.studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
};

export const deleteLeaderStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOneAndDelete({ leaderId: req.params.leaderId, _id: req.params.studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};

export const deleteLeader = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ leaderId: req.params.leaderId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};

export const deleteLeaderById = async (req, res) => {
  try {
    const leader = await UserModel.findByIdAndDelete(req.params.leaderId);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.status(200).json(leader);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leader' });
  }
};

export const getLeaderById = async (req, res) => {
  try {
    const leader = await UserModel.findById(req.params.leaderId);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.status(200).json(leader);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leader' });
  }
};

export const updateLeaderById = async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;

    const leader = await UserModel.findByIdAndUpdate(
      req.params.leaderId,
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