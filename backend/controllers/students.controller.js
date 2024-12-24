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
    const student = await StudentModel.find({ leaderId: req.params.leaderId });
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

    let updateData = {};

    if (req.user.role.includes("githubController")) {
      updateData = {
        ...updateData,
        "fines": {
          ...updateData.fines,
          "githubFine": req.body?.fines?.githubFine,
        },
        "comment": {
          ...updateData.comment,
          "controller": {
            ...updateData.comment?.controller,
            "githubController": req.body?.comment?.controller?.githubController,
          }
        },
      };
    }

    if (req.user.role.includes("miniLeaderController")) {
      updateData = {
        ...updateData,
        "fines": {
          ...updateData.fines,
          "miniLeaderFine": req.body?.fines?.miniLeaderFine,
        },
        "comment": {
          ...updateData.comment,
          "controller": {
            ...updateData.comment?.controller,
            "miniLeaderController": req.body?.comment?.controller?.miniLeaderController,
          }
        }
      };
    }

    if (req.user.role.includes("mentor")) {
      updateData = {
        ...updateData,
        "aura": {
          "points": req.body?.aura?.points,
          "classWork": req.body?.aura?.classWork,
          "attendance": req.body?.aura?.attendance,
          "help": req.body?.aura?.help,
          "camera": req.body?.aura?.camera,
          "answers": req.body?.aura?.answers
        }
      };
    }

    if (req.user.role.includes("leader") && req.user.id === student.leaderId && req.user.role.includes("leaderController")) {
      updateData = {
        ...updateData,
        "comment": {
          ...updateData.comment,
          "leaderComment": req.body?.comment?.leaderComment,
          "leaderProof": req.body?.comment?.leaderProof,
        },
        "name": req.body?.name,
        "age": req.body?.age,
        "group": req.body?.group,
        "leaderId": req.body?.leaderId,
        "role": req.body?.role,
        "parentFbLink": req.body?.parentFbLink,
        "githubToken": req.body?.githubToken,
        "githubLastUpdate": req.body?.githubLastUpdate,
        "studentFbLink": req.body?.studentFbLink,
        "email": req.body?.email,
        "githubLink": req.body?.githubLink,
      };
    }

    Object.keys(updateData).forEach(key => {
      student[key] = updateData[key];
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