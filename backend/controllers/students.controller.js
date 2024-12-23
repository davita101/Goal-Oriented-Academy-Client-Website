import mongoose from 'mongoose';
import { StudentModel } from '../models/student.models.js';

export const getAllStudent = async (req, res) => {
  try {
    const student = await StudentModel.find(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
};
export const getLeaderAllStudentById = async (req, res) => {
  try {
    const student = await StudentModel.find();
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
};
export const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
};
export const createStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ email: req.body.email });
    if (student) {
      return res.status(400).json({ error: 'Student with this email already exists' });
    }

    const newStudent = new StudentModel({
      _id: new mongoose.Types.ObjectId().toString(),
      ...req.body
    });
    await newStudent.save();
    console.log('Student saved successfully');

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(500).json({ error: 'Error creating student' });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    if (req.body.comment.leaderComment || req.body.comment.leaderProof ) {
      if ((student.leaderId !== req.user.id) && !req.user.role.includes('admin') ) {
        return res.status(401).json({ error: 'You are not allowed to update this student you ar not current user' });
      }
    }

    Object.keys(req.body).forEach(key => {
      student[key] = req.body[key];
    });

    await student.save();

    res.status(200).json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error updating student' });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    // Remove the student from the students array
    student.deleteOne({ _id: req.params.studentId });

    await student.save();

    res.status(200).json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error deleting student:', error)
    res.status(500).json({ error: 'Error deleting student' })
  }
}