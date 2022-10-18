import { Router } from 'express'
import { updateUser } from './user.controllers.ts'

const router = Router()
router.patch('/', updateUser)

export default router