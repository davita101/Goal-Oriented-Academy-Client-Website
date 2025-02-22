import mongoose from 'mongoose'

const lessonEventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    required: true
  },
  group: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  students: {
    type: Array
  }
})
export const LessonEventModel = mongoose.model("lesson-events", lessonEventSchema)