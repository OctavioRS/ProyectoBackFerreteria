import { Router } from 'express'

import { userController , loginController } from '../controllers/users.controller.js'
const router = Router()

router.post('/register',userController)
router.post('/login', loginController)
export default router