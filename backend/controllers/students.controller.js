import mongoose from 'mongoose';

export const getStudentById = async (req, res) => {
  try {
    const student = req.group.students.id(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
};

export const createStudent = async (req, res) => {
  try {
    const existingStudent = req.group.students.find(student => student.email === req.body.email);
    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this email already exists' });
    }

    const newStudent = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...req.body
    };

    req.group.students.push(newStudent);
    await req.group.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error creating student' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = req.group.students.id(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    Object.keys(req.body).forEach(key => {
      student[key] = req.body[key];
    });

    await req.group.save();

    res.status(200).json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error updating student' });
  }
};

export const deleteStudent = async (req, res) => {
    try {
        const student = req.group.students.id(req.params.studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }

        // Remove the student from the students array
        req.group.students.pull({ _id: req.params.studentId });

        await req.group.save();

        res.status(200).json({ message: 'Student deleted successfully' })
    } catch (error) {
        console.error('Error deleting student:', error)
        res.status(500).json({ error: 'Error deleting student' })
    }
}