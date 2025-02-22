import { LessonEventModel } from '../models/lessonEvent.model.js'
import { StudentModel } from '../models/student.models.js'
export const createEvent = async (req, res) => {
  try {
    const { lessonEventId, name, group } = req.body
    const lessons = await LessonEventModel.find({ name: name, group: group })
    const groups = await StudentModel.find({ group: group })
    const processedGroups = groups.map(student => {
      return {
        _id: student?._id,
        name: student?.name,
        aura: {
          points: student?.aura?.points,
          classwork: 0,
          attendance: 0,
          help: 0,
          camera: 0,
          answers: 0
        }
      }
    })

    if (groups.length == 0) {
      return res.status(204).json({ message: 'Error no content' })
    }
    if (lessons.length > 0) {
      return res.status(409).json({ message: 'Error creating event' })
    }

    const newLessonEvent = new LessonEventModel({
      _id: lessonEventId,
      students: processedGroups,
      ...req.body
    })
    await newLessonEvent.save()
    console.log('Event Create successfully')
    res.status(201).json(newLessonEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error create student' })
  }
}
export const getLessonEvent = async (req, res) => {
  try {
    const { lessonEventId } = req.params
    const lessons = await LessonEventModel.findById(lessonEventId)
    console.log(lessons)
    res.status(200).json(lessons)
  } catch (error) {
    res.status(500).json({ error: 'Error to get student' })
  }
}
