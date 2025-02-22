import express from 'express'
import {
  createEvent,
  getLessonEvent
} from '../controllers/lessonEvent.controller.js'

const router = express.Router()
// ! create event
router.post('/:groupId/:lessonEventId', createEvent)
router.get('/:lessonEventId', getLessonEvent)

export default router
