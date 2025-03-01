import express from 'express'
import {
  createEvent,
  getAllLessonEvent,
  getLessonEvent,
  updateEvent
} from '../controllers/lessonEvent.controller.js'

const router = express.Router()
// ! create event
router.post('/:groupId', createEvent)
router.get('/group-events/:groupId', getAllLessonEvent)
router.get('/:lessonEventId', getLessonEvent)
router.put('/:lessonEventId', updateEvent)

export default router
