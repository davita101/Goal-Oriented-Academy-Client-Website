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
    console.log('Searching for student with ID:', studentId);

    const student = await StudentModel.findById(studentId);
    console.log('Found student:', student);

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

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error creating student' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
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