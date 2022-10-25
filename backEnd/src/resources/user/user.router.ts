import { Router } from 'express'
import { updateUser } from './user.controllers'

const router = Router()
router.patch('/', updateUser)

export default router