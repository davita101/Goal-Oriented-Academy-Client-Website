import mongoose from 'mongoose'
import { GroupModel } from '../models/user.models.js'


export const getStudentById = async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.groupId)
        console.log(req.params)
        if (!group) {
            return res.status(404).json({ error: 'Group not found' })
        }
        const student = group.students.find(student => student._id === req.params.studentId)
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching student' })
    }
}
export const createStudent = async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.groupId)
        if (!group) {
            return res.status(404).json({ error: 'Group not found' })
        }

        // Check if a student with the same email already exists in the group
        const existingStudent = group.students.find(student => student.email === req.body.email)
        if (existingStudent) {
            return res.status(400).json({ error: 'Student with this email already exists' })
        }

        const newStudent = {
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the student
            ...req.body
        }

        group.students.push(newStudent)
        await group.save()

        res.status(201).json(newStudent)
    } catch (error) {
        console.error('Error creating student:', error)
        res.status(500).json({ error: 'Error creating student' })
    }
}
export const updateStudent = async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.groupId)
        if (!group) {
            return res.status(404).json({ error: 'Group not found' })
        }

        const student = group.students.id(req.params.studentId)
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }

        // Update student fields
        Object.keys(req.body).forEach(key => {
            student[key] = req.body[key]
        })

        await group.save()

        res.status(200).json(student)
    } catch (error) {
        console.error('Error updating student:', error)
        res.status(500).json({ error: 'Error updating student' })
    }
}
export const deleteStudent = async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.groupId)
        if (!group) {
            return res.status(404).json({ error: 'Group not found' })
        }

        const student = group.students.id(req.params.studentId)
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }

        // Remove the student from the students array
        group.students.pull({ _id: req.params.studentId });

        await group.save()

        res.status(200).json({ message: 'Student deleted successfully' })
    } catch (error) {
        console.error('Error deleting student:', error)
        res.status(500).json({ error: 'Error deleting student' })
    }
}
