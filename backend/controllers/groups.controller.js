import { Group38Model, Group40Model, StudentModel } from '../models/user.models.js';

export const getStudents = async (req, res) => {
  try {
    const students = await Group38Model.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// export const getStudentById = async (req, res) => {
//   try {
//     const student = await StudentModel.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching student' });
//   }
// };

// export const createStudent = async (req, res) => {
//   try {
//     const newStudent = new StudentModel(req.body);
//     await newStudent.save();
//     res.status(201).json(newStudent);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating student' });
//   }
// };

// export const updateStudent = async (req, res) => {
//   try {
//     const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedStudent) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     res.status(200).json(updatedStudent);
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating student' });
//   }
// };

// export const deleteStudent = async (req, res) => {
//   try {
//     const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);
//     if (!deletedStudent) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     res.status(200).json({ message: 'Student deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error deleting student' });
//   }
// };