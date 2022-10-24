import { Router } from 'express'
import { updateUser, getUser } from './user.controllers'

const router = Router()

router.get('/', getUser)
router.patch('/', updateUser)

export default router