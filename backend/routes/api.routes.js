import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'

import groupRoutes from './api.groups.js'
import leadersRoutes from './api.leaders.js'
import studentRoutes from './api.students.js'

const apiRoutes = express.Router()

apiRoutes.use(authMiddleware)

apiRoutes.use('/groups', groupRoutes)
apiRoutes.use('/leaders', leadersRoutes)
apiRoutes.use('/students', studentRoutes)

export default apiRoutes
